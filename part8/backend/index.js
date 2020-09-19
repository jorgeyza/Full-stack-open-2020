const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
  PubSub,
} = require('apollo-server');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const DataLoader = require('dataloader');
const config = require('./utils/config');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

const { MONGODB_URI, JWT_SECRET } = config;
const pubsub = new PubSub();
mongoose.set('debug', true);

console.log('connecting to', MONGODB_URI);
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

let authors = [
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
];

let books = [
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
];

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Book: {
    author: async (root, args, { authorLoader }) =>
      await authorLoader.load(root.author),
  },
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        const books = await Book.find({});
        return books;
      }

      if (args.author || args.genre) {
        let authorId;
        const author = await Author.findOne({ name: args.author });
        author ? (authorId = author.id) : (authorId = null);

        const books = await Book.find({
          $or: [{ author: authorId || null }, { genres: { $in: args.genre } }],
        });
        return books;
      }
    },
    allAuthors: () => Author.find({}),
    me: (root, args, { currentUser }) => currentUser,
  },
  Author: {
    bookCount: async (root, args, { bookCountLoader }) => {
      return bookCountLoader.load(root._id);
    },
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      const bookObj = {
        title: args.title,
        published: args.published,
        genres: [...args.genres],
      };
      try {
        const authorExists = await Author.findOne({ name: args.author });
        if (!authorExists) {
          const newAuthor = new Author({
            name: args.author,
            born: null,
          });
          const savedAuthor = await newAuthor.save();
          bookObj.author = savedAuthor;
        } else {
          bookObj.author = authorExists._id;
        }
        const newBook = new Book(bookObj);
        await newBook.save();
        pubsub.publish('BOOK_ADDED', { bookAdded: newBook });
        return newBook;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return author;
    },
    createUser: (root, args) => {
      const newUser = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return newUser.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};

const batchAuthors = async (ids) => {
  let authors = await Author.find({
    _id: {
      $in: ids,
    },
  });

  const orderedAuthors = ids.map((id) =>
    authors.find((author) => author._id.equals(id))
  );
  return orderedAuthors;
};

const batchBookCount = async (ids) => {
  let books = await Book.find({});

  const bookCounts = ids.map((id) => {
    return books.filter((b) => b.author.equals(id)).length;
  });

  return bookCounts;
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let currentUser;
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      currentUser = await User.findById(decodedToken.id);
    }

    return {
      currentUser: currentUser || null,
      authorLoader: new DataLoader(batchAuthors),
      bookCountLoader: new DataLoader(batchBookCount),
    };
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});

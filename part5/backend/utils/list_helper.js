const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  const reducer = (sum, blog) => sum + blog.likes;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  // Math.max does not accept arrays, so I copy all the elements with the ... operator
  const maxLikes = Math.max(
    ...blogs.map((blog) => {
      return blog.likes;
    })
  );

  const foundBlog = blogs.find((blog) => blog.likes === maxLikes);

  const alteredFoundBlog = {
    title: foundBlog.title,
    author: foundBlog.author,
    likes: foundBlog.likes,
  };

  return alteredFoundBlog;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const authors = blogs.map((blog) => blog.author);

  const [author, numBlogs] = _(authors).countBy().entries().maxBy(_.last);

  const result = {
    author,
    blogs: numBlogs,
  };

  return result;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const authorLikesArray = blogs.map((blog) => ({
    author: blog.author,
    likes: blog.likes,
  }));

  const totalLikesPerAuthor = _(authorLikesArray)
    .groupBy('author')
    .map((objs, key) => ({
      author: key,
      likes: _.sumBy(objs, 'likes'),
    }))
    .value();

  const result = _(totalLikesPerAuthor).maxBy('likes');
  return result;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};

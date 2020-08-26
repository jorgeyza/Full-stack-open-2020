const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const listHelper = require('../utils/list_helper');
const testHelper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const promiseArray = testHelper.listOfBlogs.map((blog) =>
    new Blog(blog).save()
  );
  await Promise.all(promiseArray);
});

test('dummy returns one', () => {
  const result = listHelper.dummy(testHelper.emptyBlogList);
  expect(result).toBe(1);
});

describe('Total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(testHelper.emptyBlogList);
    expect(result).toBe(0);
  });
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(testHelper.listWithOneBlog);
    expect(result).toBe(5);
  });
  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(testHelper.listOfBlogs);
    expect(result).toBe(36);
  });
});

describe('Favorite blog', () => {
  test('of empty list is empty object', () => {
    const result = listHelper.favoriteBlog(testHelper.emptyBlogList);
    expect(result).toEqual({});
  });
  test('when list has only one blog is that same blog', () => {
    const result = listHelper.favoriteBlog(testHelper.listWithOneBlog);
    expect(result).toEqual({
      title: 'A different blog',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });
  test('of a bigger list is the one with the most likes', () => {
    const result = listHelper.favoriteBlog(testHelper.listOfBlogs);
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });
});

describe('Author with the most blogs', () => {
  test('of empty list is empty object', () => {
    const result = listHelper.mostBlogs(testHelper.emptyBlogList);
    expect(result).toEqual({});
  });
  test('when list has only one blog is the author of that blog', () => {
    const result = listHelper.mostBlogs(testHelper.listWithOneBlog);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    });
  });
  test('of a bigger list is the one with the most blogs', () => {
    const result = listHelper.mostBlogs(testHelper.listOfBlogs);
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });
});

describe('Author with the most likes', () => {
  test('of empty list is empty object', () => {
    const result = listHelper.mostLikes(testHelper.emptyBlogList);
    expect(result).toEqual({});
  });
  test('when list has only one blog is the author of that blog', () => {
    const result = listHelper.mostLikes(testHelper.listWithOneBlog);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });
  test('of a bigger list is the one with the most likes', () => {
    const result = listHelper.mostLikes(testHelper.listOfBlogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});
describe('All blogs', () => {
  test('are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(testHelper.listOfBlogs.length);
  });

  test('are fetched with the property "id" instead of "_id"', async () => {
    const fetchedBlogs = await testHelper.blogsInDb();
    expect(fetchedBlogs[0].id).toBeDefined();
  });
});

describe('addition of a new blog', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('somepassword', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('succeeds with valid blog data and authorization token', async () => {
    const { title, author, url, likes } = testHelper.listWithOneBlog[0];
    const validBlog = { title, author, url, likes };
    const authResponse = await testHelper.loginUser();
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${authResponse.body.token}`)
      .send(validBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await testHelper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(testHelper.listOfBlogs.length + 1);

    const createdBlog = blogsAtEnd[blogsAtEnd.length - 1];
    createdBlog.user = response.body.user;
    expect([createdBlog]).toContainEqual(response.body);
  });

  test('fails with status code 401 with valid data but no token is provided', async () => {
    const { title, author, url, likes } = testHelper.listWithOneBlog[0];
    const validBlog = { title, author, url, likes };
    await api
      .post('/api/blogs')
      .send(validBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });

  test('fails with status code 400 if data is invalid', async () => {
    const invalidBlog = { author: 'Test Author' };
    const authResponse = await testHelper.loginUser();
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${authResponse.body.token}`)
      .send(invalidBlog)
      .expect(400);
  });

  test('succeeds even if the likes property is missing from the request, as it will default to the value 0', async () => {
    const { title, author, url } = testHelper.listWithOneBlog[0];
    const validBlog = { title, author, url };
    const authResponse = await testHelper.loginUser();
    const response = await api
      .post('/api/blogs')
      .send(validBlog)
      .set('Authorization', `bearer ${authResponse.body.token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toBe(0);
  });
});

describe('update of a blog', () => {
  test('succeeds with valid blog data', async () => {
    const { title, author, url, likes } = testHelper.listWithOneBlog[0];
    const validBlog = { title, author, url, likes };
    const blogsAtStart = await testHelper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(validBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await testHelper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(testHelper.listOfBlogs.length);
    expect(blogsAtEnd[0]).toEqual(response.body);
  });

  test('fails with status code 400 if data is invalid', async () => {
    const { author, likes } = testHelper.listWithOneBlog[0];
    const invalidBlog = { author, likes };
    const blogsAtStart = await testHelper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(invalidBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

describe('deletion of a blog', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('somepassword', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('succeeds with status code 204 if id is valid', async () => {
    const { title, author, url, likes } = testHelper.listWithOneBlog[0];
    const validBlog = { title, author, url, likes };
    const authResponse = await testHelper.loginUser();
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${authResponse.body.token}`)
      .send(validBlog);

    await api
      .delete(`/api/blogs/${response.body.id}`)
      .set('Authorization', `bearer ${authResponse.body.token}`)
      .expect(204);

    const blogsAtEnd = await testHelper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(testHelper.listOfBlogs.length);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).not.toContain(response.body.title);
  });

  test('fails with status code 400 if id is not valid', async () => {
    const blogsAtStart = await testHelper.blogsInDb();
    const authResponse = await testHelper.loginUser();

    await api
      .delete(`/api/blogs/${testHelper.nonExistingId()}`)
      .set('Authorization', `bearer ${authResponse.body.token}`)
      .expect(400);
    expect(blogsAtStart).toHaveLength(testHelper.listOfBlogs.length);
  });
});

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('somepassword', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation of account succeeds with a fresh username', async () => {
    const usersAtStart = await testHelper.usersInDb();
    const newUser = {
      username: 'jorge',
      name: 'Jorge Eyzaguirre',
      password: 'goodpassword',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await testHelper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation of account fails with proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await testHelper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'somepassword',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` to be unique');

    const usersAtEnd = await testHelper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation of account fails with invalid user data', async () => {
    const usersAtStart = await testHelper.usersInDb();

    const newUser = {
      username: 'abcdef',
      name: 'Superuser',
      password: 'ab',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain(
      'password must be at least 3 characters long'
    );

    const usersAtEnd = await testHelper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

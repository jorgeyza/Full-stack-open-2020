const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.post('/', async (req, res) => {
  const firstUser = await User.findOne();
  req.body.user = firstUser;
  const blog = new Blog(req.body);
  const savedBlog = await blog.save();
  firstUser.blogs = firstUser.blogs.concat(savedBlog._id);
  await firstUser.save();
  return res.status(201).json(savedBlog);
});

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  return res.json(blogs);
});

blogRouter.put('/:id', async (req, res) => {
  const { title, author, url, likes } = req.body;

  const blog = await Blog.findById(req.params.id);
  blog.title = title;
  blog.author = author;
  blog.url = url;
  blog.likes = likes;

  const updatedBlog = await blog.save();
  return res.status(201).json(updatedBlog);
});

blogRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id);
  return res.status(204).end();
});

module.exports = blogRouter;

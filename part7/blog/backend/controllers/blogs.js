const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.post('/', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);
  req.body.user = user;

  const blog = new Blog(req.body);
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  return res.status(201).json(savedBlog);
});

blogRouter.post('/:id/comments', async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  blog.comments = blog.comments.concat(req.body.comment);

  const updatedBlog = await blog.save();
  return res.status(201).json(updatedBlog);
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
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const blog = await Blog.findById(req.params.id);
  const user = await User.findOne({ _id: decodedToken.id });
  if (blog.user.toString() === decodedToken.id.toString()) {
    const updatedBlogs = user.blogs.filter((b) => b._id === blog.id);
    user.blogs = updatedBlogs;
    await user.save();
    await blog.deleteOne();
    return res.status(204).end();
  }
  return res.status(403).json({ error: 'blog does not belong to user' });
});

module.exports = blogRouter;

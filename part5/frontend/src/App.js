import React, { useState, useEffect, useReducer } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Blog from './components/Blog';
import Login from './components/Login';
import BlogForm from './components/BlogForm';
import Message from './components/Message';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ type: 'error', content: null });
  const [blogFormInput, setBlogFormInput] = useReducer(
    (state, newState) => {
      return { ...state, ...newState };
    },

    {
      newTitle: '',
      newAuthor: '',
      newUrl: '',
    }
  );
  const [loginInput, setLoginInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      username: 'jorgeyza',
      password: '123456',
    }
  );

  useEffect(() => {
    const fetchBlogs = async () => {
      const fetchedBlogs = await blogService.getAll();
      setBlogs(fetchedBlogs);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const userInfo = JSON.parse(loggedUserJSON);
      setUser(userInfo);
      blogService.setToken(userInfo.token);
    }
  }, []);

  const handleBlogFormInputChange = (event) => {
    const { name, value } = event.target;
    setBlogFormInput({ [name]: value });
  };

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginInput({ [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userInfo = await loginService.login(loginInput);
      blogService.setToken(userInfo.token);
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(userInfo)
      );
      setUser(userInfo);
      setLoginInput({ username: '', password: '' });
      setMessage({ type: 'success', content: `Successfully logged in` });
      setTimeout(() => {
        setMessage({ type: 'success', content: null });
      }, 5000);
    } catch (error) {
      setMessage({ type: 'error', content: 'Wrong credentials' });
      setTimeout(() => {
        setMessage({ type: 'error', content: null });
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setMessage({ type: 'success', content: `Successfully logged out` });
    setTimeout(() => {
      setMessage({ type: 'success', content: null });
    }, 5000);
    setUser(null);
  };

  const handleAddBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: blogFormInput.newTitle,
      author: blogFormInput.newAuthor,
      url: blogFormInput.newUrl,
    };
    try {
      const newBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(newBlog));
      setMessage({
        type: 'success',
        content: `a new blog ${blogFormInput.newTitle} by ${blogFormInput.newAuthor} added`,
      });
      setTimeout(() => {
        setMessage({ type: 'success', content: null });
      }, 5000);
      setBlogFormInput({
        newTitle: '',
        newAuthor: '',
        newUrl: '',
      });
    } catch (error) {
      setMessage({ type: 'error', content: 'Could not add blog' });
      setTimeout(() => {
        setMessage({ type: 'error', content: null });
      }, 5000);
    }
  };

  const loginForm = () => (
    <Login
      username={loginInput.username}
      password={loginInput.password}
      handleInputChange={handleLoginInputChange}
      handleLogin={handleLogin}
      message={message}
    />
  );

  const blogsForm = () => (
    <div>
      <h2>blogs</h2>
      <Message message={message} />
      <p>
        {user.name} logged in
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </p>
      <BlogForm
        newTitle={blogFormInput.newTitle}
        newAuthor={blogFormInput.newAuthor}
        newUrl={blogFormInput.newUrl}
        handleInputChange={handleBlogFormInputChange}
        handleAddBlog={handleAddBlog}
      />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return <>{user ? blogsForm() : loginForm()}</>;
};

export default App;

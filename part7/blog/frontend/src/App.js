import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BlogsList from './components/BlogsList';
import Login from './components/Login';
import BlogForm from './components/BlogForm';
import Message from './components/Message';
import Togglable from './components/Togglable';
import { initializeBlogs } from './reducers/blogReducer';
import { logoutUser, setLoggedUser } from './reducers/userReducer';
import { notify } from './reducers/notificationReducer';

const App = () => {
  const userSelector = useSelector(({ user }) => user);
  const notificationSelector = useSelector(({ notification }) => notification);

  const dispatch = useDispatch();
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      dispatch(setLoggedUser(loggedUserJSON));
    }
  }, [dispatch]);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(logoutUser());
    dispatch(
      notify({ type: 'success', content: 'Successfully logged out' }, 5000)
    );
  };

  const loginForm = () => <Login message={notificationSelector} />;

  const blogsForm = () => (
    <div>
      <h2>blogs</h2>
      <Message message={notificationSelector} />
      <p>
        {userSelector.name} logged in
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
      <BlogsList />
    </div>
  );

  return <>{userSelector ? blogsForm() : loginForm()}</>;
};

export default App;

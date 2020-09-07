import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/userReducer';
import { setLoggedUser } from './reducers/loginReducer';
import { Switch, Route } from 'react-router-dom';
import BlogsList from './components/BlogsList';
import Login from './components/Login';
import BlogForm from './components/BlogForm';
import Message from './components/Message';
import Togglable from './components/Togglable';
import UserDetail from './components/UserDetail';
import UsersTable from './components/UsersTable';
import Navigation from './components/Navigation';
import BlogDetail from './components/BlogDetail';
import { Typography } from '@material-ui/core';

const App = () => {
  const loginSelector = useSelector(({ login }) => login);
  const notificationSelector = useSelector(({ notification }) => notification);

  const dispatch = useDispatch();
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      dispatch(setLoggedUser(loggedUserJSON));
    }
  }, [dispatch]);

  const loginForm = () => <Login message={notificationSelector} />;

  const blogsForm = () => (
    <>
      <Navigation />
      <Message message={notificationSelector} />
      <Typography variant="h2">Blog app</Typography>
      <Switch>
        <Route path="/users/:id">
          <UserDetail />
        </Route>
        <Route path="/users">
          <UsersTable />
        </Route>
        <Route path="/blogs/:id">
          <BlogDetail />
        </Route>
        <Route path="/">
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
          <BlogsList />
        </Route>
      </Switch>
    </>
  );

  return <>{loginSelector ? blogsForm() : loginForm()}</>;
};

export default App;

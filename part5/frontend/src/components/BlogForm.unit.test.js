import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  let component;

  const mockHandler = jest.fn();
  const createBlogMock = jest.fn();

  const blogForm = {
    newTitle: 'A test blog form',
    newAuthor: 'Anonymous',
    newUrl: 'www.randomsomething.com',
  };

  beforeEach(() => {
    component = render(
      <BlogForm
        newTitle={blogForm.newTitle}
        newAuthor={blogForm.newAuthor}
        newUrl={blogForm.newUrl}
        handleInputChange={mockHandler}
        handleAddBlog={createBlogMock}
      />
    );
  });

  test('the form calls the event handler it received as props with the right details when a new blog is called', () => {
    const form = component.container.querySelector('form');
    const titleInput = component.container.querySelector('#title');
    const authorInput = component.container.querySelector('#author');
    const urlInput = component.container.querySelector('#url');

    expect(titleInput.value).toBe(blogForm.newTitle);
    expect(authorInput.value).toBe(blogForm.newAuthor);
    expect(urlInput.value).toBe(blogForm.newUrl);

    fireEvent.submit(form);
    expect(createBlogMock.mock.calls).toHaveLength(1);
  });
});

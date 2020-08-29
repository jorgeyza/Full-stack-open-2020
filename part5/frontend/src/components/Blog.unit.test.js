import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;

  const user = {
    username: 'jorgeyza',
    name: 'Jorge Eyzaguirre',
    id: '5f4698ca3aa69b45540ddf3a',
  };

  const blog = {
    title: 'A blog used for the unit testing of the Blog component',
    author: 'Jorge Eyzaguirre',
    url: 'www.arandomweburl.lalala',
    likes: 1506,
    user,
  };

  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        username="Jorge Eyzaguirre"
        userid="5f4698ca3aa69b45540ddf3a"
        handleLike={mockHandler}
        handleBlogDelete={mockHandler}
      />
    );
  });

  test("at start, the blog's title and author are rendered", () => {
    const detailView = component.container.querySelector('.detailView');
    const titleAuthor = component.getByText(`${blog.title} ${blog.author}`);

    expect(detailView).toHaveStyle('display: none');
    expect(titleAuthor).toBeTruthy();
  });

  test('after clicking the button, the detail view is displayed', () => {
    const detailView = component.container.querySelector('.detailView');
    const titleAuthor = component.getByText(`${blog.title} ${blog.author}`);
    const url = component.container.querySelector('.url');
    const likes = component.container.querySelector('.likes');
    const button = component.container.querySelector('.showHide');
    fireEvent.click(button);

    expect(detailView).not.toHaveStyle('display: none');
    expect(titleAuthor).toBeTruthy();
    expect(url).toHaveTextContent(blog.url);
    expect(likes).toHaveTextContent(`likes: ${blog.likes}`);
  });

  test('after clicking the "like" button twice,the event handler it received as props is called twice', () => {
    const button = component.container.querySelector('.likeButton');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});

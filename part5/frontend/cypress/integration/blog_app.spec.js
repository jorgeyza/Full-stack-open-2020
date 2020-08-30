/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/// <reference types="Cypress" />

const { _ } = Cypress;

describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Jorge Eyzaguirre',
      username: 'jorgeyza',
      password: '123456',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', () => {
    cy.contains('login');
    cy.get('input[name="username"]');
    cy.get('input[name="password"]');
  });

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('input[name="username"]').type('jorgeyza');
      cy.get('input[name="password"]').type('123456');
      cy.contains('login').click();
      cy.contains('Jorge Eyzaguirre logged in');
    });

    it('fails with wrong credentials', () => {
      cy.get('input[name="username"]').type('jorgeyza');
      cy.get('input[name="password"]').type('wrong');
      cy.contains('login').click();
      cy.contains('Wrong credentials').should(
        'have.css',
        'color',
        'rgb(255, 0, 0)'
      );
    });
  });

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'jorgeyza', password: '123456' });
    });

    it('A blog can be created', () => {
      cy.contains('new blog').click();
      cy.get('#title').type('a cypress test blog');
      cy.get('#author').type('Anonymous');
      cy.get('#url').type('www.lalala.gfgggg');
      cy.get('#create').click();
      cy.contains('a new blog a cypress test blog by Anonymous added');
      cy.get('#blog0').should('contain', 'a cypress test blog Anonymous');
    });
  });
  describe('When a blog is created', () => {
    beforeEach(() => {
      cy.login({ username: 'jorgeyza', password: '123456' });
      cy.createBlog({
        title: 'a cypress test blog',
        author: 'Anonymous',
        url: 'www.lalala.gfgggg',
      });
    });

    it('A user can like a blog', () => {
      cy.get('#blog0').should('contain', 'a cypress test blog Anonymous');
      cy.contains('view').click();
      cy.get('.likeButton').click();
      cy.get('.likes').should('contain', 'likes: 1');
    });

    it('A user can delete a blog he created', () => {
      cy.get('#blog0').should('contain', 'a cypress test blog Anonymous');
      cy.contains('view').click();
      cy.get('#remove').click();
      cy.on('window:confirm', () => true);
      cy.contains('a cypress test blog blog deleted');
    });

    it('A user can not delete a blog another user created', () => {
      cy.contains('logout').click();
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      };
      cy.request('POST', 'http://localhost:3001/api/users/', user);
      cy.visit('http://localhost:3000');
      cy.login({ username: 'mluukkai', password: 'salainen' });
      cy.get('#blog0').should('contain', 'a cypress test blog Anonymous');
      cy.contains('view').click();
      cy.get('#remove').should('not.be.visible');
    });
  });

  describe('When many blogs are created', () => {
    beforeEach(() => {
      cy.login({ username: 'jorgeyza', password: '123456' });
      cy.createBlog({
        title: 'blog with 0 likes',
        author: 'Anonymous',
        url: 'www.lalala.gfgggg',
        likes: 0,
      });
      cy.createBlog({
        title: 'blog with 2 likes',
        author: 'Anonymous',
        url: 'www.lalala.gfgggg',
        likes: 2,
      });
      cy.createBlog({
        title: 'blog with 15 likes',
        author: 'Anonymous',
        url: 'www.lalala.gfgggg',
        likes: 15,
      });
      cy.createBlog({
        title: 'blog with 10 likes',
        author: 'Anonymous',
        url: 'www.lalala.gfgggg',
        likes: 10,
      });
      cy.createBlog({
        title: 'blog with 5 likes',
        author: 'Anonymous',
        url: 'www.lalala.gfgggg',
        likes: 5,
      });
    });

    it('blogs are sorted by likes', () => {
      cy.reload(true);
      const toStrings = (elements) => _.map(elements, 'textContent');
      cy.get('.likes')
        .then(toStrings)
        .then((likesArray) => {
          expect(likesArray).to.deep.equal([
            'likes: 15',
            'likes: 10',
            'likes: 5',
            'likes: 2',
            'likes: 0',
          ]);
        });
    });
  });
});

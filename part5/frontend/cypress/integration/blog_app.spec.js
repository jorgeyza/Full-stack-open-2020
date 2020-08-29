/// <reference types="Cypress" />

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
    // ...
  });
});

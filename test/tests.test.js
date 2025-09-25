// test/tests.js
const request = require('supertest');
const server = require('../server');

describe('GET /', () => {
  afterAll(() => {
    server.close();
  });

  test('It should respond with "Hello from the Node.js app!"', async () => {
    const response = await request(server).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello from the Node.js app!');
  });
});

/** @format */

const request = require('supertest');
const app = require('../app');

// Testing the app backend to see if it exists and returns what it ought to return
describe('GET /', () => {
  it('should return "Welcome!"', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Welcome!');
  });
});

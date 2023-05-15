import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import { createHTTPServer } from '../server';
import { ErrorMessages } from '../Errors/errorMessages';
import { UserRecord } from '../model/user.types';

const testDB: UserRecord[] = [];
const server = createHTTPServer(testDB);
const serverRequest = request(server);

const testUser = { username: 'Gordon Freeman', age: 42, hobbies: ['Physics', 'Save the World'] };

describe('GET /api/users', () => {
  afterAll((done) => {
    server.close();
    done();
  });

  it('should return empty array for first request', (done) => {
    serverRequest.get('/api/users').expect(200, [], done);
  });

  it('should create user', (done) => {
    serverRequest.post('/api/users').send(testUser).expect(201, done);

    serverRequest.get('/api/users').end((err, res) => {
      const users = res.body;
      expect(users).toHaveLength(1);
      done();
    });
  });

  it('should work correctly. First scenario.', async () => {
    // Get all records with a GET api/users request (an empty array is expected)
    serverRequest.get('/api/users').expect(200, '[]');

    // A new object is created by a POST api/users request (a response containing newly created record is expected)
    const createdUserRes = await serverRequest.post('/api/users').send(testUser);
    const createdUser: UserRecord = createdUserRes.body;
    expect(createdUser.username).toEqual(testUser.username);
    expect(createdUser.age).toEqual(testUser.age);
    expect(createdUser.hobbies).toEqual(testUser.hobbies);

    // With a GET api/user/{userId} request, we try to get the created record by its id (the created record is expected)
    const createdUserByIdRes = await serverRequest.get(`/api/users/${createdUser.id}`);
    const createdUserById: UserRecord = createdUserByIdRes.body;
    expect(createdUserById.id).toEqual(createdUser.id);
    expect(createdUserById.username).toEqual(createdUser.username);

    // We try to update the created record with a PUT api/users/{userId}request (a response is expected containing an updated object with the same id)
    const updatedUserRes = await serverRequest
      .put(`/api/users/${createdUser.id}`)
      .send({ username: 'Alyx Vance' });

    const updatedUser: UserRecord = updatedUserRes.body;
    expect(updatedUser.username).toEqual('Alyx Vance');
    expect(updatedUser.id).toEqual(createdUser.id);
    expect(updatedUser.age).toEqual(createdUser.age);
    expect(updatedUser.hobbies).toEqual(createdUser.hobbies);

    // With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)
    await serverRequest.delete(`/api/users/${createdUser.id}`).expect(204);

    // With a GET api/users/{userId} request, we are trying to get a deleted object by id (expected answer is that there is no such object)
    await serverRequest
      .get(`/api/users/${createdUser.id}`)
      .expect(404, ErrorMessages.USER_NOT_FOUND);
  });
});

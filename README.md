# CRUD API
This is the simple Node.js CRUD API server using in-memory database underneath.

Implemented horizontal scaling for application using the Node.js Cluster API.

## Technical requirements
- 18 LTS version of Node.js

## Endpoints
- **GET** `api/users` is used to get all persons
  - Server responds with `status code` **200** and all users records
- **GET** `api/users/{userId}` 
  - Server responds with `status code` **200** and record with `id === userId` if it exists
  - Server responds with `status code` **400** and status message if `userId` is invalid (not `uuid`)
  - Server responds with `status code` **404** and status message if record with `id === userId` doesn't exist
- **POST** `api/users` is used to create record about new user and store it in database
  - Server responds with `status code` **201** and newly created record
  - Server responds with `status code` **400** and status message if request `body` does not contain **required** fields
- **PUT** `api/users/{userId}` is used to update existing user
  - Server responds with` status code` **200** and updated record
  - Server responds with` status code` **400** and status message if `userId` is invalid (not `uuid`)
  - Server responds with` status code` **404** and status message if record with `id === userId` doesn't exist
- **DELETE** `api/users/{userId}` is used to delete existing user from database
  - Server responds with `status code` **204** if the record is found and deleted
  - Server responds with `status code` **400** and status message if `userId` is invalid (not `uuid`)
  - Server responds with `status code` **404** and status message if record with `id === userId` doesn't exist

## Start server
### To run in development mode
- npm run start:dev
### To run run in production mode
- npm run start:prod
### To run in load balancer mode
- npm run start:multi
### To run tests
- npm test
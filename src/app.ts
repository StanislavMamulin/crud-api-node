import { getUsersDB } from './model/usersDB.js';
import { createHTTPServer } from './server.js';

const PORT = process.env.PORT || 4000;

export const startApp = () => {
  const usersDB = getUsersDB();
  const server = createHTTPServer(usersDB);

  server.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
  });

  return server;
};

startApp();

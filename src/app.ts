import { createServer } from 'http';
import { router } from './routers/router.js';

const PORT = process.env.PORT || 4000;

const server = createServer();

server.on('request', router);

server.listen(PORT, () => {
  console.log('Server is running');
  console.log(`http://localhost:${PORT}`);
});

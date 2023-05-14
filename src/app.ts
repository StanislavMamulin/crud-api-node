import { server } from './server.js';

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log('Server is running');
  console.log(`http://localhost:${PORT}`);
});

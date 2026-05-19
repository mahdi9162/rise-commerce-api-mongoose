import type { Server } from 'http';
import env from './app/config/env';
import app from './app';
import connectDB from './app/config/db';

const port = env.port;

let server: Server;

const bootstrap = async () => {
  try {
    await connectDB();

    server = app.listen(port, () => {
      console.log('kam sharse!!!🤯🤯 Server to mama chill mode on koira dese!!🤩🤩');
    });
  } catch (error) {
    console.log(error);
  }
};

// uncaught Exception
process.on('uncaughtException', (error) => {
  console.log('Uncaught Exception detected:', error);

  process.exit(1);
});

(async () => {
  await bootstrap();
})();

// unhandled Rejection
process.on('unhandledRejection', (error) => {
  console.log('Unhandled Rejection detected:', error);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// SIGTERM
process.on('SIGTERM', () => {
  console.log('SIGTERM signal reveived');

  if (server) {
    server.close(() => {
      process.exit(0);
    });
  }
});

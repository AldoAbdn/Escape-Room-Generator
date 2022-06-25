/*.env*/
const dotenv = require('dotenv');
dotenv.config();


/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const hostname = app.get('host');
const port = process.env.PORT || app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', hostname, port)
);

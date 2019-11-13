import * as http from 'http';
import pino from 'pino';
const logger = pino();

import './server/mongo';
import App from './server/app';

const port = process.env.PORT || 3000;
App.set('port', port);

const server = http.createServer(App);
server.listen(port);
server.on('error', (error: NodeJS.ErrnoException) => logger.error(error));
server.on('listening', () => logger.info(`server listening on port ${port}`));

export default server;
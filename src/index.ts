import * as http from 'http';
import config from 'config';
import pino from 'pino';
const logger = pino();

// load the database
import './database/mongo';

// load our app
import App from './server/app';

// port comes from config or manual entry
const port = process.env.PORT || config.get('server.port');
App.set('port', port);

// start up the server and listen to its output
const server = http.createServer(App);
server.listen(port);
server.on('error', (error: NodeJS.ErrnoException) => logger.error(error));
server.on('listening', () => logger.info(`server listening on port ${port}`));

export default server;
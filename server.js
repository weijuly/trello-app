import express from 'express';
import cards from './src/server/cards';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import Connection from './src/server/persistence';
import logger from './src/server/logger';

const PORT = 3000;
const app = express();

app.use('/_api', morgan('combined'));
app.use('/_api', bodyParser.json());
app.use('/_api/cards', cards);

app.use('/', express.static('public'));

const connection = Connection.getInstance();
let server = undefined;
connection
    .connect()
    .then(() => logger.info('Connected to databbase'))
    .then(() => app.listen(PORT))
    .then(() => logger.info(`Server listening at port ${PORT} for connections...`))
    .catch(error => logger.info(`Server startup failure: ${error}`));

module.exports = server;
import express from 'express';
import cards from './src/server/cards';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();

app.use('/_api', morgan('combined'));
app.use('/_api', bodyParser.json());
app.use('/_api/cards', cards);

app.use('/', express.static('public'));

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Server listening at port 3000 for connections...');
});

module.exports = server;
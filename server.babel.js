import express from 'express';
import cards from './src/service/cards';
const app = express();


app.use('/_api/cards', cards)

app.use('/', express.static('public'));

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Server listening at port 3000 for connections...');
});

module.exports = server;
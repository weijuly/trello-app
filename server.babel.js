import express from 'express';
const app = express();


app.get('/_api/cards', (req, res) => res.send({
    api: '2.0',
    message: 'there is no message'
}));

app.use('/', express.static('public'));
app.listen(process.env.PORT || 3000);
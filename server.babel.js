import express from 'express';
const app = express();


app.get('/api', (req, res) => res.send({
    api: '2.0'
}));

app.use('/', express.static('public'));
app.listen(process.env.PORT || 3000);
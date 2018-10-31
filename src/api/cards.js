import express from 'express';
import morgan from 'morgan';

morgan('combined');
const router = express.Router();

const cards = [{
    id: 1234,
    header: 'header',
    description: 'description of the task',
    state: 'I',
    created: '2018-10-30T17:57:07+00:00',
    modified: '2018-10-30T17:57:07+00:00',
    owner: 'gganesan'
}];

router.get('/', (req, res) => {
    res.send({
        cards: cards,
        server: 'version'
    });
});

module.exports = router;
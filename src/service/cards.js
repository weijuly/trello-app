import express from 'express';
import morgan from 'morgan';

morgan('combined');
const router = express.Router();

const cards = [{
    id: 1111,
    header: 'backlog work',
    description: 'this work has not started yet',
    state: 'B',
    created: '2019-01-30T17:57:07+00:00',
    due: '2019-01-30T17:57:07+00:00',
    owner: 'gganesan'
},{
    id: 2222,
    header: 'in progress work',
    description: 'this work is in progress',
    state: 'I',
    created: '2019-03-30T17:57:07+00:00',
    due: '2019-04-30T17:57:07+00:00',
    owner: 'jdoe'
},{
    id: 3333,
    header: 'completed work',
    description: 'this work is completed',
    state: 'C',
    created: '2019-05-30T17:57:07+00:00',
    due: '2019-06-30T17:57:07+00:00',
    owner: 'jsmith'
},{
    id: 4444,
    header: 'blocked work',
    description: 'this work is blocked',
    state: 'X',
    created: '2019-07-30T17:57:07+00:00',
    due: '2019-08-30T17:57:07+00:00',
    owner: 'rshelley'
}];

router.get('/', (req, res) => {
    res.send({
        cards: cards,
        server: 'version'
    });
});

module.exports = router;
import express from 'express';
import Connection from './persistence';
import logger from './logger';

const errorToResponse = (err, res) => res.status(err.statusCode).send({
    error: err.message,
    detail: err.detail
});


const router = express.Router();
const connection = Connection.getInstance();

router.get('/', (req, res) => {
    connection
        .getCards()
        .then(cards => res.send({
            cards: cards,
            server: 'version'
        }))
        .catch(err => errorToResponse(err, res));
});
router.get('/:cardId', (req, res) => {
    connection
        .getCard(req.params.cardId)
        .then(card => res.send(card))
        .catch(err => errorToResponse(err, res));
});
router.post('/', (req, res) => {
    connection
        .addCard(req.body)
        .then(card => res.status(201).send(card))
        .catch(err => errorToResponse(err, res));
});
router.patch('/:cardId', (req, res) => {
    connection
        .updateCard(req.params.cardId, req.body)
        .then(card => res.send(card))
        .catch(err => errorToResponse(err, res));
});
router.delete('/:cardId', (req, res) => {
    connection
        .deleteCard(req.params.cardId)
        .then(card => res.send(card))
        .catch(err => errorToResponse(err, res));
})

module.exports = router;
import express from 'express';
import Connection from './persistence';
import logger from './logger';

const router = express.Router();
const connection = Connection.getInstance();

router.get('/', (req, res) => {
    connection
        .getCards()
        .then(cards => res.send({
            cards: cards,
            server: 'version'
        }))
        .catch(error => res.status(500).send({
            error: error
        }));
});
router.get('/:cardId', (req, res) => {
    connection
        .getCard(req.params.cardId)
        .then(card => res.send(card))
        .catch(error => res.status(404).send({
            error: error
        }));
});
router.post('/', (req, res) => {
    connection
        .addCard(req.body)
        .then(card => res.status(201).send(card))
        .catch(error => res.status(400).send({
            error: error
        }));
});
router.patch('/:cardId', (req, res) => {
    connection
        .updateCard(req.body)
        .then(card => res.send(card))
        .catch(error => res.send(500).send({
            error: error
        }));
});

module.exports = router;
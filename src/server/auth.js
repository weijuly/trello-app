import express from 'express';
import Connection from './persistence';

const errorToResponse = (err, res) => res.status(err.statusCode).send({
    error: err.message,
    detail: err.detail
});


const router = express.Router();
const connection = Connection.getInstance();


router.post('/login', (req, res) => {
    connection
        .login(req.body.username, req.body.password)
        .then(user => res.status(200).send(user))
        .catch(err => errorToResponse(err, res));
});

module.exports = router;
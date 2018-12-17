import {MongoClient, ObjectID} from 'mongodb';
import logger from './logger';
import TrelloError from './common';


const connectionString = 'mongodb://trello:password@localhost:27017/trello';

const Connection = (() => {
    let instance = undefined;
    let connection = undefined;
    let cardCursor = undefined;
    let userCursor = undefined;
    const DATABASE = 'trello';
    const CARD_COLLECTION = 'trello';
    const USER_COLLECTION = 'users';

    const serialize = object => {
        if (!object._id) {
            return {
                ...object
            };
        }
        return {
            ...object,
            id: object._id.toString(),
            _id: undefined
        };
    };

    const connect = async () => {
        logger.info(`Connecting to mongodb...`);
        connection = await MongoClient.connect(connectionString, {useNewUrlParser: true});
        cardCursor = connection.db(DATABASE).collection(CARD_COLLECTION);
        userCursor = connection.db(DATABASE).collection(USER_COLLECTION);
        logger.info(`Connected to mongodb`);
    };

    const getCard = async (cardId) => {
        try {
            logger.info(`Loading card: ${cardId}`);
            let card = await cardCursor
                .findOne({
                    _id: ObjectID(cardId)
                });
            if (!card) {
                throw new TrelloError(`Cannot find card with id: ${cardId}`, ``, 404);
            }
            return serialize(card);
        } catch (err) {
            throw new TrelloError(`Cannot find card with id: ${cardId}`, err, 500);
        }
    };

    const updateCard = async (cardId, card) => {
        await getCard(cardId);
        try {
            logger.info(`Updating card: ${card.id}`);
            let result = await cardCursor.updateOne({
                    _id: ObjectID(cardId)
                }, {
                    $set: {
                        header: card.header,
                        description: card.description,
                        state: card.state,
                        created: card.created,
                        due: card.due,
                        owner: card.owner
                    }
                });
            if(result.nModified && result.nModified !== 1) {
                let error = `Cannot update card: ${cardId}`;
                throw new TrelloError(error, ``, 500);
            }
            logger.info(`Updated card: ${cardId}`);
            return serialize(card);
        } catch (err) {
            throw new TrelloError(`Cannot update card with id: ${cardId}`, err, 500);
        }
    };
    
    const addCard = async (card) => {
        try {
            logger.info('Adding new card');
            let result = await cardCursor
                .insertOne(card);
            return serialize(result.ops[0]);
        } catch (err) {
            throw new TrelloError(`Cannot insert new card`, err, 500);
        }
    };

    const getCards = async () => {
        try {
            let cards = [];
            logger.info('Loading cards from database');
            await cardCursor
                .find({})
                .forEach(card => {
                    cards.push(serialize(card));
                });
            logger.info(`Loaded ${cards.length} cards from database`);
            return cards;
        } catch (err) {
            throw new TrelloError('Cannot load cards from database', err, 500);
        }
    };

    const deleteCard = async (cardId) => {
        let card = await getCard(cardId);
        try {
            let result = await cardCursor.deleteOne({
                _id: ObjectID(card.id)
            });
            if (result && result.deletedCount !== 1) {
                throw new TrelloError(`Cannot delete card: ${cardId}`, ``, 500);
            }
            logger.info(`Deleted card: ${cardId}`);
            return serialize(card);
        } catch (err) {
            throw new TrelloError(`Cannot delete card with id: ${cardId}`, err, 500);
        }
    };

    const login = async (username, password) => {
        try {
            const user = await userCursor.findOne({
                user: username,
                pass: password
            });
            if (!user) {
                throw new TrelloError(`Cannot find user: ${username} with pass: ${password}`, ``, 404);
            }
            return serialize(user);
        } catch (err) {
            throw new TrelloError(`Cannot find user: ${username} with pass: ${password}`, err, 404);
        }
    }

    function create(){
        return {
            connect: connect,
            getCards: getCards,
            getCard: getCard,
            addCard: addCard,
            updateCard: updateCard,
            deleteCard: deleteCard,
            login: login
        }
    }
    return {
        getInstance() {
            if(!instance){
                instance = create();
            }
            return instance;
        }
    }
})();

export default Connection;

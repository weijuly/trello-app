import {MongoClient, ObjectID} from 'mongodb';
import logger from './logger';
import TrelloError from './common';


const connectionString = 'mongodb://trello:password@localhost:27017/trello';

const Connection = (() => {
    let instance = undefined;
    let connection = undefined;
    let cursor = undefined;
    const DATABASE = 'trello';
    const COLLECTION = 'trello';

    const serialize = card => {
        if (!card._id) {
            return {
                ...card
            };
        }
        return {
            ...card,
            id: card._id.toString(),
            _id: undefined
        };
    };

    const connect = async () => {
        logger.info('Connecting to mongodb...');
        connection = await MongoClient.connect(connectionString, {useNewUrlParser: true});
        cursor = connection.db(DATABASE).collection(COLLECTION);
        logger.info('Connected to mongodb');
    };

    const getCard = async (cardId) => {
        try {
            logger.info(`Loading card: ${cardId}`);
            let card = await cursor
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
            let result = await cursor.updateOne({
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
            let result = await cursor
                .insertOne(card);
            return serialize(result.ops[0]);
        } catch (err) {
            throw new TrelloError(`Cannot insert new card`, error, 500);
        }
    };

    const getCards = async () => {
        try {
            let cards = [];
            logger.info('Loading cards from database');
            await cursor
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
            let result = await cursor.deleteOne({
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

    function create(){
        return {
            connect: connect,
            getCards: getCards,
            getCard: getCard,
            addCard: addCard,
            updateCard: updateCard,
            deleteCard: deleteCard
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

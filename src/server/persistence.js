import {MongoClient, ObjectID} from 'mongodb';
import logger from './logger';

const connectionString = 'mongodb://trello:password@localhost:27017/trello';

const Connection = (() => {
    let instance = undefined;
    let connection = undefined;
    let cursor = undefined;
    const DATABASE = 'trello';
    const COLLECTION = 'trello';
    const serialize = card => {
        return {
            ...card,
            id: card._id.toString(),
            _id: undefined
        }
    }
    function create(){
        return {
            connect: async () => {
                console.log('Connecting to mongodb');
                connection = await MongoClient.connect(connectionString, {useNewUrlParser: true});
                cursor = connection.db(DATABASE).collection(COLLECTION);
            },
            getCards: async () => {
                let cards = [];
                logger.info('Loading cards from database');
                await cursor
                    .find({})
                    .forEach(card => {
                        cards.push(serialize(card));
                    });
                    logger.info(`Loaded ${cards.length} cards from database`);
                return cards;
            },
            getCard: async (cardId) => {
                logger.info('Loading cards from database');
                let card = await cursor
                    .findOne({
                        _id: ObjectID(cardId)
                    });
                return serialize(card);
            },
            addCard: async (card) => {
                let result = await cursor
                    .insertOne(card);
                return serialize(result.ops[0]);
            },
            updateCard: async (card) => {
                let result = await cursor
                    .updateOne({
                        _id: ObjectID(card.id)
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
                return serialize(card);
            }
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

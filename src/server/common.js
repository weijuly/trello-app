import logger from './logger';

class TrelloError extends Error {
    constructor(message, statusCode) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.statusCode = statusCode;
        logger.error(`TrelloError: ${message}`);
    }
};

export default TrelloError;
import logger from './logger';

class TrelloError extends Error {
    constructor(message, detail, statusCode) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.detail = detail;
        this.statusCode = statusCode;
        logger.error(`TrelloError: ${message} - ${detail}`);
    }
};

export default TrelloError;
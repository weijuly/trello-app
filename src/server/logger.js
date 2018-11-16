import winston from 'winston';
import moment from 'moment';

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'logs/application.log'
        })
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({format: 'YYYY-MM-DD hh:mm:ss'}),
        winston.format.printf(info => {
            return `[${info.level}] [${info.timestamp}] ${info.message}`;
        })
    )
});


export default logger;
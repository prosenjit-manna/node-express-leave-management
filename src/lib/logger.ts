import winston from 'winston';
const format = winston.format;
export enum LoggerLevel {
  'error' = 'error',
  'info' = 'info',
  'debug' = 'debug',
}

const customFormat = format.printf(({ level, message, timestamp }) => {
  if (typeof message === 'object') {
    message = JSON.parse(message);
  }
  return `${timestamp} ${level}: ${message}`;
});

export const logger = winston.createLogger({
  level: 'debug',
  format: format.combine(format.timestamp(), format.splat(), format.prettyPrint()),
  transports: [
    new winston.transports.File({ filename: 'log/error.log', level: LoggerLevel.error }),
    new winston.transports.File({ filename: 'log/info.log', level: LoggerLevel.info }),
    new winston.transports.File({ filename: 'log/combined.log' }),
  ],
});

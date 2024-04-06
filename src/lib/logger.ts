import winston from 'winston';
import { get_env } from './get-env';
const format = winston.format;
export enum LoggerLevel {
  'error' = 'error',
  'info' = 'info',
  'debug' = 'debug',
}

export const logger = winston.createLogger({
  level: 'debug',
  format: format.combine(format.timestamp(), format.splat(), format.prettyPrint()),
  transports: [
    new winston.transports.File({ filename: 'log/error.log', level: LoggerLevel.error }),
    new winston.transports.File({ filename: 'log/info.log', level: LoggerLevel.info }),
    new winston.transports.File({ filename: 'log/combined.log' }),
  ],
});

if (get_env.MODE !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: format.combine(format.timestamp(), format.splat(), format.prettyPrint()),
    }),
  );
}

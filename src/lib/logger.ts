import winston from 'winston';
import { get_env } from './get-env';
const format = winston.format;
export enum appLoggerLevel {
  'error' = 'error',
  'info' = 'info',
  'debug' = 'debug',
}

export const appLogger = winston.createLogger({
  level: 'debug',
  format: format.combine(format.timestamp(), format.splat(), format.prettyPrint()),
  transports: [
    new winston.transports.File({ filename: 'log/error.log', level: appLoggerLevel.error }),
    new winston.transports.File({ filename: 'log/info.log', level: appLoggerLevel.info }),
    new winston.transports.File({ filename: 'log/combined.log' }),
  ],
});

if (get_env.MODE !== 'production') {
  appLogger.add(
    new winston.transports.Console({
      format: format.combine(format.timestamp(), format.splat(), format.prettyPrint()),
    }),
  );
}

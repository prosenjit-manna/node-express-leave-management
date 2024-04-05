import { cleanEnv, str, num } from 'envalid';

export const get_env = cleanEnv(process.env, {
  PORT: num({ desc: 'Server Port' }),
  SERVER_URL: str({ desc: 'Server API URL' }),
  MONGO_DB_URI: str({ desc: 'mongodb://{userName}:{password}@{host}:{port}' }),
  MONGO_DB_NAME: str({ default: 'app' }),
  JSON_WEB_TOKEN_SECRET: str({ default: 'b88a6216-dff7-4a4e-928e-f66c41e06d50' }),
  JSON_WEB_TOKEN_EXPIRY: str({ default: '1h' }),

  // SMTP
  SMTP_HOST: str({ desc: 'SMTP HOST' }),
  SMTP_USER: str({ desc: 'SMTP User' }),
  SMTP_PASSWORD: str({ desc: 'SMTP Password' }),
  SMTP_PORT: num({ desc: 'SMTP Port' }),
  SMTP_SENDER: str({ desc: 'Sender Email' }),
});

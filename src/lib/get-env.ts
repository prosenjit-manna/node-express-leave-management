import { cleanEnv, str, num } from 'envalid';

export const get_env = cleanEnv(process.env, {
  MODE: str({ default: 'development' }),

  // Application
  PORT: num({ desc: 'Server Port' }),
  SERVER_URL: str({ desc: 'Server API URL' }),
  MONGO_DB_URI: str({ desc: 'mongodb://{userName}:{password}@{host}:{port}' }),
  MONGO_DB_NAME: str({ default: 'app' }),
  JSON_WEB_TOKEN_SECRET: str({ default: 'b88a6216-dff7-4a4e-928e-f66c41e06d50' }),
  JSON_WEB_TOKEN_EXPIRY: str({ default: '1h' }),
  CORS_DOMAIN_WHITE_LIST: str({ desc: 'CORS DOMAIN ALLOW LIST', example: 'http://example.com,http://example2.com' }),

  // SMTP
  SMTP_HOST: str({ desc: 'SMTP HOST' }),
  SMTP_USER: str({ desc: 'SMTP User' }),
  SMTP_PASSWORD: str({ desc: 'SMTP Password' }),
  SMTP_PORT: num({ desc: 'SMTP Port' }),
  SMTP_SENDER: str({ desc: 'Sender Email' }),

  // Frontend Routes
  EMAIL_VERIFICATION_URL: str({ desc: 'Email verification URL', default: 'http://localhost:3000/login' }),
  RESET_PASSWORD_URL: str({ desc: 'Email verification URL', default: 'http://localhost:3000/reset-password' }),

  // Seed
  OWNER_EMAIL: str({ desc: 'OWNER EMAIL' }),
  SEED_DEFAULT_PASSWORD: str({ desc: 'Seed default password' }),

  // Pagination
  ROW_LIMIT_PER_PAGE: num({ default: 20, desc: 'Number of row per page' }),
});

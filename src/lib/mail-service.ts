import nodemailer from 'nodemailer';
import winston from 'winston';
import dotenv from 'dotenv';
import { get_env } from './get-env';
import Mail from 'nodemailer/lib/mailer';
dotenv.config();

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

export const sendMail = async ({ to, subject, html }: { to: string; subject: string; html: string }) => {
  const transporter = nodemailer.createTransport({
    host: get_env.SMTP_HOST,
    port: get_env.SMTP_PORT,
    auth: {
      user: get_env.SMTP_USER,
      pass: get_env.SMTP_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: get_env.SMTP_SENDER,
    to: to,
    subject: subject,
    html,
  };

  logger.info(`Sending mail to - ${to}`);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      logger.error(error);
    } else {
      logger.info('Email sent: ' + info.response);
    }
  });
};

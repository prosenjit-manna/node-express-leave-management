import nodemailer from 'nodemailer';
import { get_env } from './get-env';
import Mail from 'nodemailer/lib/mailer';
import { LoggerLevel, logger } from './logger';

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

  logger.log(LoggerLevel.info, 'sending mail to:', { to });
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(error);
    } else {
      logger.info('Email sent: ' + info.response);
    }
  });
};

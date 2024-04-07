import nodemailer from 'nodemailer';
import { get_env } from './get-env';
import Mail from 'nodemailer/lib/mailer';
import { appLoggerLevel, appLogger } from './logger';

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

  appLogger.log(appLoggerLevel.info, 'sending mail to:', { to });
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      appLogger.error(error);
    } else {
      appLogger.info('Email sent: ' + info.response);
    }
  });
};

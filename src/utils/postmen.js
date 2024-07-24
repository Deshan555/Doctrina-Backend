require('dotenv').config();
const nodemailer = require('nodemailer');
const mailUserName = process.env.EMAIL_USERNAME;
const logger = require('../config/logger');

const mailConfig = {
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },
  };

const transporter = nodemailer.createTransport(mailConfig);

const sendEmail = async (to, subject, text, html) => {
    let recipients = [];
    if (Array.isArray(to)) {
        recipients = to;
    } else {
        recipients.push(to);
    }
    const mailOptions = {
        from: mailUserName,
        to: recipients,
        subject: subject,
        text: text,
        html: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return logger.error(error.message);
        }
        logger.info(`Email sent: ${info}`);
    });
}

module.exports = { sendEmail };

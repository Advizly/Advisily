const nodemailer = require("nodemailer");
const config = require("config");

const sendEmail = async ({ to, subject, html, from = config.emailFrom }) => {
  const transporter = nodemailer.createTransport(config.smtpOptions);
  await transporter.sendMail({ from, to, subject, html });
};

module.exports = sendEmail;

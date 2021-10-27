const nodemailer = require("nodemailer");
const config = require("config");

const sendEmail = async ({ to, subject, html, from = config.emailFrom }) => {
  const transporter = nodemailer.createTransport(config.gmailSmtpOptions);
  try {
    await transporter.sendMail({ from, to, subject, html });
  } catch (err) {
    console.log("Error while sending email:", err);
    throw "Error sending an email";
  }
};

module.exports = sendEmail;

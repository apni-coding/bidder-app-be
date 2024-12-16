const nodemailer = require("nodemailer");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const sendMail = async (userEmail, mailSubject, content) => {
  //1. create an email transporter
  // SMTP (Simple Mail Transfer Protocol)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "idealtechguru1@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //2. Config email content
  const mailOption = {
    from: "idealtechguru1@gmail.com",
    to: userEmail,
    subject: mailSubject,
    // html: content,
    text: content,
  };

  //3. Send Mail
  try {
    const result = await transporter.sendMail(mailOption);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error.message);
    // throw new Error(error.message);
  }
};

module.exports = sendMail;

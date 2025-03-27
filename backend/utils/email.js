const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function envoyerEmail(destinataire, sujet, message) {
  try {
    const mailOptions = {
      from: `"Culthive" <${process.env.EMAIL_USER}>`,
      to: destinataire,
      subject: sujet,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email envoyé avec succès !");
  } catch (error) {
    console.error("Erreur d'envoi d'email :", error);
  }
}

module.exports = envoyerEmail;

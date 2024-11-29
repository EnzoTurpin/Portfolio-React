const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// Route pour envoyer un email
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Configuration de Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Votre email pour recevoir les messages
      subject: `Nouveau message de contact de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #007BFF;">Nouveau message de ${name}</h2>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Message :</strong></p>
            ${message.replace(/\n/g, "<br>")}
          <hr>
          <p style="font-size: 12px; color: #999;">Cet email a été généré automatiquement depuis votre formulaire de contact.</p>
        </div>
      `,
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    res.status(200).send("Email envoyé avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    res.status(500).send("Erreur lors de l'envoi de l'email.");
  }
});

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});

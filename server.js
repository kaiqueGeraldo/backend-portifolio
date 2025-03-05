require("dotenv").config();
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// Configurar o transporte de email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Rota para enviar email
app.post("/enviar-email", async (req, res) => {
  const { nome, email, mensagem } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Nova mensagem de contato - ${nome}`,
    text: `Nome: ${nome}\nEmail: ${email}\nMensagem:\n${mensagem}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email enviado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao enviar email" });
  }
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});

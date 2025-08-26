require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({ origin: "https://kaique.dev.br" }));

// Verifica se as credenciais do e-mail estão definidas
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ ERRO: Variáveis EMAIL_USER e EMAIL_PASS não estão definidas!");
  process.exit(1);
}

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

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

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
    console.error("❌ Erro ao enviar email:", error);
    res.status(500).json({ error: "Erro ao enviar email" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});

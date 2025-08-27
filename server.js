require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({ origin: "https://kaique.dev.br" }));

const resend = new Resend(process.env.RESEND_API_KEY);
const meuEmail = process.env.EMAIL_USER;

// Rota para enviar email
app.post("/enviar-email", async (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  if (!nome || !email || !assunto || !mensagem) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Contato Portfólio <portfolio@kaique.dev.br>",
      to: [meuEmail],
      subject: assunto,
      reply_to: email,
      html: `
        <h1>Nova mensagem do Portfólio</h1>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem}</p>
      `,
    });

    if (error) {
      console.error("❌ Erro ao enviar email:", error);
      return res.status(400).json({ error });
    }

    res.status(200).json({ message: "Email enviado com sucesso!", data });
  } catch (error) {
    console.error("❌ Erro ao enviar email:", error);
    res.status(500).json({ error: "Erro interno ao enviar email" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  'https://kaique.dev.br'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Origem não permitida pelo CORS'));
    }
  },
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
};

app.options('*', cors(corsOptions));


app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);
const meuEmail = process.env.EMAIL_USER;

// Rota para enviar email
app.post("/enviar-email", cors(corsOptions), async (req, res) => {
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
      return res.status(400).json({ error: error.message || 'Erro no Resend' });
    }

    res.status(200).json({ message: "Email enviado com sucesso!", data: data });

  } catch (error) {
    console.error("❌ Erro interno:", error);
    res.status(500).json({ error: error.message || "Erro interno ao enviar email" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
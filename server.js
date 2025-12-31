require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { enviarEmail } = require("./src/controllers/emailController");

const app = express();
const PORT = process.env.PORT || 3001;

app.set('trust proxy', 1);

const allowedOrigins = [
  'https://kaique.dev.br',
  'http://localhost:3000'
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

app.use(express.json());
app.options('*', cors(corsOptions));

const emailLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 horas
  max: 3, 
  message: { error: "Você atingiu o limite de envios diários. Tente novamente amanhã." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.get("/", (req, res) => {
  res.send("API do Portfólio está online! 🚀");
});

app.post("/enviar-email", cors(corsOptions), emailLimiter, enviarEmail);

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
  console.log(`🛡️ Ambiente: ${process.env.NODE_ENV || 'development'}`);
});
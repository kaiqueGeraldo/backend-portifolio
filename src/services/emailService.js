const { Resend } = require("resend");
const { z } = require("zod");
const { gerarTemplateEmail } = require("../utils/emailTemplate");

const resend = new Resend(process.env.RESEND_API_KEY || "re_test_key");

const contactSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  
  email: z.string()
    .email("Formato de email inválido")
    .refine((email) => {
      if (!email.includes('@')) return false;
      
      return !email.endsWith("@exemplo.com") && !email.endsWith("@teste.com");
    }, "Não aceitamos emails de teste")
    .refine((email) => {
      const partes = email.split('@');
      if (partes.length < 2) return false; 
      
      const dominio = partes[1];
      return dominio.includes('.');
    }, "O domínio do email parece inválido"),

  assunto: z.string().min(3, "Assunto muito curto"),
  mensagem: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres"),
});

const sendEmailService = async (dados) => {
  const validacao = contactSchema.safeParse(dados);
  
  if (!validacao.success) {
    const primeiroErro = validacao.error.issues[0];
    const msgErro = primeiroErro ? primeiroErro.message : "Erro de validação desconhecido";
    throw new Error(msgErro);
  }

  const { nome, email, assunto, mensagem } = validacao.data;
  const meuEmail = process.env.EMAIL_USER;

  try {
    const { data, error } = await resend.emails.send({
      from: "Contato Portfólio <portfolio@kaique.dev.br>",
      to: [meuEmail],
      subject: `[Portfólio] ${assunto}`,
      reply_to: email,
      html: gerarTemplateEmail(nome, email, assunto, mensagem),
    });

    if (error) {
      throw new Error(error.message);
    }

    return { data };
  } catch (error) {
    throw new Error(error.message || "Falha ao enviar email via Resend");
  }
};

module.exports = { sendEmailService };
const { sendEmailService } = require("../services/emailService");

const enviarEmail = async (req, res) => {
  try {
    const resultado = await sendEmailService(req.body);
    
    return res.status(200).json({ 
      message: "Email enviado com sucesso!", 
      id: resultado.id 
    });

  } catch (error) {
    console.error("❌ Erro no envio:", error.message);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { enviarEmail };
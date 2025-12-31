const gerarTemplateEmail = (nome, email, assunto, mensagem) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
      <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
        
        <div style="border-bottom: 2px solid #eaeaea; padding-bottom: 20px; margin-bottom: 20px; text-align: center;">
          <h1 style="color: #333; margin: 0; font-size: 24px;">Nova Mensagem do Portfólio</h1>
          <p style="color: #666; font-size: 14px; margin-top: 5px;">Você recebeu um novo contato através do site.</p>
        </div>

        <div style="color: #444; line-height: 1.6;">
          <p style="margin-bottom: 10px;"><strong>👤 Nome:</strong> ${nome}</p>
          <p style="margin-bottom: 10px;"><strong>✉️ Email:</strong> <a href="mailto:${email}" style="color: #0070f3; text-decoration: none;">${email}</a></p>
          <p style="margin-bottom: 10px;"><strong>🏷️ Assunto:</strong> ${assunto}</p>
          
          <div style="background-color: #f1f3f5; padding: 15px; border-radius: 6px; margin-top: 20px; border-left: 4px solid #0070f3;">
            <p style="margin: 0; font-style: italic;">"${mensagem}"</p>
          </div>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea; text-align: center; font-size: 12px; color: #999;">
          <p>Este email foi enviado automaticamente pelo servidor do seu portfólio.</p>
          <p>Responder para: ${email}</p>
        </div>
      </div>
    </div>
  `;
};

module.exports = { gerarTemplateEmail };
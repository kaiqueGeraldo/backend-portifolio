const mockSend = jest.fn();

jest.mock("resend", () => {
  return {
    Resend: jest.fn().mockImplementation(() => {
      return {
        emails: {
          send: mockSend,
        },
      };
    }),
  };
});

const { sendEmailService } = require("../src/services/emailService");

describe("EmailService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSend.mockResolvedValue({ data: { id: "mock_123" }, error: null });
  });

  test("❌ Deve lançar erro se o email for inválido (Validação Zod)", async () => {
    const dadosInvalidos = {
      nome: "Kaique",
      email: "email-errado", 
      assunto: "Teste",
      mensagem: "Mensagem longa o suficiente para passar",
    };

    await expect(sendEmailService(dadosInvalidos)).rejects.toThrow("Formato de email inválido");
  });

  test("❌ Deve lançar erro se a mensagem for curta demais", async () => {
    const dadosCurtos = {
      nome: "Kaique",
      email: "teste@kaique.dev",
      assunto: "Dúvida", 
      mensagem: "Curta",
    };

    await expect(sendEmailService(dadosCurtos)).rejects.toThrow("A mensagem deve ter pelo menos 10 caracteres");
  });

  test("✅ Deve chamar o Resend.send quando os dados forem válidos", async () => {
    const dadosValidos = {
      nome: "Recrutador",
      email: "rh@empresa.com",
      assunto: "Vaga de Dev",
      mensagem: "Olá, gostamos do seu perfil e queremos conversar.",
    };

    mockSend.mockResolvedValue({ data: { id: "12345" }, error: null });

    const resultado = await sendEmailService(dadosValidos);

    expect(resultado).toHaveProperty("data");
    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: "[Portfólio] Vaga de Dev",
        to: [process.env.EMAIL_USER],
      })
    );
  });
});
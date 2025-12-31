const { enviarEmail } = require("../src/controllers/emailController");
const { sendEmailService } = require("../src/services/emailService");

jest.mock("../src/services/emailService");

const mockRequest = (body) => ({
  body,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("EmailController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("✅ Deve retornar status 200 quando o email for enviado com sucesso", async () => {
    sendEmailService.mockResolvedValue({ id: "12345" });

    const req = mockRequest({ nome: "Teste" });
    const res = mockResponse();

    await enviarEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Email enviado com sucesso!" })
    );
  });

  test("❌ Deve retornar status 400 quando o Service lançar um erro", async () => {
    sendEmailService.mockRejectedValue(new Error("Email inválido"));

    const req = mockRequest({ nome: "Teste" });
    const res = mockResponse();

    await enviarEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Email inválido" });
  });
});
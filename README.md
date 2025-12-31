# 📧 API de Envio de Emails (Portfólio)

API robusta desenvolvida em **Node.js** para gerenciar o envio de mensagens de contato.
O projeto utiliza arquitetura **MVC**, validação rigorosa de dados e proteção contra spam, garantindo segurança e escalabilidade.

---

## 🚀 Tecnologias e Funcionalidades

- **Node.js & Express**: Base da aplicação.
- **Resend**: SDK para envio de e-mails transacionais com alta entregabilidade.
- **Zod**: Validação de esquemas (garante que nome, email e mensagem sigam regras estritas).
- **Express Rate Limit**: Proteção contra DDoS e Spam (limita requisições por IP).
- **Jest**: Testes unitários para garantir a confiabilidade do serviço.
- **CORS & Dotenv**: Segurança e configuração de ambiente.

---

## 📌 Instalação e Configuração

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/kaiqueGeraldo/backend-portifolio.git](https://github.com/kaiqueGeraldo/backend-portifolio.git)
   ```

2. **Acesse o diretório:**
   ```bash
   cd backend-portifolio
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Configure as Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz e preencha conforme o exemplo:

   ```env
   PORT=3001
   RESEND_API_KEY=re_123456... (Sua chave do Resend)
   EMAIL_USER=seu.email@exemplo.com (Quem receberá os contatos)
   ```

---

## ▶️ Executando a API

### Modo de Desenvolvimento
```bash
npm run dev
```

### Modo de Produção
```bash
npm start
```

### 🧪 Rodando Testes
```bash
npm test
```

---

## 📬 Documentação da Rota

### `POST /enviar-email`

Envia a mensagem de contato. O sistema valida os dados e verifica limites de taxa antes de processar.

**Corpo da Requisição (JSON):**
```json
{
  "nome": "Recrutador Exemplo",
  "email": "rh@empresa.com",
  "assunto": "Proposta de Vaga",
  "mensagem": "Olá, gostamos do seu perfil e queremos agendar uma entrevista."
}
```

**Respostas Possíveis:**

| Status | Descrição | Exemplo de Resposta |
| :--- | :--- | :--- |
| **200** | Sucesso | `{ "message": "Email enviado com sucesso!", "id": "..." }` |
| **400** | Erro de Validação | `{ "error": "Formato de email inválido" }` |
| **429** | Limite Excedido | `{ "error": "Você atingiu o limite de envios diários." }` |
| **500** | Erro Interno | `{ "error": "Erro interno ao enviar email" }` |

---

## 🔧 Estrutura do Projeto (MVC)

O código foi organizado para facilitar manutenção e escalabilidade:

```
/
├── src/
│   ├── controllers/
│   ├── services/
│   └── utils/
├── tests/
├── server.js
└── package.json
```

---

## 🌍 Hospedagem (Deploy)

Esta API está pronta para ser hospedada em serviços como **Railway**, **Render** ou **Vercel**.

**Passos recomendados para Railway:**
1. Conecte seu repositório GitHub.
2. Nas configurações do projeto, adicione as variáveis de ambiente (`RESEND_API_KEY`, `EMAIL_USER`).
3. O Railway detectará o `package.json` e iniciará o deploy automaticamente.

---

## 📝 Licença
Este projeto está sob a **licença MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
Sinta-se à vontade para utilizar e modificar conforme necessário. 😊  

---

### Feito por **Kaique Geraldo**
🔗 [LinkedIn](https://linkedin.com) | 🐙 [GitHub](https://github.com/kaiqueGeraldo) | ✉️ [Email](mailto:kaiique2404@gmail.com)

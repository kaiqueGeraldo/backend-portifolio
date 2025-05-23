# 📧 API de Envio de Emails

Esta é uma API simples desenvolvida em **Node.js** com **Express** e **Nodemailer** para envio de e-mails. A API recebe os dados do usuário (nome, e-mail e mensagem) e envia um e-mail para o destinatário configurado.

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **Nodemailer**
- **Cors**
- **Dotenv**

## 📌 Instalação e Configuração

1. Clone este repositório:

   ```sh
   git clone https://github.com/kaiqueGeraldo/backend-portifolio.git
   ```

2. Acesse o diretório do projeto:

   ```sh
   cd backend-portifolio
   ```

3. Instale as dependências:

   ```sh
   npm install
   ```

4. Crie um arquivo **.env** na raiz do projeto e defina suas credenciais de e-mail:

   ```env
   EMAIL_USER=seuemail@gmail.com
   EMAIL_PASS=sua_senha_de_app
   ```
   > **Importante:** O Gmail não permite o uso da senha normal para aplicativos externos. Você precisa gerar uma **senha de app** em sua conta do Google para que o envio de e-mails funcione corretamente. Para isso, acesse [Minha Conta Google](https://myaccount.google.com/) > Segurança > Senhas de app.

## ▶️ Executando a API

Para iniciar a API com **PM2**, utilize o seguinte comando:

```sh
pm2 start server.js --name meu-servidor
```

Caso queira listar os processos em execução:

```sh
pm2 list
```

Para reiniciar a API:

```sh
pm2 restart meu-servidor
```

Para parar a API:

```sh
pm2 stop meu-servidor
```

## 🌍 Hospedagem no Railway

Esta API está hospedada no Railway, garantindo que ela permaneça ativa e acessível online. Para fazer o deploy no Railway, siga os passos:

1. Crie uma conta no Railway.

2. Crie um novo projeto e conecte seu repositório do GitHub.

3. Configure as variáveis de ambiente na aba Variables.

4. Inicie o deploy e aguarde a conclusão.

Após o deploy, sua API estará acessível pelo link gerado pelo Railway.

## 📬 Rotas da API

### **1️⃣ Enviar Email**

- **Rota:** `POST /enviar-email`
- **Descrição:** Envia um e-mail para o destinatário configurado.
- **Corpo da requisição (JSON):**
  ```json
  {
    "nome": "Kaique Geraldo",
    "email": "kaique@email.com",
    "mensagem": "Gostaria de entrar em contato!"
  }
  ```
- **Resposta de sucesso (200):**
  ```json
  {
    "message": "Email enviado com sucesso!"
  }
  ```
- **Resposta de erro (400 - campos ausentes):**
  ```json
  {
    "error": "Todos os campos são obrigatórios"
  }
  ```
- **Resposta de erro (500 - erro ao enviar e-mail):**
  ```json
  {
    "error": "Erro ao enviar email"
  }
  ```

## 🔧 Estrutura do Projeto

```
/
├── node_modules/      # Dependências do projeto
├── .env               # Variáveis de ambiente
├── .gitignore         # Arquivos ignorados pelo Git
├── package.json       # Configuração do projeto
├── server.js          # Arquivo principal do servidor
└── README.md          # Documentação da API
```

## 🛠️ Personalização

Caso deseje utilizar um provedor de e-mail diferente do Gmail, edite a configuração do Nodemailer no arquivo `server.js`:

```js
const transporter = nodemailer.createTransport({
  host: "smtp.seuprovedor.com",
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. Sinta-se à vontade para utilizar e modificar conforme necessário. 😊

---

Feito com ❤️ por **Kaique Geraldo** - [LinkedIn](https://www.linkedin.com/in/kaique-geraldo) | [GitHub](https://github.com/kaiqueGeraldo) | [Email](mailto:kaiique2404@gmail.com)

# 📧 API de Envio de Emails

Esta é uma API simples desenvolvida em **Node.js** com **Express** e **Resend** para o envio de e-mails transacionais.  
A API recebe os dados de um formulário de contato e os envia para um destinatário configurado, utilizando as melhores práticas para garantir a entrega.

---

## 🚀 Tecnologias Utilizadas
- Node.js  
- Express.js  
- Resend  
- Cors  
- Dotenv  

---

## 📌 Instalação e Configuração

Clone este repositório:
```bash
git clone https://github.com/kaiqueGeraldo/backend-portifolio.git
```

Acesse o diretório do projeto:
```bash
cd backend-portifolio
```

Instale as dependências:
```bash
npm install
```

Crie um arquivo **.env** na raiz do projeto e configure suas credenciais do Resend:
```env
# Chave de API gerada no painel do Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# E-mail para onde as mensagens serão enviadas
EMAIL_USER=seu-email-pessoal@gmail.com
```

⚠️ **Importante**: Para que o Resend funcione em produção, você precisa verificar um domínio em sua conta.  
Acesse o painel do Resend > **Domains** e siga as instruções para adicionar os registros DNS.

---

## ▶️ Executando a API

Para iniciar o servidor em modo de desenvolvimento com reinicialização automática:
```bash
npm run dev
```
(Certifique-se de ter o **nodemon** como dependência de desenvolvimento ou instale-o globalmente)

Para iniciar em produção:
```bash
npm start
```

---

## 🌍 Hospedagem no Railway
Esta API está hospedada no **Railway**, garantindo que ela permaneça ativa e acessível online.  

Para fazer o deploy no Railway, siga os passos:
1. Crie uma conta no [Railway](https://railway.app).  
2. Crie um novo projeto e conecte seu repositório do GitHub.  
3. Configure as variáveis de ambiente na aba **Variables** do seu projeto (`RESEND_API_KEY` e `EMAIL_USER`).  
4. Inicie o deploy e aguarde a conclusão.  

Após o deploy, sua API estará acessível pelo link gerado pelo Railway.

---

## 📬 Rotas da API

### 1️⃣ Enviar Email
- **Rota:** `POST /enviar-email`  
- **Descrição:** Envia um e-mail para o destinatário configurado.  

Corpo da requisição (**JSON**):
```json
{
  "nome": "Kaique Geraldo",
  "email": "visitante@email.com",
  "assunto": "Proposta de Trabalho",
  "mensagem": "Gostaria de entrar em contato!"
}
```

Resposta de sucesso (**200**):
```json
{
  "message": "Email enviado com sucesso!"
}
```

Resposta de erro (**400 - campos ausentes**):
```json
{
  "error": "Todos os campos são obrigatórios"
}
```

Resposta de erro (**500 - erro ao enviar e-mail**):
```json
{
  "error": "Erro ao enviar email"
}
```

---

## 🔧 Estrutura do Projeto
```
/
├── node_modules/       # Dependências do projeto
├── .env                # Variáveis de ambiente
├── .gitignore          # Arquivos ignorados pelo Git
├── package.json        # Configuração do projeto
├── server.js           # Arquivo principal do servidor
└── README.md           # Documentação da API
```

---

## 📝 Licença
Este projeto está sob a **licença MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
Sinta-se à vontade para utilizar e modificar conforme necessário. 😊  

---

### Feito com ❤️ por **Kaique Geraldo**  
🔗 [LinkedIn](https://linkedin.com) | [GitHub](https://github.com/kaiqueGeraldo) | ✉️ [Email](mailto:kaiique2404@gmail.com)

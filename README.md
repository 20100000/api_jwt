# 🚀 NestJS Node API - Autenticação JWT & Relacionamento de Entidades

Este projeto é uma API RESTful robusta desenvolvida com **NestJS**, cujo principal objetivo é implementar um sistema completo de **Autenticação e Autorização utilizando JSON Web Tokens (JWT)**. A aplicação gerencia uma relação de banco de dados do tipo *One-to-Many* (Um-para-Muitos) entre **Usuários** e **Produtos**, onde cada produto cadastrado é automaticamente vinculado ao usuário autenticado que realizou a requisição.

A arquitetura foi desenhada para rodar inteiramente em ambientes conteinerizados utilizando **Docker** e **Docker Compose**, contando com documentação interativa automatizada via **Swagger**.

---

## 🛠️ Tecnologias Utilizadas

O ecossistema do projeto foi construído utilizando as seguintes tecnologias e bibliotecas:

*   **[NestJS](https://nestjs.com)**: Framework Node.js progressivo para a construção de aplicações eficientes e escaláveis.
*   **[TypeScript](https://typescriptlang.org)**: Superset do JavaScript que adiciona tipagem estrita à linguagem.
*   **[TypeORM](https://typeorm.io)**: Object-Relational Mapper (ORM) para mapeamento das entidades e execução de queries SQL.
*   **[PostgreSQL](https://postgresql.org)**: Banco de dados relacional de alta performance (rodando em container isolado).
*   **[Passport.js & JWT](http://passportjs.org)**: Estratégia nativa de segurança para proteção de rotas e emissão de tokens de acesso.
*   **[BcryptJS](https://github.com)**: Algoritmo de criptografia de alta segurança para hashing de senhas.
*   **[Class-Validator & Class-Transformer](https://github.com)**: Validação automática de dados de entrada via DTOs (Data Transfer Objects).
*   **[Swagger (OpenAPI)](https://swagger.io)**: Interface gráfica interativa para testes e documentação dos endpoints.
*   **[Docker & Docker Compose](https://docker.com)**: Isolamento completo da aplicação e do banco de dados em contêineres.

---

## 👤 Desenvolvedor

*   **Nome:** Tiago Honorio
*   **E-mail:** [tiago_honorio2010@hotmail.com](mailto:tiago_honorio2010@hotmail.com)

---

## 📂 Arquitetura de Rotas e Segurança (Swagger)

A API expõe **11 endpoints** divididos de forma inteligente entre rotas públicas e privadas:

1.  **Auth (`/auth`)**: Rota pública de login que recebe e-mail/senha e emite o token de acesso (JWT contendo ID, Nome e E-mail ocultos).
2.  **Users (`/users`)**: 
    *   `POST /users`: Rota pública para novos cadastros (Sign Up).
    *   `GET`, `GET :id`, `PATCH`, `DELETE`: Rotas privadas (exigem cabeçalho `Authorization: Bearer <TOKEN>`).
3.  **Products (`/products`)**:
    *   Todos os endpoints (CRUD completo) são privados. Ao criar um produto, o sistema extrai o ID do usuário diretamente do token JWT de forma segura e faz o vínculo no banco.

---

## 🔄 Desenvolvimento Ágil com Live Reload (Volumes Docker)

O projeto está configurado com um mecanismo profissional de **Docker Volumes** (`compose.override.yml`). 

### Como funciona?
A sua pasta local de código está espelhada em tempo real com o diretório interno do contêiner Linux (`/usr/src/app`). 
*   **Você não precisa derrubar e reconstruir o Docker (`docker-compose up --build`) a cada alteração no código.**
*   Ao alterar qualquer arquivo no seu VS Code local e salvar (`Ctrl + S`), o NestJS rodando dentro do Docker intercepta o evento, compila o TypeScript em JavaScript e reinicia o servidor interno em menos de 2 segundos de forma automática.

---

## 🚀 Como Iniciar o Projeto

Siga os passos abaixo para clonar o repositório e inicializar a aplicação na sua máquina.

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
*   [Git](https://git-scm.com)
*   [Docker Desktop](https://docker.comproducts/docker-desktop/) rodando.

### 1. Clonar o Repositório
Abra o terminal da sua máquina e clone o projeto do GitHub:
```bash
git clone https://github.com/20100000/api_jwt.git
cd api_jwt
```

### 2. Configurar as Variáveis de Ambiente
Crie um arquivo chamado `.env` na raiz do projeto (no mesmo nível do arquivo `package.json`) e defina as credenciais:
```env
# Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=minhasenhasegura123
DB_DATABASE=meu_banco_nest

# Servidor e Segurança
PORT=3000
JWT_SECRET=UmaChaveSuperSecretaEGuardaBemForte123!
JWT_EXPIRES_IN=1d
```

### 3. Instalar Dependências Locais (Essencial para os Volumes do Docker)
Execute o comando abaixo na sua máquina física para estruturar a pasta de módulos que o Docker usará para o Live Reload:
```bash
npm install
```

### 4. Inicializar com Docker Build
Com o Docker ativo, execute o comando abaixo para construir as imagens e subir os contêineres do banco de dados e da API em segundo plano:
```bash
docker-compose down -v && docker-compose up --build -d
```

### 5. Acompanhar a Inicialização (Logs)
Para garantir que o NestJS iniciou perfeitamente e verificar a execução do **Seed de Usuário Administrador Automático**, rode:
```bash
docker-compose logs -f api
```

---

## 📄 Acessando a Documentação

Assim que o contêiner estiver online, abra o seu navegador e acesse:
👉 **`http://localhost:3000/api`**

Utilize o usuário criado automaticamente pelo script de Seed para realizar o seu primeiro teste de login:
*   **E-mail:** `tiago@email.com`
*   **Senha:** `admin123`

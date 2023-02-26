# Boilerplate de Autenticação com Nuxt 3, MongoDB, TypeScript, Prisma, Tailwind, VeeValidate e JSON Web Tokens

Este é um projeto de boilerplate para autenticação de usuários utilizando Nuxt 3, MongoDB, TypeScript, Prisma, Tailwind, VeeValidate e JSON Web Tokens. Este boilerplate é ideal para quem deseja criar um sistema de login e autenticação completo com uma estrutura robusta e escalável.

## Pré-requisitos

Antes de começar, certifique-se de que o seguinte esteja instalado em sua máquina:

- Node.js
- NPM ou Yarn
- MongoDB

## Instalação

1. Clone o repositório para sua máquina local usando o seguinte comando:

```js
git clone https://github.com/gabrielcaiana/boilerplate-nuxt3-authentication.git
```

2. Navegue até a pasta do projeto e instale as dependências usando NPM ou Yarn:

```js
npm install
```

ou

```js
yarn install
```

3. Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:

```js
DATABASE_URL = 'mongodb url';
JWT_ACCESS_TOKEN_SECRET = 'my_token_secret_for_access_token';
JWT_REFRESH_TOKEN_SECRET = 'my_token_secret_for_refresh_token';
```

4. Inicie o servidor de desenvolvimento usando o seguinte comando:

```js
npm run dev
```

ou

```js
yarn dev
```

5. O servidor será iniciado em http://localhost:3000.

## Uso

Este boilerplate inclui os seguintes endpoints:

- `/api/auth/login`: endpoint para fazer login de usuário e obter um token de acesso JWT.
- `/api/auth/register`: endpoint para criar uma nova conta de usuário.
- `/api/auth/user`: endpoint para obter informações do usuário atual autenticado.
- `/api/auth/refresh`: endpoint para renovar o token de acesso JWT expirado.

Todos os endpoints requerem autenticação por meio de um token de acesso JWT. O token deve ser enviado no cabeçalho Authorization de cada requisição, como `Bearer {token}`.

## Estrutura de Arquivos

Este boilerplate segue a estrutura de arquivos padrão do Nuxt 3. Além disso, a pasta `api` contém os arquivos para lidar com as requisições da API. A estrutura de arquivos da pasta `api` é a seguinte:

```js
api/
-- auth/
---- login.post.ts
---- refresh.get.ts
---- register.post.ts
---- user.get.ts
-- index.ts
```

## Tecnologias Utilizadas

Este projeto utiliza as seguintes tecnologias:

- [Nuxt.js 3](https://nuxt.com/)
- [MongoDB](https://www.mongodb.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [VeeValidate](https://vee-validate.logaretm.com/v4/)

## Contribuindo

Se você deseja contribuir para este projeto, sinta-se à vontade para enviar um pull request. Todas as contribuições são bem-vindas!

## Licença

Este projeto é licenciado sob a licença MIT. Consulte

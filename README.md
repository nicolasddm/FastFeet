# FastFeet
 > Projeto apenas Back-end, com CRUD de Users, podendo realizar login dando início a uma sessão. Usuário autenticado pode alterar suas próprias informações, e deletar e criar outros usuários, além de visualizá-los. Além disso, o Usuário autenticado pode realizar as 5 ações do CRUD dos recipients.  Usado NodeJS no back-end com Postgres como DB.

## Sumário 

- [Instalação](#instalação)
- [Créditos](#créditos)

---

## Instalação

- Você precisará de uma conexão com um banco de dados Postgres. Eu estou usando Docker para upar o container do DB e poder acessá-lo para fazer as requisições. 
Acesse este link para mais informações https://hub.docker.com/_/postgres

- Como essa aplicação é Back-End puramente, recomendo você baixar um aplicativo para testar a API. Eu uso Insomnia, porém Postman serve também. 
Você pode instalar umas dessas opções https://insomnia.rest/download/ ou https://www.postman.com/downloads/

- Além disso, eu uso o yarn. Intalá-lo acesse no ubuntu https://classic.yarnpkg.com/en/docs/install/#debian-stable

### Clone

- Clone esse repositório na sua máquina local `https://github.com/nicolasddm/FastFeet.git`

### Setup

> Instale as dependências do projeto pelo yarn

```shell
$ yarn install
```

> Adicione as tabelas no DB

```shell
$ yarn sequelize db:migrate
```

> Rode o Seeder (opcional) 

```shell
$ yarn sequelize db:seed:all
```

> Agora basta rodar o projeto. No package.json você pode encontrar alguns scripts. Para rodar usando o nodemon basta

```shell
$ yarn run dev
ou
$ yarn run dev:debug
```
---

## Créditos
 - Esse repositório foi feito por mim apenas. Nicolas Dencker De Marco.
 - Para entrar em contato, segue meu LinkedIn: https://www.linkedin.com/in/nicolas-de-marco/


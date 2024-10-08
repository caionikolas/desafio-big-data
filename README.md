# Desafio API usando NestJs utilizando Cloudinary

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=nest&logoColor=white)
![Nest](https://img.shields.io/badge/nestJS-%23DD0031.svg?style=for-the-badge&logo=nest&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

## Descrição do Desafio:
Criar uma API usando NestJS que permita o upload, armazenamento e gerenciamento de imagens utilizando o Cloudinary como serviço de armazenamento na nuvem. 

## Tecnologias Utilizadas

- [Nest](https://nestjs.com/) - Framework Node.js destinado ao desenvolvimento de aplicativos do lado do servidor.
- [Docker](https://www.docker.com/) - Serviço que usa virtualização para entregar software em pacotes chamados contêineres.
- [Postgres](https://www.postgresql.org/) - Sistema gerenciador de banco de dados objeto relacional

## Como Executar

1. Clone o repositório e acesse a pasta do projeto
   ```shell
   git clone https://github.com/caionikolas/desafio-big-data.git
   cd nome-do-repositorio
    ```
2. Instale os pacotes utilizando o comando `npm install`
3. Crie um arquivo `.env` na raiz do projeto e insira suas credencias. Utilize o arquivo `.env.example` como base.
4. Execute o projeto com o comando `npm start`

## API Endpoints
A API fornece os seguintes endpoints:

```markdown
POST /accounts - Registra um novo usuário.
{
   "name": string
   "email": string
   "senha": string
}


POST /sessions - Autentica um usuário
{
   "email": string
   "senha": string
}

return "access_token": string

POST /images/upload - Faz upload de uma imagem na Cloudinary e registra uma nova imagem banco de dados.
- Auth: access_token
- Form: file

GET /images - Obtem todas as imagens de um usuário autenticado
- Auth: access_token

DELETE /images/{cloudId} - Deleta uma imagem do servidor do cloudinary e do banco de dados de acordo com o seu cloudId
- Auth: access_token
{
   "cloudId": string
}
```

## Docker

Você pode rodar esse projeto com Docker seguindo os seguintes comandos:

```bash
$ docker-compose up
```

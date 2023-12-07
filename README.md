<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
# run app
$ yarn docker
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Endpoints

_Sign up_

```bash
POST http://localhost:3000/api/auth/signup

form-data:

  firstName
  lastName
  email
  file

Response:
{"access_token": ""}
```

_Sign in_

```bash
POST http://localhost:3000/api/auth/signin

body:
  {"email": ""}

Response:
{"access_token": ""}
```

_Create user_ (Protected route. Auth with Bearer token `access_token`)

```bash
POST http://localhost:3000/api/user/create

  form-data:

  firstName
  lastName
  email
  file
```

_Read user_

```bash
GET http://localhost:3000/api/user/{email}
```

_Update user_ (Protected route. Auth with Bearer token `access_token`)

```bash
PATCH http://localhost:3000/api/user/update

  form-data:
  
  firstName
  lastName
  email
  file
```

_Delete user_ (Protected route. Auth with Bearer token `access_token`)

```bash
DELETE http://localhost:3000/api/user/delete

  body:
  {"email": ""}
```

_Create pdf_ (Protected route. Auth with Bearer token `access_token`)

```bash
POST http://localhost:3000/api/user/create-pdf

  body:
  {"email": ""}

  Response: true/false
```

_Get pdf_ (Protected route. Auth with Bearer token `access_token`)

```bash
GET http://localhost:3000/api/user/pdf

  body:
  {"email": ""}

  Response: application/pdf
```

_Get user list_

```bash
GET http://localhost:3000/api/user/all
```

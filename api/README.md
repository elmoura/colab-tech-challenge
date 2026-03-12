<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Setup

```bash
# **.env.example disponível com as vars necessárias**
$ npm install
$ docker-compose up -d # Inicia dependências do projeto + API

```

## Compile and run the project

```bash
# development/watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Executando testes

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Arquitetura

Optei por utilizar o MongoDB como banco de dados pela facilidade e flexibilidade nos documentos salvos, permitindo ajustar o payload/modelo enquanto testava e validava a funcionalidade. Optei também por utilizar o Google Gemini como modelo de LLM. 

Na estrutura de pastas e separação de arquivos utilizei conceitos de Clean Architecture a fim de separar modelos, casos de uso, gateways e ports, a fim de tornar a solução mais modularizável e desacoplada entre si.
- Em `config` estão expostas as env vars que são utilizadas no projeto e a conexão com o database. Qualquer nível de configuração com serviços ou infraestrutura externa deve estar contido nessa pasta.
- Em `shared` estão services, ou qualquer outro tipo de arquivo reutilizável (isto é: não pertence a um módulo específico). Esses podem ser helper functions, enums ou APIs externas a serem consumidas.
- Em `modules` está a lógica do sistema de fato: os casos de uso e entidades que são criadas pelo projeto. Nessa camada estão tanto os models, quanto os repositories (deixei-os próximos para facilitar a localização e navegação no projeto), casos de uso e exceptions tratadas por lógica de negócio do fluxo. Ali, em arquivos separados, também estão as Controllers e injeção de dependência dos módulos. Decidi manter esses arquivos próximos pois pertencem ao mesmo contexto, apesar de terem funções diferentes entre si.

**O prompt de instruções para a LLM se encontra [aqui](./prompts/analize-report-ai-instructions.md)**

Abaixo segue o modelo da organização de pastas do projeto:

```
src/
├── config/
│   └── config.ts          # Objeto com valores de ambiente (env)
|
├── shared/                 # Código reutilizável
│   ├── utils/
│   └── services/           # Services reutilizáveis entre módulos (ex.: Gemini)
|
└── modules/                # Aqui se encontram os módulos com seus casos de uso
    └── [module-name]/
        ├── exceptions/
        │   └── invalid-data.exception.ts  # Erro customizado para validação/regra de negócio
        ├── entities/
        │   └── module-entity.ts           # Entidade Mongoose (decoradores @nestjs/mongoose)
        ├── datasources/
        │   └── module-entity.datasource.ts # Camada de acesso ao banco/repositories (Mongoose)
        ├── usecases/
        │   ├── dtos/
        │   │   ├── create-user-input.dto.ts   # Modelo de input + Validação com class-validator
        │   │   └── create-user-output.dto.ts  # Modelos de respostas
        │   ├── create-[feature-name].usecase.ts # Caso de uso (lógica individual de cada endpoint)
        │   └── create-[feature-name]-usecase.spec.ts # Testes unitários para cada caso de uso
        ├── [module-name].controller.ts
        ├── [module-name]-controller.spec.ts
        └── [module-name].module.ts
```
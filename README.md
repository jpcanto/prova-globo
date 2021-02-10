# Globo test

## DEV: João Pedro Lopes Canto

## User history:

Eu, como usuário, gostaria de ter uma aplicação onde pudesse gerenciar usuários (CRUD).

## Definição de pronto:

- Eu consigo listar os usuários cadastrados.
- Eu consigo editar um usuário.
- Eu consigo deletar um usuário.
- Eu consigo adicionar um usuário.
- A aplição deve atender o UI/UX propostos (Sketch enviado).
- O código deve seguir as boas práticas.
- Eu preciso ser notificado quando algo der errado, ou quando eu tentar fazer algo que não deve ser possível, para não passar impressão de bug.
- A aplicação precisa conter testes (e2e e/ou unit)

## Para executar a aplicação eu preciso:

- Para executar os passos a seguir, navegar antes para as pastas (backend, frontend).
- Os passos devem ser executados nas 2 pastas.
- Antes de executar o projeto frontend, executar o projeto backend.
- Não alterar a porta de execução do projeto VUE (frontend), caso seja necessário, alterar no projeto backend a porta de liberação no CORS (backend/src/app.js)

### Instalar as dependêncisa do projeto:

`yarn` ou `npm install`

### Agora, com as dependências do projeto instaladas, eu preciso executar o projeto localmente:

`yarn start` ou `npm start`

OBS: Se após rodar os comandos acima, o projeto não abrir no browser automaticamente, digitar manualmente no navegador: http://localhost:8080

### Para executar os testes, executar o comando:

- Para testes unitários: `yarn test:unit` ou `npm test:unit` (tecnologia utilzada: jest)
- Para testes e2e: `yarn test:e2e` ou `npm test:e2e` (tecnologia utilzada: cypress)

## Para executar os desafios do backend eu preciso:

### API: 'http://localhost:3333'

desafio 1:

- Endpoint: `/challenge/one`
- Method: `POST`
- Payload: `{ "array": [2, 7, 11, 15, 1, 10, 8], "target": 9 }`
- OBS: Testar um payload onde o resultado deve ser negativo (nenhum par tem a soma igual ao alvo)

desafio 2:

- Endpoint: `/challenge/two/:string`
- Method: `GET`
- Req Param: `({})`
- OBS: Alterar no endpoint ':string' pelo req Param forncedio, testar um Req param onde o resultado deve ser negativo

desafio 2:

- Endpoint: `/challenge/three`
- Method: `POST`
- Payload: `{ "array": [7,1,5,3,6,4] }`

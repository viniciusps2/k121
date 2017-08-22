## Amigo Secreto

### Pré-requisitos

- Node 8.2

- MongoDB

### Stack utilizada

#### Backend

- Koa: microframework HTTP;

- Ava: framework de testes multithread. Os testes são executados em paralelo, cada arquivo em um thread com ambiente isolado, forçando o desenvolvimento de testes atômicos, que não dependem de estado global ou do estado de outros teses;

- Nyc: coverage;

- Sinon: mock, stubs;

- Mongoose: ODM;

- Standard: lint

#### Frontend

- Angular 1.6;

- Angular Bootstrap

- Gulp

- Karma + Jasmine + Sinon + PhantomJS

### Instalação e execução

```
cd backend
npm i && npm start

# (outro terminal)
cd frontend
npm i && npm start
```

### Práticas adotas

- Async/Await

- Separação de testes unitários (arquivos nomeados .spec.js) de testes de integração (arquivos nomeados .it.js).


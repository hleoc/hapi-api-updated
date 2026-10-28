# Hapi API

API REST para gerenciamento de empresas, candidatos, vagas e candidaturas. O servidor é construído com Hapi.js, persiste os dados no MongoDB usando Mongoose e protege as rotas com autenticação JWT.

## Tecnologias

- Node.js e Hapi.js
- MongoDB e Mongoose
- JWT para autenticação
- Joi para validação de payloads
- Swagger para documentação interativa

## Requisitos

- Node.js 20.19 ou superior
- npm
- Uma instância MongoDB local ou remota

## Configuração

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Configure as variáveis de ambiente no arquivo `.env` na raiz do projeto:

   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/hapi_api
   JWT_SECRET=troque-por-um-segredo-forte
   PORT=3000
   HOST=localhost
   ```

   `MONGO_URI` deve apontar para uma instância MongoDB acessível. Use um valor secreto e exclusivo para `JWT_SECRET`; não compartilhe nem versione o arquivo `.env`.

## Executar

Inicie o servidor:

```bash
npm start
```

Para desenvolvimento, com reinicialização automática ao detectar alterações:

```bash
npm run dev
```

O servidor usa `HOST` e `PORT` para definir o endereço de escuta. Com os valores do exemplo, a API estará em `http://localhost:3000`.

## Documentação interativa

Com o servidor em execução, acesse o Swagger em:

```text
http://localhost:3000/documentation
```

Substitua `localhost:3000` pelos valores configurados em `HOST` e `PORT`.

## Autenticação

As rotas exigem um token JWT, exceto `POST /users/signup` e `POST /users/login`. Envie o token no cabeçalho `Authorization`:

```http
Authorization: <token>
```

Faça login para obter um token:

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"pessoa@exemplo.com\",\"password\":\"senha-segura\"}"
```

A resposta contém o token:

```json
{
  "token": "<jwt>"
}
```

Use o token retornado nas demais requisições protegidas. Os tokens expiram após um dia. Novas contas recebem o papel `candidate` por padrão. `GET /applications` é restrito a usuários com esse papel; as demais rotas protegidas exigem autenticação, sem restrição de papel definida na rota.

## Endpoints

Todos os endpoints abaixo, exceto cadastro e login, exigem o cabeçalho `Authorization`.

| Método | Caminho | Descrição |
| --- | --- | --- |
| `POST` | `/users/signup` | Cria uma conta |
| `POST` | `/users/login` | Autentica uma conta e retorna um JWT |
| `GET` | `/candidates` | Lista candidatos |
| `POST` | `/candidates` | Cria um candidato |
| `GET` | `/companies` | Lista empresas |
| `POST` | `/companies` | Cria uma empresa associada ao usuário autenticado |
| `GET` | `/companies/{id}` | Busca uma empresa pelo ID |
| `PUT` | `/companies/{id}` | Atualiza os campos enviados de uma empresa |
| `DELETE` | `/companies/{id}` | Exclui uma empresa |
| `GET` | `/jobs` | Lista vagas |
| `POST` | `/jobs` | Cria uma vaga |
| `GET` | `/applications` | Lista candidaturas; somente usuários `candidate` |
| `POST` | `/applications` | Cria uma candidatura |

IDs de empresas, candidatos e vagas devem ser IDs válidos do MongoDB (ObjectId).

## Formatos dos payloads

Os endpoints de criação esperam JSON. Campos disponíveis:

**Cadastro e login — `POST /users/signup` e `POST /users/login`:**

```json
{
  "email": "pessoa@exemplo.com",
  "password": "senha-segura"
}
```

**Empresa — `POST /companies`:**

```json
{
  "name": "Acme",
  "city": "São Paulo",
  "address": "Rua Exemplo, 123"
}
```

`name` é obrigatório; `city` e `address` são opcionais.

**Candidato — `POST /candidates`:**

```json
{
  "first_name": "Ana",
  "last_name": "Silva",
  "email": "ana@exemplo.com",
  "company": "<id-da-empresa>"
}
```

**Vaga — `POST /jobs`:**

```json
{
  "title": "Desenvolvedor(a) Backend",
  "company": "<id-da-empresa>"
}
```

**Candidatura — `POST /applications`:**

```json
{
  "candidate": "<id-do-candidato>",
  "job": "<id-da-vaga>",
  "hired": false
}
```

`hired` é opcional. Para atualizar uma empresa, envie em `PUT /companies/{id}` um ou mais campos entre `name`, `city` e `address`.

## Estrutura do projeto

```text
config/       Registro dos plugins e módulos da API
modules/      Recursos da API, organizados por domínio
plugins/      Plugins da aplicação, incluindo conexão com MongoDB
services/     Serviços auxiliares, como JWT e hash de senha
server.js     Configuração e inicialização do servidor
```

Cada recurso em `modules/` separa rotas, validações, controladores e modelos.

## Testes

O projeto ainda não possui testes configurados. O script `npm test` retorna uma mensagem informando que não há testes especificados.

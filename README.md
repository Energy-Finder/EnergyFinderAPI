# EnergyFinderAPI

**EnergyFinderAPI** é o back-end construído em **Node.Js** (com Express) para o projeto **Energy Finder**. <br />
Através dele é possível realizar o **cadastro/autenticação de usuários** e também a **criação, edição e busca dos distribuidores de energia** previamente cadastrados no banco de dados. Este por sua vez, foi criado em **SQL** e hospedado em nuvem (Microsoft Azure).

## Requisitos

É recomendado utilizar a seguinte versão do **Node**:

- Node **(v16.13.2)**

## Rodando a API

      $ git clone https://github.com/Energy-Finder/EnergyFinderAPI.git
      $ cd EnergyFinderAPI
      $ npm i
      $ npm start

A API será iniciada em: http://localhost:3001

## Requisições

Caso prefira, faça o download da **EnergyFinder Collection** e importe em seu API client de preferência (Insomnia, Postman, etc). Ela já contém todas as **requisições pré montadas** ;)

# Endpoints da API

A EnergyFind API possui no total 6 endpoints, saiba como usá-los:

## Criação de usuário

```http
POST /user
```

| Parâmetro | Tipo | Descrição |
| :--- | :--- | :--- |
| `username` | `string` | **Obrigatório**. Nome do usuário. |
| `email` | `string` | **Obrigatório**. Email de acesso do usuário. |
| `password` | `string` | **Obrigatório**. Senha de acesso do usuário. |

### Exemplo

```javascript
{
   "username": "Victor",
   "email": "victor@clarke.com.br",
   "password": "123"
}
```

## Autenticação de usuário

```http
GET /user/auth/:email/:password
```

| Parâmetro | Tipo | Descrição |
| :--- | :--- | :--- |
| `email` | `string` | **Obrigatório**. Email de acesso do usuário. |
| `password` | `string` | **Obrigatório**. Senha de acesso do usuário. |

## Criação de fornecedor

```http
POST /provider
```

| Parâmetro | Tipo | Descrição |
| :--- | :--- | :--- |
| `name` | `string` | **Obrigatório**. Nome do fornecedor |
| `logo` | `string` | **Obrigatório**. Url da logo do fornecedor |
| `uf` | `char` | **Obrigatório**. Uf do fornecedor |
| `kwhPrice` | `float` | **Obrigatório**. Preço cobrado pelo fornecedor por kWh |
| `kwhMinLimit` | `integer` | **Obrigatório**. Limite mínimo de kWh aceito pelo fornecedor |
| `totalClients` | `integer` | **Obrigatório**. Total de clientes do fornecedor |
| `averageRating` | `float` | **Obrigatório**. Média de avaliações do fornecedor |

### Exemplo

```javascript
{
   "name": "Clarke",
   "logo": "https://clarke.com.br/wp-content/uploads/2021/05/clarke-verde.svg",
   "uf": "SP",
   "kwhPrice": 100.0,
   "kwhMinLimit": 2000,
   "totalClients": 200,
   "averageRating": 5.0
}
```

## Atualização de fornecedor

```http
PUT /provider/:id
```

| Parâmetro | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | `string` | **Obrigatório**. Id do fornecedor. |
| `name` | `string` | **Obrigatório**. Nome do fornecedor. |
| `logo` | `string` | **Obrigatório**. Url da logo do fornecedor. |
| `uf` | `char` | **Obrigatório**. Uf do fornecedor. |
| `kwhPrice` | `float` | **Obrigatório**. Preço cobrado pelo fornecedor por kWh. |
| `kwhMinLimit` | `integer` | **Obrigatório**. Limite mínimo de kWh aceito pelo fornecedor. |
| `totalClients` | `integer` | **Obrigatório**. Total de clientes do fornecedor. |
| `averageRating` | `float` | **Obrigatório**. Média de avaliações do fornecedor. |

### Exemplo

```javascript
{
   "name": "Clarke Energia",
   "logo": "https://clarke.com.br/wp-content/uploads/2021/05/clarke-verde.svg",
   "uf": "SP",
   "kwhPrice": 500.0,
   "kwhMinLimit": 3000,
   "totalClients": 250,
   "averageRating": 5.0
}
```

## Listando fornecedores

```http
GET /provider
```
Para listar os fornecedores é necessário informar um token de autenticação através dos headers da requisição:

```javascript
   "x-access-token": "seu-token"
```
Caso ainda não possua um **token**, autentique-se pelo endpoint: ``/user/auth/:email/:password``. Ele será **informado na resposta da requisição**.

## Listando fornecedores por limite mínimo de kWh

```http
GET /provider/:limit
```

| Parâmetro | Tipo | Descrição |
| :--- | :--- | :--- |
| `limit` | `string` | **Obrigatório**. Limite mínimo de kWh. |

Para listar fornecedores por kWh também é necessário informar o token de autenticação. Siga os passos já informados ;)

## Response

Formato de resposta padrão da EnergyFinder API:

```javascript
{
   "success": true,
   "data": [],
   "error": []
}
```

| Campo | Tipo | Descrição |
| :--- | :--- | :--- |
| `success` | `boolean` | Descreve se a transação foi bem-sucedida ou não. |
| `data` | `object` | Contém os metadados associados à resposta. |
| `error` | `object` | Contém os erros associados à requisição. |

## Status code

A EnergyFinderAPI retorna os seguintes status code:

| Código | Mensagem | Descrição
| :--- | :--- | :--- |
| 200 | `OK` | Requisição processada com sucesso. |
| 201 | `CREATED` | Criação realizada com sucesso no BD. |
| 400 | `BAD REQUEST` | Erro em um ou mais parâmetros informados na requisição. |
| 404 | `NOT FOUND` | Não encontrado endpoint informado ou informação correspondente no BD. |
| 500 | `INTERNAL SERVER ERROR` | Erro interno na API. |

## Rodando testes

Para rodar os testes de integração, apenas execute o comando: 

      $ npm test

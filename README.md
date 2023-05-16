Desafio ze-code, você pode encontrar os detalhes do desafio no seguinte repositório: https://github.com/ZXVentures/ze-code-challenges/blob/master/backend.md

## API Routes

### Create Partner

- **Endpoint:** `POST /api/v1/partner`
- **Description:** Creates a new partner.
- **Body Parameters:** (provide the expected request body structure, you can see examples in the aforementioned repository)

### Get Partner by ID

- **Endpoint:** `GET /api/v1/partner/<partnerId>`
- **Description:** Retrieves partner details based on the specified ID.
- **Path Parameters:**
  - `<partnerId>`: The unique identifier (id) of the partner.

### Search Partner

- **Endpoint:** `GET /api/v1/partner/search/`
- **Description:** Searches for partners based on the provided latitude and longitude.
- **Query Parameters:**
  - `lat`: The latitude coordinate for the search.
  - `lng`: The longitude coordinate for the search.


## Tecnologias: 
- NodeJS
- TypeScript
- Express
- Prisma
- PostgreSQL

## INSTALLATION
- install dependencies with `npm install` command
- create .env and provide correct values: 
  - DATABASE_URL=<YOUR_POSTGRESQL_CONNECTION_URL>
- start the back-end with 'npm run devStart'
- you should see "Server is running ..." text

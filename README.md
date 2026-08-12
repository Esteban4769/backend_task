# Books API

A Node.js REST API with authentication and role-based authorization for managing users and books.

## Features

- Signup / login with hashed passwords
- Role-based access control (`admin` and `user`)
- Full CRUD for books
- Full CRUD for users (admin only)

## Tech Stack

- Node.js / Express
- Sequelize ORM (PostgreSQL/SQL)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A SQL database (e.g. PostgreSQL)

### Installation

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
```

### Running the app

##

```bash
npm start
```

The API will be available at `http://localhost:3000`.

## Testing the API

1. Sign up a user: `POST /signup` with `{ "name", "email", "password" }`
2. Log in: `POST /login` with `{ "email", "password" }` to get a JWT
3. Use the token in the `Authorization: Bearer <token>` header for protected routes

## API Reference

### Auth

| Method | Endpoint  | Description         | Access |
|--------|-----------|----------------------|--------|
| POST   | /signup   | Register a new user  | Public |
| POST   | /login    | Log in, get a token  | Public |

### Users

| Method | Endpoint     | Description                  | Access |
|--------|--------------|-------------------------------|--------|
| GET    | /users       | List all users               | Admin  |
| POST   | /users       | Create a user                | Admin  |
| GET    | /users/:id   | Get a user by id             | Admin  |
| PUT    | /users/:id   | Replace a user (all fields)  | Admin  |
| PATCH  | /users/:id   | Update a user (partial)      | Admin  |
| DELETE | /users/:id   | Delete a user                | Admin  |

### Books

| Method | Endpoint     | Description                  | Access       |
|--------|--------------|-------------------------------|--------------|
| GET    | /books       | List all books               | User / Admin |
| GET    | /books/:id   | Get a book by id             | User / Admin |
| POST   | /books       | Create a book                | Admin        |
| PUT    | /books/:id   | Replace a book (all fields)  | Admin        |
| PATCH  | /books/:id   | Update a book (partial)      | Admin        |
| DELETE | /books/:id   | Delete a book                | Admin        |

## Roles

- **user** — can view the list of books and get a book by id.
- **admin** — can do everything a user can, plus create/edit/delete books, and manage users (list, create, edit, delete).




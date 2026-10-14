<div align="center">

# Node Auth JWT Cookie Bcrypt

### Secure authentication API for modern web applications

A production-ready REST API built with **Node.js**, **Express**, **MongoDB**, and **JWT**. It provides a complete authentication lifecycle with email verification, secure password handling, access and refresh tokens, protected routes, and password recovery.

[![Live API](https://img.shields.io/badge/Live%20API-Render-46E3B7?logo=render&logoColor=white)](https://node-auth-jwt-cookie-bcrypt-4.onrender.com/)
[![Node.js](https://img.shields.io/badge/Node.js-ESM-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](./package.json)

<p>
  <a href="#overview">Overview</a> ·
  <a href="#features">Features</a> ·
  <a href="#api-reference">API Reference</a> ·
  <a href="#local-development">Development</a> ·
  <a href="#deployment">Deployment</a>
</p>

</div>

---

## Overview

This project implements the backend foundation for an authentication system. It is designed to support frontend applications that need reliable user registration, verified accounts, secure sessions, protected resources, and password recovery.

The API is deployed and available at:

> **Live API:** [https://node-auth-jwt-cookie-bcrypt-4.onrender.com/](https://node-auth-jwt-cookie-bcrypt-4.onrender.com/)

> **Note:** This is an API service. Use Postman, Insomnia, cURL, or a frontend application to send requests.

## Features

- User registration with validated input
- Password hashing with `bcrypt`
- Email verification with expiring verification tokens
- Login restricted to verified accounts
- JWT access tokens for protected API requests
- Refresh tokens stored and managed in MongoDB
- HTTP-only refresh-token cookies
- Refresh-token expiration and revocation support
- Protected user profile endpoint
- Forgot-password and password-reset workflows
- Email delivery through Nodemailer
- Request validation with Joi
- MongoDB persistence through Mongoose
- CORS and cookie parsing support
- Centralized asynchronous error handling
- Environment-based configuration

## Technology Stack

| Layer | Technology |
| --- | --- |
| Runtime | Node.js with ECMAScript modules |
| Web framework | Express 5 |
| Database | MongoDB |
| Database layer | Mongoose |
| Authentication | JSON Web Token |
| Password hashing | bcrypt |
| Validation | Joi |
| Email delivery | Nodemailer |
| Middleware | cookie-parser, cors, dotenv |
| Deployment | Render |

## Authentication Architecture

```text
┌──────────────┐
│   Register   │
└──────┬───────┘
       │
       ▼
┌──────────────┐       Verification email
│ Verify email │ ─────────────────────────► User
└──────┬───────┘
       │
       ▼
┌──────────────┐       Access token
│    Login     │ ─────────────────────────► Client
└──────┬───────┘
       │                         │
       │ HTTP-only refresh       │ Bearer access token
       │ cookie                  ▼
       │                  Protected endpoints
       ▼
┌──────────────┐
│ Refresh token│ ───────► New access token
└──────────────┘
```

### Token model

- **Access token:** short-lived token sent in the `Authorization` header.
- **Refresh token:** longer-lived token stored in an HTTP-only cookie and persisted for session management.
- **Protected routes:** require a valid access token using the Bearer authentication scheme.

## API Reference

All authentication endpoints are prefixed with `/api/auth`.

### Endpoint summary

| Method | Endpoint | Access | Purpose |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Public | Create a user account and send a verification email |
| `POST` | `/api/auth/login` | Public | Authenticate a verified user |
| `GET` | `/api/auth/verifyEmail` | Public | Verify an email address using a token |
| `GET` | `/api/auth/profile` | Bearer token | Return the authenticated user profile |
| `POST` | `/api/auth/refreshToken` | Refresh cookie | Issue a new access token |
| `POST` | `/api/auth/logout` | Refresh cookie | Revoke the current refresh-token session |
| `POST` | `/api/auth/forgotPassword` | Public | Send a password-reset email |
| `POST` | `/api/auth/resetPassword` | Public | Set a new password using a reset token |

### Authorization header

Protected endpoints expect the access token in this format:

```http
Authorization: Bearer <access-token>
```

### Example: register

```bash
curl -X POST https://node-auth-jwt-cookie-bcrypt-4.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "your-secure-password"
  }'
```

### Example: login

```bash
curl -i -c cookies.txt -X POST \
  https://node-auth-jwt-cookie-bcrypt-4.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "your-secure-password"
  }'
```

### Example: authenticated profile request

```bash
curl https://node-auth-jwt-cookie-bcrypt-4.onrender.com/api/auth/profile \
  -H "Authorization: Bearer <access-token>"
```

> Request and response fields may depend on the validation rules and models currently implemented in the repository.

## Local Development

### Prerequisites

- Node.js 18 or newer
- npm
- MongoDB, either local or hosted
- SMTP-compatible email account

### Installation

```bash
git clone https://github.com/udaynarendra/node-auth-jwt-cookie-bcrypt.git
cd node-auth-jwt-cookie-bcrypt
npm install
```

### Environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL=mongodb://127.0.0.1:27017/authentication

ACCESS_TOKEN_SECERT=replace-with-a-long-random-access-token-secret
REFRESH_TOKEN_SECRET=replace-with-a-long-random-refresh-token-secret

USER_EMAIL=your-email@example.com
APP_PASSWORD=your-email-app-password
CLIENT_URL=http://localhost:3000
```

| Variable | Required | Description |
| --- | :---: | --- |
| `DATABASE_URL` | Yes | MongoDB connection string |
| `ACCESS_TOKEN_SECERT` | Yes | Secret used to sign access tokens. The spelling matches the current source code. |
| `REFRESH_TOKEN_SECRET` | Yes | Secret used to sign refresh tokens |
| `USER_EMAIL` | Yes | Email address used by Nodemailer |
| `APP_PASSWORD` | Yes | Email provider app password or SMTP credential |
| `CLIENT_URL` | Yes | Frontend origin used in verification and password-reset links |

> Never commit `.env` files, private keys, passwords, or token secrets to source control.

### Run the application

```bash
npm start
```

The current server entry point listens on port `5000`.

## Project Structure

```text
.
├── src/
│   ├── config/              # Database connection
│   ├── controller/          # Authentication request handlers
│   ├── middlewares/         # Authentication and error middleware
│   ├── models/              # Mongoose data models
│   ├── routes/              # Express route definitions
│   ├── utility/             # Tokens, email, errors, and helpers
│   ├── validators/          # Joi request validation
│   └── app.js               # Express application setup
├── .env                     # Local secrets; never commit
├── .gitignore
├── package.json
├── server.js                # Application entry point
└── README.md
```

## Deployment

The API is deployed on Render:

**https://node-auth-jwt-cookie-bcrypt-4.onrender.com/**

### Production deployment checklist

- Configure every required environment variable in Render.
- Use strong, randomly generated token secrets.
- Set `CLIENT_URL` to the exact trusted frontend origin.
- Use a production MongoDB database with restricted network access.
- Use an email provider app password rather than a personal email password.
- Enable HTTPS and verify secure-cookie behavior across frontend and API domains.
- Review CORS configuration before connecting a production frontend.
- Do not expose credentials or tokens in logs.

## Security Notes

This project includes several security-focused mechanisms, but deployment security also depends on infrastructure and configuration. Before using the API in a high-risk production environment, consider adding:

- Rate limiting for login and password-reset endpoints
- Request size limits and stricter CORS configuration
- Security headers such as Helmet
- Structured production logging and monitoring
- Automated security and dependency scanning
- Comprehensive unit and integration tests
- Token reuse detection and session management controls
- Consistent error responses that do not reveal account existence

## Testing

You can test the API with:

- Postman
- Insomnia
- cURL
- A browser-based frontend client

Example request to the deployed service:

```bash
curl -i https://node-auth-jwt-cookie-bcrypt-4.onrender.com/
```

## Development Workflow

1. Create a feature branch.

   ```bash
   git checkout -b feat/your-feature
   ```

2. Install dependencies with `npm install`.
3. Configure local environment variables.
4. Run the API with `npm start`.
5. Test the affected endpoints.
6. Open a pull request with a clear description of the change.

## Roadmap

- OpenAPI/Swagger specification
- Automated unit and integration test coverage
- Docker and Docker Compose support
- Redis-backed refresh-token storage
- Google and GitHub OAuth
- Two-factor authentication
- CI/CD pipeline
- Rate limiting and audit logging
- Health and readiness endpoints

## License

This project is licensed under the **ISC License**. See `package.json` for the project license declaration.

## Author

**Uday Narendra**

- Repository: [udaynarendra/node-auth-jwt-cookie-bcrypt](https://github.com/udaynarendra/node-auth-jwt-cookie-bcrypt)
- Live API: [node-auth-jwt-cookie-bcrypt-4.onrender.com](https://node-auth-jwt-cookie-bcrypt-4.onrender.com/)

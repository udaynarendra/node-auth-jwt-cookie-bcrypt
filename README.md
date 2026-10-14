# Node Auth JWT Cookie Bcrypt

A production-oriented authentication REST API built with **Node.js**, **Express**, **MongoDB**, and **JWT**. The API provides account registration, email verification, secure login, access and refresh token management, password recovery, and protected user resources.

## Live API

The deployed API is available at:

**https://node-auth-jwt-cookie-bcrypt-4.onrender.com/**

> This project is an API service. Use an API client such as Postman, Insomnia, or a frontend application to interact with the endpoints.

## Features

- User registration
- Email verification
- Secure password hashing with bcrypt
- Login with JWT-based authentication
- Short-lived access tokens
- Long-lived refresh tokens
- Refresh token rotation
- HTTP-only cookie support
- Protected profile endpoint
- Forgot-password workflow
- Password reset workflow
- Request validation with Joi
- CORS and cookie parsing
- Centralized error handling
- MongoDB persistence with Mongoose
- Email delivery with Nodemailer

## Technology Stack

| Category | Technology |
| --- | --- |
| Runtime | Node.js |
| Framework | Express 5 |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JSON Web Token (JWT) |
| Password security | bcrypt |
| Validation | Joi |
| Email | Nodemailer |
| Middleware | cookie-parser, cors, dotenv |

## Authentication Flow

```text
Register
   ↓
Verify email address
   ↓
Login
   ↓
Receive access and refresh tokens
   ↓
Call protected endpoints with the access token
   ↓
Refresh the access token when it expires
   ↓
Logout and invalidate the session
```

## API Reference

All authentication routes are prefixed with `/api/auth`.

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Public | Create a new user account |
| `POST` | `/api/auth/login` | Public | Authenticate a user |
| `GET` | `/api/auth/verifyEmail` | Public | Verify a user’s email address |
| `GET` | `/api/auth/profile` | Required | Retrieve the authenticated user profile |
| `POST` | `/api/auth/refreshToken` | Refresh token | Generate a new access token |
| `POST` | `/api/auth/logout` | Session-based | Log out the current user |
| `POST` | `/api/auth/forgotPassword` | Public | Request a password reset email |
| `POST` | `/api/auth/resetPassword` | Public | Reset a password using a valid token |

### Protected Requests

Send the access token using the standard Bearer authorization header:

```http
Authorization: Bearer <access-token>
```

## Local Development

### Prerequisites

- Node.js 18 or later
- npm
- MongoDB database
- SMTP-compatible email account

### Installation

```bash
git clone https://github.com/udaynarendra/node-auth-jwt-cookie-bcrypt.git
cd node-auth-jwt-cookie-bcrypt
npm install
```

### Environment Configuration

Create a `.env` file in the project root. Never commit secrets or production credentials to source control.

```env
DATABASE_URL=mongodb://127.0.0.1:27017/authentication

ACCESS_TOKEN_SECERT=replace-with-a-long-random-access-token-secret
REFRESH_TOKEN_SECRET=replace-with-a-long-random-refresh-token-secret

USER_EMAIL=your-email@example.com
APP_PASSWORD=your-email-app-password
CLIENT_URL=http://localhost:3000
```

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | MongoDB connection string |
| `ACCESS_TOKEN_SECERT` | Secret used to sign access tokens; the spelling matches the current application code |
| `REFRESH_TOKEN_SECRET` | Secret used to sign refresh tokens |
| `USER_EMAIL` | Email address used by Nodemailer |
| `APP_PASSWORD` | SMTP or provider app password |
| `CLIENT_URL` | Frontend URL used in verification and password-reset links |

### Start the Server

```bash
npm start
```

The server starts using the command defined in `package.json`.

## Project Structure

```text
.
├── src
│   ├── config          # Database configuration
│   ├── controller       # Request controllers
│   ├── middlewares      # Authentication and error middleware
│   ├── models           # Mongoose models
│   ├── routes           # Express routes
│   ├── utility          # Tokens, email, errors, and helpers
│   └── app.js           # Express application configuration
├── .env                 # Local environment variables; do not commit
├── .gitignore
├── package.json
└── README.md
```

## Security Considerations

- Store all secrets in environment variables.
- Use strong, unique token secrets in every environment.
- Use HTTPS in production.
- Configure `CLIENT_URL` to an explicitly trusted frontend origin.
- Keep access tokens short-lived and protect refresh tokens carefully.
- Use an email provider app password instead of a personal account password.
- Do not log passwords, tokens, reset links, or other sensitive credentials.
- Restrict MongoDB network access and use a dedicated database user in production.
- Review cookie settings when deploying across different domains.

## Deployment

This API is deployed on Render at:

**https://node-auth-jwt-cookie-bcrypt-4.onrender.com/**

For a production deployment, configure the required environment variables in the hosting provider’s secret or environment-variable settings. Do not upload the `.env` file.

## Testing

The endpoints can be tested with:

- Postman
- Insomnia
- cURL
- A browser-based frontend client

Example health check request:

```bash
curl https://node-auth-jwt-cookie-bcrypt-4.onrender.com/
```

## Roadmap

- OpenAPI/Swagger documentation
- Automated unit and integration tests
- Docker support
- Redis-backed refresh-token storage
- OAuth login with Google and GitHub
- Two-factor authentication
- CI/CD workflow
- Rate limiting and request auditing

## Contributing

1. Fork the repository.
2. Create a feature branch:

   ```bash
   git checkout -b feat/your-feature
   ```

3. Make and test your changes.
4. Commit your work with a clear message.
5. Open a pull request describing the change.

## License

This project is licensed under the ISC License as specified in `package.json`.

## Author

**Uday Narendra**

Repository: https://github.com/udaynarendra/node-auth-jwt-cookie-bcrypt

# Authentication System API

A secure REST API for user authentication built with **Node.js**, **Express.js**, **MongoDB**, and **JWT**. The application provides user registration, email verification, authentication using access and refresh tokens, password reset, and protected routes following modern security practices.

---

## Features

* User Registration
* Email Verification
* User Login
* JWT Authentication
* Access Token & Refresh Token
* Refresh Token Rotation
* Protected Routes
* Forgot Password
* Reset Password
* User Logout
* Password Hashing (bcrypt)
* Request Validation (Joi)
* Centralized Error Handling
* Logging
* Secure Cookies

---

## Tech Stack

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB
* Mongoose

**Authentication**

* JSON Web Token (JWT)
* bcrypt

**Validation**

* Joi

**Logging**

* Winston / Pino

**Email Service**

* Nodemailer

---

## Project Structure

```text
.
├── src
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   ├── validations
│   ├── app.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate to the project

```bash
cd authentication-system
```

Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

MONGODB_URI=

JWT_ACCESS_SECRET=

JWT_REFRESH_SECRET=

ACCESS_TOKEN_EXPIRES_IN=15m

REFRESH_TOKEN_EXPIRES_IN=7d

EMAIL_USER=

EMAIL_PASS=

CLIENT_URL=
```

---

## Running the Application

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

## Authentication Flow

```text
Register
   ↓
Email Verification
   ↓
Login
   ↓
Generate Access Token
   ↓
Generate Refresh Token
   ↓
Access Protected Routes
   ↓
Refresh Access Token
   ↓
Logout
```

---

## API Endpoints

| Method | Endpoint                    | Description                    |
| ------ | --------------------------- | ------------------------------ |
| POST   | `/api/auth/register`        | Register a new user            |
| GET    | `/api/auth/verify-email`    | Verify email address           |
| POST   | `/api/auth/login`           | Login user                     |
| POST   | `/api/auth/refresh-token`   | Generate new access token      |
| POST   | `/api/auth/logout`          | Logout user                    |
| POST   | `/api/auth/forgot-password` | Send password reset link       |
| POST   | `/api/auth/reset-password`  | Reset password                 |
| GET    | `/api/auth/profile`         | Get authenticated user profile |

---

## Database Collections

### Users

```text
_id
name
email
password
role
isVerified
createdAt
updatedAt
```

### RefreshTokens

```text
_id
user
token
expiresAt
isRevoked
createdAt
updatedAt
```

### EmailVerificationTokens

```text
_id
user
token
expiresAt
createdAt
```

### PasswordResetTokens

```text
_id
user
token
expiresAt
createdAt
```

---

## Security

* Password hashing using bcrypt
* JWT-based authentication
* Access & Refresh Token strategy
* Refresh Token rotation
* HTTP-only cookies
* Email verification
* Password reset tokens
* Input validation
* Centralized error handling
* Environment variable management

---

## Testing

The API can be tested using:

* Postman
---

## Future Improvements

* Google OAuth
* GitHub OAuth
* Two-Factor Authentication (2FA)
* Redis-based token storage
* Docker support
* API documentation (Swagger/OpenAPI)
* Unit and Integration Testing

---

## License

This project is licensed under the MIT License.

# Node Auth JWT Cookie Bcrypt

A simple authentication backend built with Node.js and Express.js using JWT, bcrypt, and cookies. User data is stored in a local `data.json` file instead of a database.

---

## Features

- User Registration
- User Login
- Password Hashing with bcrypt
- JWT Authentication
- Cookie-based Authentication
- Protected Routes
- Logout Functionality
- File-based Storage using `data.json`

---

## Tech Stack

- Node.js
- Express.js
- JWT
- bcrypt
- cookie-parser
- File System (`fs`)

---

## Project Structure

```bash
project-folder/
│
├── controllers/
│   └── authController.js
│
├── middlewares/
│   └── authMiddleware.js
│
├── routes/
│   └── authRoutes.js
│
├── data/
│   └── data.json
│
├── server.js
├── package.json
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/node-auth-jwt-cookie-bcrypt.git
```

Move into the project folder:

```bash
cd node-auth-jwt-cookie-bcrypt
```

Install dependencies:

```bash
npm install
```

---

## Required Packages

```bash
npm install express bcrypt jsonwebtoken cookie-parser
```

---

## Run the Server

```bash
node server.js
```

or

```bash
npx nodemon server.js
```

Server runs on:

```bash
http://localhost:5000
```

---

## API Endpoints

### Register User

**POST** `/register`

```json
{
  "email": "user@gmail.com",
  "password": "123456"
}
```

### Process

1. Reads users from `data.json`
2. Checks if user already exists
3. Hashes password using bcrypt
4. Stores user in `data.json`

---

### Login User

**POST** `/login`

```json
{
  "email": "user@gmail.com",
  "password": "123456"
}
```

### Process

1. Finds user from `data.json`
2. Compares password using bcrypt
3. Creates JWT token
4. Sends token in cookies

---

### Protected Route

**GET** `/profile`

Requires valid JWT token from cookies.

### Process

1. Middleware checks token from cookies
2. JWT verifies token
3. Access granted if token is valid

---

### Logout User

**GET** `/logout`

Clears authentication cookie.

---

## Authentication Flow

```text
1. User Registers
2. Password gets hashed using bcrypt
3. User logs in
4. JWT token is created
5. Token stored in cookies
6. Browser sends cookie automatically
7. Middleware verifies JWT
8. Protected route accessed
```

---

## Example data.json

```json
[
  {
    "email": "user@gmail.com",
    "password": "$2b$10$hashedpassword"
  }
]
```

---

## Security Used

### bcrypt

- Hashes passwords securely
- Prevents plain text password storage

### JWT

- Verifies authenticated users
- Used for protected routes

### Cookies

- Stores JWT token securely
- Automatically sent with requests

---

## Future Improvements

- MongoDB Integration
- Refresh Tokens
- Role-based Authentication
- Email Verification
- Password Reset
- Input Validation
- Rate Limiting

---

## Learning Goals

This project helps beginners understand:

- Backend authentication flow
- JWT working process
- bcrypt hashing
- Middleware usage
- Cookie handling
- File handling in Node.js

---

## Author

Developed by Uday Narendra


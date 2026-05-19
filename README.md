# node-auth-jwt-cookie-bcrypt
JWT Authentication API

A simple backend authentication project built with Node.js and Express.js using:

JWT Authentication
bcrypt password hashing
Cookies for token storage
File-based database using data.json

This project demonstrates a basic authentication system without using MongoDB or SQL databases.

Features
User Registration
User Login
Password Hashing with bcrypt
JWT Token Generation
Cookie-based Authentication
Protected Routes
Logout Functionality
Data stored in data.json
Tech Stack
JavaScript
Node.js
Express.js
JWT
bcrypt
Cookie Parser
File System (fs module)
Project Structure
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
Installation

Clone the repository:

git clone <your-repository-link>

Move into the project folder:

cd project-folder

Install dependencies:

npm install
Required Packages

Install these packages:

npm install express bcrypt jsonwebtoken cookie-parser
Run the Server
node server.js

or using nodemon:

npx nodemon server.js

Server will run on:

http://localhost:5000
API Endpoints
Register User
POST /register

Registers a new user.

Request Body
{
  "email": "user@gmail.com",
  "password": "123456"
}
Process
Reads users from data.json
Checks if user already exists
Hashes password using bcrypt
Stores user data in data.json
Login User
POST /login

Logs in the user.

Request Body
{
  "email": "user@gmail.com",
  "password": "123456"
}
Process
Finds user from data.json
Compares password using bcrypt
Creates JWT token
Sends token in cookies
Protected Route
GET /profile

Accessible only with valid JWT token.

Process
Middleware checks token from cookies
JWT verifies token
Access granted if token is valid
Logout User
GET /logout

Clears authentication cookie.

Authentication Flow
1. User Registers
2. Password gets hashed using bcrypt
3. User logs in
4. JWT token is created
5. Token stored in cookies
6. Browser sends cookie automatically
7. Middleware verifies JWT
8. Protected route accessed
Example User Data in data.json
[
  {
    "email": "user@gmail.com",
    "password": "$2b$10$hashedpassword"
  }
]
Security Used
bcrypt

Used for hashing passwords before storing them.

Benefits:

Passwords are not stored in plain text
Protects user credentials
JWT

Used for authentication.

Benefits:

Stateless authentication
Secure user verification
Easy protected route handling
Cookies

Used to store JWT token securely in browser.

Benefits:

Automatic token sending
Better authentication flow
Future Improvements
MongoDB Integration
Refresh Tokens
Role-based Authentication
Email Verification
Password Reset
Input Validation
Rate Limiting
Learning Goals

This project helps beginners understand:

Backend authentication flow
JWT working process
bcrypt hashing
Middleware usage
Cookie handling
File handling in Node.js

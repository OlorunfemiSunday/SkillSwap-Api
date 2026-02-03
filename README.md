# Skill Swap

Skill Swap is a platform for users to exchange skills through collaboration, not money. Users can create accounts, log in, and manage skill exchanges. The backend is built with Node.js, Express, and MongoDB, while the frontend uses HTML, Tailwind CSS, and vanilla JavaScript.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Frontend Integration](#frontend-integration)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Features
- **User Registration:** Sign up with name, email, phone, and password.
- **User Login:** Authenticate using email/username and password.
- **JWT Authentication:** Secure API routes using JSON Web Tokens.
- **Password Hashing:** Securely store passwords using bcrypt.
- **Responsive Frontend:** Tailwind CSS-based responsive UI.
- **Skill Management (planned):** Users can add, update, and exchange skills.

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- bcryptjs for password hashing
- jsonwebtoken for authentication
- cors for cross-origin requests
- dotenv for environment variables

### Frontend
- HTML5 & CSS3
- Tailwind CSS
- Vanilla JavaScript (Fetch API for backend communication)
- Google Fonts & Font Awesome

## Folder Structure
```text
SKILLSWAP/
├─ controllers/
│  └─ authController.js
├─ middleware/
│  └─ errorHandler.js
├─ models/
│  └─ User.js
├─ routes/
│  ├─ authRoutes.js
│  ├─ userRoutes.js
│  ├─ skillRoutes.js
│  └─ swapRoutes.js
├─ utils/
│  └─ generateToken.js
├─ frontend/
│  ├─ createAccount.html
│  └─ login.html
├─ .env
├─ package.json
└─ server.js
Installation
Clone the repository:

bash
git clone https://github.com/olorunfemisunday/skillswap.git
cd skillswap
Install dependencies:

bash
npm install
Environment Variables
Create a .env file in the root directory and add:

env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Running the Project
Backend
bash
node server.js
The server will run at: http://localhost:5000

Frontend
Open the HTML files directly in your browser (e.g., frontend/createAccount.html or frontend/login.html).

API Endpoints
Auth
Method	Route	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login a user
Request body for registration:

json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "phone": "08012345678",
  "password": "123456"
}
Request body for login:

json
{
  "email": "johndoe@example.com",
  "password": "123456"
}
Response for successful login/registration:

json
{
  "message": "Login successful",
  "user": {
    "id": "6437b1...",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "phone": "08012345678"
  },
  "token": "jwt_token_here"
}
Frontend Integration
HTML setup
Add unique IDs to your form inputs:

html
<form id="loginForm">
  <input type="text" id="email">
  <input type="password" id="password">
  <button type="submit">Login</button>
</form>
JavaScript Fetch API
Use the Fetch API to connect to your backend:

javascript
const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  console.log(data);
  
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
});
Protected Routes
Include the JWT in the headers for authorized requests:

javascript
fetch("http://localhost:5000/api/users/profile", {
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  }
});
Future Enhancements
Skill CRUD operations
Swap/Exchange feature between users
User dashboard
Email verification
Password reset functionality
Improved UI/UX
License
This project is licensed under the MIT License.
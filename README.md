# 🔐 BackendAuth – Secure Authentication & Order Management System

BackendAuth is a full-stack web application that demonstrates secure user authentication and protected API access using JWT.  
The application allows users to register, log in, create orders, and view only the orders associated with their account through a clean and minimal dashboard.

This project is intentionally focused on **backend logic, API security, and authorization**, with a simple UI for interaction.

---

## ✨ Features

- User registration and login
- JWT-based authentication
- Protected REST API routes
- Secure order creation
- User-specific order access
- Clean and minimal dashboard UI
- Proper frontend-backend integration

---

## 🛠️ Tech Stack

### Frontend
- React
- CSS / Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- JSON Web Tokens (JWT)

---

## 📂 Project Structure
BackendAuth/
│
├── client/ # Frontend (React)
│ ├── src/
│ └── public/
│
├── server/ # Backend (Node + Express)
│ ├── routes/ # API routes
│ ├── controllers/ # Business logic
│ ├── models/ # Database schemas
│ ├── middleware/ # JWT & auth middleware
│ └── config/ # DB & environment config
│
└── README.md


---

## 🔑 Authentication Flow

1. User registers with email and password
2. Password is securely stored in the database
3. User logs in with valid credentials
4. Server generates a JWT token
5. Token is used to access protected API routes
6. Users can only view and manage their own orders

---

## 📦 API Endpoints

### Authentication Routes
- `POST /api/register` – Register a new user
- `POST /api/login` – Authenticate user and generate JWT

### Order Routes (Protected)
- `POST /api/orders` – Create a new order
- `GET /api/orders` – Fetch orders of logged-in user

---

## 🚀 Getting Started

### Clone the repository
```bash
git clone https://github.com/Sanket-Pandit-Patil/BackendAuth.git

npm install
npm run server
npm run client

👨‍💻 Author

Sanket Patil

GitHub: https://github.com/Sanket-Pandit-Patil

Email: sanketpatil143107@gmail.com


---

### ✅ This README is:
✔ Professional  
✔ Recruiter-friendly  
✔ Backend-focused  
✔ Ready for internships & interviews  

If you want next:
- Resume project description
- API documentation with examples
- Better project naming
- Deployment section

Just say the word 👍


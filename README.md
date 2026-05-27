# ✅ TaskFlow — Task Manager App

A full-stack Task Manager application built with the MERN stack.
Users can register, login, and manage tasks across three stages:
**Todo → In Progress → Done**

## 🔗 Live Links

- **Frontend:** https://task-flow-taskmanager.vercel.app
- **Backend API:** https://taskflow-backend.onrender.com

## 🛠️ Tech Stack

### Frontend
- React 18 (Vite)
- React Router DOM v6
- Axios
- Plain CSS (no UI library)

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing

## ✨ Features

- 🔐 User Registration & Login with JWT authentication
- 📋 Create, Edit, Delete tasks
- 🔄 Move tasks across stages (Todo → In Progress → Done)
- 🎯 Priority levels: Low, Medium, High
- 📊 Stats bar showing task counts per stage
- 👁️ Password visibility toggle
- ⚡ Loading states and error handling
- 📱 Fully responsive design

## 📁 Project Structure

taskflow-app/
├── backend/
│   ├── middleware/
│   │   └── auth.js          # JWT protection middleware
│   ├── models/
│   │   ├── User.js          # User schema
│   │   └── Task.js          # Task schema
│   ├── routes/
│   │   ├── auth.js          # Register & Login routes
│   │   └── tasks.js         # CRUD task routes
│   ├── .env                 # Environment variables
│   └── server.js            # Express app entry point
│
├── frontend/
│   └── src/
│       ├── api/
│       │   └── axios.js     # Axios instance with JWT interceptor
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── TaskCard.jsx
│       │   ├── TaskModal.jsx
│       │   └── ProtectedRoute.jsx
│       ├── context/
│       │   └── AuthContext.jsx  # Global auth state
│       ├── pages/
│       │   ├── LoginPage.jsx
│       │   ├── RegisterPage.jsx
│       │   └── DashboardPage.jsx
│       └── App.jsx
│
└── README.md

## 🚀 Run Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### Backend Setup
```bash
cd backend
npm install
```

Create `backend/.env`:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create `frontend/.env`:
VITE_API_URL=http://localhost:5000/api

```bash
npm run dev
```

Open **http://localhost:5173**

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |

### Tasks (Protected — requires JWT)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks for user |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

## 💡 Assumptions & Tradeoffs

### Assumptions
- One user can have unlimited tasks
- Tasks belong to a single user only
- No task sharing between users
- Email is unique per user

### Tradeoffs
- **Plain CSS over Tailwind/MUI** — keeps bundle size small,
  shows CSS knowledge, easier to customize
- **JWT in localStorage over httpOnly cookies** — simpler
  implementation for this scope; cookies would be more
  secure in production
- **No refresh token** — JWT expires in 7 days, acceptable
  for this use case
- **Vercel for frontend, Render for backend** — both free
  tiers, best options for MERN stack deployment

### Technical Decisions
- **Context API over Redux** — app state is simple enough,
  Redux would be overkill
- **Vite over Create React App** — faster builds, better
  developer experience
- **bcryptjs over bcrypt** — bcryptjs is pure JavaScript,
  no native build dependencies, works on all platforms

## 👨‍💻 Reference for Developer(Ignore this)

This project was built as an intern assignment demonstrating:
- Full stack MERN development
- JWT based authentication flow
- RESTful API design
- Component based React architecture
- Production deployment on free hosting platforms
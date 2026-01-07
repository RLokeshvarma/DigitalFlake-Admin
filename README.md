# DigitalFlake Admin Panel

A **full-stack Admin Panel application** built using **React + TypeScript (Frontend)** and **Node.js + Express + MySQL (Backend)**.
This project demonstrates real-world admin features like authentication, image uploads, CRUD operations, and clean project architecture.

---

## Project Overview

The **DigitalFlake Admin Panel** allows a single admin to manage:

- Categories
- Subcategories
- Products

Each module supports:
- Create
- Read
- Update
- Delete
- Image upload
- Status management (Active / Inactive)

The UI is designed based on provided Figma-like screens and implemented **pixel-accurately**.

---

## Features

### Authentication
- Admin Login using **JWT**
- Secure password hashing with **bcrypt**
- **Forgot Password** with OTP sent via **Email (Nodemailer)**
- Protected routes using JWT middleware

### Admin Dashboard
- Sidebar navigation
- Top navbar with profile & logout
- Responsive layout
- Clean, reusable components

### Category Module
- Add / Edit / Delete Category
- Upload category image
- Status control (Active / Inactive)
- Search functionality

### Subcategory Module
- Linked to Categories
- Dynamic category dropdown
- Image upload
- Status control
- Delete confirmation popup

### Product Module
- Linked to Category & Subcategory
- Dependent dropdowns
- Image upload & preview
- Status control
- Full CRUD operations

### Image Management
- Images stored in structured folders
- Served as static assets from backend


---

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- React Router DOM
- Axios
- React Bootstrap
- Bootstrap Icons

### Backend
- Node.js
- Express.js
- TypeScript
- MySQL
- Sequelize ORM
- JWT Authentication
- Multer (Image Upload)
- Nodemailer (Email OTP)

---

## Project Structure

```txt
Root
├── backend/                      # Backend app (Express + TypeScript)
│   ├── src/
│   │   ├── config/               # DB & env config
│   │   ├── controllers/          # Route handlers
│   │   ├── middleware/           # Auth, upload, validators
│   │   ├── models/               # Sequelize models
│   │   ├── routes/               # API routes
│   │   ├── utils/                # Mailer, helpers
│   │   └── server.ts             # App entry
│   ├── uploads/                  # Static image folders
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                     # Frontend app (React + TypeScript)
│   ├── src/
│   │   ├── components/           # Reusable UI components (Sidebar, Navbar...)
│   │   ├── pages/                # Page-level components
│   │   ├── routes/               # Router config
│   │   ├── services/             # API clients (axios), auth service
│   │   ├── context/              # React contexts (Auth)
│   │   └── main.tsx
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```
---

## Environment Variables

Create a `.env` file inside **backend** directory.

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=digitalflake

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password


## How to Run the Project

Follow the steps below to run the project locally.

---

### Clone the Repository
```bash
git clone https://github.com/your-username/digitalflake-admin.git
cd digitalflake-admin
```
---

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

---

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
---

### Default Admin Credentials
- Email    : admin@digitalflake.com
- Password : Admin@456

---

### About Author
- **R Lokesh Varma**
- Full Stack Developer (Fresher)

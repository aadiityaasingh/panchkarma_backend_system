# 🌿 Panchkarma Backend System

A clean, production-ready RESTful API for managing Panchkarma (Ayurvedic) wellness centers. Built with **Node.js**, **Express.js**, and **MongoDB** — it handles patients, therapies, therapy plans, sessions, billing, analytics reports, and secure user authentication with role-based access control.

> 🚀 **Live API:** [panchakarma-backend-system.onrender.com](https://panchakarma-backend-system.onrender.com)  
> 📄 **Swagger Docs:** [panchakarma-backend-system.onrender.com/api-docs](https://panchakarma-backend-system.onrender.com/api-docs)



## 🛠 Tech Stack

| Layer             | Technology          |
|-----------------------------------------|
| Runtime           | Node.js             |
| Framework         | Express.js v5       |
| Database          | MongoDB + Mongoose  |
| Authentication    | JWT (Bearer Token)  |
| Password Hashing  | bcrypt              |
| Validation        | express-validator   |
| API Docs          | Swagger UI          |
| Deployment        | Render              |

---

## ✨ Features

- 🔐 **Auth**          — JWT-based login with role-based access control (`admin`, `therapist`)
- 👤 **Users**         — Create and manage staff accounts with assigned roles
- 🧑‍⚕️ **Patients**      — Register patients and view full treatment history
- 💆 **Therapies**     — Manage the Ayurvedic therapy catalog (admin only)
- 📋 **Therapy Plans** — Assign multi-therapy plans to patients with date ranges and cost tracking
- 🗓 **Sessions**       — Track individual therapy sessions; therapists update session status and notes
- 🧾 **Bills**         — Auto-generated billing per therapy plan with payment recording (admin only)
- 📊 **Reports**       — Revenue reports, top therapies, and patient statistics (admin only)
- 🛡 **Middleware**    — Global error handler, request validation, JWT protect, role authorization, pagination

---------------------------------------------------------------------------------------------------------------------------------------

## 📁 Project Structure

## 📁 Project Structure

```
panchkarma_backend_system/
├── src/
│   ├── config/
│   │   ├── db.js                   # MongoDB connection
│   │   └── swagger.js              # Swagger/OpenAPI configuration
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── bill.controller.js
│   │   ├── patient.controller.js
│   │   ├── reports.controller.js
│   │   ├── session.controller.js
│   │   ├── therapy.controller.js
│   │   ├── therapyPlan.controller.js
│   │   └── user.controller.js
│   ├── middlewares/
│   │   ├── auth.js                 # JWT protect middleware
│   │   ├── authorize.js            # Role-based access control
│   │   ├── errorHandler.js         # Global error handler
│   │   └── validate.js             # express-validator runner
│   ├── models/
│   │   ├── bill.model.js
│   │   ├── patient.model.js
│   │   ├── session.model.js
│   │   ├── therapy.model.js
│   │   ├── therapyPlan.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── bill.route.js
│   │   ├── patient.route.js
│   │   ├── report.route.js
│   │   ├── session.route.js
│   │   ├── therapy.route.js
│   │   ├── therapyPlan.route.js
│   │   └── user.route.js
│   ├── utils/
│   ├── validation/
│   │   ├── patient.validation.js
│   │   ├── therapy.validation.js
│   │   ├── therapyPlan.validation.js
│   │   └── user.validation.js
│   └── app.js                      # Express app, route mounting
├── .env
├── .gitignore
├── package.json
└── server.js                       # Entry point
```



---------------------------------------------------------------------------------------------------------------------------------------

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/aadiityaasingh/panchkarma_backend_system.git
cd panchkarma_backend_system

# 2. Install dependencies
npm install

# 3. Set up environment variables
touch .env
# Add your values (see below)

# 4. Start the server
npm start          # production
npm run dev        # development with nodemon


### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
DB_URI=mongodb://localhost:27017/panchkarma
JWT_SECRET=your_jwt_secret_key
```


## 📡 API Reference

**Base URL:** `https://panchakarma-backend-system.onrender.com`

> 🔒 **[Protected]** — Requires `Authorization: Bearer <token>` header  
> 🛡 **[admin]** / **[therapist]** — Requires that specific role

---

### 🔐 Auth

| Method | Endpoint          | Access | Description                   |
|--------|-------------------|--------|-------------------------------|
| POST   | `/api/auth/login` | Public | Login and receive a JWT token |

```json
// POST /api/auth/login
{
  "email": "admin@example.com",
  "password": "password123"
}
```

---------------------------------------------------------------------------------------------------------------------------------------

### 👤 Users

| Method | Endpoint     | Access | Description       |
|--------|--------------|--------|-------------------|
| POST   | `/api/users` | Public | Create a new user |

```json
// POST /api/users
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "admin"
}
```

---------------------------------------------------------------------------------------------------------------------------------------


### 🧑‍⚕️ Patients

| Method | Endpoint                           | Access        | Description                            |
|--------|------------------------------------|---------------|----------------------------------------|
| POST   | `/api/patients`                    | Public        | Register a new patient                 |
| GET    | `/api/patients`                    | Public        | Get all patients                       |
| GET    | `/api/patients/:patientId/history` | 🔒 Protected  | Get full treatment history of a patient|

```json
// POST /api/patients
{
  "fullName": "Ramesh Sharma",
  "phone": "9876543210",
  "age": 45,
  "gender": "male"
}
```

---------------------------------------------------------------------------------------------------------------------------------------

### 💆 Therapies

| Method | Endpoint         | Access      | Description          |
|--------|------------------|-------------|----------------------|
| POST   | `/api/therapies` | 🔒 [admin]  | Create a new therapy |
| GET | `/api/therapies`    | Public      | Get all therapies    |

```json
// POST /api/therapies
{
  "name": "Abhyanga",
  "category": "Massage",
  "description": "Full body oil massage therapy"
}
```

---------------------------------------------------------------------------------------------------------------------------------------

### 📋 Therapy Plans

| Method | Endpoint              | Access | Description                                 |
|--------|-----------------------|--------|---------------------------------------------|
| POST   | `/api/therapy-plans`  | Public | Create a therapy plan for a patient         |
| GET    | `/api/therapy-plans`  | Public | Get all therapy plans (filter by `?status=`)|

```json
// POST /api/therapy-plans
{
  "patient": "<patientId>",
  "startDate": "2026-03-06",
  "endDate": "2026-03-12",
  "therapies": [
    {
      "therapy": "<therapyId>",
      "durationDays": 5,
      "costPerDay": 500
    }
  ]
}
```

---

### 🗓 Sessions

| Method | Endpoint                          | Access          | Description                                                    |
|--------|-----------------------------------|-----------------|----------------------------------------------------------------|
| GET    | `/api/sessions/plan/:planId`      | Public          | Get sessions for a therapy plan (filter by `?date=YYYY-MM-DD`) |
| PATCH  | `/api/sessions/:sessionId/status` | 🔒 [therapist] | Update session status and notes                                 |

```json
// PATCH /api/sessions/:sessionId/status
{
  "status": "completed",
  "notes": "Patient responded well"
}
```

---------------------------------------------------------------------------------------------------------------------------------------

### 🧾 Bills

| Method | Endpoint                 | Access      | Description                     |
|--------|--------------------------|-------------|---------------------------------|
| GET    | `/api/bills/plan/:planId`| 🔒 [admin] | Get bill for a therapy plan     |
| PATCH  | `/api/bills/:billId/pay` | 🔒 [admin] | Record a payment against a bill |

```json
// PATCH /api/bills/:billId/pay
{
  "amount": 500
}
```

---------------------------------------------------------------------------------------------------------------------------------------

### 📊 Reports

| Method | Endpoint                    | Access      | Description                  |
|--------|-----------------------------|-------------|------------------------------|
| GET   | `/api/reports/revenue`       | 🔒 [admin] | Get overall revenue report   |
| GET   | `/api/reports/top-therapies` | 🔒 [admin] | Get most-used therapies      |
| GET   | `/api/reports/patient-count` | 🔒 [admin] | Get total patient statistics |

---------------------------------------------------------------------------------------------------------------------------------------


## 🔐 Authentication Flow

1. Create a user via `POST /api/users`
2. Login via `POST /api/auth/login` — receive a JWT token
3. Pass the token in all protected requests:

```
Authorization: Bearer <your_token>
```

---------------------------------------------------------------------------------------------------------------------------------------

## 📖 Swagger Docs

Interactive API documentation with request/response schemas is available at:

```
https://panchakarma-backend-system.onrender.com/api-docs
```

---------------------------------------------------------------------------------------------------------------------------------------

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request


---------------------------------------------------------------------------------------------------------------------------------------

> Built with 💚 for Ayurvedic wellness management
# Panchakarma Management System (Backend)

API check = https://panchakarma-backend-system.onrender.com/api-docs/

A backend API for managing a Panchakarma therapy clinic.
The system handles patients, therapies, therapy plans, session tracking, billing, and analytics.



# Features:-
Authentication & Authorization:-
JWT-based authentication,
Role-based access control (RBAC),
Admin and therapist permissions

Patient Management:-
Register patients,
View patient list,
Complete patient treatment history

Therapy Management:-
Create therapy types (Vaman, Virechan, Basti, Nasya, and Raktamokshana),
Reusable therapy master data

Therapy Plans:-
Assign therapy plans to patients,
Support multiple therapies per plan,
Date validation and business rules

Automatic Session Scheduling:-
Daily therapy sessions automatically generated,
Session status updates (scheduled, completed, missed),

Billing System:-
Bill automatically created when therapy plan is created,
Payment tracking,
Partial and full payments

Reports & Analytics:-
Revenue report,
Therapy usage statistics,
Patient statistics

API Features:-
Pagination,
Filtering,
Search,
Global error handling,
Async controller handling

API Documentation:-
Interactive API documentation using Swagger,
Access documentation at: /api-docs

Tech Stack:-
Backend: Node.js, Express,
Database: MongoDB, Mongoose,
Authentication: JSON Web Token, bcrypt,
Documentation: Swagger UI

# Future Improvements:-
Therapist assignment to sessions,
Appointment booking system,
Inventory management for medicines,
File uploads for patient reports,
Dashboard analytics,
Notifications & reminders,
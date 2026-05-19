# SchoolPulse Backend - Product Requirement Document (PRD)

## 1. Project Overview
SchoolPulse is a multi-tenant School Management System designed for Nigerian schools. The backend must support multi-tenancy, ensuring data isolation between schools while providing a robust API for the React frontend.

## 2. Core User Roles & Permissions
The system uses a granular role-based access control (RBAC) system. A single user can hold multiple roles.

| Role | Key Permissions |
| :--- | :--- |
| **School Admin** | Full access to school settings, staff registration, and financial overviews. |
| **Bursar** | Fee management, payment recording, debt tracking, and invoice generation. |
| **Class Teacher** | Mark attendance for assigned class, input student results for their class. |
| **Subject Teacher** | Input grades/results for specific subjects across different classes. |
| **Parent** | View student attendance, results, and pay outstanding fees. |
| **Student** | View own results and attendance. |
| **Security/Gate** | Access visitor logs and student check-in/out status (Gate Pass). |

---

## 3. Functional Modules

### 3.1. Authentication & Multi-tenancy
- **Organization Onboarding:** Schools must register with an ID, Name, Address, and branding assets (Stamp/Signature).
- **JWT Authentication:** Secure login for all users.
- **Tenant Isolation:** Every database query must filter by `school_id`.

### 3.2. Account Recovery & Security
- **Forgot Password flow:**
    - Request: User enters email.
    - System: Validates email and generates a secure, time-limited token.
    - System: Sends email via SMTP (SendGrid/Mailgun) with a recovery link.
    - Reset: User clicks link and sets a new password.
- **Admin Reset:** School Admins should be able to manually reset passwords for staff/students from the Staff/Student management modules.

### 3.3. Staff & Workforce Management
- **Profile Management:** Name, Email, Phone, Joined Date, and Roles.
- **Multi-Role Assignment:** Support for users having multiple roles (e.g., "Teacher" + "Class Teacher").

### 3.3. Student Management
- **Bio-data:** Unique Admission Number, Name, Class, Gender, Guardian details.
- **Debt Tracking:** Link every student to a fee structure.

### 3.4. Bursary & Financials (Critical)
- **Fee Configuration:** Define termly fees per student/class (Default: ₦1,000 per student).
- **Payment Processing:** Record partial and full payments.
- **Automated Calculations:** 
    - `Balance = Total_Fee - Total_Paid_To_Date`.
    - Status: `FULLY_PAID`, `PARTIAL`, or `UNPAID`.
- **PDF Generation:** Server-side or client-side generation of receipts featuring the **School Stamp** and **Principal's Signature** stored in settings.

### 3.5. Attendance & Results
- **Attendance:** Restrict marking to `class_teacher` or `admin`.
- **Result Computation:** Aggregate subject scores into final transcripts and report cards.

---

## 4. Technical Architecture

### 4.1. Proposed Database Schema (Relational)
- **Schools:** `id, name, address, logo_url, stamp_url, signature_url, config_json`
- **Users:** `id, school_id, email, password_hash, full_name, phone`
- **Roles:** `id, name (enum)`
- **UserRoles:** `user_id, role_id` (Many-to-Many)
- **Students:** `id, school_id, admission_no, name, current_class, guardian_id`
- **FeeStructures:** `id, school_id, name, amount, academic_session, term`
- **Payments:** `id, student_id, bursar_id, amount, date, method, reference_no`
- **Attendance:** `id, student_id, teacher_id, date, status (present/absent/late)`

### 4.2. Recommended API Endpoints (REST)
- `POST /api/auth/login` - Authenticate and return user roles.
- `POST /api/schools/register` - Create a new institution.
- `GET /api/staff` - List school workforce (Admin/Bursar only).
- `POST /api/payments` - Record a new fee payment.
- `GET /api/reports/debtors` - List students with outstanding balances.
- `GET /api/documents/receipt/:paymentId` - Fetch metadata for PDF generation.

---

## 5. Security & Performance
- **File Storage:** Use S3 (or equivalent) for transparent PNG stamps/signatures.
- **Audit Logs:** Track who recorded a payment or changed a student's result.
- **Concurrency:** Ensure simultaneous payment recordings don't cause race conditions in balance calculations.

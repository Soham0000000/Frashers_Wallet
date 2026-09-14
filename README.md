# 🎓 Fresher's Day Wallet & Payment History

A full-stack **College Fresher's Day Wallet & Payment History Management System** built using **EJS, Node.js, Express.js, MongoDB, HTML, CSS, and JavaScript**.

This project helps colleges manage student wallet balances, payment records, and transaction history during Fresher's Day events.

---

## 📌 Project Overview

The **Fresher's Day Wallet** is a web-based system designed to manage student payment information digitally.

Students can have a wallet balance that can be used for Fresher's Day activities, food, events, or other college-related payments.

The system provides an easy-to-use dashboard where administrators can:

* 👨‍🎓 Add new students
* 💰 Add wallet balance
* 💳 Record payments
* 📜 View payment history
* 🔍 Search student records
* 📊 Check wallet balance
* ✏️ Edit student information
* 🗑️ Delete records
* 📱 View the system on different devices

---

## ✨ Features

### 👨‍🎓 Student Management

* Add new student
* View student details
* Edit student information
* Delete student records
* Search students

### 💰 Wallet Management

* Add money to student wallet
* Display current wallet balance
* Track wallet transactions
* Prevent incorrect balance calculations

### 💳 Payment Management

* Record payments
* Store payment amount
* Store payment date and time
* Display payment status
* Generate payment history

### 📜 Payment History

Each student can have a complete transaction history containing:

| Information      | Description                   |
| ---------------- | ----------------------------- |
| Student Name     | Name of the student           |
| Student ID       | Unique student identification |
| Transaction Type | Wallet Add / Payment          |
| Amount           | Transaction amount            |
| Date             | Transaction date              |
| Status           | Successful / Pending          |

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* EJS (Embedded JavaScript Templates)

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Tools

* VS Code
* Git
* GitHub
* npm

---

## 📂 Project Structure

```text
Fresher-Day-Wallet/
│
├── public/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   └── script.js
│   │
│   └── images/
│
├── views/
│   ├── index.ejs
│   ├── dashboard.ejs
│   ├── students.ejs
│   ├── add-student.ejs
│   ├── wallet.ejs
│   ├── payment-history.ejs
│   └── error.ejs
│
├── models/
│   ├── Student.js
│   └── Transaction.js
│
├── routes/
│   ├── studentRoutes.js
│   ├── walletRoutes.js
│   └── paymentRoutes.js
│
├── app.js
├── package.json
├── package-lock.json
├── .env
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project

```bash
cd Fresher-Day-Wallet
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create `.env`

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

### 5. Start the server

For normal mode:

```bash
node app.js
```

Or, if you are using nodemon:

```bash
npx nodemon app.js
```

### 6. Open in browser

```text
http://localhost:3000
```

---

## 🔄 Application Flow

```text
                ┌─────────────────┐
                │   Home Page     │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │    Dashboard    │
                └────────┬────────┘
                         │
             ┌───────────┼───────────┐
             ▼           ▼           ▼
        ┌─────────┐ ┌─────────┐ ┌─────────────┐
        │Students │ │ Wallet  │ │   Payment   │
        └────┬────┘ └────┬────┘ │   History   │
             │           │       └──────┬──────┘
             ▼           ▼              ▼
        Student Data  Transactions   History List
```

---

## 💳 Example Transaction

```text
Student: Rahul Das
Student ID: FD2026-001

Wallet Added:       ₹500
Payment:            ₹150
---------------------------
Remaining Balance:  ₹350
```

---

## 🔐 Security

The project uses environment variables for sensitive information.

Example:

```env
MONGO_URI=your_database_url
```

The `.env` file should **not** be uploaded to GitHub.

Add this to `.gitignore`:

```text
node_modules/
.env
```

---

## 🚀 Future Improvements

Some features that can be added in future versions:

* 🔐 Admin Login & Authentication
* 📱 Mobile-friendly dashboard
* 📊 Payment analytics
* 📥 Export payment history to Excel/PDF
* 🧾 Digital payment receipts
* 🔔 Payment notifications
* 🔎 Advanced search and filtering
* 💳 UPI payment integration
* 📈 Monthly transaction reports
* ☁️ Online deployment

---

## 🎯 Purpose of the Project

This project was created as a **college full-stack web development project** to demonstrate practical knowledge of:

* EJS templating
* Node.js
* Express.js
* MongoDB
* CRUD operations
* Database management
* Backend routing
* Dynamic web pages
* Payment/transaction management

---

## 👨‍💻 Developer

**Soham Osmani**

BCA Student | Full-Stack Web Developer

### Skills Used

`HTML` `CSS` `JavaScript` `EJS` `Node.js` `Express.js` `MongoDB`

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is created for educational and college project purposes.

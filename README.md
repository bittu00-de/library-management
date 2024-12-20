# Library Management System API

This is a RESTful API for a simple Library Management System built using *Node.js, **Express, and **MySQL*. The system includes role-based authentication to manage user actions based on their roles (Admin, Librarian, and Member).

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Postman Collection](#postman-collection)
- [Database Setup](#database-setup)
- [JWT Authentication](#jwt-authentication)
- [Contributing](#contributing)

## Features

- *Admin Role*: 
  - Add, update, and delete books.
  - Manage users (create, update, delete).
  - View all books.
  - Record borrowing and returning of books.

- *Librarian Role*: 
  - View all books.
  - Record borrowing and returning of books.

- *Member Role*: 
  - View available books.
  - Borrow and return books (own records only).

## Technologies Used

- *Node.js*: JavaScript runtime for building the server.
- *Express*: Framework for building the REST API.
- *MySQL*: Relational database for storing users, books, and borrowing records.
- *Sequelize*: ORM to interact with MySQL.
- *JWT*: JSON Web Token for authentication.
- *Postman*: Used for testing and interacting with the API.

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/library-management-system.git
cd library-management-system
npm install
npm run dev
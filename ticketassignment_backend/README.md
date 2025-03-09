# 📄 Event ticket graphql nest server.

## 🏠 Event tickets

This project is all about creating events and adding specific amount of tickets for each event and giving the users 
the ability to purchase the tickets.

## 🎯 Objective of the Case Study

The purpose of this case study is to demonstrate my ability to develop a backend API using NestJS, focusing on:

- Clean architecture and code organization
- Implementation of GraphQL endpoints
- Integration with PostgreSQL using TypeORM
- User authentication and authorization (JWT)
- Use of best practices in error handling, validation, and testing

## 🛠 Tech Stack

- NestJS: Backend framework
- TypeORM: ORM for database interactions
- PostgreSQL: Database
- GraphQL: API design
- Custom JWT: Authentication using custom token generation

## ⚙️ Installation and Setup

### Database
The database schema will be automatically generated using migrations and they can be found inside the directory 
`./src/migrations`

> Entities are automatically generated using `typeorm-model-generator` dependency.

### Prerequisites
```bash
# Make sure Node.js and npm are installed
npm install -g @nestjs/cli
```

### Installation Steps
```bash
# Clone the repository
git clone https://github.com/

# Navigate to the project directory
cd ticketassignment_backend
```
### Install dependencies

```bash
pnpm install
```
or
```bash
$ npm install
```
or
```bash
$ yarn install
```
## Running the Application
```bash
# Development mode
pnpm run start:dev

# Production build
pnpm run build
pnpm run start:prod
```

# 🔍 Project Overview

## Implemented Features

- User registration and authentication 
- Event creation, updating, and deletion 
- Ticket booking and availability management 
- Role-based access control 
- Data validation and error handling

# 💡 Design Decisions

## Module-based Architecture:
Ensured scalability and maintainability by separating features into modules (EventModule, UserModule, TicketModule, 
OrdersModule).

## TypeORM and PostgreSQL:
Chose TypeORM for its seamless integration with NestJS and support for migrations.

## GraphQL Integration:
Added GraphQL API to demonstrate flexibility and modern API practices.

## Custom JWT Implementation:
Created a custom JSON Web Token generation method instead of using pre-built libraries.
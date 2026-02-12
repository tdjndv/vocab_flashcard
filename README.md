# 📚 Vocab Flashcard Platform

A fullstack flashcard platform with JWT authentication, PostgreSQL persistence, and Dockerized EC2 deployment.  
Designed for language learners to collect, memorize, and iterate through vocabulary across languages.

Live Demo: http://3.129.66.37/

## Tech Stack

### Backend
- Node.js + Express
- PostgreSQL
- Prisma (queries + migrations)

### Frontend
- React
- Vite
- TypeScript

### Infrastructure / DevOps
- Docker
- Nginx
- EC2 deployment

---

## Features

- JWT cookie-based authentication with protected API routes
- Layered backend architecture (routes → validators → controllers → services → repositories → DTO)
- PostgreSQL persistence with Knex migrations
- Dockerized multi-container setup with Nginx reverse proxy
- Deployed on AWS EC2

---

## 🐳 Running Locally (Docker)

Build and start all services:

docker compose -f compose.prod.yml up --build

This launches:
- PostgreSQL database
- Node.js API
- Nginx reverse proxy
- Frontend static pages

Access via: http://localhost

---

## 📈 Future Improvements

- Improved UI/UX
- Role-based authorization (RBAC)
- Rate limiting
- Redis caching
- CI/CD pipeline
- Automated testing
- Monitoring & logging
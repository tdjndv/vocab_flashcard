# 📚 Vocab Flashcard Platform

**Production-style Fullstack Application (Backend-Focused)**

A fullstack vocabulary flashcard platform designed to demonstrate
real-world backend engineering skills, system architecture, and
deployment readiness.

This project focuses on building a clean, scalable backend with a
minimal frontend used primarily to validate API integration.

------------------------------------------------------------------------

## 🎯 Purpose

Most portfolio projects focus heavily on UI.\
This project instead highlights the skills companies look for in
backend/fullstack engineers:

-   API design
-   Database modeling
-   Migration management
-   Containerized architecture
-   Reverse proxy configuration
-   Cloud deployment readiness

The frontend is intentionally simple --- the primary focus is the
backend system and infrastructure.

------------------------------------------------------------------------

## 🧠 What This Project Demonstrates

-   Designing a production-style multi-service architecture
-   Building and structuring a RESTful API
-   Managing database schema evolution using migrations
-   Running services in isolated Docker containers
-   Reverse proxy routing with Nginx
-   Preparing an application for EC2 deployment

------------------------------------------------------------------------

## 🏗️ Architecture Overview

Browser (Client) ↓ Nginx Reverse Proxy ↓ Node.js API Service ↓
PostgreSQL Database

Key design decisions:

-   Backend separated from frontend
-   Database isolated inside Docker network
-   Migrations version-controlled
-   API routed through Nginx
-   Services orchestrated with Docker Compose
-   Production deployment structure from day one

------------------------------------------------------------------------

## 🛠️ Tech Stack

### Backend

-   Node.js
-   Express
-   PostgreSQL
-   Knex (queries + migrations)
-   Environment-based configuration

### Frontend

-   Vite
-   TypeScript
-   SPA architecture (minimal UI for API interaction)

### Infrastructure / DevOps

-   Docker
-   Docker Compose (multi-container setup)
-   Nginx reverse proxy
-   EC2 deployment ready

------------------------------------------------------------------------

## 📁 Project Structure

apps/ api/ src/ migrations/ seeds/ Dockerfile

web/ src/ public/ Dockerfile

nginx/ prod.conf

compose.prod.yml

------------------------------------------------------------------------

## ⚙️ Key Features

-   REST API for managing vocabulary flashcards
-   PostgreSQL persistence
-   Migration system for schema evolution
-   Containerized services
-   Reverse proxy routing
-   Production-ready project structure

------------------------------------------------------------------------

## 🐳 Running Locally (Docker)

Build and start all services:

docker compose -f compose.prod.yml up --build

This launches:

-   PostgreSQL database
-   Node.js API
-   Nginx reverse proxy
-   Frontend SPA

Access via: http://localhost

------------------------------------------------------------------------

## 🗄️ Database Design

-   PostgreSQL with persistent Docker volume
-   Knex used for:
    -   Schema migrations
    -   Query layer
    -   Seed data

Example migration command:

npx knex migrate:latest

------------------------------------------------------------------------

## 🔧 Engineering Challenges Solved

-   Container networking between API and database
-   Running migrations automatically on startup
-   Reverse proxy configuration for API + SPA routing
-   Environment configuration across services
-   Structuring project for cloud deployment

------------------------------------------------------------------------

## ☁️ Deployment Strategy

This project is structured for production deployment:

-   Designed to run on AWS EC2
-   Containerized services for portability
-   Nginx acting as a single public entry point
-   Ready for HTTPS integration (Let's Encrypt)
-   Database persistence via Docker volumes

------------------------------------------------------------------------

## 📈 Future Improvements

Planned enhancements to make this closer to production-grade:

-   JWT authentication
-   Role-based authorization
-   API validation layer
-   Rate limiting
-   Redis caching
-   CI/CD pipeline
-   Automated testing
-   Monitoring/logging

------------------------------------------------------------------------

## 💼 Portfolio Positioning

This project is intended to demonstrate backend and fullstack
engineering ability in:

-   System architecture
-   API design
-   Database modeling
-   DevOps fundamentals
-   Production thinking
-   Service orchestration

The UI is intentionally minimal --- the emphasis is on backend quality
and infrastructure design.

------------------------------------------------------------------------

## 👨‍💻 Author

Your Name\
GitHub: https://github.com/yourname\
LinkedIn: https://linkedin.com/in/yourname

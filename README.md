# 🎭 SillyBlog

> **A silly ideas board** - A simple blog platform built with microservices architecture & Next.JS

[![Microservices](https://img.shields.io/badge/Architecture-Microservices-green?logo=docker)](https://microservices.io/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?logo=next.js)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql)](https://postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-blue?logo=docker)](https://docker.com/)

## 📋 About the Project

**SillyBlog** is a modern blog platform built with microservices architecture. The project demonstrates distributed development practices, inter-service communication, and horizontal scalability.

> ⚠️ This project is currently under active development. Expect changes and incomplete features.

---

## 🏗️ Architecture

### Microservices

- **🎨 Client** - Next.js frontend with Ant Design and Tailwind CSS
- **🚪 API Gateway** - Request routing and proxying 
- **🔐 Auth Service** - Authentication and authorization service
- **📝 Post Service** - Post and content management

### Database

- **PostgreSQL 15** - Two separate instances:
  - `auth-db` (port 5432) - Authentication data
  - `post-db` (port 5433) - Post data

## 🚀 Technologies

### Frontend
- **Next.js 15** - React framework with App Router
- **Ant Design 5** - UI component system
- **Tailwind CSS 4** - Utility-first CSS framework
- **TypeScript** - Static typing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Prisma** - Database ORM
- **JWT** - Token-based authentication

### Infrastructure
- **Docker & Docker Compose** - Containerization
- **PostgreSQL 15** - Relational database

## 📦 Prerequisites

- **Docker** >= 20.0
- **Docker Compose** >= 2.0
- **Node.js** >= 18.0 
- **npm**

## 🛠️ Installation and Execution

### Complete Execution with Docker

```bash
# Clone the repository
git clone https://github.com/sillyveira/sillyblog.git
cd sillyblog

# Run all services
docker-compose up -d

# Check logs
docker-compose logs -f
```

### Service Ports

- **Client (Frontend)**: `http://localhost:2999`
- **API Gateway**: `http://localhost:8080`
- **Auth Service**: `http://localhost:3000`
- **Post Service**: `http://localhost:3001`
- **Auth Database**: `localhost:5432`
- **Post Database**: `localhost:5433`


## 📁 Project Structure

```
sillyblog/
├── 📱 client/                    # Next.js Frontend
│   ├── src/app/
│   ├── package.json
│   └── README.md
├── 🚪 apiGateway-service/        # API Gateway
│   ├── routes/
│   ├── middleware/
│   └── package.json
├── 🔐 auth-service/              # Authentication Service
│   ├── src/
│   ├── prisma/
│   └── package.json
├── 📝 post-service/              # Posts Service
│   ├── src/
│   ├── prisma/
│   └── package.json
├── � docs/                      # Documentation
│   ├── architecture.md
│   └── services.md
├── 🐳 docker-compose.yml         # Container orchestration
└── 📖 README.md                  # This file
```

## 🎯 Features

### ✅ Implemented
- Microservices architecture
- Docker containerization
- PostgreSQL database structure

### 🔄 In Development
- Web Client

### 📋 Planned
- Comment system
- Image upload
- Real-time notifications
- Event-driven communication
- Monitoring and logging

## 📚 Documentation

- [Architecture](./docs/architecture.md)
- [Services](./docs/services.md)
- [Client README](./client/README.md)

## 💡 Inspiration

This project was created to demonstrate my skills in:
- Practical microservices architecture
- Integration between different technologies
- Development best practices
- Containerization and orchestration

## 🚧 Status

- ✅ Auth Service – done
- ✅ API Gateway – done
- ✅ Posts Service – done
- ⏳ Client (React) - planned
- ⏳ Comments Service – planned
- ⏳ Event Broker – planned

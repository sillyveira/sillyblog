# 📰 Mini Blog – Microservices Architecture

This project is a **microservices-based mini blog**, built using **Node.js with Express.js**, designed to simulate real-world service separation, inter-service communication, and basic API Gateway routing.

> ⚠️ This project is currently under active development. Expect breaking changes and incomplete features.

---

## 🧩 Services

### 🧠 Auth Service
Responsible for:
- User registration and login
- JWT generation and verification
- (Planned) Emitting user-related events (`UserUpdated`, etc.)

### ✍️ Posts Service
Responsible for:
- Creating and retrieving blog posts
- Storing post data associated with user IDs
- (Planned) Listening to `UserUpdated` events to sync user info

### 🌐 API Gateway
Responsible for:
- Routing external HTTP requests to internal services
- Handling auth routes under `/auth/*`
- Handling post routes under `/posts/*`
- (Planned) JWT validation and request forwarding to services

### 🧃 Planned Services
- **Comments Service**: Comment system per post
- **Event Broker**: Internal event bus for service sync

---

## 📐 Architecture

The system follows a **modular microservices architecture**, promoting decoupling and scalability.

- Communication between services is initially via HTTP (through the API Gateway)
- Event-driven communication will be added using a lightweight internal broker
- Authentication is stateless using JWTs, issued by the Auth Service
- Everything will be dockerized
---

## 📁 Docs

You can find more technical details in the [`/docs`](./docs) folder, including:

- `architecture.md` – project structure and service responsibilities
- `services.md` – description of each service

---

## 🚧 Status

- ✅ Auth Service – done
- ✅ API Gateway – done
- ✅ Posts Service – done
- ⏳ Client (React) - planned
- ⏳ Comments Service – planned
- ⏳ Event Broker – planned

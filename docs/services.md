## 🧩 Services

### 1. API Gateway
- **Role**: Entry point for all external requests
- **Responsibilities**:
  - Route requests to internal services (e.g., `/auth/*`, `/posts/*`)
  - Validate JWT tokens (planned)
  - Centralize response formatting (optional)

### 2. Auth Service
- **Role**: User management and authentication
- **Responsibilities**:
  - Register/login users
  - Issue JWT tokens
  - Exposes the user profile info (to keep the system interdependent and detached, the other services will have a small copy of the user info that will be updated with a future event broker)
  - Emit `UserUpdated` events to keep other services in sync (planned)
- **Note**: Refresh tokens are NOT implemented to accelerate project development. JWT tokens will have longer expiration times for simplicity.

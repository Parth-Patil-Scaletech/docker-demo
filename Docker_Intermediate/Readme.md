# Docker Intermediate: File Management System 🚀

A full-stack application demonstrating Docker best practices with NestJS backend, Next.js frontend, and PostgreSQL database.

## Features 🌟

- File creation and reading with persistent storage
- Modern UI with Tailwind CSS
- PostgreSQL database integration
- Multi-stage Docker builds
- Secure container configuration
- Service orchestration with Docker Compose

## Architecture 🏗️

```
Docker_Intermediate/
├── frontend/                # Next.js application
├── backend/                 # NestJS application
│   └── volume-data/        # Persistent file storage
├── docker-compose.yml      # Service orchestration
└── .env                    # Environment configuration
```

## Quick Start 🚀

1. Clone and navigate to the project:

   ```bash
   git clone <repository-url>
   cd Docker_Intermediate
   ```

2. Start all services:

   ```bash
   docker compose up -d
   ```

3. Access the applications:
   - Frontend UI: http://localhost:3001
   - Backend API: http://localhost:3000
   - PgAdmin: http://localhost:8080

## API Endpoints 📡

- `GET /` - Welcome message
- `POST /file` - Create new file
  ```json
  {
    "fileName": "example",
    "content": "Hello, World!"
  }
  ```
- `GET /file?fileName=example` - Read file content

## Development 👨‍💻

1. Start in development mode:

   ```bash
   docker compose up -d --build
   ```

2. View logs:

   ```bash
   docker compose logs -f [service]
   ```

3. Container shells:
   ```bash
   docker compose exec [service] sh
   ```

## Configuration ⚙️

- Frontend: `.env.local` for API URL
- Backend: `.env` for database connection
- Database: Configured via docker-compose.yml

## Security 🔒

- Non-root user in production
- Volume permissions management
- Environment variable separation
- Health checks implemented

## Troubleshooting 🔧

1. Volume permissions:

   ```bash
   chmod 755 backend/volume-data
   ```

2. Database connection:

   ```bash
   docker compose restart postgres
   ```

3. Frontend-Backend communication:
   - Ensure correct API_URL in frontend
   - Check network configuration

---

For detailed Docker concepts and tutorials, see the main [Docker Demo README](../README.md).

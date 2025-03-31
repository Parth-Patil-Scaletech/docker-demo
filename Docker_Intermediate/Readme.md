# Docker Intermediate 🚀📦

This guide covers advanced Docker concepts and practices, including multi-stage builds, container security, Docker Compose, networking, and persistent storage.

---

## 12. Optimizing Docker Images ⚡📉

### Understanding Build Caching 🔄
- Docker reuses cached layers to speed up builds.

### Best Practices for Reducing Image Size:
- Use minimal base images (e.g., `alpine`, `distroless`).
- Remove unnecessary files and dependencies.
- Minimize the number of layers in the Dockerfile.

### Analyzing Image Layers with `docker history` 🔍:
```bash
docker history my-image
```

---

## 13. Multi-Stage Builds 🏗️🚀

### What is a Multi-Stage Build? 🔄
A technique to reduce final image size by using multiple `FROM` statements.

### Example: Building a Lightweight Node.js App 🛠️

```dockerfile
# Development Stage 🏗️
FROM node:20 as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

# Production Stage 🎯
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app .
CMD ["node", "dist/main.js"]
```

### Build and run:
```bash
docker build -t myapp .
docker run -p 3000:3000 myapp
```

---

## 14. Container Security Basics 🔐🛡️

### Key Concepts:
- **Running Containers as Non-Root Users 👥** to minimize security risks.
- **Using Read-Only Filesystems 🚫✍️** to prevent modifications inside the container.

### Minimizing Attack Surface:
- Use minimal images (e.g., `alpine`, `distroless`).
- Remove unnecessary dependencies from the image.

### Example: Running a Secure Non-Root Container 🛡️
```dockerfile
FROM node:20
RUN useradd -m appuser
USER appuser
WORKDIR /app
COPY . .
CMD ["node", "dist/main.js"]
```

---

## 15. Docker Compose ⚙️📜

### What is Docker Compose? 🏗️
A tool for defining and running multi-container applications with a simple YAML file.

### Example: Running a Backend & Database with Docker Compose 📂
```yaml
services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile
      target: dev
    image: demo_backend
    container_name: demo_backend
    env_file:
      - .env
    ports:
      - "3000:3000"
    volumes:
      - ./:/app/
      - /app/node_modules
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 30s
      retries: 3
      start_period: 30s
    depends_on:
      - postgres
    networks:
      - demo_net

  postgres:
    image: postgres:latest
    container_name: postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: admin@123
      POSTGRES_DB: demo_db
    ports:
      - "5432:5432"
    networks:
      - demo_net

  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: pgadmin
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@admin.com
      PGADMIN_DEFAULT_PASSWORD: admin@123
    ports:
      - "8080:80"
    depends_on:
      - postgres
    networks:
      - demo_net

networks:
  demo_net:
    driver: bridge
```

### Run everything with:
```bash
docker compose up -d
```

---

## 16. Networking in Docker 🌐🔗

### Default Bridge Network 🌉
Containers on the same bridge network can communicate using container names.

### Custom Networks 🛠️
Recommended for better container-to-container communication.

### Example: Creating a custom network:
```bash
docker network create my_network
docker run --net my_network --name app1 nginx
docker run --net my_network --name app2 alpine ping app1
```

---

## 17. Volumes & Persistent Storage 💾🗄️

### Why Persistent Storage?
Containers lose data when stopped.

### Using Named Volumes:
```bash
docker volume create my_volume
docker run -v my_volume:/data my_container
```

### Using Bind Mounts:
```bash
docker run -v /host/path:/container/path my_container
```

---

## Project Setup Instructions 🛠️

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Docker_Intermediate
   ```

2. Use Docker Compose for multi-container setup:
   ```bash
   docker compose up -d <optional: include name of the service to run only that service>
   ```

---
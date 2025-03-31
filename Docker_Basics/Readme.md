# Docker Basics Demo

This guide will walk you through setting up a simple Docker-based environment with PostgreSQL, pgAdmin, and a custom application. Follow the steps below to get started.

---

## Step 1: Create a Docker Network

First, create a Docker network to allow containers to communicate with each other.

```bash
docker network create demo_net
```

This command creates a network named `demo_net` that will be shared by all the containers in this setup.

---

## Step 2: Set Up PostgreSQL

Pull the latest PostgreSQL image from Docker Hub:

```bash
docker pull postgres:latest
```

Run a PostgreSQL container with the following command:

```bash
docker run --name postgres -e POSTGRES_PASSWORD=admin@123 -d -p 5432:5432 --network=demo_net postgres
```

- `--name postgres`: Names the container `postgres`.
- `-e POSTGRES_PASSWORD=admin@123`: Sets the password for the default PostgreSQL user.
- `-d`: Runs the container in detached mode.
- `-p 5432:5432`: Maps port 5432 of the container to port 5432 on your host machine.
- `--network=demo_net`: Connects the container to the `demo_net` network.

---

## Step 3: Set Up pgAdmin

Pull the latest pgAdmin image from Docker Hub:

```bash
docker pull dpage/pgadmin4:latest
```

Run a pgAdmin container with the following command:

```bash
docker run --name pgadmin -e PGADMIN_DEFAULT_EMAIL=admin@admin.com -e PGADMIN_DEFAULT_PASSWORD=admin@123 -d -p 8080:80 --network=demo_net dpage/pgadmin4
```

- `--name pgadmin`: Names the container `pgadmin`.
- `-e PGADMIN_DEFAULT_EMAIL=admin@admin.com`: Sets the default email for pgAdmin login.
- `-e PGADMIN_DEFAULT_PASSWORD=admin@123`: Sets the default password for pgAdmin login.
- `-d`: Runs the container in detached mode.
- `-p 8080:80`: Maps port 80 of the container to port 8080 on your host machine.
- `--network=demo_net`: Connects the container to the `demo_net` network.

You can now access pgAdmin in your browser at `http://localhost:8080`.

---

## Step 4: Verify the Network

Inspect the `demo_net` network to ensure the containers are connected:

```bash
docker inspect demo_net
```

This command displays detailed information about the network, including the connected containers.

---

## Step 5: Build and Run the Application

Build the Docker image for your application:

```bash
docker build -t docker_basics .
```

- `-t docker_basics`: Tags the image with the name `docker_basics`.
- `.`: Specifies the current directory as the build context.

Run the application container:

```bash
docker run --name docker_basics --env-file=.env -d -p 3000:3000 --network=demo_net docker_basics
```

- `--name docker_basics`: Names the container `docker_basics`.
- `--env-file=.env`: Loads environment variables from the `.env` file.
- `-d`: Runs the container in detached mode.
- `-p 3000:3000`: Maps port 3000 of the container to port 3000 on your host machine.
- `--network=demo_net`: Connects the container to the `demo_net` network.

Your application should now be accessible at `http://localhost:3000`.

---

## Step 6: Deploying Docker Images to Docker Hub

Once your application is built and running successfully, you can deploy the Docker image to Docker Hub for sharing or reuse.

### Step 6.1: Login to Docker Hub

Use the following command to log in to your Docker Hub account:

```bash
docker login
```

You will be prompted to enter your Docker Hub username and password.

---

### Step 6.2: Tag the Image

Tag your Docker image with a name that includes your Docker Hub username and repository name:

```bash
docker tag docker_basics parthpatilscaletech/docker_basics:latest
```

- `docker_basics`: The name of your local image.
- `parthpatilscaletech/docker_basics:latest`: The new name for the image, including your Docker Hub username and the repository name.

---

### Step 6.3: Push the Image

Push the tagged image to Docker Hub:

```bash
docker push parthpatilscaletech/docker_basics
```

This command uploads your image to the specified repository on Docker Hub.

---

### Step 6.4: Pull the Image on Another Machine

To use the image on another machine, pull it from Docker Hub:

```bash
docker pull parthpatilscaletech/docker_basics:latest
```

This command downloads the image to the local machine, allowing you to run it without rebuilding.

---

## Summary

By following these steps, you have:

1. Created a Docker network for container communication.
2. Set up a PostgreSQL database container.
3. Set up a pgAdmin container for database management.
4. Built and deployed a custom application container.
5. Deployed your Docker image to Docker Hub, making it accessible from anywhere.

Feel free to explore and modify the setup as needed!

# Stage 1: Setup stage
FROM node:20 AS setup

# Set the working directory inside the container
WORKDIR /app

# Copy all to the working directory
COPY . .

# Stage 2: Development stage
FROM setup AS dev

# Install dependencies
RUN npm install

# Expose the application port
EXPOSE 3000

# Command to start the application in development mode
CMD ["npm", "run", "start:dev"]

# Stage 3: Vulnerability scan stage
FROM dev AS vulnscan

# Install Trivy for vulnerability scanning
RUN apk add --no-cache curl && \
    curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh

# Copy the application code for scanning
COPY . /app

# Run vulnerability scan
CMD ["trivy", "fs", "/app"]

# Stage 4: Build stage
FROM setup AS build

# Copy the application code to the working directory
COPY . .

RUN npm install

RUN npm run build

# Stage 5: Production stage
FROM node:20-alpine AS prod

# Set the working directory inside the container
WORKDIR /app

RUN mkdir volume-data && \
    chown -R node:node /app

USER node
# Copy only the built application and necessary files from the build stage
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/package*.json ./

# Install only production dependencies
RUN npm install --only=production --omit=dev

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]

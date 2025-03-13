# TREAD
## Introduction

TREADS (Target REsearch for Anti-epileptic drugs using Data Science) is a tool developed to enable user to search for known Anti-epileptic drugs (AEDs) & AED targets, and even to identify if a given protein can be a potential drug target or not. Predicting potential drug targets can be helpful in accelerating drug discovery process.

# Full-Stack TREAD Application: React + Django with Nginx

## Project Overview

This is a full-stack application with the following components:

- **Frontend**: React with TypeScript using SWC compiler for fast transpilation
- **Backend**: Django application with PostgreSQL database
- **Server**: Nginx for routing and serving the application
- **Containerization**: Docker and Docker Compose for easy deployment

The project is structured to provide a complete development and production environment with proper separation of concerns between the frontend, backend, and server configurations.

## Project Structure

```
/
├── .gitignore
├── compose.yaml              # Docker Compose configuration
├── nginx/                    # Nginx configuration files
│   ├── main.conf             # Main Nginx configuration
│   └── server.conf           # Server block configuration
├── README.md                 # This file
├── treads-backend/           # Django backend application
│   └── README.md             # Backend-specific documentation
└── treads-frontend/          # React TypeScript frontend application
    └── README.md             # Frontend-specific documentation
```

## Prerequisites

Before starting, ensure you have the following installed:

- **Docker** and **Docker Compose** (for containerized setup)
- **Git** (for version control)
- **Node.js** and **npm** (for local frontend development)
- **Python 3.8+** (for local backend development)
- **PostgreSQL** (for local backend database)

## Getting Started

### Option 1: Running with Docker (Recommended)

The easiest way to run the entire application stack is using Docker Compose:

1. Clone the repository:
   ```sh
   git clone https://github.com/nayan458/tread.git
   cd tread
   ```

2. Start the application stack:
   ```sh
   docker compose up --build
   ```

   This will:
   - Build and start the PostgreSQL database
   - Build and start the Django backend
   - Build and start the React frontend
   - Configure and start Nginx to serve everything

3. Access the application:
   - Frontend: http://localhost
   - Backend API: http://localhost/api/
   - Admin interface: http://localhost/admin/

To stop the application:
```sh
docker compose down
```

To rebuild and restart if you make changes:
```sh
docker compose down
docker compose up --build
```

### Option 2: Running Components Locally

For development purposes, you might want to run components separately:

1. **Backend Setup**: 
   - Follow the instructions in `treads-backend/README.md`
   - Backend will run on http://localhost:8000

2. **Frontend Setup**:
   - Follow the instructions in `treads-frontend/README.md`
   - Frontend will run on http://localhost:3000

## Docker Configuration Details

The application uses Docker Compose to orchestrate multiple containers:

- **Database (PostgreSQL)**:
  - Uses the latest PostgreSQL image
  - Configured with database name, username, and password
  - Data persisted in a Docker volume
  - SQL backup automatically restored on first startup

- **Backend (Django)**:
  - Built from the `treads-backend` directory
  - Runs migrations automatically on startup
  - Uses Gunicorn as the WSGI server with 3 workers

- **Frontend (React)**:
  - Built from the `treads-frontend` directory
  - Production-ready build served through Nginx

- **Nginx**:
  - Routes traffic to appropriate services
  - Handles static files
  - Manages CORS headers
  - Provides basic rate limiting

## Nginx Configuration

Nginx is configured to:

1. Serve the frontend React application
2. Proxy API requests to the Django backend
3. Handle CORS and other HTTP headers
4. Provide rate limiting for API endpoints

Key features:
- Frontend requests go to the React application
- API requests (`/api/`) are forwarded to the Django backend
- Admin interface (`/admin/`) is accessible
- Static and media files are properly served
- Basic error handling is configured

## Development Workflow

1. **Local Development**:
   - For frontend-only changes, you can use the local setup for faster feedback
   - For backend-only changes, you can use the local setup for easier debugging
   - For full-stack testing, use Docker Compose

2. **Testing Changes in Docker**:
   - After making changes, rebuild the relevant containers:
     ```sh
     docker compose up --build frontend  # For frontend changes
     docker compose up --build backend   # For backend changes
     ```

3. **Database Management**:
   - Access the PostgreSQL database:
     ```sh
     docker exec -it <postgres_container_id> bash
     psql -U postgres -d test
     ```
   - Create database backups:
     ```sh
     docker exec <postgres_container_id> pg_dump -U postgres test > backup.sql
     ```

## Production Deployment

For production deployment:

1. Update the Nginx configuration in `nginx/server.conf`:
   - Replace `localhost` with your domain name
   - Configure SSL certificates (recommended)

2. Consider adding environment-specific variables:
   - Create a `.env` file for environment variables
   - Update the Docker Compose file to use environment variables

3. Enable additional security features:
   - Uncomment and configure rate limiting
   - Enable HTTPS redirection
   - Configure secure headers

## Troubleshooting

Common issues and solutions:

1. **Connection refused errors**:
   - Ensure all containers are running: `docker compose ps`
   - Check logs for specific services: `docker compose logs backend`

2. **Database connection issues**:
   - Verify PostgreSQL container is running
   - Check database credentials in Django settings

3. **Frontend not updating after changes**:
   - Make sure to rebuild the frontend container: `docker compose up --build frontend`
   - Check browser cache or use incognito mode

4. **Nginx 502 Bad Gateway errors**:
   - Backend service might be down, check logs: `docker compose logs backend`
   - Verify service names match in both Docker Compose and Nginx config

## Contributing

Please refer to the individual README files in the `treads-frontend/` and `treads-backend/` directories for specific development guidelines for each component.
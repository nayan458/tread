# Stage 1: Base build stage
FROM python:3.13-slim AS builder
 
# Create the app directory
RUN mkdir /app
 
# Set the working directory
WORKDIR /app
 
# Set environment variables to optimize Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1 
 
# Upgrade pip and install dependencies
RUN pip install --upgrade pip 
 
# Copy the requirements file first (better caching)
COPY requirements.txt /app/
 
# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt
 
# Stage 2: Production stage
FROM python:3.13-slim
 
RUN useradd -m -r appuser && \
   mkdir /app && \
   chown -R appuser /app
 
# Copy the Python dependencies from the builder stage
COPY --from=builder /usr/local/lib/python3.13/site-packages/ /usr/local/lib/python3.13/site-packages/
COPY --from=builder /usr/local/bin/ /usr/local/bin/
 
# Set the working directory
WORKDIR /app
 
# Copy application code
COPY --chown=appuser:appuser . .
 
# Set environment variables to optimize Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1 
 
# Switch to non-root user
USER appuser
 
# Expose the application port
EXPOSE 8000 
 
# Start the application using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "my_docker_django_app.wsgi:application"]

# # Use the official Python runtime image
# FROM python:3.13  
 
# # Create the app directory
# RUN mkdir /app
 
# # Set the working directory inside the container
# WORKDIR /app
 
# # Set environment variables 
# # Prevents Python from writing pyc files to disk
# ENV PYTHONDONTWRITEBYTECODE=1
# #Prevents Python from buffering stdout and stderr
# ENV PYTHONUNBUFFERED=1 
 
# # Upgrade pip
# RUN pip install --upgrade pip 
 
# # Copy the Django project  and install dependencies
# COPY requirements.txt  /app/
 
# # run this command to install all dependencies 
# RUN pip install --no-cache-dir -r requirements.txt
 
# # Copy the Django project to the container
# COPY . /app/
 
# # Expose the Django port
# EXPOSE 8000
 
# # Run Django’s development server
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# # # syntax=docker/dockerfile:1

# # # Comments are provided throughout this file to help you get started.
# # # If you need more help, visit the Dockerfile reference guide at
# # # https://docs.docker.com/go/dockerfile-reference/

# # # Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

# # ARG PYTHON_VERSION=3.12.9
# # FROM python:${PYTHON_VERSION}-slim as base

# # # Prevents Python from writing pyc files.
# # ENV PYTHONDONTWRITEBYTECODE=1

# # # Keeps Python from buffering stdout and stderr to avoid situations where
# # # the application crashes without emitting any logs due to buffering.
# # ENV PYTHONUNBUFFERED=1

# # WORKDIR /app

# # # Create a non-privileged user that the app will run under.
# # # See https://docs.docker.com/go/dockerfile-user-best-practices/
# # ARG UID=10001
# # RUN adduser \
# #     --disabled-password \
# #     --gecos "" \
# #     --home "/nonexistent" \
# #     --shell "/sbin/nologin" \
# #     --no-create-home \
# #     --uid "${UID}" \
# #     appuser

# # # Download dependencies as a separate step to take advantage of Docker's caching.
# # # Leverage a cache mount to /root/.cache/pip to speed up subsequent builds.
# # # Leverage a bind mount to requirements.txt to avoid having to copy them into
# # # into this layer.
# # RUN --mount=type=cache,target=/root/.cache/pip \
# #     --mount=type=bind,source=requirements.txt,target=requirements.txt \
# #     python -m pip install -r requirements.txt

# # # Switch to the non-privileged user to run the application.
# # USER appuser

# # # Copy the source code into the container.
# # COPY . .

# # # Expose the port that the application listens on.
# # EXPOSE 8000

# # # Run the application.
# # CMD gunicorn 'app.wsgi' --bind=0.0.0.0:8000

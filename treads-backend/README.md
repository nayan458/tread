# Django Application Setup Guide

## Prerequisites
Before starting, ensure you have the following installed on your system:
- Docker & Docker Compose
- Python (3.8 or later)
- PostgreSQL (if setting up locally)
- Virtualenv (for local setup)
- WSL (for Windows users who want to use Gunicorn)

---

## Setting up the project with Docker
### 1. Configure PostgreSQL in Docker
- Check the `app/settings.py` file and configure it properly. Also configure the `.env` file using `example.env` file.
- `.env` file set up guide is there in the `example.env` file
- Modify the `Dockerfile` to include the required PostgreSQL credentials (username, password, database name).
- Ensure the `docker-compose.yml` file is correctly set up to run PostgreSQL and the Django application.

### 2. Start the Containers
Run the following command to start the services:
```sh
docker-compose up --build -d
```
This command will:
- Build and start the Django application.
- Spin up a PostgreSQL container.

### 3. Restore Database Backup
Once the containers are running, you need to restore the database from `backup.sql`.

#### Steps to restore the database:
1. Get the PostgreSQL container ID:
   ```sh
   docker ps
   ```
2. Access the PostgreSQL container:
   ```sh
   docker exec -it <postgres_container_id> bash
   ```
3. Login to PostgreSQL:
   ```sh
   psql -U <username> -d <database_name>
   ```
   check if table exist?
   ```sh
   \l   # to check the list of datatbases and chek if your database exist.
   # if database exist
   \c test # here I am using test please replace it with your database name
   exit # come out of the postgres
    ```

4. Restore the database: 
   ```sh
   psql -U <username> -d <database_name> < /path/to/backup.sql
   ```
   If it gives ERROR due to existance of the database then try doping the database by loging in to the postgres.
   Use the following command to drop database 
   ```sh
   drop database test
   ```
   Try running the restore command once again


---

## Running the Project Locally (Without Docker)

### 1. Set Up a Virtual Environment
Run the following commands:
```sh
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies
```sh
pip install -r requirements.txt
```
You can also generate the requirements using
```sh
pip freeze > requirements.txt
```

### 3. Configure Database (PostgreSQL)
Ensure PostgreSQL is running and create a database manually if needed.

### 4. Apply Migrations
```sh
python makemigrations
python manage.py migrate
```

### 5. Restore Database Backup
```sh
psql -U <username> -d <database_name> < /path/to/backup.sql
```

### 6. Run the Server
```sh
python manage.py runserver
```
The application will be available at `http://127.0.0.1:8000/`.

---

## Running with Gunicorn (Production Setup)

### For Linux/Mac:
```sh
gunicorn --bind 0.0.0.0:8000 myproject.wsgi:application
```

### For Windows Users:
Gunicorn does not run natively on Windows. As an alternative:
1. Install WSL (Windows Subsystem for Linux) and use Ubuntu.
2. Inside WSL, navigate to the project directory and activate the virtual environment.
3. Run the Gunicorn command:
   ```sh
   gunicorn --bind 0.0.0.0:8000 myproject.wsgi:application
   ```

---

## Conclusion
This guide covers setting up and running your Django project using both Docker and a local environment. If you encounter any issues, check the logs using:
```sh
docker logs <container_id>
```
or refer to the Django documentation for further troubleshooting.



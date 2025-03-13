# React TypeScript Project

## Overview

This project is built using **React** with **TypeScript** and utilizes the **SWC compiler** for fast transpilation. It follows a structured and modular approach, making it easy to scale and maintain.

## Project Setup

While the project will work fine with a simple installation, it includes components that fetch data from an API. The API configuration for the frontend is located in the `src/axios` directory, where users can modify the configuration as needed.

For backend setup, refer to the documentation available at:
[Backend Documentation](https://github.com/nayan458/tread/tree/main/treads-backend#readme)

Or

Refer to the `trads-backend/README.md` file

### Installation of Packages

Run the following command to install dependencies:

```sh
npm install
```

### Running the Project

To start the development server, use:

```sh
npm run dev
```

### Production Build

The project is optimized for production. You can build the project using:

```sh
npm run build
```

After building, you can serve the application using:

```sh
serve -s dist
```

## Docker Setup

To run the project in a Docker container, follow these steps:

1. Build the Docker image:
   ```sh
   docker build -t react-app .
   ```
2. Run the container:
   ```sh
   docker run -p 3000:3000 react-app
   ```
   OR

## Docker compose Setup

1. Build the docker image:

```sh
# use any one command
docker compose build
docker compose build --no-cache # if you dont want to use cache
```

2.Run the container:

```sh
# use any one command
docker compose up
docker compose up -d # to run the deteched mode
```

## Project Structure

The project follows a modular structure:

```
/src
├── api        # API integration and Axios instance creation
├── assets     # Static assets (images, icons, etc.)
├── components # Reusable global components
├── context    # Context API implementations
├── db         # Static data stored in TypeScript JSON files
├── hooks      # Custom React hooks
├── layouts    # Layout components for project pages
├── routes     # Route configurations
├── views      # Pages and components specific to them
```

This structure ensures scalability and maintainability, making it easier to manage different modules of the application.

If you want to add new folder inside src directory and then take advantage of alias file path configuration.

Check the `tsconfig.app.json` file and add it to path. Then add it to the alias in vite.config.ts

---

## Tailwind Configuration

The tailwind configuration is already setup and it has its own dedicated directory as tailwind-config

You can create your own them inside the `tailwind-config/teme` directory and register them to `tailwind.config.ts`

## Types

The types most of the types are exported from the `src/types.tsx` file and recomended to register your types into this file.

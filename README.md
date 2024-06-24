# Squareme Full Stack Developer Assessment Test

## Task: Develop a Full Stack URL Shortener using Reactjs/Nextjs (TypeScript) and Adonisjs

### Instructions

Your task is to create a full stack URL shortener similar to bitly.com using Reactjs/Nextjs (TypeScript) to replicate the provided UI mock-up. You are expected to implement the UI components, handle user interactions, and ensure responsiveness. The backend should be implemented using AdonisJs. Stock images may be used for any pictures/logos in the design.

### Mock-up: Frontend

## Requirements

1. Use Reactjs/Nextjs (TypeScript) to develop the front-end application.
2. Implement the UI components according to the provided mock-up.
3. Ensure responsiveness of components.
4. Handle user interactions and input validation as necessary.
5. Use appropriate CSS styles to achieve the desired visual appearance.
6. Use Adonisjs for the backend.
7. Incorporate best practices for code readability, maintainability, and reusability.
8. Include proper comments and documentation where necessary.
9. Use PostgreSQL for the database.
10. Create a monorepo to hold both frontend and backend.

### Deliverables

1. Complete the full stack development using Reactjs/Nextjs (TypeScript) and Adonisjs.
2. Provide a link to the web page.
3. Link to the git/bitbucket repo for the assessment.
4. Include a README file with instructions on how to run the application locally.

### Additional Information

- Node.js version: 20 and above
- Monorepo setup using Turbo Repo
- Frontend stack: Next.js, TypeScript, Tailwind CSS, Axios
- Backend stack: AdonisJs, PostgreSQL
- Frontend deployed to Vercel: [Click Here](#)
- Backend deployed to Render.com: [Click Here](https://url-shortener-959j.onrender.com)
- Postgres deployed to superbase 
### Features

- User signup/login
- User generate short URL

### Features Yet to Complete

- User view generated URLs

## Getting Started

### Prerequisites

- Node.js v20 or higher
- PostgreSQL
- Yarn or NPM (preferred package manager for Turbo Repo)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/biolabalo/Url-Shortener.git
cd url-shortener

2. Setup your env file using the .env.example file:

```bash
TZ=UTC
PORT=3333
HOST=localhost
LOG_LEVEL=info
APP_KEY=MT9c121iTQhYlK4p6G3cD2MF-oB5moE0
NODE_ENV=development
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=
DB_DATABASE=
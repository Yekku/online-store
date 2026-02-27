# Online Store

A course store application built with Node.js, Express, Handlebars, and MongoDB.

## Features

- Browse course catalog with images, descriptions, and prices
- View course details
- Add new courses
- Edit existing courses
- Shopping cart (add/remove items)

## Tech Stack

- **Backend:** Node.js, Express 4
- **Templating:** Express Handlebars
- **Database:** MongoDB 7 (via Docker)
- **ODM:** Mongoose
- **Frontend:** Materialize CSS

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/)

## Getting Started

```bash
# Clone the repo
git clone https://github.com/Yekku/online-store.git
cd online-store

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start MongoDB and the app
make dev
```

The app will be available at `http://localhost:3001`.

## Available Commands

```bash
make help       Show all available commands
make dev        Start MongoDB and app (port 3001)
make stop       Stop MongoDB container
make seed       Start MongoDB and seed sample data
make db-reset   Wipe database and reseed from scratch
```

## Project Structure

```text
├── models/          # Mongoose models (Course, Card)
├── routes/          # Express route handlers
├── views/           # Handlebars templates
│   ├── layouts/     # Page layouts
│   └── partials/    # Reusable partials (head, navbar, footer)
├── public/          # Static assets (CSS, JS)
├── data/            # Legacy JSON data files
├── index.js         # App entry point
├── seed.js          # Database seeder
├── docker-compose.yml
├── Makefile
└── .env.example
```

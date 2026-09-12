"# first-CRUD-API" 
# To-Do CRUD API

A simple RESTful API built with **Node.js** and **Express** that manages a to-do list through the four core CRUD operations — **Create, Read, Update, Delete**. CRUD is the backbone of nearly every backend system, from social media posts to e-commerce orders — build it once, and every backend feels familiar.

## Features

- Create, read, update, and delete to-do items
- Interactive API documentation and testing via **Swagger UI**
- In-memory data storage (no database yet — data resets on server restart)

## Tech Stack

- Node.js
- Express.js
- Swagger UI Express + Swagger JSDoc

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all to-dos |
| GET | `/todos/:id` | Get a single to-do by ID |
| POST | `/todos` | Create a new to-do |
| PUT | `/todos/:id` | Update an existing to-do |
| DELETE | `/todos/:id` | Delete a to-do |

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed

### Installation

```bash
git clone https://github.com/Nomnom22-dot/first-CRUD-API.git
cd first-CRUD-API
npm install
```

### Running the server

```bash
node first.js
```

The server will start at `http://localhost:3000`.

### Testing the API

Open your browser to: http://localhost:3000/api-docs

This loads an interactive Swagger UI page where you can try out every endpoint directly — no extra tools needed.

## Example Request

**Create a to-do:**

```json
POST /todos
{
  "task": "Learn Express"
}
```

**Response:**

```json
{
  "id": 1,
  "task": "Learn Express",
  "done": false
}
```

## Notes

This project uses in-memory storage instead of a database, so all data is lost when the server restarts. That's intentional — the next step is connecting this API to a real database.

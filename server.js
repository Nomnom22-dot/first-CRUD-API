const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
  { id: 1, name: "Hammad", email: "hammad@test.com" },
  { id: 2, name: "Ali", email: "ali@test.com" },
];

let todos = [
  { id: 1, title: "Learn JS", completed: false, userId: 1 },
  { id: 2, title: "Build API", completed: false, userId: 2 },
];

let userIdCounter = 3;
let todoIdCounter = 3;

// ============ USERS ============

// GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// GET single user
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// POST create user
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "name and email are required" });

  const newUser = { id: userIdCounter++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;

  res.json(user);
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "User not found" });

  users.splice(index, 1);
  res.status(204).end();
});

// ============ TODOS ============

// GET all todos (with optional ?userId= filter)
app.get("/todos", (req, res) => {
  const { userId } = req.query;
  if (userId) {
    return res.json(todos.filter((t) => t.userId === parseInt(userId)));
  }
  res.json(todos);
});

// GET single todo
app.get("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  res.json(todo);
});

// POST create todo
app.post("/todos", (req, res) => {
  const { title, userId } = req.body;
  if (!title || !userId) return res.status(400).json({ error: "title and userId are required" });

  const newTodo = { id: todoIdCounter++, title, completed: false, userId };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT update todo
app.put("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  const { title, completed } = req.body;
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

// DELETE todo
app.delete("/todos/:id", (req, res) => {
  const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Todo not found" });

  todos.splice(index, 1);
  res.status(204).end();
});

// ============ START ============

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

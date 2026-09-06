//routes.js
const express = require("express");
const router = express.Router();
const db = require('./db');

// let todos = [
//     { id: 1, task: "Learn Express", done: false },
//     { id: 2, task: "Build CRUD API", done: false}
// ];
// let nextId = 3;



/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all to-do items
 *     responses:
 *       200:
 *         description: List of all to-dos
 */
router.get("/todos", (req, res) => {
    const todos = db.prepare('SELECT * FROM todos').all();
    res.json(todos);
});

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get a single to-do by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The to-do item
 *       404:
 *         description: Not found
 */
router.get("/todos/:id", (req, res) => {
    const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(req.params.id);
    if(!todo) return res.status(404).json({message : "Todo not found"});
    res.json(todo);
});

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new to-do
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created to-do
 */
router.post("/todos", (req, res) => {
    const { task } = req.body;
    if (!task) return res.status(400).json({ message: "Task is required"});

    const newTodo = { id: nextId++, task, done: false};
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a to-do
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task:
 *                 type: string
 *               done:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Updated to-do
 *       404:
 *         description: Not found
 */
router.put("/todos/:id", (req,res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({message: "Todo not Found"});

    const { task, done} = req.body;
    if(task !== undefined) todo.task = task;
    if (done !== undefined) todo.done = done;

    res.json(todo);
});

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a to-do
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted successfully
 *       404:
 *         description: Not found
 */
router.delete("/todos/:id", (req,res) => {
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if(index === -1) return res.status(404).json({message: "Todo not found"});

    todos.splice(index,1);
    res.json({message: "Todo deleted"});
});

module.exports= router;
const express = require("express");
const uuid = require("uuid");

/**
 *  Express app
 */
const app = express();

/**
 * Middlewares
 */
app.use(express.json());

/**
 *  Fake Data
 */
let todos = [
  {
    id: "1",
    content: "Learning Node.js",
  },
];

/**
 *  Routes
 */

// Find All ToDos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Find One ToDo
app.get("/todos/:id", (req, res) => {
  const routeID = req.params.id;

  const todo = todos.find((todo) => todo.id === routeID);

  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send({ error: "Todo Not Found!" });
  }
});

// Create ToDo
app.post("/todos", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const todo = {
    id: uuid.v4(),
    content: body.content,
  };

  // todos = todos.concat(todo);
  todos.push(todo);

  res.json(todo);
});

// Delete ToDo
app.delete("/todos/:id", (req, res) => {
  const todoID = req.params.id;

  if (!todoID) {
    return res.status(404).send({ error: "Todo ID is missing!" });
  }

  const todoIndex = todos.findIndex((todo) => todo.id == todoID);

  if (todoIndex < 0) {
    return res.status(404).send({ error: "Todo Not Found!" });
  }

  const todo = todos[todoIndex];

  todos = todos.filter((todo) => todo.id !== todoID);

  res.json(todo);
});

// Update ToDo
app.put("/todos/:id", (req, res) => {
  const routeID = req.params.id;

  const todo = todos.find((todo) => todo.id == routeID);

  if (!todo) {
    return res.status(404).send({ error: "ToDo Not Found!" });
  }

  const updateTodo = {
    id: routeID,
    content: req.body.content,
  };

  todos = todos.map((todo) => {
    if (todo.id != routeID) {
      return todo;
    } else {
      return updateTodo;
    }
  });

  res.json(updateTodo);
});

/**
 *  Create a server
 */
const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const task = {
    id: Date.now(),
    text: req.body.text
  };

  tasks.push(task);
  res.json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
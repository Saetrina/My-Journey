import express from "express";
import fs from "fs";
import crypto from "crypto";

const router = express.Router();
const tasksFilePath = "./storage/tasksData.json";

//RETURN ALL TASKS
router.get("/", (req, res) => {
  try {
    const tasks = JSON.parse(fs.readFileSync(tasksFilePath));

    return res
      .status(201)
      .json(tasks)
      .send({ message: "Tasks retrieved successfully" });
  } catch (err) {
    return res.status(500);
  }
});

//RETURN ALL TASKS IN A DAY
router.get("/:date", (req, res) => {
  const { date } = req.params;
  const tasksData = JSON.parse(fs.readFileSync(tasksFilePath));

  try {
    const tasks = tasksData.filter(
      (task) => task.date.split(" ").join("") === date,
    );

    if (!tasks)
      return res.status(404).send({ message: "No tasks found on this day" });

    return res.status(201).send(tasks);
  } catch (err) {
    return res.status(500);
  }
});

//RETURN A SPECIFIC TASK
router.get("/getById/:id", (req, res) => {
  const { id } = req.params;
  const tasks = JSON.parse(fs.readFileSync(tasksFilePath));

  try {
    const task = tasks.find((task) => task.id === id);

    if (!task) return res.status(404).send({ message: "Task not found" });

    return res
      .status(201)
      .json(task)
      .send({ message: "Task retrieved successfully" });
  } catch (err) {
    return res.status(500);
  }
});

//CREATE A TASK
router.put("/create", (req, res) => {
  let task = req.body;
  let tasksData = JSON.parse(fs.readFileSync(tasksFilePath));

  try {
    task.id = crypto.randomBytes(16).toString("hex");

    tasksData.push(task);
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasksData, null, 2));

    return res
      .status(201)
      .json(req.body)
      .send({ message: "Task created successfully" });
  } catch (err) {
    return res.status(500);
  }
});

//DELETE A TASK
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const tasks = JSON.parse(fs.readFileSync(tasksFilePath));

  try {
    const taskIdx = tasks.indexOf((task) => task.id === id);

    if (!taskIdx) return res.status(404).send({ message: "Task not found" });

    let tasksData = tasks;

    tasksData.splice(taskIdx, 1);
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasksData, null, 2));

    return res.status(201).send({ message: "Task deleted successfully" });
  } catch (err) {
    return res.status(500);
  }
});

export default router;

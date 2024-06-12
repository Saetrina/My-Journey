import express from "express";
import fs from "fs";
import crypto from "crypto";

const router = express.Router();
const thoughtsFilePath = "./storage/thoughtsData.json";

//RETURN ALL THOUGHTS
router.get("/", (req, res) => {
  try {
    const thoughts = JSON.parse(fs.readFileSync(thoughtsFilePath));

    return res
      .status(201)
      .json(thoughts)
      .send({ message: "Thoughts retrieved successfully" });
  } catch (err) {
    return res.status(500);
  }
});

//RETURN ALL THOUGHTS IN A DAY
router.get("/:date", (req, res) => {
  const { date } = req.params;
  const thoughtsData = JSON.parse(fs.readFileSync(thoughtsFilePath));

  try {
    const thoughts = thoughtsData.filter(
      (thought) => thought.date.split(" ").join("") === date,
    );

    if (!thoughts)
      return res.status(404).send({ message: "No thoughts found on this day" });

    return res
      .status(201)
      .json(thoughts)
      .send({ message: "Thought retrieved successfully" });
  } catch (err) {
    return res.status(500);
  }
});

//RETURN A SPECIFIC THOUGHT
router.get("/getById/:id", (req, res) => {
  const { id } = req.params;
  const thoughts = JSON.parse(fs.readFileSync(thoughtsFilePath));

  try {
    const thought = thoughts.find((thought) => thought.id === id);

    if (!thought) return res.status(404).send({ message: "Thought not found" });

    return res
      .status(201)
      .json(thought)
      .send({ message: "Thought retrieved successfully" });
  } catch (err) {
    return res.status(500);
  }
});

//CREATE A THOUGHT
router.put("/create", (req, res) => {
  let thought = req.body;
  let thoughtsData = JSON.parse(fs.readFileSync(thoughtsFilePath));

  try {
    thought.id = crypto.randomBytes(16).toString("hex");

    thoughtsData.push(thought);
    fs.writeFileSync(thoughtsFilePath, JSON.stringify(thoughtsData, null, 2));

    return res
      .status(201)
      .json(req.body)
      .send({ message: "Thought created successfully" });
  } catch (err) {
    return res.status(500);
  }
});

//DELETE A THOUGHT
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const thoughts = JSON.parse(fs.readFileSync(thoughtsFilePath));

  try {
    const thoughtIdx = thoughts.indexOf((thought) => thought.id === id);

    if (!thoughtIdx)
      return res.status(404).send({ message: "Thought not found" });

    let thoughtsData = thoughts;

    thoughtsData.splice(thoughtIdx, 1);
    fs.writeFileSync(thoughtsFilePath, JSON.stringify(thoughtsData, null, 2));

    return res.status(201).send({ message: "Thought deleted successfully" });
  } catch (err) {
    return res.status(500);
  }
});

export default router;

import express from "express";
import fs from "fs";
import crypto from "crypto";

const router = express.Router();
const achievementsFilePath = "./storage/achievementsData.json";

//RETURN ALL ACHIEVEMENTS
router.get("/", (req, res) => {
  try {
    const achievements = JSON.parse(fs.readFileSync(achievementsFilePath));

    return res
      .status(201)
      .json(achievements)
      .send({ message: "Achievements retrieved successfully" });
  } catch (err) {
    return res.status(500);
  }
});

//RETURN ALL ACHIEVEMENTS IN A DAY
router.get("/:date", (req, res) => {
  const { date } = req.params;
  const achievementsData = JSON.parse(fs.readFileSync(achievementsFilePath));

  try {
    const achievements = achievementsData.filter(
      (achievement) => achievement.date.split(" ").join("") === date
    );

    if (!achievements)
      return res
        .status(404)
        .send({ message: "No achievements found on this day" });

    return res
      .status(201)
      .json(achievements)
      .send({ message: "Achievement retrieved successfully" });
  } catch (err) {
    return res.status(500);
  }
});

//RETURN A SPECIFIC ACHIEVEMENT
router.get("/getById/:id", (req, res) => {
  const { id } = req.params;
  const achievements = JSON.parse(fs.readFileSync(achievementsFilePath));

  try {
    const achievement = achievements.find(
      (achievement) => achievement.id === id
    );

    if (!achievement)
      return res.status(404).send({ message: "Achievement not found" });

    return res
      .status(201)
      .json(achievement)
      .send({ message: "Achievement retrieved successfully" });
  } catch (err) {
    return res.status(500);
  }
});

//CREATE A ACHIEVEMENT
router.put("/create", (req, res) => {
  let achievement = req.body;
  console.log(req.body);
  let achievementsData = JSON.parse(fs.readFileSync(achievementsFilePath));

  try {
    achievement.id = crypto.randomBytes(16).toString("hex");
    achievement.type = "achievement";

    achievementsData.push(achievement);
    fs.writeFileSync(
      achievementsFilePath,
      JSON.stringify(achievementsData, null, 2)
    );

    return res
      .status(201)
      .json(req.body)
      .send({ message: "Achievement created successfully" });
  } catch (err) {
    return res.status(500);
  }
});

//DELETE A ACHIEVEMENT
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const achievements = JSON.parse(fs.readFileSync(achievementsFilePath));

  try {
    const achievementIdx = achievements.indexOf(
      (achievement) => achievement.id === id
    );

    if (!achievementIdx)
      return res.status(404).send({ message: "Achievement not found" });

    let achievementsData = achievements;

    achievementsData.splice(achievementIdx, 1);
    fs.writeFileSync(
      achievementsFilePath,
      JSON.stringify(achievementsData, null, 2)
    );

    return res
      .status(201)
      .send({ message: "Achievement deleted successfully" });
  } catch (err) {
    return res.status(500);
  }
});

//CHANGE STATE
router.post("/:id", (req, res) => {
  const { id } = req.params;
  const achievements = JSON.parse(fs.readFileSync(achievementsFilePath));

  try {
    const achievementIdx = achievements.findIndex(
      (achievement) => achievement.id === id
    );

    if (achievementIdx < 0)
      return res.status(404).send({ message: "Achievement not found" });

    let achievementsData = achievements;

    achievementsData[achievementIdx].pending = achievementsData[achievementIdx]
      .pending
      ? false
      : true;

    fs.writeFileSync(
      achievementsFilePath,
      JSON.stringify(achievementsData, null, 2)
    );

    return res.status(201).send({ message: achievementIdx });
  } catch (err) {
    return res.status(500);
  }
});

export default router;

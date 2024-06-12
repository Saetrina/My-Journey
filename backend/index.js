import express from "express";
import cors from "cors";
import tasksController from "./controllers/tasksController.js";
import thoughtsController from "./controllers/thoughtsController.js";
import achievementsController from "./controllers/achievementsController.js";

const app = express();
const PORT = 5555;

app.use(express.json());
app.use(cors({ origin: true }));

app.use("/tasks", tasksController);
app.use("/thoughts", thoughtsController);
app.use("/achievements", achievementsController);

app.listen(PORT, () => {
  console.log("App is listening on port: ", PORT);
});

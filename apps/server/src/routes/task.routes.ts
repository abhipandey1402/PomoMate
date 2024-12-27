import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addTask, deleteTask, getCurrentTask, getTask, getTasks, getTasksByStatus, manageTaskTimer, shareTaskWithUsers, toggleTaskStarred, updateTaskStatus } from "../controllers/task.controller.js";

const taskRouter : Router = Router();

taskRouter.route("/add").post(verifyJWT, addTask);
taskRouter.route("/:taskId/get").get(verifyJWT, getTask);
taskRouter.route("/:status/getByStatus").get(verifyJWT, getTasksByStatus);
taskRouter.route("/getAll").get(verifyJWT, getTasks);
taskRouter.route("/:taskId/:status/updateStatus").patch(verifyJWT, updateTaskStatus);
taskRouter.route("/:taskId").delete(verifyJWT, deleteTask);

taskRouter.route("/getCurrentTask").get(verifyJWT, getCurrentTask);

// New route to mark a task as starred or remove starred status
taskRouter.route("/:taskId/star").patch(verifyJWT, toggleTaskStarred);
// New route to start or stop the timer for a task
taskRouter.route("/:taskId/timer").patch(verifyJWT, manageTaskTimer);
// New route to share a task with a user
taskRouter.route("/:taskId/share").post(verifyJWT, shareTaskWithUsers);


export default taskRouter;
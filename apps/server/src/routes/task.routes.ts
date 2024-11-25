import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addTask, deleteTask, getTask, getTasks, getTasksByStatus, updateTaskStatus } from "../controllers/task.controller.js";

const taskRouter : Router = Router();

taskRouter.route("/add").post(verifyJWT, addTask);
taskRouter.route("/:taskId/get").get(verifyJWT, getTask);
taskRouter.route("/:status/getByStatus").get(verifyJWT, getTasksByStatus);
taskRouter.route("/getAll").get(verifyJWT, getTasks);
taskRouter.route("/:taskId/:status/updateStatus").patch(verifyJWT, updateTaskStatus);
taskRouter.route("/:taskId").delete(verifyJWT, deleteTask);


export default taskRouter;
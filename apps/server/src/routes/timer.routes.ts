import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { clearTimer, completeTimer, getTimer, pauseTimer, resumeTimer, startTimer } from "../controllers/timer.controller.js";

const timerRouter: Router = Router();

timerRouter.route("/start").post(verifyJWT, startTimer);
timerRouter.route("/:timerId/get").get(verifyJWT, getTimer);
timerRouter.route("/:timerId/pause").patch(verifyJWT, pauseTimer);
timerRouter.route("/:timerId/resume").patch(verifyJWT, resumeTimer);
timerRouter.route("/:timerId/complete").patch(verifyJWT, completeTimer);
timerRouter.route("/:timerId/clear").delete(verifyJWT, clearTimer);

export default timerRouter;

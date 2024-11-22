import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { pauseTimer, resumeTimer, startTimer } from "../controllers/timer.controller.js";

const timerRouter: Router = Router();

timerRouter.route("/start").post(verifyJWT, startTimer);
timerRouter.route("/:timerId/pause").patch(verifyJWT, pauseTimer);
timerRouter.route("/:timerId/resume").patch(verifyJWT, resumeTimer);

export default timerRouter;

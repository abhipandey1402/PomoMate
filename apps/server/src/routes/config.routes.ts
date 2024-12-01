import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { checkConfigExists, createConfig, getConfig, getDefaultConfig, resetConfig, updateConfig } from "../controllers/config.controller.js";

const configRouter : Router = Router();

configRouter.route("/add").post(verifyJWT, createConfig);
configRouter.route("/get").get(verifyJWT, getConfig);
configRouter.route("/update").put(verifyJWT, updateConfig);
configRouter.route("/reset").post(verifyJWT, resetConfig);
configRouter.route("/default").get(getDefaultConfig);
configRouter.route("/exists").get(verifyJWT, checkConfigExists);

export default configRouter;
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { sendMessage, getMessages, getChannels, joinChatChannel, createChannel } from "../controllers/chat.controller.js";

const chatRouter: Router = Router();

// Route for sending a message
chatRouter.route("/send").post(verifyJWT, sendMessage);

// Route for fetching messages
chatRouter.route("/messages").get(verifyJWT, getMessages);

chatRouter.route('/createChannel').post(verifyJWT, createChannel);

// Route for fetching all channels
chatRouter.route("/channels").get(verifyJWT, getChannels);

// Route for joining a chat channel
chatRouter.route("/join").post(verifyJWT, joinChatChannel);

export default chatRouter;

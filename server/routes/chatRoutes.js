//chatRoutes.js
const express = require("express");
const { accessChat, getChats } = require("../controllers/chatController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(authMiddleware, accessChat); //access chat or create a new one to one chat
router.route("/").get(authMiddleware, getChats); //get all chat for requesting user
//router.route("/group").post(createGroupChat); //create a new group chat

module.exports = router;

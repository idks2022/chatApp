//messageRoutes.js
const authMiddleware = require("../middlewares/authMiddleware");
const express = require("express");
const {
  createMessage,
  getMessages,
} = require("../controllers/messageController");
const router = express.Router();

router.route("/:chatId").get(authMiddleware, getMessages); //get messages for certain chat
router.route("/").post(authMiddleware, createMessage); //create new message

module.exports = router;

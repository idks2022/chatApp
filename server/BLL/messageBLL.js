//messageBLL.js
const Message = require("../models/messageModel");
const User = require("../models/userModel");

//get messages for chat ID
const getMessages = async (chatId) => {
  const messages = await Message.find({ chat: chatId })
    .select("-__v")
    .populate("sender", "name pic")
    .populate("chat", "-createdAt -updatedAt -__v");

  return messages;
};

//create a new message
const createMessage = async (messageData) => {
  let newMessage = await Message.create(messageData);
  await newMessage.populate("sender", "name pic");
  await newMessage.populate("chat", "-createdAt -updatedAt -__v");
  await User.populate(newMessage, {
    path: "chat.users",
    select: "name email pic",
  });

  return newMessage;
};

module.exports = {
  createMessage,
  getMessages,
};

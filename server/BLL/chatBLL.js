//chatBLL.js
const Chat = require("../models/chatModel");

//get multiple chats
const getChats = async (query) => {
  let chats = await Chat.find(query)
    .populate("users", "name email pic _id")
    .populate("latestMessage");

  chats = await Chat.populate(chats, {
    path: "latestMessage.sender",
    select: "name email pic",
  });

  return chats;
};

//get single chat
const getChat = async (query) => {
  let chat = await Chat.findOne(query)
    .populate("users", "name email pic _id")
    .populate("latestMessage");

  chat = await Chat.populate(chat, {
    path: "latestMessage.sender",
    select: "name email pic",
  });

  return chat;
};

const createChat = async (chatData) => {
  let newChat = await Chat.create(chatData);
  await newChat.populate("users", "-password -createdAt -updatedAt -__v");
  return newChat;
};

const updateChat = async (id, changes) => {
  const updatedChat = await Chat.findByIdAndUpdate(id, changes, { new: true });
  return updatedChat;
};

const deleteChat = async (id) => {
  const deletedChat = await Chat.findByIdAndDelete(id);
  return deletedChat;
};

module.exports = {
  getChats,
  getChat,
  createChat,
  updateChat,
  deleteChat,
};

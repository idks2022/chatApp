//chatController.js
const chatBLL = require("../BLL/chatBLL");
const userBLL = require("../BLL/userBLL");

//Create or get a one to one chat
//POST request to ".../chats"
const accessChat = async (req, res) => {
  const query = {
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user.id } } }, //the requesting user (this user)
      { users: { $elemMatch: { $eq: req.body.userId } } }, //the user this user is searching
    ],
  };

  try {
    const chat = await chatBLL.getChat(query);
    if (chat) {
      res.status(200).json(chat);
    } else {
      const isValidUser = await userBLL.getUser({ _id: req.body.userId });
      if (!isValidUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const newChat = await chatBLL.createChat({
        chatName: "sender",
        users: [req.user.id, req.body.userId],
        isGroupChat: false,
      });
      res.status(201).json(newChat);
    }
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ message: "Invalid User ID" });
    } else {
      res.status(500).json({ message: "Server Error" });
    }
    console.log(error);
  }
};

//get all chats for the requesting user
//GET request to ".../chats"
const getChats = async (req, res) => {
  const query = { users: { $elemMatch: { $eq: req.user.id } } };

  try {
    const chats = await chatBLL.getChats(query);
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
};

module.exports = {
  accessChat,
  getChats,
};

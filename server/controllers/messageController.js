//messageController.js
const messageBLL = require("../BLL/messageBLL");
const chatBLL = require("../BLL/chatBLL");

//get messages for certain chat
//GET request to ".../messages/:chatId"
const getMessages = async (req, res) => {
  const chatId = req.params.chatId;
  try {
    const messages = await messageBLL.getMessages(chatId);
    if (messages.length === 0) {
      return res
        .status(404)
        .json({ message: "Messages not found for this chat id" });
    }
    return res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
};

//create new message
//POST request to ".../messages"
const createMessage = async (req, res) => {
  const { chatId, content } = req.body;

  if (!chatId || !content) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const newMessageData = {
    sender: req.user.id,
    content: content,
    chat: chatId,
  };

  try {
    const newMessage = await messageBLL.createMessage(newMessageData);
    await chatBLL.updateChat(chatId, {
      latestMessage: newMessage._id,
    });

    const chat = newMessage.chat;
    if (!chat || !chat.users)
      return res.status(400).json({ message: "Chat / chat.users not found" });

    /* // Emit the new message to the chat's room
    req.app.io.to(chatId).emit("message received", newMessage); */

    // Emit the new message to each user inside the chat
    for (let userId of chat.users) {
      console.log("emitting message to user", userId._id.toString());
      req.app.io.to(userId._id.toString()).emit("message received", newMessage);
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
};

module.exports = {
  createMessage,
  getMessages,
};

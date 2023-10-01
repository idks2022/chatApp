module.exports = function setupSocket(io) {
  io.on("connection", (socket) => {
    console.log("New client connected with socket id", socket.id);

    socket.on("setup", (userData) => {
      console.log("Setup event received for user", userData._id);
      socket.join(userData._id);
      socket.emit("connected");
    });

    socket.on("join chat", (chatId) => {
      socket.join(chatId);
      console.log(`User ID: ${socket.id} has joined chat ID: ${chatId}`);
      socket.emit("chat connected", chatId);
    });

    //"new message" event will be handled in "messageController.js"
  });
};

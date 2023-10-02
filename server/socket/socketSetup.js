module.exports = function setupSocket(io) {
  const socketToRoomMapping = {};

  io.on("connection", (socket) => {
    console.log("New client has connected with socket ID:", socket.id);

    socket.on("setup", (userData) => {
      console.log("Setup event received for user ID:", userData._id);
      socket.join(userData._id);
      socket.emit("connected");
    });

    socket.on("join chat", (chatId) => {
      // Check for existing chat room and leave if necessary
      const currentChatId = socketToRoomMapping[socket.id];
      if (currentChatId) {
        socket.leave(currentChatId);
        console.log(
          `Socket ID: ${socket.id} has left chat ID: ${currentChatId}`
        );
      }

      // Join new chat room
      socket.join(chatId);
      socketToRoomMapping[socket.id] = chatId;
      console.log(`Socket ID: ${socket.id} has joined chat ID: ${chatId}`);
      socket.emit("chat connected", chatId);
    });

    //"new message" event will be handled in "messageController.js"

    socket.on("disconnect", () => {
      console.log("A user disconnected");
      // Optionally leave any rooms or perform other cleanup tasks here
    });
  });
};

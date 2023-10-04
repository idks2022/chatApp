module.exports = function setupSocket(io) {
  const socketToRoomMapping = {};
  const userSocketMapping = new Map();
  const usersSetup = new Set();

  io.on("connection", (socket) => {
    console.log("New client has connected with socket ID:", socket.id);

    socket.on("setup", (userData) => {
      if (usersSetup.has(userData._id)) {
        return;
      }

      socket.join(userData._id);
      console.log("Setup user's own socket:", userData._id);
      usersSetup.add(userData._id);
      userSocketMapping.set(socket.id, userData._id);
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
      const userId = userSocketMapping.get(socket.id);
      usersSetup.delete(userId);
      userSocketMapping.delete(socket.id);
    });
  });
};

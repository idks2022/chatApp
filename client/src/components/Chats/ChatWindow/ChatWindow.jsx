// ChatWindow.jsx
import MessagesArea from "./MessagesArea";
import MessageInput from "./MessageInput";
import { Box, AppBar, Toolbar } from "@mui/material";
import useFetch from "../../../hooks/useFetch";
import { useEffect, useState, useRef } from "react";

import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:3000";

const ChatWindow = ({ selectedChat }) => {
  const thisUser = JSON.parse(sessionStorage.getItem("userInfo"));

  const [messages, setMessages] = useState(null); //gets value from useFetch
  const [url, setUrl] = useState(null); //gets value from useEffect

  let { data, loading, error } = useFetch(url);

  const socketRef = useRef(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(ENDPOINT);

      //Listen to socket connection
      socketRef.current.on("connect", () => {
        console.log("connected with socket id: ", socketRef.current.id);
      });

      //emit setup even
      socketRef.current.emit("setup", thisUser);
    }
  }, [thisUser]);

  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);

  useEffect(() => {
    if (selectedChat) {
      const getMessagesApiRoute = `http://localhost:3000/messages/${selectedChat._id}`;
      setUrl(getMessagesApiRoute); //activate useFetch

      //join chat
      socketRef.current.emit("join chat", selectedChat._id);

      //listen for new message
      socketRef.current.on("message received", (newMessage) => {
        console.log("message received: ", newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }
  }, [selectedChat]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on("chat connected", (chatId) => {
        console.log("chat connected: ", chatId);
      });
    }
  });

  if (!selectedChat) {
    return <h3>Select a Chat</h3>;
  }

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <AppBar position="static">
        <Toolbar>Chat Contact Bar</Toolbar>
      </AppBar>

      {/* Messages Area */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto", // Makes this area scrollable
          // Set the height by subtracting the AppBar and MessageInput heights
          height: "calc(100% - 50px - 64px)", // assuming AppBar has height of 64px, adjust if necessary
          wordWrap: "break-word",
        }}
      >
        <MessagesArea messages={messages} thisUser={thisUser} />
      </Box>

      {/* Message Input */}
      <Box sx={{ height: "50px" }}>
        <MessageInput chatId={selectedChat._id} />
      </Box>
    </Box>
  );
};

export default ChatWindow;

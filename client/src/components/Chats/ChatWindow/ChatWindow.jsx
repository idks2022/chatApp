// ChatWindow.jsx
import MessagesArea from "./MessagesArea";
import MessageInput from "./MessageInput";
import { Box, AppBar, Toolbar, CircularProgress } from "@mui/material";
import useFetch from "../../../hooks/useFetch";
import { useEffect, useState, useRef } from "react";
import ContactBar from "./ContactBar";

import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:3000";

const ChatWindow = ({ selectedChat }) => {
  const thisUser = JSON.parse(sessionStorage.getItem("userInfo"));

  const [messages, setMessages] = useState(null); //gets value from useFetch
  const [url, setUrl] = useState(null); //gets value from useEffect

  let { data, loading, error } = useFetch(url);

  const socketRef = useRef(null);

  //socket setup and cleanup
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(ENDPOINT);

      //Listen to socket connection
      socketRef.current.on("connect", () => {
        console.log(
          "Client has connected with socket ID:",
          socketRef.current.id
        );
      });

      //emit setup even
      socketRef.current.emit("setup", thisUser);

      //listen to chat connected
      socketRef.current.on("chat connected", (chatId) => {
        console.log("Client has connected to chat ID:", chatId);
      });

      //cleanup function
      /*    return () => {
        socketRef.current.disconnect();
      }; */
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
        if (selectedChat._id !== newMessage.chat._id) {
          //send notification about new message
        } else {
          console.log("message received: ", newMessage);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      });

      // Cleanup function to remove the listener
      return () => {
        socketRef.current.off("message received");
      };
    }
  }, [selectedChat]);

  if (!selectedChat) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <h3>Select a chat to display</h3>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
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
      {/* Contact Bar */}
      <ContactBar selectedChat={selectedChat} thisUser={thisUser} />

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

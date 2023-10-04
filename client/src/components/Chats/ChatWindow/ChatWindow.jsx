// ChatWindow.jsx
import MessagesArea from "./MessagesArea";
import MessageInput from "./MessageInput";
import { Box, CircularProgress } from "@mui/material";
import ContactBar from "./ContactBar";
import useFetch from "../../../hooks/useFetch";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateMessages,
  addMessage,
} from "../../../redux/slices/messagesSlice";
import socket from "../../../socket/socketConfig";

const ChatWindow = () => {
  const dispatch = useDispatch();

  const thisUser = JSON.parse(sessionStorage.getItem("userInfo"));
  const selectedChat = useSelector((state) => state.selectedChat.selectedChat);
  //const [messages, setMessages] = useState([]); - moved to redux
  const messages = useSelector((state) => state.messages.messages);

  const [url, setUrl] = useState(null); //gets value from useEffect

  let { data, loading, error } = useFetch(url);

  useEffect(() => {
    if (data) {
      //setMessages(data);
      dispatch(updateMessages(data));
    }
  }, [data]);

  useEffect(() => {
    if (selectedChat && selectedChat._id) {
      console.log("selectedChat: ", selectedChat);
      const getMessagesApiRoute = `http://localhost:3000/messages/${selectedChat._id}`;
      setUrl(getMessagesApiRoute); //activate useFetch

      // Join chat
      socket.emit("join chat", selectedChat._id);
      //listen for incoming messages
      socket.on("message received", (newMessage) => {
        if (selectedChat._id === newMessage.chat._id) {
          dispatch(addMessage(newMessage));
        } else {
          //send notification about new message
        }
      });
      return () => {
        socket.off("message received");
      };
    }
  }, [selectedChat]);

  if (!selectedChat || !selectedChat.users) {
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

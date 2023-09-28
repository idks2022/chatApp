import MessagesArea from "./MessagesArea";
import MessageInput from "./MessageInput";
import { Box, AppBar, Toolbar } from "@mui/material";
import useFetch from "../../../hooks/useFetch";
import { useEffect, useState } from "react";

const ChatWindow = ({ selectedChat }) => {
  const thisUser = JSON.parse(sessionStorage.getItem("userInfo"));
  const [url, setUrl] = useState(null);
  let { data, loading, error } = useFetch(url);

  useEffect(() => {
    if (selectedChat) {
      const getMessagesApiRoute = `http://localhost:3000/messages/${selectedChat._id}`;
      setUrl(getMessagesApiRoute);
    }
  }, [selectedChat]);

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
        <MessagesArea messages={data} thisUser={thisUser} />
      </Box>

      {/* Message Input */}
      <Box sx={{ height: "50px" }}>
        <MessageInput />
      </Box>
    </Box>
  );
};

export default ChatWindow;

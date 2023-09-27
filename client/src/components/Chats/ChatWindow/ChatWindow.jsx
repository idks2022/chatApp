import MessagesArea from "./MessagesArea";
import MessageInput from "./MessageInput";
import { Box, AppBar, Toolbar } from "@mui/material";

const ChatWindow = ({ selectedChat }) => {
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
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
        }}
      >
        <MessagesArea />
      </Box>

      {/* Message Input */}
      <Box sx={{ height: "50px" }}>
        <MessageInput />
      </Box>
    </Box>
  );
};

export default ChatWindow;

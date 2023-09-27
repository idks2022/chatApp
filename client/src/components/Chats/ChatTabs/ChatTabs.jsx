import { Tabs, Tab, Container } from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ChatIcon from "@mui/icons-material/Chat";
import { useState } from "react";
import Users from "./Users";
import UserChats from "./UserChats";

const ChatTabs = ({ onChatSelect }) => {
  const [selection, setSelection] = useState("myChats");

  const handleChange = (event, newSelection) => {
    setSelection(newSelection);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* User App Menu */}
      <Container
        sx={{
          justifyItems: "center",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <h3>User App Menu</h3>
        <Tabs
          value={selection}
          onChange={handleChange}
          aria-label="icon label tabs example"
        >
          <Tab value="newChat" icon={<AddCommentIcon />} label="NEW CHAT" />
          <Tab value="myChats" icon={<ChatIcon />} label="MY CHATS" />
        </Tabs>
      </Container>

      {/* Chats / Users Tabs */}
      <Container sx={{ width: "100%", justifyContent: "space-between" }}>
        <div style={{ display: selection === "myChats" ? "block" : "none" }}>
          <UserChats onChatSelect={onChatSelect} />
        </div>
        <div style={{ display: selection === "newChat" ? "block" : "none" }}>
          <Users onChatSelect={onChatSelect} />
        </div>
      </Container>
    </div>
  );
};

export default ChatTabs;

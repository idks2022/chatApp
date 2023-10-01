import { Tabs, Tab, Container, Box, Divider } from "@mui/material";
import Person from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import { useState } from "react";
import Users from "./Users";
import UserChats from "./UserChats";
import SettingsBar from "./SettingsBar";
import React from "react";

const ChatTabs = ({ onChatSelect }) => {
  console.log("ChatTabs rendered");
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
        <Box>
          <SettingsBar />
        </Box>
        <Divider />
        <Tabs
          value={selection}
          onChange={handleChange}
          aria-label="icon label tabs example"
        >
          <Tab value="newChat" icon={<Person />} label="ALL USERS" />
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

export default React.memo(ChatTabs);

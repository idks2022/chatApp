import { Tabs, Tab, Container, Box, Divider } from "@mui/material";
import Person from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import React from "react";
import Users from "./Users";
import UserChats from "./UserChats";
import SettingsBar from "./SettingsBar";
import socket from "../../../socket/socketConfig";

const ChatTabs = () => {
  console.log("ChatTabs rendered", socket);
  const dispatch = useDispatch();

  const thisUser = JSON.parse(sessionStorage.getItem("userInfo"));
  const [selection, setSelection] = useState("myChats");

  //socket setup and cleanup
  useEffect(() => {
    if (!socket.connected) {
      console.log("socket setup");

      //Listen to socket connection
      socket.on("connect", () => {
        console.log("Client has connected with socket ID:", socket.id);
      });

      //emit setup even
      socket.emit("setup", thisUser);

      //listen to chat connected
      socket.on("chat connected", (chatId) => {
        console.log("Client has connected to chat ID:", chatId);
      });
    }
  }, [thisUser]);

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
          <UserChats />
        </div>
        <div style={{ display: selection === "newChat" ? "block" : "none" }}>
          <Users />
        </div>
      </Container>
    </div>
  );
};

export default React.memo(ChatTabs);

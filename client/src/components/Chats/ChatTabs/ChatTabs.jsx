import { Tabs, Tab, Container, Box, Divider } from "@mui/material";
import Person from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import Users from "./Users";
import UserChats from "./UserChats";
import SettingsBar from "./SettingsBar";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../../../redux/slices/notificationsSlice";
import { addMessage } from "../../../redux/slices/messagesSlice";
import socket from "../../../socket/socketConfig";

const ChatTabs = () => {
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.selectedChat.selectedChat);
  const thisUser = JSON.parse(sessionStorage.getItem("userInfo"));
  const [selection, setSelection] = useState("myChats");

  //socket setup and cleanup
  useEffect(() => {
    if (!socket.connected) {
      console.log("socket setup");
      socket.connect();

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

      //listen for incoming messages
      socket.on("message received", (newMessage) => {
        console.log("message received", newMessage);
        if (selectedChat._id === newMessage.chat._id) {
          dispatch(addMessage(newMessage));
        } else {
          dispatch(
            addNotification({ newMessage: newMessage, userId: thisUser._id })
          );
        }
      });
      return () => {
        socket.off("message received");
      };
    }
  }, [thisUser]);
  //on change of selected chat, listen for incoming messages
  useEffect(() => {
    if (selectedChat && selectedChat._id) {
      //clear any existing listeners
      socket.off("message received");
      //listen for incoming messages
      socket.on("message received", (newMessage) => {
        console.log("message received", newMessage);
        if (selectedChat._id === newMessage.chat._id) {
          dispatch(addMessage(newMessage));
        } else {
          dispatch(
            addNotification({ newMessage: newMessage, userId: thisUser._id })
          );
        }
      });
    }
  }, [selectedChat]);

  const handleChange = (event, newSelection) => {
    setSelection(newSelection);
  };

  return (
    <Box>
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
      <Container
        sx={{
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: selection === "myChats" ? "block" : "none" }}>
          <UserChats />
        </div>
        <div style={{ display: selection === "newChat" ? "block" : "none" }}>
          <Users />
        </div>
      </Container>
    </Box>
  );
};

export default React.memo(ChatTabs);

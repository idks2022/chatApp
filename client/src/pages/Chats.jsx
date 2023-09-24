import { Tabs, Tab, Container } from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ChatIcon from "@mui/icons-material/Chat";
import { useState } from "react";
import Users from "../components/Users";
import UserChats from "../components/UserChats";

const Chats = () => {
  const [selection, setSelection] = useState("myChats");

  const handleChange = (event, newSelection) => {
    setSelection(newSelection);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Container
        sx={{
          justifyItems: "center",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={selection}
          onChange={handleChange}
          aria-label="icon label tabs example"
        >
          <Tab value="newChat" icon={<AddCommentIcon />} label="NEW CHAT" />
          <Tab value="myChats" icon={<ChatIcon />} label="MY CHATS" />
        </Tabs>
      </Container>
      <Container sx={{ width: "100%" }}>
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

export default Chats;

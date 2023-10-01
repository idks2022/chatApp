import React from "react";
import { List, ListItem, Divider } from "@mui/material";
import useFetch from "../../../hooks/useFetch";
import UserChat from "./UserChat";
import UserSkeleton from "./UserSkeleton";

const chatsApiRoute = "http://localhost:3000/chats";
const thisUser = JSON.parse(sessionStorage.getItem("userInfo"));

const UserChats = ({ onChatSelect }) => {
  const { data: userChats, loading, error } = useFetch(chatsApiRoute);

  if (loading)
    return (
      <List>
        {[...Array(5)].map((_, index) => (
          <UserSkeleton key={index} />
        ))}
      </List>
    );

  if (error) return <p>Error: {error}</p>;

  return (
    <List>
      {userChats.map((chat) => {
        const otherUser = chat.users.find((user) => user._id !== thisUser._id);
        return (
          <React.Fragment key={chat._id}>
            <ListItem
              button
              sx={{ padding: 0, margin: 0 }}
              onClick={() => onChatSelect(chat)}
            >
              <UserChat chat={chat} otherUser={otherUser} />
            </ListItem>
            <Divider variant="startContent" component="li" />
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default UserChats;

import React from "react";
import { useDispatch } from "react-redux";
import { updateSelectedChat } from "../../../redux/slices/selectedChatSlice";
import { List, ListItem, Divider } from "@mui/material";
import useFetch from "../../../hooks/useFetch";
import UserChat from "./UserChat";
import UserSkeleton from "./UserSkeleton";

const chatsApiRoute = "http://localhost:3000/chats";

const UserChats = () => {
  const dispatch = useDispatch();
  const thisUser = JSON.parse(sessionStorage.getItem("userInfo"));
  const { data: userChats, loading, error } = useFetch(chatsApiRoute);

  const handleChatSelect = (chat) => {
    console.log("chat selected: ", chat);
    dispatch(updateSelectedChat(chat));
  };

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
              onClick={() => handleChatSelect(chat)}
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

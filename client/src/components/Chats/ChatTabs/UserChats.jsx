import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedChat } from "../../../redux/slices/selectedChatSlice";
import { List, ListItem, Divider, Badge } from "@mui/material";
import useFetch from "../../../hooks/useFetch";
import UserChat from "./UserChat";
import UserSkeleton from "./UserSkeleton";

const chatsApiRoute = "http://localhost:3000/chats";

const UserChats = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
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
    <List sx={{ padding: 0 }}>
      {userChats.map((chat) => {
        const otherUser = chat.users.find((user) => user._id !== thisUser._id);
        const chatNotification = notifications.find(
          (n) => n.chatId === chat._id
        );
        const unreadCount = chatNotification ? chatNotification.unreadCount : 0;
        return (
          <React.Fragment key={chat._id}>
            <ListItem
              button
              sx={{ paddingTop: 1, paddingBottom: 1 }}
              onClick={() => handleChatSelect(chat)}
            >
              <Badge
                badgeContent={unreadCount}
                color="success"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{ width: "100%" }}
              >
                <UserChat chat={chat} otherUser={otherUser} />
              </Badge>
            </ListItem>
            <Divider variant="startContent" component="li" />
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default UserChats;

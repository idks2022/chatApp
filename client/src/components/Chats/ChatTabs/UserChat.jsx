import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";

const UserChat = ({ chat, otherUser, latestMessageProp }) => {
  const [latestMessage, setLatestMessage] = useState(
    chat.latestMessage?.content || "no messages"
  );

  useEffect(() => {
    if (latestMessageProp) {
      setLatestMessage(latestMessageProp);
    }
  }, [latestMessageProp]);

  return (
    <ListItem sx={{ margin: 0, padding: 0 }}>
      <ListItemAvatar>
        <Avatar alt="Profile Picture" src={otherUser.pic} />
      </ListItemAvatar>
      <ListItemText
        primary={otherUser.name}
        secondary={latestMessage}
        sx={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          width: "100%",
        }}
      />
    </ListItem>
  );
};

export default UserChat;

import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";

const UserChat = ({ chat, otherUser }) => {
  return (
    <ListItem sx={{ margin: 0, padding: 0 }}>
      <ListItemAvatar>
        <Avatar alt="Profile Picture" src={otherUser.pic} />
      </ListItemAvatar>
      <ListItemText
        primary={otherUser.name}
        secondary={chat.latestMessage?.content || "no messages yet"}
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

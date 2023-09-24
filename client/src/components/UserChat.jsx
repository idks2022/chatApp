import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";

const UserChat = ({ chat, otherUser }) => {
  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar alt="Profile Picture" src={otherUser.pic} />
      </ListItemAvatar>
      <ListItemText
        primary={otherUser.name}
        secondary={chat.latestMessage || "Last message..."}
      />
    </ListItem>
  );
};

export default UserChat;

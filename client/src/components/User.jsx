import { ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";

const User = ({ user }) => {
  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar alt="Profile Picture" src={user.pic} />
      </ListItemAvatar>
      <ListItemText primary={user.name} secondary={user.email} />
    </ListItem>
  );
};

export default User;

import { AppBar, Toolbar, Avatar, IconButton } from "@mui/material";

const ContactBar = ({ selectedChat, thisUser }) => {
  const contact = selectedChat?.users.find((user) => user._id !== thisUser._id);
  const chatName = selectedChat.isGroupChat ? selectedChat.name : contact?.name;

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <span>{chatName}</span>
        <IconButton sx={{ ml: "auto", p: 0 }}>
          <Avatar alt="Contact Pic" src={contact?.pic} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default ContactBar;

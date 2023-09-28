import { Avatar, Box, Typography } from "@mui/material";

const Message = ({ message, thisUser }) => {
  const isCurrentUser = message?.sender._id === thisUser?._id;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        marginBottom: 2,
        flexDirection: isCurrentUser ? "row-reverse" : "row", // reverse the direction for the current user's messages
      }}
    >
      <Avatar
        alt={message.sender.name}
        src={message.sender.pic}
        sx={{
          marginLeft: isCurrentUser ? 1 : 0,
          marginRight: isCurrentUser ? 0 : 1,
        }}
      />
      <Box
        sx={{
          padding: "0.5em 1em",
          borderRadius: "0.5em",
          background: isCurrentUser ? "#DCF8C6" : "#f5f5f5",
          maxWidth: "80%",
          wordWrap: "break-word",
        }}
      >
        <Typography variant="body1">{message.content}</Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{
            display: "block",
            textAlign: isCurrentUser ? "left" : "right",
            marginTop: 0.5,
          }}
        >
          {message.createdAt}{" "}
          {/* You might want to format this time properly */}
        </Typography>
      </Box>
    </Box>
  );
};

export default Message;

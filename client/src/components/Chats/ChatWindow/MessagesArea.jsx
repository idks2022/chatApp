import Message from "./Message";
import { Box } from "@mui/material";

const MessagesArea = ({ messages, thisUser }) => {
  console.log("messages", messages);
  return (
    <Box sx={{ width: "100%" }}>
      {messages &&
        messages.map((message, index) => (
          <Message key={index} message={message} thisUser={thisUser} />
        ))}
    </Box>
  );
};
export default MessagesArea;
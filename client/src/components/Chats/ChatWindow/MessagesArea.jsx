import React, { useRef, useEffect } from "react";
import Message from "./Message";
import { Box } from "@mui/material";

const MessagesArea = ({ messages, thisUser }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Box sx={{ width: "100%" }}>
      {messages &&
        messages.map((message, index) => (
          <Message key={index} message={message} thisUser={thisUser} />
        ))}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default MessagesArea;

//MessageInput.jsx
import { Grid, TextField, Button, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import useSendMsg from "../../../hooks/useSendMsg";

const MessageInput = ({ chatId }) => {
  const [message, setMessage] = useState("");
  const { sendMessage, loading, error } = useSendMsg();

  const handleSubmit = async () => {
    const requestBody = {
      chatId: chatId,
      content: message,
    };

    await sendMessage(requestBody);
    if (error) {
      console.log(error);
      return;
    }
    setMessage("");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        direction="row"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Grid item xs={10}>
          <TextField
            fullWidth
            size="small"
            color="primary"
            variant="outlined"
            placeholder="Type a message..."
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </Grid>

        <Grid item xs={2}>
          <Button
            fullWidth
            size="small"
            variant="contained"
            endIcon={<SendIcon />}
            style={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              height: "40px",
            }}
            disabled={loading || !message}
            onClick={handleSubmit}
          ></Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MessageInput;

import { useState } from "react";
import axios from "axios";

const useSendMsg = () => {
  const messageApiRoute = "http://localhost:3000/messages/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (chatId, msgContent) => {
    const { accessToken } = JSON.parse(sessionStorage.getItem("userInfo"));
    setLoading(true);
    try {
      const { data: sentMsg } = await axios.post(
        messageApiRoute,
        {
          content: msgContent,
          chatId: chatId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("message:", sentMsg);
      setLoading(false);
      setError("");
      return sentMsg;
    } catch (error) {
      console.log("Error sending message:", error);
      setError(error.message);
      setLoading(false);
    }
  };
  return { sendMessage, loading, error };
};

export default useSendMsg;

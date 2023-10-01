import { useState } from "react";
import axios from "axios";

const useSendMsg = () => {
  const messageApiRoute = "http://localhost:3000/messages/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (requestBody) => {
    const { accessToken } = JSON.parse(sessionStorage.getItem("userInfo"));
    setLoading(true);
    try {
      const { data: sentMsg } = await axios.post(messageApiRoute, requestBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
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

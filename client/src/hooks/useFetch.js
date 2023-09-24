import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { accessToken } = JSON.parse(sessionStorage.getItem("userInfo"));

    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setData(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;

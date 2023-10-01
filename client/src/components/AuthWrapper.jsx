import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthWrapper({ children }) {
  let userInfo = sessionStorage.getItem("userInfo");
  let accessToken = userInfo ? JSON.parse(userInfo).accessToken : null;
  let navigate = useNavigate();

  useEffect(() => {
    if (accessToken === null) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  return children;
}

export default AuthWrapper;

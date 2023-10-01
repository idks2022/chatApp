import { useState } from "react";
import SignIn from "../components/Homepage/SignIn";
import SignUp from "../components/Homepage/SignUp";
import { ButtonGroup, Button, Box } from "@mui/material";

const Homepage = () => {
  const [selection, setSelection] = useState("signIn");

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      maxHeight="100vh"
    >
      <h3>Welcome to Chat App!</h3>
      <ButtonGroup variant="text" aria-label="text button group">
        <Button onClick={() => setSelection("signIn")}>Sign In</Button>
        <Button onClick={() => setSelection("signUp")}>Sign Up</Button>
      </ButtonGroup>
      {selection === "signIn" ? <SignIn /> : <SignUp />}
    </Box>
  );
};

export default Homepage;

import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CssBaseline, Drawer, Fab } from "@mui/material";
import ContactsIcon from "@mui/icons-material/Contacts";

import ChatTabs from "../components/Chats/ChatTabs/ChatTabs";
import ChatWindow from "../components/Chats/ChatWindow/ChatWindow";

const drawerWidth = 260;

function Chats(props) {
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  //const [selectedChat, setSelectedChat] = useState(); //receives the selected chat object - replaced by redux
  const [hasCheckedSession, setHasCheckedSession] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const thisUser = JSON.parse(sessionStorage.getItem("userInfo"));
    if (!thisUser) {
      navigate("/");
      return;
    }
    setHasCheckedSession(true);
  }, [navigate]);

  if (!hasCheckedSession) {
    return null; // or <LoadingComponent />
  }

  const drawer = (
    <div>
      <ChatTabs />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />

      {/* Chats Tabs */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="Chat Tabs"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Chat Window */}
      <Box
        component="main"
        sx={{
          flexGrow: 0,
          width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
          height: "100vh",
          overflow: "hidden", // to ensure it's non-scrollable
        }}
      >
        <ChatWindow />

        <Fab
          color="primary"
          aria-label="toggle"
          sx={{
            position: "absolute",
            top: 65,
            right: 8,
            display: { sm: "none" },
          }}
          onClick={handleDrawerToggle}
        >
          <ContactsIcon />
        </Fab>
      </Box>
    </Box>
  );
}

export default Chats;

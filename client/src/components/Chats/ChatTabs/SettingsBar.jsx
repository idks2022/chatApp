import axios from "axios";
import { useState } from "react";
import {
  Box,
  IconButton,
  Modal,
  Typography,
  TextField,
  Button,
  Avatar,
  Badge,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const avatars = [
  "https://icon-library.com/images/22215-dog.ico.ico",
  "https://icon-library.com/images/22224-tiger-icon_5825.png",
  "https://icon-library.com/images/lion-595b40b75ba036ed117d858a.svg.svg",
  "https://icon-library.com/images/194204.svg.svg",
  "https://icon-library.com/images/141782.svg.svg",
  "https://icon-library.com/images/305330.svg.svg",
  "https://icon-library.com/images/2018/1777242_sweet-sweet-potato-transparent-png.png",
  "https://icon-library.com/images/2018/10657768_baked-potato-cartoon-potato-clip-art-hd-png.png",
];

const userApiRoute = "http://localhost:3000/users/";

const SettingsBar = () => {
  const thisUser = JSON.parse(sessionStorage.getItem("userInfo"));
  const [openSettings, setOpenSettings] = useState(false);
  const [updatedName, setUpdatedName] = useState(thisUser.name || "");
  const [updatedPic, setUpdatedPic] = useState(thisUser.pic || "");

  const handleOpen = () => setOpenSettings(true);
  const handleClose = () => setOpenSettings(false);

  const handleAvatarSelect = (avatarURL) => {
    setUpdatedPic(avatarURL);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { accessToken } = JSON.parse(sessionStorage.getItem("userInfo"));
    const updatedUser = {
      id: thisUser._id,
      changes: {
        name: updatedName ? updatedName : thisUser.name,
        pic: updatedPic ? updatedPic : thisUser.pic,
      },
    };

    try {
      const result = await axios.patch(userApiRoute, updatedUser, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (result.status === 200) {
        console.log(result.data);
        handleClose();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogOut = () => {
    sessionStorage.removeItem("userInfo");
    window.location.href = "/";
  };

  if (!thisUser) return;

  return (
    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
      <IconButton onClick={handleLogOut}>
        <LogoutIcon />
      </IconButton>
      <IconButton onClick={handleOpen}>
        <SettingsIcon />
      </IconButton>
      <IconButton>
        <Badge badgeContent={2} color="error">
          <NotificationsNoneIcon />
        </Badge>
      </IconButton>

      <Modal
        open={openSettings}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update User {thisUser.email}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
            >
              <Avatar
                alt={thisUser.name}
                src={updatedPic}
                sx={{ width: 60, height: 60, marginRight: 1 }}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Name"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                marginBottom: 2,
              }}
            >
              {avatars.map((avatar, index) => (
                <Avatar
                  key={index}
                  alt="avatar-option"
                  src={avatar}
                  onClick={() => handleAvatarSelect(avatar)}
                  sx={{
                    width: 60,
                    height: 60,
                    cursor: "pointer",
                    marginRight: 2,
                  }}
                />
              ))}
            </Box>

            <Button
              sx={{ margin: "0 35%" }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Update
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default SettingsBar;

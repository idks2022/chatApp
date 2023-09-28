import axios from "axios";
import { List, ListItem, Divider } from "@mui/material";
import useFetch from "../../../hooks/useFetch";
import User from "./User";
import UserSkeleton from "./UserSkeleton";

const Users = ({ onChatSelect }) => {
  const usersApiRoute = "http://localhost:3000/users";
  const { data: users, loading, error } = useFetch(usersApiRoute);

  const handleUserSelection = async (userId) => {
    const { accessToken } = JSON.parse(sessionStorage.getItem("userInfo"));
    const chatApiRoute = "http://localhost:3000/chats";
    try {
      const { data: chat } = await axios.post(
        chatApiRoute,
        { userId: userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(chat);
      onChatSelect(chat);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading)
    return (
      <List>
        {[...Array(5)].map((_, index) => (
          <UserSkeleton key={index} />
        ))}
      </List>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <List>
      {users.map((user) => {
        return (
          <>
            <ListItem
              button
              key={user._id}
              sx={{ padding: 0, margin: 0 }}
              onClick={() => handleUserSelection(user._id)}
            >
              <User key={user._id} user={user} />
            </ListItem>
            <Divider variant="fullwidth" component="li" />
          </>
        );
      })}
    </List>
  );
};
export default Users;

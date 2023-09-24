import { List } from "@mui/material";
import useFetch from "../hooks/useFetch";
import UserChat from "./UserChat";
import UserSkeleton from "./UserSkeleton";

const UserChats = () => {
  const apiRoute = "http://localhost:3000/chats";
  const { data: userChats, loading, error } = useFetch(apiRoute);
  const thisUser = JSON.parse(sessionStorage.getItem("userInfo"));

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
      {userChats.map((chat) => {
        const otherUser = chat.users.find((user) => user._id !== thisUser._id);
        return <UserChat key={chat._id} chat={chat} otherUser={otherUser} />;
      })}
    </List>
  );
};

export default UserChats;

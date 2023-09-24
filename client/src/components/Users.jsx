import { List } from "@mui/material";
import useFetch from "../hooks/useFetch";
import User from "./User";
import UserSkeleton from "./UserSkeleton";

const Users = () => {
  const apiRoute = "http://localhost:3000/users";
  const { data: users, loading, error } = useFetch(apiRoute);

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
        return <User key={user._id} user={user} />;
      })}
    </List>
  );
};
export default Users;

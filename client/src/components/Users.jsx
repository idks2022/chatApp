import useFetch from "../hooks/useFetch";

const Users = () => {
  const apiRoute = "http://localhost:3000/users";
  const { data: users, loading, error } = useFetch(apiRoute);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {users.map((user) => {
        return (
          <div key={user._id}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <button>Start Chat</button>
          </div>
        );
      })}
    </div>
  );
};
export { Users };

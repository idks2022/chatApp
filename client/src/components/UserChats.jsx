import useFetch from "../hooks/useFetch";

const UserChats = () => {
  const apiRoute = "http://localhost:3000/chats";
  const { data: userChats, loading, error } = useFetch(apiRoute);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {userChats.map((chat) => {
        return (
          <div key={chat._id}>
            <h3>{chat.chatName}</h3>
            <p>latest message...</p>
          </div>
        );
      })}
    </div>
  );
};

export { UserChats };

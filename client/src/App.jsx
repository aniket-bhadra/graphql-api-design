import { useQuery } from "@apollo/client";
import React from "react";
import { getUsers } from "./graphql/query/query";

const App = () => {
  const { loading, data, error } = useQuery(getUsers);
  console.log(data);

  if (error) return <h1>something went wrong</h1>;
  return (
    <>
      {loading ? (
        <p>Loading.....</p>
      ) : (
        <div>
          {data.users.map((user) => (
            <p key={user._id}>{user.name}</p>
          ))}
        </div>
      )}
    </>
  );
};

export default App;

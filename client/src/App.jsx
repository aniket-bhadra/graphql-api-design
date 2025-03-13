import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import React from "react";
import { getUsers } from "./graphql/query/query";

const App = () => {
  // const { loading, data, error } = useQuery(getUsers);

  const [trigger, { loading, error, data }] = useLazyQuery(getUsers);
  // console.log(data);

  if (error) return <h1>something went wrong</h1>;
  return (
    <>
    <button onClick={()=>trigger()}>show users</button>
      {loading ? (
        <p>Loading.....</p>
      ) : (
        <div>
          {data?.users.map((user) => (
            <p key={user._id}>{user.name}</p>
          ))}
        </div>
      )}
    </>
  );
};

export default App;

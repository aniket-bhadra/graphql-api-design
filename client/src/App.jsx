import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { getUsers, addUser } from "./graphql/query/query";

const App = () => {
  const { loading, data, error } = useQuery(getUsers);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // const [trigger, { loading, error, data }] = useLazyQuery(getUsers);
  // console.log(data);
  const [add, { data: newUser }] = useMutation(addUser);
  console.log("newUser ", newUser);
  console.log("all userData ", data);

  const submitHandler = (e) => {
    e.preventDefault();
    add({
      variables: {
        name,
        email,
      },
    });
    // console.log(newUser)
  };

  if (error) return <h1>something went wrong</h1>;
  return (
    <>
      {/* <button onClick={() => trigger()}>show users</button> */}
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">add users</button>
      </form>
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

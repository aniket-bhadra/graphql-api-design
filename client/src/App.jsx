import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
} from "./graphql/query/graphql";

const App = () => {
  const { loading, data, error, refetch } = useQuery(getUsers);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showUpdateInput, setShowUpdateInput] = useState(false);
  const [currentUpdate, setCurrentUpdate] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");

  // const [trigger, { loading, error, data }] = useLazyQuery(getUsers);
  // console.log(data);
  const [add, { data: newUser }] = useMutation(addUser, {
    refetchQueries: [{ query: getUsers }],
  });
  const [deleteUserMutation, { data: deletedText }] = useMutation(deleteUser, 
  //   {
  //   // refetchQueries: [{ query: getUsers }],
  //   update(cache, { data: { deleteUser } }) {
  //     const { users } = cache.readQuery({
  //       query: getUsers,
  //     });
  //     cache.writeQuery({
  //       query: getUsers,
  //       data: {
  //         users: users?.filter((user) => user._id !== deleteUser._id),
  //       },
  //     });
  //   },
  // }
);
  const [updateUserMutation, { data: newUpdatedUser }] = useMutation(
    updateUser,
    // {
    //   // onCompleted: () => refetch(),
    //   refetchQueries: [{ query: getUsers }],
    // }
  );

  console.log("newUser ", newUser);
  console.log("all userData ", data);
  console.log("updated user ", newUpdatedUser);

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
  const deleteHandler = (id) => {
    deleteUserMutation({
      variables: {
        ids : id,
      },
    });
  };
  console.log(deletedText);

  const saveHandler = (id) => {
    updateUserMutation({
      variables: {
        id,
        updatedValue: {
          name: updateName,
          email: updateEmail,
        },
      },
    });
  };

  if (error) return <h1>something went wrong</h1>;
  return (
    <>
      {/* <button onClick={() => trigger()}>show users</button> */}
      {/* {deletedText?.deleteUser && <h3>{deletedText.deleteUser}</h3>} */}
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
            <div key={user._id} style={{ display: "flex" }}>
              <p>{user.name}</p>
              <button
                onClick={() => {
                  setShowUpdateInput((prevState) => !prevState);
                  setCurrentUpdate(user._id);
                  setUpdateEmail(user.email);
                  setUpdateName(user.name);
                }}
              >
                update
              </button>
              <button onClick={() => saveHandler(user._id)}>save</button>
              {showUpdateInput && user._id === currentUpdate && (
                <>
                  <input
                    type="text"
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                  />
                  <input
                    type="email"
                    value={updateEmail}
                    onChange={(e) => setUpdateEmail(e.target.value)}
                  />
                </>
              )}
              <button onClick={() => deleteHandler(user._id)}>X</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default App;

import React, { useState } from "react";
import Users from "./components/users";
import api from "./api";
import SearchStatus from "./components/searchStatus";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  let length = users.length;
  let newUsers = users;
  const [count, setCount] = useState(0);
  const handleDelete = (userId) => {
    newUsers = users.filter((user) => {
      return user._id !== userId;
    });
    setUsers(newUsers);
  };

  const favouritesStatus = (userId) => {
    let number = newUsers.findIndex((user) => {
      return user._id === userId;
    });
    let newcount = 0;
    if (newUsers[number]?.status) {
      delete newUsers[number].status;
      newcount = count + 1;
      setCount(newcount);
    } else {
      newUsers[number].status = true;
      newcount = count - 1;
      setCount(newcount);
    }
    setUsers(newUsers);
  };

  return (
    <div>
      {SearchStatus(length)}
      <Users
        users={newUsers}
        handleDelete={handleDelete}
        favouritesStatus={favouritesStatus}
      />
    </div>
  );
};

export default App;

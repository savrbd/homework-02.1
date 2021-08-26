import React, { useState } from "react";
import api from "../api";
const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (user) => {
    setUsers(
      users.filter((name) => {
        return name !== user;
      })
    );
  };

  const renderPhrase = () => {
    let number = users.length;
    if (number === 0) {
      return (
        <h1 className="badge bg-danger" style={{ fontSize: "20px" }}>
          Никто с тобою не тусанет
        </h1>
      );
    } else if (number <= 4 && number >= 2) {
      return (
        <h1 className="badge bg-primary" style={{ fontSize: "20px" }}>
          {number} человека тусанут с тобою сегодня
        </h1>
      );
    } else {
      return (
        <h1 className="badge bg-primary" style={{ fontSize: "20px" }}>
          {number} человек тусанет с тобою сегодня
        </h1>
      );
    }
  };

  return (
    <>
      {renderPhrase()}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качество</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>
                {user.qualities.map((quality) => {
                  let classes = `badge bg-${quality.color} m-1`;
                  return (
                    <span className={classes} key={quality._id}>
                      {quality.name}
                    </span>
                  );
                })}
              </td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>
              <td>{user.rate}</td>
              <td>
                <button
                  onClick={() => handleDelete(user)}
                  className="badge bg-danger"
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;

import React from "react";
import User from "./user";

const Users = (props) => {
 

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качество</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th ></th>
          </tr>
        </thead>
        <tbody>
          {props.users.map((user) => (
            <User 
            key={user._id} 
            onDelete={props.handleDelete} 
            favouritesStatus={props.favouritesStatus}
            {...user} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;

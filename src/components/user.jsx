import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";

const User = (props) => { 
  return (
    <>
      <tr key={props._id}>
        <td>{props.name}</td>
        <td>
          {props.qualities.map((quality) => (
            <Qualitie key={quality._id} {...quality} />
          ))}
        </td>
        <td>{props.profession.name}</td>
        <td>{props.completedMeetings}</td>
        <td>{props.rate}</td>
        <td>
          <Bookmark
          id={props._id}
          status={props.status}
          favouritesStatus={props.favouritesStatus}
          />
        </td>
        <td>
          <button
            className="badge bg-danger"
            onClick={() => {
              props.onDelete(props._id);
            }}
          >
            delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default User;

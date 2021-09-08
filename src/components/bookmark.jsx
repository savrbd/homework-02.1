import React from "react";
const Bookmark = (props) => {
  let classes = "";
  if (props.status) {
    classes = "bi bi-bookmark-fill";
  } else {
    classes = "bi bi-bookmark";
  }

  return (
    <button onClick={() => props.favouritesStatus(props.id)}>
      <i className={classes}></i>
    </button>
  );
};

export default Bookmark;

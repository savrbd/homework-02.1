import React from "react";
import PropTypes from "prop-types";
const Bookmark = ({ status, favouritesStatus, id }) => {
    let classes = "";
    if (status) {
        classes = "bi bi-bookmark-fill";
    } else {
        classes = "bi bi-bookmark";
    }

    return (
        <button onClick={() => favouritesStatus(id)}>
            <i className={classes}></i>
        </button>
    );
};
Bookmark.propTypes = {
    status: PropTypes.bool,
    favouritesStatus: PropTypes.func,
    id: PropTypes.string.isRequired
};
export default Bookmark;

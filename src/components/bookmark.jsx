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
    status: PropTypes.bool.isRequired,
    favouritesStatus: PropTypes.func.isRequired,
    id: PropTypes.symbol.isRequired
};
export default Bookmark;

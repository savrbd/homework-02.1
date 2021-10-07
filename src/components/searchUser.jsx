import React from "react";
import PropTypes from "prop-types";
const SearchUser = ({ value, onChange }) => {
    return (
        <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            value={value}
            onChange={onChange}
        ></input>
    );
};
SearchUser.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default SearchUser;

import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ color, name, id }) => {
    const classes = `badge bg-${color} m-1`;
    return (
        <span className={classes} key={id}>
            {name}
        </span>
    );
};
Qualitie.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.symbol.isRequired
};

export default Qualitie;

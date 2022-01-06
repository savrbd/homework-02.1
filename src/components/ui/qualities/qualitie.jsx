import React from "react";
import PropTypes from "prop-types";
// import { useQualities } from "../../../hooks/useQualities";

const Qualitie = ({ qualityId }) => {
    // const { getQualities } = useQualities();
    // let quality = {};
    // if (getQualities(qualityId)) {
    //     quality = getQualities(qualityId);
    // }
    if (qualityId) {
        const classes = `badge bg-${qualityId.color} m-1`;
        return (
            <span className={classes} key={qualityId._id}>
                {qualityId.name}
            </span>
        );
    } else {
        return null;
    }
};
Qualitie.propTypes = {
    // qualityId: PropTypes.object.isRequired,
    qualityId: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ])
};

export default Qualitie;

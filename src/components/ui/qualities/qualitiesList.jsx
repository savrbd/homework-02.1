import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";

const QualitiesList = ({ qualities }) => {
    if (qualities && qualities[0]) {
        return (
            <>
                {qualities.map((quality) => (
                    <Qualitie key={quality._id} qualityId={quality} />
                ))}
            </>
        );
    } else {
        return null;
    }
};
QualitiesList.propTypes = {
    qualities: PropTypes.array
};
export default QualitiesList;

import { useQualities } from "../../hooks/useQualities";
import PropTypes from "prop-types";
import React from "react";
import QualitiesList from "./qualities/qualitiesList";

const Qualities2 = ({ ArrayId }) => {
    const { isLoading, getQualities } = useQualities();
    const prof = ArrayId.map((q) => {
        return getQualities(q);
    });
    if (!isLoading) {
        return <p><QualitiesList qualities={prof}/></p>;
    } else return "loading...";
};
Qualities2.propTypes = {
    ArrayId: PropTypes.array
};

export default Qualities2;

import { useProfessions } from "../../hooks/useProfession";
import PropTypes from "prop-types";
import React from "react";

const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfessions();
    const prof = getProfession(id);
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else return "loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;

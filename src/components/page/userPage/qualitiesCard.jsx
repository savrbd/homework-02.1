import React from "react";
import PropTypes from "prop-types";
import QualitiesList from "../../ui/qualities/qualitiesList";
import { useQualities } from "../../../hooks/useQualities";
const QualitiesCard = ({ user }) => {
    const { getQualities } = useQualities();
    const qualities = user.qualities.map((q) => {
        return getQualities(q);
    });
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Qualities</span>
                </h5>
                <p className="card-text">
                    <QualitiesList qualities={qualities} />
                </p>
            </div>
        </div>
    );
};
QualitiesCard.propTypes = {
    user: PropTypes.object.isRequired
};

export default QualitiesCard;

import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = ({ id, name, qualities, profession, completedMeetings, rate, _id, status, favouritesStatus, onDelete }) => {
    return (
        <>
            <tr key={id}>
                <td>{name}</td>
                <td>
                    {qualities.map((quality) => (
                        <Qualitie key={quality._id} {...quality} />
                    ))}
                </td>
                <td>{profession.name}</td>
                <td>{completedMeetings}</td>
                <td>{rate}</td>
                <td>
                    <Bookmark
                        id={_id}
                        status={status}
                        favouritesStatus={favouritesStatus}
                    />
                </td>
                <td>
                    <button
                        className="badge bg-danger"
                        onClick={() => {
                            onDelete(_id);
                        }}
                    >
                        delete
                    </button>
                </td>
            </tr>
        </>
    );
};
User.propTypes = {
    id: PropTypes.symbol.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.object.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.func.isRequired,
    rate: PropTypes.number.isRequired,
    _id: PropTypes.symbol.isRequired,
    status: PropTypes.bool.isRequired,
    favouritesStatus: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default User;

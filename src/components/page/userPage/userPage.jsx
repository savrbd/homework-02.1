import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import QualitiesList from "../../ui/qualities/qualitiesList";
import { Link } from "react-router-dom";

const UsersListPage = ({ match }) => {
    const userId = match.params.userId;
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <p>completedMeetings: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}</h2>
                <Link to={`/users/${userId}/edit`}>
                    <button>Изменить </button>
                </Link>
            </>
        );
    } else {
        return <a>Loading</a>;
    }
};
UsersListPage.propTypes = {
    match: PropTypes.object.isRequired
};

export default UsersListPage;

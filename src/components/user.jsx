import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";
import QualitiesList from "./qualitiesList";
import { Link } from "react-router-dom";

const User = ({ match }) => {
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
                <Link to="/users">
                    <button>Все пользователи </button>
                </Link>
            </>
        );
    } else {
        return <a>Loading</a>;
    }
};
User.propTypes = {
    match: PropTypes.object.isRequired
};

export default User;

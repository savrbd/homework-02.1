import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import UserCard from "./userCard";
import QualitiesCard from "./qualitiesCard";
import MeetingsCard from "./meetingsCard";
import CommentListComponent from "./commentsListComponent";

const UsersListPage = ({ match }) => {
    const userId = match.params.userId;
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    if (user) {
        return (
            <>
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <UserCard user={user} />
                            <QualitiesCard user={user} />
                            <MeetingsCard user={user} />
                        </div>
                        <div className="col-md-8">
                            <CommentListComponent users={users}/>
                        </div>
                        ;
                    </div>
                </div>
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

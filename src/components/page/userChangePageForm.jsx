import React from "react";
import UserChangePage from "./userChangePage";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const UserChangePageForm = ({ match }) => {
    return (
        <div className="container">
            <div className="row gutters-sm">
                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                    <Link to={`/users/${match.params.userId}`}>
                        <button
                            type="button"
                            className="btn btn-primary start-0 "
                        >
                            Назад
                        </button>
                    </Link>
                </div>
                <div className="row">
                    <UserChangePage match={match} />
                </div>
            </div>
        </div>
    );
};
UserChangePageForm.propTypes = {
    match: PropTypes.object.isRequired
};
export default UserChangePageForm;

import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
// import Qualities from "./qualities";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Profession from "./profession";
import Qualities2 from "./qualities2";

const UserTable = ({
    users,
    onSort,
    selectedSort,
    favouritesStatus,
    handleDelete
}) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Качество",
            component: (user) => <Qualities2 ArrayId={user.qualities} />
        },
        professions: {
            name: "Профессия",
            component: (user) => <Profession id={user.profession} />
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    id={user._id}
                    status={user.status}
                    favouritesStatus={favouritesStatus}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    className="badge bg-danger"
                    onClick={() => {
                        handleDelete(user._id);
                    }}
                >
                    delete
                </button>
            )
        }
    };

    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    handleDelete: PropTypes.func,
    favouritesStatus: PropTypes.func,
    onSort: PropTypes.func,
    selectedSort: PropTypes.object.isRequired
};
export default UserTable;

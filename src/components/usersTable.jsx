import React from "react";
import PropTypes from "prop-types";
// import User from "./user";
// import TableHeader from "./tableHeader";
// import TableBody from "./tableBody";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UserTable = ({
    users,
    onSort,
    selectedSort,
    favouritesStatus,
    handleDelete
}) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качество",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        professions: { path: "profession.name", name: "Профессия" },
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

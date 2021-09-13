import React, { useState, useEffect } from "react";
import User from "./user";
import api from "../api";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";

const Users = ({ allUsers, handleDelete, favouritesStatus }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProffesion] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 4;

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProffesion(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionsSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const filteredUsers = selectedProf
        ? allUsers.filter((user) => user.profession.name === selectedProf.name)
        : allUsers;

    let count = 0;
    if (filteredUsers) {
        count = filteredUsers.length;
    }
    const users = paginate(filteredUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };
    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionsSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                {SearchStatus(count)}
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качество</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <User
                                key={user._id}
                                onDelete={handleDelete}
                                favouritesStatus={favouritesStatus}
                                {...user}
                            />
                        ))}
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};
Users.propTypes = {
    allUsers: PropTypes.array,
    handleDelete: PropTypes.func.isRequired,
    favouritesStatus: PropTypes.func.isRequired
};

export default Users;

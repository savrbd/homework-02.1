import React, { useState, useEffect } from "react";
import UserTable from "../../ui/usersTable";
import api from "../../../api";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import _ from "lodash";
import SearchUser from "../../searchUser";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProffesion] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 8;
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    let newUsers = users;
    let foundUser = "";
    const handleDelete = (userId) => {
        newUsers = users.filter((user) => {
            return user._id !== userId;
        });
        setUsers(newUsers);
    };

    const favouritesStatus = (Id) => {
        setUsers(
            newUsers.filter((user) => {
                if (user._id === Id) {
                    user.status = !user.status;
                    return user;
                }
                return user;
            })
        );
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProffesion(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionsSelect = (item) => {
        setSelectedProf(item);
        setSearch("");
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleChange = (e) => {
        setSearch(e.target.value.toLowerCase());
    };
    const clearFilter = () => {
        setSelectedProf();
    };

    if (search !== "") {
        foundUser = newUsers.filter((user) =>
            user.name.toLowerCase().includes(search)
        );
        if (selectedProf) {
            setSelectedProf();
        }
    }

    if (newUsers) {
        const filteredUsers = selectedProf
            ? newUsers.filter(
                (user) =>
                    JSON.stringify(user.profession) ===
                    JSON.stringify(selectedProf)
            )
            : newUsers;

        const count = search === "" ? filteredUsers.length : foundUser.length;

        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
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
                    <SearchUser value={search} onChange={handleChange} />
                    <UserTable
                        users={search === "" ? usersCrop : foundUser}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        handleDelete={handleDelete}
                        favouritesStatus={favouritesStatus}
                    />
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
    }
    return "loading...";
};
UsersListPage.propTypes = {
    users: PropTypes.array,
    handleDelete: PropTypes.func,
    favouritesStatus: PropTypes.func
};

export default UsersListPage;

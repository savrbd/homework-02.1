import React, { useState } from "react";
import Users from "./components/users";
import api from "./api";
import SearchStatus from "./components/searchStatus";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const length = users.length;
    let newUsers = users;
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

    return (
        <div>
            {SearchStatus(length)}
            <Users
                users={newUsers}
                handleDelete={handleDelete}
                favouritesStatus={favouritesStatus}
            />
        </div>
    );
};

export default App;

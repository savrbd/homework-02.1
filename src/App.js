import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api";

const App = () => {
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
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
            <Users
                allUsers={newUsers}
                handleDelete={handleDelete}
                favouritesStatus={favouritesStatus}
            />
        </div>
    );
};

export default App;

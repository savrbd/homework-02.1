import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import userService from "../services/user.service";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        getUsers();
    }, []);
    async function getUsers() {
        try {
            const { content } = await userService.get();
            setUsers(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    function errorCatcher() {
        // const { message } = error.response.data;
        // setError(message);
        // setLoading(false);
    }
    function getUserById(userId) {
        return users.find((u) => u._id === userId);
    }
    return (
        <UserContext.Provider value={{ users, getUserById }}>
            {!isLoading ? children : "loading..."}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UserProvider;

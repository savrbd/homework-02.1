import React from "react";
import NavBar from "./components/ui/navBar";
import UsersListPage from "./components/page/usersListPage";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import UserPage from "./components/page/userPage";
import NotFound from "./components/not-found";
import UserChangePage from "./components/page/userChangePage";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/login/:type?" component={Login} />
                <Route
                    path="/users/:userId/edit"
                    render={(props) => <UserChangePage {...props} />}
                />
                <Route
                    path="/users/:userId"
                    render={(props) => <UserPage {...props} />}
                />
                <Route path="/users" component={UsersListPage} />
                <Route path="/" component={Main} />
                <Route path="/404" component={NotFound} />
                <Redirect to="/404" />
            </Switch>
        </>
    );
};

export default App;

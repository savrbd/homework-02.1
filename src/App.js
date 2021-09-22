import React from "react";
import NavBar from "./components/navBar";
import Users from "./components/users";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import User from "./components/user";
import NotFound from "./components/not-found";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/login" component={Login} />
                <Route
                    path="/users/:userId"
                    render={(props) => <User {...props} />}
                />
                <Route path="/users" component={Users} />
                <Route path="/" component={Main} />
                <Route path="/404" component={NotFound} />
                <Redirect to="/404" />
            </Switch>
        </>
    );
};

export default App;

import React from "react";
import NavBar from "./components/ui/navBar";
import UsersListPage from "./components/page/usersListPage";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import UserPage from "./components/page/userPage";
import NotFound from "./components/not-found";
import UserChangePageForm from "./components/page/userChangePageForm";
import UserProvider from "./hooks/useUsers";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";
const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <ProfessionProvider>
                    <QualitiesProvider>
                        <Route path="/login/:type?" component={Login} />
                        <UserProvider>
                            <Route
                                path="/users/:userId/edit"
                                render={(props) => <UserChangePageForm {...props} />}
                            />
                            <Route
                                path="/users/:userId"
                                render={(props) => <UserPage {...props} />}
                            />
                            <Route path="/users" component={UsersListPage} />
                        </UserProvider>
                    </QualitiesProvider>
                </ProfessionProvider>
                <Route path="/" component={Main} />
                <Route path="/404" component={NotFound} />
                <Redirect to="/404" />
            </Switch>
            <ToastContainer/>
        </>
    );
};

export default App;

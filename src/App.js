import React from "react";
import NavBar from "./components/ui/navBar";
import Users from "./layouts/users";
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
import AuthProvider from "./hooks/useAuth";
const App = () => {
    return (
        <>
            <AuthProvider>
                <NavBar />
                <ProfessionProvider>
                    <QualitiesProvider>
                        <UserProvider>
                            <Switch>
                                <Route path="/login/:type?" component={Login} />
                                <Route
                                    path="/users/:userId/edit"
                                    render={(props) => (
                                        <UserChangePageForm {...props} />
                                    )}
                                />
                                <Route
                                    path="/users/:userId"
                                    render={(props) => <UserPage {...props} />}
                                />
                                <Route path="/users" component={Users} />
                                <Route path="/" component={Main} />
                                <Route path="/404" component={NotFound} />
                                <Redirect to="/404" />
                            </Switch>
                        </UserProvider>
                    </QualitiesProvider>
                </ProfessionProvider>
            </AuthProvider>
            <ToastContainer />
        </>
    );
};

export default App;

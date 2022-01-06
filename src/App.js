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
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
const App = () => {
    return (
        <>
            <AuthProvider>
                <NavBar />
                <ProfessionProvider>
                    <QualitiesProvider>
                        <Switch>
                            <Route path="/login/:type?" component={Login} />
                            <Route path="/logout" component={LogOut} />
                            <Route path="/" component={Main} exact />
                            <UserProvider>
                                <Switch>
                                    <ProtectedRoute
                                        path="/users/:userId/edit"
                                        component={UserChangePageForm}
                                        // render={(props) => (
                                        //     <UserChangePageForm {...props} />
                                        // )}
                                    />
                                    <Route
                                        path="/users/:userId"
                                        render={(props) => (
                                            <UserPage {...props} />
                                        )}
                                    />
                                    <ProtectedRoute
                                        path="/users"
                                        component={Users}
                                    />
                                </Switch>
                            </UserProvider>
                            <Route path="/404" component={NotFound} />
                            <Redirect to="/404" />
                        </Switch>
                    </QualitiesProvider>
                </ProfessionProvider>
            </AuthProvider>
            <ToastContainer />
        </>
    );
};

export default App;

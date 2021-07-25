import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const ApplicationViews = ({ isLoggedIn }) => {

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? "Hello World" : <Redirect to="/login" />}
                </Route>


                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

            </Switch>
        </main>
    );
};

export default ApplicationViews;
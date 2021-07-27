import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import CharacterList from "../components/myCollection/CharacterList";
import Register from "./Register";
import CharacterDetails from "./myCollection/CharacterDetails";

const ApplicationViews = ({ isLoggedIn }) => {

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <CharacterList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/:id" exact>
                    {isLoggedIn ? <CharacterDetails /> : <Redirect to="/login" />}
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
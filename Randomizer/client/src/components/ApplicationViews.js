import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import CharacterList from "../components/myCollection/CharacterList";
import CharacterDetails from "./myCollection/CharacterDetails";
import RandomCharacter from "./randomizer/RandomCharacterGenerator";
import CharacterEditForm from "./myCollection/CharacterEditForm";

const ApplicationViews = ({ isLoggedIn }) => {

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <CharacterList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/:id(\d+)" exact>
                    {isLoggedIn ? <CharacterDetails /> : <Redirect to="/login" />}
                </Route>

                <Route path="/random" exact>
                    {isLoggedIn ? <RandomCharacter /> : <Redirect to="/login" />}
                </Route>

                <Route path="/edit/:id(\d+)" exact>
                    {isLoggedIn ? <CharacterEditForm /> : <Redirect to="/login" />}
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
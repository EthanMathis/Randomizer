import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { login } from "../providers/authManager";

export default function Login() {
    const history = useHistory();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login(email, password)
            .then(() => history.push("/"))
            .catch(() => alert("Invalid email or password"));
    };

    return (
        <Form onSubmit={loginSubmit} className="w-25 mt-5 mb-5 p-4 border rounded mx-auto" id="login-form">
            <fieldset>
                <FormGroup className="m-3 mx-auto">
                    <Label for="email">Email</Label>
                    <Input id="email" type="text" autoFocus onChange={e => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup className="m-3 mx-auto">
                    <Label for="password">Password</Label>
                    <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                </FormGroup>
                <FormGroup className="mx-3">
                    <Button className="btn btn-sm btn-success">Login</Button>
                </FormGroup>
                <em className="m-3">
                    Don't have an account? <Link to="register">Register here</Link>
                </em>
            </fieldset>
        </Form >
    );
}
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
        <Form onSubmit={loginSubmit} className="w-50 mt-5 p-2 border rounded mx-auto">
            <fieldset>
                <FormGroup className="m-3">
                    <Label for="email">Email</Label>
                    <Input id="email" type="text" autoFocus onChange={e => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup className="m-3">
                    <Label for="password">Password</Label>
                    <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                </FormGroup>
                <FormGroup className="mx-3">
                    <Button className="btn btn-sm btn-success">Login</Button>
                </FormGroup>
                <em className="m-3">
                    Not registered? <Link to="register">Register</Link>
                </em>
            </fieldset>
        </Form >
    );
}
import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { register } from "../providers/authManager";

export default function Register() {
    const history = useHistory();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [displayName, setDisplayName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Do better.");
        } else {
            const userProfile = { firstName, lastName, displayName, email };
            register(userProfile, password)
                .then(() => history.push("/"));
        }
    };

    return (
        <Form onSubmit={registerClick} className="w-50 mt-5 p-2 border rounded mx-auto">
            <fieldset>
                <FormGroup className="m-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
                </FormGroup>
                <FormGroup className="m-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
                </FormGroup>
                <FormGroup className="m-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
                </FormGroup>
                <FormGroup className="m-2">
                    <Label for="email">Email</Label>
                    <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup className="m-2">
                    <Label for="password">Password</Label>
                    <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                </FormGroup>
                <FormGroup className="m-2">
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                </FormGroup>
                <FormGroup className="m-3">
                    <Button className="btn btn-sm btn-success">Register</Button>
                </FormGroup>
            </fieldset>
        </Form>
    );
}

import React, { useState, useEffect } from 'react';
import { Card, CardTitle, CardBody, Button } from 'reactstrap';
import CardText from 'reactstrap/lib/CardText';
import { Link } from "react-router-dom";

const CharacterCard = ({ character }) => {

    return (

        <Card body outline color="success" className="m-3 p-3 w-75">
            <CardBody>
                <Link color="#198754" to={`/${character.id}`}>
                    <CardTitle tag="h3">{character.name}</CardTitle>
                </Link>
                <CardText>
                    <p><strong>Alignment</strong>: {character.alignment.name}</p>
                    <p><strong>Race</strong>: {character.race.name}</p>
                    <p><strong>Gender</strong>: {character.gender.name}</p>
                </CardText>
            </CardBody>
        </Card>
    )
}

export default CharacterCard;
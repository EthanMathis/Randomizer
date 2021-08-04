import React from 'react';
import { Card, CardTitle, CardBody } from 'reactstrap';
import CardText from 'reactstrap/lib/CardText';
import { Link } from "react-router-dom";
import { Row, Col, Container } from 'reactstrap/lib';


const CharacterCard = ({ character }) => {

    return (
        <Container>
            <Card body outline color="success" className="m-3 p-3" id="character-card">
                <CardBody>
                    <Link color="#198754" to={`/${character.id}`}>
                        <CardTitle tag="h3">{character.name}</CardTitle>
                    </Link>
                    <CardText>
                        <Row>
                            <Col>
                                <p><strong>Alignment</strong>: {character.alignment.name}</p>
                                <p><strong>Race</strong>: {character.race.name}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p><strong>Gender</strong>: {character.gender.name}</p>
                            </Col>
                        </Row>
                    </CardText>
                </CardBody>
            </Card >
        </Container>
    )
}

export default CharacterCard;
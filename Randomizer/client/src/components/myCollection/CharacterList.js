import React, { useEffect, useState } from "react";
// import { Card, CardBody, Button } from "reactstrap";
// import { Link } from "react-router-dom";
// import { useParams } from "react-router";
import CharacterCard from "./CharacterCard";
import { getCharacterList } from "../../providers/characterManager";
import { Container, Card } from "reactstrap";
import { CardBody, CardText, Col } from "reactstrap/lib";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap/lib";

const CharacterList = () => {
    const [characters, setCharacters] = useState(null);

    const getList = () => {
        getCharacterList()
            .then((res) => setCharacters(res))
    }

    useEffect(() => {
        getList();
    }, [])

    return (
        <Container className="w-50 mt-5">
            <Col xs="auto" className="w-75 mx-auto">
                {characters === null ? <Spinner style={{ width: '5rem', height: '5rem' }} type="grow" />
                    : characters.length > 0 ?
                        characters?.map((character) => {
                            return <CharacterCard character={character} key={character.id} />
                        }) :
                        <Card className="landing-card mt-5 p-3">
                            <CardBody>
                                <CardText>
                                    <h2 className="landing-card">
                                        <strong>Uh-oh! Looks like you don't have any NPC's saved...
                                            <br />
                                            Try out the
                                            <Link to={"/random"}> Generator </Link>
                                            to get started!</strong>
                                    </h2>
                                </CardText>
                            </CardBody>
                        </Card>}
            </Col>
        </Container>
    );
}

export default CharacterList;
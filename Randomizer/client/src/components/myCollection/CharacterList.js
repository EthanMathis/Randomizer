import React, { useEffect, useState } from "react";
// import { Card, CardBody, Button } from "reactstrap";
// import { Link } from "react-router-dom";
// import { useParams } from "react-router";
import CharacterCard from "./CharacterCard";
import { getCharacterList } from "../../providers/characterManager";
import { Container } from "reactstrap";
import { Col } from "reactstrap/lib";

const CharacterList = () => {
    const [characters, setCharacters] = useState([]);

    const getList = () => {
        getCharacterList().then((res) => setCharacters(res));
    }

    useEffect(() => {
        getList();
    }, [])

    return (
        <Container className="w-50">
            <Col xs="auto">
                {characters?.map((character) => {
                    return <CharacterCard character={character} key={character.id} />
                })}
            </Col>
        </Container>
    );
}

export default CharacterList;
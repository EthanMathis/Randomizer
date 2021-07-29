import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Card, Button } from "reactstrap";
import { ButtonGroup, CardText, CardTitle, Container } from "reactstrap/lib";
import { deleteCharacter, getCharacterById } from "../../providers/characterManager";
import { Spinner } from "reactstrap";
import { Link } from "react-router-dom";



const CharacterDetails = () => {
    const [character, setCharacter] = useState({});
    const { id } = useParams();
    const history = useHistory();

    const getDetails = () => {
        getCharacterById(id).then(res => setCharacter(res))
    }

    const handleDelete = () => {
        if (window.confirm("Do you really want to delete this character forever?")) {
            deleteCharacter(id).then(() => history.push("/"));
        }
    };


    useEffect(() => {
        getDetails();
    }, [])

    if (character == {} || character == undefined) {
        return <Spinner style={{ width: '5rem', height: '5rem' }} type="grow" />;
    }

    return (
        <Container className="w-75 mt-4">
            <Button className="btn-info mb-2" onClick={() => history.push("/")}>Back</Button>
            <Card>
                <CardTitle className="mt-3">
                    <h4>{character.name}</h4>
                </CardTitle>
                <hr />
                <CardText>
                    <p className="text-start mx-4"><strong>Age</strong>: {character.age}</p>
                    <p className="text-start mx-4"><strong>Gender</strong>: {character.gender?.name}</p>
                    <p className="text-start mx-4"><strong>Race</strong>: {character.race?.name}</p>
                    <p className="text-start mx-4"><strong>Alignment</strong>: {character.alignment?.name}</p>
                    <p className="text-start mx-4"><strong>Appearance Feature</strong>: {character.appearanceFeature?.description}</p>
                    <p className="text-start mx-4"><strong>Mannerism Detail</strong>: {character.mannerism?.description}</p>
                    <p className="text-start mx-4"><strong>Interaction Trait</strong>: {character.interactionTrait?.name}</p>
                    <p className="text-start mx-4"><strong>Talent</strong>: {character.talent?.description}</p>
                    <p className="text-start mx-4"><strong>Notes</strong>: {character.notes}</p>
                </CardText>
                <ButtonGroup size="sm">
                    <Link to={`/edit/${character.id}`}>
                        <Button className="btn btn-success">Edit</Button>
                    </Link>
                    <Button className="btn btn-danger" onClick={handleDelete}>Delete</Button>
                </ButtonGroup>
            </Card>
        </Container>
    )
}

export default CharacterDetails;
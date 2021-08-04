import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Card, Button } from "reactstrap";
import { ButtonGroup, CardText, CardTitle, Col, Container, Row } from "reactstrap/lib";
import { deleteCharacter, getCharacterById } from "../../providers/characterManager";
import { Spinner } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const CharacterDetails = () => {
    const [character, setCharacter] = useState({});
    const [modal, setModal] = useState(false);
    const { id } = useParams();
    const history = useHistory();

    const toggleModal = () => setModal(!modal);

    const getDetails = () => {
        getCharacterById(id).then(res => setCharacter(res))
    }

    const handleDelete = () => {
        deleteCharacter(id).then(() => history.push("/"));
    };


    useEffect(() => {
        getDetails();
    }, [])

    if (character == {} || character == undefined) {
        return <Spinner style={{ width: '5rem', height: '5rem' }} type="grow" />;
    }

    return (
        <Container className="w-50 mt-5">
            <Button className="btn-success mb-2 d-flex" onClick={() => history.push("/")}>Back</Button>
            <Card body outline color="success" id="character-card">
                <CardTitle className="mt-3">
                    <h4>{character.name}</h4>
                </CardTitle>
                <hr />
                <CardText>
                    <Row>
                        <Col>
                            <p className="text-start mx-4"><strong>Age</strong>: {character.age}</p>
                        </Col>
                        <Col>
                            <p className="text-start mx-4"><strong>Gender</strong>: {character.gender?.name}</p>
                        </Col>
                        <Col>
                            <p className="text-start mx-4"><strong>Race</strong>: {character.race?.name}</p>
                        </Col>
                    </Row>
                    <p className="text-start mx-4"><strong>Alignment</strong>: {character.alignment?.name}</p>
                    <p className="text-start mx-4"><strong>Appearance Feature</strong>: {character.appearanceFeature?.description}</p>
                    <p className="text-start mx-4"><strong>Mannerism Detail</strong>: {character.mannerism?.description}</p>
                    <p className="text-start mx-4"><strong>Interaction Trait</strong>: {character.interactionTrait?.name}</p>
                    <p className="text-start mx-4"><strong>Talent</strong>: {character.talent?.description}</p>
                    <p className="text-start mx-4"><strong>Plot Hook</strong>: {character.plotHook?.description}</p>
                    <p className="text-start mx-4"><strong>Notes</strong>: {character.notes}</p>
                </CardText>
                <ButtonGroup size="sm" className="mb-3">
                    <Button className="btn btn-success mx-5 mt-3" onClick={() => history.push(`/edit/${character.id}`)}>Edit</Button>
                    <Button className="btn btn-danger mx-5 mt-3" onClick={toggleModal}>Delete</Button>
                </ButtonGroup>
            </Card>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Delete {character.name}?</ModalHeader>
                <ModalBody>
                    Do you really want to delete this character forever?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleDelete}>Delete</Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>

        </Container>
    )
}

export default CharacterDetails;
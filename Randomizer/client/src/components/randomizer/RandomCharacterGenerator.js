import React, { useState } from "react";
import { useHistory } from "react-router";
import { getRandomCharacter, saveCharacter } from "../../providers/characterManager";
import { Card, Button, CardText } from "reactstrap";
import { CardHeader, Container, Input } from "reactstrap/lib";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const RandomCharacter = () => {
    const [newCharacter, setNewCharacter] = useState({});
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory()

    const getNewCharacter = () => {
        getRandomCharacter().then(res => setNewCharacter(res))
    }

    const toggle = () => setModal(!modal);

    const handleInputChange = (event) => {
        const characterToBeSaved = { ...newCharacter };
        characterToBeSaved.name = event.target.value;
        setNewCharacter(characterToBeSaved);
        console.log(newCharacter);
    }

    const handleSave = () => {
        setIsLoading(true);
        toggle();
        saveCharacter(newCharacter)
            .then(setNewCharacter({}))
            .then(setIsLoading(false))
            .then(history.push("/"))
    }

    return (
        <Container className="w-75 mt-4">
            <Card>
                <CardHeader className="mt-3">
                    <h3>Random Character Generator</h3>
                </CardHeader>
                <CardText>
                    <p className="text-start mx-4 mt-4"><strong>Gender</strong>: {newCharacter.gender?.name}</p>
                    <p className="text-start mx-4"><strong>Race</strong>: {newCharacter.race?.name}</p>
                    <p className="text-start mx-4"><strong>Alignment</strong>: {newCharacter.alignment?.name}</p>
                    <p className="text-start mx-4"><strong>Appearance Feature</strong>: {newCharacter.appearanceFeature?.description}</p>
                    <p className="text-start mx-4"><strong>Mannerism Detail</strong>: {newCharacter.mannerism?.description}</p>
                    <p className="text-start mx-4"><strong>Interaction Trait</strong>: {newCharacter.interactionTrait?.name}</p>
                    <p className="text-start mx-4"><strong>Talent</strong>: {newCharacter.talent?.description}</p>
                </CardText>
            </Card>
            <Button className="btn btn-warning mx-5 mt-3" onClick={getNewCharacter}>Get Character</Button>
            <Button className="btn btn-success mx-5 mt-3" onClick={toggle} disabled={isLoading}>Save Character</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Name Your New Character</ModalHeader>
                <ModalBody>
                    <Input type="text" placeholder="Name..." onChange={handleInputChange}></Input>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={handleSave} disabled={isLoading}>Save Character</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Container>
    )
}

export default RandomCharacter;
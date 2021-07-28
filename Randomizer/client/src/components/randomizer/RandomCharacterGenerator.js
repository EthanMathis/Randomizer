import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getRandomCharacter, saveCharacter } from "../../providers/characterManager";
import { Card, Button, CardText } from "reactstrap";
import { CardHeader, Col, Container, Input, Row } from "reactstrap/lib";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { getAlignments } from "../../providers/alignmentManager";
import { getRaces } from "../../providers/raceManager";
import { getGenders } from "../../providers/genderManager";

const RandomCharacter = () => {
    const [newCharacter, setNewCharacter] = useState({});

    const [toggle, setToggle] = useState({
        ddAlignment: false,
        ddRace: false,
        ddGender: false
    })
    const [allAlignments, setAllAlignments] = useState([]);
    const [selectedAlignment, setSelectedAlignment] = useState();
    // const [alignmentDropdown, setAlignmentDropdown] = useState(false);

    const [allRaces, setAllRaces] = useState([]);
    const [selectedRace, setSelectedRace] = useState();
    // const [raceDropdown, setRaceDropdown] = useState(false);

    const [allGenders, setAllGenders] = useState([]);
    const [selectedGender, setSelectedGender] = useState();
    // const [genderDropdown, setGenderDropdown] = useState(false);

    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory()


    // const toggleAlignment = () => setAlignmentDropdown(prevState => !prevState);
    // const toggleRace = () => setRaceDropdown(prevState => !prevState);
    // const toggleGender = () => setGenderDropdown(prevState => !prevState);


    const handleAlignmentDropdown = (event) => {
        let userAlignment = {};
        userAlignment.id = event.target.id;
        userAlignment.name = event.target.innerText;
        // console.log(event.target.innerText)
        // console.log(event.target.id)
        console.log(userAlignment);
        setSelectedAlignment(userAlignment);
    }

    const toggleModal = () => setModal(!modal);

    //* POPULATES ALL 3 DROPDOWNS FROM DB
    const populateDropdowns = () => {
        getAlignments().then((res) => setAllAlignments(res));
        getRaces().then((res) => setAllRaces(res));
        getGenders().then((res) => setAllGenders(res));
    }

    useEffect(() => {
        populateDropdowns()
    }, [])


    //* RANDOM CHARACTER GENERATER FUNCTION 
    const getNewCharacter = () => {
        getRandomCharacter().then(res => setNewCharacter(res))
    }
    //* NAMES THE SAVED CHARACTER
    const handleInputChange = (event) => {
        let characterToBeSaved = { ...newCharacter };
        characterToBeSaved.name = event.target.value;
        setNewCharacter(characterToBeSaved);
        console.log(newCharacter);
    }
    //* SAVES CHARACTER AND REDIRECTS TO CHARACTERLIST
    const handleSave = () => {
        setIsLoading(true);
        toggleModal();
        saveCharacter(newCharacter)
            .then(() => setIsLoading(false))
            .then(() => history.push("/"))
    }


    return (
        <Container className="w-75 mt-4">
            <Row className="mb-3">
                <Col >
                    <Dropdown isOpen={toggle.ddAlignment} toggle={() => setToggle({ ddAlignment: !toggle.ddAlignment })}>
                        <DropdownToggle caret>
                            Alignment
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Choose an Alignment</DropdownItem>
                            {allAlignments.map(alignment => {
                                return <DropdownItem id={alignment.id} key={alignment.id} onClick={handleAlignmentDropdown}>{alignment.name}</DropdownItem>
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </Col>

                <Col>
                    <Dropdown isOpen={toggle.ddRace} toggle={() => setToggle({ ddRace: !toggle.ddRace })}>
                        <DropdownToggle caret>
                            Race
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Choose a Race</DropdownItem>
                            {allRaces.map(race => {
                                return <DropdownItem id={race.id} key={race.id}>{race.name}</DropdownItem>
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </Col>

                <Col>
                    <Dropdown isOpen={toggle.ddGender} toggle={() => setToggle({ ddGender: !toggle.ddGender })}>
                        <DropdownToggle caret>
                            Gender
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Choose a Gender</DropdownItem>
                            {allGenders.map(gender => {
                                return <DropdownItem id={gender.id} key={gender.id}>{gender.name}</DropdownItem>
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </Row>
            <Card body outline color="success">
                <CardHeader className="mt-3">
                    <h3>Random Character Generator</h3>
                </CardHeader>
                <CardText>
                    <p className="text-start mx-4 mt-4"><strong>Gender</strong>: {newCharacter.gender?.name}</p>
                    <p className="text-start mx-4"><strong>Race</strong>: {newCharacter.race?.name}</p>
                    <p className="text-start mx-4"><strong>Alignment</strong>: {selectedAlignment ? selectedAlignment.name : newCharacter.alignment?.name}</p>
                    <p className="text-start mx-4"><strong>Appearance Feature</strong>: {newCharacter.appearanceFeature?.description}</p>
                    <p className="text-start mx-4"><strong>Mannerism Detail</strong>: {newCharacter.mannerism?.description}</p>
                    <p className="text-start mx-4"><strong>Interaction Trait</strong>: {newCharacter.interactionTrait?.name}</p>
                    <p className="text-start mx-4"><strong>Talent</strong>: {newCharacter.talent?.description}</p>
                </CardText>
            </Card>
            <Button className="btn btn-info mx-5 mt-3" onClick={getNewCharacter}>Get Character</Button>
            <Button className="btn btn-success mx-5 mt-3" onClick={toggleModal} disabled={isLoading}>Save Character</Button>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Name Your New Character</ModalHeader>
                <ModalBody>
                    <Input type="text" placeholder="Name..." onChange={handleInputChange}></Input>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={handleSave} disabled={isLoading}>Save Character</Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Container>
    )
}

export default RandomCharacter;
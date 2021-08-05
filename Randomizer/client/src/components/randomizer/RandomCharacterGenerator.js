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

    const [allRaces, setAllRaces] = useState([]);
    const [selectedRace, setSelectedRace] = useState();

    const [allGenders, setAllGenders] = useState([]);
    const [selectedGender, setSelectedGender] = useState();

    const [modal, setModal] = useState(false);
    const [nameModal, setNameModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory()


    const toggleModal = () => setModal(!modal);
    const toggleNameModal = () => setNameModal(!nameModal);

    //* MAKES THE RANDOM CHARACTER SHEET SHOW THE USERS SELECTED OPTION (IF SELECTED)
    const handleAlignmentDropdown = (event) => {
        let userAlignment = {};
        userAlignment.id = event.target.id;
        userAlignment.name = event.target.innerText;
        setSelectedAlignment(userAlignment);
    }

    const handleRaceDropdown = (event) => {
        let userRace = {};
        userRace.id = event.target.id;
        userRace.name = event.target.innerText;
        setSelectedRace(userRace)
    }

    const handleGenderDropdown = (event) => {
        let userGender = {};
        userGender.id = event.target.id;
        userGender.name = event.target.innerText;
        setSelectedGender(userGender)
    }


    //* RANDOM CHARACTER GENERATER FUNCTION 
    const getNewCharacter = () => {
        getRandomCharacter().then(res => setNewCharacter(res))
    }
    //* NAMES THE SAVED CHARACTER
    const handleInputChange = (event) => {
        const value = event.target.value;
        const key = event.target.id;
        let characterToBeSaved = { ...newCharacter };
        characterToBeSaved[key] = value;
        setNewCharacter(characterToBeSaved);
    }
    //* SAVES CHARACTER AND REDIRECTS TO CHARACTERLIST
    const handleSave = () => {
        // setIsLoading(!isLoading);
        let newUserCharacter = { ...newCharacter };
        if (selectedAlignment !== undefined) {
            newUserCharacter.alignmentId = selectedAlignment.id;
            newUserCharacter.alignment = selectedAlignment;
        }
        if (selectedRace !== undefined) {
            newUserCharacter.raceId = selectedRace.id;
            newUserCharacter.race = selectedRace;
        }
        if (selectedGender !== undefined) {
            newUserCharacter.genderId = selectedGender.id;
            newUserCharacter.gender = selectedGender;
        }
        console.log(newUserCharacter);
        if (newUserCharacter.name == undefined) {
            return window.alert("Please Name your character!")
        }
        saveCharacter(newUserCharacter)
            .then(() => setIsLoading(true))
            .then(() => history.push("/"))
    }

    //* POPULATES ALL 3 DROPDOWNS FROM DB
    const populateDropdowns = () => {
        getAlignments().then((res) => setAllAlignments(res));
        getRaces().then((res) => setAllRaces(res));
        getGenders().then((res) => setAllGenders(res));
    }

    useEffect(() => {
        populateDropdowns()
    }, [])

    return (
        <Container className="w-75 mt-4">
            <Row className="mb-3">
                <Col >
                    <Dropdown isOpen={toggle.ddAlignment} toggle={() => setToggle({ ddAlignment: !toggle.ddAlignment })}>
                        <DropdownToggle caret>
                            {selectedAlignment ? selectedAlignment.name : <>Alignment</>}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Choose an Alignment</DropdownItem>
                            <DropdownItem onClick={() => setSelectedAlignment()}>Random</DropdownItem>
                            {allAlignments.map(alignment => {
                                return <DropdownItem id={alignment.id} key={alignment.id} onClick={handleAlignmentDropdown}>{alignment.name}</DropdownItem>
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </Col>

                <Col>
                    <Dropdown isOpen={toggle.ddRace} toggle={() => setToggle({ ddRace: !toggle.ddRace })}>
                        <DropdownToggle caret>
                            {selectedRace ? selectedRace.name : <>Race</>}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Choose a Race</DropdownItem>
                            <DropdownItem onClick={() => setSelectedRace()}>Random</DropdownItem>
                            {allRaces.map(race => {
                                return <DropdownItem id={race.id} key={race.id} onClick={handleRaceDropdown}>{race.name}</DropdownItem>
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </Col>

                <Col>
                    <Dropdown isOpen={toggle.ddGender} toggle={() => setToggle({ ddGender: !toggle.ddGender })}>
                        <DropdownToggle caret>
                            {selectedGender ? selectedGender.name : <>Gender</>}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Choose a Gender</DropdownItem>
                            <DropdownItem onClick={() => setSelectedGender()}>Random</DropdownItem>
                            {allGenders.map(gender => {
                                return <DropdownItem id={gender.id} key={gender.id} onClick={handleGenderDropdown}>{gender.name}</DropdownItem>
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </Row>
            <Card body outline color="success" id="character-card">
                <CardHeader className="mt-3">
                    <h3>Random Character Generator</h3>
                </CardHeader>
                <CardText>
                    <p className="text-start mx-4 mt-4"><strong>Alignment</strong>: {selectedAlignment ? selectedAlignment.name : newCharacter.alignment?.name}</p>
                    <p className="text-start mx-4"><strong>Race</strong>: {selectedRace ? selectedRace.name : newCharacter.race?.name}</p>
                    <p className="text-start mx-4"><strong>Gender</strong>: {selectedGender ? selectedGender.name : newCharacter.gender?.name}</p>
                    <p className="text-start mx-4"><strong>Appearance Feature</strong>: {newCharacter.appearanceFeature?.description}</p>
                    <p className="text-start mx-4"><strong>Mannerism Detail</strong>: {newCharacter.mannerism?.description}</p>
                    <p className="text-start mx-4"><strong>Interaction Trait</strong>: {newCharacter.interactionTrait?.name}</p>
                    <p className="text-start mx-4"><strong>Plot Hook</strong>: {newCharacter.plotHook?.description}</p>
                    <p className="text-start mx-4"><strong>Talent</strong>: {newCharacter.talent?.description}</p>
                </CardText>
            </Card>
            <Button className="btn btn-info mx-5 mt-3" onClick={getNewCharacter}>Get Character</Button>
            <Button className="btn btn-success mx-5 mt-3" onClick={toggleModal} disabled={isLoading}>Save Character</Button>
            <Modal isOpen={modal} toggle={toggleModal} className="myModal">
                <ModalHeader toggle={toggleModal}>Name, Age and Notes</ModalHeader>
                <ModalBody>
                    <Input type="text" id="name" placeholder="Name..." onChange={handleInputChange} className="edit-form-input mb-2"></Input>
                    <Input type="text" id="age" placeholder="Age..." onChange={handleInputChange} className="edit-form-input mb-2"></Input>
                    <Input type="textarea" rows={3} id="notes" placeholder="Notes..." onChange={handleInputChange} className="edit-form-input" ></Input>
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
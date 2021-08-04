import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Container, Card } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { getCharacterById, updateCharacter } from '../../providers/characterManager';
import { getAlignments } from "../../providers/alignmentManager";
import { getRaces } from "../../providers/raceManager";
import { getGenders } from "../../providers/genderManager";
import { getAppearanceFeatures } from '../../providers/appearanceFeatureManager';
import { getInteractionTraits } from '../../providers/interactionTraitManager';
import { getMannerisms } from '../../providers/mannerismManager';
import { getTalents } from '../../providers/talentManager';
import { ButtonGroup, Row, Col } from 'reactstrap/lib';


const CharacterEditForm = () => {
    const [editCharacter, setEditCharacter] = useState({})
    const { id } = useParams();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [toggle, setToggle] = useState({
        ddAlignment: false,
        ddRace: false,
        ddGender: false,
        ddAppearance: false,
        ddInteraction: false,
        ddMannerism: false,
        ddTalent: false
    })

    const [allAlignments, setAllAlignments] = useState([]);
    const [selectedAlignment, setSelectedAlignment] = useState();

    const [allRaces, setAllRaces] = useState([]);
    const [selectedRace, setSelectedRace] = useState();

    const [allGenders, setAllGenders] = useState([]);
    const [selectedGender, setSelectedGender] = useState();

    const [allAppearanceFeatures, setAllAppearanceFeatures] = useState([]);
    const [selectedAppearanceFeature, setSelectedAppearanceFeature] = useState();

    const [allInteractionTraits, setAllInteractionTraits] = useState([]);
    const [selectedInteractionTrait, setSelectedInteractionTrait] = useState();

    const [allMannerisms, setAllMannerisms] = useState([]);
    const [selectedMannerism, setSelectedMannerism] = useState();

    const [allTalents, setAllTalents] = useState([]);
    const [selectedTalent, setSelectedTalent] = useState();


    //* DROPDOWN EVENT HANDLERS BEGINS (EYEROLL)
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

    const handleAppearanceDropdown = (event) => {
        let userAppearance = {};
        userAppearance.id = event.target.id;
        userAppearance.description = event.target.innerText;
        setSelectedAppearanceFeature(userAppearance);
    }

    const handleInteractionDropdown = (event) => {
        let userInteraction = {};
        userInteraction.id = event.target.id;
        userInteraction.name = event.target.innerText;
        setSelectedInteractionTrait(userInteraction);
    }

    const handleMannerismDropdown = (event) => {
        let userMannerism = {};
        userMannerism.id = event.target.id;
        userMannerism.description = event.target.innerText;
        setSelectedMannerism(userMannerism);
    }

    const handleTalentDropdown = (event) => {
        let userTalent = {};
        userTalent.id = event.target.id;
        userTalent.description = event.target.innerText;
        setSelectedTalent(userTalent);
    }
    //* DROPDOWN EVENT HANDLERS END (SWEET JESUS)

    const handleSaveEdit = () => {
        let editedCharacter = { ...editCharacter }
        if (selectedAlignment !== undefined) {
            editedCharacter.alignmentId = selectedAlignment.id;
            editedCharacter.alignment = selectedAlignment;
        }
        if (selectedRace !== undefined) {
            editedCharacter.raceId = selectedRace.id;
            editedCharacter.race = selectedRace;
        }
        if (selectedGender !== undefined) {
            editedCharacter.genderId = selectedGender.id;
            editedCharacter.gender = selectedGender;
        }
        if (selectedAppearanceFeature !== undefined) {
            editCharacter.appearanceFeatureId = selectedAppearanceFeature.id;
            editCharacter.appearanceFeature = selectedAppearanceFeature;
        }
        if (selectedInteractionTrait !== undefined) {
            editCharacter.interactionTraitId = selectedInteractionTrait.id;
            editCharacter.interactionTrait = selectedInteractionTrait;
        }
        if (selectedMannerism !== undefined) {
            editCharacter.mannerismId = selectedMannerism.id;
            editCharacter.mannerism = selectedMannerism;
        }
        if (selectedTalent !== undefined) {
            editCharacter.talentId = selectedTalent.id;
            editCharacter.talent = selectedTalent;
        }
        updateCharacter(editedCharacter)
            .then(() => setIsLoading(true))
            .then(() => history.push("/"))
    }

    const handleInputChange = (event) => {
        const value = event.target.value;
        const key = event.target.id;
        const characterCopy = { ...editCharacter };
        characterCopy[key] = value;
        setEditCharacter(characterCopy);
    }

    const getCharacter = () => {
        getCharacterById(id).then((res) => setEditCharacter(res));
    }

    //* POPULATES ALL 3 DROPDOWNS FROM DB
    const populateDropdowns = () => {
        getAlignments().then((res) => setAllAlignments(res));
        getRaces().then((res) => setAllRaces(res));
        getGenders().then((res) => setAllGenders(res));
        getAppearanceFeatures().then((res) => setAllAppearanceFeatures(res));
        getInteractionTraits().then((res) => setAllInteractionTraits(res));
        getMannerisms().then((res) => setAllMannerisms(res));
        getTalents().then((res) => setAllTalents(res));
    }


    useEffect(() => {
        getCharacter();
        populateDropdowns();
    }, [])

    return (
        <Container className="mb-5">
            <Card body outline color="success" className="w-75 m-4 mx-auto p-3" id="character-edit">

                <Form>
                    <h4>{editCharacter.name} Edit</h4>
                    <Row className="m-2">
                        <Col>
                            <div className="d-flex align-items-center">
                                <div className="m-2">Name </div>
                                <FormGroup>
                                    <Input className="edit-form-input text-center" type="text" name="name" id="name" value={editCharacter.name} onChange={handleInputChange} />
                                </FormGroup>
                            </div>
                        </Col>
                        <Col>
                            <div className="d-flex align-items-center">
                                <div className="m-2">Age</div>
                                <FormGroup>
                                    <Input className="edit-form-input text-center" type="text" name="age" id="age" value={editCharacter.age} onChange={handleInputChange} />
                                </FormGroup>
                            </div>
                        </Col>
                    </Row>
                    <hr />
                    <div className="d-flex align-items-center">
                        <div>Gender</div>
                        <Row className="border rounded m-2" id="editform">
                            <Col>
                                <p><strong>{editCharacter.gender?.name}</strong></p>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Dropdown isOpen={toggle.ddGender} toggle={() => setToggle({ ddGender: !toggle.ddGender })}>
                                        <DropdownToggle caret>
                                            {selectedGender ? selectedGender.name : editCharacter.gender?.name}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem header>Choose a Gender</DropdownItem>
                                            {allGenders.map(gender => {
                                                return <DropdownItem id={gender.id} key={gender.id} onClick={handleGenderDropdown}>{gender.name}</DropdownItem>
                                            })}
                                        </DropdownMenu>
                                    </Dropdown>
                                </FormGroup>
                            </Col>
                        </Row>

                    </div>
                    <div className="d-flex align-items-center">
                        <div>Race</div>
                        <Row className="border rounded m-2" id="editform">
                            <Col>
                                <strong><p>{editCharacter.race?.name}</p></strong>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Dropdown isOpen={toggle.ddRace} toggle={() => setToggle({ ddRace: !toggle.ddRace })}>
                                        <DropdownToggle caret>
                                            {selectedRace ? selectedRace.name : editCharacter.race?.name}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem header>Choose a Race</DropdownItem>
                                            {allRaces.map(race => {
                                                return <DropdownItem id={race.id} key={race.id} onClick={handleRaceDropdown}>{race.name}</DropdownItem>
                                            })}
                                        </DropdownMenu>
                                    </Dropdown>
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>

                    <div className="d-flex align-items-center">
                        <div>Alignment</div>
                        <Row className="border rounded m-2" id="editform">
                            <Col>
                                <strong><p>{editCharacter.alignment?.name}</p></strong>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Dropdown isOpen={toggle.ddAlignment} toggle={() => setToggle({ ddAlignment: !toggle.ddAlignment })}>
                                        <DropdownToggle caret>
                                            {selectedAlignment ? selectedAlignment.name : editCharacter.alignment?.name}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem header>Choose an Alignment</DropdownItem>
                                            {allAlignments.map(alignment => {
                                                return <DropdownItem id={alignment.id} key={alignment.id} onClick={handleAlignmentDropdown}>{alignment.name}</DropdownItem>
                                            })}
                                        </DropdownMenu>
                                    </Dropdown>
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>

                    <div className="d-flex align-items-center">
                        <div>Appearance <br /> Feature</div>
                        <Row className="border rounded m-2" id="editform">
                            <Col>
                                <strong><p>{editCharacter.appearanceFeature?.description}</p></strong>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Dropdown isOpen={toggle.ddAppearance} toggle={() => setToggle({ ddAppearance: !toggle.ddAppearance })}>
                                        <DropdownToggle caret>
                                            {selectedAppearanceFeature ? selectedAppearanceFeature.description : editCharacter.appearanceFeature?.description}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem header>Choose an Appearance Feature</DropdownItem>
                                            {allAppearanceFeatures.map(appearance => {
                                                return <DropdownItem id={appearance.id} key={appearance.id} onClick={handleAppearanceDropdown}>{appearance.description}</DropdownItem>
                                            })}
                                        </DropdownMenu>
                                    </Dropdown>
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>

                    <div className="d-flex align-items-center">
                        <div>Interaction <br /> Trait</div>
                        <Row className="border rounded m-2" id="editform">
                            <Col>
                                <strong><p>{editCharacter.interactionTrait?.name}</p></strong>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Dropdown isOpen={toggle.ddInteraction} toggle={() => setToggle({ ddInteraction: !toggle.ddInteraction })}>
                                        <DropdownToggle caret>
                                            {selectedInteractionTrait ? selectedInteractionTrait.name : editCharacter.interactionTrait?.name}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem header>Choose an Interaction Trait</DropdownItem>
                                            {allInteractionTraits.map(interaction => {
                                                return <DropdownItem id={interaction.id} key={interaction.id} onClick={handleInteractionDropdown}>{interaction.name}</DropdownItem>
                                            })}
                                        </DropdownMenu>
                                    </Dropdown>
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>

                    <div className="d-flex align-items-center">
                        <div>Mannerism</div>
                        <Row className="border rounded m-2" id="editform">
                            <Col>
                                <strong><p>{editCharacter.mannerism?.description}</p></strong>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Dropdown isOpen={toggle.ddMannerism} toggle={() => setToggle({ ddMannerism: !toggle.ddMannerism })}>
                                        <DropdownToggle caret>
                                            {selectedMannerism ? selectedMannerism.description : editCharacter.mannerism?.description}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem header>Choose a Mannerism</DropdownItem>
                                            {allMannerisms.map(mannerism => {
                                                return <DropdownItem id={mannerism.id} key={mannerism.id} onClick={handleMannerismDropdown}>{mannerism.description}</DropdownItem>
                                            })}
                                        </DropdownMenu>
                                    </Dropdown>
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>

                    <div className="d-flex align-items-center">
                        <div>Talent</div>
                        <Row className="border rounded m-2" id="editform">
                            <Col >
                                <strong><p>{editCharacter.talent?.description}</p></strong>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Dropdown isOpen={toggle.ddTalent} toggle={() => setToggle({ ddTalent: !toggle.ddTalent })}>
                                        <DropdownToggle caret>
                                            {selectedTalent ? selectedTalent.description : editCharacter.talent?.description}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem header>Choose a Talent</DropdownItem>
                                            {allTalents.map(talent => {
                                                return <DropdownItem id={talent.id} key={talent.id} onClick={handleTalentDropdown}>{talent.description}</DropdownItem>
                                            })}
                                        </DropdownMenu>
                                    </Dropdown>
                                </FormGroup>
                            </Col>
                        </Row>
                    </div>

                    <div className="d-flex align-items-center">
                        <div>Plot Hook</div>
                        <Row className="border rounded m-2" id="editform">
                            <FormGroup className="d-flex">
                                <strong><p>{editCharacter.plotHook?.description}</p></strong>
                            </FormGroup>
                        </Row>
                    </div>

                    <FormGroup className="m-2">
                        <div className="d-flex align-items-center">
                            <div>Notes</div>
                            <Input className="edit-form-input" type="textarea" name="notes" id="notes" value={editCharacter.notes} onChange={handleInputChange} rows={6} />
                        </div>
                    </FormGroup>
                    <Row>
                        <ButtonGroup>
                            <Button className="btn btn-success mx-5 mt-3" disabled={isLoading} onClick={handleSaveEdit}>Save Changes</Button>
                            <Button className="btn btn-danger mx-5 mt-3" onClick={() => history.push(`/${editCharacter.id}`)}>Discard Changes</Button>
                        </ButtonGroup>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
}

export default CharacterEditForm;
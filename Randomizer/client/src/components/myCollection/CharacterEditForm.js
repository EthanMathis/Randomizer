import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
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
        <Container className="w-50 mt-4">
            <Form>
                <h4>{editCharacter.name} Edit</h4>
                <Row>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={editCharacter.name} onChange={handleInputChange} />
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <Label for="age">Age</Label>
                        <Input type="text" name="age" id="age" value={editCharacter.age} onChange={handleInputChange} />
                    </FormGroup>
                </Row>

                {/* //* DROPDOWN ROW 1 START */}
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="gender">Gender</Label>
                            <Dropdown isOpen={toggle.ddGender} toggle={() => setToggle({ ddGender: !toggle.ddGender })}>
                                <DropdownToggle caret>
                                    {editCharacter.gender?.name}
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
                    <Col>
                        <FormGroup>
                            <Label for="race">Race</Label>
                            <Dropdown isOpen={toggle.ddRace} toggle={() => setToggle({ ddRace: !toggle.ddRace })}>
                                <DropdownToggle caret>
                                    {editCharacter.race?.name}
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
                    <Col>
                        <FormGroup>
                            <Label for="alignment">Alignment</Label>
                            <Dropdown isOpen={toggle.ddAlignment} toggle={() => setToggle({ ddAlignment: !toggle.ddAlignment })}>
                                <DropdownToggle caret>
                                    {editCharacter.alignment?.name}
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
                {/* //* DROPDOWN ROW 1 END */}

                {/* //* DROPDOWN ROW 2 START */}
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="appearanceFeature">Appearance Feature</Label>
                            <Dropdown isOpen={toggle.ddAppearance} toggle={() => setToggle({ ddAppearance: !toggle.ddAppearance })}>
                                <DropdownToggle caret>
                                    {editCharacter.appearanceFeature?.description}
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
                    <Col>
                        <FormGroup>
                            <Label for="interactionTrait">Interaction Trait</Label>
                            <Dropdown isOpen={toggle.ddInteraction} toggle={() => setToggle({ ddInteraction: !toggle.ddInteraction })}>
                                <DropdownToggle caret>
                                    {editCharacter.interactionTrait?.name}
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
                {/* //* DROPDOWN ROW 2 END */}

                {/* //* DROPDOWN ROW 3 START */}
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="mannerism">Mannerism</Label>
                            <Dropdown isOpen={toggle.ddMannerism} toggle={() => setToggle({ ddMannerism: !toggle.ddMannerism })}>
                                <DropdownToggle caret>
                                    {editCharacter.mannerism?.description}
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
                    <Col>
                        <FormGroup>
                            <Label for="talent">Talent</Label>
                            <Dropdown isOpen={toggle.ddTalent} toggle={() => setToggle({ ddTalent: !toggle.ddTalent })}>
                                <DropdownToggle caret>
                                    {editCharacter.talent?.description}
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
                {/* //* DROPDOWN ROW 3 END */}

                <FormGroup>
                    <Label for="notes">Notes</Label>
                    <Input type="textarea" name="notes" id="notes" value={editCharacter.notes} onChange={handleInputChange} rows={6} />
                </FormGroup>
                <Row>
                    <ButtonGroup>
                        <Button className="btn btn-success mx-5 mt-3" disabled={isLoading} onClick={handleSaveEdit}>Save Changes</Button>
                        <Button className="btn btn-danger mx-5 mt-3" onClick={() => history.push(`/${editCharacter.id}`)}>Discard Changes</Button>
                    </ButtonGroup>
                </Row>
            </Form>
        </Container>
    )
}

export default CharacterEditForm;
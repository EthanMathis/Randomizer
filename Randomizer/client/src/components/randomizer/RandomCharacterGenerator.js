import React, { useEffect, useState } from "react";
import { getRandomCharacter } from "../../providers/characterManager";
import { Card, Button, CardText } from "reactstrap";
import { CardHeader } from "reactstrap/lib";
import { Spinner } from "reactstrap";


const RandomCharacter = () => {
    const [newCharacter, setNewCharacter] = useState({})

    const getNewCharacter = () => {
        getRandomCharacter().then(res => setNewCharacter(res))
    }

    if (newCharacter == {}) {
        return (
            <Card>
                <CardHeader>
                    <h3>Random Character Generator</h3>
                </CardHeader>

                <CardText>
                    <h4>Need a new character? Hit the button to generate one.</h4>
                </CardText>
                <Button className="btn btn-warning" onClick={getNewCharacter}>Get Character</Button>
            </Card>
        )
    } else if (newCharacter == undefined) {
        return (
            <Card>
                <CardHeader>
                    <h3>Random Character Generator</h3>
                </CardHeader>

                <CardText>
                    <Spinner style={{ width: '5rem', height: '5rem' }} type="grow" />
                </CardText>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <h3>Random Character Generator</h3>
            </CardHeader>
            <CardText>
                <p className="text-start mx-4"><strong>Gender</strong>: {newCharacter.gender?.name}</p>
                <p className="text-start mx-4"><strong>Race</strong>: {newCharacter.race?.name}</p>
                <p className="text-start mx-4"><strong>Alignment</strong>: {newCharacter.alignment?.name}</p>
                <p className="text-start mx-4"><strong>Appearance Feature</strong>: {newCharacter.appearanceFeature?.description}</p>
                <p className="text-start mx-4"><strong>Mannerism Detail</strong>: {newCharacter.mannerism?.description}</p>
                <p className="text-start mx-4"><strong>Interaction Trait</strong>: {newCharacter.interactionTrait?.name}</p>
                <p className="text-start mx-4"><strong>Talent</strong>: {newCharacter.talent?.description}</p>
            </CardText>
            <Button className="btn btn-warning" onClick={getNewCharacter}>Get Character</Button>
        </Card>
    )
}

export default RandomCharacter;
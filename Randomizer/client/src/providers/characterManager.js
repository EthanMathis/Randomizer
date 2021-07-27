import { getToken } from "./authManager";

const _apiUrl = "/api/character";

export const getCharacterList = () => {
    return getToken().then((token) => {
        return fetch(_apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get the character list.");
            }
        });
    });
};

export const getCharacterById = (id) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get character.");
            }
        });
    });
};

export const getRandomCharacter = () => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/random/`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get character.");
            }
        });
    });
};

export const saveCharacter = (character) => {
    return getToken().then((token) => {
        return fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(character)
        }).
            then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else if (resp.status === 401) {
                    throw new Error("Unauthorized");
                } else {
                    throw new Error("An unknown error occurred while trying to save a new character.");
                }
            });
    });
};

export const updateCharacter = (character) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${character.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(character)
        }).then((res) => {
            if (!res.ok) {
                window.alert('You are unable to edit this character.');
            }
        });
    });
};

export const deleteCharacter = (id) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    });
};

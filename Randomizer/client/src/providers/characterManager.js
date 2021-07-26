import { getToken } from "./authManager";

const _apiUrl = "/api/character";

export const getCharacterList = () => {
    return getToken().then((token) =>
        fetch(_apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get the character list.")
            }
        }))
}
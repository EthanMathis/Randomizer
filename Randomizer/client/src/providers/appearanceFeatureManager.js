import { getToken } from "./authManager";

const _apiUrl = "/api/appearanceFeature";

export const getAppearanceFeatures = () => {
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
                throw new Error("An unknown error occurred while trying to get Appearance Feature.");
            }
        });
    });
};

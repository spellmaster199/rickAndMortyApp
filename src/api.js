/* Characters */
export async function fetchCharacters(page) {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
    if (!response.ok) {
        throw new Error("Hiba történt a karakterek lekérése közben");
    }
    return await response.json();
}

/* Character */
export async function fetchCharacterById(id) {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (!response.ok) {
        throw new Error("Hiba történt a karakter lekérése közben");
    }
    return await response.json();
}

/* Locations */
export async function fetchLocations(page) {
    const response = await fetch(`https://rickandmortyapi.com/api/location?page=${page}`);
    if (!response.ok) {
        throw new Error("Hiba történt az lokációk lekérése közben");
    }
    return await response.json();
}

/* Episodes */
export async function fetchEpisodes(page) {
    const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
    if (!response.ok) {
        throw new Error("Hiba történt az epizódok lekérése közben");
    }
    return await response.json();
}
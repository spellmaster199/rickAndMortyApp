import { fetchCharacterById } from "../api.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
var maxCharacterId = 826;

if (id) {
    fetchCharacterById(id).then(character => {
        console.log(character);

        if (!character || !character.name) {
            console.error("Incorrect or missing data for the character.");
            return;
        }

        document.title = `Rick and Morthy | ${character.name}`;
        document.getElementById("id").textContent = character.id;
        document.getElementById("name").textContent = character.name;
        document.getElementById("status").textContent = character.status;
        document.getElementById("species").textContent = character.species;
        document.getElementById("gender").textContent = character.gender;
        document.getElementById("origin").textContent = character.origin.name;
        document.getElementById("created").textContent = character.created;
        document.getElementById("characterImg").setAttribute("src", character.image);
    
}).catch(error => {
    console.error("An error occurred while retrieving the character.:", error);
});
} else {
console.error("No ID in the URL!");
}


// Frissítsük a maxCharacterId értékét az API-ból
fetch("https://rickandmortyapi.com/api/character/")
    .then(response => response.json())
    .then(data => {
        maxCharacterId = data.info.count; // API válaszából kinyerjük az aktuális max ID-t
    })
    .catch(error => console.error("Nem sikerült lekérdezni a maximális karakter ID-t:", error));

var prevCharacter = document.getElementById("prevCharacter");
prevCharacter.addEventListener("click", function () {
    if (id > 1) {
        window.location.href = `datasheet.html?id=${parseInt(id) - 1}`;
    }
});
if (id <= 1) {
    prevCharacter.style.opacity = "0.5"; // Használj "=" jelet!
    prevCharacter.style.pointerEvents = "none"; // Ezzel kikapcsolhatod a kattintást
}

document.getElementById("nextCharacter").addEventListener("click", function () {
    if (id < maxCharacterId) {
        window.location.href = `datasheet.html?id=${parseInt(id) + 1}`;
    }
});

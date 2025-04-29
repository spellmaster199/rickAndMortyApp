import { fetchCharacterById } from "./api.js";

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

        document.title = `Rick and Morty App | ${character.name}`;
        document.querySelector("#id").textContent = character.id;
        document.querySelector("#name").textContent = character.name;
        document.querySelector("#species").textContent = character.species.charAt(0).toUpperCase() + character.species.slice(1);
        document.querySelector("#status").textContent = character.status.charAt(0).toUpperCase() + character.status.slice(1);
        document.querySelector("#gender").textContent = character.gender.charAt(0).toUpperCase() + character.gender.slice(1);
        document.querySelector("#origin").textContent = character.origin.name.charAt(0).toUpperCase() + character.origin.name.slice(1);
        document.querySelector("#created").textContent = character.created;
        document.querySelector("#characterImg").setAttribute("src", character.image);
    
}).catch(error => {
    console.error("An error occurred while retrieving the character.:", error);
    document.body.innerHTML = "<h3 style='color: red; text-align: center;'>An error occurred while retrieving character.</h3>";
});
} else {
console.error("No ID in the URL!");
document.body.innerHTML = "<h3 style='color: red; text-align: center;'>No ID in the URL!</h3>";
}


// Maximum ID count
fetch("https://rickandmortyapi.com/api/character/")
    .then(response => response.json())
    .then(data => {
        maxCharacterId = data.info.count;
    })
    .catch(error => console.error("Nem sikerült lekérdezni a maximális karakter ID-t:", error));

var prevCharacter = document.getElementById("prevCharacter");
prevCharacter.addEventListener("click", function () {
    if (id > 1) {
        window.location.href = `datasheet.html?id=${parseInt(id) - 1}`;
    }
});
if (id <= 1) {
    prevCharacter.style.opacity = "0.5";
    prevCharacter.style.pointerEvents = "none";
}

document.getElementById("nextCharacter").addEventListener("click", function () {
    if (id < maxCharacterId) {
        window.location.href = `datasheet.html?id=${parseInt(id) + 1}`;
    }
});

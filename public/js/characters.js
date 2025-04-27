import { fetchCharacters } from "./api.js";

const urlParams = new URLSearchParams(window.location.search);
let currentPage = parseInt(urlParams.get("page")) || 1;

if (!urlParams.has("page")) {
    urlParams.set("page", "1");
    window.history.replaceState(null, "", "?" + urlParams.toString());
}

fetchCharacters(currentPage).then(data => {
    console.log(data);

    let totalPages = data.info.pages;
    let prevPage = Math.max(currentPage - 1, 1);
    let nextPage = Math.min(currentPage + 1, totalPages);

    const paginationContainer = document.getElementById("paginationButtons");
    paginationContainer.innerHTML = "";

    // "Előző" gomb mindig megjelenik, de az első oldalon inaktív
    const prevLi = document.createElement("li");
    prevLi.classList.add("page-item");
    if (currentPage === 1) prevLi.classList.add("disabled");
    
    const prevLink = document.createElement("a");
    prevLink.classList.add("page-link");
    prevLink.href = `?page=${prevPage}`;
    prevLink.innerHTML = "&laquo;";
    
    prevLi.appendChild(prevLink);
    paginationContainer.appendChild(prevLi);

    // Lapszámozás generálása (3 oldalt mutat egyszerre)
    for (let i = Math.max(1, currentPage - 3); i <= Math.min(totalPages, currentPage + 3); i++) {
        const li = document.createElement("li");
        li.classList.add("page-item");
        if (i === currentPage) li.classList.add("active");
        
        const a = document.createElement("a");
        a.classList.add("page-link");
        a.href = `?page=${i}`;
        a.textContent = i;
        
        li.appendChild(a);
        paginationContainer.appendChild(li);
    }

    // "Következő" gomb mindig megjelenik, de az utolsó oldalon inaktív
    const nextLi = document.createElement("li");
    nextLi.classList.add("page-item");
    if (currentPage === totalPages) nextLi.classList.add("disabled");
    
    const nextLink = document.createElement("a");
    nextLink.classList.add("page-link");
    nextLink.href = `?page=${nextPage}`;
    nextLink.innerHTML = "&raquo;";
    
    nextLi.appendChild(nextLink);
    paginationContainer.appendChild(nextLi);

    for (var i = 0; i < data.results.length; i++) {
        //Elemek letrehozasa
        var col = document.createElement("section");
        /*col.setAttribute("class", "col-12 col-md-6 col-lg-3 my-3");*/
        col.setAttribute("class", "col-12 col-md-4 col-lg-3 my-3");
        var card = document.createElement("section");
        card.setAttribute("class", "card w-100 h-100");

        var img = document.createElement("img");
        img.setAttribute("class", "card-img-top");
        img.setAttribute("src", data.results[i].image);
        img.setAttribute("alt", data.results[i].name);
        img.setAttribute("title", data.results[i].name);

        var cardBody = document.createElement("section");
        cardBody.setAttribute("class", "card-body");

        var h5 = document.createElement("h5");
        h5.setAttribute("class", "card-title");
        h5.appendChild(document.createTextNode(`${data.results[i].id} | ${data.results[i].name}`));

        var ul = document.createElement("ul");

        var li1 = document.createElement("li");
        var b1 = document.createElement("b");
        b1.appendChild(document.createTextNode("Species: "));

        var li2 = document.createElement("li");
        var b2 = document.createElement("b");
        b2.appendChild(document.createTextNode("Status: "));


        var a = document.createElement("a");
        a.setAttribute("class", "btn btn-secondary w-100 card-button");
        a.setAttribute("href", "http://127.0.0.1:5500/public/datasheet.html?id=" + data.results[i].id);
        a.appendChild(document.createTextNode("Find out more »"));

        //Kartya osszerakasa
        li1.appendChild(b1);
        li2.appendChild(b2);

        li1.appendChild(document.createTextNode(data.results[i].species.charAt(0).toUpperCase() + data.results[i].species.slice(1)));
        li2.appendChild(document.createTextNode(data.results[i].status.charAt(0).toUpperCase() + data.results[i].status.slice(1)));

        ul.appendChild(li1);
        ul.appendChild(li2);


        cardBody.appendChild(h5);
        cardBody.appendChild(ul);
        cardBody.appendChild(a);

        card.appendChild(img);
        card.appendChild(cardBody);

        col.appendChild(card);

        document.querySelector("#cards").appendChild(col);
    }
    
}).catch(error => {
    console.error("An error occurred while retrieving characters.:", error);
    document.body.innerHTML= "<h3 style='color: red; text-align: center;'>An error occurred while retrieving characters.</h3>";
});












/*
var ah = oldal - 2;
var fh = oldal + 2;

if (ah <= 1) {
    ah = 1
    fh = 5;
}

if (fh > json.info.pages) {
    fh = json.info.pages;
    ah = json.info.pages - 4;
}

for (var i = ah; i <= fh; i++) {

    var li = document.createElement("li");
    li.setAttribute("class", "page-item");

    var a = document.createElement("a");
    a.setAttribute("class", "page-link");
    a.setAttribute("href", "http://127.0.0.1:5500/src/characters/characters.html?page=" + i);
    a.appendChild(document.createTextNode(i));

    li.appendChild(a);
    document.getElementById("lapozoGombok").appendChild(li);
}

var li = document.createElement("li");
li.setAttribute("class", "page-item");

var a = document.createElement("a");
a.setAttribute("class", "page-link");
a.setAttribute("href", "http://127.0.0.1:5500/src/characters/characters.html?page=" + json.info.pages);
a.setAttribute("aria-label", "Next");

var span = document.createElement("span");
span.setAttribute("aria-hidden", "true");
span.appendChild(document.createTextNode("»"));

a.appendChild(span);
li.appendChild(a);
document.getElementById("lapozoGombok").appendChild(li);
*/
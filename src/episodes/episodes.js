/*import { fetchEpisodes } from "../api.js";

fetchEpisodes(1).then(data => {
    console.log(data);

    var ah = oldal - 1;
    var fh = oldal + 1;

    if (ah <= 1) {
        ah = 1
        fh = 3;
    }

    if (fh > data.info.pages) {
        fh = data.info.pages;
        ah = data.info.pages - 2;
    }

    //Lapozo gombok generalasa
    for (var i = ah; i <= fh; i++) {

        var li = document.createElement("li");
        li.setAttribute("class", "page-item");

        var a = document.createElement("a");
        a.setAttribute("class", "page-link");
        a.setAttribute("href", "http://127.0.0.1:5500/rickandmorty/episodes.html?page=" + i);
        a.appendChild(document.createTextNode(i));

        li.appendChild(a);
        document.getElementById("lapozoGombok").appendChild(li);
    }

    var li = document.createElement("li");
    li.setAttribute("class", "page-item");

    var a = document.createElement("a");
    a.setAttribute("class", "page-link");
    a.setAttribute("href", "http://127.0.0.1:5500/rickandmorty/episodes.html?page=" + data.info.pages);
    a.setAttribute("aria-label", "Next");

    var span = document.createElement("span");
    span.setAttribute("aria-hidden", "true");
    span.appendChild(document.createTextNode("»"));

    a.appendChild(span);
    li.appendChild(a);
    document.getElementById("lapozoGombok").appendChild(li);

    for (var i = 0; i < data.results.length; i++) {
        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var td5 = document.createElement("td");
        var td6 = document.createElement("td");

        td1.appendChild(document.createTextNode(data.results[i].id));
        td2.appendChild(document.createTextNode(data.results[i].name));
        td3.appendChild(document.createTextNode(data.results[i].air_date));
        td4.appendChild(document.createTextNode(data.results[i].episode));
        td5.appendChild(document.createTextNode(data.results[i].characters.length));
        td6.appendChild(document.createTextNode(data.results[i].created));

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);

        document.getElementById("torzs").appendChild(tr);
    }

}).catch(error => {
    console.error("An error occurred while retrieving episodes.:", error);
    document.write("An error occurred while retrieving espisodes.")
});*/

import { fetchEpisodes } from "../api.js";

// Aktuális oldalszám lekérése az URL-ből
const urlParams = new URLSearchParams(window.location.search);
let currentPage = parseInt(urlParams.get("page")) || 1;

// Ha nincs "page" az URL-ben, állítsuk be 1-re és frissítsük az URL-t
if (!urlParams.has("page")) {
    urlParams.set("page", "1");
    window.history.replaceState(null, "", "?" + urlParams.toString());
}

fetchEpisodes(currentPage).then(data => {
    console.log(data);

    let prevPage = Math.max(currentPage - 1, 1);
    let nextPage = Math.min(currentPage + 1, data.info.pages);

    const paginationContainer = document.getElementById("paginationButtons");
    paginationContainer.innerHTML = ""; // Törli a régi gombokat

    // "Előző" gomb
    if (currentPage > 1) {
        const prevLi = document.createElement("li");
        prevLi.classList.add("page-item");
        
        const prevLink = document.createElement("a");
        prevLink.classList.add("page-link");
        prevLink.href = `?page=${prevPage}`;
        prevLink.innerHTML = "&laquo;";
        
        prevLi.appendChild(prevLink);
        paginationContainer.appendChild(prevLi);
    }

    // Lapszámozás generálása (3 oldalt mutat egyszerre)
    for (let i = Math.max(1, currentPage - 1); i <= Math.min(data.info.pages, currentPage + 1); i++) {
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

    // "Következő" gomb
    if (currentPage < data.info.pages) {
        const nextLi = document.createElement("li");
        nextLi.classList.add("page-item");
        
        const nextLink = document.createElement("a");
        nextLink.classList.add("page-link");
        nextLink.href = `?page=${nextPage}`;
        nextLink.innerHTML = "&raquo;";
        
        nextLi.appendChild(nextLink);
        paginationContainer.appendChild(nextLi);
    }

    // Epizódok táblázatának feltöltése
    const tbody = document.getElementById("trunk");
    tbody.innerHTML = ""; // Régi tartalom törlése

    data.results.forEach(episode => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${episode.id}</td>
            <td>${episode.name}</td>
            <td>${episode.air_date}</td>
            <td>${episode.episode}</td>
            <td>${episode.characters.length}</td>
            <td>${episode.created}</td>
        `;

        tbody.appendChild(tr);
    });

}).catch(error => {
    console.error("An error occurred while retrieving episodes:", error);
    document.body.innerHTML = "<p style='color: red; text-align: center;'>An error occurred while retrieving episodes.</p>";
});


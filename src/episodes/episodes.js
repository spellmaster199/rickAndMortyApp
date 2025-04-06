import { fetchEpisodes } from "../api.js";

const urlParams = new URLSearchParams(window.location.search);
let currentPage = parseInt(urlParams.get("page")) || 1;

if (!urlParams.has("page")) {
    urlParams.set("page", "1");
    window.history.replaceState(null, "", "?" + urlParams.toString());
}

fetchEpisodes(currentPage).then(data => {
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
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
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

    // Epizódok táblázatának feltöltése
    const tbody = document.querySelector("#trunk");
    tbody.innerHTML = "";

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
    document.body.innerHTML = "<h3 style='color: red; text-align: center;'>An error occurred while retrieving episodes.</h3>";
});

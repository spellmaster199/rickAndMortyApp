import { fetchLocations } from "../api.js";

const urlParams = new URLSearchParams(window.location.search);
let currentPage = parseInt(urlParams.get("page")) || 1;

if (!urlParams.has("page")) {
    urlParams.set("page", "1");
    window.history.replaceState(null, "", "?" + urlParams.toString());
}

fetchLocations(currentPage).then(data => {
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
    for (let i = Math.max(1, currentPage - 6); i <= Math.min(totalPages, currentPage + 6); i++) {
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

    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td4 = document.createElement("td");
    var td5 = document.createElement("td");
    var td6 = document.createElement("td");

    td1.appendChild(document.createTextNode(data.results[i].id));
    td2.appendChild(document.createTextNode(data.results[i].name));
    td3.appendChild(document.createTextNode(data.results[i].type));
    td4.appendChild(document.createTextNode(data.results[i].dimension.charAt(0).toUpperCase() + data.results[i].dimension.slice(1)));
    td5.appendChild(document.createTextNode(data.results[i].residents.length));
    td6.appendChild(document.createTextNode(data.results[i].created));

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);

    document.querySelector("#trunk").appendChild(tr);
}
    
}).catch (error => {
    console.error("An error occurred while retrieving locations.:", error);
    document.body.innerHTML = "<h3 style='color: red; text-align: center;'>An error occurred while retrieving locations.</h3>";
});
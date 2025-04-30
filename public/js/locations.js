/*import { fetchLocations } from "./api.js";

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

    const prevLi = document.createElement("li");
    prevLi.classList.add("page-item");
    if (currentPage === 1) prevLi.classList.add("disabled");
    
    const prevLink = document.createElement("a");
    prevLink.classList.add("page-link");
    prevLink.href = `?page=${prevPage}`;
    prevLink.innerHTML = "&laquo;";
    
    prevLi.appendChild(prevLink);
    paginationContainer.appendChild(prevLi);

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
});*/


import { fetchLocations } from "./api.js";


//*** PAGE ***
// Helper to get the current page from URL or default to 1
const getCurrentPage = () => {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("page")) || 1;
};

// Ensure "page" exists in URL query params
const ensurePageParam = page => {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("page")) {
        params.set("page", page);
        window.history.replaceState(null, "", `?${params.toString()}`);
    }
};
//***/


//*** PAGINATION ***/
// Create a pagination button (li > a)
const createPageItem = (page, label, { disabled = false, active = false } = {}) => {
    const li = document.createElement("li");
    li.classList.add("page-item");
    if (disabled) li.classList.add("disabled");
    if (active) li.classList.add("active");

    const a = document.createElement("a");
    a.classList.add("page-link");
    a.href = `?page=${page}`;
    a.innerHTML = label;

    li.appendChild(a);
    return li;
};

// Render pagination controls around the current page
const renderPagination = (totalPages, currentPage) => {
    const container = document.getElementById("paginationButtons");
    container.innerHTML = "";

    const prevPage = Math.max(currentPage - 1, 1);
    const nextPage = Math.min(currentPage + 1, totalPages);

    // Previous button
    container.append(
        createPageItem(prevPage, "&laquo;", { disabled: currentPage === 1 })
    );

    // Numbered pages (current ±2)
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);
    for (let i = start; i <= end; i++) {
        container.append(
            createPageItem(i, i, { active: i === currentPage })
        );
    }

    // Next button
    container.append(
        createPageItem(nextPage, "&raquo;", { disabled: currentPage === totalPages })
    );
};
//***/


//*** CONTENT ***/
// Render episode rows in the table 
const renderLocations = results => {
    const tbody = document.querySelector("#trunk");
    tbody.innerHTML = "";

    results.forEach(({id, name, type, dimension, residents, created}) => {
        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.appendChild(document.createTextNode(id));

        const td2 = document.createElement("td");
        td2.appendChild(document.createTextNode(name));

        const td3 = document.createElement("td");
        td3.appendChild(document.createTextNode(type));

        const td4 = document.createElement("td");
        const capitalizedDimension = dimension.charAt(0).toUpperCase() + dimension.slice(1);
        td4.appendChild(document.createTextNode(capitalizedDimension));

        const td5 = document.createElement("td");
        td5.appendChild(document.createTextNode(residents.length));

        const td6 = document.createElement("td");
        td6.appendChild(document.createTextNode(created));

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);

        tbody.appendChild(tr);
    });
};
//***/


//*** ERROR ***/
// Handle fetch errors
const handleError = error => {
  console.error("Error fetching locations:", error);
  document.body.innerHTML =
    "<h3 style='color: red; text-align: center;'>An error occurred while retrieving locations.</h3>";
};
//***/


//*** FETCH ***/
// Initialize pagination and data fetch
const init = async () => {
  const currentPage = getCurrentPage();
  ensurePageParam(currentPage);

  try {
    const data = await fetchLocations(currentPage);
    const { info: { pages: totalPages }, results } = data;
    renderPagination(totalPages, currentPage);
    renderLocations(results);
  } catch (error) {
    handleError(error);
  }
};
//***/


// Run on DOM ready
window.addEventListener("DOMContentLoaded", () => init());
/*import { fetchCharacters } from "./api.js";

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

    const prevLi = document.createElement("li");
    prevLi.classList.add("page-item");
    if (currentPage === 1) prevLi.classList.add("disabled");
    
    const prevLink = document.createElement("a");
    prevLink.classList.add("page-link");
    prevLink.href = `?page=${prevPage}`;
    prevLink.innerHTML = "&laquo;";
    
    prevLi.appendChild(prevLink);
    paginationContainer.appendChild(prevLi);

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
        var col = document.createElement("section");
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
        a.setAttribute("href", "/datasheet.html?id=" + data.results[i].id);
        a.appendChild(document.createTextNode("Find out more »"));

        
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
});*/


import { fetchCharacters } from "./api.js";

//*** PAGE ***
const getCurrentPage = () => {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("page")) || 1;
};

const ensurePageParam = page => {
  const params = new URLSearchParams(window.location.search);
  if (!params.has("page")) {
    params.set("page", page);
    window.history.replaceState(null, "", `?${params.toString()}`);
  }
};
//***/

//*** ERROR ***
const handleError = error => {
  console.error("Error fetching characters:", error);
  document.body.innerHTML =
    "<h3 style='color: red; text-align: center;'>An error occurred while retrieving characters.</h3>";
};
//***/

//*** PAGINATION ***
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

const renderPagination = (totalPages, currentPage) => {
  const container = document.getElementById("paginationButtons");
  container.innerHTML = "";

  const prevPage = Math.max(currentPage - 1, 1);
  const nextPage = Math.min(currentPage + 1, totalPages);

  container.append(
    createPageItem(prevPage, "&laquo;", { disabled: currentPage === 1 })
  );

  const start = Math.max(1, currentPage - 3);
  const end = Math.min(totalPages, currentPage + 3);
  for (let i = start; i <= end; i++) {
    container.append(
      createPageItem(i, i, { active: i === currentPage })
    );
  }

  container.append(
    createPageItem(nextPage, "&raquo;", { disabled: currentPage === totalPages })
  );
};
//***/

//*** CONTENT ***
const renderCharacters = characters => {
  const container = document.querySelector("#cards");
  container.innerHTML = "";

  characters.forEach(({ id, name, image, species, status }) => {
    const col = document.createElement("section");
    col.className = "col-12 col-md-4 col-lg-3 my-3";

    const card = document.createElement("section");
    card.className = "card w-100 h-100";

    const img = document.createElement("img");
    img.className = "card-img-top";
    img.src = image;
    img.alt = name;
    img.title = name;

    const cardBody = document.createElement("section");
    cardBody.className = "card-body";

    const h5 = document.createElement("h5");
    h5.className = "card-title";
    h5.textContent = `${id} | ${name}`;

    const ul = document.createElement("ul");

    const li1 = document.createElement("li");
    const b1 = document.createElement("b");
    b1.textContent = "Species: ";
    li1.appendChild(b1);
    li1.appendChild(document.createTextNode(capitalize(species)));

    const li2 = document.createElement("li");
    const b2 = document.createElement("b");
    b2.textContent = "Status: ";
    li2.appendChild(b2);
    li2.appendChild(document.createTextNode(capitalize(status)));

    ul.appendChild(li1);
    ul.appendChild(li2);

    const btn = document.createElement("a");
    btn.className = "btn btn-secondary w-100 card-button";
    btn.href = `/datasheet.html?id=${id}`;
    btn.textContent = "Find out more »";

    cardBody.appendChild(h5);
    cardBody.appendChild(ul);
    cardBody.appendChild(btn);

    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);
    container.appendChild(col);
  });
};

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
//***/

//*** INIT ***
const init = async () => {
  const currentPage = getCurrentPage();
  ensurePageParam(currentPage);

  try {
    const data = await fetchCharacters(currentPage);
    const { info: { pages: totalPages }, results } = data;

    renderPagination(totalPages, currentPage);
    renderCharacters(results);
  } catch (error) {
    handleError(error);
  }
};
//***/

//*** RUN ***
window.addEventListener("DOMContentLoaded", () => init());
//***

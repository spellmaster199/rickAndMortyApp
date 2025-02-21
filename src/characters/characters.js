import { fetchCharacters } from "../api.js";

fetchCharacters(1).then(data => {
    console.log(data);

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

        /*var h6 = document.createElement("h6");
        h6.setAttribute("class", "card-title");
        h6.appendChild(document.createTextNode(json.results[i].id));*/

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

        var li3 = document.createElement("li");
        var b3 = document.createElement("b");
        b3.appendChild(document.createTextNode("Gender: "));

        var a = document.createElement("a");
        a.setAttribute("class", "btn btn-outline-success w-100 card-button");
        a.setAttribute("href", "http://127.0.0.1:5500/src/datasheet/datasheet.html?id=" + data.results[i].id);
        a.appendChild(document.createTextNode("Find out more »"));

        //Kartya osszerakasa
        li1.appendChild(b1);
        li2.appendChild(b2);
        li3.appendChild(b3);

        li1.appendChild(document.createTextNode(data.results[i].species));
        li2.appendChild(document.createTextNode(data.results[i].status));
        li3.appendChild(document.createTextNode(data.results[i].gender));

        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);


        cardBody.appendChild(h5);
        cardBody.appendChild(ul);
        cardBody.appendChild(a);

        card.appendChild(img);
        card.appendChild(cardBody);

        col.appendChild(card);

        document.getElementById("cards").appendChild(col);
    }
})












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
import { fetchLocations } from "../api.js";

fetchLocations(1).then(data => {
    console.log(data);

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

        document.getElementById("torzs").appendChild(tr);
    }
    
}).catch(error => {
    console.error("An error occurred while retrieving locations.:", error);
    document.write("An error occurred while retrieving locations.")
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

        //Lapozo gombok generalasa
        for (var i = ah; i <= fh; i++) {

            var li = document.createElement("li");
            li.setAttribute("class", "page-item");

            var a = document.createElement("a");
            a.setAttribute("class", "page-link");
            a.setAttribute("href", "http://127.0.0.1:5500/rickandmorty/locations.html?page=" + i);
            a.appendChild(document.createTextNode(i));

            li.appendChild(a);
            document.getElementById("lapozoGombok").appendChild(li);

        var li = document.createElement("li");
        li.setAttribute("class", "page-item");

        var a = document.createElement("a");
        a.setAttribute("class", "page-link");
        a.setAttribute("href", "http://127.0.0.1:5500/rickandmorty/locations.html?page=" + json.info.pages);
        a.setAttribute("aria-label", "Next");

        var span = document.createElement("span");
        span.setAttribute("aria-hidden", "true");
        span.appendChild(document.createTextNode("»"));

        a.appendChild(span);
        li.appendChild(a);
        document.getElementById("lapozoGombok").appendChild(li);
        }
*/
document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");

    // Kártyák megjelenítése görgetésre
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target); // Ne figyeljük tovább, ha már megjelent
            }
        });
    }, { threshold: 0.04 }); // Kisebb küszöbérték a simább animáció érdekében

    // Az index oldalon levő kártyákhoz hozzáadjuk az animációt
    cards.forEach(card => observer.observe(card));

    // Ha a karakterek oldalán vagyunk, akkor az API-ból betöltött kártyákhoz is hozzáadjuk az animációt
    if (document.body.contains(document.getElementById("cards"))) {
        waitForCharacterCards(observer);
    }
});

function waitForCharacterCards(observer) {
    const container = document.getElementById("cards");

    if (!container) return;

    const observerConfig = { childList: true, subtree: true };
    const mutationObserver = new MutationObserver(() => {
        const characterCards = container.querySelectorAll(".card");
        characterCards.forEach(card => observer.observe(card));
    });

    mutationObserver.observe(container, observerConfig);
}




/*document.addEventListener("DOMContentLoaded", function () {
    const quotes = document.querySelectorAll(".quote-section blockquote");
    const cards = document.querySelectorAll(".card");

    // Az összes idézet elrejtése
    quotes.forEach(quote => quote.style.display = "none");

    // Véletlenszerű idézet kiválasztása és megjelenítése
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quotes[randomIndex].style.display = "block";
    setTimeout(() => quotes[randomIndex].classList.add("show"), 100);

    // Kártyák megjelenítése görgetésre
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.05 });

    // Az index oldalon levő kártyákhoz hozzáadjuk az animációt
    cards.forEach(card => observer.observe(card));

    // Ha a karakterek oldalán vagyunk, akkor az API-ból betöltött kártyákhoz is hozzáadjuk az animációt
    if (document.body.contains(document.getElementById("cards"))) {
        waitForCharacterCards(observer);
    }
});

function waitForCharacterCards(observer) {
    const container = document.getElementById("cards");

    const observerConfig = { childList: true, subtree: true };
    const mutationObserver = new MutationObserver(() => {
        const characterCards = container.querySelectorAll(".card");
        characterCards.forEach(card => observer.observe(card));
    });

    mutationObserver.observe(container, observerConfig);
}*/


/* Another Fun fact */
/*const funFacts = [
    "Rick's burps are actually Justin Roiland burping on command.",
    "Mr. Meeseeks were inspired by the Oompa Loompas from Willy Wonka.",
    "The show was originally based on a parody of 'Back to the Future'.",
    "Rick's portal gun might be based on Sliders, a 90s sci-fi show.",
    "Birdperson’s original name was Phoenixperson.",
    "Interdimensional Cable episodes were mostly improvised by Roiland.",
    "Wubba Lubba Dub-Dub actually means 'I am in great pain, please help me.'"
];

function getRandomFact() {
    return funFacts[Math.floor(Math.random() * funFacts.length)];
}

document.addEventListener("DOMContentLoaded", () => {
    const factElement = document.getElementById("funFact");
    const newFactBtn = document.getElementById("newFactBtn");

    function updateFact() {
        factElement.style.opacity = 0;
        setTimeout(() => {
            factElement.textContent = getRandomFact();
            factElement.style.opacity = 1;
        }, 500);
    }

    newFactBtn.addEventListener("click", updateFact);
    updateFact();
});*/

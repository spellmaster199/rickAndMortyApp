
document.addEventListener("DOMContentLoaded", function () {
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
}



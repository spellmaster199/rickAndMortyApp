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

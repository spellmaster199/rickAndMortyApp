document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.04 });

    cards.forEach(card => observer.observe(card));

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

//Safari viewpoint fill
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    window.addEventListener('scroll', () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, { passive: true });
}

  
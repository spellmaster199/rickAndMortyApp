const quotes = [
    { text: "Nobody exists on purpose. Nobody belongs anywhere. We're all going to die. Come watch TV.", author: "Morty Smith" },
    { text: "Wubba lubba dub-dub!", author: "Rick Sanchez" },
    { text: "What, so everyone’s supposed to sleep every single night now? You realize that nighttime makes up half of all time?", author: "Rick Sanchez" },
    { text: "Sometimes science is more art than science, Morty. Lot of people don’t get that.", author: "Rick Sanchez" },
    { text: "Get Schwifty!", author: "Rick Sanchez" },
    { text: "You gotta get schwifty in here!", author: "Rick Sanchez" },
    { text: "I turned myself into a pickle, Morty! I'm Pickle Rick!", author: "Pickle Rick" },
    { text: "I'm sorry, but your opinion means very little to me.", author: "Rick Sanchez" },
    { text: "Rick, when you say you made an exact replica of the house, did you mean you made an exact replica of the house?", author: "Morty Smith" },
    { text: "To live is to risk it all; otherwise, you're just an inert chunk of randomly assembled molecules drifting wherever the universe blows you.", author: "Rick Sanchez" },
    { text: "Don't think about it. Just have fun!", author: "Rick Sanchez" },
    { text: "I’m not arguing that, I’m just saying— you’re not special.", author: "Rick Sanchez" },
    { text: "What about the reality where Hitler cured cancer, Morty? The answer is: don't think about it.", author: "Rick Sanchez" },
    { text: "Listen, Morty, I hate to break it to you, but what people call 'love' is just a chemical reaction that compels animals to breed.", author: "Rick Sanchez" },
    { text: "Boom! Big reveal! I turned myself into a pickle!", author: "Pickle Rick" },
    { text: "Sometimes you gotta get schwifty!", author: "Rick Sanchez" },
    { text: "I just want to say that you’re really great and I know that I’m not programmed to say that, but I do. I love you.", author: "Butter Robot" },
    { text: "Hey, take it easy, Rick! That’s dark!", author: "Morty Smith" },
    { text: "Summer, next time we're hiding in a cabin during a thunderstorm, let's be more specific!", author: "Rick Sanchez" },
    { text: "You son of a b****, I’m in!", author: "Rick Sanchez" },
    { text: "I’m sorry, but your opinion means very little to me.", author: "Rick Sanchez" },
    { text: "Sometimes science is more art than science, Morty.", author: "Rick Sanchez" },
    { text: "Don’t look at me like that. You’re making me self-conscious about my neck game.", author: "Rick Sanchez" },
    { text: "You’re young, you have your whole life ahead of you, and your anal cavity is still taut yet malleable.", author: "Rick Sanchez" },
    { text: "I don’t get it, and I don’t need to.", author: "Rick Sanchez" },
    { text: "Existence is pain to a Meeseeks, Jerry!", author: "Mr. Meeseeks" },
    { text: "Sometimes we have to do things that we don’t want to do.", author: "Rick Sanchez" },
    { text: "Having a family doesn’t mean that you stop being an individual.", author: "Beth Smith" },
    { text: "Welcome to the club, pal.", author: "Rick Sanchez" },
    { text: "Get your shit together. Get it all together and put it in a backpack. All your shit. So it’s together.", author: "Rick Sanchez" }
];

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

document.addEventListener("DOMContentLoaded", () => {
    const quoteContainer = document.querySelector(".quote-section .container");

    if (quoteContainer) {
        const randomQuote = getRandomQuote();
        quoteContainer.innerHTML = `
            <blockquote class="blockquote">
                <p class="mb-4">${randomQuote.text}</p>
                <footer class="blockquote-footer">${randomQuote.author}</footer>
            </blockquote>
        `;

        setTimeout(() => {
            quoteContainer.querySelector("blockquote").classList.add("show");
        }, 100);
    }
});

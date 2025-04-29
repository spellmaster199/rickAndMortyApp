/*document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("-teDqgRZ7qRyVGlD7");

    document.querySelector("#contact-form").addEventListener("submit", function (event) {
        event.preventDefault(); 

        emailjs.sendForm("service_rickAndMorthyApp", "template_rickAndMorthy", this).then(
            function () {
                alert("Your message has been sent successfully!");
            },
            function (error) {
                alert("Failed to send message. Please try again.");
                console.error("Error:", error);
            }
        );
    });
});*/

document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("-teDqgRZ7qRyVGlD7");

    document.querySelector("#contact-form").addEventListener("submit", function (event) {
        event.preventDefault();

        emailjs.sendForm("service_rickAndMorthyApp", "template_rickAndMorthy", this)
            .then(() => showCustomAlert("✅ I'm Mr. Meeseeks! Message sent successfully!"))
            .catch(() => showCustomAlert("❌ Oops! Meeseeks failed to deliver the message!"));

        this.reset();
    });

    /*function showCustomAlert(message) {
        const alertBox = document.getElementById("custom-alert");
        const alertText = alertBox.querySelector(".custom-alert-text");
        alertText.textContent = message;
    
        alertBox.classList.add("show");
    
        setTimeout(() => {
            alertBox.classList.remove("show");
        }, 4000);
    }*/
        function showCustomAlert(message) {
            const alertBox = document.getElementById("custom-alert");
            const alertText = alertBox.querySelector(".custom-alert-text");
            alertText.textContent = message;
        
            // Ha korábban maradt hide, szedjük le
            alertBox.classList.remove("hide");
            // Indítsuk el a megjelenési animációt
            alertBox.classList.add("show");
        
            // 4s múlva indítsuk az eltűnési animációt
            setTimeout(() => {
                alertBox.classList.add("hide");
        
                // 400ms után (amikor a CSS-transition véget ér) takarítsuk el a show és hide osztályokat
                setTimeout(() => {
                    alertBox.classList.remove("show", "hide");
                }, 400);
            }, 4000);
        }
                
});

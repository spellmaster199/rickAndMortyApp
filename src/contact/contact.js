/*document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("-teDqgRZ7qRyVGlD7"); // Ezt az EmailJS dashboardon találod

    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Ne nyíljon meg új oldal

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

    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault(); 

        // Ellenőrizzük, hogy a reCAPTCHA ki lett-e töltve
        let recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            alert("Please complete the reCAPTCHA!");
            return;
        }

        emailjs.sendForm("service_rickAndMorthyApp", "template_rickAndMorthy", this).then(
            function () {
                alert("Your message has been sent successfully!");
                grecaptcha.reset(); // reCAPTCHA újraindítása
            },
            function (error) {
                alert("Failed to send message. Please try again.");
                console.error("Error:", error);
            }
        );
    });
});

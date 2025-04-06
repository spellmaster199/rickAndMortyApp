document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("-teDqgRZ7qRyVGlD7");

    document.querySelector("#contact-form").addEventListener("submit", function (event) {
        event.preventDefault(); 

        emailjs.sendForm("service_rickAndMorthyApp", "template_rickAndMorthy", this).then(
            function () {
                alert("Your message has been sent successfully!");
                /*grecaptcha.reset();*/ // reCAPTCHA újraindítása
            },
            function (error) {
                alert("Failed to send message. Please try again.");
                console.error("Error:", error);
            }
        );
    });
});

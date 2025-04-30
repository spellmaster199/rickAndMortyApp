document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("-teDqgRZ7qRyVGlD7");

    document.querySelector("#contact-form").addEventListener("submit", function (event) {
        event.preventDefault();

        emailjs.sendForm("service_rickAndMorthyApp", "template_rickAndMorthy", this)
            .then(() => showCustomAlert("✅ I'm Mr. Meeseeks! Message sent successfully!"))
            .catch(() => showCustomAlert("❌ Oops! Meeseeks failed to deliver the message!"));

        this.reset();
    });

    function showCustomAlert(message) {
        const alertBox = document.getElementById("custom-alert");
        const alertText = alertBox.querySelector(".custom-alert-text");
        alertText.textContent = message;
        
        alertBox.classList.remove("hide");
        alertBox.classList.add("show");
        
        setTimeout(() => {
            alertBox.classList.add("hide");
        
            setTimeout(() => {
                alertBox.classList.remove("show", "hide");
            }, 400);
        }, 4000);
    }       
});
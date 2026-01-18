const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");

const scriptURL = "https://script.google.com/macros/s/AKfycbzoZBqICWkzl4HvQSv7drar8_19OM01n6t8kh4SUHkLLGt4VfzZvmj7kmFDxxPgvD13/exec";

form.addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if(name === "" || email === "" || subject === "" || message === ""){
        statusText.innerHTML = "⚠️ Please fill all fields properly.";
        return;
    }

    statusText.innerHTML = "Sending... ⏳";

    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify({ name, email, subject, message })
    })
    .then(res => {
        statusText.innerHTML = "✅ Message sent successfully!";
        form.reset();
    })
    .catch(err => {
        statusText.innerHTML = "❌ Error sending message.";
    });
});

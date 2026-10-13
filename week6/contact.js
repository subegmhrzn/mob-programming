
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    set
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB4e6NXf3IYlYq1QA8V0YMB8MOLN5s1gb8",
    authDomain: "mobile-programming-14a21.firebaseapp.com",
    databaseURL: "https://mobile-programming-14a21-default-rtdb.firebaseio.com/",
    projectId: "mobile-programming-14a21",
    storageBucket: "mobile-programming-14a21.firebasestorage.app",
    messagingSenderId: "357763476248",
    appId: "1:357763476248:web:0632d730b07662fcfa4c6d"
};

// Initialize Firebase once
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Get the form elements
const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const statusMessage = document.getElementById("statusMessage");

// Submit the feedback form
form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Collect data from the form
    const feedbackData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        subject: document.getElementById("subject").value,
        feedback: document.getElementById("feedback").value.trim(),
        submittedAt: new Date().toISOString()
    };

    // Check required fields
    if (
        !feedbackData.name ||
        !feedbackData.email ||
        !feedbackData.subject ||
        !feedbackData.feedback
    ) {
        statusMessage.textContent = "Please fill in all fields.";
        statusMessage.style.color = "red";
        return;
    }

    // Prevent multiple submissions
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";
    statusMessage.textContent = "";

    try {
        // Create a unique location for this feedback
        const feedbackRef = push(ref(database, "feedback"));

        // Save feedback to Firebase
        await set(feedbackRef, feedbackData);

        // Show success message only after saving succeeds
        statusMessage.textContent =
            "Thank you! Your feedback has been submitted successfully.";
        statusMessage.style.color = "green";

        console.log("Feedback saved successfully!");
        console.log("Feedback ID:", feedbackRef.key);

        // Clear the form
        form.reset();

    } catch (error) {
        console.error("Firebase submission error:", error);

        if (error.code === "PERMISSION_DENIED" ||
            error.code === "PERMISSION_DENIED:") {
            statusMessage.textContent =
                "Permission denied. Check your Firebase Database Rules.";
        } else {
            statusMessage.textContent =
                "Submission failed: " + error.message;
        }

        statusMessage.style.color = "red";

    } finally {
        // Enable the button again
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Feedback";
    }
});

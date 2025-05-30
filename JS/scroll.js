// Get the scroll to top button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
scrollToTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// --- New functionality for smooth scrolling navigation links ---

// Get all navigation links
const navLinks = document.querySelectorAll('.nav-link');

// Add click event listener to each navigation link
navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Get the target section's ID from the href attribute
        const targetId = this.getAttribute('href'); // e.g., "#parrilla-section"

        // Get the target element using the ID
        const targetElement = document.querySelector(targetId);

        // If the target element exists, scroll to it smoothly
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth', // Enable smooth scrolling
                block: 'start'      // Scroll to the start of the element
            });
        }
    });
});

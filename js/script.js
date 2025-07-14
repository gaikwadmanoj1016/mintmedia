// Load common header
fetch("/common/header.html")
    .then(res => res.text())
    .then(html => {
        document.getElementById("common-header").innerHTML = html;
    })
    .catch(error => console.error("Failed to load header:", error));
fetch("/common/footer.html")
    .then((res) => res.text())
    .then((html) => {
        document.getElementById("common-footer").innerHTML = html;
    });
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle functionality
    // const mobileMenuButton = document.getElementById('mobile-menu-button');

    // if (mobileMenuButton && mobileMenu) {
    //     mobileMenuButton.addEventListener('click', () => {
    //         mobileMenu.classList.toggle('hidden'); // Toggle the 'hidden' class
    //     });

    //     // Close mobile menu when a link is clicked
    //     const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    //     mobileMenuLinks.forEach(link => {
    //         link.addEventListener('click', () => {
    //             mobileMenu.classList.add('hidden'); // Hide the menu
    //         });
    //     });
    // }

    // Basic form submission handling for the contact form (client-side only)
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            // In a real application, you would send this data to a server
            // using fetch() or XMLHttpRequest.
            // For demonstration purposes, we'll just show a success message
            formMessage.textContent = 'Thank you for your message! We will get back to you shortly.';
            formMessage.classList.remove('hidden', 'text-red-600');
            formMessage.classList.add('text-green-600', 'block');
            contactForm.reset(); // Clear the form after a simulated send

            // Hide the message after a few seconds
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        });
    }

    // Dynamic Blog Post Loading
    fetch("assets/data/blogs.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(blogs => {
            const blogContainer = document.getElementById("blog-posts");
            if (blogContainer) {
                // Display up to 3 blog posts for the landing page for better layout
                blogs.slice(0, 3).forEach(blog => {
                    const card = `
                        <div class="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 ease-in-out">
                            <img src="${blog.image}" alt="${blog.title}" class="w-full h-48 object-cover">
                            <div class="p-6 text-left">
                                <h3 class="text-xl font-semibold text-gray-900 mb-2">${blog.title}</h3>
                                <p class="text-gray-600 text-sm mb-4">${blog.description}</p>
                                <a href="/pages/blog.html?id=${blog.id}" class="text-blue-600 hover:text-blue-800 font-medium text-sm">Read More &rarr;</a>
                            </div>
                        </div>`;
                    blogContainer.innerHTML += card;
                });
            }
        })
        .catch(error => console.error("Failed to load blogs:", error));
    setTimeout(() => {
        console.log("Delayed message after 2 seconds.");
        const toggleButton = document.getElementById("mobile-menu-button");
        const mobileMenu = document.getElementById('mobile-menu');
        const isMenuOpen = () => mobileMenu.style.maxHeight && mobileMenu.style.maxHeight !== "0px";

        toggleButton.addEventListener("click", () => {
            console.log("clicked");

            if (isMenuOpen()) {
                mobileMenu.style.maxHeight = "0px";
            } else {
                mobileMenu.style.maxHeight = mobileMenu.scrollHeight + "px";
            }
        });

        // Optional: close menu when clicking a link
        // mobileMenu.querySelectorAll("a").forEach(link => {
        //     link.addEventListener("click", () => {
        //         mobileMenu.style.maxHeight = "0px";
        //     });
        // });
    }, 2000);
});
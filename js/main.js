// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // NAVIGATION MENU TOGGLE
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('header');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Header background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Skill bar animation
    const skillSections = document.querySelectorAll('.skill-progress');
    
    // Initialize Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const percent = progress.getAttribute('data-progress');
                progress.style.width = percent;
                // Unobserve after animation is triggered
                observer.unobserve(progress);
            }
        });
    }, { threshold: 0.5 });

    // Observe all skill bars
    skillSections.forEach(section => {
        observer.observe(section);
    });

    // Form submission
    // const contactForm = document.getElementById('contactForm');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
            
    //         // Here you would normally send the form data to a server
    //         // For GitHub Pages, you'll need a third-party form service
    //         // Example with formspree.io:
            
    //         const formData = new FormData(contactForm);
    //         const name = formData.get('name');
            
    //         // Show success message (in a real app, do this after successful submission)
    //         alert(`Thanks for your message, ${name}! Since this is hosted on GitHub Pages, you'd need to integrate with a form service like Formspree, EmailJS, or Google Forms to actually send emails.`);
            
    //         // Reset form
    //         contactForm.reset();
    //     });
    // }
    // Add this to your main.js file (replace the current contact form code)

// Handle form submission with Formspree
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Create success message element (hidden initially)
            let successMessage = document.getElementById('formSuccessMessage');
            if (!successMessage) {
                successMessage = document.createElement('div');
                successMessage.id = 'formSuccessMessage';
                successMessage.className = 'form-success-message';
                successMessage.style.display = 'none';
                successMessage.innerHTML = '<p>Thank you for your message! I\'ll get back to you soon.</p>';
                contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
                
                // Add CSS for the success message
                const style = document.createElement('style');
                style.textContent = `
                    .form-success-message {
                        background-color: #d4edda;
                        color: #155724;
                        padding: 15px;
                        margin-top: 20px;
                        border-radius: 5px;
                        text-align: center;
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Prepare the form data
            const formData = new FormData(this);
            
            // Submit the form to Formspree
            fetch('https://formspree.io/f/xwpovjej', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Hide the form
                contactForm.style.display = 'none';
                
                // Show success message
                successMessage.style.display = 'block';
                
                // Reset the form
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                submitBtn.textContent = 'Error - Try Again';
            })
            .finally(() => {
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Don't run on links that aren't anchor links
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height for accurate scrolling
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = targetPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll for section elements
    const revealElements = document.querySelectorAll('.section-title, .about-content, .project-card, .skills-container, .contact-content');
    
    const scrollAnimation = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                scrollAnimation.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollAnimation.observe(element);
    });
    
    // Custom CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
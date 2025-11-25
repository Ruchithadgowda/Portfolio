
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animate skill bars on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.setProperty('--progress-width', `${progress}%`);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all skill categories
document.querySelectorAll('.skill-category').forEach(category => {
    observer.observe(category);
});

// Form Validation
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const formSuccess = document.getElementById('formSuccess');

// Validation functions
function validateName(name) {
    if (!name.trim()) {
        return 'Name is required';
    }
    if (name.trim().length < 2) {
        return 'Name must be at least 2 characters long';
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
        return 'Name can only contain letters and spaces';
    }
    return '';
}

function validateEmail(email) {
    if (!email.trim()) {
        return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        return 'Please enter a valid email address';
    }
    return '';
}

function validateMessage(message) {
    if (!message.trim()) {
        return 'Message is required';
    }
    if (message.trim().length < 10) {
        return 'Message must be at least 10 characters long';
    }
    if (message.trim().length > 500) {
        return 'Message must be less than 500 characters';
    }
    return '';
}

// Real-time validation
nameInput.addEventListener('blur', () => {
    const error = validateName(nameInput.value);
    if (error) {
        nameInput.classList.add('error');
        nameError.textContent = error;
    } else {
        nameInput.classList.remove('error');
        nameError.textContent = '';
    }
});

nameInput.addEventListener('input', () => {
    if (nameInput.classList.contains('error')) {
        const error = validateName(nameInput.value);
        if (!error) {
            nameInput.classList.remove('error');
            nameError.textContent = '';
        }
    }
});

emailInput.addEventListener('blur', () => {
    const error = validateEmail(emailInput.value);
    if (error) {
        emailInput.classList.add('error');
        emailError.textContent = error;
    } else {
        emailInput.classList.remove('error');
        emailError.textContent = '';
    }
});

emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
        const error = validateEmail(emailInput.value);
        if (!error) {
            emailInput.classList.remove('error');
            emailError.textContent = '';
        }
    }
});

messageInput.addEventListener('blur', () => {
    const error = validateMessage(messageInput.value);
    if (error) {
        messageInput.classList.add('error');
        messageError.textContent = error;
    } else {
        messageInput.classList.remove('error');
        messageError.textContent = '';
    }
});

messageInput.addEventListener('input', () => {
    if (messageInput.classList.contains('error')) {
        const error = validateMessage(messageInput.value);
        if (!error) {
            messageInput.classList.remove('error');
            messageError.textContent = '';
        }
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous errors
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    nameInput.classList.remove('error');
    emailInput.classList.remove('error');
    messageInput.classList.remove('error');
    formSuccess.classList.remove('show');
    
    // Validate all fields
    const nameErrorMsg = validateName(nameInput.value);
    const emailErrorMsg = validateEmail(emailInput.value);
    const messageErrorMsg = validateMessage(messageInput.value);
    
    let hasErrors = false;
    
    if (nameErrorMsg) {
        nameInput.classList.add('error');
        nameError.textContent = nameErrorMsg;
        hasErrors = true;
    }
    
    if (emailErrorMsg) {
        emailInput.classList.add('error');
        emailError.textContent = emailErrorMsg;
        hasErrors = true;
    }
    
    if (messageErrorMsg) {
        messageInput.classList.add('error');
        messageError.textContent = messageErrorMsg;
        hasErrors = true;
    }
    
    if (hasErrors) {
        // Scroll to first error
        const firstError = document.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
        return;
    }
    
    // Form is valid - show success message
    formSuccess.textContent = 'Thank you! Your message has been sent successfully.';
    formSuccess.classList.add('show');
    
    // Reset form
    contactForm.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        formSuccess.classList.remove('show');
    }, 5000);
    
    // In a real application, you would send the form data to a server here
    console.log('Form submitted:', {
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
    });
});

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 20px var(--shadow-lg)';
    } else {
        navbar.style.boxShadow = '0 2px 10px var(--shadow)';
    }
    
    lastScroll = currentScroll;
});

// Add fade-in animation on scroll
const fadeElements = document.querySelectorAll('.section');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// Initialize - make hero section visible immediately
document.querySelector('.hero').style.opacity = '1';
document.querySelector('.hero').style.transform = 'translateY(0)';


// Navigation and Scroll Effects
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Smooth scrolling and active link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile menu
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';

                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Update active link on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Back to top button
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Program tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Apply Now buttons
    const applyBtns = document.querySelectorAll('.apply-btn-nav, .admission-btn, .btn-primary');
    applyBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.classList.contains('btn-primary')) return;
            e.preventDefault();
            const admissionsSection = document.getElementById('admissions');
            admissionsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            aboutSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
});

// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const successAlert = document.getElementById('successAlert');

    // Form fields
    const fullName = document.getElementById('fullName');
    const emailAddress = document.getElementById('emailAddress');
    const phoneNumber = document.getElementById('phoneNumber');
    const inquiryType = document.getElementById('inquiryType');
    const messageText = document.getElementById('messageText');

    // Validation patterns
    const patterns = {
        name: /^[a-zA-Z\s]{2,}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^[\d\s\+\-\(\)]{10,}$/
    };

    // Validation functions
    function validateField(field, pattern, required = true) {
        const value = field.value.trim();
        const formField = field.closest('.form-field');

        if (required && value === '') {
            formField.classList.add('error');
            return false;
        }

        if (value !== '' && pattern && !pattern.test(value)) {
            formField.classList.add('error');
            return false;
        }

        formField.classList.remove('error');
        return true;
    }

    function validateSelect(select) {
        const formField = select.closest('.form-field');
        if (select.value === '') {
            formField.classList.add('error');
            return false;
        }
        formField.classList.remove('error');
        return true;
    }

    function validateMessage(textarea) {
        const formField = textarea.closest('.form-field');
        const value = textarea.value.trim();
        if (value.length < 10) {
            formField.classList.add('error');
            return false;
        }
        formField.classList.remove('error');
        return true;
    }

    // Real-time validation
    fullName.addEventListener('blur', function() {
        validateField(this, patterns.name);
    });

    emailAddress.addEventListener('blur', function() {
        validateField(this, patterns.email);
    });

    phoneNumber.addEventListener('blur', function() {
        validateField(this, patterns.phone, false);
    });

    inquiryType.addEventListener('change', function() {
        validateSelect(this);
    });

    messageText.addEventListener('blur', function() {
        validateMessage(this);
    });

    // Remove error on input
    [fullName, emailAddress, phoneNumber, messageText].forEach(field => {
        field.addEventListener('input', function() {
            if (this.closest('.form-field').classList.contains('error')) {
                if (this === messageText) {
                    if (this.value.trim().length >= 10) {
                        this.closest('.form-field').classList.remove('error');
                    }
                } else {
                    this.closest('.form-field').classList.remove('error');
                }
            }
        });
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Hide previous alerts
        successAlert.classList.remove('show');

        // Validate all fields
        const isNameValid = validateField(fullName, patterns.name);
        const isEmailValid = validateField(emailAddress, patterns.email);
        const isPhoneValid = validateField(phoneNumber, patterns.phone, false);
        const isTypeValid = validateSelect(inquiryType);
        const isMessageValid = validateMessage(messageText);

        const isFormValid = isNameValid && isEmailValid && isPhoneValid && isTypeValid && isMessageValid;

        if (isFormValid) {
            sendMessage();
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.form-field.error');
            if (firstError) {
                firstError.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    });

    // Send message function
    function sendMessage() {
        // Disable button
        submitButton.disabled = true;
        const buttonText = submitButton.querySelector('.button-text');
        buttonText.textContent = 'Sending...';

        // Collect form data
        const formData = {
            name: fullName.value.trim(),
            email: emailAddress.value.trim(),
            phone: phoneNumber.value.trim(),
            inquiry: inquiryType.value,
            message: messageText.value.trim()
        };

        // USING FORMSUBMIT.CO - Simple email service
        // Email configured to: haadipay@gmail.com
        
        const formSubmitData = new FormData();
        formSubmitData.append('name', formData.name);
        formSubmitData.append('email', formData.email);
        formSubmitData.append('phone', formData.phone || 'Not provided');
        formSubmitData.append('_subject', `New ${formData.inquiry} Inquiry from ${formData.name}`);
        formSubmitData.append('message', formData.message);
        formSubmitData.append('_captcha', 'false'); // Disable captcha for testing
        formSubmitData.append('_template', 'table'); // Nice email formatting

        // Send to FormSubmit
        fetch('https://formsubmit.co/haadipay@gmail.com', {
            method: 'POST',
            body: formSubmitData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showSuccess();
                contactForm.reset();
            } else {
                throw new Error('Failed to send');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            
            // Fallback: Try mailto method
            const mailtoLink = `mailto:haadipay@gmail.com?subject=${encodeURIComponent('New Inquiry: ' + formData.inquiry)}&body=${encodeURIComponent(
                `Name: ${formData.name}\n` +
                `Email: ${formData.email}\n` +
                `Phone: ${formData.phone || 'Not provided'}\n` +
                `Inquiry Type: ${formData.inquiry}\n\n` +
                `Message:\n${formData.message}`
            )}`;
            
            window.location.href = mailtoLink;
            
            setTimeout(() => {
                showSuccess();
                contactForm.reset();
            }, 1000);
        })
        .finally(() => {
            submitButton.disabled = false;
            buttonText.textContent = 'Send Message';
        });
    }

    // Show success message
    function showSuccess() {
        successAlert.classList.add('show');
        successAlert.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        // Hide after 5 seconds
        setTimeout(() => {
            successAlert.classList.remove('show');
        }, 5000);
    }
});

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll('.program-card, .facility-card, .research-card, .admission-box');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});
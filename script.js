/* ==========================================
   PREMIUM SCRIPT FOR JOSIKA S. PORTFOLIO
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. DISMISS PRELOADER
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }, 1200);
    });

    // Fallback in case load event already fired
    if (document.readyState === 'complete') {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 600);
        }, 1200);
    }

    // 2. CUSTOM CURSOR TRACKER
    const cursorDot = document.getElementById('custom-cursor-dot');
    const cursorOutline = document.getElementById('custom-cursor-outline');
    let dotX = 0, dotY = 0, outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        dotX = e.clientX;
        dotY = e.clientY;

        // Spotlight Glow Tracker
        const xPercent = (e.clientX / window.innerWidth) * 100;
        const yPercent = (e.clientY / window.innerHeight) * 100;
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    // Smooth lerping cursor outline animation
    function updateCursor() {
        const speed = 0.15; // smooth speed
        outlineX += (dotX - outlineX) * speed;
        outlineY += (dotY - outlineY) * speed;

        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;

        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;

        requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);

    // Hover state style transformations
    const interactiveElements = document.querySelectorAll('a, button, .interest-tag, .project-card, .cert-card, .timeline-content-card');
    interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.add('cursor-hover');
            document.body.classList.remove('cursor-hover');
        });
    });

    // 3. RESPONSIVE NAVIGATION MENU (HAMBURGER)
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburgerMenu.contains(e.target) && navMenu.classList.contains('active')) {
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // 4. STICKY HEADER & SCROLL PROGRESS
    const header = document.getElementById('main-header');
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    const backToTopBtn = document.getElementById('back-to-top-btn');

    window.addEventListener('scroll', () => {
        // Sticky Header toggle class
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll Progress calculation
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolledFraction = (window.scrollY / windowHeight) * 100;
        scrollProgressBar.style.width = `${scrolledFraction}%`;

        // Back to top button visibility toggle
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 5. TYPING TEXT ANIMATION
    const typingText = document.getElementById('typing-text');
    const roles = [
        "Electronics & Communication Engineering Student",
        "IoT & Embedded Systems Specialist"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function handleTyping() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40; // delete speed
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80; // normal typing speed
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing new word
        }

        setTimeout(handleTyping, typingSpeed);
    }

    // Launch typing loop
    if (typingText) {
        setTimeout(handleTyping, 1000);
    }

    // 6. SECTION REVEAL & INTERACTIVE STATS / SKILLS TRIGGER
    const sections = document.querySelectorAll('.section-reveal');
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    const statCounters = document.querySelectorAll('.stat-numberCount');

    let statsAnimated = false;

    // Helper function to animate number counters
    function animateCounters() {
        if (statsAnimated) return;
        statsAnimated = true;

        statCounters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const decimals = parseInt(counter.getAttribute('data-decimals')) || 0;
            const duration = 2000; // ms
            const stepTime = 30; // ms
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target.toFixed(decimals);
                    clearInterval(timer);
                } else {
                    counter.textContent = current.toFixed(decimals);
                }
            }, stepTime);
        });
    }

    // Helper function to animate skill progress fills
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const widthVal = bar.getAttribute('data-percent');
            bar.style.width = widthVal;
        });
    }

    // Intersection Observer configuration
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Specific component activations based on parent section visibility
                if (entry.target.id === 'about') {
                    animateCounters();
                }
                if (entry.target.id === 'skills') {
                    animateProgressBars();
                }

                // Keep observing but stop re-triggering entrance transitions
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 7. ACTIVE NAVIGATION TRACKING
    const navItems = document.querySelectorAll('.nav-link');

    function activeMenuHighlight() {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150; // offset header height
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active-link');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active-link');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', activeMenuHighlight);

    // 8. CONTACT FORM SIMULATOR WITH COMPREHENSIVE FEEDBACK
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // UI elements
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalBtnContent = submitBtn.innerHTML;

            // Change submit state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Transmitting...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
            formFeedback.textContent = '';
            formFeedback.className = 'form-feedback';

            // Simulate server network latency response
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;

                // Simulated validation response
                formFeedback.textContent = 'Connection Secured! Your message was transmitted successfully to Josika.';
                formFeedback.classList.add('success');

                // Clear fields
                contactForm.reset();

                // Auto hide message after 5 seconds
                setTimeout(() => {
                    formFeedback.style.opacity = '0';
                    setTimeout(() => {
                        formFeedback.textContent = '';
                        formFeedback.style.opacity = '1';
                        formFeedback.className = 'form-feedback';
                    }, 500);
                }, 5000);

            }, 1800);
        });
    }
});

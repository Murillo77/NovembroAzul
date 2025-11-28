// Smooth scroll animation on page load
document.addEventListener('DOMContentLoaded', function() {
    // Animate sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Add hover effect to sections
    sections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease-out';
        });

        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Animate header on load
    const header = document.querySelector('.header-content');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            header.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 100);
    }

    // Add ripple effect to ribbons
    const ribbons = document.querySelectorAll('.ribbon');
    ribbons.forEach(ribbon => {
        ribbon.addEventListener('mouseenter', function() {
            this.style.transform += ' scale(1.1)';
            this.style.transition = 'transform 0.3s ease-out';
        });

        ribbon.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.1)', '');
        });
    });

    // Smooth scroll for anchor links (if any are added in the future)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add parallax effect to header (subtle)
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        const header = document.querySelector('.header');
        
        if (header && currentScroll < header.offsetHeight) {
            const parallax = currentScroll * 0.5;
            header.style.transform = `translateY(${parallax}px)`;
        }
        
        lastScroll = currentScroll;
    }, { passive: true });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease-in';
            document.body.style.opacity = '1';
        }, 100);
    });

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Animate stats on scroll
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const statObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statCards = entry.target.querySelectorAll('.stat-card');
                    statCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 50);
                        }, index * 100);
                    });
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        statObserver.observe(statsSection);
    }
});


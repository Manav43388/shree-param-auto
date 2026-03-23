document.addEventListener('DOMContentLoaded', () => {

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Sticky Navbar
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Change icon
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section, header');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Intersection Observer for fade-in animations
    const faders = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);
    
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Number Counter Animation
    const numbers = document.querySelectorAll('.number');
    const numberObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                if (isNaN(finalValue)) return;
                const suffix = target.textContent.replace(/[0-9]/g, '');
                
                let current = 0;
                const increment = finalValue / 50; 
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= finalValue) {
                        target.textContent = finalValue + suffix;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.ceil(current) + suffix;
                    }
                }, 30);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    numbers.forEach(num => numberObserver.observe(num));

    // Auto-scroll reviews
    const slider = document.querySelector('.reviews-slider');
    if (slider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let autoScrollInterval;

        const startAutoScroll = () => {
            autoScrollInterval = setInterval(() => {
                if (slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth - 1)) {
                    slider.scrollLeft = 0;
                } else {
                    slider.scrollLeft += 1;
                }
            }, 30);
        };

        const stopAutoScroll = () => {
            clearInterval(autoScrollInterval);
        };

        slider.addEventListener('mouseenter', stopAutoScroll);
        slider.addEventListener('mouseleave', startAutoScroll);
        slider.addEventListener('touchstart', stopAutoScroll, {passive: true});
        slider.addEventListener('touchend', startAutoScroll);

        startAutoScroll();
        
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            stopAutoScroll();
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
            startAutoScroll();
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
            startAutoScroll();
        });
        slider.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    // Hero Parallax effect
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');
    
    if (hero && heroBg) {
        hero.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            heroBg.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
        });
        hero.addEventListener('mouseleave', () => {
            heroBg.style.transform = `scale(1.1) translate(0px, 0px)`;
            heroBg.style.transition = 'transform 0.5s ease';
        });
        hero.addEventListener('mouseenter', () => {
             heroBg.style.transition = 'none';
        });
    }
});

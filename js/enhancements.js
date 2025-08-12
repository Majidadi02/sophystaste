// Sophy's Taste Website Enhancements
// This file contains all interactive features and performance optimizations

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeEnhancements();
    });

    function initializeEnhancements() {
        // Initialize all enhancement features
        initSmoothScrolling();
        initHeaderScrollEffect();
        initLazyLoading();
        initButtonEffects();
        initAccessibility();
        initPerformanceOptimizations();
        initSEOStructuredData();
        initHamburgerMenu();
        
        console.log('Sophy\'s Taste website enhancements loaded successfully!');
    }

    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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
    }

    // Header scroll effect with transparency
    function initHeaderScrollEffect() {
        const header = document.getElementById('header');
        if (!header) return;

        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(255, 203, 153, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.backgroundColor = '#ffcb99';
                header.style.backdropFilter = 'none';
            }
        });
    }

    // Lazy loading for images with fade-in effect
    function initLazyLoading() {
        const images = document.querySelectorAll('img');
        if (images.length === 0) return;

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            img.style.opacity = '0';
            img.style.transform = 'scale(0.95)';
            img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            imageObserver.observe(img);
        });
    }

    // Enhanced button click effects with ripple
    function initButtonEffects() {
        const buttons = document.querySelectorAll('#button, #button2, #button3, .enhanced-button');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                createRippleEffect(this, e);
            });
        });
    }

    // Create ripple effect for buttons
    function createRippleEffect(button, event) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Accessibility improvements
    function initAccessibility() {
        // Keyboard navigation detection
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-navigation');
        });

        // Add skip to content link for screen readers
        addSkipToContentLink();
    }

    // Add skip to content link for accessibility
    function addSkipToContentLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #29170D;
            color: #ffcb99;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1001;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // Performance optimizations
    function initPerformanceOptimizations() {
        // Preload critical images
        const criticalImages = [
            'pictures/image2.jpg',
            'pictures/favourite recipe.jpg',
            'pictures/logo.png',
            'pictures/logo2.png'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });

        // Add performance monitoring
        if ('performance' in window) {
            window.addEventListener('load', function() {
                setTimeout(function() {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData && perfData.loadEventEnd) {
                        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                    }
                }, 0);
            });
        }
    }

    // SEO and structured data
    function initSEOStructuredData() {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "Sophy's Taste",
            "description": "Premium food service with crafted dishes, professional delivery, and hands-on training classes.",
            "url": "https://sophystaste.name.ng",
            "telephone": "+2347062613191",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "NG"
            },
            "servesCuisine": ["Nigerian", "International"],
            "priceRange": "$$",
            "image": "pictures/logo.png",
            "sameAs": [
                "https://www.instagram.com/sophys_taste/"
            ]
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }

    // Hamburger menu functionality
    function initHamburgerMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navList = document.querySelector('#mylist');
        
        if (hamburger && navList) {
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navList.classList.toggle('active');
            });
            
            // Close menu when clicking on a link
            const navLinks = navList.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    hamburger.classList.remove('active');
                    navList.classList.remove('active');
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!hamburger.contains(event.target) && !navList.contains(event.target)) {
                    hamburger.classList.remove('active');
                    navList.classList.remove('active');
                }
            });
        }
    }

    // Add CSS styles for enhancements
    function addEnhancementStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Ripple effect styles */
            #button, #button2, #button3, .enhanced-button {
                position: relative;
                overflow: hidden;
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }

            /* Keyboard navigation styles */
            .keyboard-navigation a:focus,
            .keyboard-navigation button:focus {
                outline: 3px solid #ffcb99 !important;
                outline-offset: 2px !important;
            }

            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
                * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            }

            /* Loading states */
            .loading {
                opacity: 0.7;
                pointer-events: none;
            }

            /* Enhanced focus states */
            a:focus, button:focus, input:focus, textarea:focus {
                outline: 2px solid #ffcb99;
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize styles
    addEnhancementStyles();

    // Utility functions
    window.SophyTasteUtils = {
        // Debounce function for performance
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Throttle function for scroll events
        throttle: function(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        // Smooth scroll to element
        scrollToElement: function(elementId, offset = 0) {
            const element = document.getElementById(elementId);
            if (element) {
                const elementPosition = element.offsetTop - offset;
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
            }
        },

        // Add loading state to element
        setLoading: function(element, isLoading) {
            if (isLoading) {
                element.classList.add('loading');
            } else {
                element.classList.remove('loading');
            }
        }
    };

})(); 

document.getElementById("printButton").onclick = function printRecipe() {
    const content = document.getElementById("recipe").innerHTML;
      const printWindow = window.open("", "", "height=600,width=800");
      printWindow.document.write("<html><head><title>Print Recipe</title>");
      printWindow.document.write("<style>body{font-family:montserrat;padding:20px;} h2,h4{color:#29170D;} ul,ol{margin-left:20px;}</style>");
      printWindow.document.write("</head><body>");
      printWindow.document.write(content);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
}

 
  const quoteText = document.getElementById("quote-text");
  const quoteAuthor = document.getElementById("quote-author");
  const newQuoteBtn = document.getElementById("new-quote");

  async function getFoodQuote() {
    try {
      const res = await fetch("https://food-quote-api.vercel.app/api/foodquote");
      const data = await res.json();

      quoteText.textContent = `"${data.quote}"`;
      quoteAuthor.textContent = `— ${data.author}`;
    } catch (error) {
      quoteText.textContent = "Oops! Couldn't load a quote.";
      quoteAuthor.textContent = "";
      console.error("Error fetching quote:", error);
    }
  }

  // Load a quote when page opens
  window.addEventListener("load", getFoodQuote);
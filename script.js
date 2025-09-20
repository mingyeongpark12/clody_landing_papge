// DOM Elements
const popup = document.getElementById('popup');
const popupClose = document.getElementById('popupClose');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Popup functionality
function showPopup() {
    setTimeout(() => {
        popup.style.display = 'block';
        popup.style.animation = 'slideInUp 0.5s ease-out';
    }, 3000);
}

function hidePopup() {
    popup.style.animation = 'slideOutDown 0.3s ease-in';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 300);
}

// Popup event listeners
popupClose.addEventListener('click', hidePopup);

// Show popup after page load
window.addEventListener('load', showPopup);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .step, .review-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    
    if (hero && heroBackground) {
        const rate = scrolled * -0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
});

// Button hover effects
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn-primary, .btn-app-store, .btn-google-play, .btn-send');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
});

// Mobile menu toggle (if needed)
function createMobileMenu() {
    const nav = document.querySelector('.nav');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    const headerActions = document.querySelector('.header-actions');
    headerActions.insertBefore(mobileMenuBtn, headerActions.firstChild);
    
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('mobile-nav-active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Initialize mobile menu for small screens
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }
    
    .mobile-menu-btn {
        display: none;
        background: none;
        border: none;
        font-size: 24px;
        color: #2c3e50;
        cursor: pointer;
        padding: 10px;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block;
        }
        
        .nav {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav.mobile-nav-active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .mobile-menu-btn.active {
            color: #e74c3c;
        }
    }
    
    .fade-in {
        animation: fadeIn 0.6s ease-in;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Add fade-in animation to sections
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        if (scrollTop + windowHeight > sectionTop + 100) {
            section.classList.add('fade-in');
        }
    });
});

// App store button functionality
document.addEventListener('DOMContentLoaded', () => {
    const appStoreButtons = document.querySelectorAll('.btn-app-store');
    const googlePlayButtons = document.querySelectorAll('.btn-google-play');
    
    appStoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Add your App Store link here
            window.open('https://apps.apple.com/app/clody', '_blank');
        });
    });
    
    googlePlayButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Add your Google Play link here
            window.open('https://play.google.com/store/apps/details?id=com.clody.app', '_blank');
        });
    });
});

// Login button functionality
document.addEventListener('DOMContentLoaded', () => {
    const loginButtons = document.querySelectorAll('.btn-login');
    
    loginButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Add your login functionality here
            alert('로그인 기능은 준비 중입니다.');
        });
    });
});

// Primary CTA button functionality
document.addEventListener('DOMContentLoaded', () => {
    const primaryButtons = document.querySelectorAll('.btn-primary');
    
    primaryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Scroll to download section
            const downloadSection = document.getElementById('download');
            if (downloadSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = downloadSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

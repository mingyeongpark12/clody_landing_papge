// DOM Elements
// 팝업 요소 삭제됨
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

// 팝업 기능 제거됨

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

// Counter animation for effects section
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.effects .count');
    if (counters.length === 0) return;

    const animate = (el) => {
        const target = parseFloat(el.getAttribute('data-target'));
        const isDecimal = String(target).includes('.');
        const duration = 1200; // ms
        const start = performance.now();
        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const value = target * progress;
            el.textContent = isDecimal ? value.toFixed(1) : Math.round(value);
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                animate(el);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => io.observe(c));
});

// Guide images - simple hover effects (no dynamic functionality needed)
document.addEventListener('DOMContentLoaded', () => {
    const guideImages = document.querySelectorAll('.guide-image');
    
    guideImages.forEach(image => {
        image.addEventListener('mouseenter', () => {
            image.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        image.addEventListener('mouseleave', () => {
            image.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Features section - thought bubble animation
document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card');
    const sadLody = document.querySelector('.sad-lody');
    
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // 로디를 먼저 애니메이션
                if (sadLody) {
                    setTimeout(() => {
                        sadLody.classList.add('animate');
                    }, 500);
                }
                
                // 로디가 나타난 후 말풍선들을 가운데 -> 왼쪽 -> 오른쪽 순서로 애니메이션
                const order = [1, 0, 2]; // 두 번째(가운데), 첫 번째(왼쪽), 세 번째(오른쪽)
                order.forEach((cardIndex, delay) => {
                    setTimeout(() => {
                        featureCards[cardIndex].classList.add('animate');
                    }, delay * 800 + 1500); // 1.5초, 2.3초, 3.1초
                });
                
                // 한 번만 실행되도록 observer 해제
                featureObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    // Features 섹션 관찰
    const featuresSection = document.querySelector('.features');
    if (featuresSection) {
        featureObserver.observe(featuresSection);
    }
});

// Effects section - independent animation
document.addEventListener('DOMContentLoaded', () => {
    const effectsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                triggerEffectsAnimation();
                // 한 번만 실행되도록 observer 해제
                effectsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    // Effects 섹션 관찰
    const effectsSection = document.querySelector('.effects');
    if (effectsSection) {
        effectsObserver.observe(effectsSection);
    }
});

// Effects section animation trigger with number counting
function triggerEffectsAnimation() {
    const effectsTitle = document.querySelector('.effects .section-title');
    const effectsSubtitle = document.querySelector('.effects .section-subtitle');
    const effectCards = document.querySelectorAll('.effect-card');
    
    // 제목과 부제목을 먼저 애니메이션
    if (effectsTitle) {
        effectsTitle.classList.add('animate');
    }
    
    setTimeout(() => {
        if (effectsSubtitle) {
            effectsSubtitle.classList.add('animate');
        }
    }, 300);
    
    // 효과 카드들을 순차적으로 애니메이션
    effectCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate');
            
            // 숫자 카운팅 애니메이션
            const countElement = card.querySelector('.count');
            if (countElement) {
                const target = parseInt(countElement.getAttribute('data-target'));
                animateNumber(countElement, target);
            }
        }, index * 200 + 800); // 0.8초, 1초, 1.2초
    });
}

// Number counting animation
function animateNumber(element, target) {
    element.classList.add('animate');
    let current = 0;
    const increment = target / 60; // 1초 동안 60프레임
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16); // 60fps
}

// Reviews masonry grid - animate on scroll
document.addEventListener('DOMContentLoaded', () => {
    const reviewCards = document.querySelectorAll('.review-card-new');
    
    // Intersection Observer for reviews
    const reviewObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1
    });

    reviewCards.forEach(card => {
        card.style.animationPlayState = 'paused';
        reviewObserver.observe(card);
    });
});

// App store button functionality
document.addEventListener('DOMContentLoaded', () => {
    const appStoreButtons = document.querySelectorAll('.btn-app-store');
    const googlePlayButtons = document.querySelectorAll('.btn-google-play');
    
    appStoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.open('https://apps.apple.com/kr/app/%ED%81%B4%EB%A1%9C%EB%94%94-%ED%96%89%EC%9A%B4%EC%9D%84-%EC%A0%84%ED%95%98%EB%8A%94-%EA%B0%90%EC%82%AC%EC%9D%BC%EA%B8%B0/id6511215518', '_blank');
        });
    });
    
    googlePlayButtons.forEach(button => {
        button.addEventListener('click', () => {
            window.open('https://play.google.com/store/apps/details?id=com.sopt.clody&referrer=utm_source%3Dinstagram%26utm_medium%3Dbio%26utm_content%3Dmain_profile_link%26utm_campaign%3Dinstagram_playstore_profile_link&fbclid=https://play.google.com/store/apps/details?id=com.sopt.clody&referrer=utm_source%3Dinstagram%26utm_medium%3Dbio%26utm_content%3Dmain_profile_link%26utm_campaign%3Dinstagram_playstore_profile_link&fbclid=PAZXh0bgNhZW0CMTEAAaelbIQ_lIzL2b9MU5uI6mopk6PvOKhcxyaxvoexQOL451sRinX4XoCpQteRsw_aem_dAmms7Z-toja67RkXFl7DQ-toja67RkXFl7DQ', '_blank');
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

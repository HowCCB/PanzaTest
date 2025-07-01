// Language Toggle Functionality
const langButtons = document.querySelectorAll('.lang-btn');
const elementsToTranslate = document.querySelectorAll('[data-en], [data-zh]');
const placeholderElements = document.querySelectorAll('[data-placeholder-en], [data-placeholder-zh]');

let currentLang = 'en';

function switchLanguage(lang) {
    currentLang = lang;
    
    // Update button states
    langButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update text content
    elementsToTranslate.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update placeholder text
    placeholderElements.forEach(element => {
        const placeholder = element.getAttribute(`data-placeholder-${lang}`);
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });
}

// Language button event listeners
langButtons.forEach(button => {
    button.addEventListener('click', () => {
        switchLanguage(button.dataset.lang);
    });
});

// Smooth scrolling for navigation links
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Animation observer will be initialized in the main DOMContentLoaded event

// Waitlist form submission
const waitlistForm = document.querySelector('.waitlist-form');
if (waitlistForm) {
const emailInput = waitlistForm.querySelector('input[type="email"]');
const submitBtn = waitlistForm.querySelector('.submit-btn');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    
    if (email && isValidEmail(email)) {
        // Simulate form submission
        submitBtn.innerHTML = `
            <span>${currentLang === 'en' ? 'Joining...' : '加入中...'}</span>
            <i class="fas fa-spinner fa-spin"></i>
        `;
        
        setTimeout(() => {
            submitBtn.innerHTML = `
                <span>${currentLang === 'en' ? 'Welcome aboard!' : '欢迎加入！'}</span>
                <i class="fas fa-check"></i>
            `;
            submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00cc6a)';
            emailInput.value = '';
        }, 2000);
        
        setTimeout(() => {
            submitBtn.innerHTML = `
                <span>${currentLang === 'en' ? 'Join Waitlist' : '加入等候名单'}</span>
                <i class="fas fa-arrow-right"></i>
            `;
            submitBtn.style.background = 'linear-gradient(135deg, #40e0d0, #00bfff)';
        }, 4000);
    } else {
        // Show error state
        emailInput.style.borderColor = '#ff4444';
        emailInput.style.boxShadow = '0 0 20px rgba(255, 68, 68, 0.2)';
        
        setTimeout(() => {
            emailInput.style.borderColor = 'rgba(64, 224, 208, 0.3)';
            emailInput.style.boxShadow = 'none';
        }, 3000);
    }
});
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Floating cards animation enhancement
const floatingCards = document.querySelectorAll('.floating-card');

floatingCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.1) translateY(-10px)';
        card.style.boxShadow = '0 20px 40px rgba(64, 224, 208, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1) translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = {
        '.stars': scrolled * 0.5,
        '.galaxy': scrolled * 0.3,
        '.hero-visual': scrolled * 0.2
    };
    
    Object.entries(parallaxElements).forEach(([selector, offset]) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.transform = `translateY(${offset}px)`;
        }
    });
});

// Interactive placeholder hover effects
const placeholders = document.querySelectorAll('.feature-placeholder');

placeholders.forEach(placeholder => {
    placeholder.addEventListener('mouseenter', () => {
        const icon = placeholder.querySelector('i');
        if (icon) {
        icon.style.transform = 'scale(1.2) rotate(360deg)';
        icon.style.transition = 'all 0.6s ease';
        }
    });
    
    placeholder.addEventListener('mouseleave', () => {
        const icon = placeholder.querySelector('i');
        if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Enhanced CTA button effects
const ctaButtons = document.querySelectorAll('.cta-button');

ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
    });
    
    button.addEventListener('click', (e) => {
        // Ripple effect
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Slogan Pages Functionality - Progressive Scroll Animation
class SloganPages {
    constructor() {
        this.pages = document.querySelectorAll('.slogan-page');
        this.container = document.querySelector('.slogan-pages');
        this.observer = null;
        
        if (!this.pages.length || !this.container) {
            console.warn('Slogan pages elements not found');
            return;
        }
        
        this.init();
    }
    
    init() {
        // Create intersection observer for scroll-triggered animations
        this.setupIntersectionObserver();
        
        // Add smooth scroll behavior for scroll arrows
        const scrollArrows = document.querySelectorAll('.scroll-arrow');
        scrollArrows.forEach(arrow => {
            arrow.addEventListener('click', () => {
                this.scrollToNext(arrow);
            });
        });
    }
    
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '-20% 0px -20% 0px', // Trigger when 60% of element is visible
            threshold: [0, 0.3, 0.6, 1]
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const page = entry.target;
                const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.3;
                
                if (isVisible) {
                    page.classList.add('in-view');
                    this.animatePageElements(page, true);
                } else {
                    page.classList.remove('in-view');
                    this.animatePageElements(page, false);
                }
            });
        }, options);
        
        // Observe all slogan pages
        this.pages.forEach(page => {
            this.observer.observe(page);
        });
    }
    
    animatePageElements(page, isVisible) {
        const text = page.querySelector('.slogan-text');
        const visual = page.querySelector('.slogan-visual');
        const number = page.querySelector('.slogan-number');
        const pageIndex = parseInt(page.dataset.index);
        
        if (isVisible) {
            // Animate text first
            if (text) {
                text.style.opacity = '1';
                text.style.transform = 'translateY(0)';
            }
            
            // Animate visual with delay
            if (visual) {
                setTimeout(() => {
                    visual.style.opacity = '1';
                    if (window.innerWidth > 1200) {
                        visual.style.transform = 'translateX(0)';
                    } else {
                        visual.style.transform = 'translateY(0)';
                    }
                }, 300);
            }
            
            // Page-specific animations
            this.animatePageSpecific(page, pageIndex, true);
            
        } else {
            // Reset animations
            if (text) {
                text.style.opacity = '0';
                text.style.transform = 'translateY(80px)';
            }
            
            if (visual) {
                visual.style.opacity = '0';
                if (window.innerWidth > 1200) {
                    visual.style.transform = 'translateX(60px)';
                } else {
                    visual.style.transform = 'translateY(60px)';
                }
            }
            
            this.animatePageSpecific(page, pageIndex, false);
        }
    }
    
    animatePageSpecific(page, pageIndex, isVisible) {
        const delay = isVisible ? 600 : 0;
        
        switch(pageIndex) {
            case 0: // Academic Feast
                const plates = page.querySelectorAll('.academic-plate');
                const avatars = page.querySelectorAll('.user-avatar, .panza-avatar');
                
                plates.forEach((plate, index) => {
                    setTimeout(() => {
                        if (isVisible) {
                            plate.style.opacity = '1';
                            plate.style.transform = 'scale(1)';
                        } else {
                            plate.style.opacity = '0';
                            plate.style.transform = 'scale(0.8)';
                        }
                    }, delay + (index * 150));
                });
                
                avatars.forEach((avatar, index) => {
                    setTimeout(() => {
                        if (isVisible) {
                            avatar.style.opacity = '1';
                            avatar.style.transform = 'scale(1)';
                        } else {
                            avatar.style.opacity = '0';
                            avatar.style.transform = 'scale(0.8)';
                        }
                    }, delay + 300 + (index * 100));
                });
                break;
                
            case 1: // Operating System
                const windows = page.querySelectorAll('.window');
                
                windows.forEach((window, index) => {
                    setTimeout(() => {
                        if (isVisible) {
                            window.style.opacity = '1';
                            window.style.transform = 'translateY(0)';
                        } else {
                            window.style.opacity = '0';
                            window.style.transform = 'translateY(20px)';
                        }
                    }, delay + (index * 100));
                });
                break;
                
            case 2: // Knowledge Exploration
                const explorers = page.querySelectorAll('.explorer-dot');
                const regions = page.querySelectorAll('.region');
                
                explorers.forEach((explorer, index) => {
                    setTimeout(() => {
                        if (isVisible) {
                            explorer.style.opacity = '1';
                            explorer.style.transform = 'scale(1)';
                        } else {
                            explorer.style.opacity = '0';
                            explorer.style.transform = 'scale(0.8)';
                        }
                    }, delay + (index * 100));
                });
                
                regions.forEach((region, index) => {
                    setTimeout(() => {
                        if (isVisible) {
                            region.style.opacity = '1';
                            region.style.transform = 'scale(1)';
                        } else {
                            region.style.opacity = '0';
                            region.style.transform = 'scale(0.8)';
                        }
                    }, delay + 200 + (index * 150));
                });
                break;
        }
    }
    
    scrollToNext(arrow) {
        const currentPage = arrow.closest('.slogan-page');
        let nextElement;
        
        if (currentPage) {
            // If we're in a slogan page, go to next slogan page or features
            nextElement = currentPage.nextElementSibling || document.querySelector('#features');
        } else {
            // If we're in hero section, go to first slogan page
            nextElement = document.querySelector('.slogan-page[data-index="0"]');
        }
        
        if (nextElement) {
            nextElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Features Slider Functionality
class FeaturesSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.feature-card');
        this.indicators = document.querySelectorAll('.indicator');
        this.progressFill = document.querySelector('.progress-fill');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds
        
        // 检查必要元素是否存在
        if (!this.slides.length || !this.progressFill || !this.prevBtn || !this.nextBtn) {
            console.warn('Features slider elements not found');
            return;
        }
        
        this.init();
    }
    
    init() {
        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Add indicator click listeners
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Pause autoplay on hover
        const slider = document.querySelector('.features-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => this.stopAutoPlay());
            slider.addEventListener('mouseleave', () => this.startAutoPlay());
        }
        
        // Initial update
        this.updateSlider();
        
        // Start autoplay after initial setup
        this.startAutoPlay();
    }
    
    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.currentSlide = index;
            this.updateSlider();
            this.resetAutoPlay();
        }
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
        this.resetAutoPlay();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider();
        this.resetAutoPlay();
    }
    
    updateSlider() {
        // Update slides
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });
        
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
        
        // Update progress bar
        if (this.progressFill && this.totalSlides > 0) {
            const progressWidth = ((this.currentSlide + 1) / this.totalSlides) * 100;
            this.progressFill.style.width = `${progressWidth}%`;
        }
    }
    
    startAutoPlay() {
        this.stopAutoPlay(); // 先清除之前的定时器
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set default language on page load
    switchLanguage(currentLang);
    
    // Initialize animations observer
    const animateElements = document.querySelectorAll('.advantage-item, .timeline-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add scroll functionality for hero section scroll arrow
    const heroScrollArrow = document.querySelector('.hero .scroll-arrow');
    if (heroScrollArrow) {
        heroScrollArrow.addEventListener('click', () => {
            const firstSloganPage = document.querySelector('.slogan-page[data-index="0"]');
            if (firstSloganPage) {
                firstSloganPage.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Initialize slogan pages
    setTimeout(() => {
        window.sloganPages = new SloganPages();
    }, 100);
    
    // Initialize features slider with a small delay to ensure DOM is ready
    setTimeout(() => {
        window.featuresSlider = new FeaturesSlider();
    }, 200);
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.8s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// === Supabase 全局变量方式 ===
// 请确保 index.html 中已添加：
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>

const supabaseUrl = 'https://ufuodqokhbcjihqcejzj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmdW9kcW9raGJjamlocWNlanpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTkyODEsImV4cCI6MjA2Njg3NTI4MX0.iXhXpryzYnkYThsSGvq9UHr5BIUz8Udic48Q9mwY1bU';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', function () {
  const emailInput = document.querySelector('.waitlist-form input[type="email"]');
  const submitBtn = document.querySelector('.waitlist-form .submit-btn');
  if (emailInput && submitBtn) {
    submitBtn.addEventListener('click', async function (e) {
      e.preventDefault();
      const email = emailInput.value.trim();
      if (!email) {
        alert('请输入邮箱');
        return;
      }
      try {
        const { data, error } = await supabase
          .from('waiting_list')
          .insert([{ email }]);
        if (!error) {
          alert('提交成功！');
          emailInput.value = '';
        } else {
          alert(error.message || '提交失败');
        }
      } catch {
        alert('网络错误');
      }
    });
  }
});
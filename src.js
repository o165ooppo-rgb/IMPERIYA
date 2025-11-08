// Плавная прокрутка для навигационных ссылок
document.addEventListener('DOMContentLoaded', function() {
    // Навигация
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Плавная прокрутка
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Закрыть мобильное меню после клика
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Мобильное меню
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Параллакс эффект для героя
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
    
    // Анимация появления элементов при скролле
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
    
    // Наблюдаем за элементами для анимации
    const animatedElements = document.querySelectorAll('.house-card, .feature, .event, .contact-form, .about-text');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Обработчик формы
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Анимация отправки
        const submitBtn = this.querySelector('button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        // Имитация отправки
        setTimeout(() => {
            alert('Ваше послание отправлено с вороном! Мы свяжемся с вами в ближайшее время.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
    
    // Эффект печатающего текста для заголовка
    const heroTitle = document.querySelector('.hero-title');
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Запуск эффекта печати после загрузки
    setTimeout(typeWriter, 1000);
    
    // Случайные цитаты Game of Thrones
    const quotes = [
        "«Когда вы играете в игру престолов, вы либо побеждаете, либо умираете»",
        "«Зима близко»",
        "«Ланистеры всегда платят свои долги»",
        "«В темноте нет ничего страшного. Это то, что в темноте»",
        "«Власть — опасная штука. Но кто-то должен ею обладать»"
    ];
    
    // Обновление цитаты каждые 10 секунд
    setInterval(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        document.querySelector('.hero-quote').textContent = randomQuote;
    }, 10000);
    
    // Эффект частиц для фона
    function createParticles() {
        const hero = document.querySelector('.hero');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = '#d4af37';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = Math.random() * 100 + 'vh';
            particle.style.opacity = Math.random() * 0.5;
            particle.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
            hero.appendChild(particle);
        }
    }
    
    // Стили для анимации частиц
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(100px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    createParticles();
    
    // Добавляем класс для мобильного меню в CSS
    const mobileMenuStyle = document.createElement('style');
    mobileMenuStyle.textContent = `
        @media (max-width: 768px) {
            .nav-menu.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: rgba(12, 12, 12, 0.98);
                padding: 2rem;
                border-top: 2px solid #d4af37;
            }
            
            .nav-toggle.active span:nth-child(1) {
                transform: rotate(-45deg) translate(-5px, 6px);
            }
            
            .nav-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .nav-toggle.active span:nth-child(3) {
                transform: rotate(45deg) translate(-5px, -6px);
            }
        }
    `;
    document.head.appendChild(mobileMenuStyle);
});

// Дополнительные эффекты при загрузке
window.addEventListener('load', function() {
    // Добавляем класс загрузки для плавного появления
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Анимация счетчиков для статистики (можно добавить позже)
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
});

// Обработка состояния скролла для навигации
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(12, 12, 12, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.5)';
    } else {
        navbar.style.background = 'rgba(12, 12, 12, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});
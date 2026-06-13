// Тёмная тема
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
themeToggle?.addEventListener('click', () => {
    const isDark = document.documentElement.hasAttribute('data-theme');
    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Мобильное меню
const mobileBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');
if (mobileBtn && nav) {
    mobileBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (icon) icon.classList.toggle('fa-times');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            if (mobileBtn.querySelector('i')) mobileBtn.querySelector('i').classList.add('fa-bars');
        });
    });
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileBtn.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            if (icon) { icon.classList.remove('fa-times'); icon.classList.add('fa-bars'); }
        }
    });
}

// Анимация счётчиков
const statNumbers = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            if (isNaN(target)) return;
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    entry.target.textContent = target;
                    clearInterval(timer);
                } else {
                    entry.target.textContent = Math.floor(current);
                }
            }, 30);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
statNumbers.forEach(el => counterObserver.observe(el));

// Анимация появления элементов
const animatedElements = document.querySelectorAll('.hero, .case-card, .mission-card, .skill-category, .about-container, .blog-card, .review-card');
const appearObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            appearObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
animatedElements.forEach(el => {
    el.classList.add('fade-up');
    appearObserver.observe(el);
});

// Скрытие хедера при скролле
let lastScroll = 0;
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (!header) return;
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('hide');
    } else {
        header.classList.remove('hide');
    }
    lastScroll = currentScroll;
});

// Форма обратной связи (имитация)
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactFormStatus');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const msg = document.getElementById('contactMessage').value.trim();
        if (!name || !email || !msg) {
            contactStatus.innerHTML = '<span style="color:#ff6b4a;">Заполните все поля</span>';
            return;
        }
        if (!/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(email)) {
            contactStatus.innerHTML = '<span style="color:#ff6b4a;">Введите корректный email</span>';
            return;
        }
        contactStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        setTimeout(() => {
            contactStatus.innerHTML = '<span style="color:#4ade80;">✅ Сообщение отправлено! Я свяжусь с вами.</span>';
            contactForm.reset();
            setTimeout(() => contactStatus.innerHTML = '', 5000);
        }, 1000);
    });
}

// Форма отзывов (имитация, можно заменить на Google Sheets)
const reviewForm = document.getElementById('reviewForm');
const reviewStatus = document.getElementById('reviewFormStatus');
if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reviewName').value.trim();
        const text = document.getElementById('reviewText').value.trim();
        if (!name || !text) {
            reviewStatus.innerHTML = '<span style="color:#ff6b4a;">Заполните имя и отзыв</span>';
            return;
        }
        reviewStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        setTimeout(() => {
            reviewStatus.innerHTML = '<span style="color:#4ade80;">✅ Спасибо! Отзыв будет опубликован после проверки.</span>';
            reviewForm.reset();
            setTimeout(() => reviewStatus.innerHTML = '', 3000);
        }, 1000);
    });
}
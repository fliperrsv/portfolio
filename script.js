// ==================== ТЁМНАЯ ТЕМА ====================
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

// ==================== МОБИЛЬНОЕ МЕНЮ ====================
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

// ==================== АНИМАЦИЯ СЧЁТЧИКОВ ====================
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

// ==================== АНИМАЦИЯ ПОЯВЛЕНИЯ ====================
const animatedElements = document.querySelectorAll('.hero, .case-card, .about-container, .contact-wrapper, .skill-category, .review-card');
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

// ==================== СКРЫТИЕ ХЕДЕРА ПРИ СКРОЛЛЕ ====================
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

// ==================== ФОРМА ОБРАТНОЙ СВЯЗИ (имитация) ====================
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

// ==================== ОТЗЫВЫ (Google Sheets – заглушка, можно заменить на свои ссылки) ====================
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/ВАШ_СКРИПТ/exec';
const GOOGLE_SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/ВАШ_ID/export?format=csv';
async function loadReviews() {
    const container = document.getElementById('reviews-list');
    if (!container) return;
    try {
        const response = await fetch(GOOGLE_SHEETS_CSV_URL);
        if (!response.ok) throw new Error();
        const csvText = await response.text();
        const rows = csvText.split('\n').slice(1);
        const reviews = [];
        for (let row of rows) {
            if (!row.trim()) continue;
            const cols = row.match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g);
            if (cols && cols.length >= 3) {
                const name = cols[1]?.replace(/"/g, '') || '';
                const text = cols[2]?.replace(/"/g, '') || '';
                const rating = parseInt(cols[3]) || 5;
                if (name && text) reviews.push({ name, text, rating });
            }
        }
        reviews.reverse();
        if (reviews.length === 0) {
            container.innerHTML = '<p style="text-align: center;">Пока нет отзывов. Будьте первым!</p>';
        } else {
            container.innerHTML = reviews.map(rev => `
                <div class="review-card">
                    <div class="review-header"><span class="review-author">${escapeHtml(rev.name)}</span><span class="review-rating">${'★'.repeat(rev.rating)}${'☆'.repeat(5-rev.rating)}</span></div>
                    <div class="review-text">${escapeHtml(rev.text)}</div>
                    <div class="review-date">недавно</div>
                </div>
            `).join('');
        }
    } catch (e) {
        console.warn('Отзывы не загружены (используется заглушка)');
        container.innerHTML = '<p style="text-align: center;">Отзывы появятся скоро. Оставьте свой!</p>';
    }
}
function escapeHtml(str) {
    return str.replace(/[&<>]/g, m => m === '&' ? '&amp;' : (m === '<' ? '&lt;' : '&gt;')).replace(/\n/g, '<br>');
}
const reviewForm = document.getElementById('reviewForm');
if (reviewForm) {
    reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('reviewName').value.trim();
        const text = document.getElementById('reviewText').value.trim();
        const rating = document.getElementById('reviewRating').value;
        const statusDiv = document.getElementById('reviewFormStatus');
        if (!name || !text) {
            statusDiv.innerHTML = '<span style="color:#ff6b4a;">Заполните имя и отзыв</span>';
            return;
        }
        statusDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        try {
            await fetch(GOOGLE_APPS_SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, text, rating }) });
            statusDiv.innerHTML = '<span style="color:#4ade80;">✅ Спасибо! Отзыв будет опубликован после проверки.</span>';
            reviewForm.reset();
            setTimeout(loadReviews, 2000);
        } catch (error) {
            statusDiv.innerHTML = '<span style="color:#ff6b4a;">❌ Ошибка, попробуйте позже.</span>';
        }
    });
}
if (document.getElementById('reviews-list')) loadReviews();

// Дополнительно: добавим стили для анимации, которых ещё нет
const style = document.createElement('style');
style.textContent = `.fade-up { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; } .fade-up.appear { opacity: 1; transform: translateY(0); }`;
document.head.appendChild(style);

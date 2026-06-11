//

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
const animatedElements = document.querySelectorAll('.hero, .project-card, .about-container, .contact-wrapper, .skill-category, .review-card');
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

// ==================== ФИЛЬТРАЦИЯ ПРОЕКТОВ ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        projects.forEach(project => {
            if (filter === 'all' || project.dataset.category.split(' ').includes(filter)) {
                project.style.display = '';
                setTimeout(() => { project.style.opacity = '1'; project.style.transform = 'scale(1)'; }, 10);
            } else {
                project.style.opacity = '0';
                project.style.transform = 'scale(0.8)';
                setTimeout(() => { project.style.display = 'none'; }, 200);
            }
        });
    });
});

// ==================== МОДАЛЬНЫЕ ОКНА ПРОЕКТОВ ====================
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeProjectModal');

function openProjectDetails(id) {
    const details = {
        weatherly: {
            title: 'Weatherly — прогноз погоды',
            content: '🌤️ Виджет погоды с геолокацией, сохранением города и адаптивным дизайном. Интеграция с OpenWeatherMap API.',
            tech: 'HTML5, CSS3, JavaScript ES6+, REST API'
        },
        taskflow: {
            title: 'TaskFlow — умный ToDo-менеджер',
            content: '✅ Управление задачами с категориями, приоритетами и сохранением в localStorage. Фильтрация по статусу.',
            tech: 'HTML5, CSS3, JavaScript ES6+, LocalStorage'
        },
        sergdevbot: {
            title: 'SergDevBot — Telegram-помощник',
            content: '🤖 Бот с базой данных SQLite, напоминаниями, рассылками и мультиязычностью. Написан на aiogram.',
            tech: 'Python, Aiogram, SQLite, APScheduler'
        },
        password: {
            title: 'SecurePass — генератор паролей',
            content: '🔐 Создаёт надёжные пароли с настройками длины, типов символов. Оценка сложности в реальном времени.',
            tech: 'HTML5, CSS3, JavaScript ES6+'
        },
        currency: {
            title: 'CurrencyX — конвертер валют',
            content: '💱 Конвертирует валюты по актуальным курсам через открытое API. Автообновление, смена валют.',
            tech: 'HTML5, CSS3, JavaScript, REST API'
        }
    };
    const proj = details[id];
    if (proj) {
        modalBody.innerHTML = `
            <h2>${proj.title}</h2>
            <div class="case-meta" style="margin: 16px 0 20px; display: flex; flex-wrap: wrap; gap: 12px;">
                <span style="background: var(--bg-secondary); padding: 4px 12px; border-radius: 40px; font-size: 0.8rem;">🛠️ Реальный проект</span>
                <span style="background: var(--bg-secondary); padding: 4px 12px; border-radius: 40px; font-size: 0.8rem;">📁 В портфолио</span>
            </div>
            <div class="case-description" style="margin-bottom: 20px; line-height: 1.6;">
                <p>${proj.content}</p>
            </div>
            <div class="case-tech" style="margin-bottom: 24px;">
                <strong>Технологии:</strong> ${proj.tech}
            </div>
            <div class="case-links" style="display: flex; gap: 16px;">
                <button onclick="window.location.href='https://github.com/fliperrsv'" class="btn-demo">📁 Код на GitHub</button>
            </div>
        `;
    }
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

closeModal?.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
});
window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
};
document.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const project = btn.dataset.project;
        if (project) openProjectDetails(project);
    });
});

// ==================== ЗВЁЗДНЫЙ РЕЙТИНГ ====================
const stars = document.querySelectorAll('#starRating i');
const ratingInput = document.getElementById('reviewRating');
stars.forEach(star => {
    star.addEventListener('click', () => {
        const value = parseInt(star.dataset.value);
        ratingInput.value = value;
        stars.forEach((s, i) => {
            if (i < value) {
                s.classList.remove('far');
                s.classList.add('fas');
            } else {
                s.classList.remove('fas');
                s.classList.add('far');
            }
        });
    });
});
// Установить 5 звёзд по умолчанию
ratingInput.value = 5;
stars.forEach((star, i) => {
    if (i < 5) {
        star.classList.remove('far');
        star.classList.add('fas');
    }
});

// ==================== ОТЗЫВЫ (ФОРМА + ЗАГРУЗКА) ====================
// Замените на свои ссылки Google Sheets
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
                const date = cols[0]?.replace(/"/g, '') || '';
                const name = cols[1]?.replace(/"/g, '') || '';
                const text = cols[2]?.replace(/"/g, '') || '';
                const rating = parseInt(cols[3]) || 5;
                if (name && text) reviews.push({ date, name, text, rating });
            }
        }
        reviews.reverse();
        if (reviews.length === 0) {
            container.innerHTML = '<p style="text-align: center;">Пока нет отзывов. Будьте первым!</p>';
        } else {
            container.innerHTML = reviews.map(rev => `
                <div class="review-card">
                    <div class="review-header">
                        <span class="review-author">${escapeHtml(rev.name)}</span>
                        <span class="review-rating">${'★'.repeat(rev.rating)}${'☆'.repeat(5 - rev.rating)}</span>
                    </div>
                    <div class="review-text">${escapeHtml(rev.text)}</div>
                    <div class="review-date">${rev.date || ''}</div>
                </div>
            `).join('');
        }
    } catch (e) {
        console.error('Ошибка загрузки отзывов:', e);
        container.innerHTML = '<p style="text-align: center;">Не удалось загрузить отзывы. Попробуйте позже.</p>';
    }
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, (m) => {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    }).replace(/\n/g, '<br>');
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
            statusDiv.innerHTML = '<span style="color:#ff6b4a;">Заполните имя и текст отзыва</span>';
            return;
        }
        statusDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        try {
            await fetch(GOOGLE_APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, text, rating })
            });
            statusDiv.innerHTML = '<span style="color:#4ade80;">✅ Спасибо! Ваш отзыв будет опубликован после проверки.</span>';
            reviewForm.reset();
            setTimeout(loadReviews, 2000);
        } catch (error) {
            statusDiv.innerHTML = '<span style="color:#ff6b4a;">❌ Ошибка отправки. Попробуйте позже.</span>';
        }
    });
}

// Загрузка отзывов
if (document.getElementById('reviews-list')) loadReviews();

// ==================== ФОРМА ОБРАТНОЙ СВЯЗИ ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const message = document.getElementById('contactMessage').value.trim();
        const statusDiv = document.getElementById('contactFormStatus');
        if (!name || !email || !message) {
            statusDiv.innerHTML = '<span style="color:#ff6b4a;">Заполните все поля</span>';
            return;
        }
        if (!/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(email)) {
            statusDiv.innerHTML = '<span style="color:#ff6b4a;">Введите корректный email</span>';
            return;
        }
        statusDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        setTimeout(() => {
            statusDiv.innerHTML = '<span style="color:#4ade80;">✅ Сообщение отправлено! Я свяжусь с вами в ближайшее время.</span>';
            contactForm.reset();
        }, 1000);
        setTimeout(() => {
            if (statusDiv.innerHTML.includes('отправлено')) statusDiv.innerHTML = '';
        }, 5000);
    });
}

// ==================== CSS-классы для анимации ====================
const style = document.createElement('style');
style.textContent = `
    .fade-up { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .fade-up.appear { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);

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

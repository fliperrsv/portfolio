// ==================== ТЁМНАЯ/СВЕТЛАЯ ТЕМА ====================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('i');

function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
}

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) setTheme('dark');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.hasAttribute('data-theme');
        setTheme(isDark ? 'light' : 'dark');
    });
}

// ==================== МОБИЛЬНОЕ МЕНЮ ====================
const mobileBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');
if (mobileBtn && nav) {
    mobileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (icon) icon.classList.toggle('fa-times');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            if (mobileBtn.querySelector('i')) {
                mobileBtn.querySelector('i').classList.add('fa-bars');
            }
        });
    });
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileBtn.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// ==================== КАРУСЕЛЬ ====================
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;
let visibleCards = 1;
let cardWidth = 0;

function updateVisibleCards() {
    if (window.innerWidth <= 600) visibleCards = 1;
    else if (window.innerWidth <= 900) visibleCards = 2;
    else visibleCards = 3;
}

function updateCardWidth() {
    if (!track) return;
    const firstCard = track.querySelector('.project-card');
    if (!firstCard) return;
    const gap = 32;
    const containerWidth = track.parentElement.clientWidth;
    cardWidth = (containerWidth - gap * (visibleCards - 1)) / visibleCards;
    Array.from(track.children).forEach(card => {
        card.style.flex = `0 0 ${cardWidth}px`;
    });
}

function updateTrackPosition() {
    if (!track) return;
    const maxIndex = Math.max(0, track.children.length - visibleCards);
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    const offset = -currentIndex * (cardWidth + 32);
    track.style.transform = `translateX(${offset}px)`;
}

function goPrev() {
    if (currentIndex > 0) {
        currentIndex--;
        updateTrackPosition();
    }
}

function goNext() {
    if (!track) return;
    const maxIndex = Math.max(0, track.children.length - visibleCards);
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateTrackPosition();
    }
}

if (prevBtn) prevBtn.addEventListener('click', goPrev);
if (nextBtn) nextBtn.addEventListener('click', goNext);
window.addEventListener('resize', () => {
    updateVisibleCards();
    updateCardWidth();
    updateTrackPosition();
});

// ==================== ФИЛЬТРАЦИЯ ПРОЕКТОВ (с обновлением карусели) ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const allProjects = track ? Array.from(track.children) : [];

function filterProjects(filter) {
    if (!track) return;
    const visibleProjects = [];
    allProjects.forEach(project => {
        const category = project.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
            project.style.display = '';
            visibleProjects.push(project);
        } else {
            project.style.display = 'none';
        }
    });
    const hiddenProjects = allProjects.filter(p => !visibleProjects.includes(p));
    const newOrder = [...visibleProjects, ...hiddenProjects];
    newOrder.forEach(el => track.appendChild(el));
    currentIndex = 0;
    updateVisibleCards();
    updateCardWidth();
    updateTrackPosition();
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterProjects(filter);
    });
});

// ==================== МОДАЛЬНЫЕ ОКНА ПРОЕКТОВ ====================
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeProjectModal');

function openProjectDetails(id) {
    if (!modalBody) return;
    if (id === 'weatherly') {
        modalBody.innerHTML = `<h2>Weatherly — прогноз погоды</h2>
            <p><strong>Задача:</strong> создать удобный виджет погоды с геолокацией.</p>
            <p><strong>Решение:</strong> OpenWeatherMap API, асинхронные запросы, localStorage, геолокация браузера.</p>
            <p><strong>Результат:</strong> быстрый отклик, поддержка тысяч городов, готовый код на GitHub.</p>
            <a href="https://fliperrsv.github.io/weather-app/" target="_blank" class="btn-demo">Посмотреть демо →</a>`;
    } else if (id === 'taskflow') {
        modalBody.innerHTML = `<h2>TaskFlow — ToDo-менеджер</h2>
            <p>Управление задачами, приоритеты, сохранение в localStorage. Адаптивный интерфейс.</p>
            <p><strong>Технологии:</strong> HTML, CSS, JS, LocalStorage.</p>
            <a href="https://fliperrsv.github.io/taskflow/" target="_blank" class="btn-demo">Открыть приложение →</a>`;
    } else if (id === 'echobot') {
        modalBody.innerHTML = `<h2>EchoBot — простой Telegram-бот</h2>
            <p>Бот написан на Python с использованием библиотеки aiogram. Отвечает на команды /start, /help и повторяет текст пользователя.</p>
            <p>Код доступен на GitHub: <a href="https://github.com/fliperrsv/echobot" target="_blank">github.com/fliperrsv/echobot</a></p>`;
    }
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

if (closeModal) {
    closeModal.onclick = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };
}
window.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
};

document.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const project = btn.getAttribute('data-project');
        if (project) openProjectDetails(project);
    });
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

// ==================== АНИМАЦИИ ПОЯВЛЕНИЯ (FADE UP) ====================
const fadeElements = document.querySelectorAll('.hero, .project-card, .about-container, .contact-wrapper, .skill-category, .review-card, .faq-item');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

fadeElements.forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
});

// ==================== ОТЗЫВЫ (Google Sheets + Apps Script) ====================
// ВАШИ ССЫЛКИ УЖЕ ПОДСТАВЛЕНЫ
const GOOGLE_SHEETS_CSV_URL = 'https://docs.google.com/spreadsheets/d/1JQk09D0emxOFmzKtEKEIcajqL9pEHuhUDHDrW_XGclY/export?format=csv';
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbynzOLdPFLFMpDEJhTfcRKbUih1nHGL2hs_1MORdpyk2iKb6GQdn05REqJF138DQUop/exec';

async function loadReviews() {
    const container = document.getElementById('reviews-list');
    if (!container) return;
    try {
        const response = await fetch(GOOGLE_SHEETS_CSV_URL);
        if (!response.ok) throw new Error('Ошибка загрузки CSV');
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
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    }).replace(/\n/g, '<br>');
}

const reviewForm = document.getElementById('reviewForm');
if (reviewForm) {
    reviewForm.addEventListener('submit', async function(e) {
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
            console.error(error);
            statusDiv.innerHTML = '<span style="color:#ff6b4a;">❌ Ошибка отправки. Попробуйте позже.</span>';
        }
    });
}

if (document.getElementById('reviews-list')) {
    loadReviews();
}

// ==================== ИНИЦИАЛИЗАЦИЯ КАРУСЕЛИ ПОСЛЕ ЗАГРУЗКИ DOM ====================
document.addEventListener('DOMContentLoaded', () => {
    updateVisibleCards();
    updateCardWidth();
    updateTrackPosition();
});

// Тёмная/светлая тема
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('i');
function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if (themeIcon) { themeIcon.classList.remove('fa-moon'); themeIcon.classList.add('fa-sun'); }
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        if (themeIcon) { themeIcon.classList.remove('fa-sun'); themeIcon.classList.add('fa-moon'); }
    }
}
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) setTheme('dark');
if (themeToggle) themeToggle.addEventListener('click', () => setTheme(document.documentElement.hasAttribute('data-theme') ? 'light' : 'dark'));

// Мобильное меню
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

// ---------- Карусель ----------
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
    const firstCard = track.querySelector('.project-card');
    if (!firstCard) return;
    const gap = 32; // gap в .carousel-track
    const containerWidth = track.parentElement.clientWidth;
    cardWidth = (containerWidth - gap * (visibleCards - 1)) / visibleCards;
    // применить ширину к каждой карточке
    Array.from(track.children).forEach(card => {
        card.style.flex = `0 0 ${cardWidth}px`;
    });
}
function updateTrackPosition() {
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
    const maxIndex = Math.max(0, track.children.length - visibleCards);
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateTrackPosition();
    }
}
prevBtn?.addEventListener('click', goPrev);
nextBtn?.addEventListener('click', goNext);
window.addEventListener('resize', () => {
    updateVisibleCards();
    updateCardWidth();
    updateTrackPosition();
});

// Фильтрация проектов (с обновлением карусели)
const filterBtns = document.querySelectorAll('.filter-btn');
const allProjects = Array.from(track.children);

function filterProjects(filter) {
    let visibleProjects = [];
    allProjects.forEach(project => {
        const category = project.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
            project.style.display = '';
            visibleProjects.push(project);
        } else {
            project.style.display = 'none';
        }
    });
    // Пересортировка DOM: сначала все видимые проекты, потом скрытые (чтобы порядок не менялся)
    const visibleElements = visibleProjects;
    const hiddenElements = allProjects.filter(p => !visibleProjects.includes(p));
    const newOrder = [...visibleElements, ...hiddenElements];
    newOrder.forEach(el => track.appendChild(el));
    
    // Сброс индекса и обновление размеров
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

// Модальные окна проектов
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeProjectModal');
function openProjectDetails(id) {
    if (id === 'weatherly') modalBody.innerHTML = `<h2>Weatherly — прогноз погоды</h2><p><strong>Задача:</strong> виджет погоды с геолокацией.</p><p><strong>Решение:</strong> OpenWeatherMap API, Fetch, localStorage.</p><p><strong>Результат:</strong> быстрый отклик, поддержка тысяч городов.</p><a href="https://fliperrsv.github.io/weather-app/" target="_blank" class="btn-demo">Посмотреть демо</a>`;
    else if (id === 'taskflow') modalBody.innerHTML = `<h2>TaskFlow — ToDo-менеджер</h2><p>Управление задачами, приоритеты, сохранение в localStorage. Адаптивный интерфейс.</p><p>Технологии: HTML, CSS, JS, LocalStorage.</p><a href="https://fliperrsv.github.io/taskflow/" target="_blank" class="btn-demo">Открыть приложение →</a>`;
    else if (id === 'echobot') modalBody.innerHTML = `<h2>EchoBot — простой Telegram-бот</h2><p>Бот написан на Python с использованием библиотеки aiogram. Отвечает на команды /start, /help и повторяет текст пользователя.</p><p>Код доступен на GitHub: <a href="https://github.com/fliperrsv/echobot" target="_blank">github.com/fliperrsv/echobot</a></p><p>Попробовать: <a href="https://t.me/your_echo_bot" target="_blank">@your_echo_bot</a></p>`;
    modal.style.display = 'flex'; document.body.style.overflow = 'hidden';
}
if (closeModal) closeModal.onclick = () => { modal.style.display = 'none'; document.body.style.overflow = ''; };
window.onclick = (e) => { if (e.target === modal) { modal.style.display = 'none'; document.body.style.overflow = ''; } };
document.querySelectorAll('.btn-details').forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); openProjectDetails(btn.dataset.project); }));

// Скрытие хедера при скролле
let lastScroll = 0;
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (!header) return;
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 100) header.classList.add('hide');
    else header.classList.remove('hide');
    lastScroll = currentScroll;
});

// Инициализация карусели после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    updateVisibleCards();
    updateCardWidth();
    updateTrackPosition();
});

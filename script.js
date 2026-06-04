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
    mobileBtn.addEventListener('click', (e) => { e.stopPropagation(); nav.classList.toggle('active'); const icon = mobileBtn.querySelector('i'); if (icon) icon.classList.toggle('fa-times'); });
    document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => { nav.classList.remove('active'); if (mobileBtn.querySelector('i')) mobileBtn.querySelector('i').classList.add('fa-bars'); }));
    document.addEventListener('click', (e) => { if (!nav.contains(e.target) && !mobileBtn.contains(e.target) && nav.classList.contains('active')) nav.classList.remove('active'); });
}

// Фильтрация проектов
const filterBtns = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        projects.forEach(proj => {
            if (filter === 'all' || proj.dataset.category === filter) {
                proj.style.display = 'block';
                setTimeout(() => { proj.style.opacity = '1'; proj.style.transform = 'scale(1)'; }, 10);
            } else {
                proj.style.opacity = '0';
                proj.style.transform = 'scale(0.8)';
                setTimeout(() => { proj.style.display = 'none'; }, 200);
            }
        });
    });
});

// Модальные окна проектов
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeProjectModal');
function openProjectDetails(id) {
    if (id === 'weatherly') modalBody.innerHTML = `<h2>Weatherly — прогноз погоды</h2><p><strong>Задача:</strong> виджет погоды с геолокацией.</p><p><strong>Решение:</strong> OpenWeatherMap API, Fetch, localStorage.</p><p><strong>Результат:</strong> быстрый отклик, поддержка тысяч городов.</p><a href="https://fliperrsv.github.io/weather-app/" target="_blank" class="btn-demo">Посмотреть демо</a>`;
    else if (id === 'taskflow') modalBody.innerHTML = `<h2>TaskFlow — ToDo-менеджер</h2><p>Управление задачами, приоритеты, сохранение в localStorage. Адаптивный интерфейс.</p><p>Технологии: HTML, CSS, JS, LocalStorage.</p><p><em>Демо скоро появится.</em></p>`;
    else if (id === 'edubot') modalBody.innerHTML = `<h2>EduHelper Bot</h2><p>Telegram-бот на Python (aiogram) с викторинами, расписанием, интеграцией Google Sheets.</p><p><a href="https://t.me/edubot_demo" target="_blank" style="color:var(--accent)">👉 Тестовый бот</a></p>`;
    modal.style.display = 'flex'; document.body.style.overflow = 'hidden';
}
if (closeModal) closeModal.onclick = () => { modal.style.display = 'none'; document.body.style.overflow = ''; };
window.onclick = (e) => { if (e.target === modal) { modal.style.display = 'none'; document.body.style.overflow = ''; } };
document.querySelectorAll('.btn-details').forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); openProjectDetails(btn.dataset.project); }));

// Форма (имитация)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        if (!name || !email || !message) { formStatus.innerHTML = '<span style="color:#ff6b4a;">Заполните все поля</span>'; return; }
        if (!/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(email)) { formStatus.innerHTML = '<span style="color:#ff6b4a;">Введите корректный email</span>'; return; }
        formStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        setTimeout(() => { formStatus.innerHTML = '<span style="color:#4ade80;">Сообщение отправлено! Я свяжусь с вами.</span>'; contactForm.reset(); }, 1000);
        setTimeout(() => { if (formStatus.innerHTML.includes('Сообщение отправлено')) formStatus.innerHTML = ''; }, 5000);
    });
}

// Скрытие хедера
let lastScroll = 0;
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (!header) return;
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 100) header.classList.add('hide');
    else header.classList.remove('hide');
    lastScroll = currentScroll;
});

// Резюме
document.getElementById('resumeBtn')?.addEventListener('click', (e) => { e.preventDefault(); alert('Резюме будет добавлено позже. Запросите в Telegram.'); });

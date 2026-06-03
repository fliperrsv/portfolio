// Мобильное меню
const mobileBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');
if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        if (nav.style.display === 'flex') {
            nav.style.display = 'none';
        } else {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '70px';
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.background = '#0b0f1c';
            nav.style.padding = '20px';
            nav.style.gap = '20px';
            nav.style.borderBottom = '1px solid #1f2937';
        }
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'row';
            nav.style.position = 'static';
            nav.style.padding = '0';
            nav.style.background = 'transparent';
        } else if (nav.style.display !== 'flex') {
            nav.style.display = 'none';
        }
    });
}

// Модальное окно для проекта
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.modal-close');

function openProjectDetails(projectId) {
    if (projectId === 'weatherly') {
        modalBody.innerHTML = `
            <h2>Weatherly — прогноз погоды</h2>
            <p><strong>Задача:</strong> создать удобный виджет погоды с определением местоположения.</p>
            <p><strong>Решение:</strong> использовано OpenWeatherMap API, асинхронные запросы, localStorage, геолокация браузера. Дизайн адаптивный, есть анимации.</p>
            <p><strong>Результат:</strong> быстрый отклик, поддержка тысяч городов, готовый код на GitHub.</p>
            <p><strong>Технологии:</strong> HTML, CSS, JavaScript (ES6+), Fetch API.</p>
            <a href="https://fliperrsv.github.io/weather-app/" target="_blank" class="btn-demo" style="margin-top:16px; display:inline-block;">Посмотреть демо →</a>
        `;
    }
    modal.style.display = 'flex';
}

if (closeModal) {
    closeModal.onclick = () => modal.style.display = 'none';
}
window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

document.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const project = btn.getAttribute('data-project');
        if (project === 'weatherly') openProjectDetails('weatherly');
    });
});

// Форма обратной связи (имитация отправки)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        if (!name || !email || !message) {
            formStatus.innerHTML = '<span style="color:#ff6b4a;">Заполните все поля</span>';
            return;
        }
        formStatus.innerHTML = '⏳ Отправка...';
        setTimeout(() => {
            formStatus.innerHTML = '<span style="color:#4ade80;">✅ Сообщение отправлено! Я свяжусь с вами в ближайшее время.</span>';
            contactForm.reset();
        }, 1000);
    });
}

// Кнопка скачивания резюме (временно заглушка)
const resumeBtn = document.getElementById('resumeBtn');
if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Файл резюме будет добавлен позже. Вы можете запросить его в Telegram.');
    });
}

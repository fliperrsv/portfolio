// Плавное появление элементов при скролле
const animateElements = document.querySelectorAll('.hero, .project-card, .about-container, .contact-wrapper, .skill-category');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

animateElements.forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
});

// Анимация прогресс-бара навыков
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress-bar');
            skillBars.forEach(bar => {
                const parent = bar.closest('.skill-item');
                const skillName = parent.getAttribute('data-skill');
                let width = '0%';
                switch(skillName) {
                    case 'html':
                    case 'css':
                        width = '90%';
                        break;
                    case 'js':
                        width = '75%';
                        break;
                    case 'react':
                        width = '50%';
                        break;
                    case 'python':
                        width = '70%';
                        break;
                    case 'git':
                        width = '80%';
                        break;
                    case 'api':
                        width = '75%';
                        break;
                }
                bar.style.width = width;
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-category').forEach(el => {
    skillObserver.observe(el);
});

// Анимация счетчиков (ЗАПУСКАЕТСЯ СРАЗУ)
function animateCounter(element, start, end, duration) {
    if (!element) return;
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerText = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Находим элементы и запускаем анимацию мгновенно
const yearCounter = document.getElementById('yearCounter');
const projectCounter = document.getElementById('projectCounter');

if (yearCounter && projectCounter) {
    // Запускаем анимацию, как только страница загрузится
    window.addEventListener('DOMContentLoaded', () => {
        animateCounter(yearCounter, 0, 2, 2000);
        animateCounter(projectCounter, 0, 5, 2000);
    });
}

// ... (остальная часть вашего script.js без изменений) ...

// Тёмная/светлая тема
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

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
if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    setTheme('dark');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.hasAttribute('data-theme');
        setTheme(isDark ? 'light' : 'dark');
    });
}

// Мобильное меню
const mobileBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');

if (mobileBtn && nav) {
    mobileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileBtn.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        }
    });
}

// Фильтрация проектов
const filterBtns = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        projects.forEach(project => {
            if (filter === 'all' || project.getAttribute('data-category') === filter) {
                project.style.display = 'block';
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'scale(1)';
                }, 10);
            } else {
                project.style.opacity = '0';
                project.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    project.style.display = 'none';
                }, 200);
            }
        });
    });
});

// Модальные окна деталей проектов
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const closeProjectModal = document.getElementById('closeProjectModal');

function openProjectDetails(projectId) {
    if (projectId === 'weatherly') {
        modalBody.innerHTML = `
            <h2>Weatherly — прогноз погоды</h2>
            <p><strong>Задача:</strong> создать удобный виджет погоды с определением местоположения.</p>
            <p><strong>Решение:</strong> использовано OpenWeatherMap API, асинхронные запросы, localStorage, геолокация браузера. Дизайн адаптивный, есть анимации.</p>
            <p><strong>Результат:</strong> быстрый отклик, поддержка тысяч городов, готовый код на GitHub.</p>
            <p><strong>Технологии:</strong> HTML, CSS, JavaScript (ES6+), Fetch API.</p>
            <div class="code-snippet">
                <pre><code>// Пример кода получения погоды
async function getWeather(city) {
    const response = await fetch(
        `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );
    return response.json();
}</code></pre>
            </div>
            <a href="https://fliperrsv.github.io/weather-app/" target="_blank" class="btn-demo" style="margin-top:16px; display:inline-flex; align-items:center; gap:8px;">
                <i class="fas fa-external-link-alt"></i> Посмотреть демо
            </a>
        `;
    } else if (projectId === 'taskflow') {
        modalBody.innerHTML = `
            <h2>TaskFlow — умный ToDo-менеджер</h2>
            <p><strong>Задача:</strong> разработать приложение для управления задачами с категориями, приоритетами и сохранением данных.</p>
            <p><strong>Решение:</strong> чистый JavaScript, хранение в localStorage, динамическое создание DOM-элементов, фильтрация по статусу (активные/выполненные).</p>
            <p><strong>Результат:</strong> интуитивно понятный интерфейс, возможность редактирования, удаления и поиска задач. Полностью адаптивно.</p>
            <p><strong>Технологии:</strong> HTML5, CSS3 (Grid/Flex), JavaScript ES6, LocalStorage.</p>
            <p><em>Демо-версия появится после завершения интеграции с бэкендом.</em></p>
        `;
    } else if (projectId === 'edubot') {
        modalBody.innerHTML = `
            <h2>EduHelper Bot — учебный помощник</h2>
            <p><strong>Задача:</strong> создать Telegram-бота для образовательного канала, который может проводить викторины, сохранять прогресс учеников и присылать расписание.</p>
            <p><strong>Решение:</strong> бот написан на Python с использованием библиотеки aiogram. Данные пользователей хранятся в SQLite. Реализованы инлайн-клавиатуры, middleware для логирования, интеграция с Google Sheets для выгрузки результатов.</p>
            <p><strong>Результат:</strong> 150+ активных пользователей за первый месяц, снижение нагрузки на администратора на 70%.</p>
            <p><strong>Технологии:</strong> Python, Aiogram, SQLite, Google Sheets API.</p>
            <p><a href="https://t.me/edubot_demo" target="_blank" style="color: var(--accent);">👉 Перейти в тестового бота</a> (демо-бот может быть ограничен).</p>
        `;
    }
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

if (closeProjectModal) {
    closeProjectModal.onclick = () => {
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
        if (project === 'weatherly') openProjectDetails('weatherly');
        else if (project === 'taskflow') openProjectDetails('taskflow');
        else if (project === 'edubot') openProjectDetails('edubot');
    });
});

// Форма обратной связи (имитация отправки, можно подключить Formspree)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            formStatus.innerHTML = '<span style="color:#ff6b4a;"><i class="fas fa-exclamation-circle"></i> Заполните все поля</span>';
            return;
        }
        
        if (!/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(email)) {
            formStatus.innerHTML = '<span style="color:#ff6b4a;"><i class="fas fa-envelope"></i> Введите корректный email</span>';
            return;
        }
        
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        formStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        
        // Здесь можно добавить реальную отправку через Formspree (замените YOUR_FORM_ID)
        // const formspreeId = 'YOUR_FORM_ID';
        // const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ name, email, message })
        // });
        
        // Имитация успешной отправки
        setTimeout(() => {
            formStatus.innerHTML = '<span style="color:#4ade80;"><i class="fas fa-check-circle"></i> Сообщение отправлено! Я свяжусь с вами в ближайшее время.</span>';
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }, 1000);
        
        setTimeout(() => {
            if (formStatus.innerHTML.includes('Сообщение отправлено')) {
                formStatus.innerHTML = '';
            }
        }, 5000);
    });
}

// Кнопка скачивания резюме
const resumeBtn = document.getElementById('resumeBtn');
if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Файл резюме будет добавлен позже. Вы можете запросить его в Telegram.');
    });
}

// Скрытие header при скролле вниз
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

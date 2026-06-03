// Прелоадер
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hide');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Анимация появления элементов при скролле
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

// Анимация счетчиков
function animateCounter(element, start, end, duration) {
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

const yearCounter = document.getElementById('yearCounter');
const projectCounter = document.getElementById('projectCounter');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(yearCounter, 0, 2, 2000);
            animateCounter(projectCounter, 0, 5, 2000);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (yearCounter && projectCounter) {
    counterObserver.observe(yearCounter);
}

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

// Модальное окно
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
        if (project === 'weatherly') openProjectDetails('weatherly');
    });
});

// Форма обратной связи (отправка на email с использованием Formspree)
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
        
        // Использование Formspree (бесплатно, 50 писем в месяц)
        // Замените 'YOUR_FORM_ID' на ваш ID формы после регистрации на formspree.io
        const formspreeId = 'YOUR_FORM_ID';
        const formspreeUrl = `https://formspree.io/f/${formspreeId}`;
        
        try {
            const response = await fetch(formspreeUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });
            
            if (response.ok) {
                formStatus.innerHTML = '<span style="color:#4ade80;"><i class="fas fa-check-circle"></i> Сообщение отправлено! Я свяжусь с вами в ближайшее время.</span>';
                contactForm.reset();
            } else {
                throw new Error('Ошибка отправки');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            formStatus.innerHTML = '<span style="color:#ff6b4a;"><i class="fas fa-exclamation-triangle"></i> Ошибка отправки. Попробуйте позже или напишите в Telegram.</span>';
        } finally {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            setTimeout(() => {
                if (formStatus.innerHTML.includes('сообщение отправлено')) {
                    formStatus.innerHTML = '';
                }
            }, 5000);
        }
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

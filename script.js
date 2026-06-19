// Файл: script.js
"use strict";

(() => {
  // ========== УТИЛИТЫ ==========
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => root.querySelectorAll(sel);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ========== ТЕМА ==========
  const themeToggle = $('#themeToggle');
  const themeIcon = themeToggle?.querySelector('i');

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeIcon?.classList.replace('fa-moon', 'fa-sun');
      themeToggle?.setAttribute('aria-pressed', 'true');
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeIcon?.classList.replace('fa-sun', 'fa-moon');
      themeToggle?.setAttribute('aria-pressed', 'false');
    }
  };

  // Системная тема как дефолт, если пользователь не выбирал
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (systemDark ? 'dark' : 'light'));

  themeToggle?.addEventListener('click', () => {
    const isDark = document.documentElement.hasAttribute('data-theme');
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });

  // ========== МОБИЛЬНОЕ МЕНЮ ==========
  const menuBtn = $('.mobile-menu-btn');
  const nav = $('.nav');

  const setMenu = (open) => {
    if (!menuBtn || !nav) return;
    nav.classList.toggle('active', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    const icon = menuBtn.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-times', open);
      icon.classList.toggle('fa-bars', !open);
    }
  };

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      setMenu(!nav.classList.contains('active'));
    });
    $$('.nav-link').forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('active') && !nav.contains(e.target) && !menuBtn.contains(e.target)) {
        setMenu(false);
      }
    });
    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('active')) setMenu(false);
    });
  }

  // ========== КАСТОМНЫЙ КУРСОР (только desktop с мышью) ==========
  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (supportsHover && !prefersReducedMotion) {
    document.body.classList.add('has-custom-cursor');
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    let cursorX = 0, cursorY = 0, ticking = false;

    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      if (!ticking) {
        requestAnimationFrame(() => {
          cursor.style.transform = `translate3d(${cursorX - 10}px, ${cursorY - 10}px, 0)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Скрытие при уходе курсора со страницы
    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', () => cursor.style.opacity = '1');

    // Эффект "hover" — через делегирование, чтобы не плодить листенеры
    const interactiveSelector = 'a, button, .btn, .case-card, .blog-card, .review-card, .social-icon';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelector)) cursor.classList.add('hover');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelector)) cursor.classList.remove('hover');
    });
  }

  // ========== СЧЁТЧИКИ В HERO ==========
  // Файл: script.js — блок "СЧЁТЧИКИ В HERO"
const statNumbers = $$('.stat-number');

const animateCounter = (el) => {
  const target = parseInt(el.dataset.target, 10);
  if (isNaN(target)) return;
  if (prefersReducedMotion) { el.textContent = target; return; }

  const duration = 1200;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  requestAnimationFrame(tick);
};

// Hero виден сразу — запускаем без observer
if (statNumbers.length) {
  // Небольшая задержка, чтобы пользователь увидел "0 → N", а не сразу финал
  setTimeout(() => {
    statNumbers.forEach(animateCounter);
  }, 300);
}


  // ========== АНИМАЦИЯ ПОЯВЛЕНИЯ + ПРОГРЕСС-БАРЫ ==========
  const fadeTargets = $$('.hero, .case-card, .mission-card, .skill-category, .about-container, .blog-card, .review-card, .cta-section');
  fadeTargets.forEach((el) => el.classList.add('fade-up'));

  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          // Запускаем прогресс-бары внутри блока навыков
          entry.target.querySelectorAll('.skill-progress-bar').forEach((bar) => bar.classList.add('animate'));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    fadeTargets.forEach((el) => fadeObserver.observe(el));
  } else {
    // Фолбэк
    fadeTargets.forEach((el) => el.classList.add('appear'));
    $$('.skill-progress-bar').forEach((bar) => bar.classList.add('animate'));
  }

  // ========== СКРЫТИЕ ХЕДЕРА ПРИ СКРОЛЛЕ ==========
  const header = $('.header');
  if (header) {
    let lastScroll = 0;
    let scrollTicking = false;

    window.addEventListener('scroll', () => {
      if (scrollTicking) return;
      requestAnimationFrame(() => {
        const current = window.pageYOffset;
        if (current > lastScroll && current > 100) header.classList.add('hide');
        else header.classList.remove('hide');
        lastScroll = current;
        scrollTicking = false;
      });
      scrollTicking = true;
    }, { passive: true });
  }

  // ========== ФОРМЫ ==========
  // TODO: вынести в сервисный слой при появлении реального API.
  // Пример будущей интеграции:
  // import { sendContactRequest } from './api/contact.js';
  // await sendContactRequest({ name, email, message });

  const showStatus = (el, html) => { if (el) el.innerHTML = html; };
  const clearStatusLater = (el, ms) => setTimeout(() => showStatus(el, ''), ms);
  const isValidEmail = (v) => /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(v);

  // Контактная форма
  const contactForm = $('#contactForm');
  const contactStatus = $('#contactFormStatus');
  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = $('#contactName').value.trim();
    const email = $('#contactEmail').value.trim();
    const message = $('#contactMessage').value.trim();

    if (!name || !email || !message) {
      showStatus(contactStatus, '<span style="color:#ff6b4a;">Заполните все поля</span>');
      return;
    }
    if (!isValidEmail(email)) {
      showStatus(contactStatus, '<span style="color:#ff6b4a;">Введите корректный email</span>');
      return;
    }

    showStatus(contactStatus, '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Отправка...');
    try {
      // Заглушка вместо реального API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showStatus(contactStatus, '<span style="color:#4ade80;">✅ Сообщение отправлено! Я свяжусь с вами.</span>');
      contactForm.reset();
      clearStatusLater(contactStatus, 5000);
    } catch (err) {
      showStatus(contactStatus, '<span style="color:#ff6b4a;">Не удалось отправить. Попробуйте позже или напишите в Telegram.</span>');
    }
  });

  // Форма отзыва
  const reviewForm = $('#reviewForm');
  const reviewStatus = $('#reviewFormStatus');
  reviewForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = $('#reviewName').value.trim();
    const text = $('#reviewText').value.trim();

    if (!name || !text) {
      showStatus(reviewStatus, '<span style="color:#ff6b4a;">Заполните имя и отзыв</span>');
      return;
    }

    showStatus(reviewStatus, '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Отправка...');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showStatus(reviewStatus, '<span style="color:#4ade80;">✅ Спасибо! Отзыв будет опубликован после проверки.</span>');
      reviewForm.reset();
      clearStatusLater(reviewStatus, 3000);
    } catch (err) {
      showStatus(reviewStatus, '<span style="color:#ff6b4a;">Не удалось отправить. Попробуйте позже.</span>');
    }
  });
})();

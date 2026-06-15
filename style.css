/* jshint esversion: 11 */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
:root {
    --bg-primary: #ffffff;
    --bg-secondary: #f8fafc;
    --bg-card: #ffffff;
    --text-primary: #0f172a;
    --text-secondary: #475569;
    --text-muted: #64748b;
    --border: #e2e8f0;
    --accent: #ff6b4a;
    --accent-hover: #ff522e;
    --gradient: linear-gradient(135deg, #ff6b4a 0%, #ff8a5c 100%);
    --header-bg: rgba(255,255,255,0.95);
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}
[data-theme="dark"] {
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --bg-card: #1e293b;
    --text-primary: #f1f5f9;
    --text-secondary: #cbd5e1;
    --text-muted: #94a3b8;
    --border: #334155;
    --header-bg: rgba(15,23,42,0.95);
}
html { scroll-behavior: smooth; }
body {
    font-family: 'Inter', sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.5;
    transition: background 0.3s, color 0.3s;
    overflow-x: hidden;
    cursor: none;
}
body::after {
    content: "";
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    opacity: 0.4;
    mix-blend-mode: overlay;
}
.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
a, button, .btn, input, textarea, select { cursor: none; }

/* Кастомный курсор */
.custom-cursor {
    width: 20px; height: 20px;
    border: 2px solid var(--accent);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 10000;
    transition: width 0.3s, height 0.3s, background 0.3s, transform 0.1s ease;
    mix-blend-mode: difference;
}
.custom-cursor.hover {
    width: 40px; height: 40px;
    background: var(--accent);
    mix-blend-mode: normal;
    opacity: 0.3;
}

/* Header */
.header {
    position: fixed; top: 0; left: 0; width: 100%;
    background: var(--header-bg);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    z-index: 1000;
    transition: transform 0.3s;
}
.header.hide { transform: translateY(-100%); }
.header-container { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; }
.logo {
    font-size: 1.5rem; font-weight: 700;
    background: var(--gradient);
    background-clip: text; -webkit-background-clip: text;
    color: transparent; text-decoration: none;
    display: flex; align-items: center; gap: 8px;
}
.nav { display: flex; gap: 32px; align-items: center; }
.nav-link {
    color: var(--text-primary); text-decoration: none; font-weight: 500;
    transition: color 0.2s; position: relative;
}
.nav-link::after {
    content: ''; position: absolute; bottom: -4px; left: 0;
    width: 0; height: 2px; background: var(--gradient); transition: width 0.3s;
}
.nav-link:hover::after { width: 100%; }
.nav-link:hover { color: var(--accent); }
.theme-toggle {
    background: none; border: none; color: var(--text-primary);
    font-size: 1.2rem; cursor: pointer; padding: 8px; border-radius: 50%;
    transition: background 0.2s;
}
.theme-toggle:hover { background: var(--border); }
.mobile-menu-btn { display: none; background: none; border: none; color: var(--text-primary); font-size: 24px; cursor: pointer; }

/* Hero */
.hero { padding: 140px 0 100px; position: relative; background: var(--bg-primary); overflow: hidden; }
.hero::before {
    content: ''; position: absolute; top: 50%; right: 0; width: 50%; height: 50%;
    background: radial-gradient(circle, rgba(255,107,74,0.08) 0%, transparent 70%); pointer-events: none;
}
.hero-container { display: flex; align-items: center; justify-content: space-between; gap: 60px; flex-wrap: wrap; }
.hero-content { flex: 1; }
.hero-tag {
    background: rgba(255,107,74,0.15); color: var(--accent);
    padding: 6px 14px; border-radius: 40px; font-size: 0.85rem; font-weight: 500;
    display: inline-block; margin-bottom: 24px;
}
.hero-title { font-size: 3.2rem; font-weight: 800; line-height: 1.2; margin-bottom: 24px; }
.gradient-text { background: var(--gradient); background-clip: text; -webkit-background-clip: text; color: transparent; }
.hero-desc { font-size: 1.125rem; color: var(--text-secondary); margin-bottom: 32px; max-width: 500px; }
.hero-stats { display: flex; gap: 32px; margin-bottom: 32px; }
.stat { text-align: center; }
.stat-number { font-size: 2rem; font-weight: 700; color: var(--accent); display: block; line-height: 1; }
.stat-label { font-size: 0.875rem; color: var(--text-muted); }
.hero-buttons { display: flex; gap: 16px; flex-wrap: wrap; }
.btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 28px; border-radius: 40px; font-weight: 600;
    text-decoration: none; transition: all 0.2s; border: none;
}
.btn-primary { background: var(--gradient); color: white; box-shadow: 0 4px 12px rgba(255,107,74,0.3); }
.btn-primary:hover { transform: translateY(-2px); filter: brightness(1.05); }
.pulse-btn { animation: pulse 1.5s infinite; background: var(--gradient); }
@keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.9; }
    100% { transform: scale(1); opacity: 1; }
}
.btn-outline { border: 1px solid var(--border); background: transparent; color: var(--text-primary); }
.btn-outline:hover { border-color: var(--accent); background: rgba(255,107,74,0.1); }
.hero-illustration { flex: 0.8; display: flex; justify-content: center; }
.floating-card {
    background: var(--bg-card); border-radius: 32px; padding: 30px;
    border: 1px solid var(--border); box-shadow: var(--shadow-xl);
    text-align: center; animation: float 6s ease-in-out infinite;
}
@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
.code-icon { font-size: 48px; margin-bottom: 20px; color: var(--accent); }
.tech-stack { display: flex; flex-direction: column; gap: 12px; }
.tech-stack span {
    background: rgba(255,107,74,0.1); padding: 8px 16px; border-radius: 40px;
    font-size: 0.875rem; transition: background 0.2s;
}
.tech-stack span:hover { background: rgba(255,107,74,0.2); }
.hero-shape { position: absolute; bottom: 0; left: 0; width: 100%; pointer-events: none; }
.hero-shape svg { width: 100%; height: auto; display: block; }

/* Секции */
.section-header { text-align: center; margin-bottom: 56px; }
.section-header h2 {
    font-size: 2.5rem; font-weight: 800; text-transform: uppercase;
    letter-spacing: 2px; margin-bottom: 12px; position: relative; display: inline-block;
}
.section-header h2::after {
    content: ''; position: absolute; bottom: -12px; left: 50%; transform: translateX(-50%);
    width: 60px; height: 3px; background: var(--gradient); border-radius: 3px;
}
.section-header p { color: var(--text-muted); max-width: 600px; margin: 24px auto 0; }

/* Кейсы */
.cases { padding: 80px 0; background: var(--bg-secondary); }
.cases-grid {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;
}
.case-card:first-child { grid-column: span 2; display: grid; grid-template-columns: 1fr 1fr; }
.case-card:first-child .case-gallery { grid-column: span 1; min-width: 0; }
.case-card:first-child .case-info { grid-column: span 1; }
.case-card {
    background: rgba(255,255,255,0.03); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.08); border-radius: 32px; overflow: hidden;
    display: flex; flex-wrap: wrap; transition: transform 0.3s, box-shadow 0.3s;
}
.case-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-xl); }
.case-gallery {
    flex: 1; min-width: 250px; display: flex; flex-wrap: wrap; gap: 8px;
    padding: 20px; background: rgba(0,0,0,0.02); align-items: center; justify-content: center;
}
.case-gallery img {
    max-width: 30%; border-radius: 16px; object-fit: cover;
    box-shadow: var(--shadow-sm); transition: transform 0.2s;
}
.case-gallery img:hover { transform: scale(1.02); }
.case-info { flex: 2; padding: 40px; }
.case-info h3 { font-size: 1.6rem; margin-bottom: 16px; color: var(--accent); }
.case-info p { margin-bottom: 12px; color: var(--text-secondary); line-height: 1.6; }
.case-stat { font-weight: 600; color: var(--accent); }
.case-tech { display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0; }
.case-tech span {
    background: var(--bg-secondary); padding: 4px 12px; border-radius: 40px; font-size: 0.75rem;
}
.case-links { display: flex; gap: 16px; margin-top: 16px; }
.btn-demo { color: var(--accent); font-weight: 500; text-decoration: none; }

/* Мой подход */
.mission { padding: 80px 0; background: var(--bg-primary); }
.mission-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; text-align: center; }
.mission-card {
    background: rgba(255,255,255,0.03); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.08); border-radius: 28px; padding: 30px 20px;
    transition: transform 0.3s, box-shadow 0.3s;
}
.mission-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); }
.mission-card i { font-size: 2.5rem; color: var(--accent); margin-bottom: 16px; }
.mission-card h3 { margin-bottom: 12px; }

/* Навыки */
.skills-section { padding: 80px 0; background: var(--bg-secondary); }
.skills-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.skill-category:first-child { grid-column: span 2; grid-row: span 2; }
.skill-category:last-child { grid-column: span 2; }
.skill-category {
    background: rgba(255,255,255,0.03); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 24px;
}
.skill-category h3 { font-size: 1.3rem; margin-bottom: 20px; color: var(--accent); }
.skill-items { display: flex; flex-direction: column; gap: 16px; }
.skill-item { display: flex; flex-direction: column; gap: 6px; }
.skill-item span { font-weight: 500; }
.skill-progress { height: 8px; background: var(--border); border-radius: 4px; overflow: hidden; }
.skill-progress-bar { height: 100%; background: var(--gradient); border-radius: 4px; width: 0%; transition: width 1s ease-out; }

/* Обо мне */
.about { padding: 80px 0; background: var(--bg-primary); }
.about-container { display: flex; gap: 48px; flex-wrap: wrap; align-items: center; }
.about-photo { flex: 1; min-width: 250px; }
.photo-frame { width: 100%; max-width: 350px; margin: 0 auto; border-radius: 32px; overflow: hidden; box-shadow: var(--shadow-lg); }
.photo-frame img { width: 100%; height: auto; display: block; }
.about-content { flex: 2; }
.about-content h2 { font-size: 2rem; margin-bottom: 20px; }
.about-content p { color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6; }
.coding-stats { display: flex; gap: 16px; flex-wrap: wrap; margin: 24px 0; }
.stat-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 40px; padding: 8px 20px; display: inline-flex; align-items: center; gap: 8px; }
.about-links { display: flex; gap: 16px; flex-wrap: wrap; }
.btn-resume, .btn-github, .btn-telegram {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 24px; border-radius: 40px; text-decoration: none; font-weight: 500; transition: all 0.2s;
}
.btn-resume { background: transparent; border: 1px solid var(--border); color: var(--text-primary); }
.btn-resume:hover { border-color: var(--accent); background: rgba(255,107,74,0.1); }
.btn-github { background: #333; color: white; }
.btn-github:hover { background: #555; transform: translateY(-2px); }
.btn-telegram { background: #0088cc; color: white; }
.btn-telegram:hover { background: #006699; transform: translateY(-2px); }

/* Блог */
.blog { padding: 80px 0; background: var(--bg-secondary); }
.blog-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px; }
.blog-card {
    background: rgba(255,255,255,0.03); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.08); border-radius: 28px; padding: 28px;
    transition: transform 0.3s, box-shadow 0.3s;
}
.blog-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); }
.blog-card h3 { font-size: 1.3rem; margin-bottom: 12px; }
.read-more { color: var(--accent); text-decoration: none; font-weight: 500; display: inline-block; margin-top: 16px; }

/* Отзывы */
.reviews { padding: 80px 0; background: var(--bg-primary); }
.reviews-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 30px; margin-bottom: 50px; }
.review-card {
    background: rgba(255,255,255,0.03); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 24px;
    transition: all 0.3s;
}
.review-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); border-color: var(--accent); }
.review-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.review-author { font-weight: 600; }
.review-rating { color: #ffb83b; letter-spacing: 2px; }
.review-text { color: var(--text-secondary); line-height: 1.5; font-size: 0.9rem; }
.review-date { margin-top: 12px; font-size: 0.7rem; color: var(--text-muted); text-align: right; }
.review-form-wrapper {
    max-width: 600px; margin: 0 auto; background: rgba(255,255,255,0.03);
    backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); border-radius: 32px; padding: 32px;
}
.rating-group { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.form-status { margin-top: 12px; font-size: 0.85rem; text-align: center; }

/* CTA */
.cta-section {
    padding: 100px 0; text-align: center;
    background: linear-gradient(135deg, #ff6b4a 0%, #ff8a5c 100%);
    color: white; border-radius: 40px; margin: 60px auto; max-width: 900px;
    box-shadow: 0 25px 50px rgba(255,107,74,0.3);
}
.cta-section h2 { font-size: 2.5rem; margin-bottom: 1rem; }
.cta-section p { font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9; }
.cta-btn {
    background: white; color: #ff6b4a; padding: 14px 36px; border-radius: 40px;
    font-weight: 700; text-decoration: none; display: inline-block;
    transition: transform 0.3s, box-shadow 0.3s; font-size: 1.1rem;
}
.cta-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.15); }

/* Контакты */
.contact { padding: 80px 0; background: var(--bg-secondary); }
.contact-wrapper { display: flex; gap: 48px; flex-wrap: wrap; }
.contact-form { flex: 2; display: flex; flex-direction: column; gap: 20px; }
.form-group { position: relative; }
.form-group input, .form-group textarea {
    width: 100%; padding: 14px 20px 14px 45px; background: var(--bg-card);
    border: 1px solid var(--border); border-radius: 28px; color: var(--text-primary);
    font-family: inherit; font-size: 1rem; outline: none; transition: border-color 0.2s;
}
.form-group input:focus, .form-group textarea:focus { border-color: var(--accent); }
.form-group i { position: absolute; left: 18px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
.form-group textarea ~ i { top: 20px; transform: none; }
.contact-info {
    flex: 1; background: rgba(255,255,255,0.03); backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.08); border-radius: 32px; padding: 32px;
    display: flex; flex-direction: column; gap: 24px;
}
.contact-item { display: flex; align-items: center; gap: 12px; font-size: 1rem; }
.contact-item i { width: 24px; color: var(--accent); }
.contact-item a { color: var(--text-primary); text-decoration: none; transition: color 0.2s; }
.contact-item a:hover { color: var(--accent); }

/* Footer CTA */
.footer-cta { text-align: center; padding: 60px 0 30px; }
.footer-cta-title { font-size: 3rem; font-weight: 900; letter-spacing: 4px; margin-bottom: 30px; color: var(--text-primary); text-transform: uppercase; }
.footer-social { display: flex; justify-content: center; gap: 30px; }
.social-icon { font-size: 2rem; color: var(--text-muted); transition: color 0.3s, text-shadow 0.3s, transform 0.3s; }
.social-icon:hover { transform: translateY(-5px); }
.telegram:hover { color: #0088cc; text-shadow: 0 0 20px rgba(0,136,204,0.5); }
.github:hover { color: #f0f6fc; text-shadow: 0 0 20px rgba(240,246,252,0.5); }
.email:hover { color: var(--accent); text-shadow: 0 0 20px rgba(255,107,74,0.5); }

/* Footer */
.footer { text-align: center; padding: 32px 0; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 0.875rem; }
.footer-links { display: flex; justify-content: center; gap: 24px; margin-top: 16px; }
.footer-links a { color: var(--text-muted); text-decoration: none; transition: color 0.2s; }
.footer-links a:hover { color: var(--accent); }

/* Скроллбар */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,107,74,0.3); border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: rgba(255,107,74,0.6); }

/* Анимации */
.fade-up { opacity: 0; transform: translateY(30px); transition: opacity 0.6s cubic-bezier(0.2,0.9,0.4,1.1), transform 0.6s cubic-bezier(0.2,0.9,0.4,1.1); }
.fade-up.appear { opacity: 1; transform: translateY(0); }

/* Отложенный рендеринг для секций ниже экрана */
section { content-visibility: auto; contain-intrinsic-size: 500px; }

/* Адаптив */
@media (max-width: 768px) {
    .hero-title { font-size: 2rem; }
    .nav { display: none; position: fixed; top: 70px; left: 0; width: 100%; background: var(--bg-card); flex-direction: column; padding: 20px; gap: 20px; border-bottom: 1px solid var(--border); box-shadow: var(--shadow-md); }
    .nav.active { display: flex; }
    .mobile-menu-btn { display: block; }
    .hero-container { flex-direction: column; text-align: center; }
    .hero-buttons, .hero-stats { justify-content: center; }
    .hero-desc { margin-left: auto; margin-right: auto; }
    .section-header h2 { font-size: 1.75rem; }
    .cases-grid { grid-template-columns: 1fr; }
    .case-card:first-child { grid-column: span 1; grid-template-columns: 1fr; }
    .case-card { flex-direction: column; }
    .skills-grid { grid-template-columns: 1fr; }
    .skill-category:first-child, .skill-category:last-child { grid-column: span 1; grid-row: span 1; }
    .about-container, .contact-wrapper { flex-direction: column; }
    .reviews-grid { grid-template-columns: 1fr; }
    .blog-grid { grid-template-columns: 1fr; }
    .mission-grid { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
    .case-gallery img { max-width: 45%; }
    .case-info { padding: 20px; }
}

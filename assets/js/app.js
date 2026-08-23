document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year') || document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Carrossel de destaques visuais no início da página.
    if (!document.querySelector('link[href="assets/css/slides.css"]')) {
        const slidesCss = document.createElement('link');
        slidesCss.rel = 'stylesheet';
        slidesCss.href = 'assets/css/slides.css';
        document.head.appendChild(slidesCss);
    }
    const hero = document.getElementById('inicio');
    if (hero && !document.getElementById('spotlight')) {
        const spotlight = document.createElement('section');
        spotlight.id = 'spotlight';
        spotlight.className = 'spotlight';
        spotlight.setAttribute('aria-label', 'Destaques em imagens');
        spotlight.innerHTML = `
            <div class="spotlight-shell">
                <div class="spotlight-track" aria-live="polite"></div>
                <button class="spotlight-control spotlight-prev" type="button" aria-label="Destaque anterior">‹</button>
                <button class="spotlight-control spotlight-next" type="button" aria-label="Próximo destaque">›</button>
                <div class="spotlight-dots" aria-label="Selecionar destaque"></div>
                <button class="spotlight-pause" type="button" aria-pressed="false">Ⅱ Pausar</button>
            </div>`;
        hero.insertAdjacentElement('beforebegin', spotlight);
        const slidesScript = document.createElement('script');
        slidesScript.src = 'assets/js/slides.js';
        document.body.appendChild(slidesScript);
    }

    // Área de atualizações profissionais.
    if (!document.querySelector('link[href="assets/css/noticias.css"]')) {
        const newsCss = document.createElement('link');
        newsCss.rel = 'stylesheet';
        newsCss.href = 'assets/css/noticias.css';
        document.head.appendChild(newsCss);
    }

    const navList = document.querySelector('#main-nav .nav-list');
    if (navList && !navList.querySelector('a[href="noticias.html"]')) {
        const contactItem = navList.querySelector('a.btn')?.closest('li');
        const li = document.createElement('li');
        li.innerHTML = '<a href="noticias.html">Atualizações</a>';
        navList.insertBefore(li, contactItem || null);
    }

    const projects = document.getElementById('projetos');
    if (projects && !document.getElementById('atualizacoes')) {
        const section = document.createElement('section');
        section.id = 'atualizacoes';
        section.className = 'section news-home-section';
        section.innerHTML = `
            <div class="container">
                <div class="section-heading-row">
                    <div>
                        <span class="section-eyebrow">TRAJETÓRIA EM MOVIMENTO</span>
                        <h2 class="section-title">Atualizações profissionais</h2>
                        <p class="section-subtitle">Novos desenvolvimentos, projetos em andamento, entregas e marcos que registram a evolução do meu trabalho em tecnologia.</p>
                    </div>
                    <a class="btn btn-outline news-all-link" href="noticias.html">Ver todas as atualizações</a>
                </div>
                <div id="noticias-destaque" class="news-grid" aria-live="polite"><p class="news-loading">Carregando atualizações...</p></div>
            </div>`;
        projects.insertAdjacentElement('afterend', section);

        const newsScript = document.createElement('script');
        newsScript.src = 'assets/js/noticias.js';
        document.body.appendChild(newsScript);
    }

    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.getElementById('main-nav');
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            menuBtn.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');
        });
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            if (form.dataset.formDisabled === 'true' || !form.action) {
                e.preventDefault();
                form.querySelector('.form-feedback')?.remove();
                const feedback = document.createElement('p');
                feedback.className = 'form-feedback';
                feedback.setAttribute('role', 'alert');
                feedback.textContent = 'O envio online ainda não está ativado. Nenhum dado foi transmitido.';
                form.appendChild(feedback);
                return;
            }
        });
    });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                obs.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });

    document.querySelectorAll('.card, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

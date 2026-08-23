document.addEventListener('DOMContentLoaded', () => {
    // Atualizar ano no footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Menu Mobile
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.getElementById('main-nav');
    
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            menuBtn.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');
        });

        // Fechar menu ao clicar em um link
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Formulários: envio protegido até configuração explícita de um endpoint
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (form.dataset.formDisabled === 'true' || !form.action) {
                e.preventDefault();
                const existing = form.querySelector('.form-feedback');
                if (existing) existing.remove();

                const feedback = document.createElement('p');
                feedback.className = 'form-feedback';
                feedback.setAttribute('role', 'alert');
                feedback.textContent = 'O envio online ainda não está ativado. Nenhum dado foi transmitido.';
                form.appendChild(feedback);
                feedback.focus?.();
                return;
            }
        });
    });

    // Animação de entrada suave ao rolar (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});
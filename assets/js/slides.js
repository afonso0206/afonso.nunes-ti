(()=>{
    async function initSlides(){
        const root=document.getElementById('spotlight');
        if(!root)return;

        let slides=[];
        try{
            const response=await fetch('dados/slides.json?'+Date.now(),{cache:'no-store'});
            if(!response.ok)throw new Error(`HTTP ${response.status}`);
            slides=await response.json();
        }catch(e){
            console.error('Falha ao carregar slides:',e);
            return;
        }

        if(!Array.isArray(slides)||!slides.length)return;

        root.classList.add('is-ready');
        if(slides.length===1)root.classList.add('spotlight-single');

        const track=root.querySelector('.spotlight-track');
        const dots=root.querySelector('.spotlight-dots');
        if(!track||!dots)return;

        let current=0;
        let timer=null;
        let paused=false;

        const escapeHtml=(value='')=>String(value)
            .replace(/&/g,'&amp;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')
            .replace(/"/g,'&quot;')
            .replace(/'/g,'&#039;');

        track.innerHTML=slides.map((s,i)=>`
            <article class="spotlight-slide${i===0?' is-active':''}" aria-hidden="${i===0?'false':'true'}">
                <img src="${escapeHtml(s.imagem)}" alt="${escapeHtml(s.alt||s.titulo||'Imagem de destaque')}" width="1600" height="720" loading="${i===0?'eager':'lazy'}">
                <div class="spotlight-overlay"></div>
                <div class="spotlight-content">
                    ${s.categoria?`<span class="spotlight-kicker">${escapeHtml(s.categoria)}</span>`:''}
                    <h2 class="spotlight-title">${escapeHtml(s.titulo||'')}</h2>
                    ${s.resumo?`<p class="spotlight-text">${escapeHtml(s.resumo)}</p>`:''}
                    ${s.link?`<a class="spotlight-link" href="${escapeHtml(s.link)}">${escapeHtml(s.botao||'Saiba mais')}</a>`:''}
                </div>
            </article>`).join('');

        dots.innerHTML=slides.map((_,i)=>`<button class="spotlight-dot${i===0?' is-active':''}" aria-label="Ir para destaque ${i+1}" data-index="${i}"></button>`).join('');

        const items=[...track.children];
        const dotEls=[...dots.children];

        function show(i){
            current=(i+items.length)%items.length;
            items.forEach((el,n)=>{
                el.classList.toggle('is-active',n===current);
                el.setAttribute('aria-hidden',n===current?'false':'true');
            });
            dotEls.forEach((el,n)=>el.classList.toggle('is-active',n===current));
        }

        function stop(){
            if(timer)clearInterval(timer);
            timer=null;
        }

        function start(){
            stop();
            if(slides.length<2||paused||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
            timer=setInterval(()=>show(current+1),6500);
        }

        root.querySelector('.spotlight-prev')?.addEventListener('click',()=>{show(current-1);start();});
        root.querySelector('.spotlight-next')?.addEventListener('click',()=>{show(current+1);start();});
        dotEls.forEach(el=>el.addEventListener('click',()=>{show(Number(el.dataset.index));start();}));

        const pause=root.querySelector('.spotlight-pause');
        pause?.addEventListener('click',()=>{
            paused=!paused;
            pause.textContent=paused?'▶ Continuar':'Ⅱ Pausar';
            pause.setAttribute('aria-pressed',String(paused));
            paused?stop():start();
        });

        root.addEventListener('mouseenter',stop);
        root.addEventListener('mouseleave',start);
        root.addEventListener('focusin',stop);
        root.addEventListener('focusout',start);

        start();
    }

    if(document.readyState==='loading'){
        document.addEventListener('DOMContentLoaded',initSlides,{once:true});
    }else{
        initSlides();
    }
})();

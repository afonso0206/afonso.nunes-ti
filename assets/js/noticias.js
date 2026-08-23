(() => {
 const fmt=v=>{const[y,m,d]=v.split('-').map(Number);return new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'long',year:'numeric'}).format(new Date(y,m-1,d))};
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
 const card=x=>`<article class="news-card"><div class="news-card-top"><span class="news-category">${esc(x.categoria)}</span><time datetime="${esc(x.data)}">${fmt(x.data)}</time></div><h3>${esc(x.titulo)}</h3><p>${esc(x.resumo)}</p><div class="news-card-footer"><span class="news-status">${esc(x.status)}</span><a href="noticias.html#${encodeURIComponent(x.id)}">Ler atualização</a></div></article>`;
 async function load(){try{const r=await fetch('dados/noticias.json',{cache:'no-store'});if(!r.ok)throw 0;const a=await r.json();a.sort((x,y)=>y.data.localeCompare(x.data));
 const h=document.getElementById('noticias-destaque');if(h)h.innerHTML=a.filter(x=>x.destaque).slice(0,3).map(card).join('')||'<p class="news-loading">Nenhuma atualização publicada.</p>';
 const l=document.getElementById('noticias-lista');if(l)l.innerHTML=a.map(x=>`<article class="timeline-item" id="${esc(x.id)}"><div class="timeline-date"><time datetime="${esc(x.data)}">${fmt(x.data)}</time></div><div class="timeline-card"><div class="news-card-top"><span class="news-category">${esc(x.categoria)}</span><span class="news-status">${esc(x.status)}</span></div><h2>${esc(x.titulo)}</h2><p class="timeline-lead">${esc(x.resumo)}</p><p>${esc(x.conteudo)}</p></div></article>`).join('');
 }catch(e){document.querySelectorAll('.news-loading').forEach(x=>x.textContent='Não foi possível carregar as atualizações.')}} document.addEventListener('DOMContentLoaded',load);
})();

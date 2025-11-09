// ===== УТИЛИТЫ =====
const $ = (q, root=document) => root.querySelector(q);
const $$ = (q, root=document) => [...root.querySelectorAll(q)];
const fmtDate = d => new Date(d).toLocaleDateString('ru-RU', {year:'numeric', month:'2-digit', day:'2-digit'});

// ===== ДАННЫЕ (можешь менять под свой клуб) =====
const PLAYERS = [
  { id:1, name:'@mrdv71', nick:'Murodov', pos:'FWD', number:9, foot:'right', age:24, goals:12, assists:6, nation:'UZB', avatar:'', bio:'Ключевой нападающий. Обожает рывки за спину и хладнокровно завершает.' },
  { id:2, name:'@fayziyev04', nick:'Dilshod', pos:'MID', number:8, foot:'both', age:23, goals:5,  assists:10, nation:'UZB', avatar:'', bio:'Режиссёр игры. Подачи и кроссы с хирургической точностью.' },
  { id:3, name:'@DovaJR', nick:'Davron', pos:'DEF', number:4, foot:'right', age:27, goals:2,  assists:1, nation:'UZB', avatar:'', bio:'Оплот обороны. Надёжный в верховой борьбе.' },
  { id:4, name:'@Hayit_im', nick:'Hayit', pos:'MID', number:6, foot:'left', age:25, goals:3,  assists:7, nation:'UZB', avatar:'', bio:'Box-to-box мотор. Откатывается в опорку и подключается в атаку.' },
  { id:5, name:'@pesser_Uzb_7', nick:'PESSER', pos:'FWD', number:7, foot:'right', age:22, goals:9,  assists:4, nation:'UZB', avatar:'', bio:'Вингер с отличным дриблингом и ударами в дальнюю.' },
  { id:6, name:'@z040uc', nick:'Fara', pos:'GK', number:1, foot:'right', age:28, goals:0,  assists:1, nation:'UZB', avatar:'', bio:'Кипер. Командует линией обороны и читает игру.' },
  { id:7, name:'@blitz_curIer', nick:'Diyor', pos:'DEF', number:3, foot:'left', age:26, goals:1,  assists:2, nation:'UZB', avatar:'', bio:'Левый защитник. Подключается по флангу и надёжно страхует.' },
  { id:8, name:'@Dostonbekk_1996', nick:'Doston', pos:'MID', number:10, foot:'both', age:29, goals:6,  assists:8, nation:'UZB', avatar:'', bio:'Playmaker с видением поля. Стандарты — его стихия.' },
  { id:9, name:'@UZ_Axror', nick:'Axror', pos:'DEF', number:5, foot:'right', age:24, goals:0,  assists:1, nation:'UZB', avatar:'', bio:'Центрбек, силовой, выигрывает дуэли 1v1.' },
  { id:10, name:'@zyx_YUTA', nick:'Yuta', pos:'FWD', number:11, foot:'left', age:21, goals:7,  assists:3, nation:'UZB', avatar:'', bio:'Скоростной форвард. Играет на опережение.' },
  { id:11, name:'@N1_MVP', nick:'Fedya', pos:'MID', number:14, foot:'right', age:23, goals:4,  assists:5, nation:'UZB', avatar:'', bio:'Тактическая гибкость, страхует зоны и читает передачи.' },
];

const MATCHES = [
  // date, opponent, gf, ga, competition, scorers (array of strings)
  { date:'2025-10-01', opponent:'Mahalla', gf:4, ga:2, comp:'Friendly', scorers:['MRDV (2)','PESSER','YUTA'] },
  { date:'2025-10-15', opponent:'Only Games', gf:2, ga:2, comp:'Friendly', scorers:['FAYZ','DOS'] },
  { date:'2025-10-28', opponent:'Arena Team', gf:1, ga:0, comp:'Cup QF', scorers:['MRDV'] },
  { date:'2025-11-02', opponent:'Zeta Division', gf:3, ga:1, comp:'League', scorers:['YUTA','MRDV','DOS'] },
  { date:'2025-11-06', opponent:'Peaky Blinders', gf:3, ga:2, comp:'League', scorers:['PESSER'] },
];

// ===== Навигация: плавный скролл и бургер =====
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = $$('.nav-link');
  const navToggle = $('.nav-toggle');
  const navMenu = $('.nav-menu');
  navLinks.forEach(link=>{
    link.addEventListener('click', e=>{
      e.preventDefault();
      const id = link.getAttribute('href');
      const target = document.querySelector(id);
      if(!target) return;
      const navH = $('.navbar').getBoundingClientRect().height;
      const top = target.getBoundingClientRect().top + window.scrollY - (navH + 10);
      window.scrollTo({ top, behavior:'smooth' });
      if (getComputedStyle(navToggle).display !== 'none' && navMenu.style.display==='flex'){
        navMenu.style.display='none';
        navToggle.setAttribute('aria-expanded','false');
        navToggle.classList.remove('active');
      }
    });
  });

  navToggle.addEventListener('click', ()=>{
    const visible = navMenu.style.display==='flex';
    navMenu.style.display = visible ? 'none' : 'flex';
    navMenu.style.flexDirection = 'column';
    navMenu.style.position='absolute';
    navMenu.style.top='100%';
    navMenu.style.left='0';
    navMenu.style.right='0';
    navMenu.style.gap='1rem';
    navMenu.style.background='rgba(12,12,12,.98)';
    navMenu.style.borderTop='1px solid rgba(212,175,55,.35)';
    navMenu.style.padding='1rem 20px';
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', String(!visible));
  });

  // подсветка навбара при скролле
  window.addEventListener('scroll', ()=>{
    const navbar = $('.navbar');
    if (window.scrollY > 100){
      navbar.style.background='rgba(12,12,12,.95)';
      navbar.style.boxShadow='0 2px 20px rgba(0,0,0,.45)';
    } else {
      navbar.style.background='rgba(12,12,12,.85)';
      navbar.style.boxShadow='none';
    }
  });

  // эффект печати заголовка
  const titleEl = $('.hero-title');
  const text = titleEl.dataset.type || titleEl.textContent.trim();
  titleEl.textContent = '';
  let i=0;
  (function typeIt(){
    if(i<text.length){ titleEl.textContent += text.charAt(i++); setTimeout(typeIt, 90); }
  })();

  // лёгкие «частицы» для фона
  createParticles(36);

  // counters
  animateCounters();

  // отрисовка состава и матчей
  renderSquad();
  bindSquadFilters();
  renderHistory();
  bindHistoryFilters();

  // форма
  bindForm();

  // модал
  bindModal();
});

// ===== Частицы =====
function createParticles(n=40){
  const hero = $('.hero');
  for(let i=0;i<n;i++){
    const p = document.createElement('span');
    p.style.position='absolute';
    p.style.width='2px'; p.style.height='2px';
    p.style.background='#d4af37'; p.style.borderRadius='50%';
    p.style.left = Math.random()*100 + 'vw';
    p.style.top = Math.random()*100 + 'vh';
    p.style.opacity = (Math.random()*0.6).toFixed(2);
    const dur = (Math.random()*10 + 6).toFixed(2);
    p.style.animation = `floatUp ${dur}s linear infinite`;
    hero.appendChild(p);
  }
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatUp {
      0% { transform: translateY(0) translateX(0); opacity: .1; }
      50% { opacity: .9; }
      100% { transform: translateY(-90vh) translateX(80px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// ===== Counters =====
function animateCounters(){
  $$('.fact-num').forEach(el=>{
    const target = Number(el.dataset.counter||0);
    let cur = 0;
    const step = Math.max(1, Math.round(target/60));
    const t = setInterval(()=>{
      cur += step;
      if(cur>=target){ cur = target; clearInterval(t); }
      el.textContent = String(cur);
    }, 16);
  });
}

// ===== Состав =====
function cardHTML(p){
  const initials = p.nick?.[0] || 'I';
  const avatar = p.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(initials)}&backgroundType=gradientLinear&fontFamily=Georgia`;
  return `
    <article class="card" data-id="${p.id}" data-pos="${p.pos}" data-foot="${p.foot}">
      <div class="row">
        <img class="avatar" src="${avatar}" alt="Аватар ${p.nick}" loading="lazy">
        <div>
          <h4>${p.nick} <span class="tag">${p.pos}</span></h4>
          <div class="meta">#${p.number} • ${p.name} • ${p.nation}</div>
          <div class="stats">
            <span class="stat">Голы: ${p.goals}</span>
            <span class="stat">Пасы: ${p.assists}</span>
            <span class="stat">Нога: ${labelFoot(p.foot)}</span>
          </div>
        </div>
      </div>
    </article>
  `;
}
function labelFoot(foot){
  return foot==='left'?'Левая':foot==='right'?'Правая':'Двуногий';
}
function renderSquad(){
  const grid = $('#squadGrid');
  grid.innerHTML = PLAYERS.map(cardHTML).join('');
  // клик -> модал
  $$('#squadGrid .card').forEach(c=>{
    c.addEventListener('click', ()=>{
      const id = Number(c.dataset.id);
      const p = PLAYERS.find(x=>x.id===id);
      openPlayerModal(p);
    });
  });
}
function bindSquadFilters(){
  const q = $('#playerSearch');
  const pos = $('#positionFilter');
  const foot = $('#footFilter');
  const empty = $('#squadEmpty');
  function apply(){
    const qv = q.value.trim().toLowerCase();
    const pv = pos.value;
    const fv = foot.value;

    const cards = $$('#squadGrid .card');
    let visible = 0;
    cards.forEach(card=>{
      const id = Number(card.dataset.id);
      const pl = PLAYERS.find(x=>x.id===id);
      let ok = true;
      if(qv){
        ok = (pl.name.toLowerCase().includes(qv) || pl.nick.toLowerCase().includes(qv));
      }
      if(ok && pv){ ok = (pl.pos===pv); }
      if(ok && fv){ ok = (pl.foot===fv); }
      card.style.display = ok ? '' : 'none';
      if(ok) visible++;
    });
    empty.classList.toggle('hidden', visible!==0);
  }
  [q,pos,foot].forEach(el=>el.addEventListener('input', apply));
}

// ===== История матчей =====
function resultOf(m){ return m.gf>m.ga?'W':m.gf===m.ga?'D':'L'; }
function resultBadge(r){
  return `<span class="result-badge result-${r}">${r==='W'?'Победа':r==='D'?'Ничья':'Поражение'}</span>`;
}
function renderHistory(){
  const body = $('#historyBody');
  const cards = $('#summaryCards');
  const { list, w, d, l, gf, ga } = filteredMatches();
  body.innerHTML = list.map(m=>`
    <tr>
      <td>${fmtDate(m.date)}</td>
      <td>${m.opponent}</td>
      <td>${m.gf}:${m.ga}</td>
      <td>${resultBadge(resultOf(m))}</td>
      <td>${m.comp}</td>
      <td>${m.scorers.join(', ')}</td>
    </tr>
  `).join('');

  cards.innerHTML = `
    <div class="kpi"><div class="k">Баланс</div><div class="v">${w}-${d}-${l}</div></div>
    <div class="kpi"><div class="k">Забито</div><div class="v">${gf}</div></div>
    <div class="kpi"><div class="k">Пропущено</div><div class="v">${ga}</div></div>
    <div class="kpi"><div class="k">Разница</div><div class="v">${gf-ga>=0?'+':''}${gf-ga}</div></div>
  `;
}
function filteredMatches(){
  const opp = $('#opponentSearch').value.trim().toLowerCase();
  const rf = $('#resultFilter').value;
  const sort = $('#sortBy').value;
  let list = MATCHES.slice();

  if(opp){ list = list.filter(m=>m.opponent.toLowerCase().includes(opp)); }
  if(rf){ list = list.filter(m=>resultOf(m)===rf); }

  switch(sort){
    case 'date_asc': list.sort((a,b)=> new Date(a.date)-new Date(b.date)); break;
    case 'date_desc': list.sort((a,b)=> new Date(b.date)-new Date(a.date)); break;
    case 'gf_desc': list.sort((a,b)=> b.gf-a.gf); break;
    case 'ga_desc': list.sort((a,b)=> b.ga-a.ga); break;
  }

  const w = list.filter(m=>resultOf(m)==='W').length;
  const d = list.filter(m=>resultOf(m)==='D').length;
  const l = list.filter(m=>resultOf(m)==='L').length;
  const gf = list.reduce((s,m)=>s+m.gf,0);
  const ga = list.reduce((s,m)=>s+m.ga,0);
  return { list,w,d,l,gf,ga };
}
function bindHistoryFilters(){
  ['opponentSearch','resultFilter','sortBy'].forEach(id=>{
    $('#'+id).addEventListener('input', renderHistory);
  });
}

// ===== Форма =====
function bindForm(){
  const form = $('.contact-form');
  const ok = $('.form-ok');
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const btn = form.querySelector('button');
    const txt = btn.textContent;
    btn.disabled = true; btn.textContent = 'Отправка...';
    setTimeout(()=>{
      btn.disabled = false; btn.textContent = txt;
      ok.classList.remove('hidden');
      form.reset();
      setTimeout(()=> ok.classList.add('hidden'), 4000);
    }, 1000);
  });
}

// ===== Модал игрока =====
function bindModal(){
  const modal = $('#playerModal');
  const close = $('.modal-close');
  close.addEventListener('click', ()=> closeModal());
  modal.addEventListener('click', e=>{ if(e.target===modal) closeModal(); });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });
}
function openPlayerModal(p){
  const modal = $('#playerModal');
  const box = $('#modalContent');
  const avatar = p.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(p.nick||'I')}&backgroundType=gradientLinear&fontFamily=Georgia`;
  box.innerHTML = `
    <div class="row" style="gap:1rem;align-items:flex-start">
      <img class="avatar" src="${avatar}" alt="Аватар ${p.nick}" style="width:72px;height:72px">
      <div>
        <h3 style="margin:0 0 .25rem 0">${p.nick} <span class="tag">${p.pos}</span></h3>
        <div class="meta">#${p.number} • ${p.name} • ${p.nation} • ${p.age} лет • ${labelFoot(p.foot)}</div>
        <div class="stats" style="margin-top:.6rem">
          <span class="stat">Голы: ${p.goals}</span>
          <span class="stat">Пасы: ${p.assists}</span>
        </div>
        <p style="margin-top:.8rem;color:#ddd">${p.bio}</p>
      </div>
    </div>
  `;
  modal.style.display='grid';
  modal.setAttribute('aria-hidden','false');
}
function closeModal(){
  const modal = $('#playerModal');
  modal.style.display='none';
  modal.setAttribute('aria-hidden','true');
}

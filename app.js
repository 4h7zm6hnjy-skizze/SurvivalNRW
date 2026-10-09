'use strict';
const D=window.SURVIVAL_DATA;
if (!D){ document.getElementById('view').innerHTML='<p>Die Inhalte konnten nicht geladen werden.</p>';throw new Error('Missing survival data');}
const el=document.getElementById('view');
const ICONS={
 home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-8h6v8"/>',
 book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
 leaf:'<path d="M20 4c-7 0-16 2-16 11a5 5 0 0 0 5 5c9 0 11-9 11-16Z"/><path d="M4 20c4-6 8-9 13-12"/>',
 check:'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
 menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
 compass:'<circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.6 5.8-5.8 2.6 2.6-5.8z"/>',
 droplets:'<path d="M12 2C8.5 7 5 10 5 14a7 7 0 0 0 14 0c0-4-3.5-7-7-12Z"/>',
 flame:'<path d="M12 22c4.7 0 8-3.3 8-7.7 0-3-1.7-5.4-4-7.8-.4 2.5-1.7 3.7-3.1 4.4C13 7.1 10.2 4.4 8.4 2 8 6 4 9.7 4 14.3A8 8 0 0 0 12 22Z"/>',
 tent:'<path d="m3 20 9-17 9 17H3Z"/><path d="m12 3 1 17M8 20l4-7 4 7"/>',
 package:'<path d="m12 2-9 5v10l9 5 9-5V7z"/><path d="m3 7 9 5 9-5m-9 5v10"/>',
 cooking:'<path d="M3 11h18v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-6ZM7 8V3m5 5V3m5 5V3"/>',
 paw:'<circle cx="7" cy="8" r="1"/><circle cx="13" cy="6" r="1"/><circle cx="18" cy="9" r="1"/><path d="M12 13c-2.5 0-3.5 3-5.5 4.5-1.4 1.6-.4 3.5 1.7 3.5 1.5 0 2.6-.7 3.8-.7s2.3.7 3.8.7c2.1 0 3.1-1.9 1.7-3.5C15.5 16 14.5 13 12 13Z"/>',
 sprout:'<path d="M12 22V11"/><path d="M12 15c-5 0-8-2-8-8 5 0 8 2 8 8Zm0-4c0-5 3-8 8-8 0 5-3 8-8 8Z"/>',
 plus:'<path d="M12 5v14M5 12h14"/><circle cx="12" cy="12" r="10"/>',
 clipboard:'<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4.5h6v3H9zM8 13l2 2 4-4"/>',
 route:'<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h6a4 4 0 0 0 0-8h-4a4 4 0 0 1 0-8h6"/>',
 crosshair:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 1v4m0 14v4M1 12h4m14 0h4"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
 arrow:'<path d="m14 7-5 5 5 5"/>',
 next:'<path d="m9 7 5 5-5 5"/>',
 star:'<path d="m12 2 3.1 6.3 7 .9-5 5 .9 7-6-3.3-6 3.3.9-7-5-5 7-.9Z"/>',
 location:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
 info:'<circle cx="12" cy="12" r="10"/><path d="M12 11v6m0-10v.1"/>',
 refresh:'<path d="M3 12a9 9 0 0 1 15-7l3 3M21 12a9 9 0 0 1-15 7l-3-3M21 3v5h-5M3 21v-5h5"/>',
 alert:'<path d="m12 2 10 18H2Z"/><path d="M12 9v4m0 3v.1"/>',
 download:'<path d="M12 3v12m-4-4 4 4 4-4M4 17v4h16v-4"/>',
 lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
 clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'
};
function icon(n,klass=''){return `<span class="icon ${klass}" aria-hidden="true"><svg viewBox="0 0 24 24">${ICONS[n]||ICONS.info}</svg></span>`}
function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function imgsrc(id){const i=window.SURVIVAL_INLINE_IMAGES;return i&&i[id]?i[id]:`./${encodeURIComponent((id+'.webp').normalize('NFD'))}`}
function pic(id,alt,clazz=''){return `<img class="${clazz}" src="${imgsrc(id)}" alt="${esc(alt||'KI-generierte fotorealistische Szene')}" loading="lazy">`}
const store={
 get(k,def){try{const v=localStorage.getItem('survival-nrw:'+k);return v===null?def:JSON.parse(v)}catch(e){return def}},
 set(k,v){try{localStorage.setItem('survival-nrw:'+k,JSON.stringify(v))}catch(e){toast('Speichern ist in diesem Browser nicht verfügbar.')}}
};
const GALLERY=[
 ['unterstand','Unterstand mit Plane','Unterschlupf'],
 ['laubhütte','Laubhütte aus Naturmaterial','Unterschlupf'],
 ['lager','Lager mit Schlafstätte','Unterschlupf'],
 ['knoten','Knoten und Seilverbindungen','Unterschlupf'],
 ['feuer','Feuer mit Feuerstahl entzünden','Feuer & Kochen'],
 ['kochen','Dreibein und Lagerküche','Feuer & Kochen'],
 ['filter','Schichtfilter im Wald','Wasser'],
 ['regen','Regenwasser auffangen','Wasser'],
 ['foraging','Wildpflanzen sammeln','Pflanzen'],
 ['spitzwegerich','Spitzwegerich','Pflanzen'],
 ['schafgarbe','Schafgarbe','Pflanzen'],
 ['brennnessel','Brennnessel','Pflanzen'],
 ['kamille','Echte Kamille','Pflanzen'],
 ['silberweide','Silberweide','Pflanzen'],
 ['holunder','Schwarzer Holunder','Pflanzen'],
 ['brombeere','Brombeere','Pflanzen'],
 ['löwenzahn','Löwenzahn','Pflanzen'],
 ['haselnuss','Haselnuss','Pflanzen'],
 ['heilkraut','Kräuteraufguss','Pflanzen'],
 ['fährten','Wildspuren untersuchen','Jagd & Wildbret'],
 ['kleinwild','Kleinwild versorgen','Jagd & Wildbret'],
 ['fish','Fisch hygienisch vorbereiten','Jagd & Wildbret'],
 ['fell','Fell aufspannen','Jagd & Wildbret'],
 ['erstehilfe','Erste Hilfe','Notfall'],
 ['orientierung','Karte und Rettungssignal','Notfall']
].map(([id,title,category])=>({id,title,category}));
let activeGalleryIndex=0;
let toastTimer=null;
function toast(s){const t=document.getElementById('toast');t.textContent=s;t.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('visible'),3100)}
const chapters=D.chapters, plants=D.plants;
const chById=(id)=>chapters.find(x=>String(x.id)===String(id));
const plantById=id=>plants.find(x=>x.id===id);
function favs(){return store.get('favorites',[])}
function isFav(type,id){return favs().includes(type+':'+id)}
function favButton(type,id){let on=isFav(type,id);return `<button class="btn ${on?'secondary':'outline'} small" data-action="favorite" data-type="${esc(type)}" data-id="${esc(id)}" aria-pressed="${on}">${icon('star','sm')} ${on?'Gemerkt':'Merken'}</button>`}
function imageFigure(id,title,kind='scene'){
 return `<figure class="section-photo"><button type="button" class="photo-open" data-action="image-open" data-id="${esc(id)}" aria-label="Bild vergrößern: ${esc(title)}">${pic(id,`${kind==='plant'?'KI-generierte Darstellung der Pflanze':'KI-generiertes Szenenbild'}: ${title}`)}</button><figcaption>KI-generierte, fotorealistische Darstellung · ${esc(title)}. ${kind==='plant'?'Nicht als alleinige Grundlage zur Pflanzenbestimmung verwenden.':'Gezeigte Details vor praktischer Nutzung kritisch prüfen.'}</figcaption></figure>`;
}
function photoCard(id,title,subtitle,url){return `<a class="feature-card" href="${url}">${pic(id,title)}<div class="card-body"><strong>${esc(title)}</strong><p>${esc(subtitle)}</p><span class="visual-tag">KI-Foto</span></div></a>`}
function chapterCard(ch){return `<a class="chapter-card" href="#/wissen/${ch.id}">${pic(ch.hero,ch.title)}<div class="card-body"><div class="card-kicker">Kapitel ${String(ch.id).padStart(2,'0')}</div><strong>${esc(ch.title)}</strong><p>${esc(ch.summary)}</p></div></a>`}
function plantCard(p){return `<a class="plant-card" href="#/pflanze/${p.id}">${pic(p.image,`KI-Rekonstruktion ${p.name}`)}<div class="card-body"><div class="card-kicker">${p.category==='nahrung'?'Wildnahrung':'Pflanzenkunde'}</div><strong>${esc(p.name)}</strong><p><i>${esc(p.latin)}</i></p><span class="visual-tag">KI-Foto · prüfen</span></div></a>`}
function pageTitle(kicker,title,sub){return `<header class="page-head"><div class="eyebrow">${esc(kicker)}</div><h1>${esc(title)}</h1>${sub?`<p>${esc(sub)}</p>`:''}</header>`}
function dangerDisclaimer(){return `<div class="notice warning">${icon('alert','sm')} <strong>Wichtig:</strong> Die Pflanzenbilder wurden mit KI erstellt. Sie können botanische Fehler enthalten. Niemals Pflanzen allein anhand dieser Bilder essen oder medizinisch anwenden. Zuverlässige Bestimmung und medizinische Beratung haben Vorrang.</div>`}
function home(){return `
 <section class="hero">${pic('unterstand','KI-generierter Unterschlupf im Wald')}<div class="hero-content"><div class="eyebrow">Dein mobiles Survival-Handbuch</div><h1>Draußen vorbereitet.<br><em>Richtig handeln.</em></h1><p>Praktisches Überlebenswissen für Nordrhein-Westfalen: Unterschlupf, Wasser, Feuer, Nahrung, Jagdhygiene und Erste Hilfe – illustriert mit fotorealistischen KI-Bildern.</p><div class="actions"><a class="btn" href="#/wissen">${icon('book','sm')} Handbuch öffnen</a><a class="btn danger" href="#/notfall">${icon('plus','sm')} Notfallhilfe</a></div><p class="hero-note">13 Kapitel · 9 Pflanzenprofile · lokal gespeicherte Checklisten</p></div></section>
 <div class="quick-grid">
 <a class="quick-link" href="#/wissen/3">${icon('tent','lg')}<span><strong>Unterschlupf</strong><small>Schutz & Lager</small></span></a>
 <a class="quick-link" href="#/wissen/7">${icon('droplets','lg')}<span><strong>Wasser</strong><small>Gewinnen & reinigen</small></span></a>
 <a class="quick-link" href="#/wissen/5">${icon('flame','lg')}<span><strong>Feuer</strong><small>Material & Technik</small></span></a>
 <a class="quick-link" href="#/pflanzen">${icon('leaf','lg')}<span><strong>Pflanzen</strong><small>9 Arten im Überblick</small></span></a>
 </div>
 <section class="danger-card"><h3>${icon('alert')} Akute Notlage?</h3><p>Bei einer ernsthaften Gefahr zuerst Eigenschutz, Standort und Rettung. Nicht auf improvisierte Nahrungssuche oder Feuer konzentrieren.</p><a class="btn danger" href="#/notfall">Soforthilfe und Notruf ${icon('next','sm')}</a></section>
 <div class="section-title"><h2>Das ist im Handbuch</h2><a href="#/wissen" class="tiny muted">Alle 13 Kapitel →</a></div>
 <div class="feature-grid">${photoCard('laubhütte','Lager und Unterschlupf','Schutz vor Nässe und Kälte','#/wissen/3')}${photoCard('fährten','Jagd und Fährten','Wild erkennen, Wildhygiene','#/wissen/9')}${photoCard('filter','Trinkwasser','Improvisierte Filter richtig einordnen','#/wissen/7')}</div>
 <div class="section-title"><h2>Bildgalerie</h2><a class="tiny muted" href="#/bilder">Alle 25 Bilder →</a></div><a class="gallery-banner" href="#/bilder">${pic('fährten','Wildspuren als KI-Fotografie')}<span><strong>25 fotorealistische Bilder ansehen</strong><small>Unterschlupf · Wasser · Pflanzen · Jagd · Erste Hilfe</small></span>${icon('next')}</a><div class="section-title"><h2>Häufig benötigte Hilfe</h2></div><div class="small-links"><a class="quick-link" href="#/check">${icon('clipboard')}<span><strong>10-Minuten-Check</strong><small>Was jetzt wichtig ist</small></span></a><a class="quick-link" href="#/suche">${icon('search')}<span><strong>Im Handbuch suchen</strong><small>Stichwort eingeben</small></span></a></div>
 <p class="footer-note">Ein privater, bebilderter Notfallratgeber. Die Foto-Szenen und Pflanzenbilder sind KI-generiert, nicht vor Ort aufgenommen. Fachliche Hinweise und rechtliche Grenzen beachten.</p>`}
function wissensliste(){return `${pageTitle('Survival NRW','Alle Wissenskapitel','Das komplette Notfallhandbuch mit Bildern und einzelnen Arbeitsschritten.')}
 <a href="#/suche" class="search-box">${icon('search')}<span style="padding:12px 0;color:#b3c9b6;font-size:13px">Kapitel und Anleitungen durchsuchen…</span></a>
 <div class="section-title"><h2>13 Kapitel</h2><span class="pill">NRW · Wald & Natur</span></div>
 <div class="chapter-grid">${chapters.map(chapterCard).join('')}</div>`}
function renderBlocks(blocks){let html='',ulOpen=false;
 const closeUl=()=>{if(ulOpen){html+='</ul>';ulOpen=false;}}
 for(let i=0;i<blocks.length;i++){
 const b=blocks[i],s=b.text||'';
 if(b.kind!=='li')closeUl();
 if(b.kind==='h2'||b.kind==='h3')html+=`<${b.kind} id="sec-${i}">${esc(s)}</${b.kind}>`;
 else if(b.kind==='li'){if(!ulOpen){html+='<ul>';ulOpen=true}html+=`<li>${esc(s)}</li>`}
 else if(b.kind==='p'||b.kind==='caption'){html+=`<p${/^\d+\.\s/.test(s)?' class="step"':''}>${esc(s)}</p>`}
 else if(b.kind==='alert'){html+=`<aside class="notice warning">${icon('alert','sm')} ${esc(s)}</aside>`}
 else if(b.kind==='image'){html+=imageFigure(b.image,b.caption,chapters.some(x=>x.id===10&&x.blocks===blocks)?'plant':'scene')}
 else if(b.kind==='table'){
   html+='<div class="text-table-wrap"><table class="text-table">'+b.rows.map((r,j)=>'<tr>'+r.map(c=>`<${j===0?'th':'td'}>${esc(c)}</${j===0?'th':'td'}>`).join('')+'</tr>').join('')+'</table></div>';
 }
 }
 closeUl();return html;
}
function article(id){const c=chById(id);if(!c)return notFound();
const headings=c.blocks.map((b,i)=>b.kind==='h2'?{title:b.text,i}:null).filter(Boolean);
return `<a href="#/wissen" class="back">${icon('arrow','sm')} Alle Kapitel</a>
 <div class="article-layout"><article class="article-main"><header class="article-header"><div class="eyebrow">Kapitel ${c.id} / 13 · Survival NRW</div><h1>${esc(c.title)}</h1><div class="article-sub">${esc(c.subtitle||c.summary)}</div><div class="article-tools">${favButton('chapter',c.id)}<a class="btn secondary small" href="#/suche">${icon('search','sm')} Suchen</a></div></header>
 <figure class="article-image"><button type="button" class="photo-open" data-action="image-open" data-id="${c.hero}" aria-label="Titelbild vergrößern">${pic(c.hero,`KI-Foto ${c.title}`)}</button><figcaption>Fotorealistische KI-Darstellung · ${esc(c.title)} · keine geprüfte Realaufnahme</figcaption></figure>
 ${[8,10].includes(c.id)?dangerDisclaimer():''}
 ${c.id===9?'<div class="notice warning">Jagd, Fischerei und das Entnehmen von Tieren sind rechtlich geregelt. Die Bilder illustrieren Verfahren, sind aber keine geprüften praktischen Anleitungen. Bei verdächtigem Wild keine Verarbeitung.</div>':''}
 ${c.id===7?'<div class="notice danger">Ein selbst gebauter Filter macht Wasser nicht automatisch trinkbar. Vorfilterung beseitigt Krankheitserreger und chemische Belastungen nicht zuverlässig. Kontaminierte Quellen meiden.</div>':''}
 <div class="article-content">${renderBlocks(c.blocks)}</div>
 ${c.extras.length?`<div class="section-title"><h2>Weitere Bilder</h2></div>${c.extras.map(x=>imageFigure(x.image,x.caption)).join('')}`:''}
 <section class="save-card"><h3>${icon('clipboard')} Eigene Notiz</h3><p>Nur auf diesem Gerät gespeichert. Keine Übertragung an einen Server.</p><textarea id="article-note" class="notes-field" placeholder="Deine Notizen zu diesem Kapitel…">${esc(store.get('note:'+c.id,''))}</textarea><div class="toolrow"><button data-action="save-note" data-id="${c.id}" class="btn small">Notiz speichern</button></div></section>
 <div class="section-title"><h2>Weitere Themen</h2></div><div class="chapter-grid">${[c.id%13+1,(c.id+1)%13+1,(c.id+4)%13+1].map(x=>chById(x)).map(chapterCard).join('')}</div></article>
 <aside class="side-index"><h4>IN DIESEM KAPITEL</h4>${headings.map(x=>`<button type="button" data-action="scroll-to" data-anchor="sec-${x.i}">${esc(x.title)}</button>`).join('')}<a href="#/wissen">← Alle Kapitel</a></aside></div>`;
}
function plantlist(){return `${pageTitle('NRW · Pflanzenkunde','Pflanzen entdecken','Fotorealistische KI-Nachbildungen, botanische Merkmale und Hinweise aus dem Survival-Handbuch.')}
 ${dangerDisclaimer()}<div class="chips" id="plant-filters"><button class="chip active" data-action="plant-filter" data-filter="all">Alle 9</button><button class="chip" data-action="plant-filter" data-filter="nahrung">Wildnahrung</button><button class="chip" data-action="plant-filter" data-filter="heil">Pflanzenkunde</button></div>
 <div class="search-box">${icon('search')}<input id="plant-query" type="search" placeholder="Pflanze suchen…" aria-label="Pflanze suchen" autocomplete="off"></div>
 <div id="plant-count" class="tiny muted" style="margin:15px 0">9 Pflanzen</div><div id="plant-results" class="plant-grid">${plants.map(plantCard).join('')}</div>`}
function profile(id){const p=plantById(id);if(!p)return notFound();
return `<a href="#/pflanzen" class="back">${icon('arrow','sm')} Alle Pflanzen</a>
 ${pageTitle('Pflanzenporträt · Nordrhein-Westfalen',p.name,p.latin)}
 <section class="plant-hero"><div><button type="button" class="photo-open" data-action="image-open" data-id="${p.image}" aria-label="${esc(p.name)} Bild vergrößern">${pic(p.image,`KI-erzeugtes Pflanzenfoto ${p.name}`)}</button><p class="image-note">KI-generiertes Naturfoto · Merkmale können falsch oder unvollständig sein.</p></div><div class="plant-summary"><span class="pill">${p.category==='nahrung'?'Wildnahrung':'Traditionelle Pflanzenkunde'}</span><h1>${esc(p.name)}</h1><div class="latin">${esc(p.latin)}</div>${favButton('plant',p.id)}<div style="height:14px"></div>${p.facts.map(f=>{
 const i=f.indexOf(':');return `<div class="plant-fact"><b>${esc(i>0&&i<38?f.slice(0,i):'Hinweis')}</b><span>${esc(i>0&&i<38?f.slice(i+1).trim():f)}</span></div>`}).join('')}</div></section>
 ${dangerDisclaimer()}
 <div class="notice warning">Auch ähnlich aussehende oder andere Pflanzenteile können giftig sein. Wenn du die Art nicht zweifelsfrei anhand geprüfter Bestimmungsschlüssel bestimmst, nicht verwenden. Pflanzliche Anwendungen ersetzen keine Medikamente oder Antibiotika.</div>
 <div class="section-title"><h2>Weitere Pflanzen</h2></div><div class="plant-grid">${plants.filter(x=>x.id!==p.id).slice(0,3).map(plantCard).join('')}</div>`}
function gallery(){return `${pageTitle('KI-Fotogalerie','Alle 25 Survival-Bilder','Fotorealistische KI-Rekonstruktionen der Anleitungen und Pflanzen aus dem Handbuch.')}
 <div class="notice warning"><strong>Bildhinweis:</strong> KI-Bilder sind keine authentischen Naturaufnahmen oder technisch geprüften Schrittfolgen. Insbesondere Pflanzen nicht allein danach bestimmen.</div>
 <div class="chips" id="gallery-filters">${['Alle','Unterschlupf','Feuer & Kochen','Wasser','Pflanzen','Jagd & Wildbret','Notfall'].map((cat,i)=>`<button class="chip ${i===0?'active':''}" data-action="gallery-filter" data-filter="${esc(cat)}">${esc(cat)}</button>`).join('')}</div>
 <div class="search-box">${icon('search')}<input id="gallery-query" type="search" placeholder="Bilder durchsuchen…" aria-label="Bildersuche" autocomplete="off"></div>
 <p class="tiny muted" id="gallery-count">25 Bilder</p>
 <div id="gallery-results" class="gallery-grid">${GALLERY.map(galleryCard).join('')}</div>`}
function galleryCard(item){return `<button type="button" class="gallery-card" data-action="image-open" data-id="${esc(item.id)}" aria-label="${esc(item.title)} öffnen">${pic(item.id,item.title)}<span><strong>${esc(item.title)}</strong><small>${esc(item.category)}</small></span></button>`}
function updateGallery(){const q=(document.getElementById('gallery-query')?.value||'').toLocaleLowerCase('de').trim();const filter=document.querySelector('#gallery-filters .chip.active')?.dataset.filter||'Alle';const visible=GALLERY.filter(x=>(filter==='Alle'||x.category===filter)&&(x.title+' '+x.category).toLocaleLowerCase('de').includes(q));const output=document.getElementById('gallery-results');if(output)output.innerHTML=visible.length?visible.map(galleryCard).join(''):'<div class="empty">Keine Bilder gefunden.</div>';const count=document.getElementById('gallery-count');if(count)count.textContent=visible.length+' von 25 Bildern';}
function showGalleryPhoto(id){const pos=GALLERY.findIndex(x=>x.id===id);if(pos<0)return;activeGalleryIndex=pos;const d=document.getElementById('gallery-dialog');if(!d)return;const a=GALLERY[pos];d.querySelector('img').src=imgsrc(a.id);d.querySelector('img').alt='KI-generierte Darstellung: '+a.title;d.querySelector('.dialog-title').textContent=a.title;d.querySelector('.dialog-count').textContent=`${pos+1} / ${GALLERY.length}`;if(!d.open)d.showModal();}
function moveGallery(direction){activeGalleryIndex=(activeGalleryIndex+direction+GALLERY.length)%GALLERY.length;showGalleryPhoto(GALLERY[activeGalleryIndex].id)}
function updatePlants(){const q=(document.getElementById('plant-query')?.value||'').trim().toLocaleLowerCase('de');const active=document.querySelector('#plant-filters .chip.active');const filter=active?.dataset.filter||'all';const result=plants.filter(p=>(filter==='all'||p.category===filter)&&(p.name+' '+p.latin+' '+p.facts.join(' ')).toLocaleLowerCase('de').includes(q));const r=document.getElementById('plant-results');if(r)r.innerHTML=result.length?result.map(plantCard).join(''):'<div class="empty">Keine passenden Pflanzen gefunden.</div>';const count=document.getElementById('plant-count');if(count)count.textContent=result.length+' von 9 Pflanzen';}
function checklist(){return `${pageTitle('Offline-Checklisten','Gut vorbereitet','Hake die Punkte ab. Der Stand bleibt lokal auf diesem Gerät gespeichert.')}
 ${['sofort','ausruestung'].map((id,idx)=>{const items=D.checklists[id];const checked=store.get('checks:'+id,[]);return `<section class="check-panel" data-checkpanel="${id}"><div class="checktop"><div><div class="eyebrow">${idx?'Vorbereitung':'Akute Notlage'}</div><h2>${idx?'Notfallausrüstung':'10-Minuten-Check'}</h2></div><button data-action="reset-check" data-id="${id}" class="btn small outline">${icon('refresh','sm')} Reset</button></div><p class="tiny muted" id="${id}-count">${checked.length} / ${items.length} erledigt</p><div class="progressbar"><span id="${id}-bar" style="width:${Math.round(checked.length/items.length*100)}%"></span></div><ul class="check-list">${items.map((x,i)=>`<li><label><input type="checkbox" data-check="${id}" data-index="${i}" ${checked.includes(i)?'checked':''}><span>${esc(x)}</span></label></li>`).join('')}</ul></section>`}).join('')}
 <div class="notice">${icon('lock')} Die Einträge werden im lokalen Browserspeicher abgelegt. Beim Löschen der Browserdaten können sie verloren gehen.</div>`}
function checkUpdate(id){const boxes=[...document.querySelectorAll(`[data-check="${id}"]`)];const checked=boxes.filter(x=>x.checked).map(x=>Number(x.dataset.index));store.set('checks:'+id,checked);const c=document.getElementById(id+'-count'),bar=document.getElementById(id+'-bar');if(c)c.textContent=`${checked.length} / ${boxes.length} erledigt`;if(bar)bar.style.width=`${Math.round(checked.length/boxes.length*100)}%`}
function notfall(){return `<div class="emergency-page"><a href="#/" class="back">${icon('arrow','sm')} Startseite</a>${pageTitle('Notfallmodus','Soforthilfe','Akute Gefahr zuerst beseitigen, Hilfe organisieren und Standort angeben.')}
 <section class="call-card"><div class="eyebrow" style="color:#ffe0d8">Deutschland · Rettungsdienst & Feuerwehr</div><div class="num">112</div><p>Bei Lebensgefahr oder schwerer Verletzung: Notruf wählen. Ein Mobiltelefon kann unter Umständen auch ohne Guthaben mit verfügbaren Netzen verbinden; es braucht aber grundsätzlich eine nutzbare Netzverbindung.</p><a href="tel:112" class="btn danger">${icon('plus')} 112 anrufen</a></section>
 <div class="section-title"><h2>STOP – erste Schritte</h2></div><ol class="steps"><li><span><strong>Stoppen:</strong> Nicht kopflos handeln. Verletzte und eigene Sicherheit prüfen.</span></li><li><span><strong>Gefahr erkennen:</strong> Feuer, Hochwasser, Absturz, Unterkühlung oder Verkehr?</span></li><li><span><strong>Beobachten:</strong> Standort, Wetter, Wege und Mobilfunk prüfen.</span></li><li><span><strong>Planen:</strong> Rettung informieren, Schutz sichern, dann Trinkwasser.</span></li></ol>
 <div class="section-title"><h2>Deinen Standort ermitteln</h2></div><p class="intro">GPS-Koordinaten können der Rettungsleitstelle helfen. Die Standortermittlung hängt von Gerät und Berechtigungen ab und kann ungenau sein.</p><button class="btn secondary" data-action="gps">${icon('location')} Standort bestimmen</button><div id="gps-result" class="location-readout" aria-live="polite">Noch kein Standort ermittelt.</div><button data-action="copy-gps" id="copy-gps" class="btn small outline" disabled>Koordinaten kopieren</button>
 <div class="section-title"><h2>Schnellzugriff</h2></div><div class="small-links"><a class="quick-link" href="#/wissen/11">${icon('plus')}<span><strong>Erste Hilfe</strong><small>Blutung, Wunde, Kälte</small></span></a><a class="quick-link" href="#/wissen/2">${icon('route')}<span><strong>Evakuierung</strong><small>Verlassen oder bleiben?</small></span></a><a class="quick-link" href="#/wissen/7">${icon('droplets')}<span><strong>Wasser</strong><small>Trinkwasser sicher machen</small></span></a><a class="quick-link" href="#/check">${icon('clipboard')}<span><strong>10-Minuten-Check</strong><small>Prioritäten abhaken</small></span></a></div>
 <div class="notice danger">Bei starker Blutung direkten Druck auf die Blutungsstelle ausüben und den Notruf kontaktieren. Bei Atemnot, Bewusstlosigkeit oder anderen akuten Beschwerden unverzüglich medizinische Hilfe holen.</div></div>`}

// A published release is advertised through version.json in the same Pages directory.
// This does not assume any update exists; check is always triggered by the user.
let publishedUpdate=null;
function versionCompare(a,b){
 const x=String(a).split('.').map(Number),y=String(b).split('.').map(Number);
 for(let k=0;k<3;k++){if(x[k]!==y[k])return x[k]>y[k]?1:-1}
 return 0;
}
function releasePanel(){return `<section class="release-panel" aria-labelledby="release-title">
 <div class="release-head"><div><div class="eyebrow">Aktuelle Installation</div><h2 id="release-title">Version ${esc(D.version)}</h2></div><span class="release-chip">v${esc(D.version)}</span></div>
 <p>Prüft die auf GitHub Pages veröffentlichte Versionsdatei. Für die Prüfung wird eine Internetverbindung benötigt.</p>
 <div id="update-result" class="update-result" role="status" aria-live="polite">Noch nicht geprüft. Tippe auf „Auf Updates prüfen“.</div>
 <div class="update-actions"><button type="button" class="btn" data-action="check-version">${icon('refresh','sm')} Auf Updates prüfen</button><button id="install-update" type="button" class="btn secondary" data-action="install-version" hidden>Neue Version laden</button></div>
 </section>`}
function setUpdateResult(message,kind='neutral'){
 const el=document.getElementById('update-result');if(!el)return;
 el.textContent=message;el.dataset.kind=kind;
}
async function checkPublishedVersion(button){
 if(button){button.disabled=true;button.setAttribute('aria-busy','true')}
 const install=document.getElementById('install-update');if(install)install.hidden=true;
 publishedUpdate=null;
 setUpdateResult('Prüfe veröffentlichte Version …');
 try{
  if(location.protocol==='file:'){setUpdateResult('Bei einer lokalen HTML-Datei ist keine Online-Updateprüfung möglich. Öffne die GitHub-Pages-Adresse.','warning');return}
  if(!navigator.onLine){setUpdateResult('Keine Internetverbindung. Versionsprüfung derzeit nicht möglich.','warning');return}
  const endpoint=new URL('version.json',document.baseURI);
  endpoint.searchParams.set('check',String(Date.now()));
  const response=await fetch(endpoint.toString(),{cache:'no-store',headers:{'Accept':'application/json'}});
  if(!response.ok)throw new Error('HTTP '+response.status);
  const release=await response.json();
  if(!release || !/^\d+\.\d+\.\d+$/.test(String(release.version||'')))throw new Error('Versionsdatei ungültig');
  const remote=release.version,cmp=versionCompare(remote,D.version);
  if(cmp>0){publishedUpdate=release;setUpdateResult('Update verfügbar: v'+remote+' (installiert: v'+D.version+').','available');if(install){install.hidden=false;install.textContent='Update v'+remote+' laden'}}
  else if(cmp===0){setUpdateResult('Aktuell: v'+D.version+'. Auf der veröffentlichten Website ist keine neuere Version hinterlegt.','success')}
  else{setUpdateResult('Die Website meldet v'+remote+', installiert ist v'+D.version+'. Die Veröffentlichung läuft möglicherweise noch.','warning')}
 }catch(e){setUpdateResult('Updateprüfung fehlgeschlagen: '+(e?.message||'Unbekannter Fehler')+'. Bitte Verbindung und version.json prüfen.','warning')}
 finally{if(button){button.disabled=false;button.removeAttribute('aria-busy')}}
}
async function installPublishedVersion(button){
 if(!publishedUpdate)return;
 if(button)button.disabled=true;
 setUpdateResult('Aktualisiere App-Cache und lade die neue Version …');
 try{
  if('serviceWorker' in navigator){
   const registration=await navigator.serviceWorker.getRegistration();
   if(registration){await registration.update();if(registration.waiting)registration.waiting.postMessage({type:'SKIP_WAITING'})}
  }
  const u=new URL(location.href);u.searchParams.set('update',String(Date.now()));
  location.replace(u.toString());
 }catch(e){setUpdateResult('Aktualisierung konnte nicht gestartet werden: '+(e?.message||'Fehler')+'. Seite neu laden.','warning');if(button)button.disabled=false}
}

function mehr(){return `${pageTitle('Survival NRW','Mehr & Einstellungen','Lokal gespeicherte Inhalte und Hinweise zum Handbuch.')}
 <div class="list-links"><a href="#/merkliste">${icon('star')} Merkliste ansehen →</a><a href="#/suche">${icon('search')} Handbuch durchsuchen →</a><a href="#/bilder">${icon('leaf')} Alle 25 Bilder →</a><a href="#/quellen">${icon('book')} Quellen und Grenzen →</a><a href="#/notfall">${icon('plus')} Notfallmodus →</a></div>
 ${releasePanel()}
 <div class="section-title"><h2>Über diese App</h2></div><div class="notice"><strong>Survival NRW · Version ${esc(D.version)}</strong><p>Für Smartphone, Tablet und PC. Enthält die Inhalte des NRW-Survival-Handbuchs und 25 lokal gespeicherte fotorealistische KI-Bilder. Kein Konto nötig, keine Analytics und keine externen Schrift- oder Bilddienste.</p><p>Erstellt für privaten Gebrauch. Die App ist kein Ersatz für eine fachliche Erste-Hilfe-Ausbildung.</p></div>
 <div class="section-title"><h2>Offline verwenden</h2></div><div class="notice"><strong>Web-App installieren</strong><p>Nach Veröffentlichung unter HTTPS in Safari auf dem iPhone öffnen, dann über „Teilen“ → „Zum Home-Bildschirm“ hinzufügen. Bereits geladene App-Inhalte können durch den Service Worker offline verfügbar bleiben. Die einzelne HTML-Datei funktioniert ohne Internet, sofern sie lokal geöffnet werden kann.</p></div>
 <p class="footer-note">Fotos: KI-generierte Rekonstruktionen, keine geprüften Originalaufnahmen. Alle Pflanzen vor einer Nutzung unabhängig verifizieren. Keine Garantie für Vollständigkeit, Aktualität oder medizinische Eignung.</p>`}
function merkliste(){const saved=favs();const chaptersSaved=chapters.filter(c=>saved.includes('chapter:'+c.id)),plantsSaved=plants.filter(p=>saved.includes('plant:'+p.id));return `<a href="#/mehr" class="back">${icon('arrow','sm')} Mehr</a>${pageTitle('Für später','Deine Merkliste','Gemerkte Artikel und Pflanzen werden lokal gespeichert.')}${saved.length?`${chaptersSaved.length?`<div class="section-title"><h2>Kapitel</h2></div><div class="chapter-grid">${chaptersSaved.map(chapterCard).join('')}</div>`:''}${plantsSaved.length?`<div class="section-title"><h2>Pflanzen</h2></div><div class="plant-grid">${plantsSaved.map(plantCard).join('')}</div>`:''}`:'<div class="empty">Noch nichts gemerkt. Öffne ein Kapitel oder Pflanzenprofil und tippe auf „Merken“.</div>'}`}
function quellen(){return `<a href="#/mehr" class="back">${icon('arrow','sm')} Mehr</a>${pageTitle('Hintergrund','Quellen & Sicherheit','Quellenhinweise aus dem zugrunde liegenden privaten Notfallhandbuch.')}
 <div class="notice warning"><strong>Faktenprüfung:</strong> Diese App stellt den Text des vorhandenen Handbuchs dar; es wurde hier keine neue amtliche oder medizinische Prüfung sämtlicher Angaben durchgeführt. Insbesondere Rechtslage und Fachinformationen können sich ändern. KI-Bilder sind keine botanisch verifizierten Bestimmungstafeln.</div>
 <div class="list-links">${D.sources.map(x=>`<div class="search-item" style="color:#c4d7c5;font-size:13px">${esc(x)}</div>`).join('')}</div>
 <div class="notice">Für reale Notfälle in Deutschland gilt: 112 wählen und offiziellen Behördenhinweisen folgen. Keine rechtliche oder medizinische Fachberatung.</div>`}
function searchpage(){return `${pageTitle('Volltextsuche','Suchen im Handbuch','Suche nach Kapiteln, Pflanzen, Arbeitsschritten und Stichwörtern.')}
 <div class="search-box">${icon('search')}<input id="global-query" placeholder="z. B. Feuer, Holunder, Jagd, Wasser" type="search" aria-label="Suche im Handbuch" autofocus autocomplete="off"></div><div id="global-search-results" class="search-results"><div class="notice">Tippe einen Begriff ein, um das Handbuch zu durchsuchen.</div></div>`}
function snippets(text,q,n=110){let t=text.replace(/\s+/g,' ').trim(),i=t.toLocaleLowerCase('de').indexOf(q.toLocaleLowerCase('de'));if(i<0)return t.slice(0,n)+'…';let begin=Math.max(0,i-35),end=Math.min(t.length,i+n);return (begin?'…':'')+t.slice(begin,end)+(end<t.length?'…':'')}
function updateSearch(){const q=(document.getElementById('global-query')?.value||'').trim().toLocaleLowerCase('de');const dest=document.getElementById('global-search-results');if(!dest)return;if(!q){dest.innerHTML='<div class="notice">Tippe einen Begriff ein, um das Handbuch zu durchsuchen.</div>';return}
 const results=[];
 for(const c of chapters){const candidate=[c.title,c.subtitle,c.summary,...c.blocks.map(b=>b.text||'')].join(' ');if(candidate.toLocaleLowerCase('de').includes(q)){results.push({type:'Kapitel',title:c.title,url:`#/wissen/${c.id}`,hint:snippets(candidate,q,100)})}}
 for(const p of plants){const candidate=[p.name,p.latin,...p.facts].join(' ');if(candidate.toLocaleLowerCase('de').includes(q)){results.push({type:'Pflanze',title:p.name,url:`#/pflanze/${p.id}`,hint:snippets(candidate,q,100)})}}
 dest.innerHTML=results.length?`<p class="tiny muted">${results.length} Treffer</p>`+results.map(x=>`<a class="search-item" href="${x.url}"><div class="card-kicker">${esc(x.type)}</div><strong>${esc(x.title)}</strong><small>${esc(x.hint)}</small></a>`).join(''):'<div class="empty">Keine Treffer gefunden.</div>';
}
function notFound(){return `${pageTitle('Nicht gefunden','Seite nicht vorhanden','Der angeforderte Inhalt existiert nicht.')}<a class="btn" href="#/">Zur Startseite</a>`}
let currentGPS='';
function render(){const path=(location.hash||'#/').replace(/^#\/?/,'').split('/').filter(Boolean);const view=path[0]||'home';let body='';
 switch(view){case 'home':body=home();break;case 'wissen':body=path[1]?article(path[1]):wissensliste();break;case 'pflanzen':body=plantlist();break;case 'pflanze':body=profile(path[1]);break;case 'check':body=checklist();break;case 'notfall':body=notfall();break;case 'mehr':body=mehr();break;case 'bilder':body=gallery();break;case 'merkliste':body=merkliste();break;case 'quellen':body=quellen();break;case 'suche':body=searchpage();break;default:body=notFound()}
 el.innerHTML=body;
 const active={'home':'home','wissen':'wissen','pflanzen':'pflanzen','pflanze':'pflanzen','check':'check','mehr':'mehr','notfall':'home','bilder':'mehr','merkliste':'mehr','suche':'wissen','quellen':'mehr'}[view]||'home';
 for(const a of document.querySelectorAll('[data-nav]')){a.classList.toggle('active',a.dataset.nav===active);if(a.dataset.nav===active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');}
 window.scrollTo({top:0,behavior:'auto'});
}
function initialize(){for(const s of document.querySelectorAll('.nav-icon')){s.innerHTML=icon(s.dataset.icon||'home')}
 document.addEventListener('input',e=>{if(e.target.id==='plant-query')updatePlants();if(e.target.id==='global-query')updateSearch();if(e.target.id==='gallery-query')updateGallery()});
 document.addEventListener('change',e=>{if(e.target.matches('[data-check]'))checkUpdate(e.target.dataset.check)});
 document.addEventListener('click',async e=>{
 const btn=e.target.closest('[data-action]');if(!btn)return;const action=btn.dataset.action;
 if(action==='check-version'){await checkPublishedVersion(btn);return}
 if(action==='install-version'){await installPublishedVersion(btn);return}
 if(action==='scroll-to'){document.getElementById(btn.dataset.anchor)?.scrollIntoView({behavior:'smooth',block:'start'});}
 if(action==='scroll-section'){const target=document.getElementById(btn.dataset.id);if(target)target.scrollIntoView({behavior:'smooth',block:'start'});}
 if(action==='gallery-filter'){for(const b of document.querySelectorAll('#gallery-filters .chip'))b.classList.toggle('active',b===btn);updateGallery()}
 if(action==='image-open')showGalleryPhoto(btn.dataset.id);
 if(action==='image-close'){document.getElementById('gallery-dialog')?.close()}
 if(action==='image-prev')moveGallery(-1);
 if(action==='image-next')moveGallery(1);
 if(action==='plant-filter'){for(const b of document.querySelectorAll('#plant-filters .chip'))b.classList.toggle('active',b===btn);updatePlants()}
 if(action==='favorite'){const k=btn.dataset.type+':'+btn.dataset.id;const f=favs(),next=f.includes(k)?f.filter(x=>x!==k):[...f,k];store.set('favorites',next);toast(next.includes(k)?'Zur Merkliste hinzugefügt':'Aus Merkliste entfernt');render()}
 if(action==='save-note'){const t=document.getElementById('article-note');store.set('note:'+btn.dataset.id,t?.value||'');toast('Notiz lokal gespeichert')}
 if(action==='reset-check'){store.set('checks:'+btn.dataset.id,[]);for(const x of document.querySelectorAll(`[data-check="${btn.dataset.id}"]`))x.checked=false;checkUpdate(btn.dataset.id);toast('Checkliste zurückgesetzt')}
 if(action==='gps'){
   const o=document.getElementById('gps-result');if(!o)return;
   if(!navigator.geolocation){o.textContent='Standortermittlung wird in diesem Browser nicht unterstützt.';return}
   o.textContent='GPS-Standort wird ermittelt …';btn.disabled=true;
   navigator.geolocation.getCurrentPosition(p=>{btn.disabled=false;let lat=p.coords.latitude.toFixed(6),lon=p.coords.longitude.toFixed(6);currentGPS=`${lat}, ${lon}`;o.textContent=`Breite: ${lat} · Länge: ${lon} · Genauigkeit: ungefähr ${Math.round(p.coords.accuracy)} m. Diese Koordinaten der Leitstelle mitteilen.`;document.getElementById('copy-gps').disabled=false},err=>{btn.disabled=false;o.textContent='Standort konnte nicht bestimmt werden. Prüfe die GPS-Berechtigung; alternativ Adresse, Forstweg oder markante Punkte nennen.'},{enableHighAccuracy:true,timeout:14000,maximumAge:30000})
 }
 if(action==='copy-gps'&&currentGPS){try{await navigator.clipboard.writeText(currentGPS);toast('Koordinaten kopiert')}catch(e){toast('Kopieren nicht möglich – Koordinaten manuell markieren')}}
 });
 document.addEventListener('keydown',e=>{const d=document.getElementById('gallery-dialog');if(!d?.open)return;if(e.key==='ArrowLeft')moveGallery(-1);if(e.key==='ArrowRight')moveGallery(1)});
 window.addEventListener('hashchange',render);render();
 if('serviceWorker'in navigator&&location.protocol.startsWith('http')){navigator.serviceWorker.register('sw.js').then(async()=>{const s=document.getElementById('netstatus');if(s)s.textContent='Offline-Cache wird vorbereitet';await navigator.serviceWorker.ready;const keys=await caches.keys();if(s)s.textContent=keys.includes('survival-nrw-v'+D.version)?'Offline bereit':'Online geöffnet'}).catch(()=>{let s=document.getElementById('netstatus');if(s)s.textContent='Online geöffnet'})} else {const s=document.getElementById('netstatus');if(s)s.textContent=location.protocol==='file:'?'Lokale Datei':'Online geöffnet'}
 window.addEventListener('offline',()=>{let s=document.getElementById('netstatus');if(s)s.textContent='Kein Netz'});
 window.addEventListener('online',()=>{let s=document.getElementById('netstatus');if(s)s.textContent='Online / Cache'});
}
initialize();

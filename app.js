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
 ['orientierung','Karte und Rettungssignal','Notfall'],
 ['knot-achter','Endknoten und Seilsicherung','Knotenkunde'],
 ['knot-palstek','Schlaufe am Seil','Knotenkunde'],
 ['knot-mastwurf','Befestigung am Pfosten','Knotenkunde'],
 ['knot-spann','Zeltleine abspannen','Knotenkunde'],
 ['knot-rund','Rundtörn am Pfosten','Knotenkunde'],
 ['knot-bund','Holzstangen verbinden','Knotenkunde']
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
function plantCard(p){const photo=p.image?pic(p.image,`KI-Illustration ${p.name}`):`<div class="no-plant-image">${icon('leaf','lg')}<span>Artenfoto fehlt<br><small>nicht bestimmt</small></span></div>`;return `<a class="plant-card" href="#/pflanze/${p.id}">${photo}<div class="card-body"><div class="card-kicker">${p.category==='giftig'?'Giftig / Gefahr':p.category==='verwechslung'?'Verwechslungsgefahr':p.category==='nahrung'?'Wildnahrung':p.category==='holz'?'Gehölz':'Pflanzenkunde'}</div><strong>${esc(p.name)}</strong><p><i>${esc(p.latin)}</i></p><span class="visual-tag">${p.image?'KI-Foto · nicht bestimmt':'Nur Textprofil · nicht bestimmt'}</span></div></a>`}
function pageTitle(kicker,title,sub){return `<header class="page-head"><div class="eyebrow">${esc(kicker)}</div><h1>${esc(title)}</h1>${sub?`<p>${esc(sub)}</p>`:''}</header>`}
function dangerDisclaimer(){return `<div class="notice warning">${icon('alert','sm')} <strong>Wichtig:</strong> Die Pflanzenbilder wurden mit KI erstellt. Sie können botanische Fehler enthalten. Niemals Pflanzen allein anhand dieser Bilder essen oder medizinisch anwenden. Zuverlässige Bestimmung und medizinische Beratung haben Vorrang.</div>`}
function home(){return `
 <section class="hero">${pic('unterstand','KI-generierter Unterschlupf im Wald')}<div class="hero-content"><div class="eyebrow">Dein mobiles Survival-Handbuch</div><h1>Draußen vorbereitet.<br><em>Richtig handeln.</em></h1><p>Praktisches Überlebenswissen für ganz Deutschland: Unterschlupf, Wasser, Feuer, Nahrung, Jagdhygiene und Erste Hilfe – illustriert mit fotorealistischen KI-Bildern.</p><div class="actions"><a class="btn" href="#/wissen">${icon('book','sm')} Handbuch öffnen</a><a class="btn danger" href="#/notfall">${icon('plus','sm')} Notfallhilfe</a></div><p class="hero-note">13 Kapitel · 16 Bundesländer · ${plants.length} Pflanzenprofile · lokal gespeicherte Checklisten</p></div></section>
 ${regionHomeCard()}<div class="section-title"><h2>Neu in Version 1.4.0</h2><span class="pill">16 Länder · Knotenschule</span></div>${featureTiles()}
 <div class="quick-grid">
 <a class="quick-link" href="#/wissen/3">${icon('tent','lg')}<span><strong>Unterschlupf</strong><small>Schutz & Lager</small></span></a>
 <a class="quick-link" href="#/wissen/7">${icon('droplets','lg')}<span><strong>Wasser</strong><small>Gewinnen & reinigen</small></span></a>
 <a class="quick-link" href="#/wissen/5">${icon('flame','lg')}<span><strong>Feuer</strong><small>Material & Technik</small></span></a>
 <a class="quick-link" href="#/pflanzen">${icon('leaf','lg')}<span><strong>Pflanzen</strong><small>${plants.length} Arten im Überblick</small></span></a>
 </div>
 <section class="danger-card"><h3>${icon('alert')} Akute Notlage?</h3><p>Bei einer ernsthaften Gefahr zuerst Eigenschutz, Standort und Rettung. Nicht auf improvisierte Nahrungssuche oder Feuer konzentrieren.</p><a class="btn danger" href="#/notfall">Soforthilfe und Notruf ${icon('next','sm')}</a></section>
 <div class="section-title"><h2>Das ist im Handbuch</h2><a href="#/wissen" class="tiny muted">Alle 13 Kapitel →</a></div>
 <div class="feature-grid">${photoCard('laubhütte','Lager und Unterschlupf','Schutz vor Nässe und Kälte','#/wissen/3')}${photoCard('fährten','Jagd und Fährten','Wild erkennen, Wildhygiene','#/wissen/9')}${photoCard('filter','Trinkwasser','Improvisierte Filter richtig einordnen','#/wissen/7')}</div>
 <div class="section-title"><h2>Bildgalerie</h2><a class="tiny muted" href="#/bilder">Alle 31 Bilder →</a></div><a class="gallery-banner" href="#/bilder">${pic('fährten','Wildspuren als KI-Fotografie')}<span><strong>31 fotorealistische Bilder ansehen</strong><small>Unterschlupf · Wasser · Pflanzen · Jagd · Erste Hilfe</small></span>${icon('next')}</a><div class="section-title"><h2>Häufig benötigte Hilfe</h2></div><div class="small-links"><a class="quick-link" href="#/check">${icon('clipboard')}<span><strong>10-Minuten-Check</strong><small>Was jetzt wichtig ist</small></span></a><a class="quick-link" href="#/suche">${icon('search')}<span><strong>Im Handbuch suchen</strong><small>Stichwort eingeben</small></span></a></div>
 <p class="footer-note">Ein privater, bebilderter Notfallratgeber. Die Foto-Szenen und Pflanzenbilder sind KI-generiert, nicht vor Ort aufgenommen. Fachliche Hinweise und rechtliche Grenzen beachten.</p>`}
function wissensliste(){return `${pageTitle('Survival Deutschland','Alle Wissenskapitel','Das komplette Notfallhandbuch mit Bildern und einzelnen Arbeitsschritten.')}
 <a href="#/suche" class="search-box">${icon('search')}<span style="padding:12px 0;color:#b3c9b6;font-size:13px">Kapitel und Anleitungen durchsuchen…</span></a>
 <div class="section-title"><h2>13 Kapitel</h2><span class="pill">${esc(currentRegion().name)} · Wald & Natur</span></div>
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
 <div class="article-layout"><article class="article-main"><header class="article-header"><div class="eyebrow">Kapitel ${c.id} / 13 · ${esc(currentRegion().name)}</div><h1>${esc(c.title)}</h1><div class="article-sub">${esc(c.subtitle||c.summary)}</div><div class="article-tools">${favButton('chapter',c.id)}<a class="btn secondary small" href="#/suche">${icon('search','sm')} Suchen</a></div></header>
 <figure class="article-image"><button type="button" class="photo-open" data-action="image-open" data-id="${c.hero}" aria-label="Titelbild vergrößern">${pic(c.hero,`KI-Foto ${c.title}`)}</button><figcaption>Fotorealistische KI-Darstellung · ${esc(c.title)} · keine geprüfte Realaufnahme</figcaption></figure>
 ${regionAdvice(c.id)}${[8,10].includes(c.id)?dangerDisclaimer():''}
 ${c.id===9?'<div class="notice warning">Jagd, Fischerei und das Entnehmen von Tieren sind rechtlich geregelt. Die Bilder illustrieren Verfahren, sind aber keine geprüften praktischen Anleitungen. Bei verdächtigem Wild keine Verarbeitung.</div>':''}
 ${c.id===7?'<div class="notice danger">Ein selbst gebauter Filter macht Wasser nicht automatisch trinkbar. Vorfilterung beseitigt Krankheitserreger und chemische Belastungen nicht zuverlässig. Kontaminierte Quellen meiden.</div>':''}
 <div class="article-content">${renderBlocks(c.blocks)}</div>${learningPanel('chapter',c.id)}
 ${c.extras.length?`<div class="section-title"><h2>Weitere Bilder</h2></div>${c.extras.map(x=>imageFigure(x.image,x.caption)).join('')}`:''}
 <section class="save-card"><h3>${icon('clipboard')} Eigene Notiz</h3><p>Nur auf diesem Gerät gespeichert. Keine Übertragung an einen Server.</p><textarea id="article-note" class="notes-field" placeholder="Deine Notizen zu diesem Kapitel…">${esc(store.get('note:'+c.id,''))}</textarea><div class="toolrow"><button data-action="save-note" data-id="${c.id}" class="btn small">Notiz speichern</button></div></section>
 <div class="section-title"><h2>Weitere Themen</h2></div><div class="chapter-grid">${[c.id%13+1,(c.id+1)%13+1,(c.id+4)%13+1].map(x=>chById(x)).map(chapterCard).join('')}</div></article>
 <aside class="side-index"><h4>IN DIESEM KAPITEL</h4>${headings.map(x=>`<button type="button" data-action="scroll-to" data-anchor="sec-${x.i}">${esc(x.title)}</button>`).join('')}<a href="#/wissen">← Alle Kapitel</a></aside></div>`;
}
function plantlist(){return `${pageTitle('Deutschland · Pflanzenkunde','Pflanzen entdecken','Allgemeine Artprofile: keine vollständige regionale Verbreitungskarte. KI-Bilder sind keine gesicherten Bestimmungsfotos.')}
 ${dangerDisclaimer()}<div class="chips" id="plant-filters"><button class="chip active" data-action="plant-filter" data-filter="all">Alle ${plants.length}</button><button class="chip" data-action="plant-filter" data-filter="nahrung">Wildnahrung</button><button class="chip" data-action="plant-filter" data-filter="heil">Pflanzenkunde</button><button class="chip" data-action="plant-filter" data-filter="giftig">Giftig</button><button class="chip" data-action="plant-filter" data-filter="verwechslung">Verwechslung</button><button class="chip" data-action="plant-filter" data-filter="holz">Gehölz</button></div>
 <div class="search-box">${icon('search')}<input id="plant-query" type="search" placeholder="Pflanze suchen…" aria-label="Pflanze suchen" autocomplete="off"></div>
 <div id="plant-count" class="tiny muted" style="margin:15px 0">${plants.length} Pflanzen</div><div id="plant-results" class="plant-grid">${plants.map(plantCard).join('')}</div>`}
function profile(id){const p=plantById(id);if(!p)return notFound();
return `<a href="#/pflanzen" class="back">${icon('arrow','sm')} Alle Pflanzen</a>
 ${pageTitle('Pflanzenkunde · Deutschland',p.name,p.latin)}
 <section class="plant-hero"><div>${p.image?`<button type="button" class="photo-open" data-action="image-open" data-id="${p.image}" aria-label="${esc(p.name)} Bild vergrößern">${pic(p.image,`KI-erzeugtes Pflanzenfoto ${p.name}`)}</button><p class="image-note">KI-generiertes Naturfoto · Merkmale können falsch oder unvollständig sein.</p>`:`<div class="plant-no-photo">${icon('leaf','lg')}<b>Kein geprüftes Artenfoto verfügbar</b><p>Für dieses Profil wurde kein Bild einer anderen Pflanzenart verwendet.</p></div>`}</div><div class="plant-summary"><span class="pill">${p.category==='giftig'?'Giftig':p.category==='verwechslung'?'Verwechslungsgefahr':p.category==='nahrung'?'Wildnahrung':p.category==='holz'?'Gehölz':'Traditionelle Pflanzenkunde'}</span><h1>${esc(p.name)}</h1><div class="latin">${esc(p.latin)}</div>${favButton('plant',p.id)}<div style="height:14px"></div>${p.facts.map(f=>{
 const i=f.indexOf(':');return `<div class="plant-fact"><b>${esc(i>0&&i<38?f.slice(0,i):'Hinweis')}</b><span>${esc(i>0&&i<38?f.slice(i+1).trim():f)}</span></div>`}).join('')}</div></section>
 ${dangerDisclaimer()}
 <div class="notice warning">Auch ähnlich aussehende oder andere Pflanzenteile können giftig sein. Wenn du die Art nicht zweifelsfrei anhand geprüfter Bestimmungsschlüssel bestimmst, nicht verwenden. Pflanzliche Anwendungen ersetzen keine Medikamente oder Antibiotika.</div>
 ${['giftig','verwechslung'].includes(p.category)?'<div class="notice danger"><strong>Warnung:</strong> Keine Ernte oder Einnahme. Bei Vergiftungsverdacht sofort den Giftnotruf oder bei schweren Symptomen 112 kontaktieren.</div>':''}
 <div class="section-title"><h2>Weitere Pflanzen</h2></div><div class="plant-grid">${plants.filter(x=>x.id!==p.id).slice(0,3).map(plantCard).join('')}</div>`}
function gallery(){return `${pageTitle('KI-Fotogalerie','Alle 31 Survival-Bilder','Fotorealistische KI-Rekonstruktionen der Anleitungen und Pflanzen aus dem Handbuch.')}
 <div class="notice warning"><strong>Bildhinweis:</strong> KI-Bilder sind keine authentischen Naturaufnahmen oder technisch geprüften Schrittfolgen. Insbesondere Pflanzen nicht allein danach bestimmen.</div>
 <div class="chips" id="gallery-filters">${['Alle','Unterschlupf','Feuer & Kochen','Wasser','Pflanzen','Jagd & Wildbret','Notfall','Knotenkunde'].map((cat,i)=>`<button class="chip ${i===0?'active':''}" data-action="gallery-filter" data-filter="${esc(cat)}">${esc(cat)}</button>`).join('')}</div>
 <div class="search-box">${icon('search')}<input id="gallery-query" type="search" placeholder="Bilder durchsuchen…" aria-label="Bildersuche" autocomplete="off"></div>
 <p class="tiny muted" id="gallery-count">31 Bilder</p>
 <div id="gallery-results" class="gallery-grid">${GALLERY.map(galleryCard).join('')}</div>`}
function galleryCard(item){return `<button type="button" class="gallery-card" data-action="image-open" data-id="${esc(item.id)}" aria-label="${esc(item.title)} öffnen">${pic(item.id,item.title)}<span><strong>${esc(item.title)}</strong><small>${esc(item.category)}</small></span></button>`}
function updateGallery(){const q=(document.getElementById('gallery-query')?.value||'').toLocaleLowerCase('de').trim();const filter=document.querySelector('#gallery-filters .chip.active')?.dataset.filter||'Alle';const visible=GALLERY.filter(x=>(filter==='Alle'||x.category===filter)&&(x.title+' '+x.category).toLocaleLowerCase('de').includes(q));const output=document.getElementById('gallery-results');if(output)output.innerHTML=visible.length?visible.map(galleryCard).join(''):'<div class="empty">Keine Bilder gefunden.</div>';const count=document.getElementById('gallery-count');if(count)count.textContent=visible.length+' von 31 Bildern';}
function showGalleryPhoto(id){const pos=GALLERY.findIndex(x=>x.id===id);if(pos<0)return;activeGalleryIndex=pos;const d=document.getElementById('gallery-dialog');if(!d)return;const a=GALLERY[pos];d.querySelector('img').src=imgsrc(a.id);d.querySelector('img').alt='KI-generierte Darstellung: '+a.title;d.querySelector('.dialog-title').textContent=a.title;d.querySelector('.dialog-count').textContent=`${pos+1} / ${GALLERY.length}`;if(!d.open)d.showModal();}
function moveGallery(direction){activeGalleryIndex=(activeGalleryIndex+direction+GALLERY.length)%GALLERY.length;showGalleryPhoto(GALLERY[activeGalleryIndex].id)}
function updatePlants(){const q=(document.getElementById('plant-query')?.value||'').trim().toLocaleLowerCase('de');const active=document.querySelector('#plant-filters .chip.active');const filter=active?.dataset.filter||'all';const result=plants.filter(p=>(filter==='all'||p.category===filter)&&(p.name+' '+p.latin+' '+p.facts.join(' ')).toLocaleLowerCase('de').includes(q));const r=document.getElementById('plant-results');if(r)r.innerHTML=result.length?result.map(plantCard).join(''):'<div class="empty">Keine passenden Pflanzen gefunden.</div>';const count=document.getElementById('plant-count');if(count)count.textContent=result.length+' von '+plants.length+' Pflanzen';}
function checklist(){return `${pageTitle('Offline-Checklisten','Gut vorbereitet','Hake die Punkte ab. Der Stand bleibt lokal auf diesem Gerät gespeichert.')}
 ${Object.keys(D.checklists).map((id,idx)=>{const items=D.checklists[id];const checked=store.get('checks:'+id,[]);const titles={sofort:'10-Minuten-Check',ausruestung:'Notfallausrüstung','24h':'24-Stunden-Plan','72h':'72-Stunden-Plan','7tage':'7-Tage-Plan',winter:'Winter',unwetter:'Unwetter'};return `<section class="check-panel" data-checkpanel="${id}"><div class="checktop"><div><div class="eyebrow">${id==='sofort'?'Akute Notlage':'Vorsorge'}</div><h2>${esc(titles[id]||id)}</h2></div><button data-action="reset-check" data-id="${id}" class="btn small outline">${icon('refresh','sm')} Reset</button></div><p class="tiny muted" id="${id}-count">${checked.length} / ${items.length} erledigt</p><div class="progressbar"><span id="${id}-bar" style="width:${Math.round(checked.length/items.length*100)}%"></span></div><ul class="check-list">${items.map((x,i)=>`<li><label><input type="checkbox" data-check="${id}" data-index="${i}" ${checked.includes(i)?'checked':''}><span>${esc(x)}</span></label></li>`).join('')}</ul></section>`}).join('')}
 <div class="notice">${icon('lock')} Die Einträge werden im lokalen Browserspeicher abgelegt. Beim Löschen der Browserdaten können sie verloren gehen.</div>`}
function checkUpdate(id){const boxes=[...document.querySelectorAll(`[data-check="${id}"]`)];const checked=boxes.filter(x=>x.checked).map(x=>Number(x.dataset.index));store.set('checks:'+id,checked);const c=document.getElementById(id+'-count'),bar=document.getElementById(id+'-bar');if(c)c.textContent=`${checked.length} / ${boxes.length} erledigt`;if(bar)bar.style.width=`${Math.round(checked.length/boxes.length*100)}%`}
function notfall(){return `<div class="emergency-page"><a href="#/" class="back">${icon('arrow','sm')} Startseite</a>${pageTitle('Notfallmodus','Soforthilfe','Akute Gefahr zuerst beseitigen, Hilfe organisieren und Standort angeben.')}
 <section class="call-card"><div class="eyebrow" style="color:#ffe0d8">Deutschland · Rettungsdienst & Feuerwehr</div><div class="num">112</div><p>Bei Lebensgefahr oder schwerer Verletzung: Notruf wählen. Ein Mobiltelefon kann unter Umständen auch ohne Guthaben mit verfügbaren Netzen verbinden; es braucht aber grundsätzlich eine nutzbare Netzverbindung.</p><a href="tel:112" class="btn danger">${icon('plus')} 112 anrufen</a></section>
 <a class="btn secondary full" href="#/notfall-assistent">Situationsbezogenen Notfallassistenten öffnen →</a><div class="section-title"><h2>STOP – erste Schritte</h2></div><ol class="steps"><li><span><strong>Stoppen:</strong> Nicht kopflos handeln. Verletzte und eigene Sicherheit prüfen.</span></li><li><span><strong>Gefahr erkennen:</strong> Feuer, Hochwasser, Absturz, Unterkühlung oder Verkehr?</span></li><li><span><strong>Beobachten:</strong> Standort, Wetter, Wege und Mobilfunk prüfen.</span></li><li><span><strong>Planen:</strong> Rettung informieren, Schutz sichern, dann Trinkwasser.</span></li></ol>
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

function mehr(){return `${pageTitle('Survival Deutschland','Mehr & Einstellungen','Lokal gespeicherte Inhalte und Hinweise zum Handbuch.')}
 ${regionHomeCard()}${featureTiles()}<div class="list-links"><a href="#/bundeslaender">Alle 16 Bundesländer →</a><a href="#/knotenschule">Knotenschule →</a><a href="#/backup">Datensicherung & Wiederherstellung →</a><a href="#/offline">Offline-Dateien prüfen →</a><a href="#/merkliste">${icon('star')} Merkliste ansehen →</a><a href="#/suche">${icon('search')} Handbuch durchsuchen →</a><a href="#/bilder">${icon('leaf')} Alle 31 Bilder →</a><a href="#/quellen">${icon('book')} Quellen und Grenzen →</a><a href="#/notfall">${icon('plus')} Notfallmodus →</a></div>
 ${releasePanel()}<div class="section-title"><h2>Versionsverlauf</h2></div><div class="changelog">${X.changelog.map(c=>`<section><b>Version ${esc(c.version)}</b><small>${esc(c.date)}</small><p>${esc(c.notes)}</p></section>`).join('')}</div>
 <div class="section-title"><h2>Über diese App</h2></div><div class="notice"><strong>Survival Deutschland · Version ${esc(D.version)}</strong><p>Für Smartphone, Tablet und PC. Enthält das bisherige NRW-Handbuch als Grundwissen mit regionalen Hinweisen für alle Bundesländer, ${plants.length} Artensteckbriefe und 31 KI-Bilder. Textliche Zusatzprofile ersetzen keine fachliche Bestimmung. Kein Konto nötig, keine Analytics und keine externen Schrift- oder Bilddienste.</p><p>Erstellt für privaten Gebrauch. Die App ist kein Ersatz für eine fachliche Erste-Hilfe-Ausbildung.</p></div>
 <div class="section-title"><h2>Offline verwenden</h2></div><div class="notice"><strong>Web-App installieren</strong><p>Nach Veröffentlichung unter HTTPS in Safari auf dem iPhone öffnen, dann über „Teilen“ → „Zum Home-Bildschirm“ hinzufügen. Bereits geladene App-Inhalte können durch den Service Worker offline verfügbar bleiben. Die einzelne HTML-Datei funktioniert ohne Internet, sofern sie lokal geöffnet werden kann.</p></div>
 <p class="footer-note">Fotos: KI-generierte Rekonstruktionen, keine geprüften Originalaufnahmen. Alle Pflanzen vor einer Nutzung unabhängig verifizieren. Keine Garantie für Vollständigkeit, Aktualität oder medizinische Eignung.</p>`}
function merkliste(){const saved=favs();const chaptersSaved=chapters.filter(c=>saved.includes('chapter:'+c.id)),plantsSaved=plants.filter(p=>saved.includes('plant:'+p.id));return `<a href="#/mehr" class="back">${icon('arrow','sm')} Mehr</a>${pageTitle('Für später','Deine Merkliste','Gemerkte Artikel und Pflanzen werden lokal gespeichert.')}${saved.length?`${chaptersSaved.length?`<div class="section-title"><h2>Kapitel</h2></div><div class="chapter-grid">${chaptersSaved.map(chapterCard).join('')}</div>`:''}${plantsSaved.length?`<div class="section-title"><h2>Pflanzen</h2></div><div class="plant-grid">${plantsSaved.map(plantCard).join('')}</div>`:''}`:'<div class="empty">Noch nichts gemerkt. Öffne ein Kapitel oder Pflanzenprofil und tippe auf „Merken“.</div>'}`}
function quellen(){return `<a href="#/mehr" class="back">${icon('arrow','sm')} Mehr</a>${pageTitle('Hintergrund','Quellen & Sicherheit','Quellenhinweise aus dem zugrunde liegenden privaten Notfallhandbuch.')}
 <div class="notice warning"><strong>Faktenprüfung:</strong> Diese App stellt den Text des vorhandenen Handbuchs dar; es wurde hier keine neue amtliche oder medizinische Prüfung sämtlicher Angaben durchgeführt. Insbesondere Rechtslage und Fachinformationen können sich ändern. KI-Bilder sind keine botanisch verifizierten Bestimmungstafeln.</div>
 <div class="notice">Neue Pflanzensteckbriefe sind ungeprüfte Text-Orientierungen und keine Anleitung zur Ernte oder Selbstmedikation. Für zuverlässige Bestimmung geeignete botanische Fachliteratur und qualifizierte Fachpersonen hinzuziehen. Pflanzenarten und Verbreitungen bei Bedarf z. B. anhand von FloraWeb (BfN) überprüfen.</div><div class="list-links">${D.sources.map(x=>`<div class="search-item" style="color:#c4d7c5;font-size:13px">${esc(x)}</div>`).join('')}</div>
 <div class="notice">Für reale Notfälle in Deutschland gilt: 112 wählen und offiziellen Behördenhinweisen folgen. Keine rechtliche oder medizinische Fachberatung.</div>`}
function searchpage(){return `${pageTitle('Volltextsuche','Suchen im Handbuch','Suche nach Kapiteln, Pflanzen, Arbeitsschritten und Stichwörtern.')}
 <div class="search-box">${icon('search')}<input id="global-query" placeholder="z. B. Feuer, Holunder, Jagd, Wasser" type="search" aria-label="Suche im Handbuch" autofocus autocomplete="off"></div><div id="global-search-results" class="search-results"><div class="notice">Tippe einen Begriff ein, um das Handbuch zu durchsuchen.</div></div>`}
function snippets(text,q,n=110){let t=text.replace(/\s+/g,' ').trim(),i=t.toLocaleLowerCase('de').indexOf(q.toLocaleLowerCase('de'));if(i<0)return t.slice(0,n)+'…';let begin=Math.max(0,i-35),end=Math.min(t.length,i+n);return (begin?'…':'')+t.slice(begin,end)+(end<t.length?'…':'')}
function updateSearch(){const q=(document.getElementById('global-query')?.value||'').trim().toLocaleLowerCase('de');const dest=document.getElementById('global-search-results');if(!dest)return;if(!q){dest.innerHTML='<div class="notice">Tippe einen Begriff ein, um das Handbuch zu durchsuchen.</div>';return}
 const results=[];
 for(const c of chapters){const candidate=[c.title,c.subtitle,c.summary,...c.blocks.map(b=>b.text||'')].join(' ');if(candidate.toLocaleLowerCase('de').includes(q)){results.push({type:'Kapitel',title:c.title,url:`#/wissen/${c.id}`,hint:snippets(candidate,q,100)})}}
 for(const p of plants){const candidate=[p.name,p.latin,...p.facts].join(' ');if(candidate.toLocaleLowerCase('de').includes(q)){results.push({type:'Pflanze',title:p.name,url:`#/pflanze/${p.id}`,hint:snippets(candidate,q,100)})}}
 for(const p of X.procedures){const candidate=[p.name,p.category,...p.steps,...p.materials].join(' ');if(candidate.toLocaleLowerCase('de').includes(q))results.push({type:'Bauanleitung',title:p.name,url:`#/anleitung/${p.id}`,hint:snippets(candidate,q,100)})}
 dest.innerHTML=results.length?`<p class="tiny muted">${results.length} Treffer</p>`+results.map(x=>`<a class="search-item" href="${x.url}"><div class="card-kicker">${esc(x.type)}</div><strong>${esc(x.title)}</strong><small>${esc(x.hint)}</small></a>`).join(''):'<div class="empty">Keine Treffer gefunden.</div>';
}
function notFound(){return `${pageTitle('Nicht gefunden','Seite nicht vorhanden','Der angeforderte Inhalt existiert nicht.')}<a class="btn" href="#/">Zur Startseite</a>`}
let currentGPS='';
// Survival NRW v1.3.0 — additional offline-first modules.
const X=window.SURVIVAL_V13;
const procById=id=>X.procedures.find(p=>p.id===id);
const fieldGuideImage=(id,description)=>`<figure class="feature-photo">${pic(id,description)}<figcaption>Fotorealistische KI-Rekonstruktion · nur beispielhafte Darstellung; keine technische Prüfung</figcaption></figure>`;
function featureTiles(){return `<div class="feature-tiles">
<a href="#/bundeslaender">${icon('location')}<strong>Bundesländer</strong><small>16 regionale Profile</small></a>
<a href="#/knotenschule">${icon('package')}<strong>Knotenschule</strong><small>11 Knoten und Bünde</small></a>
<a href="#/anleitungen">${icon('tent')}<strong>Bauanleitungen</strong><small>${X.procedures.length} bebilderte Abläufe</small></a>
<a href="#/notfall-assistent">${icon('plus')}<strong>Notfallassistent</strong><small>Situationsbezogene Soforthilfe</small></a>
<a href="#/wildtiere">${icon('paw')}<strong>Wildtiere & Jagd</strong><small>Fährten, Wildhygiene, Recht</small></a>
<a href="#/material">${icon('package')}<strong>Materialrechner</strong><small>Unverbindliche Richtwerte</small></a>
<a href="#/karten">${icon('location')}<strong>Offline-Karten</strong><small>Eigene Karte & Wegpunkte</small></a>
<a href="#/fortschritt">${icon('check')}<strong>Übungsfortschritt</strong><small>Lesen, Üben & Fotos</small></a>
<a href="#/giftpflanzen">${icon('alert')}<strong>Giftpflanzen</strong><small>Gefährliche Doppelgänger</small></a>
<a href="#/offline">${icon('download')}<strong>Offline prüfen</strong><small>Alle App-Dateien kontrollieren</small></a></div>`}
function buildList(){return `${pageTitle('Praxiswissen','Schritt-für-Schritt-Anleitungen','Originalkapitel bleiben unverändert. Neue Bau- und Übungsabläufe mit Materiallisten und bestehenden KI-Fotos.')}
<div class="notice warning"><strong>Wichtig:</strong> Fotos sind Illustrationen der Tätigkeit und bilden nicht jeden Arbeitsschritt einzeln ab. Zeitangaben sind grobe Annahmen. Konstruktionen vor Nutzung prüfen.</div>
<div class="procedure-grid">${X.procedures.map(p=>`<a class="proc-card" href="#/anleitung/${p.id}">${pic(p.image,p.name)}<span><small>${esc(p.category)} · ${esc(p.time)}</small><strong>${esc(p.name)}</strong><em>${p.steps.length} Arbeitsschritte →</em></span></a>`).join('')}</div>`}
function progress(type,id){return store.get(`progress:${type}:${id}`,{read:false,practiced:false});}
function learningPanel(type,id){let x=progress(type,id);return `<div class="learning-panel"><strong>Lernfortschritt</strong><label><input type="checkbox" data-learn="read" data-type="${esc(type)}" data-id="${esc(id)}" ${x.read?'checked':''}> Anleitung gelesen</label><label><input type="checkbox" data-learn="practiced" data-type="${esc(type)}" data-id="${esc(id)}" ${x.practiced?'checked':''}> Unter geeigneten Bedingungen praktisch geübt</label><p class="tiny muted">Auf diesem Gerät gespeichert. Haken bestätigen keine fachliche Qualifikation.</p></div>`}
function buildDetail(id){let p=procById(id);if(!p)return notFound();let done=store.get('procsteps:'+id,[]);return `<a class="back" href="#/anleitungen">← Alle Bauanleitungen</a>
${pageTitle(p.category,p.name,p.time)}${fieldGuideImage(p.image,p.name)}
<div class="notice warning">${esc(p.caution)}</div><div class="section-title"><h2>Benötigte Materialien</h2></div><ul class="detail-materials">${p.materials.map(m=>`<li>${esc(m)}</li>`).join('')}</ul>
<div class="section-title"><h2>Arbeitsschritte</h2><span class="pill" id="proc-progress">${done.length} / ${p.steps.length}</span></div>
<div class="procedure-steps">${p.steps.map((s,i)=>`<label class="procedure-step"><input data-procstep="${p.id}" data-index="${i}" type="checkbox" ${done.includes(i)?'checked':''}><span class="step-num">${i+1}</span><span class="step-body"><b>Schritt ${i+1}</b><span>${esc(s)}</span></span></label>`).join('')}</div>
${learningPanel('procedure',p.id)}<div class="save-card"><h3>Eigene Notizen und Fotos</h3><textarea class="notes-field" id="practice-note" placeholder="Was hast du bei deiner Übung beobachtet?">${esc(store.get('practice-note:'+p.id,''))}</textarea><div class="toolrow"><button data-action="save-practice-note" data-id="${esc(p.id)}" class="btn small">Notiz speichern</button></div><label class="upload-label">Eigenes Übungsfoto hinzufügen<input type="file" accept="image/*" data-practice-photo="${esc(p.id)}"></label><div id="practice-photo-preview" class="own-photo"></div><p class="tiny muted">Foto bleibt auf diesem Gerät. Beim Löschen der Browserdaten kann es verloren gehen.</p></div>`}
function wildlifePage(){return `${pageTitle('Naturbeobachtung','Wildtiere & Fährten','Spuren lesen, dokumentieren und Risiken einschätzen.')}
<div class="notice danger">Jagd und Fischerei sind in ganz Deutschland gesetzlich geregelt und unterliegen dem Bundes- und jeweiligen Landesrecht. Keine Wildentnahme ohne die erforderlichen Berechtigungen. Der Notfallratgeber ist kein Ersatz für Jagdausbildung, Trichinenuntersuchung oder Fleischhygiene-Kontrollen.</div>
${fieldGuideImage('fährten','Fährten im Wald')}
<div class="section-title"><h2>Typische Spuren</h2></div><div class="species-grid">${X.wildlife.map(w=>`<section class="species-card"><h3>${esc(w.name)}</h3><p><b>Spuren:</b> ${esc(w.trace)}</p><p><b>Lebensraum:</b> ${esc(w.habitat)}</p><p class="species-warning">${esc(w.warning)}</p></section>`).join('')}</div>
<div class="section-title"><h2>Praxis & Sicherheit</h2></div><div class="small-links"><a class="quick-link" href="#/anleitung/faehrte">Fährten fotografisch dokumentieren →</a><a class="quick-link" href="#/anleitung/wildhygiene">Wildbrethygiene und Krankheiten →</a><a class="quick-link" href="#/wissen/9">Originalkapitel Jagd & Ausweiden →</a></div>`}
function assistantPage(){return `${pageTitle('Soforthilfe','Notfallassistent','Wähle die aktuelle Gefahr. Für lebensbedrohliche Situationen zuerst 112 wählen.')}
<div class="notice danger"><b>Akuter medizinischer oder gefährlicher Notfall?</b> <a href="tel:112" class="btn danger small">112 anrufen</a><p>Die App kann keine Rettung organisieren und erkennt deinen Zustand nicht automatisch.</p></div>
<div class="scenario-grid">${X.assist.map(a=>`<button type="button" class="scenario-btn" data-action="scenario" data-id="${esc(a.id)}">${icon('alert')}<span>${esc(a.name)}</span>${icon('next')}</button>`).join('')}</div><div id="scenario-result" aria-live="polite" class="scenario-result"><div class="notice">Wähle oben eine Situation aus.</div></div>`}
function showScenario(id){let a=X.assist.find(x=>x.id===id);const out=document.getElementById('scenario-result');if(!a||!out)return;out.innerHTML=`<section class="scenario-guidance"><h2>${esc(a.name)}</h2><ol class="steps">${a.steps.map(s=>`<li><span>${esc(s)}</span></li>`).join('')}</ol><div class="notice warning"><b>Nicht tun:</b> ${esc(a.avoid)}</div><a class="btn danger" href="tel:112">112 anrufen</a><a class="btn secondary" href="#/notfall">GPS / Notfallseite</a></section>`;out.scrollIntoView({block:'nearest',behavior:'smooth'});}
const MATS={tarp:{name:'Tarp-A-Frame',calc:n=>[['Plane',1,'Grundaufbau'],['Abspannleine',1,'Satz nach örtlichem Bedarf'],['Heringe / Verankerungen',1,'Satz nach Untergrund'],['Trockene Bodenisolierung',n,'Schlafplätze']]},bett:{name:'Bodennahe Lagerstätte',calc:n=>[['Liegematten oder isolierte Schlafplätze',n,'Stück'],['Trockene Zusatzisolierung',n,'Lagen'],['Wetterschutz',1,'Plane']]},dreibein:{name:'Dreibein',calc:n=>[['Tragende Holzstangen',3,'Stück'],['Lashings / feste Bindungen',1,'Satz'],['Geeignete hitzefeste Aufhängung',1,'Stück'],['Kochgefäß',1,'Stück']]},regen:{name:'Regenwasserfang',calc:n=>[['Saubere Plane',1,'Stück'],['Auffanggefäße',Math.max(1,Math.ceil(n/2)),'Stück'],['Abspannleine',1,'Satz nach Aufbau'],['Möglichkeit zur Desinfektion',1,'Satz']]}};
function materialPage(){return `${pageTitle('Planungshilfe','Materialrechner','Grobe Vorplanung — keine garantierten Mindestmengen oder statischen Berechnungen.')}
<div class="calculator"><label class="field-label" for="material-type">Konstruktion</label><select id="material-type">${Object.entries(MATS).map(([k,v])=>`<option value="${k}">${esc(v.name)}</option>`).join('')}</select><label class="field-label" for="material-people">Personenzahl</label><input id="material-people" type="number" min="1" max="12" value="2" inputmode="numeric"><div id="material-result"></div></div>
<div class="notice warning"><strong>Nur Richtwerte.</strong> Die Angaben dienen zur Vorbereitung und sind keine statische Freigabe. Standort, Witterung, Material und rechtliche Vorschriften entscheiden über die sichere Durchführung.</div>`}
function updateMaterial(){let k=document.getElementById('material-type')?.value,n=Number(document.getElementById('material-people')?.value||2);const out=document.getElementById('material-result');if(!out||!MATS[k])return;n=Math.max(1,Math.min(12,Math.round(n)));out.innerHTML=`<div class="section-title"><h2>Unverbindlicher Bedarf für ${n} Person(en)</h2></div><div class="material-lines">${MATS[k].calc(n).map(a=>`<div><span>${esc(a[0])}</span><b>${a[1]} ${esc(a[2])}</b></div>`).join('')}</div>`}
// Local image import is user-supplied: no unlicensed map tiles or invented routes.
const dbOpen=()=>new Promise((resolve,reject)=>{if(!('indexedDB'in window))return reject(Error('IndexedDB wird nicht unterstützt'));const r=indexedDB.open('survival-nrw-v13',1);r.onupgradeneeded=()=>{let db=r.result;if(!db.objectStoreNames.contains('files'))db.createObjectStore('files')};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)});
async function dbSet(key,data){const db=await dbOpen();return new Promise((ok,no)=>{let t=db.transaction('files','readwrite');t.objectStore('files').put(data,key);t.oncomplete=()=>{db.close();ok()};t.onerror=()=>{db.close();no(t.error)}})}
async function dbGet(key){const db=await dbOpen();return new Promise((ok,no)=>{let t=db.transaction('files','readonly');let r=t.objectStore('files').get(key);r.onsuccess=()=>{db.close();ok(r.result)};r.onerror=()=>{db.close();no(r.error)}})}
let mapURL=null;
async function renderSavedFile(key,target){let el=document.getElementById(target);if(!el)return;try{let blob=await dbGet(key);if(!blob){el.innerHTML='<span class="tiny muted">Noch kein eigenes Bild gespeichert.</span>';return}let url=URL.createObjectURL(blob);if(key==='own-map'&&mapURL)URL.revokeObjectURL(mapURL);if(key==='own-map')mapURL=url;el.innerHTML=`<img src="${url}" alt="Selbst importiertes Bild">`;}catch(e){el.textContent='Datei konnte nicht geladen werden: '+e.message}}
function mapPage(){const wp=store.get('waypoints',[]);return `${pageTitle('Orientierung','Offline-Karte & Wegpunkte','Du kannst ein vorhandenes Kartenbild selbst importieren und Koordinaten lokal notieren.')}
<div class="notice warning"><strong>Keine automatische Kartennavigation:</strong> Importierte Bilder sind nicht georeferenziert, zeigen keine eigene Position und ersetzen keine zugelassene Offline-Karten-App. GPS kann ungenau sein.</div>
<section class="save-card"><h3>Eigene Karte importieren</h3><p>Nur eigene oder zur Nutzung freigegebene Bilder als PNG/JPG/WebP bis 8 MB. Der Import bleibt lokal im Browser.</p><label class="upload-label">Kartenbild auswählen<input type="file" accept="image/png,image/jpeg,image/webp" id="map-upload"></label><div class="own-photo map-preview" id="own-map-preview"></div></section>
<div class="toolrow"><a class="btn secondary" href="#/gpx">GPX-/GeoJSON-Track importieren →</a></div>
<section class="save-card"><h3>Wegpunkt speichern</h3><div class="form-grid"><label>Bezeichnung<input type="text" maxlength="80" id="waypoint-name" placeholder="z. B. Parkplatz"></label><label>Breitengrad<input type="number" step="any" min="-90" max="90" id="waypoint-lat" placeholder="51.123456"></label><label>Längengrad<input type="number" step="any" min="-180" max="180" id="waypoint-lon" placeholder="7.123456"></label></div><div class="toolrow"><button class="btn secondary small" data-action="waypoint-gps">GPS übernehmen</button><button class="btn small" data-action="waypoint-add">Wegpunkt speichern</button></div><p class="tiny muted" id="waypoint-feedback" aria-live="polite"></p></section>
<div class="section-title"><h2>Gespeicherte Wegpunkte (${wp.length})</h2></div><div class="waypoint-list">${wp.length?wp.map((p,i)=>`<div class="waypoint"><strong>${esc(p.name)}</strong><span>${p.lat.toFixed(6)}, ${p.lon.toFixed(6)}</span><button data-action="waypoint-remove" data-index="${i}" class="btn outline small">Entfernen</button></div>`).join(''):'<div class="empty">Noch keine Wegpunkte gespeichert.</div>'}</div><div class="notice">Kompass und GPS funktionieren nur mit Gerätesensoren, Berechtigungen und ausreichender Empfangslage. Eine Kompassanzeige ist nicht als verlässliches Rettungsinstrument implementiert.</div>`}
function learningPage(){const list=[...X.procedures.map(p=>({type:'procedure',id:p.id,name:p.name})),...chapters.map(c=>({type:'chapter',id:c.id,name:'Kapitel '+c.id+': '+c.title}))];let read=list.filter(x=>progress(x.type,x.id).read).length,trained=list.filter(x=>progress(x.type,x.id).practiced).length;return `${pageTitle('Dein Übungsstand','Fortschritt & eigene Fotos','Dokumentiere gelesene und unter geeigneten Bedingungen praktisch erprobte Anleitungen.')}
<div class="metric-grid"><div><b>${read} / ${list.length}</b><small>Gelesen</small></div><div><b>${trained} / ${list.length}</b><small>Geübt</small></div><div><b>${favs().length}</b><small>Merkliste</small></div></div><div class="notice">Selbsteinschätzung ohne Qualifikationsnachweis. Die Daten liegen nur auf diesem Gerät.</div>
<div class="learning-list">${list.map(x=>`<a class="learn-row" href="${x.type==='chapter'?'#/wissen/':'#/anleitung/'}${x.id}"><span>${esc(x.name)}</span><small>${progress(x.type,x.id).practiced?'Praktisch geübt':progress(x.type,x.id).read?'Gelesen':'Offen'} →</small></a>`).join('')}</div>`}
function poisonousPage(){let d=plants.filter(p=>['giftig','verwechslung'].includes(p.category));return `${pageTitle('Risiken erkennen','Giftige Pflanzen & Doppelgänger','Gefährliche Arten erkennen lernen — ohne Freigabe für eine Bestimmung vor Ort.')}
<div class="notice danger"><strong>Lebensgefahr:</strong> Besonders Bärlauch und Doldenblütler haben gefährliche Doppelgänger. KI-Bilder oder einzelne Merkmale reichen niemals als sichere Bestimmung.</div>
<div class="section-title"><h2>${d.length} Risiko- und Verwechslungsprofile</h2></div><div class="plant-grid">${d.map(plantCard).join('')}</div>`}
function offlinePage(){return `${pageTitle('Verfügbarkeit','Offline-Status','Prüfe, ob die Dateien nach einem vollständigen Online-Ladevorgang auch ohne Netz verfügbar sind.')}
<div class="notice"><b>Wichtig:</b> Die Anzeige prüft lokale Cache-Einträge; sie garantiert keine dauerhafte Speicherung durch iOS. Für längere Einsätze zusätzlich Ausdrucke und verlässliche Offline-Karten mitnehmen.</div><div class="save-card"><h3>App-Dateien</h3><div id="offline-status" role="status">Noch nicht geprüft.</div><div class="progressbar"><span id="offline-bar" style="width:0"></span></div><div class="toolrow"><button class="btn" data-action="offline-check">Offline prüfen</button><button class="btn secondary" data-action="offline-save">Alle Inhalte zwischenspeichern</button></div></div>`}
const coreFiles=['./','./index.html','./styles.css','./app.js','./data.js','./v13_data.js','./v13_gpx.js','./regions_data.js','./knoten_data.js','./manifest.webmanifest','./sw.js','./version.json','./icon-192.png','./icon-512.png'];
const offlineFiles=[...coreFiles,...D.images.map(id=>imgsrc(id))];
async function offlineAudit(download=false){let result=document.getElementById('offline-status'),bar=document.getElementById('offline-bar');if(!result||!bar)return;if(location.protocol==='file:'||!('caches'in window)){result.textContent='Offline-Cache kann nur auf HTTPS beziehungsweise localhost geprüft werden.';return}let found=0;let cache=await caches.open('survival-nrw-v'+D.version);let missing=[];for(let i=0;i<offlineFiles.length;i++){const path=offlineFiles[i];try{let hit=await caches.match(new URL(path,document.baseURI).href);if(!hit&&download){const resp=await fetch(path,{cache:'reload'});if(!resp.ok)throw Error('HTTP '+resp.status);await cache.put(new URL(path,document.baseURI).href,resp.clone());hit=resp}if(hit)found++;else missing.push(path)}catch(e){missing.push(path)}bar.style.width=`${Math.round((i+1)/offlineFiles.length*100)}%`;result.textContent=`${i+1} / ${offlineFiles.length} geprüft · ${found} gespeichert`;}result.innerHTML=`<b>${found} / ${offlineFiles.length}</b> Dateien im Cache.${missing.length?`<p class="tiny">Noch nicht gespeichert: ${esc(missing.slice(0,4).join(', '))}${missing.length>4?' …':''}</p>`:'<p>Alle geprüften App-Dateien sind zwischengespeichert. Die Offline-Nutzung hängt weiterhin vom Browser-Speicher ab.</p>'}`;}
function backupPage(){return `${pageTitle('Privater Datenspeicher','Backup & Wiederherstellen','Merkliste, Notizen, Listen, Wegpunkte und Fortschritte als JSON-Datei sichern.')}
<div class="notice warning">Die Sicherung enthält möglicherweise persönliche Orts- und Notizdaten. Bewahre sie geschützt auf. Import überschreibt nur die enthaltenen App-Schlüssel, andere Browserdaten bleiben unberührt. Eigene Fotos und Kartenbilder müssen separat gesichert werden.</div>
<div class="toolrow"><button class="btn" data-action="backup-export">Backup exportieren</button><label class="upload-label">Backup importieren<input id="backup-file" type="file" accept="application/json,.json"></label></div><p class="tiny muted" id="backup-feedback" aria-live="polite"></p>`}
function exportBackup(){let data={schema:'survival-nrw-local-backup-1',app_version:D.version,exported_at:new Date().toISOString(),values:{}};for(let i=0;i<localStorage.length;i++){let key=localStorage.key(i);if(key?.startsWith('survival-nrw:'))data.values[key]=localStorage.getItem(key)}let blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});let url=URL.createObjectURL(blob);let a=document.createElement('a');a.href=url;a.download='SurvivalNRW_Backup_'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),3000);}
async function importBackup(file){if(!file||file.size>2*1024*1024)throw Error('Datei fehlt oder ist größer als 2 MB');let b=JSON.parse(await file.text());if(b?.schema!=='survival-nrw-local-backup-1'||!b.values||typeof b.values!=='object')throw Error('Kein gültiges Survival-NRW-Backup');const vals=Object.entries(b.values);if(vals.length>250)throw Error('Ungewöhnlich viele Einträge');for(const [k,v] of vals){if(!k.startsWith('survival-nrw:')||typeof v!=='string'||v.length>200000)throw Error('Ungültiger Dateninhalt')}for(const [k,v] of vals)localStorage.setItem(k,v);return vals.length}


// Version 1.4.0 — 16 Bundesländer und Knotenschule, alle bisherigen Funktionen bleiben erhalten.
const REGIONS=window.SURVIVAL_REGIONS||[];
const KNOTS=window.SURVIVAL_KNOTS||[];
const currentRegion=()=>REGIONS.find(r=>r.id===store.get('region','NW'))||REGIONS.find(r=>r.id==='NW')||REGIONS[0];
const regionHomeCard=()=>`<section class="region-ribbon"><div><div class="eyebrow">Aktives Bundesland</div><h2>${esc(currentRegion().name)}</h2><p>${esc(currentRegion().terrain)}</p></div><a class="btn small" href="#/bundeslaender">Bundesland auswählen →</a></section>`;
function regionAdvice(chapterId){const r=currentRegion();if(!r)return '';
 const mapping={1:['Gefahrenlage',r.hazard],2:['Evakuierung und örtliche Regeln',r.legal],3:['Lagerplatz',r.shelter],4:['Gelände und Standfestigkeit',r.shelter],5:['Feuer und regionale Regeln',r.legal],6:['Kochen und örtliche Regeln',r.legal],7:['Wasser',r.water],8:['Pflanzen und Lebensräume',r.flora],9:['Jagd und Schutzgebiete',r.legal],10:['Pflanzenkunde',r.flora],11:['Regionale Gefahren',r.hazard],12:['Gelände & Wetter',r.hazard],13:['Jahreszeiten',r.summer+' Im Winter: '+r.winter]};
 const x=mapping[chapterId];return x?`<aside class="regional-note"><div class="eyebrow">Regionaler Hinweis · ${esc(r.name)}</div><strong>${esc(x[0])}</strong><p>${esc(x[1])}</p><a href="#/bundesland/${r.id}">Alle Hinweise zum Bundesland →</a></aside>`:'';
}
function bundeslaenderPage(){const active=currentRegion();return `${pageTitle('Deutschland','Alle 16 Bundesländer','Wähle das Bundesland für regionale Hinweise in deinen Survival-Kapiteln.')}
 <div class="notice warning"><strong>Hinweis:</strong> Bundeslandprofile sind allgemeine Geländehinweise, keine Echtzeitwarnungen oder verbindlichen Rechtsauskünfte. Aktuelle Warnlagen, Jagd-, Feuer- und Naturschutzregeln immer amtlich prüfen.</div>
 ${regionHomeCard()}
 <div class="search-box">${icon('search')}<input id="region-query" type="search" placeholder="Bundesland oder Landschaft suchen…" aria-label="Bundesländer durchsuchen"></div>
 <div class="section-title"><h2>Bundesländer</h2><span class="pill">${REGIONS.length} Regionen</span></div>
 <div class="region-grid" id="region-results">${REGIONS.map(regionCard).join('')}</div>
 <div class="notice">Die bestehenden 13 Fachkapitel, 60 Pflanzenprofile und 25 KI-Fotos gelten als allgemeines Grundwissen. Für einzelne Bundesländer werden keine ungeprüften Pflanzenvorkommen, Jagdzeiten oder Rechtsfreigaben behauptet.</div>`}
function regionCard(r){const sel=r.id===currentRegion().id;return `<a class="region-card ${sel?'chosen':''}" href="#/bundesland/${esc(r.id)}"><span class="region-symbol">${esc(r.id)}</span><span><strong>${esc(r.name)}</strong><small>${esc(r.terrain)}</small></span><span class="region-card-end">${sel?'Ausgewählt':'Öffnen'} →</span></a>`}
function filterRegions(){let q=(document.getElementById('region-query')?.value||'').toLocaleLowerCase('de');let results=REGIONS.filter(r=>(r.name+' '+r.terrain+' '+r.hazard).toLocaleLowerCase('de').includes(q));let el=document.getElementById('region-results');if(el)el.innerHTML=results.map(regionCard).join('')||'<p>Kein Bundesland gefunden.</p>';}
function bundeslandPage(id){const r=REGIONS.find(x=>x.id===id);if(!r)return notFound();const active=r.id===currentRegion().id;
 const aspects=[['Landschaft',r.terrain,'map'],['Mögliche Gefahren',r.hazard,'alert'],['Lagerplatz & Unterstand',r.shelter,'tent'],['Wasser',r.water,'droplets'],['Pflanzenstandorte',r.flora,'leaf'],['Zugänglichkeit & Regeln',r.legal,'book'],['Sommer',r.summer,'flame'],['Winter',r.winter,'clock']];
 return `<a href="#/bundeslaender" class="back">← Alle Bundesländer</a>${pageTitle('Bundesland · '+r.id,r.name,'Regionale Besonderheiten für Wald, Natur und Notsituationen.')}
 <div class="region-toolbar"><button class="btn ${active?'secondary':''}" data-action="set-region" data-id="${esc(r.id)}">${active?'Aktuelles Bundesland':'Als Bundesland auswählen'}</button><a class="btn outline" href="#/wissen">13 Fachkapitel →</a></div>
 <div class="notice warning"><strong>Kein Ersatz für offizielle Informationen:</strong> Aktuelle Wetter-, Hochwasser-, Waldbrandwarnungen sowie Feuer-, Jagd- und Naturschutzrecht bitte vor Ort prüfen. Auch im echten Notfall ist professionelle Hilfe vorrangig.</div>
 <div class="region-aspects">${aspects.map(([head,body,ico])=>`<section class="region-aspect">${icon(ico)}<h2>${esc(head)}</h2><p>${esc(body)}</p></section>`).join('')}</div>
 <div class="section-title"><h2>Passende Kapitel</h2></div><div class="quick-grid"><a class="quick-link" href="#/wissen/3">Unterschlupf →</a><a class="quick-link" href="#/wissen/7">Wasser →</a><a class="quick-link" href="#/wissen/12">Orientierung →</a><a class="quick-link" href="#/notfall">Notfall →</a></div>`}
function knotsPage(){return `${pageTitle('Praxiswissen','Knotenschule','11 Knoten und Bünde mit Schrittfolge, Kontrolle und typischen Fehlern.')}
 <div class="notice warning"><strong>Wichtige Grenze:</strong> Diese Anleitung gilt nur für leichte Lager-, Tarp- und Organisationsaufgaben. Keine dieser Beschreibungen oder KI-Aufnahmen qualifiziert zum Klettern, zur Absturzsicherung oder zum Heben schwerer Lasten. Vor Belastung praktisch prüfen.</div>
 <figure class="knots-hero">${pic('knoten','Knoten und Seilverbindungen')}<figcaption>Fotorealistische KI-Aufnahme. Nicht als Prüfung eines korrekt gelegten Knotens verwenden.</figcaption></figure>
 <div class="search-box">${icon('search')}<input id="knot-query" type="search" placeholder="Knoten nach Name oder Zweck suchen…" aria-label="Knotenschule durchsuchen"></div>
 <div id="knot-count" class="tiny muted" style="margin:8px 0 12px">${KNOTS.length} Knoten & Bünde</div>
 <div class="knots-grid" id="knot-results">${KNOTS.map(knotCard).join('')}</div>`}
function knotCard(k){return `<a class="knot-card" href="#/knoten/${esc(k.id)}">${pic(k.image,k.name)}<span class="knot-card-content"><small>${esc(k.group)}</small><strong>${esc(k.name)}</strong><em>${k.steps.length} Schritte · Anleitung öffnen →</em></span></a>`}
function filterKnots(){let q=(document.getElementById('knot-query')?.value||'').toLocaleLowerCase('de');const arr=KNOTS.filter(k=>(k.name+' '+k.group+' '+k.use).toLocaleLowerCase('de').includes(q));const e=document.getElementById('knot-results');if(e)e.innerHTML=arr.map(knotCard).join('')||'<div class="empty">Kein Knoten gefunden.</div>';const c=document.getElementById('knot-count');if(c)c.textContent=arr.length+' von '+KNOTS.length+' Knoten';}
function knotDetails(id){let k=KNOTS.find(x=>x.id===id);if(!k)return notFound();let done=store.get('knot-steps:'+id,[]).filter(x=>Number.isInteger(x)&&x>=0&&x<k.steps.length);let current=store.get('knot-current:'+id,0);current=Math.max(0,Math.min(k.steps.length-1,Number(current)||0));return `<a class="back" href="#/knotenschule">← Alle Knoten</a>
 ${pageTitle(k.group,k.name,k.use)}
 <figure class="knots-hero">${pic(k.image,'KI-Bildbeispiel: '+k.name)}<figcaption>KI-generiertes Beispielfoto, kein verifizierter Nachweis für den richtigen Seilverlauf. Ausschlaggebend sind die schriftlichen Schritte und die anschließende Kontrolle.</figcaption></figure>
 <div class="notice danger"><strong>Sicherheit:</strong> ${esc(k.caution)}</div>
 <section class="knot-trainer"><div class="trainer-heading"><span class="eyebrow">Schritt-für-Schritt üben</span><strong id="knot-step-label">Schritt ${current+1} von ${k.steps.length}</strong></div><div class="trainer-track"><span id="knot-step-bar" style="width:${((current+1)/k.steps.length*100).toFixed(0)}%"></span></div>
 <p class="trainer-description" id="knot-step-text">${esc(k.steps[current])}</p><div class="trainer-controls"><button class="btn secondary" data-action="knot-prev" data-id="${esc(id)}" ${current===0?'disabled':''}>← Zurück</button><button class="btn" data-action="knot-next" data-id="${esc(id)}" ${current>=k.steps.length-1?'disabled':''}>Weiter →</button></div></section>
 <section class="save-card"><h3>Alle Schritte im Überblick</h3><p class="tiny muted">Hake jeden nach dem Ausprobieren ab. Die Markierungen bleiben auf dem Gerät gespeichert.</p>
 <div class="knot-step-list">${k.steps.map((s,i)=>`<label><input type="checkbox" data-knot-step="${esc(id)}" data-index="${i}" ${done.includes(i)?'checked':''}><span><b>${i+1}.</b> ${esc(s)}</span></label>`).join('')}</div><p class="tiny muted" id="knot-done-count">${done.length} / ${k.steps.length} Schritte abgehakt</p></section>
 <div class="notice"><strong>Richtig gelegt?</strong><p>${esc(k.check)}</p></div><div class="notice warning"><strong>Häufiger Fehler:</strong> ${esc(k.mistake)}</div>
 ${learningPanel('knot',k.id)}<div class="toolrow"><a class="btn secondary" href="#/knotenschule">Weitere Knoten ansehen →</a></div>`}
function setKnotStep(id,step){let k=KNOTS.find(x=>x.id===id);if(!k)return;let n=Math.max(0,Math.min(k.steps.length-1,step));store.set('knot-current:'+id,n);let t=document.getElementById('knot-step-text'),l=document.getElementById('knot-step-label'),bar=document.getElementById('knot-step-bar');if(t)t.textContent=k.steps[n];if(l)l.textContent=`Schritt ${n+1} von ${k.steps.length}`;if(bar)bar.style.width=((n+1)/k.steps.length*100)+'%';for(const action of ['prev','next']){let b=document.querySelector(`[data-action="knot-${action}"]`);if(b)b.disabled=action==='prev'?n===0:n===k.steps.length-1}}

function render(){const path=(location.hash||'#/').replace(/^#\/?/,'').split('/').filter(Boolean);const view=path[0]||'home';let body='';
 switch(view){case 'bundeslaender':body=bundeslaenderPage();break;case 'bundesland':body=bundeslandPage(path[1]);break;case 'knotenschule':body=knotsPage();break;case 'knoten':body=knotDetails(path[1]);break;case 'home':body=home();break;case 'anleitungen':body=buildList();break;case 'anleitung':body=buildDetail(path[1]);break;case 'wildtiere':body=wildlifePage();break;case 'notfall-assistent':body=assistantPage();break;case 'material':body=materialPage();break;case 'karten':body=mapPage();break;case 'gpx':body=gpxPage();break;case 'fortschritt':body=learningPage();break;case 'giftpflanzen':body=poisonousPage();break;case 'offline':body=offlinePage();break;case 'backup':body=backupPage();break;case 'wissen':body=path[1]?article(path[1]):wissensliste();break;case 'pflanzen':body=plantlist();break;case 'pflanze':body=profile(path[1]);break;case 'check':body=checklist();break;case 'notfall':body=notfall();break;case 'mehr':body=mehr();break;case 'bilder':body=gallery();break;case 'merkliste':body=merkliste();break;case 'quellen':body=quellen();break;case 'suche':body=searchpage();break;default:body=notFound()}
 el.innerHTML=body;
 if(view==='material')updateMaterial();
 if(view==='karten')renderSavedFile('own-map','own-map-preview');
 if(view==='gpx')plotGPX(nrwRouteGet());
 if(view==='anleitung')renderSavedFile('practice:'+path[1],'practice-photo-preview');
 const active={'bundeslaender':'mehr','bundesland':'mehr','knotenschule':'wissen','knoten':'wissen','home':'home','wissen':'wissen','pflanzen':'pflanzen','pflanze':'pflanzen','check':'check','mehr':'mehr','notfall':'home','bilder':'mehr','merkliste':'mehr','suche':'wissen','quellen':'mehr','anleitungen':'wissen','anleitung':'wissen','wildtiere':'wissen','notfall-assistent':'home','material':'mehr','karten':'mehr','gpx':'mehr','fortschritt':'mehr','giftpflanzen':'pflanzen','offline':'mehr','backup':'mehr'}[view]||'home';
 for(const a of document.querySelectorAll('[data-nav]')){a.classList.toggle('active',a.dataset.nav===active);if(a.dataset.nav===active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');}
 window.scrollTo({top:0,behavior:'auto'});
}
function initialize(){for(const s of document.querySelectorAll('.nav-icon')){s.innerHTML=icon(s.dataset.icon||'home')}
 document.addEventListener('input',e=>{if(e.target.id==='region-query')filterRegions();if(e.target.id==='knot-query')filterKnots();if(e.target.id==='plant-query')updatePlants();if(e.target.id==='global-query')updateSearch();if(e.target.id==='gallery-query')updateGallery();if(e.target.id==='material-people')updateMaterial()});
 document.addEventListener('change',async e=>{
 if(e.target.matches('[data-knot-step]')){let id=e.target.dataset.knotStep;const arr=[...document.querySelectorAll('[data-knot-step]')].filter(x=>x.checked).map(x=>Number(x.dataset.index));store.set('knot-steps:'+id,arr);const el=document.getElementById('knot-done-count');if(el)el.textContent=arr.length+' / '+KNOTS.find(k=>k.id===id).steps.length+' Schritte abgehakt';}
 if(e.target.matches('[data-check]'))checkUpdate(e.target.dataset.check);
 if(e.target.id==='material-type')updateMaterial();
 if(e.target.matches('[data-procstep]')){const id=e.target.dataset.procstep;const done=[...document.querySelectorAll('[data-procstep]')].filter(x=>x.checked).map(x=>Number(x.dataset.index));store.set('procsteps:'+id,done);let a=document.getElementById('proc-progress');if(a)a.textContent=done.length+' / '+procById(id).steps.length;}
 if(e.target.matches('[data-learn]')){let x=progress(e.target.dataset.type,e.target.dataset.id);x[e.target.dataset.learn]=e.target.checked;store.set('progress:'+e.target.dataset.type+':'+e.target.dataset.id,x);toast('Fortschritt gespeichert');}
 if(e.target.id==='map-upload'){let f=e.target.files?.[0];if(!f)return;if(!['image/png','image/jpeg','image/webp'].includes(f.type)||f.size>8e6){toast('PNG/JPG/WebP, höchstens 8 MB');return}try{await dbSet('own-map',f);await renderSavedFile('own-map','own-map-preview');toast('Kartenbild lokal gespeichert')}catch(err){toast('Speichern nicht möglich: '+err.message)}}
 if(e.target.matches('[data-practice-photo]')){let f=e.target.files?.[0];if(!f)return;if(!['image/png','image/jpeg','image/webp'].includes(f.type)||f.size>8e6){toast('Foto ist zu groß oder falscher Dateityp');return}try{await dbSet('practice:'+e.target.dataset.practicePhoto,f);await renderSavedFile('practice:'+e.target.dataset.practicePhoto,'practice-photo-preview');toast('Foto gespeichert')}catch(err){toast('Foto konnte nicht gespeichert werden')}}
 if(e.target.id==='backup-file'){try{const n=await importBackup(e.target.files?.[0]);document.getElementById('backup-feedback').textContent=n+' Einträge importiert. Ansichten neu öffnen, um Änderungen zu sehen.'}catch(err){document.getElementById('backup-feedback').textContent='Import abgebrochen: '+err.message}}
 });
 document.addEventListener('click',async e=>{
 const btn=e.target.closest('[data-action]');if(!btn)return;const action=btn.dataset.action;
 if(action==='set-region'){store.set('region',btn.dataset.id);toast('Bundesland gespeichert');render();return}
 if(action==='knot-next'||action==='knot-prev'){let k=KNOTS.find(x=>x.id===btn.dataset.id);if(!k)return;let n=Number(store.get('knot-current:'+k.id,0))+(action==='knot-next'?1:-1);setKnotStep(k.id,n);return}
 if(action==='scenario'){showScenario(btn.dataset.id);return}
 if(action==='offline-check'||action==='offline-save'){await offlineAudit(action==='offline-save');return}
 if(action==='backup-export'){exportBackup();toast('Datensicherung erstellt');return}
 if(action==='save-practice-note'){store.set('practice-note:'+btn.dataset.id,document.getElementById('practice-note')?.value||'');toast('Übungsnotiz gespeichert');return}
 if(action==='waypoint-add'){const name=document.getElementById('waypoint-name')?.value?.trim()||'Ohne Namen';const lat=Number(document.getElementById('waypoint-lat')?.value),lon=Number(document.getElementById('waypoint-lon')?.value);const r=document.getElementById('waypoint-feedback');if(!Number.isFinite(lat)||!Number.isFinite(lon)||Math.abs(lat)>90||Math.abs(lon)>180||!document.getElementById('waypoint-lat').value||!document.getElementById('waypoint-lon').value){r.textContent='Bitte gültige Koordinaten eingeben.';return}let v=store.get('waypoints',[]);v.push({name:name.slice(0,80),lat,lon});store.set('waypoints',v);render();toast('Wegpunkt lokal gespeichert');return}
 if(action==='waypoint-remove'){let v=store.get('waypoints',[]);v.splice(Number(btn.dataset.index),1);store.set('waypoints',v);render();return}
 if(action==='waypoint-gps'){const r=document.getElementById('waypoint-feedback');if(!navigator.geolocation){r.textContent='GPS nicht verfügbar';return}r.textContent='GPS wird abgefragt …';navigator.geolocation.getCurrentPosition(p=>{document.getElementById('waypoint-lat').value=p.coords.latitude.toFixed(6);document.getElementById('waypoint-lon').value=p.coords.longitude.toFixed(6);r.textContent='Standort übernommen (ca. '+Math.round(p.coords.accuracy)+' m Genauigkeit).'},()=>r.textContent='Standortbestimmung abgelehnt oder nicht verfügbar.',{enableHighAccuracy:true,timeout:13000});return}
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
 if('serviceWorker'in navigator&&location.protocol.startsWith('http')){navigator.serviceWorker.register('sw.js').then(async()=>{const s=document.getElementById('netstatus');if(s)s.textContent='Offline-Cache wird vorbereitet';await navigator.serviceWorker.ready;const valid=await Promise.all(offlineFiles.map(async f=>Boolean(await caches.match(new URL(f,document.baseURI).href))));if(s)s.textContent=valid.every(Boolean)?'Offline bereit':'Offline teils verfügbar'}).catch(()=>{let s=document.getElementById('netstatus');if(s)s.textContent='Offline-Status unklar'})} else {const s=document.getElementById('netstatus');if(s)s.textContent=location.protocol==='file:'?'Lokale Datei':'Online geöffnet'}
 window.addEventListener('offline',()=>{let s=document.getElementById('netstatus');if(s)s.textContent='Kein Netz'});
 window.addEventListener('online',()=>{let s=document.getElementById('netstatus');if(s)s.textContent='Online / Cache'});
}
initialize();

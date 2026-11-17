// Statický generátor webu OŠK Trenčianske Stankovce: data/ + src/ -> dist/   (node build.js; TODAY=2026-11-17 prepíše dnešný dátum)
// Zostavuje ho kluby-siet/engine/assemble.py zo spoločného jadra v2 a tohto súboru (vzhľad, úvod, stránka Klub).
// Kostra „Plagát“: svetlý papier, čierne veľké písmo Anton, žltá len ako zvýraznenie. Úvod je plagát najbližšieho
// zápasu, pod ním tri veľké čísla, program a výsledky ako zoznam s veľkými dátumami a tabuľka. História, pohár,
// hymna a ihrisko sú na stránke Klub. Písmo Anton (nadpisy, čísla) a Source Serif 4 (text).
const SKIN = {
  nav: 'bar', theme: '#111111', brand: 'Trenčianske Stankovce', brandSub: '',
  fonts: ['anton-400.woff', 'source-serif-4-400.woff', 'source-serif-4-600.woff'],
  sources: 'História a hymna podľa archívu bývalého webu klubu, pohár podľa Sportnetu.',
  adminHero: 'Futbal v Trenčianskych Stankovciach od roku 1959',
  adminFacts: club.historia.map((h) => ({ k: h.rok, t: h.kratko || h.text })),
  links: [[club.obecUrl, 'Klub na webe obce'], [club.staryWeb, 'Archív bývalého webu klubu']],
};
const NAV = [['zapasy/', 'Zápasy'], ['tabulky/', 'Tabuľky'], ['timy/', 'Tímy'], ['klub/', 'Klub'], ['kontakt/', 'Kontakt']];
const DESC = `${club.nazov} – zápasy, výsledky, tabuľky a súpisky áčka (${A.leagueName}) a mládeže. Futbal v Stankovciach od roku ${club.futbalOd}, víťaz Pohára ZsFZ 2009/10.`;

// plagát zápasu: dátum, súperi a miesto veľkým písmom
function poster(m, R) {
  const us = 'OŠK Stankovce', them = esc(m.opponent);
  const [h, a] = m.home ? [us, them] : [them, us];
  const when = `${DAYS[dObj(m.date).getUTCDay()]} ${dShort(m.date)}`;
  return `<div class="poster">
  <p class="poster-k">${m.past ? 'Posledný zápas' : 'Najbližší zápas'} · ${esc(m.comp)}${m.roundName ? `, ${esc(m.roundName)}` : ''}</p>
  <p class="poster-d"><time datetime="${m.date}">${when}</time>${m.past ? '' : ` <span>${esc(m.time || '')}</span>`}</p>
  <h1 class="poster-h"><span${m.home ? ' class="is-us"' : ''}>${h}</span> ${m.score ? `<span class="poster-vs poster-vs--sc">${m.gf}:${m.ga}<span class="sr"> pre Stankovce</span></span>` : '<span class="poster-vs">proti</span>'} <span${m.home ? '' : ' class="is-us"'}>${a}</span></h1>
  <p class="poster-p">${m.home ? `Doma, ${esc(ST.nazov)}` : `Vonku${m.venue ? `, ${esc(venueName(m.venue))}` : ''}`}${m.score ? ` · ${RES[m.res].toLowerCase()}` : ''}</p>
  <p class="btns">${m.past ? (m.detail ? `<a class="btn" href="${R}${m.url}">Priebeh a zostavy</a>` : '') : `<a class="btn" href="${R}kalendar/zapas-${m.id}.ics" download>${I.cal}Do kalendára</a>${m.home ? `<a class="btn btn--line" href="${mapsUrl}" rel="noopener">${I.route}Navigovať</a>` : ''}`}<a class="btn btn--line" href="${R}zapasy/">Všetky zápasy</a></p>
</div>`;
}

add('', {
  title: 'futbal v Trenčianskych Stankovciach', active: '', bodyClass: 'home',
  body: (R) => {
    const m = nextA || lastA;
    const row = A.table?.rows.find((r) => r.our);
    const wl = winterLine();
    return `<section class="hero"><div class="wrap">
  ${wl ? `<p class="pause">${wl}</p>` : ''}
  ${m ? poster(m, R) : `<h1 class="poster-h">${esc(club.nazov)}</h1>`}
</div></section>
${row ? `<section class="nums" aria-label="Áčko v tabuľke"><div class="wrap nums-in">
  <p><b>${A.pos}.</b><span>miesto ${zo(A.of)}, ${esc(A.leagueName)}</span></p>
  <p><b>${row.pts}</b><span>${pw(row.pts, 'bod', 'body', 'bodov')} po ${row.played} ${pw(row.played, 'zápase', 'zápasoch', 'zápasoch')}</span></p>
  <p><b>${row.gf}:${row.ga}</b><span>skóre áčka</span></p>
</div></section>` : ''}
<section class="sec" aria-labelledby="prog-h"><div class="wrap cols2">
  <div>${secHead('Program', 'prog-h', more(`${R}zapasy/`, 'Všetky'))}${upcoming.length ? fxList(upcoming.slice(0, 5), R) : '<p>Ďalšie zápasy zatiaľ nie sú vyžrebované.</p>'}</div>
  <div>${secHead('Výsledky', 'res-h', more(`${R}zapasy/#z-vys`, 'Všetky'))}${fxList(results.filter((x) => x.score).slice(0, 5), R)}</div>
</div></section>
${A.table ? `<section class="sec sec--table" aria-labelledby="tab-h"><div class="wrap">
  ${secHead(esc(A.leagueName), 'tab-h', more(`${R}tabulky/`, 'Všetky tabuľky'), 'Áčko')}
  ${tableHtml(A.table, R)}
</div></section>` : ''}
<section class="sec sec--club" aria-labelledby="club-h"><div class="wrap club-in">
  <h2 class="h2" id="club-h">Od roku ${club.futbalOd}</h2>
  <ul class="club-facts">
    <li><b>2009/10</b> víťaz Pohára ZsFZ</li>
    <li><b>2004/05</b> postup do IV. ligy</li>
    <li><b>2025</b> Slovan Bratislava v Slovnaft Cupe pred 2 730 divákmi</li>
  </ul>
  ${more(`${R}klub/`, 'História, pohár a hymna')}
</div></section>`;
  },
});

add('klub/', {
  title: 'Klub', active: 'klub/', desc: `${club.nazov}: história od roku ${club.futbalOd}, Pohár ZsFZ, zápasy so Slovanom a Spartakom, hymna Cez Stankovce cesta a Oddychové centrum.`,
  body: (R) => `${pageHead({ title: 'Klub', sub: `${esc(club.pravnyNazov)}. Farby ${esc(club.farby)}.`, R, crumbs: [[null, 'Klub']] })}
<section class="sec sec--first"><div class="wrap klub">
  <div class="klub-main">
    <h2 class="h2">História</h2>
    <ol class="years">${club.historia.map((h) => `<li><b>${esc(h.rok)}</b><span>${esc(h.text)}</span></li>`).join('')}</ol>
  </div>
  <aside class="klub-side">
    <img src="${R}img/erb-240.webp" alt="${esc(club.erbAlt || `Erb ${club.nazov}`)}" width="${Math.round(160 * CREST_R)}" height="160" loading="lazy">
    <h2 class="h3">Úspechy</h2>
    <ul class="wins">${club.uspechy.zoznam.map((u) => `<li><b>${esc(u.rok)}</b> ${esc(u.text)}</li>`).join('')}</ul>
  </aside>
</div></section>
<section class="sec sec--dark" aria-labelledby="cup-h"><div class="wrap">
  ${secHead('Veľkí súperi v pohári', 'cup-h')}
  <ol class="cup">${club.pohar.zapasy.map((z) => `<li><span class="cup-y">${esc(z.rok)}</span><span class="cup-o">${esc(z.super)}</span><span class="cup-s">${esc(z.skore).replace(/ /g, '')}</span><span class="cup-t">${esc(z.kolo)} · ${esc(z.text)}</span></li>`).join('')}</ol>
</div></section>
<section class="sec" aria-labelledby="ih-h"><div class="wrap cols2">
  <div>
    ${secHead(esc(ST.nazov), 'ih-h', '', 'Ihrisko')}
    <p>${esc(ST.pribeh)}</p>
    ${facts([{ k: 'Kapacita', t: `${ST.kapacita} miest, ${ST.sedadla} na sedenie` }, { k: 'Rozmery', t: ST.rozmery }, { k: 'Vlastník', t: ST.vlastnik }])}
  </div>
  <div>
    ${secHead(esc(club.hymna.nazov), 'hy-h', '', `Hymna, text ${esc(club.hymna.autor)}`)}
    <div class="hymn">${club.hymna.slohy.map((s) => `<p>${s.map(esc).join('<br>')}</p>`).join('')}</div>
  </div>
</div></section>
${club.hraci ? `<section class="sec sec--paper" aria-labelledby="hr-h"><div class="wrap prose">${secHead('V kádri', 'hr-h')}<p>${esc(club.hraci.text)}</p></div></section>` : ''}
<section class="sec" aria-labelledby="ob-h"><div class="wrap prose">
  ${secHead('Trenčianske Stankovce', 'ob-h', '', 'Obec')}
  <p>${esc(club.obec.text)}</p>
  <p class="note">Zdroje: archív bývalého webu klubu, Sportnet, Wikipédia, TASR a sportnet.sme.sk.</p>
</div></section>`,
});

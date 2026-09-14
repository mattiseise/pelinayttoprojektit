#!/usr/bin/env node
/*
 * Näyttöprojektin savutesti. Ajo projektin juuressa:
 *     node tyokalut/tarkista.js
 * (skilli kopioi tämän tiedoston projektin tyokalut-kansioon)
 *
 * Tarkistaa, että index.html ja sisalto.js ovat keskenään yhtenäiset ja että
 * mikään täyttämättä jäänyt kohta ei päädy opiskelijan silmien eteen.
 * Poistumiskoodi 1, jos virheitä löytyi.
 *
 * v2 (kaksipalstainen layout): viikkokortit ovat <article class="week-card">
 * (ei enää <details>), koska JS näyttää yhden viikon kerrallaan sivupalkin
 * kautta. Rakenteen tarkka kuvaus: /root/work/layout-rakenne.md.
 */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

function read(name) {
  const p = path.join(ROOT, name);
  if (!fs.existsSync(p)) { err(`${name} puuttuu`); return ""; }
  return fs.readFileSync(p, "utf8");
}

const html = read("index.html");
const appjs = read("app.js");
if (!html) { console.error("index.html puuttuu — ei voi jatkaa."); process.exit(1); }

global.window = {};
let P;
try {
  require(path.join(ROOT, "sisalto.js"));
  P = global.window.NAYTTOPROJEKTI;
} catch (e) {
  console.error("sisalto.js ei latautunut:", e.message);
  process.exit(1);
}
if (!P) { console.error("sisalto.js ei asettanut window.NAYTTOPROJEKTI"); process.exit(1); }

/* ---------- 1. sisalto.js:n pakolliset kentät ---------- */
["slug", "nimi", "vuosi", "viikot", "vaiheet", "viikkoNimet", "kehykset", "viikkoOhjeet"]
  .forEach((k) => { if (!P[k]) err(`sisalto.js: pakollinen kenttä '${k}' puuttuu`); });

const weeks = (P.viikot || []).map(Number);
const holidays = (P.lomaViikot || []).map(Number);
const workWeeks = weeks.filter((w) => !holidays.includes(w));

if (weeks.join(",") !== [...weeks].sort((a, b) => a - b).join(",")) {
  err("sisalto.js: viikot eivät ole nousevassa järjestyksessä");
}
if (workWeeks.length < 3 || workWeeks.length > 18) {
  err(`${workWeeks.length} työviikkoa — runko on mitoitettu 3–18 viikolle`);
}

/* Keston mukainen mitoitus, ks. references/pedagoginen-runko.md § Kesto. */
const MITOITUS = workWeeks.length <= 5 ? { vaiheita: 2, testeja: 6, ketjuja: 1 }
  : workWeeks.length <= 9 ? { vaiheita: 3, testeja: 8, ketjuja: 2 }
  : { vaiheita: 4, testeja: 12, ketjuja: 3 };
if ((P.vaiheet || []).length !== MITOITUS.vaiheita) {
  warn(`${workWeeks.length} työviikkoa → suositus ${MITOITUS.vaiheita} vaihetta, nyt ${(P.vaiheet || []).length}`);
}

/* ---------- 2. viikkoOhjeet ---------- */
const GUIDE_FIELDS = ["type", "feature", "connection", "deliverable", "why", "done", "record", "skills", "steps", "example", "notEnough"];
workWeeks.forEach((w) => {
  const g = P.viikkoOhjeet[w];
  if (!g) { err(`sisalto.js: viikolta ${w} puuttuu viikkoOhjeet`); return; }
  GUIDE_FIELDS.forEach((f) => { if (g[f] === undefined || g[f] === "") err(`viikko ${w}: viikkoOhjeet.${f} puuttuu`); });
  if (g.type && !P.kehykset[g.type]) err(`viikko ${w}: viikkotyyppi '${g.type}' puuttuu kehykset-objektista`);
  if (Array.isArray(g.steps) && g.steps.length < 3) warn(`viikko ${w}: vain ${g.steps.length} askelta (3–6 on tavoite)`);
  if (Array.isArray(g.skills) && g.skills.length < 2) warn(`viikko ${w}: alle 2 tekniikkatagia`);
  if (g.help) {
    ["title", "tree", "actions", "code", "test"].forEach((f) => {
      if (!g.help[f]) err(`viikko ${w}: help.${f} puuttuu`);
    });
  }
  if (g.paivat && (!Array.isArray(g.paivat) || g.paivat.some((p) => !Array.isArray(p) || p.length < 2))) {
    err(`viikko ${w}: viikkoOhjeet.paivat pitää olla [[nimi, teksti], …] -taulukko`);
  }
  if (!P.viikkoNimet[w]) err(`viikko ${w}: viikkoNimet-nimi puuttuu`);
});
Object.keys(P.viikkoOhjeet || {}).forEach((w) => {
  if (!workWeeks.includes(Number(w))) err(`viikkoOhjeet sisältää viikon ${w}, jota ei ole viikot-listassa`);
});
holidays.forEach((w) => { if (!P.viikkoNimet[w]) warn(`lomaviikolta ${w} puuttuu viikkoNimet-nimi`); });

/* ---------- 3. vaiheet ---------- */
const covered = [];
(P.vaiheet || []).forEach((ph) => {
  if (!ph.tunnus || !ph.otsikko || !Array.isArray(ph.viikot)) err(`vaihe ${ph.tunnus || "?"}: tunnus, otsikko tai viikot puuttuu`);
  if (ph.tunnus && !"ABCDEF".includes(String(ph.tunnus).toUpperCase())) {
    err(`vaihe ${ph.tunnus}: tunnuksen pitää olla A–F (styles.css tuntee vain ne värit)`);
  }
  (ph.viikot || []).forEach((w) => {
    if (covered.includes(w)) err(`viikko ${w} on useammassa vaiheessa`);
    covered.push(w);
    if (!weeks.includes(w)) err(`vaihe ${ph.tunnus}: viikko ${w} ei ole viikot-listassa`);
  });
  /* Vaiheotsikko esiintyy sivupalkin viikkonavigaatiossa vasta kun app.js on
     rakentanut sen, joten HTML:stä ei enää voi tarkistaa suoraan — riittää,
     että vaihe kattaa viikkonsa (tarkistettu yllä) ja tunnus on kelvollinen. */
});
weeks.filter((w) => !covered.includes(w)).forEach((w) => err(`viikko ${w} ei kuulu mihinkään vaiheeseen`));

/* ---------- 4. index.html: viikkokortit ---------- */
const cardWeeks = [...html.matchAll(/<article class="week-card" id="week-(\d+)" data-week="\d+">/g)].map((m) => Number(m[1]));
const holidayCards = [...html.matchAll(/<article class="holiday-card" id="week-(\d+)"/g)].map((m) => Number(m[1]));

workWeeks.filter((w) => !cardWeeks.includes(w)).forEach((w) => err(`index.html: viikkokortti week-${w} puuttuu (odotettu <article class="week-card" id="week-${w}">)`));
cardWeeks.filter((w) => !workWeeks.includes(w)).forEach((w) => err(`index.html: ylimääräinen viikkokortti week-${w}`));
holidays.filter((w) => !holidayCards.includes(w)).forEach((w) => err(`index.html: holiday-card week-${w} puuttuu`));
if (new Set(cardWeeks).size !== cardWeeks.length) err("index.html: sama viikkokortti kahdesti");

/* Kortin sisäinen rakenne */
const cardBlocks = [...html.matchAll(/<article class="week-card" id="week-(\d+)"[\s\S]*?<\/article>/g)];
const allTaskIds = [];
cardBlocks.forEach(([block, num]) => {
  const ids = [...block.matchAll(/data-task="([\d-]+)"/g)].map((m) => m[1]);
  if (ids.length < 2) err(`viikko ${num}: alle 2 tehtävää`);
  if (ids.length > 5) warn(`viikko ${num}: ${ids.length} tehtävää — 2–4 pitää viikon hallittavana`);
  ids.forEach((id) => {
    if (!id.startsWith(num + "-")) err(`viikko ${num}: tehtävätunnus '${id}' ei ala viikkonumerolla`);
    if (allTaskIds.includes(id)) err(`tehtävätunnus '${id}' esiintyy kahdesti`);
    allTaskIds.push(id);
  });
  const evidenceMatch = block.match(/<p class="evidence">([\s\S]*?)<\/p>/);
  if (!evidenceMatch || !evidenceMatch[1].trim()) err(`viikko ${num}: .evidence-rivi puuttuu tai on tyhjä`);
  if (!/class="[^"]*\blesson-instructions\b[^"]*"/.test(block)) err(`viikko ${num}: .lesson-instructions puuttuu`);
  if (!/<span class="lesson-label"/.test(block)) err(`viikko ${num}: .lesson-label puuttuu (app.js kirjoittaa siihen)`);
  if (!/<p class="checkpoint">/.test(block)) err(`viikko ${num}: .checkpoint puuttuu (Valmis kun -kortti)`);
  if (!/<h1 class="view-title">[^<]+<\/h1>/.test(block)) err(`viikko ${num}: <h1 class="view-title"> puuttuu tai on tyhjä`);
  if (!/data-week-journal="\d+"/.test(block)) err(`viikko ${num}: .week-journal (data-week-journal) puuttuu`);
  const status = block.match(/<span class="week-status"[^>]*>(\d+) \/ (\d+)<\/span>/);
  if (!status) err(`viikko ${num}: week-status puuttuu`);
  else if (Number(status[2]) !== ids.length) err(`viikko ${num}: week-status sanoo ${status[2]}, tehtäviä on ${ids.length}`);
});

/* ---------- 5. viikkojen "small-rivi" / data-week-label ---------- */
function isoMonday(year, week) {
  const simple = new Date(Date.UTC(year, 0, 4));
  const day = simple.getUTCDay() || 7;
  simple.setUTCDate(simple.getUTCDate() - day + 1 + (week - 1) * 7);
  return simple;
}
const years = Array.isArray(P.vuosi) ? P.vuosi.map(Number) : [Number(P.vuosi)];
const EN_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/* Paivaton tila (P.paivaton): viikot ovat jarjestysnumeroita 1...N ilman
   kalenteripaivia, joten ISO-viikkotarkistus ohitetaan. data-week-label-
   attribuutin pitaa silti mainita viikon numero, jotta paperipaketti ja
   sivu pysyvat synkassa. Dated-tilassa attribuutin pitaa olla ISO-viikon
   paivamaara. */
[...html.matchAll(/<article class="week-card" id="week-(\d+)"[^>]*>\s*<p class="view-eyebrow" data-week-label="([^"]+)"/g)].forEach(([, num, dates]) => {
  if (P.paivaton) {
    if (!new RegExp(`(^|[^0-9])${num}([^0-9]|$)`).test(dates)) {
      err(`viikko ${num}: paivattoman tilan data-week-label "${dates}" ei mainitse viikon numeroa`);
    }
    return;
  }
  const w = Number(num);
  const candidates = years.flatMap((y) => {
    const ma = isoMonday(y, w);
    const pe = new Date(ma.getTime() + 4 * 86400000);
    const sameMonth = ma.getUTCMonth() === pe.getUTCMonth();
    const fi = sameMonth
      ? `${ma.getUTCDate()}.–${pe.getUTCDate()}.${pe.getUTCMonth() + 1}.`
      : `${ma.getUTCDate()}.${ma.getUTCMonth() + 1}.–${pe.getUTCDate()}.${pe.getUTCMonth() + 1}.`;
    const en = sameMonth
      ? `${ma.getUTCDate()}–${pe.getUTCDate()} ${EN_MONTHS[pe.getUTCMonth()]}`
      : `${ma.getUTCDate()} ${EN_MONTHS[ma.getUTCMonth()]} – ${pe.getUTCDate()} ${EN_MONTHS[pe.getUTCMonth()]}`;
    return [fi, en];
  });
  const seen = dates.trim().replace(/\s/g, "");
  if (!candidates.some((c) => c.replace(/\s/g, "") === seen)) {
    err(`viikko ${w}: data-week-label "${dates}" ei vastaa ISO-viikkoa (odotettu ${candidates.join(" tai ")})`);
  }
});

/* ---------- 6. näyttömatriisi ---------- */
/* Näyttömatriisi on valinnainen: pelkkä projektisivusto (ei osaamisen näyttöä) ei
   sisällä matriisia lainkaan. Jos matriisi on, se tarkistetaan kokonaan; jos ei ole,
   koko lohko ohitetaan — mutta puolikas matriisi on virhe. */
const evidenceIds = [...html.matchAll(/data-evidence="([a-z0-9]+)"/g)].map((m) => m[1]);
const matrixCount = [...html.matchAll(/<details class="matrix"/g)].length;
const evidenceCounter = html.match(/data-evidence-count>0 \/ (\d+)</);
const matrixUsed = Boolean(evidenceIds.length || matrixCount || evidenceCounter);
if (matrixUsed) {
  if (!evidenceIds.length) err("index.html: näyttömatriisista puuttuvat data-evidence-rastit");
  if (!matrixCount) err("index.html: yhtään tutkinnon osan matriisia ei löytynyt (odotettu <details class=\"matrix\">)");
  const dupes = evidenceIds.filter((id, i) => evidenceIds.indexOf(id) !== i);
  if (dupes.length) err(`data-evidence-tunnus toistuu: ${[...new Set(dupes)].join(", ")}`);
  if (evidenceCounter && Number(evidenceCounter[1]) !== evidenceIds.length) {
    err(`näyttömatriisin laskuri sanoo ${evidenceCounter[1]}, rasteja on ${evidenceIds.length}`);
  }
  [...html.matchAll(/<summary><span class="matrix-title">([^<]+)<\/span><span class="matrix-count">(\d+) vaatimusta<\/span><\/summary>([\s\S]*?)<\/details>/g)]
    .forEach(([, title, n, body]) => {
      const count = [...body.matchAll(/data-evidence=/g)].length;
      if (Number(n) !== count) err(`matriisi "${title}": otsikko sanoo ${n}, rasteja on ${count}`);
    });
} else {
  warn("index.html: yhtään <summary><span class=\"matrix-title\">…</span><span class=\"matrix-count\">…</span></summary> -muotoista matriisiotsikkoa ei löytynyt (ohitettu, koska matriisia ei käytetä)");
}

/* ---------- 7. suunnitelmalomake ---------- */
if (P.suunnitelma) {
  const fields = [...html.matchAll(/data-plan-field="([A-Za-z0-9_]+)"/g)].map((m) => m[1]);
  (P.suunnitelma.pakolliset || []).forEach((f) => {
    if (!fields.includes(f)) err(`suunnitelma: pakollinen kenttä '${f}' ei löydy index.html:n lomakkeesta`);
  });
  if (!html.includes("data-plan-export")) err("index.html: suunnitelman latausnappi (data-plan-export) puuttuu");
  if (!html.includes("data-plan-status")) err("index.html: data-plan-status puuttuu");
  if (typeof P.suunnitelma.markdown !== "function") err("sisalto.js: suunnitelma.markdown ei ole funktio");
  else {
    try {
      const md = P.suunnitelma.markdown({ arvo: () => "x", onTäytetty: () => false, raaka: {}, pvm: "1.1.2026" });
      if (!md || md.length < 200) warn("suunnitelma.markdown tuottaa hyvin lyhyen tiedoston");
    } catch (e) { err(`suunnitelma.markdown kaatuu: ${e.message}`); }
  }
}

/* ---------- 8. täyttämättä jääneet kohdat ---------- */
const leftTokens = [...new Set([...html.matchAll(/\{\{([A-Z0-9_]+)\}\}/g)].map((m) => m[1]))];
if (leftTokens.length) err(`index.html: täyttämättömiä tokeneita: ${leftTokens.join(", ")}`);
const leftMarkers = (html.match(/TÄYTÄ:/g) || []).length;
if (leftMarkers) err(`index.html: ${leftMarkers} täyttämätöntä TÄYTÄ-ohjelohkoa`);
if (/Lorem ipsum|TODO|FIXME|XXX/i.test(html)) warn("index.html sisältää TODO/placeholder-tekstiä");

/* ---------- 8b. testauksen minimit suhteessa kestoon ---------- */
const testiOsuma = html.match(/[Vv]ähintään\s+(\d+)\s+suunniteltua\s+testitapausta/)
  || html.match(/[Aa]t least\s+(\d+)\s+planned test cases/);
if (!testiOsuma) warn("testauksen vähimmäistavoitetta ei löytynyt");
else if (Number(testiOsuma[1]) < MITOITUS.testeja) {
  warn(`testejä luvattu ${testiOsuma[1]}, ${workWeeks.length} viikon projektissa vähintään ${MITOITUS.testeja}`);
}
const ketjuOsuma = html.match(/(\d+)\s+(?:täydellistä\s+)?virheenkorjausketju/)
  || html.match(/(\d+)\s+complete debugging chains/);
if (ketjuOsuma && Number(ketjuOsuma[1]) < MITOITUS.ketjuja) {
  warn(`virheenkorjausketjuja ${ketjuOsuma[1]}, suositus ${MITOITUS.ketjuja}`);
}

/* ---------- 9. app.js koskemattomuus ---------- */
if (appjs) {
  if (appjs.includes(P.slug)) err("app.js sisältää projektin slugin — moottoriin on kirjoitettu projektikohtaista sisältöä");
  if (!appjs.includes("window.NAYTTOPROJEKTI")) err("app.js ei lue sisalto.js:ää — väärä app.js-versio?");
}

/* ---------- 10. viitatut tiedostot ---------- */
const htmlNoComments = html.replace(/<!--[\s\S]*?-->/g, "");
[...htmlNoComments.matchAll(/(?:src|href)="((?:assets|downloads)\/[^"]+)"/g)].forEach(([, rel]) => {
  if (!fs.existsSync(path.join(ROOT, rel))) warn(`viitattu tiedosto puuttuu: ${rel}`);
});

/* ---------- 11. opettaja-aineisto ---------- */
const opettajaSuunnitelma = P.opettaja?.nayttosuunnitelma || P.opettaja?.projektisuunnitelma;
if (opettajaSuunnitelma?.tyonaytteet) {
  const map = opettajaSuunnitelma.tyonaytteet;
  evidenceIds.filter((id) => !map[id]).forEach((id) => warn(`näyttösuunnitelmasta puuttuu työnäytemäppäys: ${id}`));
  Object.keys(map).filter((id) => !evidenceIds.includes(id)).forEach((id) => warn(`näyttösuunnitelmassa tuntematon tunnus: ${id}`));
}

/* ---------- 12. kaksipalstaisen layoutin runko ---------- */
const REQUIRED_VIEWS = ["kaytto", "toimeksianto", "tyotapa", "galleria", "viikko", "suunnitelma", "paivakirja", "ailoki"];
REQUIRED_VIEWS.forEach((v) => {
  if (!new RegExp(`<section class="view" data-view="${v}"`).test(html)) err(`index.html: näkymä data-view="${v}" puuttuu`);
});
/* naytto (näyttömatriisi) on valinnainen: pelkkä projektisivusto ei sisällä sitä
   (ks. kohta 6). Jos matriisia käytetään, näkymän pitää silti olla olemassa. */
const hasNayttoView = /<section class="view" data-view="naytto"/.test(html);
if (matrixUsed && !hasNayttoView) err('index.html: näyttömatriisia käytetään mutta näkymä data-view="naytto" puuttuu');
if (!matrixUsed && hasNayttoView) warn('index.html: data-view="naytto" on olemassa mutta ilman matriisisisältöä — harkitse sen poistamista');
if (!html.includes('data-week-links')) err('index.html: sivupalkin viikkonavigaation kiinnityskohta (data-week-links) puuttuu');
if (!/id="sivupalkki"/.test(html)) err('index.html: sivupalkin id="sivupalkki" puuttuu (mobiilivalikko tarvitsee sen)');
if (!html.includes('data-sidebar-toggle')) warn('index.html: mobiilin valikkonappi (data-sidebar-toggle) puuttuu');

/* ---------- 13. pedagoginen termistö ----------
 * Sivun pitää opettaa käyttämänsä ammattikieli, ei olettaa sitä tunnetuksi.
 * Tarkistus on kevyt ja mekaaninen — se ei ymmärrä kieltä, vaan etsii tunnetut
 * riskitermit (lyhenteet, kirjain+numero-tunnukset) opiskelijalle näkyvästä
 * tekstistä ja vaatii, että
 *   a) termi on projektin sanastossa (P.termisto), ja
 *   b) termin ENSIMMÄINEN opiskelijalle näkyvä käyttö joko selittää sen samassa
 *      lohkossa tai viikon `termit`-lista nostaa sen "Uudet termit" -laatikkoon.
 * Lukujärjestys: Näin käytät sivua → Toimeksianto → Työtapa → Suunnitelma →
 * viikot nousevassa järjestyksessä. Muut näkymät (galleria, päiväkirja,
 * AI-loki, näyttömatriisi, sanasto) tarkistetaan vain sanaston kattavuuden osalta.
 * Varoitus on parempi kuin automaattinen tekstinmuutos: tunnusperheet
 * (P0/P1/P2, T01…, RC) ovat virheitä, muut lyhenteet huomautuksia.
 */
const termisto = Array.isArray(P.termisto) ? P.termisto : [];
const termiAvaimet = new Set(termisto.map((g) => String(g.termi || "").toLowerCase()));
termisto.forEach((g, i) => {
  if (!g || !g.termi || !g.selite) err(`termisto[${i}]: termi ja selite ovat pakollisia`);
  if (g && g.viikko != null && !workWeeks.includes(Number(g.viikko))) err(`termisto: termin '${g.termi}' viikko ${g.viikko} ei ole työviikko`);
});
const termiDupes = termisto.map((g) => String(g.termi || "").toLowerCase()).filter((k, i, a) => a.indexOf(k) !== i);
if (termiDupes.length) err(`termisto: termi toistuu: ${[...new Set(termiDupes)].join(", ")}`);
const hasTermitView = /<section class="view" data-view="termit"/.test(html);
const hasTermistoHolder = html.includes("data-termisto");
if (termisto.length && (!hasTermitView || !hasTermistoHolder)) err('index.html: sisalto.js:ssä on termisto, mutta näkymä data-view="termit" tai [data-termisto] puuttuu');
if (!termisto.length && (hasTermitView || hasTermistoHolder)) warn("index.html: sanastonäkymä on olemassa, mutta sisalto.js:n termisto on tyhjä");
workWeeks.forEach((w) => {
  (P.viikkoOhjeet[w]?.termit || []).forEach((k) => {
    if (!termiAvaimet.has(String(k).toLowerCase())) err(`viikko ${w}: termit-listan '${k}' puuttuu termistosta`);
  });
});

/* Opiskelijalle näkyvä teksti lohkoina lukujärjestyksessä. */
const stripHtml = (s) => s.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/\s+/g, " ");
const viewBlock = (name) => {
  const m = html.match(new RegExp(`<section class="view" data-view="${name}"[\\s\\S]*?<\\/section>\\s*(?=<!--|<section class="view"|<\\/main>)`));
  return m ? stripHtml(m[0]) : "";
};
const stringsOf = (v, out = []) => {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => stringsOf(x, out));
  else if (v && typeof v === "object") Object.values(v).forEach((x) => stringsOf(x, out));
  return out;
};
let planText = "";
try { planText = P.suunnitelma?.markdown ? P.suunnitelma.markdown({ arvo: () => "", onTäytetty: () => false, raaka: {}, pvm: "" }) : ""; } catch (_) { /* raportoitu kohdassa 7 */ }
const lohkot = [
  { nimi: "Näin käytät sivua", teksti: viewBlock("kaytto") },
  { nimi: "Toimeksianto", teksti: viewBlock("toimeksianto") },
  { nimi: "Työtapa", teksti: viewBlock("tyotapa") },
  { nimi: "Suunnitelma", teksti: `${viewBlock("suunnitelma")} ${planText}` },
  ...workWeeks.map((w) => {
    const card = html.match(new RegExp(`<article class="week-card" id="week-${w}"[\\s\\S]*?<\\/article>`));
    const g = P.viikkoOhjeet[w] || {};
    const guideText = stringsOf({ ...g, termit: undefined }).join(" ");
    return { nimi: `viikko ${w}`, viikko: w, teksti: `${card ? stripHtml(card[0]) : ""} ${guideText}`, termit: (g.termit || []).map((k) => String(k).toLowerCase()) };
  })
];
const muuTeksti = ["galleria", "paivakirja", "ailoki", "naytto"].map(viewBlock).join(" ")
  + " " + stringsOf({ tekstit: P.tekstit, lataukset: P.lataukset, paivakirja: P.paivakirja, kehykset: P.kehykset, viikkoNimet: P.viikkoNimet, vaiheet: P.vaiheet }).join(" ");
const kaikkiTeksti = lohkot.map((l) => l.teksti).join(" ") + " " + muuTeksti;

/* Riskitermiperheet. `re` löytää käytön, `termi` tarkistaa sanaston,
   `maarittely` hyväksyy ensimmäisen käytön samassa lohkossa. */
const A = (acr, maarittely) => ({
  nimi: acr, re: new RegExp(`(?<![\\w-])${acr}(?![\\w])`, "g"), termi: (k) => k === acr.toLowerCase(),
  maarittely: maarittely || new RegExp(`\\(${acr}\\)|${acr}\\)|${acr}\\s*[=:]|${acr}\\s+(?:eli|tarkoittaa|on|means|is|stands for)\\b`, "i"),
  vakava: false
});
const PERHEET = [
  { nimi: "testitapaustunnus (T01…)", re: /(?<![\w-])T\d{2}(?![\w])/g, termi: (k) => /^t\d{2}/.test(k), maarittely: /testitapau|test case|numbered test|numeroi/i, vakava: true },
  { nimi: "P0", re: /(?<![\w-])P0(?![\w])/g, termi: (k) => k === "p0", maarittely: /P0\)|\(P0|P0\s*(?:=|eli|tarkoittaa|on|means|is)|pakollinen ydin|must-have|minimum content|pakollinen perus/i, vakava: true },
  { nimi: "P1", re: /(?<![\w-])P1(?![\w])/g, termi: (k) => k === "p1", maarittely: /P1\)|\(P1|P1\s*(?:=|eli|tarkoittaa|on|means|is)/i, vakava: true },
  { nimi: "P2", re: /(?<![\w-])P2(?![\w])/g, termi: (k) => k === "p2", maarittely: /P2\)|\(P2|P2\s*(?:=|eli|tarkoittaa|on|means|is)/i, vakava: true },
  { nimi: "RC (release candidate)", re: /(?<![\w-])RC\d?(?![\w])/g, termi: (k) => /^rc/.test(k), maarittely: /release candidate|julkaisuehdok/i, vakava: true },
  { nimi: "PR (pull request)", re: /(?<![\w-])PR(?![\w])/g, termi: (k) => k === "pr" || k === "pull request", maarittely: /pull request/i, vakava: false,
    huomio: "jos pull requestit eivät kuulu projektin työtapaan, poista PR esimerkeistä" },
  A("MVP", /minimum viable product/i), A("GDD", /game design document/i), A("DFS", /depth-first/i),
  A("API"), A("CDN"), A("CSV"), A("JSON"), A("JWT"), A("CRUD"), A("REST"), A("SQL"), A("SPA"), A("DOM"), A("ORM"), A("WebGL"), A("UI"), A("UX"), A("CI")
];
PERHEET.forEach((f) => {
  const kaytto = kaikkiTeksti.match(f.re);
  if (!kaytto) return;
  const sanastossa = [...termiAvaimet].some(f.termi);
  const raportoi = f.vakava ? err : warn;
  if (!sanastossa) {
    raportoi(`termistö: '${f.nimi}' esiintyy ${kaytto.length}× opiskelijalle näkyvässä tekstissä, mutta ei ole sanastossa (P.termisto)${f.huomio ? ` — ${f.huomio}` : ""}`);
  }
  const eka = lohkot.find((l) => f.re.test(l.teksti) && (f.re.lastIndex = 0, true));
  f.re.lastIndex = 0;
  if (!eka) return; // vain viitenäkymissä (matriisi, päiväkirja tms.)
  const selitetty = f.maarittely.test(eka.teksti) || (eka.termit || []).some(f.termi);
  if (!selitetty) {
    raportoi(`termistö: '${f.nimi}' tulee ensimmäisen kerran vastaan lohkossa "${eka.nimi}" ilman selitystä — selitä samassa kohdassa${eka.viikko ? ` tai lisää se viikon ${eka.viikko} termit-listaan` : ""}`);
  }
});

/* ---------- tulos ---------- */
const total = allTaskIds.length;
const matriisiOsa = matrixUsed
  ? ` · ${evidenceIds.length} osaamisvaatimusta · ${matrixCount} tutkinnon osaa`
  : " · ei näyttömatriisia (projektisivusto)";
console.log(`${P.nimi} · ${workWeeks.length} työviikkoa · ${total} tehtävää${matriisiOsa}`);
warnings.forEach((w) => console.log("  HUOM  " + w));
errors.forEach((e) => console.log("  VIRHE " + e));
if (!errors.length && !warnings.length) console.log("  Kaikki tarkistukset läpi.");
else console.log(`\n${errors.length} virhettä, ${warnings.length} huomautusta`);
process.exit(errors.length ? 1 : 0);

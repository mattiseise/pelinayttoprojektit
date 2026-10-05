/*
 * Ajo: npm install docx && node tyokalut/tee_lataukset.js
 * PDF: Chrome headless --print-to-pdf tyokalut/tyopaketti-print.html-tiedostosta.
 *
 * Geneerinen generaattori. Kaikki teksti tulee sisalto.js:stä ja index.html:stä,
 * jotta paperiversio pysyy sivuston kanssa synkassa. Tähän tiedostoon ei
 * kirjoiteta projektikohtaista sisältöä.
 *
 * v2.4: jos sisalto.js:ssä on `teema`, työpaketti tehdään kahtena:
 *   tyopaketti-print.html   → <slug>-tyopaketti.pdf          näytölle, opiskelijan teemassa
 *   tyopaketti-tuloste.html → <slug>-tyopaketti-tuloste.pdf  tulostettava: vaalea tausta, isokirjainen
 * ja työpaketin docx on isokirjainen (sama perusfonttikoko). Opettajan
 * aineisto (näyttösuunnitelma, dokumentointipohjat) pysyy normaalina.
 *
 * v2.7: yhtenäiset viikko-ohjeet (P.yhtenaisetViikot): työpaketin alkuun "Mitä rakennat ja
 * miten etenet" (lopputulos, vaiheet[].kuvaus, lataukset.aloitusHuomio, print-HTML:ssä myös
 * P.vaihekuva) ja jokaisen viikon alkuun yhteys kokonaisprojektiin ja viikon tavoite.
 * Tehtävät numeroidaan työvaiheiksi. Lomakortin teksti on kortin viimeinen kappale. Oletustyylissä
 * työvaihe pidetään samalla sivulla; suurikirjaimisessa teema- ja tulosteversiossa taitto jatkuu
 * (muuten sivuille jää isoja aukkoja).
 *
 * v2.8: linkkimerkinnät ([[toimeksianto]], [[ohje:commit]], [[tiedosto:x]], [[github:actions]],
 * [teksti](https://…) …) muuttuvat paperilla luettaviksi: sivuston kohde kerrotaan sanoin
 * ("Commit ja push (Vektoripaja-sivusto: Työtapa → Näin teet)") ja verkko-osoite kokonaan.
 * Objektimuotoinen osatehtävä tulostuu riveinä Missä / Tee / Näet nyt. Ajo pysähtyy, jos
 * tulosteeseen jää raaka [[-merkintä.
 */
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, PageBreak,
} = require("docx");

const SITE = path.join(__dirname, "..");
const OUT = path.join(SITE, "downloads");
fs.mkdirSync(OUT, { recursive: true });

/* ---------- sisalto.js ---------- */
global.window = {};
require(path.join(SITE, "sisalto.js"));
const P = global.window.NAYTTOPROJEKTI;
if (!P) throw new Error("sisalto.js ei asettanut window.NAYTTOPROJEKTI");
const O = P.opettaja || {};
const NS = O.nayttosuunnitelma || O.projektisuunnitelma || {};

/* Työpaketin ja print-HTML:n tekstit. Oletukset suomeksi; projekti voi korvata
   minkä tahansa avaimen sisalto.js:n `lataukset`-objektista (muunkielinen sivusto).
   Opettajan dokumentointipohjat pysyvät suomeksi — ne ovat opettajan aineistoa. */
const L_OLETUS = {
  lang: "fi",
  tyopakettiOtsikko: "Paperinen työpaketti",
  tyopakettiTiedostoOtsikko: "työpaketti",
  kansiJohdanto: "Tämä paketti on aikataulu ja tarkistuslista tilanteisiin, joissa sivusto ei ole auki. Projektipäiväkirja kirjoitetaan sivustolla ja viedään repositoryn project-docs-kansioon. Rasti tässä vihossa ei ole palautus: työ on aina Git-repositoryssa.",
  luovutus: (d) => `luovutus ${d}`,
  aikatauluOtsikko: "Aikataulu yhdellä aukeamalla",
  aikatauluLyhyt: "Aikataulu",
  sarakeViikko: "Vko",
  sarakePvm: "Pvm",
  sarakeAihe: "Viikon aihe",
  sarakeVaihe: "Vaihe",
  eiProjektityota: (title) => `${title} – ei projektityötä`,
  palautusHuomio: (d) => `Palautus viimeistään ${d}. Sivusto: tehtävien tarkat ohjeet, toteutusavut ja projektipäiväkirja.`,
  vaiheOtsikko: (tunnus, otsikko) => `Vaihe ${tunnus} – ${otsikko}`,
  viikkoOtsikko: (num, dates, title) => `Vko ${num} · ${dates} – ${title}`,
  valmisKun: "Valmis kun: ",
  valmisKunLabel: "Valmis kun:",
  evidenceLabel: "Työnäyte Git-repositoryyn ennen rastia:",
  viimeisetPaivatOtsikko: "Viimeiset viisi päivää",
  matriisiOtsikko: (n) => `Näyttömatriisi – ${n} osaamisvaatimusta`,
  matriisiJohdanto: "Rasti vasta, kun vaatimukselle on täsmällinen työnäyte: linkki, commit, kuva, testirivi tai muistio. Sama työnäyte voi kelvata useaan kohtaan.",
  selainHuomio: "Muista: sivuston rastit ja kentät tallentuvat vain selaimeen. Ne eivät siirry opettajalle eivätkä korvaa Gitissä olevaa työtä.",
  sanastoOtsikko: "Sanasto",
  sanastoJohdanto: "Projektin tunnukset ja ammattitermit siinä järjestyksessä, jossa ne tulevat vastaan. Jokainen on selitetty myös sivustolla ensimmäisen käytön kohdalla.",
  sanastoViikko: (w) => `vko ${w}`,
  /* v2.5: tehtäväkortit paperilla */
  tehtavaNumero: (i, n) => `Tehtävä ${i} / ${n}`,
  tallennaLabel: "Tallenna työnäyte:",
  /* v2.7: yhtenäiset viikko-ohjeet */
  aloitusOtsikko: "Mitä rakennat ja miten etenet",
  aloitusVaiheetOtsikko: (n) => `Projektin ${n} vaihetta`,
  aloitusVaiheViikot: (first, last, dateless) => `${dateless ? "työviikot" : "viikot"} ${first === last ? first : `${first}–${last}`}`,
  aloitusHuomio: "",
  yhteysLabel: "Yhteys kokonaisprojektiin:",
  tavoiteLabel: "Viikon tavoite:",
  lopputarkistusLabel: "Viikon lopputarkistus:",
  /* v2.8: selkeys */
  missaLabel: "Missä:",
  teeLabel: "Tee:",
  naetLabel: "Näet nyt:",
  sivusto: "",
  sivustonOsoite: "",
  perusohjeetPolku: (tyotapa, otsikko) => `${tyotapa} → ${otsikko}`,
  kuvaohjePolku: "kuvaohje",
  viikkoPolku: (w) => `viikko ${w}`,
  dokumentointipohjatJohdanto: (nimi) => `${nimi} · kopioi tarvitsemasi pohja project-docs-kansioon tai täytä paperilla ja skannaa. Jokainen pohja vastaa sivuston viikkotehtävää.`
};
const L_YHTENAINEN = { tehtavaNumero: (i, n) => `Työvaihe ${i} / ${n}` };
const L = Object.assign({}, L_OLETUS, P.yhtenaisetViikot ? L_YHTENAINEN : {}, P.lataukset || {});
const lt = (key, ...args) => {
  const value = L[key];
  return typeof value === "function" ? value(...args) : value;
};

/* Viikon verkkolinkit myös paperiversioon. Perusosoite tulee projektin
   lataukset-asetuksista; paikalliset resurssit toimivat verkossa PDF/Wordista. */
function weekResources(g) {
  if (!L.resurssienPerusosoite) return [];
  return (g.resources || []).map(([label, href]) => [label, new URL(href, L.resurssienPerusosoite).href]);
}

const html = fs.readFileSync(path.join(SITE, "index.html"), "utf8");

/* ---------- v2.8: linkkimerkinnät paperille ---------- */
const LINK_RE = /\[\[([^\]|\n]+?)(?:\|([^\]\n]+))?\]\]|\[([^\]\n]+)\]\((https?:\/\/[^)\s]+|(?:\.\.?\/)?[\w-]+\/[\w./-]+\.\w+)\)/g;
const linksOn = Boolean(P.selkeys || P.perusohjeet || P.tiedostokortit);
const navLabels = Object.fromEntries([...html.matchAll(/data-view-nav="([a-z]+)">([^<]+)</g)].map((m) => [m[1], m[2].trim()]));
const viewName = (v) => (P.nakymaNimet && P.nakymaNimet[v]) || navLabels[v] || v;
const basicsMap = new Map((Array.isArray(P.perusohjeet) ? P.perusohjeet : []).map((o) => [String(o.tunnus), o]));
const cardsMap = P.tiedostokortit && typeof P.tiedostokortit === "object" ? P.tiedostokortit : {};
const cardName = (id) => (cardsMap[id] && (cardsMap[id].otsikko || String(cardsMap[id].polku || id).replace(/\/+$/, "").split("/").pop())) || id;
const templateWeek = new Map();
Object.entries(P.viikkoOhjeet || {}).forEach(([w, g]) => (g.pohjat || []).forEach((t) => { if (t && t.tunnus) templateWeek.set(String(t.tunnus), [Number(w), t.otsikko]); }));
let kuvaTitles = new Map();
try {
  const kp = path.join(SITE, P.kuvakaappauksetPolku || "kuvakaappaukset.json");
  if (fs.existsSync(kp)) { const d = JSON.parse(fs.readFileSync(kp, "utf8")); kuvaTitles = new Map((Array.isArray(d) ? d : d.kuvat || []).map((k) => [k.tunnus, k.otsikko || k.kuvaa || k.tunnus])); }
} catch (_) { /* kuvaohjeet valinnaisia */ }
function paperLinks(value) {
  const s = String(value ?? "");
  if (!linksOn || !/\[\[|\]\(/.test(s)) return s;
  const site = (L && L.sivusto) || `${P.nimi}-sivusto`;
  const where = (label, place) => `${label} (${site}${place ? `: ${place}` : ""})`;
  return s.replace(LINK_RE, (m, target, label, extLabel, url) => {
    if (url && !/^https?:/.test(url)) url = L.sivustonOsoite ? new URL(url, L.sivustonOsoite).href : url;
    if (url) return extLabel && extLabel !== url ? `${extLabel} (${url})` : url;
    const tg = String(target).trim();
    const week = tg.match(/^vk\s*(\d+)$/i);
    if (week) return label || lt("viikkoPolku", week[1]);
    const c = tg.indexOf(":");
    if (c > 0) {
      const kind = tg.slice(0, c).trim(), id = tg.slice(c + 1).trim();
      if (kind === "github") { if (P.repo === "oma") return `${label || `GitHub: ${id}`} (oma GitHub-repositorysi, sivu ${id.replace(/^\/+/, "") || "etusivu"})`; const u = `${String(P.repo || "").replace(/\/+$/, "")}/${id.replace(/^\/+/, "")}`; return `${label || `GitHub: ${id}`} (${u})`; }
      if (kind === "ohje") return where(label || (basicsMap.get(id) || {}).otsikko || id, lt("perusohjeetPolku", viewName("tyotapa"), P.perusohjeetOtsikko || "Näin teet"));
      if (kind === "tiedosto") return where(label || cardName(id), lt("perusohjeetPolku", viewName("tyotapa"), P.tiedostokortitOtsikko || "Dokumentit"));
      if (kind === "pohja") { const [w, otsikko] = templateWeek.get(id) || ["", id]; return where(label || otsikko, w ? lt("viikkoPolku", w) : ""); }
      if (kind === "kuvaohje") return where(label || kuvaTitles.get(id) || id, lt("kuvaohjePolku"));
      return label || tg;
    }
    const [view] = tg.split("#");
    const name = viewName(view);
    const text = label || name;
    return text.toLowerCase() === String(name).toLowerCase() ? where(text, "") : where(text, name);
  });
}
const ensurePaper = (out, name) => { if (/\[\[[^\]]*\]\]/.test(out)) throw new Error(`${name}: tulosteeseen jäi raaka [[ ]] -merkintä`); return out; };

function stripTags(s) {
  return s.replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ").trim();
}

/* Viikkokortit index.html:stä (kaksipalstainen layout: <article class="week-card">,
   data-week-label kantaa "Vko"-sarakkeen tekstin, <h1 class="view-title"> otsikon). */
const weeks = [];
const cardRe = /<article class="week-card" id="week-(\d+)" data-week="\d+">\s*<p class="view-eyebrow" data-week-label="([^"]+)"[^>]*>[^<]*<\/p>\s*<h1 class="view-title">([^<]+)<\/h1>[\s\S]*?<\/article>/g;
let m;
while ((m = cardRe.exec(html))) {
  const [block, num, dates, title] = m;
  const taskMatches = [...block.matchAll(/data-task="([\d-]+)"[^>]*>\s*<span class="task-box"[^>]*><\/span>\s*<span class="task-text">([\s\S]*?)<\/span><\/label>/g)];
  const tasks = taskMatches.map((t) => stripTags(t[2]).replace(/tällä sivulla/g, "sivustolla").replace(/on this page/g, "on the site"));
  const taskIds = taskMatches.map((t) => t[1]);
  const ev = block.match(/<p class="evidence">([\s\S]*?)<\/p>/);
  /* v2.7: "Näytä:"-tyyppinen etuliite on jo evidenceLabel-otsikossa. */
  const evHtml = ev ? (P.yhtenaisetViikot ? ev[1].trim().replace(/^<strong>[^<]{1,40}:<\/strong>\s*/, "") : ev[1]) : "";
  weeks.push({ num: +num, dates, title, tasks, taskIds, evidence: stripTags(evHtml) });
}

/* Lomaviikot holiday-cardeista (sama otsikkomuoto kuin week-cardeissa:
   view-eyebrow kantaa data-week-label-attribuutin, h1.view-title on nimi). */
const holidays = {};
const holRe = /<article class="holiday-card" id="week-(\d+)" data-week="\d+">\s*<p class="view-eyebrow" data-week-label="([^"]+)"[^>]*>[^<]*<\/p>\s*<h1 class="view-title">([^<]+)<\/h1>([\s\S]*?)<\/article>/g;
while ((m = holRe.exec(html))) {
  const paragraphs = [...m[4].matchAll(/<p>([\s\S]*?)<\/p>/g)];
  holidays[+m[1]] = { dates: stripTags(m[2]), title: stripTags(m[3]), text: paragraphs.length ? stripTags(paragraphs[paragraphs.length - 1][1]) : "" };
}

/* Näyttömatriisi (kaksipalstainen layout: otsikko + laskuri omissa <span>:eissä) */
const matrices = [];
const matRe = /<details class="matrix"[^>]*>\s*<summary><span class="matrix-title">([^<]+)<\/span><span class="matrix-count">[^<]*<\/span><\/summary>([\s\S]*?)<\/details>/g;
while ((m = matRe.exec(html))) {
  const items = [...m[2].matchAll(/data-evidence="([a-z0-9]+)"><span><strong>([^<]+)<\/strong>\s*([\s\S]*?)<\/span>/g)]
    .map((i) => ({ id: i[1], title: stripTags(i[2]), hint: stripTags(i[3]) }));
  matrices.push({ title: stripTags(m[1]), items });
}
const requirementCount = matrices.reduce((sum, mat) => sum + mat.items.length, 0);

/* Tarkistukset: hiljainen epäsynkka on pahempi kuin kaatuminen */
const expectedWeeks = (P.viikot || []).filter((w) => !(P.lomaViikot || []).includes(w));
if (weeks.length !== expectedWeeks.length) {
  throw new Error(`index.html: viikkokortteja ${weeks.length}, sisalto.js odottaa ${expectedWeeks.length}`);
}
weeks.forEach((w) => { if (!P.viikkoOhjeet[w.num]) throw new Error(`sisalto.js: viikolta ${w.num} puuttuu viikkoOhjeet`); });
/* Matriisi on valinnainen: pelkkä projektisivusto ei sisällä näyttömatriisia. */

/* ---------- ulkoasu ---------- */
const ACCENT = (P.paletti?.aksenttiTumma || "#1b5e20").replace("#", "");
const TINT = (P.paletti?.taulukkoSavy || "#e8f5e9").replace("#", "");
const TINT2 = (P.paletti?.riviSavy || "#f1f8e9").replace("#", "");
const GREY = "555555";
const PAGE = { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } };
const CW = 11906 - 2 * 1134; // sisältöleveys DXA

/* v2.4: isokirjainen työpaketti, kun projektilla on teema. `iso` on päällä vain
   työpaketin rakentamisen ajan; opettajan aineisto rakennetaan normaalina. */
const TEEMA = P.teema && typeof P.teema === "object" ? P.teema : null;
const TULOSTE = Object.assign({ tausta: "#ffffff", teksti: "#000000", otsikot: "#000000", koko: 18 }, (TEEMA && TEEMA.tuloste) || {});
const ISO = { font: String((TEEMA && TEEMA.fontti) || "Arial").split(",")[0].replace(/["']/g, "").trim() || "Arial", half: Math.round(Number(TULOSTE.koko) * 2) || 36, ink: String(TULOSTE.teksti).replace("#", "") };
let iso = false;
const sz = (half) => (iso ? Math.max(ISO.half, Math.round(half * ISO.half / 21)) : half);
const col = (c) => (iso && c ? (c === ACCENT ? String(TULOSTE.otsikot).replace("#", "") : ISO.ink) : c);

const p = (text, opts = {}) => new Paragraph({
  children: [new TextRun({ text: iso ? paperLinks(text).replace(/`/g, "") : paperLinks(text), size: sz(opts.size || 21), bold: opts.bold, italics: iso ? false : opts.italics, color: col(opts.color), font: iso ? ISO.font : undefined })],
  spacing: { after: opts.after ?? 120, before: opts.before ?? 0, line: iso ? 384 : undefined },
  alignment: opts.align,
  indent: opts.indent ? { left: opts.indent } : undefined,
});
const h1 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text, color: col(ACCENT), bold: true, size: iso ? Math.round(ISO.half * 1.5) : undefined, font: iso ? ISO.font : undefined })], spacing: { before: 320, after: 160 } });
const h2 = (text, color = ACCENT) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text, color: col(color), bold: true, size: iso ? Math.round(ISO.half * 1.25) : undefined, font: iso ? ISO.font : undefined })], spacing: { before: 260, after: 120 } });
const box = (text) => p("☐  " + text, { after: 80 });
/* v2.5: tehtäväkortin osat paperille (viikkoOhjeet[w].tehtavat[id]). Takahipsut pois. */
const plainTick = (s) => paperLinks(String(s || "")).replace(/`([^`\n]+)`/g, "$1");
const osaObj = (o) => o && typeof o === "object" && !Array.isArray(o);
const osaTeksti = (o) => (Array.isArray(o) ? `${o[0]}. ${o[1]}` : osaObj(o) ? `${o.otsikko}` : String(o));
/* v2.8: objektimuotoisen osatehtävän rivit paperille. */
const osaRivit = (o) => (osaObj(o) ? [["missa", "missaLabel"], ["tee", "teeLabel"], ["naet", "naetLabel"]].filter(([k]) => o[k]).map(([k, l]) => `${lt(l)} ${o[k]}`) : []);
function taskDef(g, id) { return g && g.tehtavat && g.tehtavat[id] ? g.tehtavat[id] : null; }
const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

function cell(text, { w, bold, fill, size = 19, color } = {}) {
  return new TableCell({
    width: { size: w, type: WidthType.DXA },
    shading: fill && !iso ? { type: ShadingType.CLEAR, fill } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({ children: [new TextRun({ text: iso ? paperLinks(text).replace(/`/g, "") : paperLinks(text), bold, size: sz(size), color: col(color), font: iso ? ISO.font : undefined })], spacing: { after: 0 } })],
  });
}
function table(colWidths, rows) {
  return new Table({ width: { size: colWidths.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: colWidths, rows });
}
function headerRow(cols) {
  return new TableRow({ tableHeader: true, children: cols.map(([text, w]) => cell(text, { w, bold: true, fill: TINT })) });
}
/* Sarakeleveydet suhdeluvuista, jäännös viimeiselle sarakkeelle. */
function widths(ratios) {
  const total = ratios.reduce((a, b) => a + b, 0);
  const cols = ratios.map((r) => Math.round((r / total) * CW));
  cols[cols.length - 1] = CW - cols.slice(0, -1).reduce((a, b) => a + b, 0);
  return cols;
}

/* Viikot vaiheittain, lomaviikot oikeilla paikoillaan */
function walkWeeks(onWeek, onHoliday) {
  (P.viikot || []).forEach((num) => {
    if (holidays[num]) { onHoliday(num, holidays[num]); return; }
    const wk = weeks.find((w) => w.num === num);
    if (wk) onWeek(wk, P.viikkoOhjeet[num] || {}, (P.vaiheet || []).find((f) => f.viikot.includes(num)));
  });
}

const jakso = O.jakso || `Viikot ${P.viikot[0]}–${P.viikot[P.viikot.length - 1]}`;
const deadline = O.deadline || "";
/* Työpaketti on opiskelijan aineisto → nämä voi antaa sivuston kielellä
   lataukset-lohkossa. Opettajan asiakirjat käyttävät aina O:n suomenkielisiä arvoja. */
const tpJakso = L.jakso || jakso;
const tpDeadline = L.deadline || deadline;
const tpKansiKuvaus = L.kansiKuvaus || O.kansiKuvaus;
const tpKansiHuomiot = L.kansiHuomiot || O.kansiHuomiot || [];
const tpViimeisetPaivat = L.viimeisetPaivat || O.viimeisetPaivat || [];

/* ---------- 1. Työpaketti ---------- */
iso = Boolean(TEEMA);
const tp = [];
tp.push(new Paragraph({ children: [new TextRun({ text: P.nimi, size: 72, bold: true, color: ACCENT })], spacing: { before: 2400, after: 200 }, alignment: AlignmentType.CENTER }));
tp.push(p(lt("tyopakettiOtsikko"), { size: 28, align: AlignmentType.CENTER, after: 60 }));
if (tpKansiKuvaus) tp.push(p(tpKansiKuvaus, { size: 24, align: AlignmentType.CENTER, after: 400, color: GREY }));
tp.push(p(`${tpJakso}${tpDeadline ? ` · ${lt("luovutus", tpDeadline)}` : ""}`, { size: 24, bold: true, align: AlignmentType.CENTER, after: 2000 }));
tp.push(p(lt("kansiJohdanto"), { size: 21, align: AlignmentType.CENTER, color: GREY }));
tpKansiHuomiot.forEach((note) => tp.push(p(note, { size: 21, align: AlignmentType.CENTER, color: GREY, before: 200 })));
tp.push(pageBreak());

/* v2.7: kokonaiskuva ennen aikataulua. Vaiheet samasta vaiheet-datasta kuin sivun vaihekuvaus. */
const unified = Boolean(P.yhtenaisetViikot);
function phaseWeeksLabel(phase) {
  const work = (P.viikot || []).filter((w) => (phase.viikot || []).includes(w) && !(P.lomaViikot || []).includes(w));
  const label = work.length ? lt("aloitusVaiheViikot", work[0], work[work.length - 1], Boolean(P.paivaton)) : "";
  /* Ei toisteta, jos vaiheen kuvaus kertoo viikot jo itse ("Viikot 40–41: …"). */
  return label && String(phase.kuvaus || "").toLowerCase().includes(label.toLowerCase()) ? "" : label;
}
if (unified) {
  tp.push(h1(lt("aloitusOtsikko")));
  const kuvaus = (P.lopputulos && P.lopputulos.kuvaus) || "";
  if (kuvaus) tp.push(p(plainTick(kuvaus)));
  ((P.lopputulos && P.lopputulos.kohdat) || []).forEach((c) => tp.push(p(`${c.n}. ${plainTick(c.teksti)}`, { indent: 360, after: 60 })));
  tp.push(h2(lt("aloitusVaiheetOtsikko", (P.vaiheet || []).length)));
  (P.vaiheet || []).forEach((phase, i) => {
    const wl = phaseWeeksLabel(phase);
    tp.push(p(`${i + 1}. ${phase.otsikko}${wl ? ` · ${wl}` : ""}`, { bold: true, before: 120, after: 40 }));
    if (phase.kuvaus) tp.push(p(plainTick(phase.kuvaus), { indent: 360, after: 80 }));
  });
  if (lt("aloitusHuomio")) tp.push(p(plainTick(lt("aloitusHuomio")), { before: 200, italics: true, color: GREY }));
  tp.push(pageBreak());
}

tp.push(h1(lt("aikatauluOtsikko")));
const schedW = widths([9, 18, 51, 18]);
const schedRows = [headerRow([[lt("sarakeViikko"), schedW[0]], [lt("sarakePvm"), schedW[1]], [lt("sarakeAihe"), schedW[2]], [lt("sarakeVaihe"), schedW[3]]])];
walkWeeks(
  (wk, g, phase) => schedRows.push(new TableRow({ children: [
    cell(String(wk.num), { w: schedW[0], bold: true }),
    cell(wk.dates, { w: schedW[1] }),
    cell(wk.title, { w: schedW[2] }),
    cell(phase ? `${phase.tunnus} · ${phase.lyhyt || phase.otsikko.split(":")[0]}` : "–", { w: schedW[3] }),
  ]})),
  (num, hol) => schedRows.push(new TableRow({ children: [
    cell(String(num), { w: schedW[0] }), cell(hol.dates, { w: schedW[1] }),
    cell(lt("eiProjektityota", hol.title), { w: schedW[2] }), cell("–", { w: schedW[3] }),
  ]}))
);
tp.push(table(schedW, schedRows));
if (tpDeadline) tp.push(p(lt("palautusHuomio", tpDeadline), { before: 160, italics: true, color: GREY }));
tp.push(pageBreak());

(P.vaiheet || []).forEach((phase) => {
  tp.push(h1(lt("vaiheOtsikko", phase.tunnus, phase.otsikko)));
  phase.viikot.forEach((num) => {
    if (holidays[num]) {
      const hol = holidays[num];
      tp.push(h2(lt("viikkoOtsikko", num, hol.dates, hol.title), "8A6D00"));
      tp.push(p(hol.text, { after: 200 }));
      return;
    }
    const wk = weeks.find((w) => w.num === num);
    if (!wk) return;
    const g = P.viikkoOhjeet[num] || {};
    tp.push(h2(lt("viikkoOtsikko", wk.num, wk.dates, wk.title)));
    if (unified && g.connection) tp.push(p(`${lt("yhteysLabel")} ${plainTick(g.connection)}`, { size: 19, after: 60 }));
    if (unified && g.feature) tp.push(p(`${lt("tavoiteLabel")} ${plainTick(g.feature)}`, { size: 19, bold: true, after: 80 }));
    else if (g.feature) tp.push(p(g.feature, { italics: true, color: GREY }));
    weekResources(g).forEach(([label, href]) => tp.push(new Paragraph({
      children: [new TextRun({ text: "Kuvaohje tai materiaali: ", size: 19 }),
        new ExternalHyperlink({ link: href, children: [new TextRun({ text: label, style: "Hyperlink", size: 19 })] })],
      spacing: { after: 80 }
    })));
    wk.tasks.forEach((t, i) => {
      const d = taskDef(g, wk.taskIds[i]);
      if (!d) { tp.push(box(t)); return; }
      tp.push(p(`${lt("tehtavaNumero", i + 1, wk.tasks.length)} · ${t}`, { bold: true, before: 120, after: 60 }));
      (d.osat || []).forEach((o, j) => {
        tp.push(p(`☐  ${j + 1}. ${plainTick(osaTeksti(o))}`, { size: 19, after: osaObj(o) ? 20 : 40, indent: 360, bold: osaObj(o) || undefined }));
        osaRivit(o).forEach((r) => tp.push(p(plainTick(r), { size: 19, after: 20, indent: 720 })));
        if (osaObj(o) && o.koodi) tp.push(p(o.koodi, { size: 19, after: 40, indent: 720 }));
      });
      if (d.valmis) tp.push(p(lt("valmisKun") + plainTick(d.valmis), { size: 19, color: ACCENT, after: 40, indent: 360 }));
      if (d.tallenna) tp.push(p(`${lt("tallennaLabel")} ${plainTick(d.tallenna)}`, { size: 19, color: GREY, after: 80, indent: 360 }));
    });
    if (g.done) tp.push(p((unified ? `${lt("lopputarkistusLabel")} ` : lt("valmisKun")) + plainTick(g.done), { size: 19, color: ACCENT, bold: unified, after: 60 }));
    if (wk.evidence) tp.push(p(`${lt("evidenceLabel")} ${wk.evidence}`, { size: 19, color: GREY, after: 240 }));
  });
});

if (tpViimeisetPaivat.length) {
  tp.push(pageBreak());
  tp.push(h1(lt("viimeisetPaivatOtsikko")));
  tpViimeisetPaivat.forEach(([d, t], i) => tp.push(p(`${d}  ·  ${t}`, { bold: i === tpViimeisetPaivat.length - 1, after: 80 })));
}

/* Sanasto samasta sisalto.js:n termisto-kentästä kuin sivustolla. */
const glossary = (Array.isArray(P.termisto) ? P.termisto : []).filter((g) => g && g.termi);
if (glossary.length) {
  tp.push(pageBreak());
  tp.push(h1(lt("sanastoOtsikko")));
  tp.push(p(lt("sanastoJohdanto"), { color: GREY }));
  const gw = widths([22, 78]);
  tp.push(table(gw, glossary.map((g) => new TableRow({ children: [
    cell(`${g.termi}${g.viikko != null ? `\n${lt("sanastoViikko", g.viikko)}` : ""}`, { w: gw[0], bold: true, fill: TINT2 }),
    cell(`${g.nimi ? `${g.nimi}. ` : ""}${g.selite || ""}`, { w: gw[1] }),
  ]}))));
}

if (matrices.length) {
  tp.push(pageBreak());
  tp.push(h1(lt("matriisiOtsikko", requirementCount)));
  tp.push(p(lt("matriisiJohdanto"), { color: GREY }));
  matrices.forEach((mat) => {
    tp.push(h2(mat.title));
    mat.items.forEach((i) => tp.push(p(`☐  ${i.title} – ${i.hint}`, { size: 19, after: 60 })));
  });
}
tp.push(p(lt("selainHuomio"), { before: 240, italics: true, color: GREY }));
iso = false;

/* ---------- 2. Ideapankki (valinnainen) ---------- */
const bank = O.ideapankki;
const ti = [];
if (bank) {
  ti.push(new Paragraph({ children: [new TextRun({ text: bank.otsikko, size: 56, bold: true, color: ACCENT })], spacing: { before: 200, after: 120 } }));
  ti.push(p(bank.johdanto, { size: 22, after: 300, color: GREY }));
  const bw = widths([23, 77]);
  bank.ideat.forEach(([name, desc, ...cols]) => {
    ti.push(h2(name));
    ti.push(p(desc, { italics: true, after: 100 }));
    ti.push(table(bw, bank.sarakkeet.map((label, idx) => new TableRow({ children: [
      cell(label, { w: bw[0], bold: true, fill: TINT2 }), cell(cols[idx] || "", { w: bw[1] }),
    ]}))));
    ti.push(p("", { after: 160 }));
  });
  if (bank.loppu) ti.push(p(bank.loppu, { bold: true, before: 120 }));
}

/* ---------- 3. Dokumentointipohjat ---------- */
const T = O.pohjat || {};
const testCount = T.testeja || 12;
const dp = [];
dp.push(new Paragraph({ children: [new TextRun({ text: "Projektin dokumentointipohjat", size: 48, bold: true, color: ACCENT })], spacing: { before: 200, after: 120 } }));
dp.push(p(lt("dokumentointipohjatJohdanto", P.nimi), { size: 22, after: 300, color: GREY }));

function blanks(labels) {
  labels.forEach((k) => {
    dp.push(p(k + ":", { bold: true, after: 40 }));
    dp.push(p("________________________________________________________________", { after: 160, color: "888888" }));
  });
}

dp.push(h1(`1 · Aloituskeskustelun muistiinpanot (vko ${T.aloitusVko ?? P.viikot[0]})`));
dp.push(p("Päivä ja osallistujien roolit: ______________________________", { after: 160 }));
const qw = widths([6, 45, 49]);
const qRows = [headerRow([["#", qw[0]], ["Kysymys", qw[1]], ["Vastaus / avoin / oletus", qw[2]]])];
for (let i = 1; i <= (T.kysymyksia || 8); i++) qRows.push(new TableRow({ children: [cell(String(i), { w: qw[0] }), cell("", { w: qw[1] }), cell("", { w: qw[2] })] }));
dp.push(table(qw, qRows));
dp.push(pageBreak());

dp.push(h1(`2 · Vaihtoehtojen vertailumuistio (vko ${T.vertailuVko ?? ""})`));
blanks(["Vaihtoehto A", "Vaihtoehto B", "Työmäärä (pv): A / B", "Vaikutus lopputulokseen: A / B", "Riski: A / B", "Valinta ja perustelu (2–3 virkettä)", "Keskustelukumppanin rooli (ei nimeä) ja pvm"]);
dp.push(pageBreak());

const katsVkot = String(T.katselmointiVkot ?? "");
dp.push(h1(`3 · Katselmointiloki (${/[,–-]|\sja\s/.test(katsVkot) ? "vkot" : "vko"} ${katsVkot})`));
const kw = widths([35, 65]);
dp.push(table(kw, [
  "Päivä ja versio (commit)", "Osallistujien roolit (ei nimiä)", "Testaajan havainto hänen sanoillaan (merkitse rooli, ei nimeä)",
  "Oma tulkinta", "Päätös ja hyväksyjä", "Sovittu muutos (issue + arvio + valmis kun -ehto)",
].map((k) => new TableRow({ children: [cell(k, { w: kw[0], bold: true, fill: TINT2 }), cell("", { w: kw[1] })] }))));
dp.push(p("Erota aina testaajan sanat omasta tulkinnastasi. Julkiseen repositoryyn kirjataan henkilöistä vain rooli; nimet ohjaajalle Teamsissa tarvittaessa.", { before: 120, italics: true, color: GREY }));
dp.push(pageBreak());

dp.push(h1(`4 · Testimatriisi (vko ${T.testiVko ?? ""})`));
const tw = widths([7, 22, 25, 22, 17, 7]);
const tRows = [headerRow([["T#", tw[0]], ["Lähtötila", tw[1]], ["Toiminta", tw[2]], ["Odotus", tw[3]], ["Havainto", tw[4]], ["Tulos", tw[5]]])];
for (let i = 1; i <= testCount; i++) {
  tRows.push(new TableRow({ children: [
    cell("T" + String(i).padStart(2, "0"), { w: tw[0] }),
    cell("", { w: tw[1] }), cell("", { w: tw[2] }), cell("", { w: tw[3] }), cell("", { w: tw[4] }), cell("", { w: tw[5] }),
  ]}));
}
dp.push(table(tw, tRows));
/* v2.7: luokka kirjataan tapauskohtaisesti; kolmannesjako ei vastannut projektien omaa numerointia. */
dp.push(p(T.testiLuokat || "Merkitse jokaiselle testitapaukselle luokka: normaali käyttö, raja tai virhetilanne. Kirjoita odotus ennen testiajoa.", { before: 120, italics: true, color: GREY }));
dp.push(pageBreak());

dp.push(h1(`5 · Virheenkorjausketju (vko ${T.testiVko ?? ""}, ${T.ketjuja || 3} kpl)`));
blanks(["Havainto tai merkitty vikatehtävä", "Toistamisohje", "Syy", "Korjaus (commit)", "Uusintatestin tulos", "Regressiotesti (mitä muuta testattiin)"]);
dp.push(pageBreak());

dp.push(h1(`6 · Lisenssi- ja CREDITS-kirjaus (vko ${T.lisenssiVko ?? ""})`));
dp.push(p("Työn oma lisenssi: ____________________  ·  sovittu ohjaajan kanssa (pvm): ____________", { after: 160 }));
const cw = widths([31, 35, 34]);
const cRows = [headerRow([["Tiedosto tai aineisto", cw[0]], ["Lähde: itse tehty vai mistä?", cw[1]], ["Lisenssi ja salliiko uudelleenjulkaisun", cw[2]]])];
for (let i = 0; i < 8; i++) cRows.push(new TableRow({ children: [cell("", { w: cw[0] }), cell("", { w: cw[1] }), cell("", { w: cw[2] })] }));
dp.push(table(cw, cRows));
dp.push(p("Siirrä tämän taulukon sisältö CREDITS-tiedostoon repositoryyn. Jos kaikki on itse tehtyä, kirjaa se yhdellä rivillä.", { before: 120, italics: true, color: GREY }));
dp.push(pageBreak());

dp.push(h1("7 · AI-lokin paperiversio"));
dp.push(p("Sivuston AI-loki on ensisijainen. Käytä tätä, jos kirjaat merkinnän ilman selainta: siirrä se sivustolle saman päivän aikana.", { color: GREY }));
const aw = widths([20, 25, 28, 27]);
const aRows = [headerRow([["Päivä ja työkalu", aw[0]], ["Mihin pyysit apua?", aw[1]], ["Mitä käytit, muutit tai hylkäsit?", aw[2]], ["Miten tarkistit ja mitä opit?", aw[3]]])];
for (let i = 0; i < 6; i++) aRows.push(new TableRow({ children: aw.map((w) => cell("", { w })) }));
dp.push(table(aw, aRows));
dp.push(p("Vahvista jokaisesta merkinnästä: en syöttänyt henkilötietoja, salaisuuksia tai luottamuksellista aineistoa. Lisää aineistoviite (issue, commit tai testi).", { before: 120, italics: true, color: GREY }));

/* ---------- 4. Näyttösuunnitelma (opettajan lähdeaineisto) ---------- */
const ns = [];
if (NS.kohde) {
  ns.push(new Paragraph({ children: [new TextRun({ text: NS.otsikko || "Näyttösuunnitelma", size: 52, bold: true, color: ACCENT })], spacing: { before: 200, after: 100 } }));
  ns.push(p(`${P.nimi} · ${O.kansiKuvaus || ""} · ${jakso}${deadline ? `, luovutus ${deadline}` : ""}`, { size: 23, after: 60 }));
  ns.push(p(NS.johdanto || "Opettajan lähdeaineisto. Vaatimukset on luettu sivuston näyttömatriisista, joten tämä asiakirja pysyy sivuston kanssa yhdenmukaisena.", { size: 20, color: GREY, after: 300 }));

  ns.push(h1(NS.kohdeOtsikko || "1 · Näytön kohde ja ympäristö"));
  NS.kohde.forEach((par) => ns.push(p(par)));
  if (NS.p0) ns.push(p(NS.p0, { bold: true }));

  if ((NS.roolit || []).length) {
    ns.push(h1("2 · Roolit"));
    const rw = widths([27, 73]);
    ns.push(table(rw, NS.roolit.map(([role, desc]) => new TableRow({ children: [
      cell(role, { w: rw[0], bold: true, fill: TINT2 }), cell(desc, { w: rw[1] }),
    ]}))));
  }

  if ((NS.tarkistuspisteet || []).length) {
    ns.push(h1("3 · Laadun tarkistuspisteet"));
    ns.push(p("Opettaja tarkistaa laadun ja antaa palautteen näissä kohdissa. Muut viikot opiskelija työskentelee itsenäisesti sivuston ohjeilla."));
    const pw = widths([15, 33, 52]);
    ns.push(table(pw, [
      headerRow([["Viikko", pw[0]], ["Tarkistuspiste", pw[1]], ["Mitä tarkistetaan", pw[2]]]),
      ...NS.tarkistuspisteet.map(([wk, name, what]) => new TableRow({ children: [
        cell(String(wk), { w: pw[0] }), cell(name, { w: pw[1] }), cell(what, { w: pw[2] }),
      ]})),
    ]));
    ns.push(pageBreak());
  }

  /* Arvioinnin kohteet vain jos sivustolla on näyttömatriisi. */
  if (matrices.length) {
    ns.push(h1("4 · Arvioinnin kohteet ja työnäytteet"));
    ns.push(p("Sama työnäyte voi kelvata useaan kohtaan. Viikkosarake kertoo, missä työnäyte syntyy."));
    const MAP = NS.tyonaytteet || {};
    const missing = [];
    const mw = widths([28, 10, 62]);
    matrices.forEach((mat) => {
      ns.push(h2(mat.title));
      const rows = [headerRow([["Arvioinnin kohde", mw[0]], ["Vko", mw[1]], ["Työnäyte", mw[2]]])];
      mat.items.forEach((it) => {
        if (!MAP[it.id]) missing.push(it.id);
        const [wks, proof] = MAP[it.id] || ["–", it.hint];
        rows.push(new TableRow({ children: [
          cell(it.title, { w: mw[0], bold: true }), cell(wks, { w: mw[1] }), cell(proof, { w: mw[2] }),
        ]}));
      });
      ns.push(table(mw, rows));
      ns.push(p("", { after: 120 }));
    });
    if (missing.length) console.warn("VAROITUS: suunnitelmasta puuttuu työnäytemäppäys:", missing.join(", "));
    ns.push(pageBreak());
  }

  if (NS.dokumentaatio) {
    ns.push(h1("5 · Dokumentaatio ja sen kohdeyleisö"));
    ns.push(p("Dokumentaatio tehdään käyttäjille, ei arviointia varten. Arviointiaineisto on erillinen.", { bold: true }));
    const dw = widths([30, 70]);
    ns.push(table(dw, [
      headerRow([["Käyttäjälle", dw[0]], ["Arviointiin", dw[1]]]),
      new TableRow({ children: [cell(NS.dokumentaatio.kayttajalle, { w: dw[0] }), cell(NS.dokumentaatio.arviointiin, { w: dw[1] })] }),
    ]));
    if (NS.dokumentaatio.vaatimus) ns.push(p(NS.dokumentaatio.vaatimus, { before: 120 }));
  }

  if ((NS.tekoaly || []).length) {
    ns.push(h1("6 · Tekoälyn käyttö"));
    NS.tekoaly.forEach((par) => ns.push(p(par)));
  }

  if ((NS.palautuspaketti || []).length) {
    ns.push(h1("7 · Palautuspaketti"));
    NS.palautuspaketti.forEach(([k, v]) => { ns.push(p(k, { bold: true, after: 20 })); ns.push(p(v, { size: 20, color: GREY, after: 120 })); });
    if (deadline) ns.push(p(`Luovutus viimeistään ${deadline}.`, { bold: true, before: 100 }));
  }

  if ((NS.huomiot || []).length) {
    ns.push(h1("8 · Huomioita opettajalle"));
    NS.huomiot.forEach(([k, v]) => { ns.push(p(k, { bold: true, after: 20 })); ns.push(p(v, { size: 20, color: GREY, after: 140 })); });
  }
}

/* ---------- Tallennus ---------- */
async function saveDoc(name, children, large = false) {
  const doc = new Document({
    styles: { default: { document: { run: large ? { font: ISO.font, size: ISO.half } : { font: "Calibri", size: 21 } } } },
    sections: [{ properties: { page: PAGE }, children }],
  });
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(OUT, name), buf);
  console.log(name, buf.length, "B");
}

(async () => {
  await saveDoc(`${P.slug}-tyopaketti.docx`, tp, Boolean(TEEMA));
  if (ti.length) await saveDoc(`${bank.tiedosto || "ideapankki"}.docx`, ti);
  await saveDoc(L.dokumentointipohjatTiedosto || "nayton-dokumentointipohjat.docx", dp);
  if (ns.length) await saveDoc(NS.tiedosto || "nayttosuunnitelma.docx", ns);
})();

/* ---------- Print-HTML samasta datasta (Chrome headless → PDF) ----------
   Tyylit: "oletus" (kuten ennen), "teema" (näytölle opiskelijan teemassa) ja
   "tuloste" (vaalea tausta, isokirjainen). Kaksi jälkimmäistä vain, kun
   sisalto.js:ssä on teema. Sisältö on kaikissa sama. */
function escBase(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

function printCss(style) {
  if (style === "oletus") {
    return `@page { size: A4; margin: 16mm; }
body { font-family: -apple-system, 'Segoe UI', sans-serif; font-size: 10pt; line-height: 1.45; color: #1a1a1a; margin: 0; }
h1 { color: #${ACCENT}; font-size: 17pt; margin: 0 0 8pt; page-break-after: avoid; }
h2 { color: #${ACCENT}; font-size: 12pt; margin: 14pt 0 5pt; page-break-after: avoid; }
.cover { text-align: center; padding-top: 70mm; page-break-after: always; }
.cover h1 { font-size: 34pt; }
.cover p { color: #555; }
table { border-collapse: collapse; width: 100%; margin: 6pt 0; page-break-inside: avoid; }
td, th { border: 0.5pt solid #bbb; padding: 3pt 5pt; text-align: left; vertical-align: top; font-size: 9pt; }
th { background: #${TINT}; }
.wk { page-break-inside: avoid; margin-bottom: 8pt; }
.feature { color: #555; font-style: italic; margin: 0 0 4pt; }
.task { margin: 2pt 0; }
.tcard { margin: 7pt 0 2pt; }
.osat { list-style: none; margin: 0 0 2pt 12pt; padding: 0; font-size: 9pt; }
.osat li { margin: 1pt 0; }
.osa-done { margin-left: 12pt; }
.done { color: #${ACCENT}; font-size: 9pt; margin: 3pt 0 0; }
.ev { color: #555; font-size: 9pt; margin: 2pt 0 0; }
.page { page-break-before: always; }
.muted { color: #555; }
.item { font-size: 9pt; margin: 2pt 0; }
.conn { font-size: 9pt; margin: 0 0 3pt; }
code { font-family: Menlo, Consolas, monospace; font-size: 8.5pt; }
.wk.u { page-break-inside: auto; }
.wkdone { margin-top: 8pt; padding-top: 4pt; border-top: 0.5pt solid #bbb; }
.tblock { page-break-inside: avoid; }
.goal { font-size: 9.5pt; margin: 0 0 4pt; }
img.figure { display: block; max-width: 100%; max-height: 96mm; margin: 4pt auto 6pt; }`;
  }
  /* Teema ja tuloste: sama perusfonttikoko, ei kursiivia, ei pienempää tekstiä. */
  const T = TEEMA || {};
  const c = style === "teema"
    ? { bg: T.tausta || "#000000", ink: T.teksti || "#ffffff", head: T.otsikot || T.teksti || "#ffffff" }
    : { bg: TULOSTE.tausta, ink: TULOSTE.teksti, head: TULOSTE.otsikot };
  const koko = `${Number(TULOSTE.koko) || 18}pt`;
  const font = T.fontti || "Arial, sans-serif";
  return `@page { size: A4; margin: ${style === "teema" ? "0" : "14mm"}; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: ${c.bg}; }
body { font-family: ${font}; font-size: ${koko}; line-height: ${T.rivikorkeus || 1.6}; letter-spacing: ${T.kirjainvali || "1px"}; word-spacing: ${T.sanavali || "0.3rem"};
  color: ${c.ink}; background: ${c.bg}; margin: 0; ${style === "teema" ? "padding: 14mm; -webkit-box-decoration-break: clone; box-decoration-break: clone;" : ""} }
* { font-style: normal !important; }
h1 { color: ${c.head}; font-size: 1.5em; line-height: 1.2; margin: 0 0 .5em; page-break-after: avoid; }
h2 { color: ${c.head}; font-size: 1.2em; line-height: 1.25; margin: 1em 0 .35em; page-break-after: avoid; }
p { margin: 0 0 .4em; max-width: 60ch; }
.cover { padding-top: 40mm; page-break-after: always; }
.cover h1 { font-size: 2.2em; }
table { border-collapse: collapse; width: 100%; margin: .4em 0; }
tr { page-break-inside: avoid; }
td, th { border: 2px solid ${c.ink}; padding: .25em .4em; text-align: left; vertical-align: top; font-size: 1em; }
th { font-weight: 700; }
.wk { margin-bottom: .8em; padding-bottom: .4em; border-bottom: 2px solid ${c.ink}; }
.feature { margin: 0 0 .3em; }
.task { margin: .2em 0; }
.tcard { margin: .7em 0 .2em; }
.osat { list-style: none; margin: 0 0 .3em 1em; padding: 0; }
.osat li { margin: .15em 0; max-width: 60ch; }
.osa-done { margin-left: 1em; }
.done, .ev { margin: .3em 0 0; }
.page { page-break-before: always; }
.muted, .item { }
strong { font-weight: 700; }
.conn, .goal { margin: 0 0 .4em; }
img.figure { display: block; max-width: 100%; margin: .5em 0 1em; }
code { font-family: Consolas, "Courier New", monospace; font-size: 1em; }`;
}

function printHtml(style) {
  const H = [];
  /* Teema- ja tulosteversiossa takahipsut `näin` muuttuvat koodiksi kuten sivustolla.
     Oletusversio pysyy ennallaan, jotta muiden projektien työpaketit eivät muutu. */
  const esc = style === "oletus" && !unified ? (s) => escBase(paperLinks(s)) : (s) => escBase(paperLinks(s)).replace(/`([^`\n]+)`/g, "<code>$1</code>");
  H.push(`<!doctype html><html lang="${esc(lt("lang"))}"><head><meta charset="utf-8"><title>${esc(P.nimi)} – ${esc(lt("tyopakettiTiedostoOtsikko"))}</title><style>
${printCss(style)}
</style></head><body>`);
  H.push(`<div class="cover"><h1>${esc(P.nimi)}</h1><p style="font-size:${style === "oletus" ? "14pt" : "1.2em"}">${esc(lt("tyopakettiOtsikko"))}</p><p>${esc(tpKansiKuvaus || "")}</p><p${style === "oletus" ? ' style="font-size:12pt"' : ""}><strong>${esc(tpJakso)}${tpDeadline ? ` · ${esc(lt("luovutus", tpDeadline))}` : ""}</strong></p><p style="${style === "oletus" ? "max-width:120mm;margin:18pt auto 0" : "margin-top:1em"}">${esc(lt("kansiJohdanto"))}</p>${tpKansiHuomiot.map((n) => `<p style="${style === "oletus" ? "max-width:120mm;margin:10pt auto 0" : "margin-top:.6em"}">${esc(n)}</p>`).join("")}</div>`);
  if (unified) {
    H.push(`<h1>${esc(lt("aloitusOtsikko"))}</h1>`);
    if (P.lopputulos && P.lopputulos.kuvaus) H.push(`<p>${esc(P.lopputulos.kuvaus)}</p>`);
    const goalImg = P.lopputulos && P.lopputulos.kuva;
    if (goalImg && style === "teema") H.push(`<img class="figure" src="../${esc(goalImg)}" alt="${esc(P.lopputulos.alt || "")}">`);
    if (P.lopputulos && (P.lopputulos.kohdat || []).length) H.push(`<ol class="osat">${P.lopputulos.kohdat.map((c) => `<li>${esc(c.n)}. ${esc(c.teksti)}</li>`).join("")}</ol>`);
    H.push(`<h2>${esc(lt("aloitusVaiheetOtsikko", (P.vaiheet || []).length))}</h2>`);
    if (P.vaihekuva && P.vaihekuva.kuva) H.push(`<img class="figure" src="../${esc(P.vaihekuva.kuva)}" alt="${esc(P.vaihekuva.alt || "")}">`);
    (P.vaiheet || []).forEach((phase, i) => {
      const wl = phaseWeeksLabel(phase);
      H.push(`<p class="task"><strong>${i + 1}. ${esc(phase.otsikko)}${wl ? ` · ${esc(wl)}` : ""}.</strong> ${esc(phase.kuvaus || "")}</p>`);
    });
    if (lt("aloitusHuomio")) H.push(`<p class="muted">${esc(lt("aloitusHuomio"))}</p>`);
    H.push(`<div class="page"></div>`);
  }
  H.push(`<h1>${esc(lt("aikatauluLyhyt"))}</h1><table><tr><th>${esc(lt("sarakeViikko"))}</th><th>${esc(lt("sarakePvm"))}</th><th>${esc(lt("sarakeAihe"))}</th><th>${esc(lt("sarakeVaihe"))}</th></tr>`);
  walkWeeks(
    (wk, g, phase) => H.push(`<tr><td><strong>${wk.num}</strong></td><td>${esc(wk.dates)}</td><td>${esc(wk.title)}</td><td>${phase ? esc(phase.tunnus) : "–"}</td></tr>`),
    (num, hol) => H.push(`<tr><td>${num}</td><td>${esc(hol.dates)}</td><td>${esc(lt("eiProjektityota", hol.title))}</td><td>–</td></tr>`)
  );
  H.push(`</table>${tpDeadline ? `<p class="muted">${esc(lt("palautusHuomio", tpDeadline))}</p>` : ""}`);
  (P.vaiheet || []).forEach((phase) => {
    H.push(`<h1 class="page">${esc(lt("vaiheOtsikko", phase.tunnus, phase.otsikko))}</h1>`);
    phase.viikot.forEach((num) => {
      if (holidays[num]) {
        const hol = holidays[num];
        H.push(`<div class="wk"><h2>${esc(lt("viikkoOtsikko", num, hol.dates, hol.title))}</h2><p>${esc(hol.text)}</p></div>`);
        return;
      }
      const wk = weeks.find((w) => w.num === num);
      if (!wk) return;
      const g = P.viikkoOhjeet[num] || {};
      H.push(`<div class="wk${unified ? " u" : ""}"><h2>${esc(lt("viikkoOtsikko", wk.num, wk.dates, wk.title))}</h2>`);
      if (unified && g.connection) H.push(`<p class="conn"><strong>${esc(lt("yhteysLabel"))}</strong> ${esc(g.connection)}</p>`);
      if (unified && g.feature) H.push(`<p class="goal"><strong>${esc(lt("tavoiteLabel"))}</strong> ${esc(g.feature)}</p>`);
      else if (g.feature) H.push(`<p class="feature">${esc(g.feature)}</p>`);
      weekResources(g).forEach(([label, href]) => H.push(`<p class="ev"><a href="${esc(href)}">${esc(label)}</a></p>`));
      wk.tasks.forEach((t, i) => {
        const d = taskDef(g, wk.taskIds[i]);
        if (!d) { H.push(`<p class="task">☐&nbsp; ${esc(t)}</p>`); return; }
        H.push(`<div class="tblock"><p class="task tcard"><strong>${esc(lt("tehtavaNumero", i + 1, wk.tasks.length))} · ${esc(t)}</strong></p>`);
        H.push(`<ol class="osat">${(d.osat || []).map((o) => (osaObj(o)
          ? `<li>☐&nbsp; <strong>${esc(osaTeksti(o))}</strong>${osaRivit(o).map((r) => `<br>${esc(r)}`).join("")}${o.koodi ? `<br><code>${escBase(o.koodi).replace(/\n/g, "<br>")}</code>` : ""}</li>`
          : `<li>☐&nbsp; ${esc(osaTeksti(o))}</li>`)).join("")}</ol>`);
        if (d.valmis) H.push(`<p class="done osa-done"><strong>${esc(lt("valmisKunLabel"))}</strong> ${esc(d.valmis)}</p>`);
        if (d.tallenna) H.push(`<p class="ev osa-done"><strong>${esc(lt("tallennaLabel"))}</strong> ${esc(d.tallenna)}</p>`);
        H.push(`</div>`);
      });
      if (g.done) H.push(`<p class="done${unified ? " wkdone" : ""}"><strong>${esc(unified ? lt("lopputarkistusLabel") : lt("valmisKunLabel"))}</strong> ${esc(g.done)}</p>`);
      if (wk.evidence) H.push(`<p class="ev"><strong>${esc(lt("evidenceLabel"))}</strong> ${esc(wk.evidence)}</p>`);
      H.push(`</div>`);
    });
  });
  if (tpViimeisetPaivat.length) {
    H.push(`<h1 class="page">${esc(lt("viimeisetPaivatOtsikko"))}</h1>`);
    tpViimeisetPaivat.forEach(([d, t]) => H.push(`<p class="task"><strong>${esc(d)}</strong> · ${esc(t)}</p>`));
  }
  if (glossary.length) {
    H.push(`<h1 class="page">${esc(lt("sanastoOtsikko"))}</h1><p class="muted">${esc(lt("sanastoJohdanto"))}</p><table>`);
    glossary.forEach((g) => H.push(`<tr><td style="width:24%"><strong>${esc(g.termi)}</strong>${g.viikko != null ? `<br><span class="muted">${esc(lt("sanastoViikko", g.viikko))}</span>` : ""}</td><td>${g.nimi ? `${style === "oletus" ? "<em>" : "<strong>"}${esc(g.nimi)}.${style === "oletus" ? "</em>" : "</strong>"} ` : ""}${esc(g.selite || "")}</td></tr>`));
    H.push(`</table>`);
  }
  if (matrices.length) {
    H.push(`<h1 class="page">${esc(lt("matriisiOtsikko", requirementCount))}</h1><p class="muted">${esc(lt("matriisiJohdanto"))}</p>`);
    matrices.forEach((mat) => {
      H.push(`<h2>${esc(mat.title)}</h2>`);
      mat.items.forEach((i) => H.push(`<p class="item">☐&nbsp; <strong>${esc(i.title)}</strong> – ${esc(i.hint)}</p>`));
    });
  }
  H.push(`<p class="muted" style="margin-top:1em">${style === "oletus" ? `<em>${esc(lt("selainHuomio"))}</em>` : esc(lt("selainHuomio"))}</p>`);
  H.push(`</body></html>`);
  return H.join("\n");
}

fs.writeFileSync(path.join(__dirname, "tyopaketti-print.html"), ensurePaper(printHtml(TEEMA ? "teema" : "oletus"), "tyopaketti-print.html"));
console.log(`tyopaketti-print.html kirjoitettu${TEEMA ? " (teema, näytölle)" : ""}`);
if (TEEMA) {
  fs.writeFileSync(path.join(__dirname, "tyopaketti-tuloste.html"), ensurePaper(printHtml("tuloste"), "tyopaketti-tuloste.html"));
  console.log("tyopaketti-tuloste.html kirjoitettu (vaalea, isokirjainen)");
  console.log(`PDF:t: <chrome> --headless --no-pdf-header-footer --print-to-pdf=downloads/${P.slug}-tyopaketti.pdf tyokalut/tyopaketti-print.html`);
  console.log(`       <chrome> --headless --no-pdf-header-footer --print-to-pdf=downloads/${P.slug}-tyopaketti-tuloste.pdf tyokalut/tyopaketti-tuloste.html`);
}

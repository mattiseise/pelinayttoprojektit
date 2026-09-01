/*
 * Ajo: npm install docx && node tyokalut/tee_lataukset.js
 * PDF: Chrome headless --print-to-pdf tyokalut/tyopaketti-print.html-tiedostosta.
 *
 * Geneerinen generaattori. Kaikki teksti tulee sisalto.js:stä ja index.html:stä,
 * jotta paperiversio pysyy sivuston kanssa synkassa. Tähän tiedostoon ei
 * kirjoiteta projektikohtaista sisältöä.
 */
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
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
  selainHuomio: "Muista: sivuston rastit ja kentät tallentuvat vain selaimeen. Ne eivät siirry opettajalle eivätkä korvaa Gitissä olevaa työtä."
};
const L = Object.assign({}, L_OLETUS, P.lataukset || {});
const lt = (key, ...args) => {
  const value = L[key];
  return typeof value === "function" ? value(...args) : value;
};

const html = fs.readFileSync(path.join(SITE, "index.html"), "utf8");

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
  const tasks = [...block.matchAll(/data-task="[\d-]+"[^>]*>\s*<span class="task-box"[^>]*><\/span>\s*<span class="task-text">([\s\S]*?)<\/span><\/label>/g)]
    .map((t) => stripTags(t[1]).replace(/tällä sivulla/g, "sivustolla").replace(/on this page/g, "on the site"));
  const ev = block.match(/<p class="evidence">([\s\S]*?)<\/p>/);
  weeks.push({ num: +num, dates, title, tasks, evidence: ev ? stripTags(ev[1]) : "" });
}

/* Lomaviikot holiday-cardeista (sama otsikkomuoto kuin week-cardeissa:
   view-eyebrow kantaa data-week-label-attribuutin, h1.view-title on nimi). */
const holidays = {};
const holRe = /<article class="holiday-card" id="week-(\d+)" data-week="\d+">\s*<p class="view-eyebrow" data-week-label="([^"]+)"[^>]*>[^<]*<\/p>\s*<h1 class="view-title">([^<]+)<\/h1>\s*<p>([\s\S]*?)<\/p>/g;
while ((m = holRe.exec(html))) {
  holidays[+m[1]] = { dates: stripTags(m[2]), title: stripTags(m[3]), text: stripTags(m[4]) };
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

const p = (text, opts = {}) => new Paragraph({
  children: [new TextRun({ text, size: opts.size || 21, bold: opts.bold, italics: opts.italics, color: opts.color })],
  spacing: { after: opts.after ?? 120, before: opts.before ?? 0 },
  alignment: opts.align,
});
const h1 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text, color: ACCENT, bold: true })], spacing: { before: 320, after: 160 } });
const h2 = (text, color = ACCENT) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text, color, bold: true })], spacing: { before: 260, after: 120 } });
const box = (text) => p("☐  " + text, { after: 80 });
const pageBreak = () => new Paragraph({ children: [new PageBreak()] });

function cell(text, { w, bold, fill, size = 19, color } = {}) {
  return new TableCell({
    width: { size: w, type: WidthType.DXA },
    shading: fill ? { type: ShadingType.CLEAR, fill } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({ children: [new TextRun({ text, bold, size, color })], spacing: { after: 0 } })],
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
const tp = [];
tp.push(new Paragraph({ children: [new TextRun({ text: P.nimi, size: 72, bold: true, color: ACCENT })], spacing: { before: 2400, after: 200 }, alignment: AlignmentType.CENTER }));
tp.push(p(lt("tyopakettiOtsikko"), { size: 28, align: AlignmentType.CENTER, after: 60 }));
if (tpKansiKuvaus) tp.push(p(tpKansiKuvaus, { size: 24, align: AlignmentType.CENTER, after: 400, color: GREY }));
tp.push(p(`${tpJakso}${tpDeadline ? ` · ${lt("luovutus", tpDeadline)}` : ""}`, { size: 24, bold: true, align: AlignmentType.CENTER, after: 2000 }));
tp.push(p(lt("kansiJohdanto"), { size: 21, align: AlignmentType.CENTER, color: GREY }));
tpKansiHuomiot.forEach((note) => tp.push(p(note, { size: 21, align: AlignmentType.CENTER, color: GREY, before: 200 })));
tp.push(pageBreak());

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
    if (g.feature) tp.push(p(g.feature, { italics: true, color: GREY }));
    wk.tasks.forEach((t) => tp.push(box(t)));
    if (g.done) tp.push(p(lt("valmisKun") + g.done, { size: 19, color: ACCENT, after: 60 }));
    if (wk.evidence) tp.push(p(`${lt("evidenceLabel")} ${wk.evidence}`, { size: 19, color: GREY, after: 240 }));
  });
});

if (tpViimeisetPaivat.length) {
  tp.push(pageBreak());
  tp.push(h1(lt("viimeisetPaivatOtsikko")));
  tpViimeisetPaivat.forEach(([d, t], i) => tp.push(p(`${d}  ·  ${t}`, { bold: i === tpViimeisetPaivat.length - 1, after: 80 })));
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
dp.push(p(`${P.nimi} · kopioi tarvitsemasi pohja project-docs-kansioon tai täytä paperilla ja skannaa. Jokainen pohja vastaa sivuston viikkotehtävää.`, { size: 22, after: 300, color: GREY }));

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
blanks(["Vaihtoehto A", "Vaihtoehto B", "Työmäärä (pv): A / B", "Vaikutus lopputulokseen: A / B", "Riski: A / B", "Valinta ja perustelu (2–3 virkettä)", "Keskustelukumppani, rooli ja pvm"]);
dp.push(pageBreak());

dp.push(h1(`3 · Katselmointiloki (vkot ${T.katselmointiVkot ?? ""})`));
const kw = widths([35, 65]);
dp.push(table(kw, [
  "Päivä ja versio (commit)", "Osallistujat ja roolit", "Testaajan alkuperäinen havainto (hänen sanoillaan)",
  "Oma tulkinta", "Päätös ja hyväksyjä", "Sovittu muutos (issue + arvio + valmis kun -ehto)",
].map((k) => new TableRow({ children: [cell(k, { w: kw[0], bold: true, fill: TINT2 }), cell("", { w: kw[1] })] }))));
dp.push(p("Erota aina testaajan sanat omasta tulkinnastasi.", { before: 120, italics: true, color: GREY }));
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
const third = Math.ceil(testCount / 3);
dp.push(p(`Luokat: T01–T${String(third).padStart(2, "0")} normaali käyttö · T${String(third + 1).padStart(2, "0")}–T${String(third * 2).padStart(2, "0")} rajat · loput virhetilanteet. Kirjoita odotus ennen testiajoa.`, { before: 120, italics: true, color: GREY }));
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
async function saveDoc(name, children) {
  const doc = new Document({
    styles: { default: { document: { run: { font: "Calibri", size: 21 } } } },
    sections: [{ properties: { page: PAGE }, children }],
  });
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(OUT, name), buf);
  console.log(name, buf.length, "B");
}

(async () => {
  await saveDoc(`${P.slug}-tyopaketti.docx`, tp);
  if (ti.length) await saveDoc(`${bank.tiedosto || "ideapankki"}.docx`, ti);
  await saveDoc(L.dokumentointipohjatTiedosto || "nayton-dokumentointipohjat.docx", dp);
  if (ns.length) await saveDoc(NS.tiedosto || "nayttosuunnitelma.docx", ns);
})();

/* ---------- Print-HTML samasta datasta (Chrome headless → PDF) ---------- */
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
const H = [];
H.push(`<!doctype html><html lang="${esc(lt("lang"))}"><head><meta charset="utf-8"><title>${esc(P.nimi)} – ${esc(lt("tyopakettiTiedostoOtsikko"))}</title><style>
@page { size: A4; margin: 16mm; }
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
.done { color: #${ACCENT}; font-size: 9pt; margin: 3pt 0 0; }
.ev { color: #555; font-size: 9pt; margin: 2pt 0 0; }
.page { page-break-before: always; }
.muted { color: #555; }
.item { font-size: 9pt; margin: 2pt 0; }
</style></head><body>`);
H.push(`<div class="cover"><h1>${esc(P.nimi)}</h1><p style="font-size:14pt">${esc(lt("tyopakettiOtsikko"))}</p><p>${esc(tpKansiKuvaus || "")}</p><p style="font-size:12pt"><strong>${esc(tpJakso)}${tpDeadline ? ` · ${esc(lt("luovutus", tpDeadline))}` : ""}</strong></p><p style="max-width:120mm;margin:18pt auto 0">${esc(lt("kansiJohdanto"))}</p>${tpKansiHuomiot.map((n) => `<p style="max-width:120mm;margin:10pt auto 0">${esc(n)}</p>`).join("")}</div>`);
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
    H.push(`<div class="wk"><h2>${esc(lt("viikkoOtsikko", wk.num, wk.dates, wk.title))}</h2>`);
    if (g.feature) H.push(`<p class="feature">${esc(g.feature)}</p>`);
    wk.tasks.forEach((t) => H.push(`<p class="task">☐&nbsp; ${esc(t)}</p>`));
    if (g.done) H.push(`<p class="done"><strong>${esc(lt("valmisKunLabel"))}</strong> ${esc(g.done)}</p>`);
    if (wk.evidence) H.push(`<p class="ev"><strong>${esc(lt("evidenceLabel"))}</strong> ${esc(wk.evidence)}</p>`);
    H.push(`</div>`);
  });
});
if (tpViimeisetPaivat.length) {
  H.push(`<h1 class="page">${esc(lt("viimeisetPaivatOtsikko"))}</h1>`);
  tpViimeisetPaivat.forEach(([d, t]) => H.push(`<p class="task"><strong>${esc(d)}</strong> · ${esc(t)}</p>`));
}
if (matrices.length) {
  H.push(`<h1 class="page">${esc(lt("matriisiOtsikko", requirementCount))}</h1><p class="muted">${esc(lt("matriisiJohdanto"))}</p>`);
  matrices.forEach((mat) => {
    H.push(`<h2>${esc(mat.title)}</h2>`);
    mat.items.forEach((i) => H.push(`<p class="item">☐&nbsp; <strong>${esc(i.title)}</strong> – ${esc(i.hint)}</p>`));
  });
}
H.push(`<p class="muted" style="margin-top:10pt"><em>${esc(lt("selainHuomio"))}</em></p>`);
H.push(`</body></html>`);
fs.writeFileSync(path.join(__dirname, "tyopaketti-print.html"), H.join("\n"));
console.log("tyopaketti-print.html kirjoitettu");

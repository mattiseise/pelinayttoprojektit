/*
 * Ajo: node tyokalut/tee_vaihekuva.js
 *
 * v2.7: projektin vaiheiden havainnekuva (assets/projektin-vaiheet.svg) sisalto.js:n
 * `vaiheet`-datasta. Geneerinen: sama data näkyy sivun vaihekuvauksessa ([data-roadmap]),
 * vaihepolussa ja työpaketissa, joten kuva ei voi erota tekstistä. Tähän tiedostoon ei
 * kirjoiteta projektikohtaista sisältöä.
 *
 * Kentät: vaiheet[] = { tunnus, lyhyt, otsikko, kuvaus, kuvassa?: ["rivi", …], vari?, viikot }
 *   kuvassa = kuvan 1–2 lyhyttä riviä (≤ 58 merkkiä). Puuttuessa kuvaus rivitetään.
 * P.vaihekuva = { kuva, leveys, korkeus, alt, otsikko? } — leveys ja korkeus päivitetään
 * tämän skriptin tulosteesta, jos ne eroavat.
 * Lomat: lomaViikot, jotka kuuluvat vaiheeseen, näkyvät vaiheen alarivillä viikkoNimet-nimellä.
 * Muunkielinen sivusto: P.vaihekuva.tekstit = { kuvaotsikko, viikot, tyoviikot, viikko, viikotLyhyt, loma }.
 */
const fs = require("fs");
const path = require("path");

const SITE = path.join(__dirname, "..");
global.window = {};
require(path.join(SITE, "sisalto.js"));
const P = global.window.NAYTTOPROJEKTI;
if (!P || !Array.isArray(P.vaiheet) || !P.vaiheet.length) throw new Error("sisalto.js: vaiheet puuttuu");
/* Generoi vain, kun projekti on ottanut vaihekuvan käyttöön (P.vaihekuva). Esim. Vektoripajan
   saavutettava vaihekuva on tehty omalla skriptillään suuremmalla tekstillä, eikä sitä saa ylikirjoittaa. */
if (!P.vaihekuva) { console.log("vaihekuva-kenttä puuttuu sisalto.js:stä: projekti käyttää omaa vaihekuvaa, mitään ei kirjoitettu."); process.exit(0); }

const T = P.teema || null;
const C = T
  ? { bg: T.tausta || "#000000", card: T.tausta || "#000000", ink: T.teksti || "#ffffff", muted: T.teksti || "#ffffff", line: T.kehys || T.teksti || "#ffffff", onPhase: T.korostusTeksti || T.tausta || "#000000", font: T.fontti || "Arial, sans-serif" }
  : { bg: "#ffffff", card: "#ffffff", ink: "#241f1a", muted: "#5c5347", line: "#d4cbbb", onPhase: "#ffffff", font: "Arial, Helvetica, sans-serif" };
const accent = (P.paletti && (P.paletti.aksenttiTumma || P.paletti.aksentti)) || "#9a3412";

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const plain = (s) => String(s ?? "").replace(/`([^`\n]+)`/g, "$1");

function wrap(text, max) {
  const words = plain(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  words.forEach((w) => {
    if (!line) line = w;
    else if ((line + " " + w).length <= max) line += " " + w;
    else { lines.push(line); line = w; }
  });
  if (line) lines.push(line);
  return lines;
}

const VT = Object.assign({
  kuvaotsikko: "Mitä syntyy missäkin vaiheessa?",
  viikot: "Viikot", tyoviikot: "Työviikot", viikko: "viikko", viikotLyhyt: "viikot", loma: "Loma"
}, (P.vaihekuva && P.vaihekuva.tekstit) || {});
const weekList = (P.viikot || []).map(Number);
const holidays = new Set((P.lomaViikot || []).map(Number));
const names = P.viikkoNimet || {};

function weeksLabel(phase) {
  const work = weekList.filter((w) => (phase.viikot || []).map(Number).includes(w) && !holidays.has(w));
  if (!work.length) return "";
  const a = work[0], b = work[work.length - 1];
  return `${P.paivaton ? VT.tyoviikot : VT.viikot} ${a === b ? a : `${a}–${b}`}`;
}

function holidayLine(phase) {
  const hol = weekList.filter((w) => (phase.viikot || []).map(Number).includes(w) && holidays.has(w));
  if (!hol.length) return "";
  const groups = [];
  hol.forEach((w) => {
    const name = names[w] || VT.loma;
    const last = groups[groups.length - 1];
    if (last && last.name === name) last.weeks.push(w);
    else groups.push({ name, weeks: [w] });
  });
  return groups.map((g) => `${g.name} · ${g.weeks.length > 1 ? `${VT.viikotLyhyt} ${g.weeks[0]}–${g.weeks[g.weeks.length - 1]}` : `${VT.viikko} ${g.weeks[0]}`}`).join(" · ");
}

const W = 880;
const X = 90;
const BOX_W = W - X - 38;
const LINE = 30;
let y = 78;
const parts = [];
const descParts = [];
P.vaiheet.forEach((phase, i) => {
  const n = i + 1;
  const color = phase.vari || accent;
  const lines = (Array.isArray(phase.kuvassa) && phase.kuvassa.length ? phase.kuvassa.map(plain) : wrap(phase.kuvaus || "", 58)).slice(0, 3);
  const hol = holidayLine(phase);
  const wl = weeksLabel(phase);
  /* Arvioitu leveys (Arial bold 26 px ≈ 0,6 em/merkki, 20 px ≈ 0,52 em): jos otsikko ja viikot eivät
     mahdu samalle riville, viikot siirtyvät omalle rivilleen otsikon alle. Pitkä otsikko rivittyy. */
  const titleMax = Math.floor((BOX_W - 44) / (26 * 0.6));
  const titleLines = wrap(phase.otsikko, titleMax);
  const sameLine = titleLines.length === 1 && titleLines[0].length * 26 * 0.6 + wl.length * 20 * 0.52 + 30 <= BOX_W - 44;
  const extra = (titleLines.length - 1) * 32 + (wl && !sameLine ? 26 : 0);
  const h = 58 + extra + lines.length * LINE + (hol ? 30 : 0) + 14;
  parts.push(`<rect x="${X}" y="${y}" width="${BOX_W}" height="${h}" rx="12" fill="${C.card}" stroke="${T ? C.line : color}" stroke-width="2"/>`);
  parts.push(`<circle cx="45" cy="${y + 29}" r="24" fill="${T ? C.ink : color}"/>`);
  parts.push(`<text x="45" y="${y + 39}" fill="${C.onPhase}" font-family="${esc(C.font)}" font-size="28" font-weight="700" text-anchor="middle">${n}</text>`);
  titleLines.forEach((tl, j) => parts.push(`<text x="${X + 22}" y="${y + 36 + j * 32}" fill="${C.ink}" font-family="${esc(C.font)}" font-size="26" font-weight="700">${esc(tl)}</text>`));
  if (wl && sameLine) parts.push(`<text x="${X + BOX_W - 20}" y="${y + 36}" fill="${C.muted}" font-family="${esc(C.font)}" font-size="20" text-anchor="end">${esc(wl)}</text>`);
  else if (wl) parts.push(`<text x="${X + 22}" y="${y + 36 + titleLines.length * 32 - 6}" fill="${C.muted}" font-family="${esc(C.font)}" font-size="20">${esc(wl)}</text>`);
  const y0 = y + 72 + extra;
  lines.forEach((l, j) => parts.push(`<text x="${X + 22}" y="${y0 + j * LINE}" fill="${C.ink}" font-family="${esc(C.font)}" font-size="21">${esc(l)}</text>`));
  if (hol) parts.push(`<text x="${X + 22}" y="${y0 + lines.length * LINE + 4}" fill="${C.muted}" font-family="${esc(C.font)}" font-size="18" font-style="italic">${esc(hol)}</text>`);
  if (i < P.vaiheet.length - 1) parts.push(`<path d="M45 ${y + 58}V${y + h + 14}" stroke="${T ? C.ink : C.line}" stroke-width="2" marker-end="url(#nuoli)"/>`);
  descParts.push(`${n}. ${plain(phase.otsikko)}${wl ? ` (${wl.toLowerCase()})` : ""}: ${plain(phase.kuvaus || lines.join(" "))}${hol ? ` ${hol}.` : ""}`);
  y += h + 20;
});
const H = y + 6;
const title = (P.vaihekuva && P.vaihekuva.otsikko) || `${P.nimi}: projektin vaiheet`;
const heading = VT.kuvaotsikko;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="title desc">
<title id="title">${esc(title)}</title>
<desc id="desc">${esc(descParts.join(" "))}</desc>
<rect width="${W}" height="${H}" fill="${C.bg}"/>
<defs><marker id="nuoli" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="none" stroke="${T ? C.ink : C.muted}" stroke-width="1.4"/></marker></defs>
<text x="40" y="49" fill="${C.ink}" font-family="${esc(C.font)}" font-size="30" font-weight="700">${esc(heading)}</text>
${parts.join("\n")}
</svg>
`;
const rel = (P.vaihekuva && P.vaihekuva.kuva) || "assets/projektin-vaiheet.svg";
fs.mkdirSync(path.dirname(path.join(SITE, rel)), { recursive: true });
fs.writeFileSync(path.join(SITE, rel), svg, "utf8");
console.log(`${rel} kirjoitettu (${W} × ${H})`);
if (P.vaihekuva && (Number(P.vaihekuva.leveys) !== W || Number(P.vaihekuva.korkeus) !== H)) {
  console.log(`HUOM: päivitä sisalto.js:n vaihekuva: { leveys: ${W}, korkeus: ${H} }`);
}

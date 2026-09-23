/*
 * Näyttöprojekti – geneerinen moottori (kaksipalstainen layout, v2).
 *
 * TÄTÄ TIEDOSTOA EI MUOKATA PROJEKTIKOHTAISESTI.
 * Kaikki projektikohtainen sisältö tulee sisalto.js:stä (window.NAYTTOPROJEKTI).
 * Jos jotain pitää muokata tässä, se on merkki siitä että sisalto.js:n
 * skeemaan tarvitaan uusi kenttä — korjaa skilliin, ei yksittäiseen projektiin.
 *
 * Rakenne, jota tämä moottori odottaa index.html:ltä, on kuvattu tarkasti
 * tiedostossa skillin references/layout-rakenne.md.
 *
 * v2.4: opt-in-ominaisuudet, oletuksena pois päältä (muiden projektien ulkoasu ei muutu):
 *   - `teema`: saavutettava teema (värit, fontti, välistys, rivinpituus, 2 px reunat,
 *     3 px fokus) ja yksipalstainen asettelu, jossa sivupalkki avautuu valikkona.
 *     Tilat tekstinä ja symbolina (✓ Valmis, → Nyt, ○ Tulossa). Näkymän vaihto siirtää
 *     fokuksen otsikkoon. Aktivoituu <html data-teema> -attribuutilla.
 *   - `sykli` + viikkoOhjeet[w].sykli: työsyklin seurantapalkki, nykyinen askel isona,
 *     kopioitava viestipohja ("Kopioitu" + aria-live) ja "Olen jumissa" -päätöspuu.
 *   - kuvaohjeet (`kuvakaappaukset.json`): kuvakaappaus numeroiduin kehyksin ja samat
 *     vaiheet tekstinä; klikkaus avaa kuvan isona. Puuttuva kuva → paikanpitäjä.
 *   - `josJumissa`: sama "Jos et tiedä, mitä tehdä" -päätöspuu joka viikkokortissa.
 *   - `viikkorutiini`: viikon rutiinirastit, jotka eivät lasketa tehtäviin.
 *   - viikkoOhjeet[w].pohjat: viikon kopioitavat viestipohjat Näin etenet -listan jälkeen.
 *   - [data-copy]-napit toimivat missä tahansa sivulla.
 *   Lisäksi: vuodenvaihteen ylittävä `viikot`-lista säilyttää annetun järjestyksen
 *   (esim. [40, …, 53, 1, …, 9]); päiväkirjan vienti kulkee samassa järjestyksessä.
 * v2.3: example/notEnough (kalibrointikortit) renderöidään viikkokorttiin ennen Valmis kun -korttia.
 * v2.2: takahipsut sisältötekstissä → <code>; välilehden otsikko seuraa valittua viikkoa.
 * v2.1: sanasto. sisalto.js:n `termisto` renderöidään näkymään
 * data-view="termit" ([data-termisto]) ja viikon `termit`-lista viikkokortin
 * "Uudet termit tällä viikolla" -laatikkoon. Ks. skillin references/sisalto-spec.md.
 */
(function () {
  "use strict";

  const P = window.NAYTTOPROJEKTI;
  if (!P) {
    console.error("sisalto.js puuttuu tai ei latautunut ennen app.js:ää.");
    return;
  }

  /* ---------- käyttöliittymän tekstit ----------
   * Oletukset ovat suomeksi. Projekti voi korvata minkä tahansa avaimen
   * sisalto.js:n `tekstit`-objektista.
   */
  const UI_OLETUS = {
    weekKickerFallback: "Viikon jälkeen",
    connectionLabel: "Näin viikko vie projektia eteenpäin:",
    deliverableLabel: "Tällä viikolla valmistuu",
    whyLabel: "Miksi tämä tehdään",
    skillsLabel: "Viikon tekniikka",
    resourcesLabel: "Tarvitset nämä:",
    helpFallbackTitle: "Tarvitsen toteutusapua",
    helpTreeLabel: "Luo tämä rakenne",
    helpActionsLabel: "Kytke näin",
    helpCodeLabel: "Käytä tätä työpohjaa tai tarkistuslistaa",
    helpTestLabel: "Tarkistustesti:",
    helpNote: "Jos käytit tähän tekoälyä, kirjaa se AI-lokiin.",
    stepsLead: (n) => `${n} askelta · ohjattu työ · tee järjestyksessä`,
    dayRhythmLabel: "Viikon päivärytmi",
    dayLabel: (n) => `Päivä ${n}`,
    doneLabel: "Valmis kun",
    evidenceLabel: "Näytä",
    quoteSource: "Toimeksiannosta – tätä asiakkaan toivetta tämä viikko toteuttaa",
    journalRecordPrefix: "Tallenna nämä tiedot:",
    journalComplete: "Pääkentät kirjattu",
    journalPartial: "Kesken – täydennä kentät",
    journalEmpty: "Ei vielä kirjattu",
    journalReminder: "Muista projektipäiväkirjan kentät",
    journalSummary: (done, total) => `${done} / ${total}`,
    journalCountBig: (done, total) => `${done} / ${total} viikkoa kirjattu`,
    weekTileLogged: "kirjattu",
    weekTileCurrent: "käynnissä",
    weekTileOpen: "avoinna",
    exportWeekButton: "Lataa vain tämä viikko (.md)",
    exportJournalButton: "Lataa koko projektipäiväkirja",
    weekFallback: (w) => `Viikko ${w}`,
    weekAria: (w, phase) => `Viikko ${w}${phase ? `, vaihe ${phase}` : ""}`,
    weekAriaHoliday: (w, name) => `Viikko ${w}, ${name}`,
    holidayFallback: "loma",
    progressCopy: (done, total) => `${done} / ${total} tehtävää`,
    resumeLabel: "Jatka siitä mihin jäit",
    resumeDone: "Kaikki tehtävät valmiina",
    resumeNote: (w, title) => `Viikko ${w} · ${title}`,
    planNotStarted: "Ei vielä aloitettu",
    planPartial: (done, total) => `Kesken: ${done} / ${total}`,
    planDone: "Suunnitelma valmis ✓",
    planEmptyValue: "_(ei vielä täytetty)_",
    dateLocale: "fi-FI",
    prevWeek: (w, title) => `← Viikko ${w}: ${title}`,
    nextWeek: (w, title) => `Viikko ${w}: ${title} →`,
    prevStart: "Alussa",
    nextEnd: "Viimeinen viikko",
    mdJournalTitle: (name) => `${name} – projektipäiväkirja`,
    mdJournalLead: (path) => `Tallenna tämä tiedosto polkuun \`${path}\` ja tee commit jokaisen viikon lopussa.`,
    mdWeekHeading: (w, title) => `## Vko ${w} – ${title}`,
    mdWeekFeature: "Viikon kärki:",
    mdWeekDeliverable: "Viikon tuotos:",
    mdWork: "### Mitä tein ja miten?",
    mdReason: "### Miksi tein näin?",
    mdEvidence: "### Missä työnäyte on?",
    mdNotRecorded: "Ei vielä kirjattu.",
    mdWeekFile: (w) => `projektipaivakirja-vko-${w}.md`,
    mdWeekFileTitle: (name, w) => `# ${name} – viikko ${w}`,
    aiLogHeading: "## AI-loki",
    aiLogEmpty: "Ei merkintöjä.",
    aiLogFile: "AI-loki.md",
    aiLogFileTitle: (name) => `# ${name} – AI-loki`,
    aiLogQuestion: "Tehtävä tai kysymys:",
    aiLogUsed: "Käytin, muutin tai hylkäsin:",
    aiLogReference: "Aineistoviite:",
    aiLogNoReference: "ei viitettä",
    aiLogPrivacyOk: "Tietosuojavahvistus: En syöttänyt henkilötietoja, salaisuuksia tai luottamuksellista aineistoa.",
    aiLogPrivacyMissing: "Tietosuojavahvistus: vahvistamatta (vanha merkintä)",
    logCount: (n) => `${n} ${n === 1 ? "merkintä" : "merkintää"}`,
    logEmptyState: "Ei merkintöjä vielä.",
    logReferencePrefix: "Aineisto:",
    logRemoveAria: "Poista lokimerkintä",
    logRemove: "Poista",
    resetConfirm: (plan, files) => `Nollataanko tehtävät, projektipäiväkirja${plan}, rastit ja AI-loki tästä selaimesta? Lataa projektipäiväkirja${files} ensin, jos haluat säilyttää vastaukset.`,
    /* Sanasto (P.termisto) ja viikon uudet termit (viikkoOhjeet[w].termit). */
    glossaryWeekLabel: "Uudet termit tällä viikolla",
    glossaryWeekLink: "Koko sanasto →",
    glossaryWeekChip: (w) => `viikko ${w}`,
    glossaryWeekChipAria: (w) => `Termi tulee vastaan ensimmäisen kerran viikolla ${w}`,
    glossaryCount: (n) => `${n} termiä`,
    glossaryEmpty: "Tässä projektissa ei ole erillistä sanastoa.",
    /* Kalibrointi: riittävä ja riittämätön suoritus (viikkoOhjeet[w].example / notEnough). */
    exampleLabel: "Esimerkki odotetusta tarkkuudesta · älä kopioi sisältöä",
    notEnoughLabel: "Tämä ei vielä riitä",
    planMetaDone: "valmis",
    planMetaEmpty: "päivittyy",
    /* v2.4: tilat tekstinä ja symbolina (teema.tilaTekstit). */
    stateDone: "Valmis",
    stateCurrent: "Nyt",
    stateFuture: "Tulossa",
    stateHoliday: "Loma",
    stateStepDone: "Tehty",
    stateSymbolDone: "✓",
    stateSymbolCurrent: "→",
    stateSymbolFuture: "○",
    stateSymbolHoliday: "–",
    weekNumberShort: (w) => `vk ${w}`,
    tileSymbolLogged: "✓",
    tileSymbolCurrent: "→",
    tileSymbolOpen: "○",
    /* v2.4: työsykli (P.sykli, viikkoOhjeet[w].sykli). */
    cycleHeading: "Työsykli",
    cycleLead: "Tee askeleet järjestyksessä. Yksi kierros on yksi tehtäväkortti.",
    cycleRound: (n) => `Kierros ${n}`,
    cycleTrackLabel: "Syklin askeleet",
    cycleNowLabel: (i, n) => `Seuraava askel · ${i} / ${n}`,
    cycleTool: "Työkalu:",
    cycleOwn: "Sinä teet:",
    cycleWhen: "Askel on valmis, kun",
    cycleNext: "Tein tämän · seuraava askel →",
    cyclePrev: "← Edellinen askel",
    cycleFinish: "Tein tämän · kierros valmis ✓",
    cycleRoundDoneTitle: (n) => `Kierros ${n} valmis`,
    cycleRoundDoneText: "Kirjaa tulos päiväkirjaan. Aloita sitten seuraava tehtäväkortti askeleesta 1.",
    cycleNewRound: (n) => `Aloita kierros ${n} →`,
    cycleLiveStep: (i, name) => `Askel ${i}: ${name}`,
    cycleStuck: "Olen jumissa",
    cycleStuckLead: "Valitse kysymys, joka kuvaa tilannetta. Avaa se ja tee ohjeen mukaan.",
    copyDefaultTitle: "Kopioi tämä",
    copyButton: "Kopioi",
    copyDone: "✓ Kopioitu",
    copyLive: (title) => `Kopioitu leikepöydälle${title ? `: ${title}` : ""}.`,
    copyFailed: "Kopiointi ei onnistunut. Valitse teksti ja paina Ctrl + C.",
    viewLive: (title) => `Avattu: ${title}`,
    /* v2.4: kuvaohjeet (kuvakaappaukset.json). */
    kuvaohjeetHeading: "Kuvaohjeet",
    kuvaohjeWhere: "Missä:",
    kuvaohjeOpen: "Avaa kuva isona",
    kuvaohjeClose: "Sulje kuva",
    kuvaohjePlaceholder: (kuvaa) => `Kuvakaappaus tulossa: ${kuvaa}`,
    kuvaohjeMeta: (pvm, teema) => [pvm ? `Kuvattu ${pvm}` : "", teema || ""].filter(Boolean).join(" · "),
    kuvaohjeLoadError: "Kuvaohje ei latautunut. Avaa sivu verkko-osoitteesta, älä tiedostona.",
    kuvaohjeMissing: (id) => `Kuvaohjetta ${id} ei löydy.`,
    /* v2.4: joka viikon vakiolohkot (P.josJumissa, P.viikkorutiini). */
    lostHeading: "Jos et tiedä, mitä tehdä",
    routineHeading: "Viikkorutiini"
  };
  const UI = Object.assign({}, UI_OLETUS, P.tekstit || {});
  const t = (key, ...args) => {
    const value = UI[key];
    return typeof value === "function" ? value(...args) : value;
  };

  const SLUG = P.slug;
  const STORAGE_KEY = `${SLUG}-progress-v1`;
  const EVIDENCE_KEY = `${SLUG}-evidence-v1`;
  const LOG_KEY = `${SLUG}-ai-log-v1`;
  const JOURNAL_KEY = `${SLUG}-journal-v1`;
  const PLAN_KEY = `${SLUG}-suunnitelma-v1`;

  const weekFraming = P.kehykset || {};
  const weekGuidance = P.viikkoOhjeet || {};
  const plan = P.suunnitelma || null;
  const journalCfg = P.paivakirja || {};
  const holidayWeeks = new Set((P.lomaViikot || []).map(Number));
  /* Järjestys on sisalto.js:n `viikot`-listan järjestys, ei numerojärjestys:
     vuodenvaihteen ylittävä jakso on [40, …, 53, 1, …, 9] (v2.4). */
  const weekList = (P.viikot || []).map(Number);
  const weekIndex = (w) => weekList.indexOf(Number(w));
  const phases = P.vaiheet || [];
  const compactSidebar = Boolean(P.tiivisSivupalkki);
  const lockFuture = Boolean(P.lukitseTulevat);

  /* ---------- v2.4: saavutettava teema (P.teema, opt-in) ----------
   * Aktivoituu vain, kun sisalto.js:ssä on `teema`-lohko. Arvot menevät
   * --teema-*-muuttujiin; styles.css:n html[data-teema] -lohko käyttää niitä.
   * index.html asettaa attribuutit myös staattisesti (<html data-teema="oma"
   * data-teema-asettelu="yksi">), jotta sivu ei välähdä oletusteemassa.
   */
  const theme = P.teema && typeof P.teema === "object" ? P.teema : null;
  const TEEMA_VARS = {
    tausta: "--teema-tausta", pinta: "--teema-pinta", teksti: "--teema-teksti", otsikot: "--teema-otsikot",
    korostus: "--teema-korostus", korostusTeksti: "--teema-korostus-teksti", kehys: "--teema-kehys",
    fontti: "--teema-fontti", perusfontti: "--teema-koko", kirjainvali: "--teema-kirjainvali",
    sanavali: "--teema-sanavali", rivikorkeus: "--teema-rivikorkeus", rivinPituus: "--teema-rivi",
    reuna: "--teema-reuna", fokus: "--teema-fokus"
  };
  if (theme) {
    const root = document.documentElement;
    if (!root.dataset.teema) root.dataset.teema = "oma";
    Object.entries(TEEMA_VARS).forEach(([key, cssVar]) => {
      if (theme[key] != null && theme[key] !== "") root.style.setProperty(cssVar, String(theme[key]));
    });
    if (theme.yksiPalsta !== false) root.dataset.teemaAsettelu = "yksi";
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor && theme.tausta) themeColor.setAttribute("content", theme.tausta);
  }
  const singleColumn = document.documentElement.dataset.teemaAsettelu === "yksi";
  const stateTexts = Boolean(theme && theme.tilaTekstit !== false);
  const focusOnViewChange = Boolean(theme && theme.fokusOtsikkoon !== false);

  /* Tila tekstinä ja symbolina: "✓ Valmis", "→ Nyt", "○ Tulossa". Symboli on
     ruudunlukijalta piilossa, teksti ei. */
  const STATE_KEYS = {
    done: ["stateSymbolDone", "stateDone"], step: ["stateSymbolDone", "stateStepDone"],
    current: ["stateSymbolCurrent", "stateCurrent"], future: ["stateSymbolFuture", "stateFuture"],
    holiday: ["stateSymbolHoliday", "stateHoliday"]
  };
  function stateLabel(kind) {
    const [sym, text] = STATE_KEYS[kind] || STATE_KEYS.future;
    return `<span class="week-state week-state-${kind}"><span aria-hidden="true">${escapeText(t(sym))}</span> ${escapeText(t(text))}</span>`;
  }

  let copySeq = 0; // viestipohjien juokseva tunnus (app.js rakentaa pohjat myös enhanceWeekCardissa)

  /* Ilmoitukset ruudunlukijalle (kopiointi, askeleen vaihto). */
  function announce(message) {
    let region = document.getElementById("np-live");
    if (!region) {
      region = document.createElement("div");
      region.id = "np-live";
      region.className = "sr-only";
      region.setAttribute("role", "status");
      region.setAttribute("aria-live", "polite");
      document.body.appendChild(region);
    }
    region.textContent = "";
    window.setTimeout(() => { region.textContent = message; }, 60);
  }

  /* Kopiointi leikepöydälle. Toimii myös http-osoitteessa ja vanhoissa selaimissa. */
  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; }
    } catch (_) { /* kokeillaan vanhaa tapaa */ }
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      area.remove();
      return ok;
    } catch (_) { return false; }
  }

  /* [data-copy="elementin-id"] kopioi elementin tekstin. Toimii sekä app.js:n
     rakentamissa viestipohjissa että index.html:ään käsin kirjoitetuissa. */
  document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-copy]");
    if (!button) return;
    const source = document.getElementById(button.dataset.copy);
    if (!source) return;
    const ok = await copyText(source.innerText.replace(/ /g, " ").trim());
    if (!button.dataset.copyLabel) button.dataset.copyLabel = button.textContent;
    button.textContent = ok ? t("copyDone") : button.dataset.copyLabel;
    button.classList.toggle("is-copied", ok);
    announce(ok ? t("copyLive", button.dataset.copyTitle || "") : t("copyFailed"));
    if (!ok) {
      /* Leikepöytä estetty: maalataan teksti valmiiksi, jolloin Ctrl + C riittää. */
      try { source.focus(); window.getSelection().selectAllChildren(source); } catch (_) { /* ei valintaa */ }
    }
    window.clearTimeout(Number(button.dataset.copyTimer || 0));
    button.dataset.copyTimer = String(window.setTimeout(() => {
      button.textContent = button.dataset.copyLabel;
      button.classList.remove("is-copied");
    }, 4000));
  });

  function escapeText(value) {
    const div = document.createElement("div");
    div.textContent = value == null ? "" : value;
    return div.innerHTML;
  }

  /* Sisältötekstin takahipsut `näin` → <code>näin</code>. Kaikki muu escapataan. */
  function richText(value) {
    return escapeText(value).replace(/`([^`\n]+)`/g, "<code>$1</code>");
  }

  function readStorage(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch (_) { return fallback; }
  }
  function writeStorage(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (_) { /* Sivusto toimii myös ilman pysyvää tallennusta. */ }
  }

  const VALID_VIEWS = ["kaytto", "toimeksianto", "tyotapa", "termit", "galleria", "viikko", "suunnitelma", "paivakirja", "ailoki", "naytto"];

  /* ---------- sanasto ----------
   * P.termisto = [{ termi, nimi, selite, viikko? }, …]. Projektikohtainen: vain
   * termit, joita tämä projekti oikeasti käyttää. Sanasto täydentää ensimmäisen
   * käytön selitystä tekstissä, ei korvaa sitä (ks. skillin pedagoginen sääntö).
   */
  const glossary = (Array.isArray(P.termisto) ? P.termisto : []).filter((g) => g && g.termi);
  const glossaryByTerm = new Map(glossary.map((g) => [String(g.termi).toLowerCase(), g]));
  const glossaryId = (termi) => `termi-${String(termi).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

  function glossaryItemHtml(g, opts = {}) {
    const chip = opts.weekChip && g.viikko != null
      ? ` <a class="glossary-week" href="#week-${escapeText(g.viikko)}" aria-label="${escapeText(t("glossaryWeekChipAria", g.viikko))}">${escapeText(t("glossaryWeekChip", g.viikko))}</a>`
      : "";
    return `<div class="glossary-item"${opts.withId ? ` id="${glossaryId(g.termi)}"` : ""}>
        <dt><span class="glossary-term">${escapeText(g.termi)}</span>${g.nimi ? `<span class="glossary-name">${escapeText(g.nimi)}</span>` : ""}</dt>
        <dd>${richText(g.selite || "")}${chip}</dd>
      </div>`;
  }

  function renderGlossary() {
    document.querySelectorAll("[data-glossary-count]").forEach((el) => { el.textContent = glossary.length ? t("glossaryCount", glossary.length) : ""; });
    const holder = document.querySelector("[data-termisto]");
    if (!holder) return;
    if (!glossary.length) { holder.innerHTML = `<p class="empty-state">${escapeText(t("glossaryEmpty"))}</p>`; return; }
    holder.innerHTML = glossary.map((g) => glossaryItemHtml(g, { weekChip: true, withId: true })).join("");
  }
  const weekCardEls = [...document.querySelectorAll(".view[data-view='viikko'] .week-card, .view[data-view='viikko'] .holiday-card")];
  const taskWeekCards = [...document.querySelectorAll(".view[data-view='viikko'] .week-card")];

  function phaseOf(week) {
    return phases.find((phase) => (phase.viikot || []).includes(Number(week))) || null;
  }

  /* ---------- viikkokorttien rikastus sisalto.js:n datalla (kertaluontoinen) ---------- */

  function fillList(container, items, mapFn) {
    if (!container) return;
    container.innerHTML = items.map(mapFn).join("");
  }

  function enhanceWeekCard(card) {
    const week = card.dataset.week;
    const guide = weekGuidance[week];
    if (!guide) return; // holiday-card tms. — ei tehtäväsisältöä.
    const framing = weekFraming[guide.type] || Object.values(weekFraming)[0] || {};

    const kicker = card.querySelector("[data-week-kicker]");
    if (kicker) {
      kicker.querySelector("[data-week-kicker-label]").textContent = framing.kicker || t("weekKickerFallback");
      kicker.querySelector("[data-week-kicker-text]").innerHTML = richText(guide.feature || "");
      kicker.hidden = false;
    }

    const quote = card.querySelector("[data-week-quote]");
    if (quote && guide.excerpt) {
      quote.querySelector("[data-quote-text]").textContent = `"${guide.excerpt}"`;
      quote.hidden = false;
    }

    const connection = card.querySelector("[data-week-connection]");
    if (connection) {
      connection.innerHTML = `<strong>${escapeText(framing.connectionLabel || t("connectionLabel"))}</strong> ${richText(guide.connection || "")}`;
      connection.hidden = false;
    }

    const whyGrid = card.querySelector("[data-week-why]");
    if (whyGrid) {
      whyGrid.querySelector("[data-why-deliverable-label]").textContent = framing.deliverableLabel || t("deliverableLabel");
      whyGrid.querySelector("[data-why-deliverable-text]").innerHTML = richText(guide.deliverable || "");
      whyGrid.querySelector("[data-why-why-text]").innerHTML = richText(guide.why || "");
      whyGrid.hidden = false;
    }

    const skills = card.querySelector("[data-week-skills]");
    if (skills && (guide.skills || []).length) {
      skills.querySelector("[data-skills-label]").textContent = framing.skillsLabel || t("skillsLabel");
      fillList(skills.querySelector("[data-skills-list]"), guide.skills, (s) => `<li>${escapeText(s)}</li>`);
      skills.hidden = false;
    }

    /* Viikon uudet termit: sisalto.js:n viikkoOhjeet[w].termit = ["P0", "T01"].
       Laatikko luodaan tarvittaessa, jotta vanhat index.html:t eivät tarvitse
       paikanpitäjää. Se näytetään heti kärjen ja tekniikkatagien jälkeen, ennen
       tehtäviä — termi opitaan ennen kuin sitä tarvitaan. */
    const termKeys = (guide.termit || []).map((k) => String(k).toLowerCase());
    const termItems = termKeys.map((k) => glossaryByTerm.get(k)).filter(Boolean);
    if (termItems.length) {
      let box = card.querySelector("[data-week-terms]");
      if (!box) {
        box = document.createElement("section");
        box.className = "week-terms";
        box.setAttribute("data-week-terms", "");
        const anchor = card.querySelector("[data-week-skills]") || card.querySelector("[data-week-why]") || card.querySelector("[data-week-kicker]");
        if (anchor) anchor.insertAdjacentElement("afterend", box);
        else card.querySelector(".view-section")?.insertAdjacentElement("beforebegin", box);
      }
      box.setAttribute("aria-label", t("glossaryWeekLabel"));
      box.innerHTML = `<div class="week-terms-head"><p class="section-label">${escapeText(t("glossaryWeekLabel"))}</p><a href="#view-termit">${escapeText(t("glossaryWeekLink"))}</a></div>
        <dl class="glossary glossary-compact">${termItems.map((g) => glossaryItemHtml(g)).join("")}</dl>`;
      box.hidden = false;
    }

    const steps = guide.steps || [];
    card.querySelector("[data-lesson-label]").textContent = t("stepsLead", steps.length);
    fillList(card.querySelector("[data-lesson-list]"), steps, ([title, text], i) =>
      `<li><span class="step-n">${i + 1}</span><span><strong>${escapeText(title)}</strong> ${text}</span></li>`);

    /* v2.4: viikon kopioitavat viestipohjat (viikkoOhjeet[w].pohjat = [{ otsikko, teksti }]).
       Näkyvät Näin etenet -listan jälkeen. Tarkoitettu erityisesti syklittömille viikoille. */
    if ((guide.pohjat || []).length) {
      let box = card.querySelector("[data-week-templates]");
      if (!box) {
        box = document.createElement("div");
        box.className = "week-templates";
        box.setAttribute("data-week-templates", "");
        card.querySelector("[data-lesson-list]")?.insertAdjacentElement("afterend", box);
      }
      box.innerHTML = copyBlockHtml(guide.pohjat, weekFill(Number(week)));
    }

    const resources = card.querySelector("[data-week-resources]");
    if (resources && (guide.resources || []).length) {
      resources.innerHTML = `<strong>${escapeText(t("resourcesLabel"))}</strong>` +
        guide.resources.map(([label, href, download]) => `<a href="${href}"${download ? " download" : ""}>${escapeText(label)}</a>`).join("");
      resources.hidden = false;
    }

    const help = card.querySelector("[data-week-help]");
    if (help && guide.help) {
      help.querySelector("[data-help-title]").textContent = P.apuOtsikko || t("helpFallbackTitle");
      const h = guide.help;
      const helpLinks = h.links?.length ? `<p class="impl-help-links">${h.links.map(([label, url]) => `<a href="${url}" target="_blank" rel="noreferrer">${escapeText(label)} ↗</a>`).join("")}</p>` : "";
      const helpImages = h.images?.length ? `<div class="impl-help-images">${h.images.map(([src, alt, caption]) => `<figure><img src="${src}" alt="${escapeText(alt)}" loading="lazy">${caption ? `<figcaption>${escapeText(caption)}</figcaption>` : ""}</figure>`).join("")}</div>` : "";
      help.querySelector("[data-help-content]").innerHTML = `
        <p style="font-size:13px;color:var(--muted)"><small>${escapeText(h.title || "")}</small></p>
        <div><p class="help-label">${escapeText(t("helpTreeLabel"))}</p><pre><code>${escapeText(h.tree)}</code></pre></div>
        <div><p class="help-label">${escapeText(t("helpActionsLabel"))}</p><ol>${(h.actions || []).map((a) => `<li>${richText(a)}</li>`).join("")}</ol></div>
        <div><p class="help-label">${escapeText(t("helpCodeLabel"))}</p><pre><code>${escapeText(h.code)}</code></pre></div>
        <p class="impl-help-test"><strong>${escapeText(t("helpTestLabel"))}</strong> ${richText(h.test)}</p>
        ${helpImages}${helpLinks}
        <p class="impl-help-note" style="font-size:12px;color:var(--meta)">${escapeText(t("helpNote"))}</p>`;
      help.hidden = false;
    }

    /* v2.4: viikon kuvaohjeet (viikkoOhjeet[w].kuvaohjeet = ["tunnus", …]).
       Osio luodaan Näin etenet -osion jälkeen; sisältö tulee kuvakaappaukset.json:sta. */
    if ((guide.kuvaohjeet || []).length) {
      let section = card.querySelector("[data-week-kuvaohjeet]");
      if (!section) {
        section = document.createElement("section");
        section.className = "view-section week-kuvaohjeet";
        section.setAttribute("data-week-kuvaohjeet", "");
        const anchor = card.querySelector(".lesson-instructions");
        if (anchor) anchor.insertAdjacentElement("afterend", section);
        else card.querySelector(".outcome-grid")?.insertAdjacentElement("beforebegin", section);
      }
      section.innerHTML = `<h2>${escapeText(t("kuvaohjeetHeading"))}</h2>` +
        guide.kuvaohjeet.map((id) => `<div class="kuvaohje-slot" data-kuvaohje="${escapeText(id)}" data-kuvaohje-taso="3"></div>`).join("");
      section.hidden = false;
    }

    const days = card.querySelector("[data-week-days]");
    if (days && (guide.paivat || []).length) {
      days.querySelector(".section-label").textContent = t("dayRhythmLabel");
      fillList(days.querySelector("[data-day-grid]"), guide.paivat, ([nimi, teksti], i) =>
        `<div class="card"><div class="day-n">${escapeText(t("dayLabel", i + 1))}</div><strong>${escapeText(nimi)}</strong><p>${richText(teksti)}</p></div>`);
      days.hidden = false;
    }

    /* Kalibrointi (pedagoginen runko § 10): riittävä ja riittämätön vastaus
       rinnakkain ennen "Valmis kun" -korttia. Luodaan tarvittaessa, jotta
       index.html ei tarvitse paikanpitäjää. */
    if (guide.example || guide.notEnough) {
      let grid = card.querySelector("[data-week-expectations]");
      if (!grid) {
        grid = document.createElement("div");
        grid.className = "expectation-grid";
        grid.setAttribute("data-week-expectations", "");
        const outcome = card.querySelector(".outcome-grid");
        if (outcome) outcome.insertAdjacentElement("beforebegin", grid);
        else card.querySelector("[data-week-journal]")?.insertAdjacentElement("beforebegin", grid);
      }
      grid.innerHTML = `
        <div class="card expected-example"><p class="section-label section-label-accent">${escapeText(t("exampleLabel"))}</p><p>${richText(guide.example || "")}</p></div>
        <div class="card not-enough"><p class="section-label">${escapeText(t("notEnoughLabel"))}</p><p>${richText(guide.notEnough || "")}</p></div>`;
      grid.hidden = false;
    }

    const checkpoint = card.querySelector(".checkpoint");
    if (checkpoint) checkpoint.innerHTML = richText(guide.done || "");

    const record = card.querySelector("[data-journal-record]");
    if (record) record.innerHTML = `<strong>${escapeText(t("journalRecordPrefix"))}</strong> ${richText(guide.record || "")}`;
  }

  function buildWeekPager(card) {
    const pager = card.querySelector("[data-week-pager]");
    if (!pager) return;
    const week = Number(card.dataset.week);
    const idx = weekList.indexOf(week);
    const prevWeek = idx > 0 ? weekList[idx - 1] : null;
    const nextWeek = idx >= 0 && idx < weekList.length - 1 ? weekList[idx + 1] : null;
    const names = P.viikkoNimet || {};
    const prevLabel = prevWeek ? t("prevWeek", prevWeek, names[prevWeek] || t("weekFallback", prevWeek)) : `← ${t("prevStart")}`;
    const nextLabel = nextWeek ? t("nextWeek", nextWeek, names[nextWeek] || t("weekFallback", nextWeek)) : `${t("nextEnd")} →`;
    pager.innerHTML = `
      <button type="button" class="button button-secondary" data-week-nav="prev" ${prevWeek ? "" : "disabled"}>${escapeText(prevLabel)}</button>
      <button type="button" class="button button-secondary" data-week-nav="next" ${nextWeek ? "" : "disabled"}>${escapeText(nextLabel)}</button>`;
    pager.querySelector('[data-week-nav="prev"]')?.addEventListener("click", () => prevWeek && goToWeek(prevWeek));
    pager.querySelector('[data-week-nav="next"]')?.addEventListener("click", () => nextWeek && goToWeek(nextWeek));
  }

  taskWeekCards.forEach((card) => { enhanceWeekCard(card); buildWeekPager(card); });

  /* ---------- tila ---------- */

  const taskBoxes = [...document.querySelectorAll("[data-task]")];
  const evidenceBoxes = [...document.querySelectorAll("[data-evidence]")];

  const savedTasks = readStorage(STORAGE_KEY, {});
  taskBoxes.forEach((box) => { box.checked = Boolean(savedTasks[box.dataset.task]); });

  const savedEvidence = readStorage(EVIDENCE_KEY, {});
  evidenceBoxes.forEach((box) => { box.checked = Boolean(savedEvidence[box.dataset.evidence]); });

  let journalEntries = readStorage(JOURNAL_KEY, {});
  let planData = readStorage(PLAN_KEY, {});
  let aiLog = readStorage(LOG_KEY, []);

  /* ---------- v2.4: kuvaohjeet (kuvakaappaukset.json, opt-in) ----------
   * Kuvakaappaus + samat vaiheet numeroituna tekstinä. Kuva ei ole koskaan
   * ainoa tiedon kantaja. Data: P.kuvakaappaukset (taulukko) tai tiedosto
   * kuvakaappaukset.json ({ kuvat: [{ tunnus, otsikko, kuvaa, missa, tiedosto,
   * leveys, korkeus, alt, kohdat: [{ n, teksti, alue: [x, y, l, k] }], pvm, teema }] }).
   * alue on prosentteina kuvan leveydestä ja korkeudesta.
   */
  let kuvaPromise = null;
  function loadKuvat() {
    if (kuvaPromise) return kuvaPromise;
    const source = Array.isArray(P.kuvakaappaukset)
      ? Promise.resolve(P.kuvakaappaukset)
      : fetch(P.kuvakaappauksetPolku || "kuvakaappaukset.json", { cache: "no-cache" })
        .then((res) => { if (!res.ok) throw new Error(String(res.status)); return res.json(); })
        .then((data) => (Array.isArray(data) ? data : data.kuvat || []));
    kuvaPromise = source.then((list) => new Map(list.map((k) => [k.tunnus, k]))).catch(() => null);
    return kuvaPromise;
  }

  function kuvaStageHtml(k, full) {
    const w = Number(k.leveys) || 1600;
    const h = Number(k.korkeus) || 900;
    const marks = (k.kohdat || []).filter((c) => Array.isArray(c.alue) && c.alue.length === 4).map((c) => {
      const [x, y, cw, ch] = c.alue.map(Number);
      return `<span class="kuvaohje-mark" style="left:${x}%;top:${y}%;width:${cw}%;height:${ch}%" aria-hidden="true"><span class="kuvaohje-mark-n">${escapeText(c.n)}</span></span>`;
    }).join("");
    const picture = k.tiedosto
      ? `<img src="${escapeText(k.tiedosto)}" alt="${escapeText(k.alt || "")}" width="${w}" height="${h}"${full ? "" : " loading=\"lazy\""}>`
      : `<span class="kuvaohje-placeholder" role="img" aria-label="${escapeText(k.alt || t("kuvaohjePlaceholder", k.kuvaa || k.tunnus))}">${escapeText(t("kuvaohjePlaceholder", k.kuvaa || k.tunnus))}</span>`;
    return `<span class="kuvaohje-stage${full ? " is-full" : ""}" style="aspect-ratio:${w} / ${h}${full ? `;width:${w}px` : ""}"${full ? "" : " data-kuvaohje-open"}>${picture}${marks}</span>`;
  }

  function kuvaStepsHtml(k) {
    return `<ol class="kuvaohje-steps">${(k.kohdat || []).map((c) =>
      `<li><span class="kuvaohje-n" aria-hidden="true">${escapeText(c.n)}</span><span>${richText(c.teksti || "")}</span></li>`).join("")}</ol>`;
  }

  function kuvaohjeHtml(k, level) {
    const hl = Math.min(6, Math.max(2, Number(level) || 3));
    const meta = t("kuvaohjeMeta", k.pvm, k.teema);
    return `<figure class="kuvaohje">
        <h${hl} class="kuvaohje-title">${escapeText(k.otsikko || k.kuvaa || k.tunnus)}</h${hl}>
        ${k.missa ? `<p class="kuvaohje-where"><strong>${escapeText(t("kuvaohjeWhere"))}</strong> ${richText(k.missa)}</p>` : ""}
        <div class="kuvaohje-body">
          <div class="kuvaohje-picture">${kuvaStageHtml(k, false)}
            <button type="button" class="button button-secondary kuvaohje-open-button" data-kuvaohje-open>${escapeText(t("kuvaohjeOpen"))}</button>
          </div>
          ${kuvaStepsHtml(k)}
        </div>
        ${meta ? `<figcaption class="kuvaohje-meta">${escapeText(meta)}</figcaption>` : ""}
      </figure>`;
  }

  function openKuvaDialog(k, opener) {
    let dialog = document.getElementById("kuvaohje-dialog");
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.id = "kuvaohje-dialog";
      dialog.className = "kuvaohje-dialog";
      dialog.setAttribute("aria-labelledby", "kuvaohje-dialog-title");
      dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
      document.body.appendChild(dialog);
    }
    dialog.innerHTML = `<div class="kuvaohje-dialog-head"><p id="kuvaohje-dialog-title"><strong>${escapeText(k.otsikko || k.kuvaa || k.tunnus)}</strong></p>
        <button type="button" class="button button-secondary" data-dialog-close>${escapeText(t("kuvaohjeClose"))}</button></div>
      <div class="kuvaohje-dialog-body">${kuvaStageHtml(k, true)}${kuvaStepsHtml(k)}</div>`;
    dialog.querySelector("[data-dialog-close]").addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => window.setTimeout(() => opener?.focus?.(), 0), { once: true });
    bindImageFallback(dialog, k);
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    dialog.querySelector("[data-dialog-close]").focus();
  }

  /* Kuva puuttuu tai ei lataudu → paikanpitäjä. Numeroidut vaiheet pysyvät. */
  function bindImageFallback(scope, k) {
    scope.querySelectorAll(".kuvaohje-stage img").forEach((img) => img.addEventListener("error", () => {
      const holder = document.createElement("span");
      holder.className = "kuvaohje-placeholder";
      holder.setAttribute("role", "img");
      holder.setAttribute("aria-label", k.alt || t("kuvaohjePlaceholder", k.kuvaa || k.tunnus));
      holder.textContent = t("kuvaohjePlaceholder", k.kuvaa || k.tunnus);
      img.replaceWith(holder);
    }, { once: true }));
  }

  function renderKuvaohjeet(scope = document) {
    const slots = [...scope.querySelectorAll("[data-kuvaohje]:not([data-kuvaohje-valmis])")];
    if (!slots.length) return;
    loadKuvat().then((map) => slots.forEach((slot) => {
      slot.setAttribute("data-kuvaohje-valmis", "");
      const k = map && map.get(slot.dataset.kuvaohje);
      if (!k) {
        slot.innerHTML = `<p class="kuvaohje-error">${escapeText(map ? t("kuvaohjeMissing", slot.dataset.kuvaohje) : t("kuvaohjeLoadError"))}</p>`;
        return;
      }
      slot.innerHTML = kuvaohjeHtml(k, slot.dataset.kuvaohjeTaso);
      bindImageFallback(slot, k);
      slot.querySelectorAll("[data-kuvaohje-open]").forEach((el) => el.addEventListener("click", () => openKuvaDialog(k, slot.querySelector(".kuvaohje-open-button"))));
    }));
  }

  /* ---------- v2.4: työsykli (P.sykli + viikkoOhjeet[w].sykli, opt-in) ----------
   * P.sykli.askeleet = [{ nimi, paikka, tyokalu, oma, ohje: [..], pohja: {otsikko, teksti} | [{…}, …],
   *   valmis, jumissa: [{ kysymys, ohje, pohja, jatko: [...] }], kuvaohjeet: [..] }].
   * Viikko ottaa syklin käyttöön kentällä sykli: true tai objektilla, joka
   * täydentää askelia numeron mukaan: { pohjat: {1: {...}}, ohjeet: {3: [..]}, oma: {1: "…"},
   * jumissa: {3: [..]}, kuvaohjeet: {2: [..]}, lisa: {1: "…"} }.
   * Pohjissa {viikko}, {nimi}, {feature}, {deliverable} ja {done} korvautuvat
   * viikon tiedoilla. Nykyinen askel ja kierros tallentuvat selaimeen.
   */
  const CYCLE_KEY = `${SLUG}-sykli-v1`;
  const cycleBase = P.sykli && Array.isArray(P.sykli.askeleet) && P.sykli.askeleet.length ? P.sykli : null;
  let cycleState = readStorage(CYCLE_KEY, {});

  function cycleFor(week) {
    const g = weekGuidance[week];
    if (!cycleBase || !g || !g.sykli) return null;
    const o = g.sykli === true ? {} : g.sykli;
    const fill = (value) => String(value ?? "").replace(/\{(viikko|nimi|feature|deliverable|done)\}/g, (_, key) =>
      key === "viikko" ? String(week) : key === "nimi" ? weekTitle(week) : String(g[key] || ""));
    const at = (field, n) => (o[field] && o[field][n] !== undefined ? o[field][n] : undefined);
    const steps = cycleBase.askeleet.map((s, i) => {
      const n = i + 1;
      return {
        n,
        nimi: s.nimi,
        paikka: s.paikka || "",
        tyokalu: s.tyokalu || "",
        oma: at("oma", n) || s.oma || "",
        ohje: at("ohjeet", n) || s.ohje || [],
        pohja: at("pohjat", n) !== undefined ? at("pohjat", n) : s.pohja,
        valmis: s.valmis || "",
        lisa: at("lisa", n) || "",
        jumissa: [...(at("jumissa", n) || []), ...(s.jumissa || [])],
        kuvaohjeet: [...(at("kuvaohjeet", n) || []), ...(s.kuvaohjeet || [])]
      };
    });
    return { steps, fill, otsikko: o.otsikko || cycleBase.otsikko, johdanto: o.johdanto || cycleBase.johdanto };
  }

  function copyBlockHtml(pohja, fill) {
    if (!pohja) return "";
    if (Array.isArray(pohja)) return pohja.map((one) => copyBlockHtml(one, fill)).join("");
    const p = typeof pohja === "string" ? { teksti: pohja } : pohja;
    const id = `kopio-${++copySeq}`;
    const title = p.otsikko || t("copyDefaultTitle");
    return `<div class="copy-block">
        <p class="copy-title" id="${id}-otsikko">${escapeText(title)}</p>
        <pre class="copy-text" id="${id}" tabindex="0" aria-labelledby="${id}-otsikko">${escapeText(fill(p.teksti))}</pre>
        <button type="button" class="button button-primary copy-button" data-copy="${id}" data-copy-title="${escapeText(title)}">${escapeText(p.nappi || t("copyButton"))}</button>
      </div>`;
  }

  function stuckTreeHtml(items, fill) {
    return `<ul class="stuck-list">${items.map((item) => `<li><details class="stuck-item">
        <summary>${escapeText(fill(item.kysymys))}</summary>
        <div class="stuck-answer">${item.ohje ? `<p>${richText(fill(item.ohje))}</p>` : ""}${copyBlockHtml(item.pohja, fill)}${(item.jatko || []).length ? stuckTreeHtml(item.jatko, fill) : ""}</div>
      </details></li>`).join("")}</ul>`;
  }

  function renderCycle(card, focusNow) {
    const week = Number(card.dataset.week);
    const cycle = cycleFor(week);
    if (!cycle) return;
    let box = card.querySelector("[data-week-cycle]");
    if (!box) {
      box = document.createElement("section");
      box.setAttribute("data-week-cycle", "");
      const anchor = card.querySelector("[data-week-kicker]") || card.querySelector(".view-title");
      anchor.insertAdjacentElement("afterend", box);
    }
    box.className = "week-cycle";
    box.hidden = false;
    const total = cycle.steps.length;
    const saved = cycleState[week] || {};
    const round = Math.max(1, Number(saved.round) || 1);
    const current = Math.min(Math.max(1, Number(saved.step) || 1), total + 1);
    const headId = `sykli-otsikko-${week}`;
    box.setAttribute("aria-labelledby", headId);

    const track = cycle.steps.map((s) => {
      const kind = s.n < current ? "step" : (s.n === current ? "current" : "future");
      return `<li class="cycle-step is-${kind === "step" ? "done" : kind}"><button type="button" data-cycle-go="${s.n}"${s.n === current ? ' aria-current="step"' : ""}>
          <span class="cycle-step-n">${s.n}</span><span class="cycle-step-name">${escapeText(s.nimi)}</span>${stateLabel(kind)}</button></li>`;
    }).join("");

    let now;
    if (current > total) {
      now = `<div class="cycle-now is-complete">
          <h3 class="cycle-now-title" tabindex="-1">${escapeText(t("stateSymbolDone"))} ${escapeText(t("cycleRoundDoneTitle", round))}</h3>
          <p class="cycle-now-text">${escapeText(t("cycleRoundDoneText"))}</p>
          <div class="cycle-actions">
            <button type="button" class="button button-secondary" data-cycle-prev>${escapeText(t("cyclePrev"))}</button>
            <button type="button" class="button button-primary" data-cycle-round>${escapeText(t("cycleNewRound", round + 1))}</button>
          </div>
        </div>`;
    } else {
      const s = cycle.steps[current - 1];
      const kuvat = s.kuvaohjeet.map((id) => `<div class="kuvaohje-slot" data-kuvaohje="${escapeText(id)}" data-kuvaohje-taso="4"></div>`).join("");
      now = `<div class="cycle-now">
          <p class="cycle-now-label">${escapeText(t("cycleNowLabel", current, total))}</p>
          <h3 class="cycle-now-title" tabindex="-1">${current} · ${escapeText(s.nimi)}${s.paikka ? `<span class="cycle-place"> · ${escapeText(s.paikka)}</span>` : ""}</h3>
          ${s.tyokalu ? `<p class="cycle-tool"><strong>${escapeText(t("cycleTool"))}</strong> ${escapeText(s.tyokalu)}</p>` : ""}
          ${s.oma ? `<p class="cycle-own"><strong>${escapeText(t("cycleOwn"))}</strong> ${richText(cycle.fill(s.oma))}</p>` : ""}
          ${s.ohje.length ? `<ol class="cycle-instructions">${s.ohje.map((line) => `<li>${richText(cycle.fill(line))}</li>`).join("")}</ol>` : ""}
          ${s.lisa ? `<p class="cycle-extra">${richText(cycle.fill(s.lisa))}</p>` : ""}
          ${copyBlockHtml(s.pohja, cycle.fill)}
          ${kuvat}
          ${s.valmis ? `<p class="cycle-when"><strong>${escapeText(t("cycleWhen"))}</strong> ${richText(cycle.fill(s.valmis))}</p>` : ""}
          ${s.jumissa.length ? `<details class="cycle-stuck"><summary>${escapeText(t("cycleStuck"))}</summary><p class="cycle-stuck-lead">${escapeText(t("cycleStuckLead"))}</p>${stuckTreeHtml(s.jumissa, cycle.fill)}</details>` : ""}
          <div class="cycle-actions">
            <button type="button" class="button button-secondary" data-cycle-prev${current === 1 ? " disabled" : ""}>${escapeText(t("cyclePrev"))}</button>
            <button type="button" class="button button-primary" data-cycle-next>${escapeText(current === total ? t("cycleFinish") : t("cycleNext"))}</button>
          </div>
        </div>`;
    }

    box.innerHTML = `<div class="cycle-head"><h2 id="${headId}">${escapeText(cycle.otsikko || t("cycleHeading"))}</h2><span class="cycle-round">${escapeText(t("cycleRound", round))}</span></div>
      <p class="cycle-lead">${richText(cycle.johdanto || t("cycleLead"))}</p>
      <ol class="cycle-track" aria-label="${escapeText(t("cycleTrackLabel"))}">${track}</ol>
      ${now}`;

    const go = (step, nextRound) => {
      cycleState[week] = { step, round: nextRound || round };
      writeStorage(CYCLE_KEY, cycleState);
      renderCycle(card, true);
      updateProgress();
      const label = step > total ? t("cycleRoundDoneTitle", nextRound || round) : t("cycleLiveStep", step, cycle.steps[step - 1].nimi);
      announce(label);
    };
    box.querySelectorAll("[data-cycle-go]").forEach((btn) => btn.addEventListener("click", () => go(Number(btn.dataset.cycleGo))));
    box.querySelector("[data-cycle-next]")?.addEventListener("click", () => go(current + 1));
    box.querySelector("[data-cycle-prev]")?.addEventListener("click", () => go(Math.max(1, current - 1)));
    box.querySelector("[data-cycle-round]")?.addEventListener("click", () => go(1, round + 1));
    renderKuvaohjeet(box);
    if (focusNow) box.querySelector(".cycle-now-title")?.focus({ preventScroll: false });
  }

  /* ---------- v2.4: joka viikon vakiolohkot (opt-in) ----------
   * P.josJumissa = { otsikko, johdanto, kohdat: [{ kysymys, ohje, pohja, jatko }] }
   *   → sama "Jos et tiedä, mitä tehdä" -puu jokaisessa viikkokortissa. Viimeisen
   *   haaran pitää päättyä ihmiseen (ohjaaja, kanava, viestipohja).
   * P.viikkorutiini = { otsikko, johdanto, kohdat: [{ teksti, milloin }] }
   *   → rastilista joka viikolle. Rastit tallentuvat erikseen eivätkä lasketa
   *   viikon tehtäviin. Viikko voi jättää lohkon pois: viikkoOhjeet[w].rutiini = false
   *   tai viikkoOhjeet[w].josJumissa = false.
   */
  const lostTree = P.josJumissa && Array.isArray(P.josJumissa.kohdat) && P.josJumissa.kohdat.length ? P.josJumissa : null;
  const routine = P.viikkorutiini && Array.isArray(P.viikkorutiini.kohdat) && P.viikkorutiini.kohdat.length ? P.viikkorutiini : null;
  const ROUTINE_KEY = `${SLUG}-rutiini-v1`;
  let routineState = readStorage(ROUTINE_KEY, {});

  function weekFill(week) {
    const g = weekGuidance[week] || {};
    return (value) => String(value ?? "").replace(/\{(viikko|nimi|feature|deliverable|done)\}/g, (_, key) =>
      key === "viikko" ? String(week) : key === "nimi" ? weekTitle(week) : String(g[key] || ""));
  }

  function renderLostTree(card) {
    const week = Number(card.dataset.week);
    const g = weekGuidance[week];
    if (!lostTree || !g || g.josJumissa === false) return;
    let box = card.querySelector("[data-week-lost]");
    if (!box) {
      box = document.createElement("details");
      box.setAttribute("data-week-lost", "");
      const anchor = card.querySelector("[data-week-cycle]") || card.querySelector(".view-section .task-list")?.closest(".view-section") || card.querySelector("[data-week-kicker]");
      anchor?.insertAdjacentElement("afterend", box);
    }
    box.className = "week-lost";
    const fill = weekFill(week);
    box.innerHTML = `<summary>${escapeText(lostTree.otsikko || t("lostHeading"))}</summary>
      ${lostTree.johdanto ? `<p class="week-lost-lead">${richText(fill(lostTree.johdanto))}</p>` : ""}
      ${stuckTreeHtml(lostTree.kohdat, fill)}`;
  }

  function renderRoutine(card) {
    const week = Number(card.dataset.week);
    const g = weekGuidance[week];
    if (!routine || !g || g.rutiini === false) return;
    let box = card.querySelector("[data-week-routine]");
    if (!box) {
      box = document.createElement("section");
      box.setAttribute("data-week-routine", "");
      const tasks = card.querySelector(".task-list")?.closest(".view-section");
      if (tasks) tasks.insertAdjacentElement("afterend", box);
      else card.querySelector(".lesson-instructions")?.insertAdjacentElement("beforebegin", box);
    }
    box.className = "view-section week-routine";
    const saved = routineState[week] || {};
    const done = routine.kohdat.filter((_, i) => saved[i]).length;
    box.innerHTML = `<div class="section-heading-row"><h2>${escapeText(routine.otsikko || t("routineHeading"))}</h2><span class="week-status" data-routine-status>${done} / ${routine.kohdat.length}</span></div>
      ${routine.johdanto ? `<p class="week-routine-lead">${richText(routine.johdanto)}</p>` : ""}
      <div class="task-list">${routine.kohdat.map((k, i) => `<label class="task-row routine-row"><input type="checkbox" data-routine="${week}-${i}"${saved[i] ? " checked" : ""}><span class="task-box" aria-hidden="true"></span><span class="task-text">${k.milloin ? `<strong>${escapeText(k.milloin)}:</strong> ` : ""}${richText(weekFill(week)(k.teksti))}</span></label>`).join("")}</div>`;
    box.querySelectorAll("[data-routine]").forEach((input) => input.addEventListener("change", () => {
      const i = Number(input.dataset.routine.split("-").pop());
      routineState[week] = { ...(routineState[week] || {}), [i]: input.checked };
      writeStorage(ROUTINE_KEY, routineState);
      const count = routine.kohdat.filter((_, j) => routineState[week][j]).length;
      box.querySelector("[data-routine-status]").textContent = `${count} / ${routine.kohdat.length}`;
    }));
  }

  function cycleNote(week) {
    const cycle = cycleFor(week);
    if (!cycle) return "";
    const saved = cycleState[week] || {};
    const step = Math.min(Math.max(1, Number(saved.step) || 1), cycle.steps.length + 1);
    return step > cycle.steps.length ? t("cycleRoundDoneTitle", Math.max(1, Number(saved.round) || 1)) : t("cycleLiveStep", step, cycle.steps[step - 1].nimi);
  }

  function weekTasks(week) {
    return [...document.querySelectorAll(`.week-card[data-week="${week}"] [data-task]`)];
  }
  function weekTitle(week) {
    return (P.viikkoNimet || {})[week] || document.querySelector(`.week-card[data-week="${week}"] .view-title`)?.textContent?.trim() || t("weekFallback", week);
  }
  function currentWeek() {
    const withTasks = weekList.filter((w) => weekTasks(w).length);
    const firstIncomplete = withTasks.find((w) => weekTasks(w).some((box) => !box.checked));
    return firstIncomplete ?? withTasks[withTasks.length - 1] ?? weekList[0];
  }

  /* ---------- näkymänvaihto ---------- */

  const state = { view: "viikko", week: weekList[0] };

  function applyHashFromLocation(initial) {
    const hash = window.location.hash.replace(/^#/, "");
    const weekMatch = hash.match(/^week-(\d+)$/);
    const viewMatch = hash.match(/^view-([a-z]+)$/);
    if (weekMatch && weekList.includes(Number(weekMatch[1]))) {
      state.view = "viikko";
      state.week = Number(weekMatch[1]);
      return true;
    }
    if (viewMatch && VALID_VIEWS.includes(viewMatch[1])) {
      state.view = viewMatch[1];
      return true;
    }
    if (initial) { state.view = "viikko"; state.week = currentWeek(); }
    return false;
  }

  function updateHash() {
    const hash = state.view === "viikko" ? `#week-${state.week}` : `#view-${state.view}`;
    if (window.location.hash !== hash) history.replaceState(null, "", hash);
  }

  function closeMobileSidebar() {
    const sidebar = document.getElementById("sivupalkki");
    if (singleColumn || window.matchMedia("(max-width: 860px)").matches) {
      sidebar?.classList.remove("is-open");
      document.querySelector("[data-sidebar-toggle]")?.setAttribute("aria-expanded", "false");
    }
  }

  function setView(view, week) {
    if (!VALID_VIEWS.includes(view)) return;
    state.view = view;
    if (view === "viikko" && week != null) state.week = Number(week);
    render();
    updateHash();
    closeMobileSidebar();
    document.querySelector(`.view[data-view="${state.view}"]`)?.scrollIntoView?.({ block: "start" });
    document.getElementById("sisalto").scrollTop = 0;
    /* v2.4 (teema): fokus uuden näkymän otsikkoon, jotta ruudunlukija ja
       näppäimistö jatkavat oikeasta kohdasta eikä fokus katoa suljettuun valikkoon. */
    if (focusOnViewChange) {
      const h1 = activeHeading();
      if (h1) {
        if (!h1.hasAttribute("tabindex")) h1.setAttribute("tabindex", "-1");
        h1.focus({ preventScroll: true });
      }
    }
  }
  function activeHeading() {
    return state.view === "viikko"
      ? document.querySelector(`.view[data-view="viikko"] [data-week="${state.week}"] h1`)
      : document.querySelector(`.view[data-view="${state.view}"] h1`);
  }
  function goToWeek(week) { setView("viikko", week); }

  function syncNavActive() {
    document.querySelectorAll("[data-view-nav]").forEach((el) => {
      const active = el.dataset.viewNav === state.view;
      if (active) el.setAttribute("aria-current", "page"); else el.removeAttribute("aria-current");
    });
    document.querySelectorAll("[data-week-link]").forEach((el) => {
      const active = state.view === "viikko" && Number(el.dataset.weekLink) === state.week;
      if (active) el.setAttribute("aria-current", "page"); else el.removeAttribute("aria-current");
    });
  }

  function render() {
    document.querySelectorAll(".view").forEach((el) => { el.hidden = el.dataset.view !== state.view; });
    weekCardEls.forEach((el) => { el.hidden = Number(el.dataset.week) !== state.week; });
    syncNavActive();
    const h1 = activeHeading();
    if (h1) document.title = `${h1.textContent.trim()} – ${P.nimi}`;
  }

  document.querySelectorAll("[data-view-nav], [data-open-view]").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      setView(el.dataset.viewNav || el.dataset.openView);
    });
  });

  document.querySelector("[data-sidebar-toggle]")?.addEventListener("click", (event) => {
    const sidebar = document.getElementById("sivupalkki");
    const open = !sidebar.classList.contains("is-open");
    sidebar.classList.toggle("is-open", open);
    event.currentTarget.setAttribute("aria-expanded", String(open));
  });

  window.addEventListener("hashchange", () => { if (applyHashFromLocation(false)) render(); });

  /* ---------- sivupalkin viikkonavigaatio ---------- */

  function buildWeekNavigation() {
    const holder = document.querySelector("[data-week-links]");
    if (!holder) return;
    holder.classList.toggle("is-compact", compactSidebar);
    const names = P.viikkoNimet || {};
    const phaseStart = {};
    /* Vaiheen ensimmäinen viikko viikot-listan järjestyksessä (toimii myös vuodenvaihteen yli). */
    phases.forEach((phase) => {
      const first = weekList.find((w) => (phase.viikot || []).map(Number).includes(w));
      if (first != null) phaseStart[first] = phase;
    });
    const cur = currentWeek();

    const rows = [];
    weekList.forEach((week) => {
      const starting = phaseStart[week];
      if (starting) {
        rows.push(`<p class="week-nav-phase"><span style="color:var(--phase-${starting.tunnus.toLowerCase()})">${escapeText(starting.tunnus)}</span><span class="week-nav-phase-label">${escapeText(starting.lyhyt || starting.otsikko)}</span></p>`);
      }
      const holiday = holidayWeeks.has(week);
      const isDone = !holiday && weekTasks(week).length > 0 && weekTasks(week).every((box) => box.checked);
      const isCurrent = week === cur;
      const future = weekIndex(week) > weekIndex(cur);
      const phase = phaseOf(week);
      const classes = ["week-row"];
      if (isDone) classes.push("is-done");
      if (isCurrent) classes.push("is-current");
      if (holiday) classes.push("is-holiday");
      if (lockFuture && future && !holiday) classes.push("is-locked");
      if (stateTexts) {
        /* v2.4 (teema): tila näkyvänä tekstinä ja symbolina, ei värinä. Ei
           aria-labelia, jotta ruudunlukija lukee saman kuin näkyy. */
        const kind = holiday ? "holiday" : (isDone ? "done" : (isCurrent ? "current" : "future"));
        rows.push(`<a class="${classes.join(" ")}" href="#week-${week}" data-week-link="${week}">
        <span class="week-row-title">${escapeText(names[week] || t("weekFallback", week))}</span>
        <span class="week-row-n">${escapeText(t("weekNumberShort", week))}</span>
        ${stateLabel(kind)}
      </a>`);
        return;
      }
      const ariaLabel = holiday
        ? t("weekAriaHoliday", week, (names[week] || t("holidayFallback")).toLowerCase())
        : t("weekAria", week, phase ? phase.tunnus : "");
      rows.push(`<a class="${classes.join(" ")}" href="#week-${week}" data-week-link="${week}" aria-label="${escapeText(ariaLabel)}">
        <span class="week-dot" aria-hidden="true">${isDone ? "✓" : (isCurrent ? "●" : "")}</span>
        <span class="week-row-title">${escapeText(names[week] || t("weekFallback", week))}</span>
        <span class="week-row-n">${week}</span>
      </a>`);
    });
    holder.innerHTML = rows.join("\n");
    holder.querySelectorAll("[data-week-link]").forEach((link) => link.addEventListener("click", (event) => {
      event.preventDefault();
      if (link.classList.contains("is-locked")) return;
      goToWeek(Number(link.dataset.weekLink));
    }));
    syncNavActive();
  }

  /* ---------- eteneminen ---------- */

  function updateProgress() {
    const done = taskBoxes.filter((box) => box.checked).length;
    const total = taskBoxes.length;
    const percent = total ? Math.round((done / total) * 100) : 0;
    document.querySelectorAll("[data-progress-number]").forEach((el) => { el.textContent = `${percent}%`; });
    document.querySelectorAll("[data-progress-copy]").forEach((el) => { el.textContent = t("progressCopy", done, total); });
    document.querySelectorAll("[data-progress-bar]").forEach((el) => { el.style.width = `${percent}%`; });

    taskWeekCards.forEach((card) => {
      const boxes = weekTasks(card.dataset.week);
      const complete = boxes.filter((box) => box.checked).length;
      const status = card.querySelector("[data-week-status]");
      if (status) status.textContent = `${complete} / ${boxes.length}`;
    });

    const cur = currentWeek();
    const firstIncomplete = taskBoxes.find((box) => !box.checked);
    document.querySelectorAll("[data-continue]").forEach((button) => {
      const label = button.querySelector("span:first-child");
      if (label) label.textContent = firstIncomplete ? (done ? t("resumeLabel") : (P.aloitusNappi || t("resumeLabel"))) : t("resumeDone");
    });
    const cycleText = cycleNote(cur);
    document.querySelectorAll("[data-continue-note]").forEach((el) => {
      el.textContent = t("resumeNote", cur, weekTitle(cur)) + (cycleText ? ` · ${cycleText}` : "");
    });

    buildWeekNavigation();
  }

  function saveTasks() {
    const state2 = Object.fromEntries(taskBoxes.map((box) => [box.dataset.task, box.checked]));
    writeStorage(STORAGE_KEY, state2);
    updateProgress();
  }
  taskBoxes.forEach((box) => box.addEventListener("change", () => {
    saveTasks();
    if (!box.checked) return;
    const card = box.closest(".week-card");
    const status = card?.querySelector("[data-journal-status]");
    if (status && !journalEntryIsComplete(journalEntries[card.dataset.week])) {
      status.textContent = t("journalReminder");
      status.classList.add("attention");
    }
  }));

  function updateEvidence() {
    const state2 = Object.fromEntries(evidenceBoxes.map((box) => [box.dataset.evidence, box.checked]));
    writeStorage(EVIDENCE_KEY, state2);
    const done = evidenceBoxes.filter((box) => box.checked).length;
    document.querySelectorAll("[data-evidence-count]").forEach((el) => { el.textContent = `${done} / ${evidenceBoxes.length}`; });
  }
  evidenceBoxes.forEach((box) => box.addEventListener("change", updateEvidence));

  document.querySelectorAll("[data-continue]").forEach((button) => button.addEventListener("click", () => goToWeek(currentWeek())));

  /* ---------- projektipäiväkirja ---------- */

  function journalEntryIsComplete(entry = {}) {
    return [entry.work, entry.reason, entry.evidence].every((value) => String(value || "").trim().length > 0);
  }
  function journalEntryHasText(entry = {}) {
    return Object.values(entry).some((value) => String(value || "").trim());
  }

  function updateJournalStatus() {
    let completeCount = 0;
    document.querySelectorAll("[data-week-journal]").forEach((journal) => {
      const week = journal.dataset.weekJournal;
      const entry = journalEntries[week] || {};
      const complete = journalEntryIsComplete(entry);
      if (complete) completeCount += 1;
      const status = journal.querySelector("[data-journal-status]");
      if (status) {
        status.textContent = complete ? t("journalComplete") : (journalEntryHasText(entry) ? t("journalPartial") : t("journalEmpty"));
        status.classList.toggle("complete", complete);
        if (complete) status.classList.remove("attention");
      }
    });
    document.querySelectorAll("[data-journal-summary]").forEach((el) => { el.textContent = t("journalSummary", completeCount, taskWeekCards.length); });
    document.querySelectorAll("[data-journal-count]").forEach((el) => { el.textContent = t("journalCountBig", completeCount, taskWeekCards.length); });
    buildJournalWeeksGrid(completeCount >= 0);
  }

  function buildJournalWeeksGrid() {
    const holder = document.querySelector("[data-journal-weeks]");
    if (!holder) return;
    const cur = currentWeek();
    holder.innerHTML = weekList.filter((w) => !holidayWeeks.has(w)).map((w) => {
      const complete = journalEntryIsComplete(journalEntries[w]);
      const isCurrent = w === cur;
      const cls = ["tile"];
      if (complete) cls.push("is-logged");
      if (isCurrent) cls.push("is-current");
      const status = complete ? t("weekTileLogged") : (isCurrent ? t("weekTileCurrent") : t("weekTileOpen"));
      const symbol = stateTexts ? `<span aria-hidden="true">${escapeText(t(complete ? "tileSymbolLogged" : (isCurrent ? "tileSymbolCurrent" : "tileSymbolOpen")))}</span> ` : "";
      return `<button type="button" class="${cls.join(" ")}" data-week-tile="${w}"><strong>${w}</strong><span>${symbol}${escapeText(status)}</span></button>`;
    }).join("");
    holder.querySelectorAll("[data-week-tile]").forEach((btn) => btn.addEventListener("click", () => goToWeek(Number(btn.dataset.weekTile))));
  }

  function saveJournalField(field) {
    const journal = field.closest("[data-week-journal]");
    if (!journal) return;
    const week = journal.dataset.weekJournal;
    journalEntries[week] = { ...(journalEntries[week] || {}), [field.dataset.journalField]: field.value, updatedAt: new Date().toISOString() };
    writeStorage(JOURNAL_KEY, journalEntries);
    updateJournalStatus();
  }

  function weekMarkdown(week) {
    const entry = journalEntries[week] || {};
    const guide = weekGuidance[week];
    return [
      t("mdWeekHeading", week, weekTitle(week)), "",
      `**${t("mdWeekFeature")}** ${guide?.feature || ""}`, "",
      `**${t("mdWeekDeliverable")}** ${guide?.deliverable || ""}`, "",
      t("mdWork"), String(entry.work || t("mdNotRecorded")), "",
      t("mdReason"), String(entry.reason || t("mdNotRecorded")), "",
      t("mdEvidence"), String(entry.evidence || t("mdNotRecorded")), ""
    ].join("\n");
  }

  function aiLogMarkdown() {
    const entries = readStorage(LOG_KEY, []);
    if (!entries.length) return `${t("aiLogHeading")}\n\n${t("aiLogEmpty")}\n`;
    return [t("aiLogHeading"), "", ...entries.flatMap((entry, index) => [
      `### ${index + 1}. ${entry.tool}`,
      `- **${t("aiLogQuestion")}** ${entry.question}`,
      `- **${t("aiLogUsed")}** ${entry.used}`,
      `- **${t("aiLogReference")}** ${entry.reference || t("aiLogNoReference")}`,
      entry.privacy ? `- **${t("aiLogPrivacyOk")}**` : `- **${t("aiLogPrivacyMissing")}**`,
      ""
    ])].join("\n");
  }

  function downloadMarkdown(filename, documentText) {
    const url = URL.createObjectURL(new Blob([documentText], { type: "text/markdown;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const journalFile = journalCfg.tiedostonimi || "projektipaivakirja.md";
  const journalPath = journalCfg.polku || `project-docs/${journalFile}`;

  function exportJournal() {
    /* viikot-listan järjestyksessä: objektin numeroavaimet kulkisivat numerojärjestyksessä
       ja vuodenvaihteen yli menevä jakso sekoittuisi (v2.4). */
    const weeks = weekList.filter((w) => weekGuidance[w]);
    const documentText = [
      `# ${t("mdJournalTitle", P.nimi)}`, "",
      t("mdJournalLead", journalPath), "",
      ...weeks.map((week) => weekMarkdown(week)),
      aiLogMarkdown()
    ].join("\n");
    downloadMarkdown(journalFile, documentText);
  }

  function initJournal() {
    document.querySelectorAll("[data-journal-field]").forEach((field) => {
      const week = field.closest("[data-week-journal]")?.dataset.weekJournal;
      field.value = journalEntries[week]?.[field.dataset.journalField] || "";
      field.addEventListener("input", () => saveJournalField(field));
    });
    document.querySelectorAll("[data-export-week]").forEach((button) => button.addEventListener("click", () => {
      const week = button.dataset.exportWeek;
      downloadMarkdown(t("mdWeekFile", week), `${t("mdWeekFileTitle", P.nimi, week)}\n\n${weekMarkdown(week)}`);
    }));
    document.querySelectorAll("[data-export-journal]").forEach((button) => button.addEventListener("click", exportJournal));
    updateJournalStatus();
  }

  /* ---------- suunnitelmadokumentti ---------- */

  function planFilled(fieldName) { return String(planData[fieldName] || "").trim().length > 0; }
  function planValue(fieldName, fallback = UI.planEmptyValue) { return planFilled(fieldName) ? String(planData[fieldName]).trim() : fallback; }

  function updatePlanStatus() {
    if (!plan) return;
    const required = plan.pakolliset || [];
    const done = required.filter(planFilled).length;
    const text = done === 0 ? t("planNotStarted") : (done < required.length ? t("planPartial", done, required.length) : t("planDone"));
    const complete = done === required.length;
    document.querySelectorAll("[data-plan-status]").forEach((el) => { el.textContent = text; el.classList.toggle("complete", complete); });
    document.querySelectorAll("[data-plan-status-meta]").forEach((el) => { el.textContent = complete ? t("planMetaDone") : (done === 0 ? t("planMetaEmpty") : `${done} / ${required.length}`); });
  }

  function planMarkdown() {
    if (!plan?.markdown) return "";
    return plan.markdown({ arvo: planValue, onTäytetty: planFilled, raaka: planData, pvm: new Date().toLocaleDateString(t("dateLocale")) });
  }

  function initPlan() {
    const form = document.querySelector("[data-plan-form]");
    if (!form || !plan) return;
    form.addEventListener("submit", (event) => event.preventDefault());
    form.querySelectorAll("[data-plan-field]").forEach((field) => {
      field.value = planData[field.dataset.planField] || "";
      field.addEventListener("input", () => {
        planData[field.dataset.planField] = field.value;
        writeStorage(PLAN_KEY, planData);
        updatePlanStatus();
      });
    });
    document.querySelectorAll("[data-plan-export]").forEach((button) => button.addEventListener("click", () => downloadMarkdown(plan.tiedostonimi || "suunnitelma.md", planMarkdown())));
    updatePlanStatus();
  }

  /* ---------- AI-loki ---------- */

  function renderLog() {
    aiLog = readStorage(LOG_KEY, []);
    document.querySelectorAll("[data-log-count]").forEach((el) => { el.textContent = t("logCount", aiLog.length); });
    const logHolder = document.querySelector("[data-ai-entries]");
    if (!logHolder) return;
    if (!aiLog.length) { logHolder.innerHTML = `<p class="empty-state">${escapeText(t("logEmptyState"))}</p>`; return; }
    logHolder.innerHTML = aiLog.map((entry, index) => `
      <article class="log-entry">
        <strong>${escapeText(entry.tool)}</strong>
        <span>${escapeText(entry.question)}</span>
        <span>${escapeText(entry.used)}<small class="log-reference">${escapeText(t("logReferencePrefix"))} ${escapeText(entry.reference || t("aiLogNoReference"))}</small></span>
        <button type="button" data-remove-log="${index}" aria-label="${escapeText(t("logRemoveAria"))}">${escapeText(t("logRemove"))}</button>
      </article>`).join("");
    logHolder.querySelectorAll("[data-remove-log]").forEach((button) => button.addEventListener("click", () => {
      aiLog.splice(Number(button.dataset.removeLog), 1);
      writeStorage(LOG_KEY, aiLog);
      renderLog();
    }));
  }

  document.querySelector("[data-ai-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    aiLog.push({
      tool: form.get("tool"), question: form.get("question"), used: form.get("used"),
      reference: form.get("reference"), privacy: form.get("privacy") === "on"
    });
    writeStorage(LOG_KEY, aiLog);
    event.currentTarget.reset();
    renderLog();
  });

  document.querySelector("[data-export-log]")?.addEventListener("click", () => {
    downloadMarkdown(t("aiLogFile"), `${t("aiLogFileTitle", P.nimi)}\n\n${aiLogMarkdown().replace(new RegExp(`^${t("aiLogHeading")}\\n\\n`), "")}`);
  });

  /* ---------- galleria ---------- */

  function updateGallery() {
    const gallery = document.querySelector("[data-gallery]");
    const empty = document.querySelector("[data-gallery-empty]");
    if (!gallery || !empty) return;
    empty.hidden = gallery.querySelector(".gallery-card") != null;
  }

  /* ---------- nollaus ---------- */

  document.querySelector("[data-reset]")?.addEventListener("click", () => {
    const planName = plan?.otsikko ? `, ${plan.otsikko}` : "";
    const files = plan?.tiedostonimi ? ` ja ${plan.tiedostonimi}` : "";
    if (!window.confirm(t("resetConfirm", planName, files))) return;
    [STORAGE_KEY, EVIDENCE_KEY, LOG_KEY, JOURNAL_KEY, PLAN_KEY, CYCLE_KEY].forEach((key) => { try { localStorage.removeItem(key); } catch (_) { /* ei tallennusta */ } });
    journalEntries = {};
    planData = {};
    cycleState = {};
    routineState = {};
    try { localStorage.removeItem(ROUTINE_KEY); } catch (_) { /* ei tallennusta */ }
    taskWeekCards.forEach((card) => { renderCycle(card, false); renderRoutine(card); });
    taskBoxes.forEach((box) => { box.checked = false; });
    evidenceBoxes.forEach((box) => { box.checked = false; });
    document.querySelectorAll("[data-journal-field]").forEach((field) => { field.value = ""; });
    document.querySelectorAll("[data-plan-field]").forEach((field) => { field.value = ""; });
    renderLog();
    updateJournalStatus();
    updatePlanStatus();
    updateProgress();
    updateEvidence();
  });

  /* ---------- käynnistys ---------- */

  taskWeekCards.forEach((card) => { renderCycle(card, false); renderLostTree(card); renderRoutine(card); });
  renderKuvaohjeet(document);
  applyHashFromLocation(true);
  buildWeekNavigation();
  initJournal();
  initPlan();
  updateProgress();
  updateEvidence();
  renderLog();
  updateGallery();
  renderGlossary();
  render();
  updateHash();
  window.addEventListener("resize", () => { if (window.matchMedia("(min-width: 861px)").matches) closeMobileSidebar(); });
})();

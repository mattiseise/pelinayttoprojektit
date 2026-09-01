/*
 * Näyttöprojekti – geneerinen moottori (kaksipalstainen layout, v2).
 *
 * TÄTÄ TIEDOSTOA EI MUOKATA PROJEKTIKOHTAISESTI.
 * Kaikki projektikohtainen sisältö tulee sisalto.js:stä (window.NAYTTOPROJEKTI).
 * Jos jotain pitää muokata tässä, se on merkki siitä että sisalto.js:n
 * skeemaan tarvitaan uusi kenttä — korjaa skilliin, ei yksittäiseen projektiin.
 *
 * Rakenne, jota tämä moottori odottaa index.html:ltä, on kuvattu tarkasti
 * tiedostossa /root/work/layout-rakenne.md (tämän layoutuudistuksen pilotti).
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
    resetConfirm: (plan, files) => `Nollataanko tehtävät, projektipäiväkirja${plan}, rastit ja AI-loki tästä selaimesta? Lataa projektipäiväkirja${files} ensin, jos haluat säilyttää vastaukset.`
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
  const weekList = (P.viikot || []).map(Number).sort((a, b) => a - b);
  const phases = P.vaiheet || [];
  const compactSidebar = Boolean(P.tiivisSivupalkki);
  const lockFuture = Boolean(P.lukitseTulevat);

  function escapeText(value) {
    const div = document.createElement("div");
    div.textContent = value == null ? "" : value;
    return div.innerHTML;
  }

  function readStorage(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch (_) { return fallback; }
  }
  function writeStorage(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (_) { /* Sivusto toimii myös ilman pysyvää tallennusta. */ }
  }

  const VALID_VIEWS = ["kaytto", "toimeksianto", "tyotapa", "galleria", "viikko", "suunnitelma", "paivakirja", "ailoki", "naytto"];
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
      kicker.querySelector("[data-week-kicker-text]").textContent = guide.feature || "";
      kicker.hidden = false;
    }

    const quote = card.querySelector("[data-week-quote]");
    if (quote && guide.excerpt) {
      quote.querySelector("[data-quote-text]").textContent = `"${guide.excerpt}"`;
      quote.hidden = false;
    }

    const connection = card.querySelector("[data-week-connection]");
    if (connection) {
      connection.innerHTML = `<strong>${escapeText(framing.connectionLabel || t("connectionLabel"))}</strong> ${escapeText(guide.connection || "")}`;
      connection.hidden = false;
    }

    const whyGrid = card.querySelector("[data-week-why]");
    if (whyGrid) {
      whyGrid.querySelector("[data-why-deliverable-label]").textContent = framing.deliverableLabel || t("deliverableLabel");
      whyGrid.querySelector("[data-why-deliverable-text]").textContent = guide.deliverable || "";
      whyGrid.querySelector("[data-why-why-text]").textContent = guide.why || "";
      whyGrid.hidden = false;
    }

    const skills = card.querySelector("[data-week-skills]");
    if (skills && (guide.skills || []).length) {
      skills.querySelector("[data-skills-label]").textContent = framing.skillsLabel || t("skillsLabel");
      fillList(skills.querySelector("[data-skills-list]"), guide.skills, (s) => `<li>${escapeText(s)}</li>`);
      skills.hidden = false;
    }

    const steps = guide.steps || [];
    card.querySelector("[data-lesson-label]").textContent = t("stepsLead", steps.length);
    fillList(card.querySelector("[data-lesson-list]"), steps, ([title, text], i) =>
      `<li><span class="step-n">${i + 1}</span><span><strong>${escapeText(title)}</strong> ${text}</span></li>`);

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
        <div><p class="help-label">${escapeText(t("helpActionsLabel"))}</p><ol>${(h.actions || []).map((a) => `<li>${escapeText(a)}</li>`).join("")}</ol></div>
        <div><p class="help-label">${escapeText(t("helpCodeLabel"))}</p><pre><code>${escapeText(h.code)}</code></pre></div>
        <p class="impl-help-test"><strong>${escapeText(t("helpTestLabel"))}</strong> ${escapeText(h.test)}</p>
        ${helpImages}${helpLinks}
        <p class="impl-help-note" style="font-size:12px;color:var(--meta)">${escapeText(t("helpNote"))}</p>`;
      help.hidden = false;
    }

    const days = card.querySelector("[data-week-days]");
    if (days && (guide.paivat || []).length) {
      days.querySelector(".section-label").textContent = t("dayRhythmLabel");
      fillList(days.querySelector("[data-day-grid]"), guide.paivat, ([nimi, teksti], i) =>
        `<div class="card"><div class="day-n">${escapeText(t("dayLabel", i + 1))}</div><strong>${escapeText(nimi)}</strong><p>${escapeText(teksti)}</p></div>`);
      days.hidden = false;
    }

    const checkpoint = card.querySelector(".checkpoint");
    if (checkpoint) checkpoint.textContent = guide.done || "";

    const record = card.querySelector("[data-journal-record]");
    if (record) record.innerHTML = `<strong>${escapeText(t("journalRecordPrefix"))}</strong> ${escapeText(guide.record || "")}`;
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
    if (window.matchMedia("(max-width: 860px)").matches) {
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
    const h1 = document.querySelector(`.view[data-view="${state.view}"] h1`);
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
    phases.forEach((phase) => { if ((phase.viikot || []).length) phaseStart[Math.min(...phase.viikot)] = phase; });
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
      const future = week > cur;
      const phase = phaseOf(week);
      const classes = ["week-row"];
      if (isDone) classes.push("is-done");
      if (isCurrent) classes.push("is-current");
      if (holiday) classes.push("is-holiday");
      if (lockFuture && future && !holiday) classes.push("is-locked");
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
    document.querySelectorAll("[data-continue-note]").forEach((el) => { el.textContent = t("resumeNote", cur, weekTitle(cur)); });

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
      return `<button type="button" class="${cls.join(" ")}" data-week-tile="${w}"><strong>${w}</strong><span>${escapeText(status)}</span></button>`;
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
    const weeks = Object.keys(weekGuidance);
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
    document.querySelectorAll("[data-plan-status-meta]").forEach((el) => { el.textContent = complete ? "valmis" : (done === 0 ? "päivittyy" : `${done} / ${required.length}`); });
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
    [STORAGE_KEY, EVIDENCE_KEY, LOG_KEY, JOURNAL_KEY, PLAN_KEY].forEach((key) => localStorage.removeItem(key));
    journalEntries = {};
    planData = {};
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

  applyHashFromLocation(true);
  buildWeekNavigation();
  initJournal();
  initPlan();
  updateProgress();
  updateEvidence();
  renderLog();
  updateGallery();
  render();
  updateHash();
  window.addEventListener("resize", () => { if (window.matchMedia("(min-width: 861px)").matches) closeMobileSidebar(); });
})();

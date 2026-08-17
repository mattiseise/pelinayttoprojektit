(function () {
  "use strict";

  const STORAGE_KEY = "kahvilakoodi-progress-v1";
  const EVIDENCE_KEY = "kahvilakoodi-evidence-v1";
  const LOG_KEY = "kahvilakoodi-ai-log-v1";
  const taskBoxes = [...document.querySelectorAll("[data-task]")];
  const evidenceBoxes = [...document.querySelectorAll("[data-evidence]")];
  const weekCards = [...document.querySelectorAll(".week-card")];

  function readStorage(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch (_) { return fallback; }
  }

  function writeStorage(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (_) { /* Sivusto toimii myös ilman pysyvää tallennusta. */ }
  }

  const savedTasks = readStorage(STORAGE_KEY, {});
  taskBoxes.forEach((box) => { box.checked = Boolean(savedTasks[box.dataset.task]); });

  const savedEvidence = readStorage(EVIDENCE_KEY, {});
  evidenceBoxes.forEach((box) => { box.checked = Boolean(savedEvidence[box.dataset.evidence]); });

  function isoWeek(date) {
    const copy = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    copy.setUTCDate(copy.getUTCDate() + 4 - (copy.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(copy.getUTCFullYear(), 0, 1));
    return Math.ceil((((copy - yearStart) / 86400000) + 1) / 7);
  }

  function buildWeekNavigation() {
    const holder = document.querySelector("[data-week-links]");
    if (!holder) return;
    const weekNames = {
      34: "Käynnistys ja tarve",
      35: "Rajaus ja suunnitelma",
      36: "Ensimmäinen pelipolku",
      37: "Tuotedata ja tilaukset",
      38: "Pisteet, aika ja palaute",
      39: "Vaikeus ja pelitilat",
      40: "Tallennus ja tietoturva",
      41: "Asiakaskatselmointi",
      42: "Syysloma",
      43: "Palautemuutos",
      44: "Käyttöliittymä",
      45: "Järjestelmällinen testaus",
      46: "Koodin laatu",
      47: "Julkaisuehdokas",
      48: "Versio 1.0",
      49: "Näyttö ja luovutus"
    };
    for (let week = 34; week <= 49; week += 1) {
      const link = document.createElement("a");
      link.href = `#week-${week}`;
      link.className = "week-link";
      link.dataset.weekLink = String(week);
      link.innerHTML = `<span class="week-nav-node">${week}</span><span class="week-nav-copy"><small>Viikko ${week}</small><strong>${weekNames[week]}</strong></span><span class="week-nav-check" aria-hidden="true">✓</span>`;
      link.setAttribute("aria-label", week === 42 ? "Viikko 42, syysloma" : `Viikko ${week}`);
      if (week === 42) link.classList.add("holiday");
      holder.appendChild(link);
    }
  }

  function updateProgress() {
    const done = taskBoxes.filter((box) => box.checked).length;
    const total = taskBoxes.length;
    const percent = total ? Math.round((done / total) * 100) : 0;
    document.querySelectorAll("[data-progress-number]").forEach((el) => { el.textContent = `${percent}%`; });
    document.querySelectorAll("[data-progress-copy]").forEach((el) => { el.textContent = `${done} / ${total} tehtävää valmiina`; });
    document.querySelectorAll("[data-progress-bar]").forEach((el) => { el.style.width = `${percent}%`; });
    document.querySelectorAll(".progress-ring").forEach((el) => { el.style.setProperty("--progress", `${percent * 3.6}deg`); });

    weekCards.forEach((card) => {
      const boxes = [...card.querySelectorAll("[data-task]")];
      const complete = boxes.filter((box) => box.checked).length;
      card.querySelector(".week-status").textContent = `${complete} / ${boxes.length}`;
      card.classList.toggle("complete", complete === boxes.length);
      const weekLink = document.querySelector(`[data-week-link="${card.dataset.week}"]`);
      if (weekLink) weekLink.classList.toggle("done", complete === boxes.length);
    });

    const firstIncomplete = taskBoxes.find((box) => !box.checked);
    document.querySelectorAll("[data-continue]").forEach((button) => {
      button.textContent = firstIncomplete ? (done ? "Jatka seuraavasta tehtävästä" : "Aloita oppimispolku") : "Kaikki tehtävät valmiina";
    });
  }

  function saveTasks() {
    const state = Object.fromEntries(taskBoxes.map((box) => [box.dataset.task, box.checked]));
    writeStorage(STORAGE_KEY, state);
    updateProgress();
  }

  taskBoxes.forEach((box) => box.addEventListener("change", saveTasks));

  function updateEvidence() {
    const state = Object.fromEntries(evidenceBoxes.map((box) => [box.dataset.evidence, box.checked]));
    writeStorage(EVIDENCE_KEY, state);
    const done = evidenceBoxes.filter((box) => box.checked).length;
    const count = document.querySelector("[data-evidence-count]");
    if (count) count.textContent = `${done} / ${evidenceBoxes.length}`;
  }
  evidenceBoxes.forEach((box) => box.addEventListener("change", updateEvidence));

  function continuePath() {
    const firstIncomplete = taskBoxes.find((box) => !box.checked);
    const target = firstIncomplete ? firstIncomplete.closest(".week-card") : document.querySelector("#week-49");
    if (!target) return;
    target.open = true;
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => firstIncomplete?.focus({ preventScroll: true }), 500);
  }
  document.querySelectorAll("[data-continue]").forEach((button) => button.addEventListener("click", continuePath));
  document.querySelectorAll("[data-print]").forEach((button) => button.addEventListener("click", () => window.print()));

  document.querySelector("[data-reset]")?.addEventListener("click", () => {
    if (!window.confirm("Nollataanko tehtävät, näytön todisteet ja AI-loki tässä selaimessa?")) return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(EVIDENCE_KEY);
    localStorage.removeItem(LOG_KEY);
    taskBoxes.forEach((box) => { box.checked = false; });
    evidenceBoxes.forEach((box) => { box.checked = false; });
    renderLog();
    updateProgress();
    updateEvidence();
  });

  let aiLog = readStorage(LOG_KEY, []);
  const logHolder = document.querySelector("[data-ai-entries]");
  const logCount = document.querySelector("[data-log-count]");

  function escapeText(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
  }

  function renderLog() {
    aiLog = readStorage(LOG_KEY, []);
    if (logCount) logCount.textContent = `${aiLog.length} ${aiLog.length === 1 ? "merkintä" : "merkintää"}`;
    if (!logHolder) return;
    if (!aiLog.length) {
      logHolder.innerHTML = '<p class="empty-state">Ei merkintöjä vielä.</p>';
      return;
    }
    logHolder.innerHTML = aiLog.map((entry, index) => `
      <article class="log-entry">
        <strong>${escapeText(entry.tool)}</strong>
        <span>${escapeText(entry.question)}</span>
        <span>${escapeText(entry.used)}</span>
        <span>${escapeText(entry.checked)}</span>
        <button type="button" data-remove-log="${index}" aria-label="Poista lokimerkintä">Poista</button>
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
    aiLog.push({ tool: form.get("tool"), question: form.get("question"), used: form.get("used"), checked: form.get("checked") });
    writeStorage(LOG_KEY, aiLog);
    event.currentTarget.reset();
    renderLog();
  });

  function markCurrentWeek() {
    const now = new Date();
    if (now.getFullYear() !== 2026) return;
    const current = isoWeek(now);
    if (current < 34 || current > 49) return;
    document.querySelector(`#week-${current}`)?.classList.add("current");
    document.querySelector(`[data-week-link="${current}"]`)?.classList.add("current");
  }

  function setupReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: "0px 0px -30px" });
    items.forEach((item) => observer.observe(item));
  }

  buildWeekNavigation();
  markCurrentWeek();
  updateProgress();
  updateEvidence();
  renderLog();
  setupReveal();
})();

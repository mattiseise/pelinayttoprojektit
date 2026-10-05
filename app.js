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
 * v2.8: selkeys (opt-in, oletuksena pois päältä; muiden projektien ulkoasu ei muutu):
 *   - linkkimerkinnät tekstissä, kun P.selkeys, P.perusohjeet tai P.tiedostokortit on käytössä:
 *     [[toimeksianto]] ja muut näkymät (myös [[toimeksianto#ankkuri]]), [[vk 41]], [[ohje:commit]],
 *     [[tiedosto:kysymykset]], [[kuvaohje:python-asennus]] (avaa dialogin), [[pohja:kysymyslista]],
 *     [[github:actions]] (perusosoite P.repo), [teksti](https://…) ja [[kohde|oma teksti]].
 *     Sama merkintä toimii index.html:n staattisessa tekstissä. Ulkoinen linkki avautuu uuteen
 *     välilehteen, ja siitä kerrotaan merkillä ↗ ja ruudunlukijalle. Linkki vie kohteeseen,
 *     siirtää fokuksen kohteen otsikkoon ja tuo kohteen viereen Palaa-napin.
 *   - osatehtävän objektimuoto { otsikko, missa, tee, naet, koodi? }: rastin selitteenä on vain
 *     otsikko, ja muu teksti on labelin ulkopuolella aria-describedby-kytkettynä. Vanhat muodot
 *     ("teksti" ja ["Otsikko", "teksti"]) renderöidään kuten ennen.
 *   - P.perusohjeet = [{ tunnus, otsikko, johdanto?, vaiheet: [{ missa, tee, naet, koodi? }],
 *     kuvaohjeet: [ids] }] → Työtapa-näkymän osio "Näin teet", ankkurit #ohje-<tunnus>.
 *   - P.tiedostokortit = { tunnus: { polku, milloin, mitaKirjoitetaan, esimerkki, eiRiita,
 *     commitViesti } } → Työtapa-näkymän osio "Dokumentit", ankkurit #tiedosto-<tunnus>.
 *   - P.dokumentitRepossa: Suunnitelma-, Päiväkirja- ja AI-loki-näkymissä näytetään lomakkeen
 *     sijaan dokumentin tiedostokortti, ja viikon päiväkirjaosio ohjaa tiedostoon. Jos selaimen
 *     muistissa on vanhaa tekstiä, näkymän alkuun tulee nappi, joka lataa kaiken yhtenä
 *     tiedostona (P.siirtyma kertoo kohdetiedostot ja otsikot). Tehtävän `siirtyma: true` saa
 *     saman napin; tyhjällä muistilla tehtävä ohitetaan. Näyttömatriisi pysyy ennallaan.
 *   - viikon pohjan `tunnus` antaa sille ankkurin #pohja-<tunnus>. Toteutusavun `code` saa
 *     kopiointinapin, kun P.selkeys on käytössä.
 *
 * v2.7: yhtenäiset viikko-ohjeet (opt-in, P.yhtenaisetViikot). Jokainen viikkokortti saa saman
 *   lukujärjestyksen: vaihepolku (P.vaiheet), "Miten tämän viikon asiat liittyvät
 *   kokonaisprojektiin" (connection) ja viikon tavoite (feature), työvaiheet (tehtavat),
 *   avattavat apuosiot (kuvaohjeet, viikkorutiini, päivärytmi, toteutusapu), yksi viikon
 *   lopputarkistus (done + Näytä-rivi) ja avattava osaamiskuvaus (skills + kalibrointi).
 *   Rakenne kootaan index.html:n nykyisistä elementeistä, joten työpaketti ja tarkistus
 *   lukevat samaa lähdettä. Staattisesti valmiiksi rakennettua korttia (.project-connection)
 *   ei kosketa. [data-roadmap] Näin käytät sivua -näkymässä renderöi vaihekuvauksen
 *   (vaiheet[].kuvaus, P.vaihekuva). [data-open-week] avaa viikon alusta. Tehtävän
 *   `tyosykli: true` lisää napin, joka avaa viikon työsyklin. lopputulos.naytaKuvaus: false
 *   piilottaa tavoitekuvan johdannon, kun aloitus kertoo saman jo.
 * v2.6: projektin tavoitekuva (opt-in, P.lopputulos). Näin käytät sivua -näkymän alkuun
 *   rakennetaan [data-goal]-lohko: otsikko, lyhyt kuvaus, luonnoskuva valmiista työstä
 *   numeroiduin kehyksin ja samat kohdat tekstinä, aloitusnappi. Ensimmäisellä avauksella
 *   (ei hashia, ei rasteja) sivu avautuu tähän näkymään eikä viikkoon 1. Muilla projekteilla
 *   mikään ei muutu.
 * v2.5: pilkottu tehtävänanto (opt-in, viikkoOhjeet[w].tehtavat). index.html:n tehtävärivi
 *   antaa tehtävän otsikon; app.js rakentaa siitä tehtäväkortin, jossa on miksi, tehtävän
 *   omat sanat, rastitettavat osatehtävät, valmis kun, tallenna, kalibrointi ja tehtävän
 *   oma toteutusapu. Tehtävä valmistuu, kun kaikki osat on rastittu. Vain nykyinen tehtävä
 *   on auki. Viikon tausta (connection, deliverable/why, skills) kootaan yhteen suljettuun
 *   lohkoon ja Näin etenet -osio jää pois, jos viikolla ei ole steps-listaa. Vanhat rastit
 *   siirtyvät osatehtäviin kerran (perii-kenttä kertoo, mistä vanhasta tehtävästä).
 * v2.4.2: kuvaohjeen "Avaa kuva isona" näkyy vain, kun kuva on olemassa (paikanpitäjää ja
 *   latautumatonta kuvaa ei avata). Teeman latausnapit rivittyvät kapealla näytöllä.
 * v2.4.1: alatunniste ja AI-muokattu-merkki näkyvät kaikissa näkymissä. render() piilottaa
 *   vain .view[data-view]-näkymät, ja app.js siirtää vanhan sivun alatunnisteen
 *   sisältöpalstan (.view-main) loppuun.
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
    helpTipsLabel: "Hyvä tietää",
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
    cycleBack: (n) => `← Palaa työvaiheeseen ${n}`,
    /* v2.8: P.repo = "oma" → opiskelija tallentaa oman repositorynsa osoitteen selaimeen. */
    ownRepoTitle: "Oman repositorysi osoite",
    ownRepoLead: "Sivun GitHub-linkit vievät omaan repositoryysi. Kirjoita sen osoite kerran. Osoite tallentuu vain tähän selaimeen.",
    ownRepoHelp: "Löydät osoitteen GitHubista: avaa oma repositorysi ja kopioi osoite selaimen osoiteriviltä. Esimerkki: https://github.com/tunnus/projekti",
    ownRepoLabel: "Repositoryn osoite",
    ownRepoError: "Osoitteen pitää alkaa https://github.com/, ja siinä pitää olla tunnus ja repositoryn nimi.",
    ownRepoSave: "Tallenna ja avaa linkki",
    ownRepoSaveOnly: "Tallenna",
    ownRepoCancel: "Peruuta",
    ownRepoCurrent: "Oma repositorysi:",
    ownRepoMissing: "Oman repositorysi osoitetta ei ole vielä tallennettu tähän selaimeen.",
    ownRepoSet: "Tallenna osoite",
    ownRepoChange: "Vaihda osoite",
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
    /* v2.6: projektin tavoitekuva (P.lopputulos). */
    goalLabel: "Projektin tavoite",
    goalTitle: (nimi) => `Tältä valmis ${nimi} näyttää`,
    goalListLabel: "Valmiissa työssä",
    goalNote: "Kuva on luonnos, ei malli, jota pitää kopioida. Ulkoasusta päätät itse, mutta numeroidut asiat kuuluvat valmiiseen työhön.",
    goalPlaceholder: "valmiin työn luonnoskuva",
    goalBrief: "Lue toimeksianto",
    /* v2.4: joka viikon vakiolohkot (P.josJumissa, P.viikkorutiini). */
    lostHeading: "Jos et tiedä, mitä tehdä",
    routineHeading: "Viikkorutiini",
    /* v2.5: pilkottu tehtävänanto (viikkoOhjeet[w].tehtavat). */
    tasksLead: "Tee tehtävät järjestyksessä. Rastita osatehtävä heti, kun olet tehnyt sen. Tehtävä on valmis, kun kaikki sen osat on rastittu.",
    taskNumber: (i, n) => `Tehtävä ${i} / ${n}`,
    taskWhy: "Miksi:",
    taskWords: "Sanat tässä tehtävässä",
    taskStepsLabel: (title) => `Osatehtävät: ${title}`,
    taskDone: "Valmis kun:",
    taskSave: "Tallenna työnäyte:",
    taskProgress: (done, total) => `${done} / ${total}`,
    taskComplete: "Valmis",
    taskHelpTitle: "Tarvitsen apua tähän tehtävään",
    taskHelpNote: "kokeile ensin itse",
    taskOpenAll: "Avaa kaikki tehtävät",
    taskOpenCurrent: "Näytä vain nykyinen tehtävä",
    taskLiveDone: (i) => `Tehtävä ${i} valmis.`,
    weekBackground: "Miksi tämä viikko tehdään · tausta ja arvioitavat taidot",
    resumeTask: (i, n) => `tehtävä ${i} / ${n}`,
    /* v2.7: yhtenäiset viikko-ohjeet (P.yhtenaisetViikot). */
    phasePathLabel: "Projektin vaiheet",
    phaseLink: (n, name) => `${n}. ${name}`,
    projectConnectionHeading: "Miten tämän viikon asiat liittyvät kokonaisprojektiin",
    weekGoalHeading: "Viikon tavoite",
    weekFinishHeading: "Viikon lopputarkistus",
    weekFinishCheck: "Toiminta on tarkistettu, kun",
    weekFinishEvidence: "Työnäyte talteen",
    weekSkillsSummary: "Mitä osaamista viikon työ osoittaa?",
    dayRhythmSummary: "Viikon päivärytmi · avaa tarvittaessa",
    kuvaohjeetSummary: "Kuvaohjeet · avaa tarvittaessa",
    routineSummary: "Viikkorutiini",
    taskOpenWorkflow: "Käytä työsykliä tämän muutoksen tekemiseen →",
    cycleSummary: "Työsykli · yksi toteutusmuutos kerrallaan",
    tasksHeading: "",
    roadmapHeading: (n) => `Projektin ${n} vaihetta`,
    roadmapWeeks: (first, last, dateless) => `${dateless ? "työviikot" : "viikot"} ${first === last ? first : `${first}–${last}`}`,
    roadmapOpen: "Avaa vaiheen ensimmäinen viikko →",
    roadmapFigureCaption: "Havainnekuva: vaiheet ja niiden tulokset. Tarkat työvaiheet ovat viikkosivuilla.",
    /* v2.8: selkeys (P.selkeys, P.perusohjeet, P.tiedostokortit, P.dokumentitRepossa). */
    linkNewTab: "avautuu uuteen välilehteen",
    linkWeek: (w) => `viikko ${w}`,
    linkGithub: (p) => `GitHub: ${p}`,
    linkKuvaohje: "kuvaohje",
    linkReturn: (label) => `← Palaa: ${label}`,
    linkReturnWeek: (w, i) => `viikko ${w}${i ? `, työvaihe ${i}` : ""}`,
    substepWhere: "Missä:",
    substepDo: "Tee:",
    substepSee: "Näet nyt:",
    substepCode: "Kopioi tämä",
    basicsHeading: "Näin teet",
    basicsLead: "",
    docsHeading: "Dokumentit",
    docsLead: "",
    docFile: "Tiedosto",
    docWhen: "Milloin",
    docWhat: "Mitä kirjoitetaan",
    docExample: "✓ Malliesimerkki toisesta aiheesta · älä kopioi sisältöä",
    docNotEnough: "✗ Tämä on liian vähän",
    docCommit: "Commit-viesti: kopioi tämä",
    migrateLead: "Selaimen muistissa on tekstiä, jonka kirjoitit sivun lomakkeisiin. Nappi lataa kaiken yhtenä tiedostona, myös muiden näkymien tekstit, joten paina sitä vain kerran. Tiedostossa lukee, mihin dokumenttiin ja minkä otsikon alle kukin teksti kuuluu. Mitään ei poisteta.",
    migrateButton: "Lataa kaikki, mitä olet kirjoittanut tälle sivulle",
    migrateFileNote: (file) => `Tiedosto ${file} tallentuu Lataukset-kansioon.`,
    migrateEmpty: "Tämän selaimen muistissa ei ole tekstiä, jonka olisit kirjoittanut sivun lomakkeisiin. Tätä työvaihetta ei tarvitse tehdä. Jos kirjoitit toisella koneella, avaa sivu siellä.",
    migrateEmptyPartial: "Tämän selaimen muistissa ei ole tekstiä, jonka olisit kirjoittanut sivun lomakkeisiin. Tekstin siirron osat on rastitettu valmiiksi. Tee muut osat. Jos kirjoitit toisella koneella, avaa sivu siellä.",
    migrateTitle: (nimi) => `# ${nimi}: tekstit, jotka kirjoitit sivulle`,
    migrateIntro: (pvm) => `Ladattu ${pvm}. Liitä jokainen kohta siihen tiedostoon ja sen otsikon alle, jotka kohdan otsikossa mainitaan. Jos sama teksti on jo tiedostossa, älä liitä sitä uudelleen.`,
    migrateFileHeading: (n, polku) => `## ${n}. Tiedosto ${polku}`,
    migrateUnder: (otsikko) => `### Otsikon "${otsikko}" alle`,
    migrateUnderField: (otsikko, kentta) => `### Otsikon "${otsikko}" alle, kohtaan "${kentta}"`,
    migrateLogEntry: (n) => `### Merkintä ${n}`,
    journalRepoCopy: "Viikon otsikko tiedostossa: kopioi tämä hakuun"
  };
  /* v2.7: yhtenäisissä viikko-ohjeissa sivun tehtävä on työvaihe (GitHub-issue tai muu
     toteutustehtävä on eri asia). Projekti voi korvata nämäkin tekstit-objektilla. */
  const UI_YHTENAINEN = {
    tasksHeading: "Viikon työvaiheet",
    progressCopy: (done, total) => `${done} / ${total} työvaihetta`,
    resumeDone: "Kaikki työvaiheet valmiina",
    resumeTask: (i, n) => `työvaihe ${i} / ${n}`,
    tasksLead: "Tee työvaiheet järjestyksessä. Ensimmäinen keskeneräinen vaihe on auki. Rastita osatehtävä heti, kun olet tehnyt sen.",
    taskNumber: (i, n) => `Työvaihe ${i} / ${n}`,
    taskOpenAll: "Avaa kaikki työvaiheet",
    taskOpenCurrent: "Näytä vain seuraava työvaihe",
    taskLiveDone: (i) => `Työvaihe ${i} valmis.`,
    taskHelpTitle: "Tarvitsen apua tähän työvaiheeseen",
    taskWords: "Sanat tässä työvaiheessa",
    resetConfirm: (plan, files) => `Nollataanko työvaiheet, projektipäiväkirja${plan}, rastit ja AI-loki tästä selaimesta? Lataa projektipäiväkirja${files} ensin, jos haluat säilyttää vastaukset.`,
    exampleLabel: "✓ Esimerkki riittävästä tarkkuudesta · älä kopioi sisältöä",
    notEnoughLabel: "✗ Tämä ei vielä riitä"
  };
  const unifiedWeeks = Boolean(P.yhtenaisetViikot);
  const UI = Object.assign({}, UI_OLETUS, unifiedWeeks ? UI_YHTENAINEN : {}, P.tekstit || {});
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

  /* Kelpaa sekä tekstiksi että attribuutin arvoksi: myös lainausmerkit escapataan (v2.8). */
  function escapeText(value) {
    const div = document.createElement("div");
    div.textContent = value == null ? "" : value;
    return div.innerHTML.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* Sisältötekstin takahipsut `näin` → <code>näin</code>. Kaikki muu escapataan. */
  function codeText(value) {
    return escapeText(value).replace(/`([^`\n]+)`/g, "<code>$1</code>");
  }
  /* v2.8: linkkimerkinnät (opt-in). Ilman selkeysominaisuuksia richText toimii kuten ennen. */
  const linksOn = Boolean(P.selkeys || P.perusohjeet || P.tiedostokortit);
  const LINK_RE = /\[\[([^\]|\n]+?)(?:\|([^\]\n]+))?\]\]|\[([^\]\n]+)\]\((https?:\/\/[^)\s]+|(?:\.\.?\/)?[\w-]+\/[\w./-]+\.\w+)\)/g;
  function richText(value) {
    if (!linksOn) return codeText(value);
    const s = String(value ?? "");
    let out = "";
    let last = 0;
    s.replace(LINK_RE, (match, target, label, extLabel, url, offset) => {
      out += codeText(s.slice(last, offset)) + (url ? externalLinkHtml(url, extLabel) : linkHtml(target.trim(), label));
      last = offset + match.length;
      return match;
    });
    return out + codeText(s.slice(last));
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

  /* ---------- v2.8: linkkien kohteet ----------
   * Kohteet ratkaistaan sisalto.js:n datasta: perusohjeet, tiedostokortit, viikkojen pohjat
   * (pohjat[].tunnus) ja näkymät. Tuntematon kohde näkyy tavallisena tekstinä; tarkista.js
   * raportoi sen virheenä.
   */
  const basics = (Array.isArray(P.perusohjeet) ? P.perusohjeet : []).filter((o) => o && o.tunnus);
  const basicsById = new Map(basics.map((o) => [String(o.tunnus), o]));
  const docCards = P.tiedostokortit && typeof P.tiedostokortit === "object" ? P.tiedostokortit : {};
  const docsInRepo = Boolean(P.dokumentitRepossa);
  const templateIndex = new Map(); // pohjan tunnus → { viikko, pohja }
  Object.entries(weekGuidance).forEach(([w, g]) => (g && Array.isArray(g.pohjat) ? g.pohjat : []).forEach((p) => {
    if (p && p.tunnus) templateIndex.set(String(p.tunnus), { viikko: Number(w), pohja: p });
  }));
  const OWN_REPO = P.repo === "oma";
  const REPO_KEY = `${SLUG}-repo-v1`;
  let repoBase = OWN_REPO ? String(readStorage(REPO_KEY, "") || "") : String(P.repo || "").replace(/\/+$/, "");
  const docName = (id) => {
    const c = docCards[id] || {};
    return c.otsikko || String(c.polku || id).replace(/\/+$/, "").split("/").pop();
  };
  function viewLabel(view) {
    if (P.nakymaNimet && P.nakymaNimet[view]) return P.nakymaNimet[view];
    const nav = document.querySelector(`[data-view-nav="${view}"]`);
    const text = nav ? [...nav.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join("").trim() : "";
    return text || document.querySelector(`.view[data-view="${view}"] h1`)?.textContent?.trim() || view;
  }

  /* { kind, hash, label, url? } tai null. */
  function resolveLink(target) {
    const week = target.match(/^vk\s*(\d+)$/i);
    if (week) return weekList.includes(Number(week[1])) ? { kind: "vk", hash: `week-${week[1]}`, id: week[1], label: t("linkWeek", week[1]) } : null;
    const colon = target.indexOf(":");
    if (colon > 0) {
      const kind = target.slice(0, colon).trim();
      const id = target.slice(colon + 1).trim();
      if (kind === "ohje") return basicsById.has(id) ? { kind, id, hash: `ohje-${id}`, label: basicsById.get(id).otsikko } : null;
      if (kind === "tiedosto") return docCards[id] ? { kind, id, hash: `tiedosto-${id}`, label: docName(id) } : null;
      if (kind === "pohja") return templateIndex.has(id) ? { kind, id, hash: `pohja-${id}`, label: templateIndex.get(id).pohja.otsikko || id } : null;
      if (kind === "kuvaohje") return id ? { kind, id, hash: `kuvaohje-${id}`, label: "" } : null;
      if (kind === "github") {
        if (OWN_REPO) return { kind, id, own: true, url: repoBase ? `${repoBase}/${id.replace(/^\/+/, "")}` : "", label: t("linkGithub", id) };
        return repoBase ? { kind, id, url: `${repoBase}/${id.replace(/^\/+/, "")}`, label: t("linkGithub", id) } : null;
      }
      return null;
    }
    const [view, anchor] = target.split("#");
    if (!VALID_VIEWS.includes(view) || view === "viikko") return null;
    return { kind: "view", id: view, anchor: anchor || "", hash: anchor || `view-${view}`, label: viewLabel(view) };
  }

  function externalLinkHtml(url, label) {
    /* Suhteellinen polku (pohjat/x.zip) on ladattava tiedosto sivuston omasta kansiosta. */
    if (!/^https?:/.test(url)) return `<a class="np-link" href="${escapeText(url)}" download>${codeText(label || url)}</a>`;
    return `<a class="np-link np-link-ext" href="${escapeText(url)}" target="_blank" rel="noopener noreferrer">${codeText(label || url)}<span class="np-link-mark" aria-hidden="true">&nbsp;↗</span><span class="sr-only"> (${escapeText(t("linkNewTab"))})</span></a>`;
  }

  function linkHtml(target, label) {
    const r = resolveLink(target);
    if (!r) {
      console.warn(`Linkin kohdetta ei löydy: [[${target}]]`);
      return codeText(label || target);
    }
    if (r.own) return `<a class="np-link np-link-ext" href="${escapeText(r.url || "#")}" target="_blank" rel="noopener noreferrer" data-np-github="${escapeText(r.id)}">${codeText(label || r.label)}<span class="np-link-mark" aria-hidden="true">&nbsp;↗</span><span class="sr-only"> (${escapeText(t("linkNewTab"))})</span></a>`;
    if (r.url) return externalLinkHtml(r.url, label || r.label);
    const text = label || r.label;
    const auto = r.kind === "kuvaohje" && !label ? " data-np-autolabel" : "";
    return `<a class="np-link" href="#${escapeText(r.hash)}" data-np-link="${r.kind}" data-np-target="${escapeText(r.kind === "view" ? `${r.id}${r.anchor ? `#${r.anchor}` : ""}` : r.id)}"${auto}>${codeText(text || t("linkKuvaohje"))}</a>`;
  }

  /* Linkkimerkinnät pelkäksi tekstiksi (aria-label, ilmoitukset). */
  function plainLinks(value) {
    if (!linksOn) return String(value ?? "");
    return String(value ?? "").replace(LINK_RE, (m, target, label, extLabel) => extLabel || label || resolveLink(target.trim())?.label || target);
  }

  /* index.html:n staattinen teksti: merkinnät linkeiksi tekstisolmuista (ei pre/code/textarea). */
  function linkifyStatic(root) {
    if (!linksOn || !root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (/\[\[|\]\(/.test(n.nodeValue) && !n.parentElement.closest("pre, code, textarea, script, style, a, button, label, summary")
        ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT)
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const holder = document.createElement("span");
      holder.innerHTML = richText(node.nodeValue);
      node.replaceWith(...holder.childNodes);
    });
  }

  /* ---------- v2.8: oma repository (P.repo = "oma") ----------
   * Sivulla ei ole kenenkään repository-osoitetta. Ensimmäinen GitHub-linkki kysyy opiskelijan oman
   * repositoryn osoitteen; se tallentuu vain selaimeen (REPO_KEY), ja linkit päivittyvät. [data-oma-repo]
   * näyttää tallennetun osoitteen ja Vaihda-painikkeen. */
  function normalizeRepo(value) {
    const m = String(value || "").trim().match(/^https:\/\/github\.com\/([^/\s?#]+)\/([^/\s?#]+)/i);
    return m ? `https://github.com/${m[1]}/${m[2].replace(/\.git$/i, "")}` : "";
  }
  function refreshRepoLinks() {
    document.querySelectorAll("a[data-np-github]").forEach((a) => {
      a.setAttribute("href", repoBase ? `${repoBase}/${a.dataset.npGithub.replace(/^\/+/, "")}` : "#");
    });
    document.querySelectorAll("[data-oma-repo]").forEach((el) => {
      el.innerHTML = repoBase
        ? `${escapeText(t("ownRepoCurrent"))} <a class="np-link np-link-ext" href="${escapeText(repoBase)}" target="_blank" rel="noopener noreferrer">${escapeText(repoBase)}<span class="sr-only"> (${escapeText(t("linkNewTab"))})</span></a> <button type="button" class="button button-secondary" data-oma-repo-edit>${escapeText(t("ownRepoChange"))}</button>`
        : `${escapeText(t("ownRepoMissing"))} <button type="button" class="button button-secondary" data-oma-repo-edit>${escapeText(t("ownRepoSet"))}</button>`;
    });
  }
  function askOwnRepo(openPath, opener) {
    let dialog = document.getElementById("oma-repo-dialog");
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.id = "oma-repo-dialog";
      dialog.className = "kuvaohje-dialog oma-repo-dialog";
      dialog.setAttribute("aria-labelledby", "oma-repo-title");
      document.body.appendChild(dialog);
    }
    dialog.innerHTML = `<form method="dialog" class="kuvaohje-dialog-body oma-repo-form" novalidate>
        <h2 id="oma-repo-title">${escapeText(t("ownRepoTitle"))}</h2>
        <p>${escapeText(t("ownRepoLead"))}</p>
        <p>${escapeText(t("ownRepoHelp"))}</p>
        <label for="oma-repo-input">${escapeText(t("ownRepoLabel"))}</label>
        <input id="oma-repo-input" type="url" inputmode="url" autocomplete="url" value="${escapeText(repoBase)}" placeholder="https://github.com/tunnus/projekti">
        <p class="oma-repo-error" role="alert" hidden>${escapeText(t("ownRepoError"))}</p>
        <div class="cycle-actions">
          <button type="submit" class="button button-primary">${escapeText(t(openPath ? "ownRepoSave" : "ownRepoSaveOnly"))}</button>
          <button type="button" class="button button-secondary" data-oma-repo-cancel>${escapeText(t("ownRepoCancel"))}</button>
        </div>
      </form>`;
    const input = dialog.querySelector("input");
    const error = dialog.querySelector(".oma-repo-error");
    dialog.querySelector("[data-oma-repo-cancel]").addEventListener("click", () => dialog.close());
    dialog.querySelector("form").addEventListener("submit", (event) => {
      const value = normalizeRepo(input.value);
      if (!value) { event.preventDefault(); error.hidden = false; input.focus(); return; }
      repoBase = value;
      writeStorage(REPO_KEY, value);
      refreshRepoLinks();
      if (openPath) window.open(`${repoBase}/${openPath.replace(/^\/+/, "")}`, "_blank", "noopener");
    });
    dialog.addEventListener("close", () => { if (opener && opener.focus) opener.focus(); }, { once: true });
    dialog.showModal();
    input.focus();
  }
  if (OWN_REPO) {
    document.addEventListener("click", (event) => {
      const edit = event.target.closest?.("[data-oma-repo-edit]");
      if (edit) { askOwnRepo("", edit); return; }
      const a = event.target.closest?.("a[data-np-github]");
      if (!a || repoBase) return;
      event.preventDefault();
      askOwnRepo(a.dataset.npGithub, a);
    });
  }

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

  /* Toteutusavun sisältö: { title, tree, actions[], code, vinkit?[], test, images?[], links?[] }.
     Viikkotasolla (viikkoOhjeet[w].help) neljä pääkenttää ovat mukana; tehtävän omassa
     avussa (tehtavat[id].apu, v2.5) jokainen kenttä on valinnainen. actions = tee näin
     -vaiheet, vinkit = taustatietoa koodista tai työkalusta ("Hyvä tietää"). */
  function helpContentHtml(h) {
    const helpLinks = h.links?.length ? `<p class="impl-help-links">${h.links.map(([label, url]) => `<a href="${url}" target="_blank" rel="noreferrer">${escapeText(label)} ↗</a>`).join("")}</p>` : "";
    const helpImages = h.images?.length ? `<div class="impl-help-images">${h.images.map(([src, alt, caption]) => `<figure class="project-figure help-figure"><img src="${src}" alt="${escapeText(alt)}" loading="lazy">${caption ? `<figcaption>${escapeText(caption)}</figcaption>` : ""}</figure>`).join("")}</div>` : "";
    return `
        ${h.title ? `<p style="font-size:13px;color:var(--muted)"><small>${escapeText(h.title)}</small></p>` : ""}
        ${h.tree ? `<div><p class="help-label">${escapeText(t("helpTreeLabel"))}</p><pre><code>${escapeText(h.tree)}</code></pre></div>` : ""}
        ${(h.actions || []).length ? `<div><p class="help-label">${escapeText(t("helpActionsLabel"))}</p><ol>${h.actions.map((a) => `<li>${richText(a)}</li>`).join("")}</ol></div>` : ""}
        ${h.code ? `<div><p class="help-label">${escapeText(t("helpCodeLabel"))}</p>${P.selkeys ? copyBlockHtml({ otsikko: t("substepCode"), teksti: h.code }, (x) => String(x ?? "")) : `<pre><code>${escapeText(h.code)}</code></pre>`}</div>` : ""}
        ${(h.vinkit || []).length ? `<div><p class="help-label">${escapeText(t("helpTipsLabel"))}</p><ul>${h.vinkit.map((a) => `<li>${richText(a)}</li>`).join("")}</ul></div>` : ""}
        ${h.test ? `<p class="impl-help-test"><strong>${escapeText(t("helpTestLabel"))}</strong> ${richText(h.test)}</p>` : ""}
        ${helpImages}${helpLinks}
        <p class="impl-help-note" style="font-size:12px;color:var(--meta)">${escapeText(t("helpNote"))}</p>`;
  }

  /* ---------- v2.5: pilkottu tehtävänanto (viikkoOhjeet[w].tehtavat, opt-in) ----------
   * tehtavat = { "35-2": { miksi, osat: ["…", ["Otsikko", "ohje"]], valmis, tallenna,
   *   sanat: ["P0"], apu: {…toteutusavun muoto…}, esimerkki, eiRiita, perii: ["35-2"] } }
   * Tehtävän otsikko on index.html:n tehtävärivin teksti (data-task), joten työpaketti ja
   * tarkistus lukevat edelleen samaa riviä. Alkuperäinen data-task-ruutu jää korttiin
   * piiloon ja seuraa osatehtäviä: eteneminen, jatka-nappi ja sivupalkki toimivat ennallaan.
   * Osatehtävien tila: localStorage `${slug}-osat-v1` = { tehtävätunnus: [true, false, …] }.
   * Siirto vanhoista rasteista tehdään tehtävä kerrallaan vain kerran: jos tehtävällä ei ole
   * vielä tilaa, sen osat saavat vanhan tehtävän rastin (perii-lista tai sama tunnus).
   */
  const SUBSTEP_KEY = `${SLUG}-osat-v1`;
  let substepState = readStorage(SUBSTEP_KEY, {}) || {};
  const legacyTaskState = readStorage(STORAGE_KEY, {}) || {};
  const taskCardEls = [];

  function taskOsat(def) {
    return (def.osat || []).map((o) => {
      if (Array.isArray(o)) return { otsikko: o[0], teksti: o[1] };
      /* v2.8: objektimuoto { otsikko, missa, tee, naet, koodi?, koodiOtsikko? } */
      if (o && typeof o === "object") return { ...o, otsikko: o.otsikko || "", rich: true };
      return { otsikko: "", teksti: String(o) };
    });
  }

  /* v2.8: Missä / Tee / Näet nyt -rivit (osatehtävä ja perusohjeen vaihe). */
  function stepLinesHtml(v) {
    return [["missa", "substepWhere"], ["tee", "substepDo"], ["naet", "substepSee"]]
      .filter(([key]) => v[key])
      .map(([key, label]) => `<p class="substep-line substep-${key}"><span class="substep-key">${escapeText(t(label))}</span> ${richText(v[key])}</p>`).join("")
      + (v.koodi ? copyBlockHtml({ otsikko: v.koodiOtsikko || t("substepCode"), teksti: v.koodi }, (x) => String(x ?? "")) : "");
  }

  function substepHtml(id, o, j) {
    if (!o.rich) {
      return `
          <li><label class="substep-row"><input type="checkbox" data-substep="${escapeText(id)}" data-substep-n="${j}"><span class="task-box" aria-hidden="true"></span><span class="substep-n" aria-hidden="true">${j + 1}</span><span class="substep-text">${o.otsikko ? `<strong>${richText(o.otsikko)}.</strong> ` : ""}${richText(o.teksti)}</span></label></li>`;
    }
    const base = `osa-${String(id).replace(/[^A-Za-z0-9_-]/g, "-")}-${j + 1}`;
    return `
          <li class="substep-item"><div class="substep-row substep-row-rich">
            <input type="checkbox" id="${base}" data-substep="${escapeText(id)}" data-substep-n="${j}" aria-describedby="${base}-ohje">
            <label class="substep-label" for="${base}"><span class="task-box" aria-hidden="true"></span><span class="substep-n" aria-hidden="true">${j + 1}</span><strong class="substep-title">${codeText(plainLinks(o.otsikko))}</strong></label>
            <div class="substep-body" id="${base}-ohje">${stepLinesHtml(o)}</div>
          </div></li>`;
  }

  /* v2.8: kun tehtävän osat kirjoitetaan uudelleen, def.versio vaihtuu. Vanhat rastit siirtyvät
     kerran: osa, jolla on `vanha: n`, saa vanhan osan n rastin; muut osat ovat valmiita vain, jos
     koko vanha tehtävä oli valmis. */
  const SUBSTEP_VERSION_KEY = `${SLUG}-osat-versio-v1`;
  let substepVersions = readStorage(SUBSTEP_VERSION_KEY, {}) || {};
  function remapSubsteps(id, def, count) {
    if (!def.versio || substepVersions[id] === def.versio) return;
    const old = Array.isArray(substepState[id]) ? substepState[id] : null;
    if (old) {
      const allDone = old.length > 0 && old.every(Boolean);
      substepState[id] = taskOsat(def).slice(0, count).map((o) => (o && o.vanha != null ? Boolean(old[Number(o.vanha)]) : allDone));
      writeStorage(SUBSTEP_KEY, substepState);
    }
    substepVersions[id] = def.versio;
    writeStorage(SUBSTEP_VERSION_KEY, substepVersions);
  }

  function substepsFor(id, def, count) {
    remapSubsteps(id, def, count);
    let saved = Array.isArray(substepState[id]) ? substepState[id].slice(0, count) : null;
    if (!saved) {
      const from = Array.isArray(def.perii) && def.perii.length ? def.perii : [id];
      const inherited = from.some((key) => Boolean(legacyTaskState[key]));
      saved = Array(count).fill(inherited);
      substepState[id] = saved;
      writeStorage(SUBSTEP_KEY, substepState);
    } else if (saved.length < count) {
      /* Osia on lisätty: valmis tehtävä pysyy valmiina, kesken oleva saa uudet osat avoimina. */
      const allDone = saved.length > 0 && saved.every(Boolean);
      saved = saved.concat(Array(count - saved.length).fill(allDone));
      substepState[id] = saved;
      writeStorage(SUBSTEP_KEY, substepState);
    }
    return saved.map(Boolean);
  }

  /* ---------- v2.8: siirtymä selaimen muistista repositoryn dokumentteihin ----------
   * Luetaan suoraan localStoragesta, koska tila-muuttujat alustetaan vasta korttien jälkeen.
   * P.siirtyma = { tiedosto, suunnitelma: { polku, kentat: { avain: "Otsikko" } },
   *   paivakirja: { polku, otsikko: "Vko {viikko} – {nimi}", kentat: { work: "Mitä tein ja miten?" } },
   *   ailoki: { polku } }. Ilman asetuksia käytetään kenttien avaimia.
   */
  const JOURNAL_FIELDS = ["work", "reason", "evidence", "next"];
  function legacyDocs() {
    const planRaw = readStorage(`${SLUG}-suunnitelma-v1`, {}) || {};
    const journalRaw = readStorage(`${SLUG}-journal-v1`, {}) || {};
    const logRaw = readStorage(`${SLUG}-ai-log-v1`, []) || [];
    const plan = Object.entries(planRaw).filter(([, v]) => String(v || "").trim());
    const journal = weekList.map((w) => [w, journalRaw[w] || {}])
      .filter(([, e]) => JOURNAL_FIELDS.some((k) => String(e[k] || "").trim()));
    const log = Array.isArray(logRaw) ? logRaw.filter((e) => e && (e.question || e.used)) : [];
    return { plan, journal, log, any: Boolean(plan.length || journal.length || log.length) };
  }

  function migrationMarkdown() {
    const d = legacyDocs();
    const cfg = P.siirtyma || {};
    const s = cfg.suunnitelma || {};
    const j = cfg.paivakirja || {};
    const a = cfg.ailoki || {};
    const fill = (tpl, w) => String(tpl || `{viikko}`).replace(/\{viikko\}/g, String(w)).replace(/\{nimi\}/g, weekTitleLite(w));
    const out = [t("migrateTitle", P.nimi), "", t("migrateIntro", new Date().toLocaleDateString(t("dateLocale"))), ""];
    let n = 0;
    if (d.plan.length) {
      out.push(t("migrateFileHeading", ++n, s.polku || "suunnitelma.md"), "");
      d.plan.forEach(([key, value]) => out.push(t("migrateUnder", (s.kentat || {})[key] || key), "", String(value).trim(), ""));
    }
    if (d.journal.length) {
      out.push(t("migrateFileHeading", ++n, j.polku || journalCfg.polku || "projektipaivakirja.md"), "");
      d.journal.forEach(([w, e]) => JOURNAL_FIELDS.filter((k) => String(e[k] || "").trim()).forEach((k) => {
        out.push(t("migrateUnderField", fill(j.otsikko, w), (j.kentat || {})[k] || k), "", String(e[k]).trim(), "");
      }));
    }
    if (d.log.length) {
      out.push(t("migrateFileHeading", ++n, a.polku || "ai-loki.md"), "");
      d.log.forEach((e, i) => out.push(t("migrateLogEntry", i + 1), "",
        `- ${t("aiLogQuestion")} ${e.tool || ""} · ${e.question || ""}`,
        `- ${t("aiLogUsed")} ${e.used || ""}`,
        `- ${t("aiLogReference")} ${e.reference || t("aiLogNoReference")}`, ""));
    }
    return out.join("\n");
  }
  function weekTitleLite(w) { return (P.viikkoNimet || {})[w] || t("weekFallback", w); }
  const migrationFile = () => (P.siirtyma && P.siirtyma.tiedosto) || `${SLUG}-selaimen-tekstit.md`;

  function migrationBoxHtml(inTask, partial) {
    if (!docsInRepo) return "";
    if (!legacyDocs().any) return inTask ? `<p class="migrate-empty" data-migrate-empty>${escapeText(t(partial ? "migrateEmptyPartial" : "migrateEmpty"))}</p>` : "";
    return `<div class="card migrate-box" data-migrate-box>
        <p>${escapeText(t("migrateLead"))}</p>
        <button class="button button-primary" type="button" data-migrate-download>${escapeText(t("migrateButton"))}</button>
        <p class="migrate-file">${escapeText(t("migrateFileNote", migrationFile()))}</p>
      </div>`;
  }
  document.addEventListener("click", (event) => {
    if (!event.target.closest?.("[data-migrate-download]")) return;
    downloadMarkdown(migrationFile(), migrationMarkdown());
  });

  /* v2.8: linkkitilassa esimerkin ja ei riitä -tekstin rivinvaihdot näkyvät (esim. tiedoston rivit). */
  const multilineText = (value) => (linksOn ? richText(value).replace(/\n/g, "<br>") : richText(value));
  function taskCardHtml(id, def, titleHtml, index, total) {
    const osat = taskOsat(def);
    const words = (def.sanat || []).map((k) => glossaryByTerm.get(String(k).toLowerCase())).filter(Boolean);
    const plainTitle = titleHtml.replace(/<[^>]+>/g, "").trim();
    const calibration = def.esimerkki || def.eiRiita
      ? `<div class="expectation-grid task-card-expectations">
          ${def.esimerkki ? `<div class="card expected-example"><p class="section-label section-label-accent">${escapeText(t("exampleLabel"))}</p><p>${multilineText(def.esimerkki)}</p></div>` : ""}
          ${def.eiRiita ? `<div class="card not-enough"><p class="section-label">${escapeText(t("notEnoughLabel"))}</p><p>${multilineText(def.eiRiita)}</p></div>` : ""}
        </div>`
      : "";
    const help = def.apu
      ? `<details class="impl-help task-help"><summary><span>${escapeText(def.apu.otsikko || t("taskHelpTitle"))}</span><small>${escapeText(t("taskHelpNote"))}</small></summary><div class="impl-help-content">${helpContentHtml(def.apu)}</div></details>`
      : "";
    return `
      <summary class="task-card-head">
        <span class="task-card-n">${escapeText(t("taskNumber", index + 1, total))}</span>
        <h3 class="task-card-title">${titleHtml}</h3>
        <span class="task-card-status" data-task-status></span>
      </summary>
      <div class="task-card-body">
        ${def.miksi ? `<p class="task-card-why"><strong>${escapeText(t("taskWhy"))}</strong> ${richText(def.miksi)}</p>` : ""}
        ${words.length ? `<div class="task-card-words"><p class="section-label">${escapeText(t("taskWords"))}</p><dl class="glossary glossary-compact">${words.map((g) => glossaryItemHtml(g)).join("")}</dl></div>` : ""}
        ${def.siirtyma ? migrationBoxHtml(true, (def.osat || []).some((o) => o && o.siirtyma)) : ""}
        <ol class="substep-list" aria-label="${escapeText(t("taskStepsLabel", plainTitle))}">${osat.map((o, j) => substepHtml(id, o, j)).join("")}
        </ol>
        ${def.tyosykli ? `<button class="button button-secondary" type="button" data-open-workflow>${escapeText(t("taskOpenWorkflow"))}</button>` : ""}
        ${def.valmis ? `<p class="task-card-done"><strong>${escapeText(t("taskDone"))}</strong> ${richText(def.valmis)}</p>` : ""}
        ${def.tallenna ? `<p class="task-card-save"><strong>${escapeText(t("taskSave"))}</strong> ${richText(def.tallenna)}</p>` : ""}
        ${calibration}
        ${help}
      </div>`;
  }

  /* Palauttaa true, jos viikolla on vähintään yksi tehtäväkortti. */
  function enhanceTaskCards(card, guide) {
    const defs = guide.tehtavat;
    if (!defs || typeof defs !== "object") return false;
    const rows = [...card.querySelectorAll(".task-list .task-row")].filter((row) => row.querySelector("[data-task]"));
    let used = false;
    rows.forEach((row, index) => {
      const input = row.querySelector("[data-task]");
      const id = input.dataset.task;
      const def = defs[id];
      if (!def) return;
      used = true;
      const el = document.createElement("details");
      el.className = "task-card";
      el.dataset.taskCard = id;
      el.innerHTML = taskCardHtml(id, def, row.querySelector(".task-text")?.innerHTML || id, index, rows.length);
      /* Alkuperäinen ruutu seuraa osia: se jää DOMiin, mutta ei näy eikä saa fokusta. */
      input.hidden = true;
      input.tabIndex = -1;
      input.setAttribute("aria-hidden", "true");
      el.appendChild(input);
      row.replaceWith(el);
      const osat = taskOsat(def);
      const state = substepsFor(id, def, osat.length);
      el.querySelectorAll("[data-substep]").forEach((box) => {
        box.checked = state[Number(box.dataset.substepN)];
        box.addEventListener("change", () => onSubstepChange(el));
      });
      /* v2.8: siirtymätehtävä ohitetaan, kun selaimen muistissa ei ole vanhaa tekstiä. */
      if (def.siirtyma && docsInRepo && el.querySelector("[data-migrate-empty]")) {
        /* Vain siirtyma-merkityt osat ohitetaan; jos merkintöjä ei ole, koko tehtävä. */
        const flagged = osat.map((o, j) => (o.siirtyma ? j : -1)).filter((j) => j >= 0);
        const skip = new Set(flagged.length ? flagged : osat.map((_, j) => j));
        if (skip.size === osat.length) el.classList.add("is-skipped");
        el.querySelectorAll("[data-substep]").forEach((box) => {
          if (!skip.has(Number(box.dataset.substepN))) return;
          box.checked = true;
          box.disabled = true;
        });
        substepState[id] = osat.map((_, j) => (skip.has(j) ? true : Boolean(substepState[id] && substepState[id][j])));
        writeStorage(SUBSTEP_KEY, substepState);
      }
      el.querySelector("[data-open-workflow]")?.addEventListener("click", () => {
        const workflow = card.querySelector(".week-workflow");
        if (!workflow) return;
        /* v2.8: työsykli muistaa, mistä työvaiheesta se avattiin (Palaa työvaiheeseen -nappi). */
        if (linksOn) {
          if (!el.id) el.id = `tyovaihe-${id}`;
          cycleOrigin[Number(card.dataset.week)] = { anchorId: el.id, n: index + 1 };
          renderCycle(card, false);
        }
        workflow.open = true;
        workflow.scrollIntoView({ block: "start" });
        workflow.querySelector("summary")?.focus();
      });
      taskCardEls.push(el);
    });
    if (!used) return false;
    const section = card.querySelector(".task-list")?.closest(".view-section");
    if (section && !section.querySelector(".tasks-lead")) {
      const lead = document.createElement("p");
      lead.className = "tasks-lead";
      lead.textContent = t("tasksLead");
      section.querySelector(".section-heading-row")?.insertAdjacentElement("afterend", lead);
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "button button-secondary button-pill tasks-toggle";
      toggle.setAttribute("data-tasks-toggle", "");
      toggle.textContent = t("taskOpenAll");
      toggle.addEventListener("click", () => {
        const cards = [...card.querySelectorAll(".task-card")];
        const openAll = toggle.dataset.mode !== "all";
        if (openAll) cards.forEach((c) => { c.open = true; });
        else focusCurrentTask(card, false);
        toggle.dataset.mode = openAll ? "all" : "";
        toggle.textContent = t(openAll ? "taskOpenCurrent" : "taskOpenAll");
      });
      lead.insertAdjacentElement("afterend", toggle);
    }
    return true;
  }

  function taskCardDone(el) {
    const boxes = [...el.querySelectorAll("[data-substep]")];
    return boxes.length > 0 && boxes.every((b) => b.checked);
  }

  function syncTaskCard(el) {
    const boxes = [...el.querySelectorAll("[data-substep]")];
    const done = boxes.filter((b) => b.checked).length;
    const complete = boxes.length > 0 && done === boxes.length;
    const input = el.querySelector("[data-task]");
    if (input) input.checked = complete;
    el.classList.toggle("is-done", complete);
    const status = el.querySelector("[data-task-status]");
    if (status) {
      status.innerHTML = complete
        ? `<span aria-hidden="true">${escapeText(t("stateSymbolDone"))}</span> ${escapeText(t("taskComplete"))}`
        : escapeText(t("taskProgress", done, boxes.length));
    }
    return complete;
  }

  /* Avaa viikon ensimmäisen keskeneräisen tehtävän ja sulkee muut. */
  function focusCurrentTask(card, scroll) {
    const cards = [...card.querySelectorAll(".task-card")];
    if (!cards.length) return null;
    const current = cards.find((c) => !taskCardDone(c)) || null;
    cards.forEach((c) => { c.open = c === current; });
    const toggle = card.querySelector("[data-tasks-toggle]");
    if (toggle) { toggle.dataset.mode = ""; toggle.textContent = t("taskOpenAll"); }
    if (current && scroll) {
      current.scrollIntoView({ block: "start" });
      current.querySelector("summary")?.focus({ preventScroll: true });
    }
    return current;
  }

  function onSubstepChange(el) {
    const id = el.dataset.taskCard;
    const boxes = [...el.querySelectorAll("[data-substep]")];
    substepState[id] = boxes.map((b) => b.checked);
    writeStorage(SUBSTEP_KEY, substepState);
    const wasDone = el.querySelector("[data-task]")?.checked;
    const complete = syncTaskCard(el);
    saveTasks();
    if (complete && !wasDone) {
      const cards = [...el.parentElement.querySelectorAll(".task-card")];
      announce(t("taskLiveDone", cards.indexOf(el) + 1));
      const next = cards.slice(cards.indexOf(el) + 1).find((c) => !taskCardDone(c));
      if (next) next.open = true;
      const weekCard = el.closest(".week-card");
      const status = weekCard?.querySelector("[data-journal-status]");
      if (status && !journalEntryIsComplete(journalEntries[weekCard.dataset.week])) {
        status.textContent = t("journalReminder");
        status.classList.add("attention");
      }
    }
  }

  /* Viikon tausta yhteen suljettuun lohkoon (vain tehtäväkorttiviikoilla). */
  function collapseWeekBackground(card) {
    const parts = ["[data-week-connection]", "[data-week-why]", "[data-week-skills]"]
      .map((sel) => card.querySelector(sel)).filter((el) => el && !el.hidden);
    if (!parts.length || card.querySelector("[data-week-background]")) return;
    const box = document.createElement("details");
    box.className = "week-background";
    box.setAttribute("data-week-background", "");
    box.innerHTML = `<summary>${escapeText(t("weekBackground"))}</summary><div class="week-background-body"></div>`;
    const anchor = card.querySelector("[data-week-quote]:not([hidden])") || card.querySelector("[data-week-kicker]") || card.querySelector(".view-title");
    anchor.insertAdjacentElement("afterend", box);
    parts.forEach((el) => box.querySelector(".week-background-body").appendChild(el));
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
      fillList(skills.querySelector("[data-skills-list]"), guide.skills, (s) => `<li>${linksOn ? richText(s) : escapeText(s)}</li>`);
      skills.hidden = false;
    }

    /* Viikon uudet termit: sisalto.js:n viikkoOhjeet[w].termit = ["P0", "T01"].
       Laatikko luodaan tarvittaessa, jotta vanhat index.html:t eivät tarvitse
       paikanpitäjää. Se näytetään heti kärjen ja tekniikkatagien jälkeen, ennen
       tehtäviä — termi opitaan ennen kuin sitä tarvitaan. */
    /* v2.5: tehtäväkorttiviikolla termi näytetään siinä tehtävässä, jossa sitä käytetään
       (tehtavat[id].sanat). Viikon laatikkoon jäävät vain termit, joita mikään tehtävä ei avaa. */
    const taskWords = new Set(Object.values(guide.tehtavat || {}).flatMap((d) => (d && d.sanat) || []).map((k) => String(k).toLowerCase()));
    const termKeys = (guide.termit || []).map((k) => String(k).toLowerCase()).filter((k) => !taskWords.has(k));
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
      help.querySelector("[data-help-content]").innerHTML = helpContentHtml(guide.help);
      help.hidden = false;
    }

    /* v2.4: viikon kuvaohjeet (viikkoOhjeet[w].kuvaohjeet = ["tunnus", …]).
       Osio luodaan Näin etenet -osion jälkeen; sisältö tulee kuvakaappaukset.json:sta. */
    if ((guide.kuvaohjeet || []).length) {
      let section = card.querySelector("[data-week-kuvaohjeet]");
      if (!section) {
        section = document.createElement(unifiedWeeks ? "details" : "section");
        section.className = "view-section week-kuvaohjeet";
        section.setAttribute("data-week-kuvaohjeet", "");
        const anchor = card.querySelector(".lesson-instructions");
        if (anchor) anchor.insertAdjacentElement("afterend", section);
        else card.querySelector(".outcome-grid")?.insertAdjacentElement("beforebegin", section);
      }
      section.innerHTML = (unifiedWeeks ? `<summary>${escapeText(t("kuvaohjeetSummary"))}</summary>` : `<h2>${escapeText(t("kuvaohjeetHeading"))}</h2>`) +
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

    /* v2.5: tehtäväkortit. Osatehtävät korvaavat Näin etenet -listan, jos viikolla ei ole
       steps-listaa; resurssilinkit ja viestipohjat siirtyvät silloin tehtävien yhteyteen. */
    if (enhanceTaskCards(card, guide)) {
      card.classList.add("has-task-cards");
      if (!unifiedWeeks) collapseWeekBackground(card);
      const lesson = card.querySelector(".lesson-instructions");
      const taskList = card.querySelector(".task-list");
      if (lesson && taskList && !steps.length) {
        const res = lesson.querySelector("[data-week-resources]");
        if (res && !res.hidden) taskList.insertAdjacentElement("beforebegin", res);
        const templates = lesson.querySelector("[data-week-templates]");
        if (templates) taskList.insertAdjacentElement("afterend", templates);
        lesson.hidden = true;
      }
    }
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
  /* v2.5: tehtäväkortin ruutu seuraa osatehtäviä, ei vanhaa rastia. Vain nykyinen tehtävä auki. */
  taskCardEls.forEach(syncTaskCard);
  taskWeekCards.filter((card) => card.classList.contains("has-task-cards")).forEach((card) => focusCurrentTask(card, false));

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
    return `<span class="kuvaohje-stage${full ? " is-full" : ""}" style="aspect-ratio:${w} / ${h}${full ? `;width:${w}px` : ""}"${full || !k.tiedosto ? "" : " data-kuvaohje-open"}>${picture}${marks}</span>`;
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
          <div class="kuvaohje-picture">${kuvaStageHtml(k, false)}${k.tiedosto ? `
            <button type="button" class="button button-secondary kuvaohje-open-button" data-kuvaohje-open>${escapeText(t("kuvaohjeOpen"))}</button>` : ""}
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
      scope.querySelectorAll(".kuvaohje-open-button").forEach((button) => { button.hidden = true; });
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
      slot.querySelectorAll("[data-kuvaohje-open]").forEach((el) => el.addEventListener("click", () => {
        if (slot.querySelector(".kuvaohje-stage img")) openKuvaDialog(k, slot.querySelector(".kuvaohje-open-button"));
      }));
    }));
  }

  /* ---------- v2.6: projektin tavoitekuva (P.lopputulos, opt-in) ----------
   * P.lopputulos = { otsikko?, kuvaus, kuva, leveys, korkeus, alt,
   *   kohdat: [{ n, teksti, alue?: [x, y, l, k] }] }. Kuva on luonnos valmiista
   * työstä (esim. project-docs/lopputulos/proto.html kuvattuna). leveys ja korkeus
   * ovat kuvan CSS-koko (2x-kuva: puolet pikseleistä). Lohko rakennetaan
   * Näin käytät sivua -näkymän alkuun; [data-goal] index.html:ssä kelpaa myös paikaksi.
   * Kuvaohjeiden tavoin kuva ei ole ainoa tiedon kantaja: kohdat ovat myös tekstinä.
   */
  const GOAL_KEY = `${SLUG}-tavoite-v1`;
  const goalData = P.lopputulos && typeof P.lopputulos === "object" ? P.lopputulos : null;

  function renderGoal() {
    if (!goalData) return;
    const view = document.querySelector('.view[data-view="kaytto"]');
    if (!view) return;
    let slot = view.querySelector("[data-goal]");
    if (!slot) {
      slot = document.createElement("section");
      slot.setAttribute("data-goal", "");
      view.prepend(slot);
    }
    slot.classList.add("goal-hero");
    slot.setAttribute("aria-labelledby", "goal-title");
    const title = goalData.otsikko || t("goalTitle", P.nimi);
    const k = {
      otsikko: title,
      tiedosto: goalData.kuva || "",
      leveys: goalData.leveys,
      korkeus: goalData.korkeus,
      alt: goalData.alt || "",
      kuvaa: t("goalPlaceholder"),
      kohdat: goalData.kohdat || []
    };
    slot.innerHTML = `<p class="section-label section-label-accent">${escapeText(t("goalLabel"))}</p>
      <h2 class="goal-title" id="goal-title">${escapeText(title)}</h2>
      ${goalData.kuvaus && goalData.naytaKuvaus !== false ? `<p class="goal-lead">${richText(goalData.kuvaus)}</p>` : ""}
      <figure class="goal-figure">
        ${kuvaStageHtml(k, false)}
        <figcaption class="goal-note">${escapeText(t("goalNote"))}</figcaption>
      </figure>
      ${k.kohdat.length ? `<p class="section-label goal-list-label">${escapeText(t("goalListLabel"))}</p>${kuvaStepsHtml(k)}` : ""}
      <div class="goal-actions">
        <button type="button" class="button button-primary" data-continue><span>${escapeText(P.aloitusNappi || t("resumeLabel"))}</span><span aria-hidden="true">→</span></button>
        ${k.tiedosto ? `<button type="button" class="button button-secondary kuvaohje-open-button" data-goal-open>${escapeText(t("kuvaohjeOpen"))}</button>` : ""}
        <a class="button button-ghost" href="#view-toimeksianto" data-open-view="toimeksianto">${escapeText(t("goalBrief"))}</a>
      </div>`;
    bindImageFallback(slot, k);
    slot.querySelectorAll("[data-kuvaohje-open], [data-goal-open]").forEach((el) => el.addEventListener("click", () => {
      if (slot.querySelector(".kuvaohje-stage img")) openKuvaDialog(k, slot.querySelector("[data-goal-open]"));
    }));
  }
  /* Ennen [data-continue]- ja [data-open-view]-nappien sidontaa, jotta lohkon napit toimivat. */
  renderGoal();

  /* ---------- v2.7: yhtenäiset viikko-ohjeet (P.yhtenaisetViikot, opt-in) ----------
   * Viikkokortin lukujärjestys: otsikko → vaihepolku → yhteys kokonaisprojektiin ja viikon
   * tavoite → uudet termit → työvaiheet → avattava apu → viikon lopputarkistus → avattava
   * osaamiskuvaus → projektipäiväkirja → sivutus. Elementit siirretään index.html:n
   * nykyisistä paikoista, joten data-task-rivit, Näytä-rivi ja päiväkirja pysyvät lähteenä.
   * Vanhat taustalohkot (kärki, yhteysrivi, valmistuu/miksi-ruudukko) jäävät pois:
   * connection-tekstin pitää kertoa, miksi viikko tehdään nyt.
   */
  const phaseWeeks = (phase) => (phase.viikot || []).map(Number);

  function phasePathNav(week) {
    const nav = document.createElement("nav");
    nav.className = "project-phase-path";
    nav.setAttribute("aria-label", t("phasePathLabel"));
    nav.innerHTML = phases.map((phase, i) => {
      const first = weekList.find((w) => phaseWeeks(phase).includes(w));
      if (first == null) return "";
      const current = phaseWeeks(phase).includes(Number(week)) ? ' aria-current="step"' : "";
      return `<a href="#week-${first}" data-open-week="${first}"${current} style="--phase-color:var(--phase-${escapeText(String(phase.tunnus).toLowerCase())})">${escapeText(t("phaseLink", i + 1, phase.lyhyt || phase.otsikko))}</a>`;
    }).join("");
    return nav;
  }

  function wrapInDetails(el, summary, className) {
    const box = document.createElement("details");
    box.className = className;
    box.innerHTML = `<summary>${escapeText(summary)}</summary>`;
    el.insertAdjacentElement("beforebegin", box);
    box.appendChild(el);
    return box;
  }

  function unifyWeekCard(card) {
    const week = card.dataset.week;
    const guide = weekGuidance[week];
    if (!guide || card.querySelector(".project-connection")) return;
    card.classList.add("is-unified");
    const title = card.querySelector(".view-title");
    if (!title) return;
    let anchor = title;
    if (phases.length) {
      anchor = phasePathNav(week);
      title.insertAdjacentElement("afterend", anchor);
    }

    const headId = `week-${week}-project-connection`;
    const box = document.createElement("section");
    box.className = "card project-connection";
    box.setAttribute("aria-labelledby", headId);
    box.innerHTML = `<h2 class="section-label" id="${headId}">${escapeText(t("projectConnectionHeading"))}</h2>
      ${guide.connection ? `<p>${richText(guide.connection)}</p>` : ""}
      <h2 class="section-label project-week-goal">${escapeText(t("weekGoalHeading"))}</h2>
      <p class="project-week-goal-text">${richText(guide.feature || "")}</p>`;
    anchor.insertAdjacentElement("afterend", box);
    const quote = card.querySelector("[data-week-quote]");
    if (quote && !quote.hidden) box.querySelector(".project-week-goal").insertAdjacentElement("beforebegin", quote);
    else quote?.remove();
    ["[data-week-kicker]", "[data-week-connection]", "[data-week-why]"].forEach((sel) => card.querySelector(sel)?.remove());
    const terms = card.querySelector("[data-week-terms]");
    if (terms) box.insertAdjacentElement("afterend", terms);

    const tasksSection = card.querySelector(".task-list")?.closest(".view-section");
    const tasksHeading = tasksSection?.querySelector(".section-heading-row h2");
    if (tasksHeading && t("tasksHeading")) tasksHeading.textContent = t("tasksHeading");

    /* Työsykli avataan työvaiheen napista; paikka luodaan, jos index.html ei tuo omaa. */
    if (P.sykli && guide.sykli && tasksSection && !card.querySelector("[data-week-cycle]")) {
      const workflow = document.createElement("details");
      workflow.className = "view-section week-workflow";
      workflow.innerHTML = `<summary>${escapeText(t("cycleSummary"))}</summary><section data-week-cycle hidden></section>`;
      tasksSection.insertAdjacentElement("afterend", workflow);
    }

    const days = card.querySelector("[data-week-days]");
    if (days && !days.hidden) {
      days.querySelector(".section-label")?.remove();
      wrapInDetails(days, t("dayRhythmSummary"), "view-section week-days-details");
    }

    const outcome = card.querySelector(".outcome-grid");
    const checkpoint = card.querySelector(".checkpoint");
    const evidence = card.querySelector(".evidence");
    const finish = document.createElement("section");
    finish.className = "card view-section week-finish";
    finish.innerHTML = `<h2>${escapeText(t("weekFinishHeading"))}</h2>`;
    if (checkpoint) {
      const h = document.createElement("h3");
      h.textContent = t("weekFinishCheck");
      finish.append(h, checkpoint);
    }
    if (evidence) {
      /* "Näytä:"-etuliite on otsikossa, ei tarvita tekstissä. */
      const lead = evidence.firstElementChild;
      if (lead && lead.tagName === "STRONG" && /:\s*$/.test(lead.textContent) && evidence.innerHTML.trim().startsWith("<strong")) lead.remove();
      const h = document.createElement("h3");
      h.textContent = t("weekFinishEvidence");
      finish.append(h, evidence);
    }
    const journal = card.querySelector("[data-week-journal]");
    if (outcome) outcome.replaceWith(finish);
    else if (journal) journal.insertAdjacentElement("beforebegin", finish);
    else card.appendChild(finish);

    const skills = card.querySelector("[data-week-skills]");
    const expectations = card.querySelector("[data-week-expectations]");
    const showSkills = skills && !skills.hidden;
    if (showSkills || expectations) {
      const details = document.createElement("details");
      details.className = "view-section week-skills-details";
      details.innerHTML = `<summary>${escapeText(t("weekSkillsSummary"))}</summary>`;
      if (showSkills) details.appendChild(skills); else skills?.remove();
      if (expectations) details.appendChild(expectations);
      finish.insertAdjacentElement("afterend", details);
    }
  }

  function unifyHolidayCard(card) {
    if (card.querySelector(".project-phase-path") || !phases.length) return;
    card.querySelector(".view-title")?.insertAdjacentElement("afterend", phasePathNav(card.dataset.week));
  }

  /* Vaihekuvaus Näin käytät sivua -näkymään: [data-roadmap] + vaiheet[].kuvaus + P.vaihekuva. */
  function renderRoadmap() {
    const slot = document.querySelector("[data-roadmap]");
    if (!slot || !phases.length) return;
    const fig = P.vaihekuva && P.vaihekuva.kuva ? P.vaihekuva : null;
    const items = phases.map((phase) => {
      const work = weekList.filter((w) => phaseWeeks(phase).includes(w) && !holidayWeeks.has(w));
      const first = work[0];
      const label = first != null ? t("roadmapWeeks", first, work[work.length - 1], Boolean(P.paivaton)) : "";
      return `<li><strong>${escapeText(phase.otsikko)}${label ? ` · ${escapeText(label)}` : ""}.</strong> ${richText(phase.kuvaus || "")}${first != null ? ` <a href="#week-${first}" data-open-week="${first}">${escapeText(phase.avaa || t("roadmapOpen"))}</a>` : ""}</li>`;
    }).join("");
    slot.classList.add("view-section", "project-roadmap");
    slot.setAttribute("aria-labelledby", "roadmap-title");
    slot.innerHTML = `<h2 id="roadmap-title">${escapeText(P.vaiheetOtsikko || t("roadmapHeading", phases.length))}</h2>
      ${P.vaiheetJohdanto ? `<p>${richText(P.vaiheetJohdanto)}</p>` : ""}
      ${fig ? `<figure class="project-figure"><img src="${escapeText(fig.kuva)}" width="${Number(fig.leveys) || 880}" height="${Number(fig.korkeus) || 600}" alt="${escapeText(fig.alt || "")}" loading="lazy"><figcaption>${escapeText(fig.kuvateksti || t("roadmapFigureCaption"))}</figcaption></figure>` : ""}
      <ol class="project-roadmap-list">${items}</ol>
      ${P.vaiheetHuomio ? `<p class="note">${richText(P.vaiheetHuomio)}</p>` : ""}`;
  }

  /* Havainnekuvat (figure.project-figure) aukeavat isona samaan ikkunaan kuin kuvaohjeet. */
  function bindProjectFigures() {
    document.querySelectorAll("figure.project-figure").forEach((figure) => {
      const img = figure.querySelector("img");
      if (!img || figure.querySelector("[data-figure-open]")) return;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "button button-secondary kuvaohje-open-button";
      button.setAttribute("data-figure-open", "");
      button.textContent = t("kuvaohjeOpen");
      figure.appendChild(button);
      img.addEventListener("error", () => { button.hidden = true; }, { once: true });
      button.addEventListener("click", () => openKuvaDialog({
        otsikko: figure.querySelector("figcaption")?.textContent?.trim() || img.alt,
        tiedosto: img.getAttribute("src"),
        leveys: img.naturalWidth || img.getAttribute("width"),
        korkeus: img.naturalHeight || img.getAttribute("height"),
        alt: img.alt,
        kohdat: []
      }, button));
    });
  }

  if (unifiedWeeks) {
    taskWeekCards.forEach(unifyWeekCard);
    weekCardEls.filter((el) => el.classList.contains("holiday-card")).forEach(unifyHolidayCard);
    renderRoadmap();
  }
  bindProjectFigures();

  /* ---------- v2.8: perusohjeet ja tiedostokortit (Työtapa-näkymä) ---------- */
  function basicHtml(o) {
    const id = `ohje-${escapeText(o.tunnus)}`;
    const steps = (o.vaiheet || []).map((v) => `<li class="basic-step">${stepLinesHtml(v)}</li>`).join("");
    const kuvat = (o.kuvaohjeet || []).map((k) => `<div class="kuvaohje-slot" data-kuvaohje="${escapeText(k)}" data-kuvaohje-taso="4"></div>`).join("");
    return `<details class="project-reference basic-guide" id="${id}">
        <summary><h3 class="basic-title" id="${id}-otsikko" tabindex="-1">${codeText(o.otsikko)}</h3></summary>
        ${o.johdanto ? `<p class="basic-lead">${richText(o.johdanto)}</p>` : ""}
        <ol class="basic-steps">${steps}</ol>
        ${kuvat}
      </details>`;
  }

  function docCardBodyHtml(c) {
    const what = Array.isArray(c.mitaKirjoitetaan)
      ? `<ul>${c.mitaKirjoitetaan.map((x) => `<li>${richText(x)}</li>`).join("")}</ul>`
      : `<p>${richText(c.mitaKirjoitetaan || "")}</p>`;
    return `<dl class="doc-card-facts">
          <dt>${escapeText(t("docFile"))}</dt><dd><code>${escapeText(c.polku || "")}</code></dd>
          ${c.milloin ? `<dt>${escapeText(t("docWhen"))}</dt><dd>${richText(c.milloin)}</dd>` : ""}
          ${c.mitaKirjoitetaan ? `<dt>${escapeText(t("docWhat"))}</dt><dd>${what}</dd>` : ""}
        </dl>
        ${c.esimerkki || c.eiRiita ? `<div class="expectation-grid doc-card-calibration">
          ${c.esimerkki ? `<div class="card expected-example"><p class="section-label section-label-accent">${escapeText(t("docExample"))}</p><pre class="doc-card-sample">${escapeText(c.esimerkki)}</pre></div>` : ""}
          ${c.eiRiita ? `<div class="card not-enough"><p class="section-label">${escapeText(t("docNotEnough"))}</p><pre class="doc-card-sample">${escapeText(c.eiRiita)}</pre></div>` : ""}
        </div>` : ""}
        ${c.commitViesti ? copyBlockHtml({ otsikko: t("docCommit"), teksti: c.commitViesti }, (x) => String(x ?? "")) : ""}`;
  }

  function docCardHtml(id, opts = {}) {
    const c = docCards[id];
    if (!c) return "";
    if (opts.inline) {
      return `<section class="card doc-card doc-card-inline" aria-labelledby="tiedosto-${escapeText(id)}-${opts.inline}-otsikko">
        <h2 class="doc-card-title" id="tiedosto-${escapeText(id)}-${opts.inline}-otsikko">${escapeText(docName(id))}</h2>
        ${docCardBodyHtml(c)}
      </section>`;
    }
    return `<details class="project-reference doc-card" id="tiedosto-${escapeText(id)}">
        <summary><h3 class="doc-card-title" id="tiedosto-${escapeText(id)}-otsikko" tabindex="-1">${escapeText(docName(id))}</h3></summary>
        ${docCardBodyHtml(c)}
      </details>`;
  }

  function renderBasicsAndDocs() {
    const view = document.querySelector('.view[data-view="tyotapa"]');
    if (!view) return;
    if (basics.length) {
      let slot = view.querySelector("[data-perusohjeet]");
      if (!slot) { slot = document.createElement("section"); slot.setAttribute("data-perusohjeet", ""); view.appendChild(slot); }
      slot.classList.add("view-section", "basics-section");
      slot.setAttribute("aria-labelledby", "perusohjeet-otsikko");
      slot.innerHTML = `<h2 id="perusohjeet-otsikko">${escapeText(P.perusohjeetOtsikko || t("basicsHeading"))}</h2>
        ${P.perusohjeetJohdanto || t("basicsLead") ? `<p class="basics-lead">${richText(P.perusohjeetJohdanto || t("basicsLead"))}</p>` : ""}
        ${basics.map(basicHtml).join("")}`;
    }
    const ids = Object.keys(docCards);
    if (ids.length) {
      let slot = view.querySelector("[data-tiedostokortit]");
      if (!slot) {
        slot = document.createElement("section");
        slot.setAttribute("data-tiedostokortit", "");
        const after = view.querySelector("[data-perusohjeet]");
        if (after) after.insertAdjacentElement("afterend", slot); else view.appendChild(slot);
      }
      slot.classList.add("view-section", "docs-section");
      slot.setAttribute("aria-labelledby", "tiedostokortit-otsikko");
      slot.innerHTML = `<h2 id="tiedostokortit-otsikko">${escapeText(P.tiedostokortitOtsikko || t("docsHeading"))}</h2>
        ${P.tiedostokortitJohdanto || t("docsLead") ? `<p class="docs-lead">${richText(P.tiedostokortitJohdanto || t("docsLead"))}</p>` : ""}
        ${ids.map((id) => docCardHtml(id)).join("")}`;
    }
  }

  /* Dokumentit repositoryssä: näkymän lomake → tiedostokortti (+ siirtymänappi). [data-tiedostokortti="x"]
     index.html:ssä kelpaa paikaksi; muuten kortti tulee näkymän johdannon jälkeen ja lomakkeet piilotetaan. */
  function renderDocsInRepo() {
    if (!docsInRepo) return;
    const views = P.dokumenttiNakymat || { suunnitelma: "suunnitelma", paivakirja: "projektipaivakirja", ailoki: "ai-loki" };
    Object.entries(views).forEach(([view, id]) => {
      const el = document.querySelector(`.view[data-view="${view}"]`);
      if (!el || !docCards[id]) return;
      el.querySelectorAll("[data-plan-form], .journal-summary-card, [data-journal-weeks], [data-ai-form], .ai-log-meta, [data-ai-entries]").forEach((x) => x.remove());
      let slot = el.querySelector(`[data-tiedostokortti="${id}"]`);
      if (!slot) {
        slot = document.createElement("div");
        slot.setAttribute("data-tiedostokortti", id);
        const anchor = el.querySelector(".view-lead") || el.querySelector("h1");
        if (anchor) anchor.insertAdjacentElement("afterend", slot); else el.prepend(slot);
      }
      slot.innerHTML = migrationBoxHtml(false) + docCardHtml(id, { inline: view });
    });
    document.querySelectorAll("[data-plan-status-meta], [data-journal-summary], .nav-group-docs [data-log-count]").forEach((x) => { x.textContent = ""; });
    /* Viikon päiväkirjaosio: kentät pois, tilalle ohje tiedostoon (P.paivakirja.repo). */
    const cfg = journalCfg.repo || {};
    document.querySelectorAll("[data-week-journal]").forEach((journal) => {
      const week = Number(journal.dataset.weekJournal);
      /* v2.8: viikkoOhjeet[w].funktio nimeää viikon funktion ({funktio}). Vaihe voi olla
         { funktio, eiFunktiota } ja pohja { vainFunktio: true }: näkyy vain, kun viikolla on funktio. */
      const funktio = (weekGuidance[week] || {}).funktio || "";
      const fill = (s) => String(s ?? "").replace(/\{viikko\}/g, String(week)).replace(/\{nimi\}/g, weekTitleLite(week))
        .replace(/\{funktio\}/g, funktio)
        .replace(/\{pvm\}/g, journal.closest("[data-week]")?.querySelector("[data-week-label]")?.dataset.weekLabel || "");
      const vaiheet = (cfg.vaiheet || []).map((v) => (v && typeof v === "object" ? (funktio ? v.funktio : v.eiFunktiota) : v)).filter(Boolean);
      const pohjat = (cfg.pohjat || []).filter((p) => !p.vainFunktio || funktio);
      journal.querySelectorAll(".journal-fields, .journal-lead, [data-journal-status], .journal-actions-top").forEach((x) => x.remove());
      let box = journal.querySelector("[data-journal-repo]");
      if (!box) { box = document.createElement("div"); box.setAttribute("data-journal-repo", ""); journal.appendChild(box); }
      box.className = "journal-repo";
      box.innerHTML = `${cfg.johdanto ? `<p>${richText(fill(cfg.johdanto))}</p>` : ""}
        ${cfg.otsikko ? copyBlockHtml({ otsikko: t("journalRepoCopy"), teksti: fill(cfg.otsikko) }, (x) => String(x ?? "")) : ""}
        ${vaiheet.length ? `<ol class="journal-repo-steps">${vaiheet.map((v) => `<li>${richText(fill(v))}</li>`).join("")}</ol>` : ""}
        ${pohjat.map((p) => copyBlockHtml({ otsikko: fill(p.otsikko), teksti: fill(p.teksti) }, (x) => String(x ?? ""))).join("")}`;
    });
  }

  /* ---------- v2.8: linkkien navigointi ja paluu ---------- */
  let linkOrigin = null;
  function focusTarget(el) {
    if (!el) return;
    for (let p = el; p; p = p.parentElement) if (p.tagName === "DETAILS") p.open = true;
    const heading = el.matches("h1, h2, h3, h4, .copy-title") ? el : el.querySelector(":scope > summary h3, :scope > summary h2, h1, h2, h3, .copy-title") || el;
    if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
    el.scrollIntoView({ block: "start" });
    heading.focus({ preventScroll: true });
  }
  function showReturn(el) {
    document.querySelectorAll("[data-link-return]").forEach((b) => b.remove());
    if (!linkOrigin || !el) return;
    const o = linkOrigin;
    const label = o.view === "viikko" ? t("linkReturnWeek", o.week, o.task) : viewLabel(o.view);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "button button-secondary link-return";
    button.setAttribute("data-link-return", "");
    button.textContent = t("linkReturn", label);
    button.addEventListener("click", () => {
      button.remove();
      setView(o.view, o.week);
      const back = o.anchorId ? document.getElementById(o.anchorId) : null;
      if (back) { if (back.tagName === "DETAILS") back.open = true; focusTarget(back); }
    });
    el.insertAdjacentElement("beforebegin", button);
  }
  function linkTargetElement(kind, id) {
    if (kind === "ohje") return document.getElementById(`ohje-${id}`);
    if (kind === "tiedosto") return document.getElementById(`tiedosto-${id}`);
    if (kind === "pohja") return document.getElementById(`pohja-${id}`);
    return null;
  }
  /* Palauttaa true, jos kohde löytyi. */
  function openLinkTarget(kind, id, viaLink) {
    if (kind === "vk") { setView("viikko", Number(id)); focusTarget(activeHeading()); return true; }
    if (kind === "view") {
      const [view, anchor] = id.split("#");
      setView(view);
      const el = anchor ? document.getElementById(anchor) : activeHeading();
      focusTarget(el);
      if (viaLink && anchor) showReturn(el);
      return true;
    }
    if (kind === "ohje" || kind === "tiedosto") setView("tyotapa");
    if (kind === "pohja" && templateIndex.has(id)) setView("viikko", templateIndex.get(id).viikko);
    const el = linkTargetElement(kind, id);
    if (!el) return false;
    focusTarget(el);
    if (viaLink) showReturn(el);
    history.replaceState(null, "", `#${kind}-${id}`);
    return true;
  }
  document.addEventListener("click", (event) => {
    const a = event.target.closest?.("a[data-np-link]");
    if (!a || event.ctrlKey || event.metaKey || event.shiftKey) return;
    event.preventDefault();
    const kind = a.dataset.npLink;
    const id = a.dataset.npTarget;
    if (kind === "kuvaohje") {
      loadKuvat().then((map) => { const k = map && map.get(id); if (k) openKuvaDialog(k, a); });
      return;
    }
    const card = a.closest(".task-card");
    const cards = card ? [...card.parentElement.querySelectorAll(".task-card")] : [];
    const holder = card || a.closest("details[id], section[id]");
    if (card && !card.id) card.id = `tyovaihe-${card.dataset.taskCard}`;
    linkOrigin = { view: state.view, week: state.week, task: card ? cards.indexOf(card) + 1 : 0, anchorId: holder ? holder.id : "" };
    history.pushState(null, "", window.location.hash || "#");
    openLinkTarget(kind, id, true);
  });
  /* Kuvaohjelinkki ilman omaa tekstiä saa kuvaohjeen otsikon. */
  function labelKuvaLinks() {
    const links = [...document.querySelectorAll("a[data-np-link='kuvaohje'][data-np-autolabel]")];
    if (!links.length) return;
    loadKuvat().then((map) => links.forEach((a) => { const k = map && map.get(a.dataset.npTarget); if (k) { a.textContent = k.otsikko || k.kuvaa || a.textContent; a.removeAttribute("data-np-autolabel"); } }));
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
    /* v2.8: viikon pohjan tunnus → ankkuri #pohja-<tunnus> ([[pohja:tunnus]]). */
    if (p.tunnus) return `<div class="copy-block" id="pohja-${escapeText(p.tunnus)}">
        <p class="copy-title" id="${id}-otsikko" tabindex="-1">${escapeText(title)}</p>
        <pre class="copy-text" id="${id}" tabindex="0" aria-labelledby="${id}-otsikko">${escapeText(fill(p.teksti))}</pre>
        <button type="button" class="button button-primary copy-button" data-copy="${id}" data-copy-title="${escapeText(title)}">${escapeText(p.nappi || t("copyButton"))}</button>
      </div>`;
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

  const cycleOrigin = {};
  function cycleBackHtml(week) {
    const o = linksOn && cycleOrigin[week];
    return o ? `<button type="button" class="button button-secondary" data-cycle-back>${escapeText(t("cycleBack", o.n))}</button>` : "";
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
            ${cycleBackHtml(week)}
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
            ${cycleBackHtml(week)}
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
    box.querySelector("[data-cycle-back]")?.addEventListener("click", () => {
      const back = document.getElementById((cycleOrigin[week] || {}).anchorId);
      if (back) { if (back.tagName === "DETAILS") back.open = true; focusTarget(back); }
    });
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

  /* v2.8: edellinen työviikko (lomaviikot ohitetaan) ja sen funktio ({edellinenViikko}, {edellinenFunktio}). */
  function previousWorkWeek(week) {
    const work = weekList.filter((w) => !holidayWeeks.has(w) && weekGuidance[w]);
    const i = work.indexOf(Number(week));
    return i > 0 ? work[i - 1] : null;
  }
  function weekFill(week) {
    const g = weekGuidance[week] || {};
    const prev = previousWorkWeek(week);
    const prevF = prev ? String((weekGuidance[prev] || {}).funktio || "") : "";
    return (value) => String(value ?? "").replace(/\{(viikko|nimi|feature|deliverable|done|edellinenViikko|edellinenFunktio)\}/g, (_, key) =>
      key === "viikko" ? String(week) : key === "nimi" ? weekTitle(week) : key === "edellinenViikko" ? String(prev || "")
        : key === "edellinenFunktio" ? prevF : String(g[key] || ""));
  }
  /* Rutiinikohdan teksti voi olla { funktio, eiFunktiota }: valinta edellisen työviikon funktion mukaan. */
  function routineText(k, week) {
    if (!k.teksti || typeof k.teksti !== "object") return k.teksti;
    const prev = previousWorkWeek(week);
    return prev && (weekGuidance[prev] || {}).funktio ? k.teksti.funktio : k.teksti.eiFunktiota;
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
      box = document.createElement(unifiedWeeks ? "details" : "section");
      box.setAttribute("data-week-routine", "");
      const tasks = card.querySelector(".task-list")?.closest(".view-section");
      /* v2.8: P.viikkorutiini.ensin = true → rutiini ennen työvaiheita (maanantain kohdat tehdään ensin). */
      if (tasks) tasks.insertAdjacentElement(routine.ensin ? "beforebegin" : "afterend", box);
      else card.querySelector(".lesson-instructions")?.insertAdjacentElement("beforebegin", box);
    }
    box.className = "view-section week-routine";
    const saved = routineState[week] || {};
    /* v2.8: kohta.vainTyosykli = true → kohta näkyy vain viikoilla, joilla on työsyklitehtävä. */
    const hasCycle = Object.values(g.tehtavat || {}).some((d) => d && d.tyosykli);
    const shown = routine.kohdat.map((k, i) => [k, i]).filter(([k]) => !k.vainTyosykli || hasCycle);
    const done = shown.filter(([, i]) => saved[i]).length;
    box.innerHTML = (unifiedWeeks
      ? `<summary>${escapeText(routine.otsikko || t("routineSummary"))} <span class="week-status" data-routine-status>${done} / ${shown.length}</span></summary>`
      : `<div class="section-heading-row"><h2>${escapeText(routine.otsikko || t("routineHeading"))}</h2><span class="week-status" data-routine-status>${done} / ${shown.length}</span></div>`) + `
      ${routine.johdanto ? `<p class="week-routine-lead">${richText(routine.johdanto)}</p>` : ""}
      <div class="task-list">${shown.map(([k, i]) => `<label class="task-row routine-row"><input type="checkbox" data-routine="${week}-${i}"${saved[i] ? " checked" : ""}><span class="task-box" aria-hidden="true"></span><span class="task-text">${k.milloin ? `<strong>${escapeText(k.milloin)}:</strong> ` : ""}${richText(weekFill(week)(routineText(k, week)))}</span></label>`).join("")}</div>`;
    box.querySelectorAll("[data-routine]").forEach((input) => input.addEventListener("change", () => {
      const i = Number(input.dataset.routine.split("-").pop());
      routineState[week] = { ...(routineState[week] || {}), [i]: input.checked };
      writeStorage(ROUTINE_KEY, routineState);
      const count = shown.filter(([, j]) => routineState[week][j]).length;
      box.querySelector("[data-routine-status]").textContent = `${count} / ${shown.length}`;
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

  /* v2.4.1: alatunniste (footer.view ilman data-view:tä) näkyy kaikissa näkymissä.
     Ennen v2.4.1:tä tehdyissä sivuissa se on .app-shellin jälkeen, jolloin se jää
     vierivän sisältöpalstan ulkopuolelle. Siirretään se .view-mainin loppuun ja
     poistetaan inline-tyyli; reunat tulevat styles.css:stä. */
  const siteFooter = document.querySelector("footer.view:not([data-view])");
  const viewMain = document.querySelector(".view-main");
  if (siteFooter && viewMain && siteFooter.parentElement !== viewMain) {
    viewMain.appendChild(siteFooter);
    siteFooter.removeAttribute("style");
  }

  const state = { view: "viikko", week: weekList[0] };
  let pendingLinkTarget = null;
  function applyPendingLink() {
    if (!pendingLinkTarget) return;
    const [kind, id] = pendingLinkTarget;
    pendingLinkTarget = null;
    focusTarget(linkTargetElement(kind, id));
    history.replaceState(null, "", `#${kind}-${id}`);
  }

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
    /* v2.8: #ohje-x, #tiedosto-x ja #pohja-x avaavat kohteen näkymän; kohde kohdistetaan renderöinnin jälkeen. */
    const linkMatch = linksOn && hash.match(/^(ohje|tiedosto|pohja)-(.+)$/);
    if (linkMatch && linkTargetElement(linkMatch[1], linkMatch[2])) {
      const [, kind, id] = linkMatch;
      if (kind === "pohja") { state.view = "viikko"; state.week = templateIndex.get(id)?.viikko ?? state.week; }
      else state.view = "tyotapa";
      pendingLinkTarget = [kind, id];
      return true;
    }
    if (initial) {
      state.view = "viikko";
      state.week = currentWeek();
      /* v2.6: ensimmäinen avaus näyttää tavoitekuvan (Näin käytät sivua), ei viikkoa 1.
         Kerran nähty, tai jo aloitettu työ (rasteja), avaa viikon kuten ennenkin. */
      if (goalData && !readStorage(GOAL_KEY, false)) {
        const started = taskBoxes.some((box) => box.checked)
          || Object.values(substepState).some((list) => Array.isArray(list) && list.some(Boolean));
        if (!started) state.view = "kaytto";
        writeStorage(GOAL_KEY, true);
      }
    }
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
    document.querySelectorAll(".view[data-view]").forEach((el) => { el.hidden = el.dataset.view !== state.view; });
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

  /* v2.7: yhtenäisissä viikko-ohjeissa hash-muutos avaa näkymän alusta (setView vierittää ja
     siirtää fokuksen), ettei uusi viikko jää vierityksen keskelle. */
  window.addEventListener("hashchange", () => {
    if (!applyHashFromLocation(false)) return;
    if (unifiedWeeks) setView(state.view, state.week);
    else render();
    applyPendingLink();
  });
  /* v2.7: [data-open-week] missä tahansa (vaihepolku, vaihekuvaus, aloitus) avaa viikon alusta. */
  document.addEventListener("click", (event) => {
    const link = event.target.closest?.("[data-open-week]");
    if (!link || !weekList.includes(Number(link.dataset.openWeek))) return;
    event.preventDefault();
    goToWeek(Number(link.dataset.openWeek));
    /* Linkki jäi piilotettuun näkymään: fokus uuden viikon otsikkoon myös ilman teemaa. */
    if (!focusOnViewChange) {
      const h1 = activeHeading();
      if (h1) {
        if (!h1.hasAttribute("tabindex")) h1.setAttribute("tabindex", "-1");
        h1.focus({ preventScroll: true });
      }
    }
  });

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
    /* v2.5: tehtäväkorttiviikolla jatka-nappi kertoo myös, monesko tehtävä on kesken. */
    const curCards = [...document.querySelectorAll(`.week-card[data-week="${cur}"] .task-card`)];
    const curTask = curCards.findIndex((c) => !taskCardDone(c));
    const taskText = curTask >= 0 ? t("resumeTask", curTask + 1, curCards.length) : "";
    document.querySelectorAll("[data-continue-note]").forEach((el) => {
      el.textContent = t("resumeNote", cur, weekTitle(cur)) + (cycleText ? ` · ${cycleText}` : "") + (taskText ? ` · ${taskText}` : "");
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

  document.querySelectorAll("[data-continue]").forEach((button) => button.addEventListener("click", () => {
    const week = currentWeek();
    goToWeek(week);
    /* v2.5: avaa ja näytä ensimmäinen keskeneräinen tehtävä. */
    const card = document.querySelector(`.week-card[data-week="${week}"].has-task-cards`);
    if (card) focusCurrentTask(card, true);
  }));

  /* ---------- projektipäiväkirja ---------- */

  function journalEntryIsComplete(entry = {}) {
    return [entry.work, entry.reason, entry.evidence].every((value) => String(value || "").trim().length > 0);
  }
  function journalEntryHasText(entry = {}) {
    return Object.values(entry).some((value) => String(value || "").trim());
  }

  function updateJournalStatus() {
    if (docsInRepo) return; // v2.8: päiväkirja on repositoryssä, ei selaimessa
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
    if (!plan || docsInRepo) return;
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
    if (!docsInRepo) document.querySelectorAll("[data-log-count]").forEach((el) => { el.textContent = t("logCount", aiLog.length); });
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
    try { localStorage.removeItem(GOAL_KEY); } catch (_) { /* ei tallennusta */ }
    taskWeekCards.forEach((card) => { renderCycle(card, false); renderRoutine(card); });
    taskBoxes.forEach((box) => { box.checked = false; });
    /* v2.5: osatehtävät tyhjiksi. Tila kirjoitetaan heti, jotta vanhoja rasteja ei siirretä uudelleen. */
    substepState = {};
    taskCardEls.forEach((el) => {
      el.querySelectorAll("[data-substep]").forEach((b) => { b.checked = false; });
      substepState[el.dataset.taskCard] = [...el.querySelectorAll("[data-substep]")].map(() => false);
      syncTaskCard(el);
    });
    writeStorage(SUBSTEP_KEY, substepState);
    taskWeekCards.filter((card) => card.classList.contains("has-task-cards")).forEach((card) => focusCurrentTask(card, false));
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
  /* v2.8: perusohjeet, tiedostokortit ja staattisen tekstin linkit ennen kuvaohjeita. */
  renderBasicsAndDocs();
  renderDocsInRepo();
  linkifyStatic(document.querySelector(".view-main"));
  if (OWN_REPO) refreshRepoLinks();
  renderKuvaohjeet(document);
  labelKuvaLinks();
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
  applyPendingLink();
  window.addEventListener("resize", () => { if (window.matchMedia("(min-width: 861px)").matches) closeMobileSidebar(); });
})();

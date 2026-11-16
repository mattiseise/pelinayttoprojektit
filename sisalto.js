/*
 * KahvilaKoodi – projektin koko sisältödata.
 *
 * Päivätty tila: viikot ovat ISO-kalenteriviikkoja 48–53 vuonna 2026 ja 1–4
 * vuonna 2027. data-week-label-attribuutit index.html:ssä ovat ISO-viikon
 * päivämääriä (ei "Työviikko N / 10" -muotoa).
 *
 * 16.11.2026: kevennetty ja uusi aikataulu (Matin päätös). Projekti jatkuu siitä, mihin
 * on päästy: repository ja GDD ovat valmiina, joten viikko 48 alkaa Unity-projektista.
 * 10 viikkoa (23.11.2026–29.1.2027), 4 vaihetta, 36 työvaihetta (ennen 15 työviikkoa ja
 * 59 työvaihetta). Ohjaaja ja asiakas eivät ole tavoitettavissa 18.12.–11.1., joten
 * viikoilla 52, 53 ja 1 ei ole ohjaaja- eikä asiakastehtäviä, ja jouluviikko 52 on kevyt
 * (lyhyetViikot). Testaus: 9 testitapausta ja 2 korjausketjua. Tukirakenteet:
 * osatehtävät muodossa Missä · Tee · Näet nyt, viikkorutiini ennen työvaiheita,
 * päivärytmi joka viikolla ja "Jos et tiedä, mitä tehdä" -ketju.
 * Tehtävätunnukset vaihtuivat. perii-kenttiä ei käytetä: selaimissa on jo tallennettu
 * tila myös tuleville vanhoille tunnuksille (48-1 …), jolloin perii ei vaikuttaisi.
 *
 * 19.10.2026: projekti alkaa alusta uudella aikataululla. Sisältö ja 15 työviikkoa
 * ovat ennallaan. Viikot, tehtävätunnukset ja päivämäärät siirrettiin (vko 34 → 43,
 * …, 43 → 51, 44 → 2/2027, …, 49 → 7/2027), syysloma poistui joululoman tieltä ja
 * vanhan rungon perii-kentät poistettiin.
 *
 * Migroitu vanhasta ennen nykyistä runkoa tehdystä toteutuksesta (app.js:n
 * weekGuidance/weekFraming-objektit ja index.html:n GDD-lomake). Sisältöä ei
 * ole muutettu migraatiossa – vain rakenne on siirretty sisalto.js + uusi
 * index.html -kaksikkoon. app.js on geneerinen moottori eikä sisällä
 * projektikohtaista tekstiä.
 *
 * 30.9.2026 (moottori v2.7): yhtenaisetViikot, lopputulos (pelaajan työnkulku),
 * numeroidut vaiheet 1–5 kuvauksineen, viikkojen connection + feature uudelleen.
 * KÄYNNISSÄ OLEVA PROJEKTI: tehtavat-osien järjestystä ei muuteta eikä väliin lisätä
 * osia (osatehtävien tila tallentuu järjestysnumerolla). Uusi osa vain loppuun.
 *
 * HUOM opettaja-lohkosta: tälle projektille ei ole näyttösuunnitelma- tai
 * työnäytemäppäysdataa, joten `opettaja`-lohkossa on vain dokumentointipohjien
 * mitoitus (pohjat). downloads/-kansion työpaketti ja dokumentointipohjat
 * generoidaan tyokalut/tee_lataukset.js:llä (moottori v2.5 alkaen).
 */
window.NAYTTOPROJEKTI = {
  /* ---- perustiedot ---- */
  slug: "kahvilakoodi",
  nimi: "KahvilaKoodi",
  vuosi: [2026, 2027],
  viikot: [48, 49, 50, 51, 52, 53, 1, 2, 3, 4],
  /* Jouluviikolla 52 on kolme työpäivää (ma–ke) ja viikolla 53 neljä (ma–to). Viikolla 1
     loppiainen on keskiviikkona, joten viikon viimeinen työpäivä on yhä perjantai. */
  lyhyetViikot: { 52: 3, 53: 4 },
  yhtenaisetViikot: true,
  aloitusNappi: "Aloita pelin rakentaminen",
  apuOtsikko: "Tarvitsen toteutusapua Unityyn",

  /* ---- pelaajan työnkulku (moottori v2.6/v2.7: lopputulos) ----
   * Havainnekuva assets/tyonkulku.svg on käsin kirjoitettu SVG, ei kuvakaappaus valmiista
   * pelistä. Kuvassa on omat numeropallot, joten kohdissa ei ole alue-kehyksiä.
   * Aloituksen johdanto kertoo saman kuin kuvaus, joten kuvaus näkyy vain työpaketissa. */
  lopputulos: {
    otsikko: "Näin valmista kahvilapeliä pelataan",
    kuvaus: "KahvilaKoodi on koulun kahvilapeli, jota pelataan selaimessa. Pelaaja palvelee tiskille saapuvia asiakkaita kellon käydessä, kiire kasvaa pisteiden mukana, ja parhaat tulokset säilyvät top 5 -listalla.",
    naytaKuvaus: false,
    kuva: "assets/tyonkulku.svg",
    leveys: 880,
    korkeus: 704,
    alt: "Havainnekuva pelaajan työnkulusta neljässä vaiheessa. 1 Aloitusvalikko: pelaaja avaa pelin selaimessa ja painaa Aloita. 2 Tilaus ja toimitus: asiakas tilaa kahvin ja sämpylän, pelaaja valitsee tuotteet ja painaa Toimita, ja peli näyttää palautteen Oikein! +20 sekä ajan ja pisteet. 3 Kiire kasvaa: pisteiden kasvaessa peli siirtyy tasolta 1 tasoille 2 ja 3, ja tilaukset isonevat tai asiakkaat odottavat lyhyemmän ajan. 4 Tulos talteen: aika loppuu, pelaaja tallentaa tuloksen nimimerkillä ja näkee viiden parhaan tuloksen listan. Pelaa uudelleen vie takaisin alkuun.",
    kohdat: [
      { n: 1, teksti: "Pelaaja avaa pelin selaimessa ilman asennusta ja aloittaa kahvilavuoron aloitusvalikosta." },
      { n: 2, teksti: "Asiakas tilaa 1–3 tuotetta. Pelaaja valitsee tuotteet ja painaa Toimita. Peli näyttää heti, menikö toimitus oikein, ja päivittää pisteet ja jäljellä olevan ajan." },
      { n: 3, teksti: "Kun pisteet kasvavat, kiire kasvaa: tilaukset isonevat tai asiakkaat odottavat lyhyemmän ajan. Kierros päättyy, kun aika loppuu." },
      { n: 4, teksti: "Tulosruutu näyttää pisteet. Pelaaja tallentaa tuloksen nimimerkillä, ja viiden parhaan tuloksen lista säilyy, kun peli avataan uudelleen." }
    ]
  },

  /* Poimittu vanhasta styles.css:stä: --coral/--coral-dark → --accent/--accent-dark,
     --phase-a..d säilyivät sellaisinaan. Ks. myös styles.css:n kommentti. */
  paletti: {
    aksentti: "#2563eb",
    aksenttiTumma: "#1d4ed8",
    taulukkoSavy: "#eaf1fd",
    riviSavy: "#f4f8fe"
  },

  /* ---- paperiaineiston kielisäädöt (tee_lataukset.js, v2.7) ---- */
  lataukset: {
    resurssienPerusosoite: "https://mattiseise.github.io/pelinayttoprojektit/",
    aloitusHuomio: "Viikon työvaihe on tämän sivuston työohje. Kun teet muutoksen peliin, kirjaa se GitHub-issueksi ja tee se Työtapa-sivun kuudella askeleella. Valmiiseen issueen lisätään kommentti ja linkki commitiin, testien tulokset ja viikon yhteenveto kirjataan projektipäiväkirjaan."
  },

  /* ---- vaiheet (moottori v2.7: numeroidut vaiheet, kuvaus näkyy aloituksessa ja vaihekuvassa) ----
   * 16.11.2026: neljä vaihetta kymmenelle viikolle (pedagoginen runko § 11: 10–14 työviikkoa → 4).
   * Värit = styles.css:n --phase-1 … --phase-4 (a–d). */
  vaiheet: [
    { tunnus: "1", lyhyt: "Valmistelu", otsikko: "Valmistelu", kuvaus: "Lisäät Unity-projektin repositoryyn ja kokeilet tyhjää peliä selaimessa. Kysyt asiakkaalta avoimet asiat ja pilkot ensimmäisen featuren GitHub-issueiksi, jotta rakennat sellaista peliä, jota asiakas haluaa.", kuvassa: ["Unity repositoryyn → asiakkaan vastaukset → issuet", "Tyhjä peli aukeaa selaimessa, ja rajaus on hyväksytty."], viikot: [48], vari: "#0d9488" },
    { tunnus: "2", lyhyt: "Pelattava peli", otsikko: "Pelattava peli", kuvaus: "Rakennat pelin toiminto kerrallaan: kierros, tuotelista, kello ja pisteet, kasvava kiire ja top 5 -lista. Joululomalla teet työtä itsenäisesti sovittuina päivinä, jouluviikolla kevyemmin.", kuvassa: ["Kierros → tuotelista → kello → kiire → top 5", "Toimeksiannon kaikki vaatimukset toimivat."], viikot: [49, 50, 51, 52, 53], vari: "#d97706" },
    { tunnus: "3", lyhyt: "Testaus ja palaute", otsikko: "Testaus ja asiakkaan palaute", kuvaus: "Testaat pelin yhdeksällä testitapauksella. Sen jälkeen asiakas pelaa peliä, ja teet hänen toivomansa muutoksen omassa Git-haarassa.", kuvassa: ["9 testitapausta → asiakas pelaa → muutos haarassa", "Peli on testattu ja vastaa asiakkaan toivetta."], viikot: [1, 2], vari: "#7c3aed" },
    { tunnus: "4", lyhyt: "Julkaisu ja näyttö", otsikko: "Julkaisu ja näyttö", kuvaus: "Uusi pelaaja testaa julkaisuehdokkaan. Korjaat kaksi virhettä, kirjaat kummastakin korjausketjun ja julkaiset version v1.0 GitHub Pagesiin. Lopuksi kokoat näyttöaineiston ja harjoittelet demon.", kuvassa: ["RC1 → 2 korjausketjua → v1.0 → näyttö", "Asiakas voi avata pelin linkistä omalla koneellaan."], viikot: [3, 4], vari: "#db2777" }
  ],
  vaihekuva: {
    kuva: "assets/projektin-vaiheet.svg", leveys: 880, korkeus: 692,
    alt: "KahvilaKoodin neljä vaihetta: 1 valmistelu viikolla 48, 2 pelattava peli viikoilla 49–53 (joululoman viikoilla 52 ja 53 itsenäisesti), 3 testaus ja asiakkaan palaute viikoilla 1–2 sekä 4 julkaisu ja näyttö viikoilla 3–4."
  },
  vaiheetJohdanto: "Ensin lisäät Unity-projektin repositoryyn ja selvität asiakkaan avoimet asiat. Sitten rakennat pelin toiminto kerrallaan niin, että peli on pelattavissa jokaisen viikon lopussa. Testauksen jälkeen asiakas pelaa peliä ja toivoo yhden muutoksen, ja lopuksi julkaiset pelin niin, että asiakas voi avata sen omalla koneellaan.",
  vaiheetHuomio: "Viikot ovat kalenteriviikkoja: 48–53 vuonna 2026 ja 1–4 vuonna 2027. Ohjaaja ja asiakas eivät ole tavoitettavissa 18.12.2026–11.1.2027. Silloin teet projektia itsenäisesti sovittuina päivinä, jouluviikolla kevyemmin. Aineisto luovutetaan viimeistään perjantaina 29.1.2027.",

  /* ---- opiskelijalle näkyvä työn tasojen nimeäminen (moottori v2.7) ----
   * Työvaihe = sivun viikko-ohjeen kohta. GitHub-issue = yksi rajattu muutos peliin.
   * Työtapa = Työtapa-sivun kuusi askelta, joilla yksi issue tehdään. */
  tekstit: {
    goalListLabel: "Pelaajan työnkulku",
    goalNote: "Havainnekuva näyttää pelaajan työnkulun. Se ei ole kuvakaappaus valmiista pelistä.",
    tasksLead: "Tee työvaiheet järjestyksessä. Ensimmäinen keskeneräinen vaihe on auki. Kun teet muutoksen peliin, kirjaa se GitHub-issueksi ja tee se Työtapa-sivun kuudella askeleella."
  },

  /* ---- viikkonavigaation lyhyet nimet (vanhasta app.js:n weekNames) ---- */
  viikkoNimet: {
    48: "Aloitus",
    49: "Pelattava kierros",
    50: "Kahvilan tuotelista",
    51: "Kello ja pisteet",
    52: "Kasvava kiire",
    53: "Top 5 -lista",
    1: "Testaus",
    2: "Asiakas pelaa",
    3: "Julkaisu v1.0",
    4: "Näyttö ja luovutus"
  },

  /* ---- viikkorutiini ja jumiutumisen toimintaketju (16.11.2026) ----
   * Tuki toiminnan aloittamiseen ja ohjaamiseen: sama rutiini joka viikko ennen työvaiheita
   * (ensin: true) ja sama "Jos et tiedä, mitä tehdä" -ketju, jonka viimeinen kohta päättyy
   * ohjaajaan. Rutiinin rastit tallentuvat kohdan indeksillä: uusi kohta vain listan loppuun. */
  viikkorutiini: {
    otsikko: "Viikkorutiini: näin aloitat ja lopetat",
    ensin: true,
    johdanto: "Nämä rastit eivät ole viikon työvaiheita. Ne auttavat sinua aloittamaan ja lopettamaan työn joka päivä samalla tavalla. Rastita kohta, kun olet tehnyt sen tällä viikolla.",
    kohdat: [
      { milloin: "Viikon ensimmäinen työpäivä", teksti: "Lue viikon Päivämäärät, Päivärytmi ja Valmis kun -ehto. Jos viikolla on aloituspalaveri, kerro ohjaajalle, mistä työvaiheesta aloitat." },
      { milloin: "Joka työpäivän alussa", teksti: "Avaa tämä sivu ja paina sivupalkin jatka-painiketta. Se vie ensimmäiseen keskeneräiseen työvaiheeseen. Jos olet siirtänyt sen syrjään Jos et tiedä, mitä tehdä -ohjeen mukaan, avaa sen sijaan Päivärytmin mukainen viikko sivupalkin viikkolistasta. Tee yksi osatehtävä kerrallaan." },
      { milloin: "Joka työpäivän lopussa", teksti: "Tee päivän aikana commit aina, kun yksi osa toimii, ja päivän lopuksi push. Kirjoita päiväkirjan kenttään Mitä tein ja miten? yksi rivi: mihin jäin ja mitä teen seuraavaksi." },
      { milloin: "Viikon viimeinen työpäivä", teksti: "Kirjoita GitHubissa jokaiseen viikon valmiiseen issueen kommentti, jossa ovat linkki commitiin ja rivi Toteutunut aika: x päivää. Sulje issue. Täytä sitten viikon projektipäiväkirja." }
    ]
  },
  /* Kohtien järjestys on päätöspuu: lomaa koskeva ohje on samassa kohdassa kuin Teams-viesti,
     jotta lomalla ei lähetetä viestiä ensin (Ingrid 16.11.2026). Kohta 3 on palautumisreitti
     rikkinäisestä projektista, ja kohta 5 kertoo lomalla kesken jääneen viikon järjestyksen. */
  josJumissa: {
    otsikko: "Jos et tiedä, mitä tehdä",
    johdanto: "Käy kysymykset läpi järjestyksessä. Kun kysymys sopii tilanteeseesi, toimi sen ohjeen mukaan.",
    kohdat: [
      { kysymys: "1. Onko viikon työvaiheissa rastittamaton osatehtävä?", ohje: "Jatka ensimmäisestä rastittamattomasta osatehtävästä. Avaa ensin se ohjelma tai ikkuna, joka mainitaan osatehtävän Missä-rivillä." },
      { kysymys: "2. Etkö tiedä, miten osatehtävä tehdään?", ohje: "Avaa työvaiheen kohta Tarvitsen apua tähän työvaiheeseen. Jos viikolla on kuvallinen tukiohje, avaa sekin. Kokeile ohjetta 15 minuuttia." },
      { kysymys: "3. Eikö peli käynnisty, tai onko Consolessa punaisia virheitä?", ohje: "Kaksoisklikkaa ensimmäistä punaista virhettä, jolloin VS Code avaa rivin. Vertaa riviä avun työpohjaan ja kokeile korjata se 10 minuuttia. Jos peli ei vieläkään käynnisty, kopioi virheilmoitus päiväkirjan kenttään Mitä tein ja miten? Tallenna ja sulje Unity. Valitse sitten GitHub Desktopissa Branch → Stash all changes: keskeneräinen työ jää talteen, ja peli palaa viimeisimpään commitiin. Jos GitHub Desktop kysyy, korvataanko aiempi talteen jätetty työ, valitse Cancel ja kirjaa tilanne päiväkirjaan. Avaa Unity ja paina Play. Jos peli ei käynnisty viimeisimmässäkään commitissa, valitse GitHub Desktopin History-välilehdeltä oma viimeisin commitisi, paina hiiren oikeaa ja valitse Revert changes in commit. Jatka sitten kohdan 4 mukaan. Käyt talteen jääneen työn läpi ohjaajan kanssa seuraavassa palaverissa." },
      { kysymys: "4. Oletko yrittänyt 15 minuuttia, eikä se onnistu?", ohje: "Kirjoita jumikohta tällä pohjalla ja ota kuvakaappaus. Joululomalla 18.12.–11.1. ohjaaja ei vastaa: kirjoita pohja päiväkirjan kenttään Mitä tein ja miten?, ja ohjaaja käy asian kanssasi läpi tiistaina 12.1. Muulloin lähetä pohja ja kuvakaappaus ohjaajalle Teamsissa. Siirry sitten seuraavaan osatehtävään, jonka voit tehdä, vaikka tämä kohta on kesken. Jos mikään viikon osatehtävä ei etene, tee loman varatehtävä: viikon 1 työvaiheen 1-1 osatehtävät 2–6 eli testitapausten kirjoittaminen. Se ei vaadi koodimuutoksia.", pohja: "JUMI [työvaihe ja osatehtävä, esimerkiksi 52-2, osatehtävä 4]\nYritin: [mitä tein]\nOdotin: [mitä piti näkyä]\nNäin: [mitä näkyi, esimerkiksi Console-virhe]" },
      { kysymys: "5. Viikko loppuu, ja työ on kesken?", ohje: "Kirjoita päiväkirjaan, mihin jäit. Tee commit ja push vain, jos Consolessa ei ole punaisia virheitä. Jos on, tee ensin kohta 3. Joululomalla 18.12.–11.1. tee kesken jäänyttä työvaihetta uuden viikon ensimmäisenä työpäivänä. Toisena päivänä avaa uusi viikko sivupalkin viikkolistasta ja aloita sen ensimmäinen työvaihe, vaikka edellinen olisi yhä kesken. Muulloin kerro asiasta ohjaajalle aloituspalaverissa, ja sovitte yhdessä, mistä jatkat." }
    ]
  },

  /* Sanasto: vain tämän projektin oikeasti käyttämät termit. Renderöidään
     Termit-näkymään ja viikkojen "Uudet termit" -laatikoihin. Jokainen termi
     selitetään myös juoksevassa tekstissä siinä kohdassa, jossa se tulee
     ensimmäisen kerran vastaan; sanasto on kertaus- ja hakuväline. */
  termisto: [
    { termi: "repository", nimi: "Projektin koodivarasto Gitissä", selite: "Repository on projektin tiedostojen ja koko muutoshistorian säilytyspaikka. Tässä projektissa se on GitHubissa, ja sieltä löytyvät peliprojekti, project-docs-kansio ja työnäytteet.", viikko: 48 },
    { termi: "commit", nimi: "Versionhallintaan tallennettu muutos", selite: "Commit on yksi versionhallintaan tallennettu muutoskokonaisuus: mitä muutit ja miksi. Jokaisella commitilla on oma tunniste, johon voit linkittää työnäytteenä.", viikko: 48 },
    { termi: "build", nimi: "Pelin ajettava julkaisuversio", selite: "Build on Unityn tekemä valmis versio pelistä. Sitä pelataan ilman Unity-editoria, ja juuri sitä asiakas kokeilee.", viikko: 48 },
    { termi: "WebGL", nimi: "Unityn selainjulkaisu", selite: "WebGL on Unityn julkaisumuoto, joka toimii selaimessa ilman asennusta. WebGL-build on pelin selainversio – tämän projektin lopputuote.", viikko: 48 },
    { termi: "push", nimi: "Commitien siirto GitHubiin", selite: "Push siirtää koneellasi tehdyt commitit GitHubiin. Vasta pushin jälkeen ohjaaja ja asiakas näkevät muutoksesi.", viikko: 48 },
    { termi: "P0", nimi: "Pakollinen ydin", selite: "P0 on se osa peliä, jonka on pakko valmistua: ilman sitä peliä ei voi luovuttaa asiakkaalle. Tee koko P0 valmiiksi ennen kuin aloitat lisäominaisuuksia.", viikko: 48 },
    { termi: "P1", nimi: "Tärkeä jatkosisältö", selite: "P1 on ominaisuus, joka tehdään vasta, kun koko P0 toimii. Se parantaa peliä, mutta peli on luovutettavissa myös ilman sitä.", viikko: 48 },
    { termi: "P2", nimi: "Valinnainen lisä", selite: "P2 on ominaisuus, joka voidaan jättää kokonaan pois, jos aika loppuu. Merkitse P2:ksi kaikki, mistä voi luopua ilman, että asiakkaan vaatimus jää täyttämättä.", viikko: 48 },
    { termi: "GDD", nimi: "Game Design Document, pelin suunnitteludokumentti", selite: "GDD kokoaa yhteen tiedostoon pelin konseptin, pelin kulun, omat suunnittelupäätökset, rajauksen ja avoimet asiat. Tässä projektissa se täytetään Suunnitelma-näkymässä ja tallennetaan repositoryyn nimellä gdd.md.", viikko: 48 },
    { termi: "GitHub-issue", nimi: "Yksi rajattu muutos peliin GitHubissa", selite: "GitHub-issue kuvaa yhden rajatun muutoksen peliin: otsikko, perustelu, rajattu muutos ja Valmis kun -ehto. Tässä projektissa yhden issuen työmäärä on puolesta päivästä yhteen päivään. Sivun yksi työvaihe voi sisältää useita issueita.", viikko: 48 },
    { termi: "backlog", nimi: "Priorisoitu issue-lista", selite: "Backlog on projektin kaikkien GitHub-issueiden lista. Tässä projektissa se on GitHubin Issues-lista, jossa jokaisella issuella on prioriteetti: pakollinen (P0), tärkeä (P1) tai lisä (P2). Lista päivitetään aina, kun asiakas päättää jotain uutta.", viikko: 48 },
    { termi: "mockup", nimi: "Käyttöliittymän luonnoskuva", selite: "Mockup on paperille tai piirto-ohjelmalla tehty luonnos ruuduista ennen koodaamista. Tässä projektissa se on project-docs/evidence/week-49/mockup.png, ja ruudut rakennetaan sen mukaan.", viikko: 49 },
    { termi: "UI", nimi: "User interface, käyttöliittymä", selite: "Käyttöliittymä on se osa peliä, jonka pelaaja näkee ja jota hän käyttää: painikkeet, tekstit ja paneelit. Unityssä ne rakennetaan Canvas-alueelle.", viikko: 49 },
    { termi: "feature", nimi: "Pelin yksittäinen ominaisuus", selite: "Feature on yksi pelaajalle näkyvä ominaisuus, esimerkiksi pistelasku tai viiden parhaan tuloksen lista. Tässä projektissa featuret tehdään yksi kerrallaan, yleensä yksi viikossa.", viikko: 48 },
    { termi: "scene", nimi: "Unityn näkymä", selite: "Scene on Unityn tiedosto, jossa pelin objektit ovat. Tässä projektissa koko peli on yhdessä scenessä nimeltä CafeGame.", viikko: 48 },
    { termi: "Hierarchy", nimi: "Unityn objektilista", selite: "Hierarchy-ikkuna näyttää scenen kaikki objektit puuna. Siinä luodaan ja nimetään esimerkiksi Canvas, paneelit, painikkeet ja GameManager.", viikko: 49 },
    { termi: "metodi", nimi: "Skriptin toiminto", selite: "Metodi on C#-skriptin nimetty toiminto, esimerkiksi StartGame. Painike kutsuu metodia, kun pelaaja klikkaa sitä.", viikko: 49 },
    { termi: "TODO", nimi: "Täydennettävä kohta koodissa", selite: "TODO-rivi on työpohjaan merkitty kohta, jonka kirjoitat itse. Rivi alkaa merkeillä // TODO, ja sen perässä lukee, mitä kohtaan tulee.", viikko: 49 },
    { termi: "hyväksymistesti", nimi: "Testi, joka osoittaa työn valmiiksi", selite: "Hyväksymistesti kertoo, mitä tehdään ja mitä pitää näkyä, jotta työvaihe tai muutos on valmis. Esimerkiksi Aloita → Kahvi → Toimita → tulosruudulla 10.", viikko: 49 },
    { termi: "Canvas", nimi: "Käyttöliittymän alue Unityssä", selite: "Canvas on alue, jolle Unityssä sijoitetaan tekstit, painikkeet ja paneelit. Pelin kolme ruutua ovat Canvasin sisällä.", viikko: 49 },
    { termi: "Inspector", nimi: "Unityn asetusikkuna", selite: "Inspector näyttää valitun objektin asetukset ja skriptien kentät. Siihen raahataan esimerkiksi paneelit ja products.json-tiedosto.", viikko: 49 },
    { termi: "asset", nimi: "Peliin tuotava valmis tiedosto", selite: "Asset on peliin tuotava valmis kuva-, ääni- tai fonttitiedosto, esimerkiksi sprite eli hahmon tai esineen kuva. Kirjaa jokaisesta assetista lähde ja lisenssi.", viikko: 49 },
    { termi: "JSON", nimi: "Tekstimuoto datalle", selite: "JSON on yksinkertainen tekstimuoto, jossa tieto on nimi–arvo-pareina. Tässä projektissa kahvilan tuotteet ovat products.json-tiedostossa, joten valikoimaa voi muuttaa koskematta koodiin.", viikko: 50 },
    { termi: "Console", nimi: "Unityn viesti-ikkuna", selite: "Console näyttää skriptien Debug.Log- ja Debug.LogError-viestit sekä virheet. Avaa se valinnalla Window → General → Console.", viikko: 50 },
    { termi: "rajatilanne", nimi: "Pelin ääritilanne", selite: "Rajatilanne on kohta, jossa peli menee helpoimmin rikki, esimerkiksi aika 0, nopea kaksoispainallus tai tyhjä nimimerkki. Rajatilanteet testataan erikseen.", viikko: 1 },
    { termi: "vertainen", nimi: "Toinen opiskelija", selite: "Vertainen on toinen opiskelija, joka keskustelee kanssasi, testaa peliäsi tai lukee koodiasi. Hän ei ole projektin asiakas.", viikko: 2 },
    { termi: "PlayerPrefs", nimi: "Unityn pieni tallennuspaikka", selite: "PlayerPrefs tallentaa pieniä tietoja avain–arvo-pareina. Selainversiossa tieto säilyy selaimen muistissa, kunnes pelaaja tyhjentää sen.", viikko: 53 },
    { termi: "katselmointi", nimi: "Työn yhteinen tarkastus", selite: "Katselmoinnissa toinen ihminen kokeilee peliä tai lukee koodia ja antaa palautetta. Viikolla 2 asiakas katselmoi pelin, ja ohjaaja tai vertainen katselmoi koodin pull requestissa.", viikko: 2 },
    { termi: "branch", nimi: "Git-haara", selite: "Branch eli haara on rinnakkainen kehityslinja: teet muutoksen omassa haarassa, jolloin toimiva main-haara pysyy ehjänä. Valmis haara yhdistetään eli mergetään takaisin main-haaraan.", viikko: 2 },
    { termi: "pull request", nimi: "PR, pyyntö yhdistää haara pääversioon", selite: "Pull request eli PR on GitHubissa tehtävä pyyntö yhdistää oma haara main-haaraan. Se antaa katselmoinnille oman paikan ennen yhdistämistä. Pienen muutoksen voi myös yhdistää suoraan ilman PR:ää.", viikko: 2 },
    { termi: "T01", nimi: "Testitapauksen tunnus", selite: "Testitapaukset numeroidaan juoksevasti: T01 on ensimmäinen testitapaus, T02 toinen. Odotettu tulos kirjataan ennen ajoa, ja tunnuksella viitataan testiin päiväkirjassa ja näyttömatriisissa.", viikko: 1 },
    { termi: "refaktorointi", nimi: "Koodin rakenteen selkeyttäminen", selite: "Refaktoroinnissa koodia muutetaan selkeämmäksi niin, että peli toimii täsmälleen kuten ennen. Sama testitapaus ajetaan ennen ja jälkeen muutoksen.", viikko: 2 },
    { termi: "regressiotesti", nimi: "Vanhan toiminnan uusintatesti", selite: "Regressiotesti on toinen testitapaus, joka käyttää samaa koodia kuin korjaus. Kun se menee läpi, tiedät, ettei korjaus rikkonut muuta.", viikko: 3 },
    { termi: "RC", nimi: "Release candidate, julkaisuehdokas", selite: "Julkaisuehdokas on lähes valmis versio, joka testataan täsmälleen siinä muodossa, jossa se aiotaan julkaista. RC1 on ensimmäinen julkaisuehdokas, eikä siihen enää lisätä uusia ominaisuuksia.", viikko: 3 },
    { termi: "tagi", nimi: "Versionhallintaan merkitty nimetty versio", selite: "Tagi on yhteen committiin kiinnitetty nimilappu, esimerkiksi RC1 tai v1.0. Tagin avulla löydät myöhemmin täsmälleen sen version, jonka asiakas testasi.", viikko: 3 }
  ],

  /* ---- viikkotyyppien kehystekstit (vanhasta app.js:n weekFraming) ---- */
  kehykset: {
    feature: {
      kicker: "Viikon pelifeature",
      connectionLabel: "Näin feature rakentuu:",
      deliverableLabel: "Peliin valmistuu",
      skillsLabel: "Featuren tekniikka: arvioidaan näytössä"
    },
    pohjustus: {
      kicker: "Pelin pohjustus",
      connectionLabel: "Näin viikko vie peliä eteenpäin:",
      deliverableLabel: "Tällä viikolla valmistuu",
      skillsLabel: "Viikon tekniikka: arvioidaan näytössä"
    },
    katselmointi: {
      kicker: "Katselmointi: asiakas pelaa",
      connectionLabel: "Näin viikko vie peliä eteenpäin:",
      deliverableLabel: "Tällä viikolla valmistuu",
      skillsLabel: "Viikon tekniikka: arvioidaan näytössä"
    },
    laatu: {
      kicker: "Pelin laatu",
      connectionLabel: "Näin viikko vie peliä eteenpäin:",
      deliverableLabel: "Tällä viikolla valmistuu",
      skillsLabel: "Viikon tekniikka: arvioidaan näytössä"
    },
    julkaisu: {
      kicker: "Pelin julkaisu",
      connectionLabel: "Näin viikko vie peliä eteenpäin:",
      deliverableLabel: "Tällä viikolla valmistuu",
      skillsLabel: "Viikon tekniikka: arvioidaan näytössä"
    },
    naytto: {
      kicker: "Näyttöviikko",
      connectionLabel: "Näin viikko vie näytön maaliin:",
      deliverableLabel: "Tällä viikolla valmistuu",
      skillsLabel: "Viikon tekniikka: arvioidaan näytössä"
    }
  },

  /* ---- projektipäiväkirja ---- */
  /* ---- opettajan aineisto: vain dokumentointipohjien mitoitus ---- */
  opettaja: {
    pohjat: { aloitusVko: 48, kysymyksia: 5, vertailuVko: 53, katselmointiVkot: "2 ja 3", testiVko: 1, testeja: 9, ketjuja: 2, lisenssiVko: 3 }
  },

  paivakirja: {
    tiedostonimi: "projektipaivakirja.md",
    polku: "project-docs/projektipaivakirja.md",
    vihjeet: {
      work: "Kerro konkreettiset Unity-objektit, C#-tiedostot, GitHub-issuet, commitit ja testit.",
      reason: "Kerro päätös, vaihtoehdot, perustelu ja mitä opit.",
      evidence: "Esim. commit-linkki, GitHub-issue #12, testitapaus T05 tai project-docs/evidence/week-N/kuva.png."
    }
  },

  /* ---- suunnitelmadokumentti: siirretty vanhan GDD-lomakkeen datasta ---- */
  suunnitelma: {
    otsikko: "GDD: pelin suunnitteludokumentti",
    tiedostonimi: "gdd.md",
    pakolliset: ["name", "author", "goal", "style", "graphics", "scoreRight", "scoreWrong", "reasoning"],
    markdown: ({ arvo, onTäytetty, pvm }) => {
      const roundLine = onTäytetty("roundSeconds")
        ? `Kierroksen pituus: ${arvo("roundSeconds")} sekuntia (sovittu asiakkaan kanssa${onTäytetty("roundAgreed") ? ` — ${arvo("roundAgreed")}` : ""})`
        : "Kierroksen pituus: EI VIELÄ SOVITTU — avoin asia";
      return [
        `# GDD – ${arvo("name", "_(pelin nimi puuttuu)_")}`,
        "",
        `Tekijä: ${arvo("author")} · Päivitetty: ${pvm} · Pohja: KahvilaKoodi-toimeksianto 19.10.2026`,
        "",
        "## 1. Konsepti (vaatimus)",
        "",
        "Koulun kahvilapeli selaimeen: asiakkaita saapuu tiskille, he tilaavat 1–3 tuotetta ja pelaaja toimittaa oikean tilauksen mahdollisimman nopeasti.",
        "",
        "## 2. Tavoite ja tekijän rooli omin sanoin (oma päätös)",
        "",
        arvo("goal"),
        "",
        "## 3. Ydinsilmukka (vaatimus)",
        "",
        "Tilaus → valinta → toimitus → pisteet → uusi asiakas.",
        "",
        "## 4. Omat suunnittelupäätökset (oma päätös)",
        "",
        `- **Visuaalinen tyyli:** ${arvo("style")}`,
        `- **Grafiikan hankinta ja lisenssi:** ${arvo("graphics")}`,
        `- **Pisteytys:** oikea toimitus +${arvo("scoreRight", "_?_")} p · väärä toimitus −${arvo("scoreWrong", "_?_")} p`,
        "",
        "### Perustelut",
        "",
        arvo("reasoning"),
        "",
        "## 5. Asiakkaan kanssa sovittavat asiat (asiakas päättää)",
        "",
        `- ${roundLine}`,
        "- Millä selaimilla ja laitteilla WebGL-versio testataan? — kirjaa vastaus tai jätä avoimeksi",
        "- Kenelle peli tehdään? — kirjaa vastaus tai jätä avoimeksi",
        "- Miten viiden parhaan tuloksen tasatilanteet järjestetään? — kirjaa vastaus tai jätä avoimeksi",
        "- Kuka hyväksyy rajauksen ja väliversion? — kirjaa vastaus tai jätä avoimeksi",
        "",
        "## 6. Featuret tekojärjestyksessä (sovittu järjestys)",
        "",
        "1. Ensimmäinen pelattava kierros (vko 49)",
        "2. Kahvilan oikea tuotelista (vko 50)",
        "3. Kello, pisteet ja palaute (vko 51)",
        "4. Kasvava kiire (vko 52)",
        "5. Top 5 -tuloslista (vko 53)",
        "6. Asiakkaan toivoma parannus (vko 2 — sisältö selviää katselmoinnissa samalla viikolla)",
        "",
        "Huomautus: tämä lista ei ole valmis suunnitelma. Featurejen pilkkominen pieniksi GitHub-issueiksi ja niiden priorisointi on omaa työtä (viikon 48 työvaihe 4). Pakollinen (P0) on ydin, jonka on valmistuttava; tärkeä (P1) tehdään, kun pakolliset toimivat; lisä (P2) voidaan jättää pois.",
        "",
        "## 7. Teknologia (sovittu toteutustapa)",
        "",
        "Unity 2D + C#, tuotteet erillisessä products.json-tiedostossa (TextAsset + JsonUtility), tallennus PlayerPrefsillä, julkaisu Unity WebGL -buildina GitHub Pagesiin.",
        "",
        "## 8. Rajaus – mitä ei tehdä (sovittu rajaus)",
        "",
        "Ei verkkomoninpeliä, käyttäjätilejä, oikeita maksuja eikä laajaa 3D-maailmaa. Ensin toimiva P0-versio.",
        "",
        "---",
        "",
        "Tallenna tämä tiedosto polkuun `project-docs/gdd.md` ja tee commit. Päivitä tiedostoa, kun asiakas vastaa avoimiin asioihin.",
        ""
      ].join("\n");
    }
  },

  /* ---- viikkojen ohjaava sisältö (moottori v2.5: pilkottu tehtävänanto) ----
     Jokainen index.html:n tehtävärivi (data-task) on tehtäväkortti, jonka sisältö on
     tehtavat-objektissa samalla tunnuksella: miksi, osat (rastitettavat osatehtävät),
     valmis, tallenna, sanat (tehtävässä avattavat termit), apu, esimerkki ja eiRiita.
     16.11.2026: osatehtävät ovat objektimuodossa { otsikko, missa, tee, naet }
     (Missä · Tee · Näet nyt), ja jokaisella viikolla on päivärytmi (paivat). */
  viikkoOhjeet: {
    48: {
      type: "pohjustus",
      termit: ["repository", "commit", "build", "WebGL", "push", "P0", "P1", "P2", "GDD", "GitHub-issue", "backlog", "feature", "scene"],
      feature: "CafeGame-peli aukeaa selaimessa, Unity-projekti on GitHubissa, asiakkaan vastaukset ovat GDD:ssä ja ohjaaja on hyväksynyt ensimmäiset GitHub-issuet.",
      connection: "Repository ja pelin suunnitteludokumentti (GDD) ovat jo valmiina. Tällä viikolla lisäät repositoryyn Unity-projektin ja kokeilet, että tyhjä peli aukeaa selaimessa, koska valmis peli julkaistaan selainversiona. Sen jälkeen kysyt asiakkaalta GDD:n avoimet asiat ja pilkot ensimmäisen featuren pieniksi GitHub-issueiksi. Viikolla 49 rakennat niiden mukaan ensimmäisen pelattavan kierroksen.",
      paivamaarat: [
        ["Aloituspalaveri ohjaajan kanssa", "ma 23.11."],
        ["Aloituskeskustelu asiakkaan kanssa", "sovitaan maanantaina, viimeistään to 26.11."],
        ["Viikon kirjaus", "pe 27.11."]
      ],
      deliverable: "Unity-projekti repositoryssa, selaimessa aukeava testiversio, asiakkaan vastaukset GDD:ssä ja ensimmäiset GitHub-issuet tärkeysluokkineen.",
      why: "Jos Unity-projekti ei ole repositoryssa, työ voi kadota, eikä ohjaaja näe sitä. Kun kokeilet tyhjää peliä selaimessa heti alussa, tiedät, että pelistä saa tehtyä selainversion. Asiakkaan vastauksista näet, millaista peliä teet.",
      done: "Tyhjä CafeGame-peli aukeaa selaimessa, Unity-projekti näkyy GitHubissa, GDD:ssä on asiakkaan vastaukset ja GitHubissa on issuet tärkeysluokkineen.",
      record: "Kirjoita Vko 48 -merkintään Unity-versio, commitin linkki, asiakaskeskustelun päivä ja osallistujien roolit, viisi kysymystä vastauksineen, avoimet asiat, linkki GitHubin Issues-listaan sekä rajauksen hyväksyjän rooli ja päivä. Rastita lopuksi Näyttömatriisi-näkymässä kohdat Kehitysympäristö, Kehittämisympäristön käyttöönotto, Asiakkaan tarpeet, Tehtävistä sopiminen ja Tehtäviksi jakaminen.",
      skills: ["Unity 2D", "Git", "asiakastarve", "työn pilkkominen"],
      resources: [
        ["Kuvallinen tukiohje · viikko 48 · Unity 6", "tuki/viikko-48.html", false],
        ["GitHub Desktop: kuvaohje ilman Git-komentoja", "https://mattiseise.github.io/projektikoontisivu/ohjeet/github-desktop/?projekti=kahvilakoodi#asennus", false],
        ["Avaa GDD tällä sivulla", "#view-suunnitelma", false],
        ["Avaa toimeksianto", "#view-toimeksianto", false]
      ],
      tehtavat: {
        "48-1": {
          miksi: "Kun teet tyhjästä pelistä selainversion heti alussa, tiedät jo ennen koodaamista, että asentamallasi Unity-versiolla saa tehtyä pelin, joka toimii selaimessa.",
          osat: [
            { otsikko: "Tarkista Unity-versio", missa: "Unity Hub, Installs", tee: "Tarkista, että oppilaitoksen sopima Unity-versio on asennettu ja siinä on Web Build Support. Jos Web Build Support puuttuu, valitse version valikosta Add modules ja asenna se.", naet: "Version kohdalla lukee Web Build Support. Jos asennus kysyy ylläpitäjän salasanaa, pyydä ohjaaja avuksi." },
            { otsikko: "Luo uusi projekti", missa: "Unity Hub, Projects", tee: "Paina New project ja valitse pohjaksi Universal 2D. Kirjoita nimeksi CafeGame. Valitse sijainniksi väliaikainen kansio, joka ei ole repositoryn sisällä. Paina Create project.", naet: "Unity-editori aukeaa. Keskellä on Scene-ikkuna ja vasemmalla Hierarchy." },
            { otsikko: "Tallenna scene", missa: "Unity, File-valikko", tee: "Valitse File → Save As. Tallenna scene nimellä CafeGame kansioon Assets/Scenes.", naet: "Project-ikkunan Scenes-kansiossa näkyy CafeGame. Scene on pelin näkymä, johon pelin objektit tulevat." },
            { otsikko: "Valitse selainalusta", missa: "Unity, File → Build Profiles", tee: "Valitse vasemmalta Web. Paina Switch Platform. Jos Unity näyttää sen sijaan painikkeen Add Build Profile, paina sitä ja sitten Switch Profile.", naet: "Web on valittuna aktiiviseksi alustaksi." },
            { otsikko: "Tee selainversio", missa: "Unity, Build Profiles", tee: "Paina Add Open Scenes ja poista rasti SampleScene-riviltä. Paina Build And Run ja valitse kansioksi Builds/Test.", naet: "Selain avaa tyhjän CafeGame-pelin." },
            { otsikko: "Ota kuva ja kirjaa versio", missa: "Selain ja Unity Hub", tee: "Ota selaimesta kuvakaappaus ja tallenna se työpöydälle nimellä web-test.png. Kirjoita muistiin Unity-versio, esimerkiksi 6000.0.xx. Versio näkyy Unity Hubissa projektin kohdalla.", naet: "Työpöydällä on kuva web-test.png, ja Unity-versio on kirjattu." }
          ],
          valmis: "Tyhjä CafeGame-peli aukeaa selaimeen, ja sinulla on siitä kuvakaappaus.",
          tallenna: "Unity-versio viikon 48 päiväkirjaan. Kuvakaappauksen viet repositoryyn työvaiheessa 2.",
          sanat: ["scene", "build", "WebGL"],
          apu: {
            links: [
              ["Avaa tämän työvaiheen kuvallinen tukiohje", "tuki/viikko-48.html#48-1"]
            ],
            title: "Unity Hubin uusi projekti ja selainversio",
            vinkit: ["Vanhemmissa Unity-versioissa Build Profiles on nimeltään Build Settings, ja Web on nimeltään WebGL.", "Build And Run käynnistää Unityn oman pienen palvelimen. Siksi peli aukeaa selaimeen. Jos avaat Builds/Test/index.html-tiedoston suoraan kansiosta, peli ei käynnisty.", "Builds-kansio ei kuulu versionhallintaan. Tee testiversio aina koneen omaan kansioon."],
            test: "Sulje selain. Paina Build And Run uudelleen: sama tyhjä peli aukeaa.",
            images: [
              ["assets/unity/vko34-hub-uusi-projekti.png", "Unity Hubin New project -näkymä: Universal 2D -pohja valittuna, projektin nimi CafeGame ja sijainti D-asemalla.", "Unity Hub: New project → Universal 2D → nimi CafeGame → Create project."],
              ["assets/unity/vko34-build-profiles-web.png", "Unityn Platform Browser -ikkuna, jossa Web-alusta on valittuna ja Add Build Profile -painike näkyvissä.", "Build Profiles → Web. Uusi profiili vaihtaa alustan Webiin."]
            ]
          }
        },
        "48-2": {
          miksi: "Repository säilyttää pelin ja koko sen muutoshistorian. Kun projekti on GitHubissa, ohjaaja näkee työsi, eikä mikään katoa, vaikka kone hajoaisi.",
          osat: [
            { otsikko: "Avaa repositoryn kansio", missa: "GitHub Desktop", tee: "Valitse oma repositorysi ja sitten Repository → Show in Explorer. Jätä kansio auki.", naet: "Tiedostoikkuna näyttää repositoryn kansion. Siellä on ainakin README.md ja .gitignore." },
            { otsikko: "Kopioi projektin kansiot", missa: "Tiedostoikkuna", tee: "Sulje Unity. Kopioi työvaiheessa 1 tekemäsi CafeGame-projektin kansiosta kansiot Assets, Packages ja ProjectSettings repositoryn kansioon. Älä kopioi kansioita Library, Temp ja Builds.", naet: "Repositoryn kansiossa ovat Assets, Packages, ProjectSettings ja README.md samalla tasolla." },
            { otsikko: "Avaa projekti uudesta paikasta", missa: "Unity Hub, Projects", tee: "Valitse Add → Add project from disk ja valitse repositoryn kansio. Avaa projekti ja kaksoisklikkaa Assets/Scenes/CafeGame.", naet: "Unity aukeaa repositoryn kansiosta, ja CafeGame-scene näkyy." },
            { otsikko: "Vie kuvakaappaus talteen", missa: "Tiedostoikkuna", tee: "Luo repositoryyn kansio project-docs/evidence/week-48. Siirrä työpöydältä kuva web-test.png tähän kansioon.", naet: "Kansiossa project-docs/evidence/week-48 on tiedosto web-test.png." },
            { otsikko: "Tarkista muutokset", missa: "GitHub Desktop, Changes", tee: "Käy muutettujen tiedostojen lista läpi. Mukana pitää olla Assets, Packages, ProjectSettings ja project-docs.", naet: "Listassa ei ole Library-, Temp- eikä Builds-kansiota. Jos ne näkyvät, pysähdy ja pyydä ohjaajaa tarkistamaan .gitignore." },
            { otsikko: "Tee commit ja push", missa: "GitHub Desktop", tee: "Kirjoita Summary-kenttään Lisää Unity-projekti ja paina Commit to main. Paina sitten Push origin.", naet: "Kun valitset Repository → View on GitHub, GitHubissa näkyvät Assets-kansio ja uusi commit." }
          ],
          valmis: "GitHubissa näkyvät Assets, Packages, ProjectSettings ja project-docs/evidence/week-48/web-test.png, ja Unity avaa projektin repositoryn kansiosta.",
          tallenna: "Commitin linkki viikon 48 päiväkirjaan.",
          sanat: ["repository", "commit", "push"],
          apu: {
            title: "Repositoryn rakenne ja commitin tarkistus",
            tree: "repository/\n├─ Assets/\n│  └─ Scenes/CafeGame.unity\n├─ Packages/\n├─ ProjectSettings/\n├─ project-docs/\n│  ├─ gdd.md\n│  └─ evidence/week-48/web-test.png\n├─ .gitignore\n└─ README.md\n\nLibrary/, Temp/ ja Builds/ jäävät Gitin ulkopuolelle.",
            vinkit: ["Jos Unity Hub avaa yhä vanhan kopion, poista vanha rivi Hubin projektilistasta: kolme pistettä → Remove from list."],
            links: [
              ["Avaa tämän työvaiheen kuvallinen tukiohje", "tuki/viikko-48.html#48-2"],
              ["GitHub Desktop: commit", "https://mattiseise.github.io/projektikoontisivu/ohjeet/github-desktop/?projekti=kahvilakoodi#commit"],
              [
                "GitHub Desktop: Push origin ja tarkistus GitHubista",
                "https://mattiseise.github.io/projektikoontisivu/ohjeet/github-desktop/?projekti=kahvilakoodi#push"
              ]
            ],
            code: "ENSIMMÄISEN COMMITIN TARKISTUS\n[ ] Assets mukana\n[ ] Packages mukana\n[ ] ProjectSettings mukana\n[ ] project-docs mukana\n[ ] README.md kertoo pelin tavoitteen\n[ ] Library, Temp ja Builds eivät ole mukana\n[ ] commit näkyy GitHubissa",
            test: "Kloonaa repository toiseen kansioon tai pyydä ohjaajaa avaamaan se. Unity luo puuttuvan Library-kansion itse, ja CafeGame-scene aukeaa, kun kaksoisklikkaat sitä Project-ikkunan Scenes-kansiossa."
          }
        },
        "48-3": {
          miksi: "GDD:ssä on kohtia, jotka vain asiakas voi päättää, esimerkiksi kierroksen pituus. Kun kirjaat vastaukset, voit myöhemmin näyttää, mihin pelin säännöt perustuvat.",
          osat: [
            { otsikko: "Etsi avoimet asiat", missa: "Toimeksianto-näkymä ja Suunnitelma (GDD) -näkymä", tee: "Lue toimeksiannon laatikko Sovi asiakkaan kanssa. Katso GDD:stä, mitkä asiakkaan kanssa sovittavat kohdat ovat vielä tyhjiä.", naet: "Tiedät laatikon neljä kysymystä, joihin asiakas vastaa." },
            { otsikko: "Kirjoita viisi kysymystä", missa: "Projektipäiväkirja, viikko 48", tee: "Kirjoita laatikon neljä kysymystä päiväkirjaan ja lisää yksi oma kysymys. Kirjoita jokaisen kysymyksen perään, mitä pelissä päätät vastauksen perusteella.", naet: "Päiväkirjassa on viisi kysymystä, esimerkiksi Kuinka pitkä kierros on? → ajastimen aloitusarvo." },
            { otsikko: "Sovi keskustelun aika", missa: "Aloituspalaveri ohjaajan kanssa", tee: "Kysy ohjaajalta, kuka on asiakkaana ja milloin keskustelet asiakkaan kanssa tällä viikolla.", naet: "Keskustelun päivä ja aika on kirjattu päiväkirjaan." },
            { otsikko: "Kysy ja kirjaa vastaukset", missa: "Aloituskeskustelu asiakkaan kanssa", tee: "Kysy kysymykset yksi kerrallaan ja kirjoita vastaus heti ylös. Jos asiakas ei osaa vastata, kirjoita vastauksen paikalle sana avoin. Älä keksi vastausta itse tai tekoälyllä.", naet: "Jokaisen kysymyksen perässä on vastaus tai sana avoin." },
            { otsikko: "Päivitä GDD", missa: "VS Code, project-docs/gdd.md", tee: "Avaa tiedosto project-docs/gdd.md. Kirjoita kierroksen pituus ja muut asiakkaan vastaukset kohtaan, jossa ovat asiakkaan kanssa sovittavat asiat. Tallenna tiedosto.", naet: "Tiedostossa näkyvät asiakkaan vastaukset. Avoimiksi jääneissä kohdissa lukee avoin." },
            { otsikko: "Vie GitHubiin", missa: "GitHub Desktop", tee: "Tee commit viestillä Päivitä GDD asiakkaan vastauksilla ja paina Push origin.", naet: "Commit näkyy GitHubissa." }
          ],
          valmis: "Päiväkirjassa on viisi kysymystä, ja jokaisen perässä on asiakkaan vastaus tai merkintä avoin. Päivitetty gdd.md on GitHubissa.",
          tallenna: "Kysymykset, vastaukset, keskustelun päivä ja osallistujien roolit viikon 48 päiväkirjaan. Älä kirjoita muiden ihmisten nimiä.",
          sanat: ["GDD"],
          esimerkki: "Kysymys: Kuinka pitkä yksi pelikierros on? → Päätös: ajastimen aloitusarvo. Vastaus: 60 sekuntia.",
          eiRiita: "Viisi lähes samaa kysymystä tai vastaus, jonka keksit itse tai tekoälyllä, kun asiakas ei vastannut.",
          apu: {
            title: "Kuvallinen tuki · työvaihe 48-3",
            links: [
              ["Avaa tämän työvaiheen kuvallinen tukiohje", "tuki/viikko-48.html#48-3"]
            ]
          }
        },
        "48-4": {
          miksi: "Kun pilkot ison tavoitteen enintään päivän mittaisiksi GitHub-issueiksi, tiedät joka päivä, mitä teet seuraavaksi ja milloin se on valmis.",
          osat: [
            { otsikko: "Pilko ensimmäinen feature", missa: "Suunnitelma (GDD) -näkymä, lista Featuret tekojärjestyksessä", tee: "Lue listan ensimmäinen feature: pelattava kierros. Kirjoita paperille 3–5 pientä asiaa, joita siihen tarvitaan.", naet: "Paperilla on esimerkiksi kolme ruutua, Aloita-painike ja ensimmäinen tilaus." },
            { otsikko: "Tee issuet", missa: "GitHub, repositoryn Issues → New issue", tee: "Tee jokaisesta pienestä asiasta oma issue avun pohjalla. Aloita otsikko verbillä, esimerkiksi Näytä asiakkaan tilaus.", naet: "Issues-listassa on 3–5 issueta." },
            { otsikko: "Lisää arvio ja Valmis kun", missa: "GitHub, jokainen issue", tee: "Kirjoita jokaiseen issueen arvio, puoli päivää tai yksi päivä, ja Valmis kun -ehto: mitä toinen ihminen näkee pelissä, kun issue on tehty.", naet: "Jokaisessa issuessa on arvio ja Valmis kun -ehto." },
            { otsikko: "Lisää muut featuret", missa: "GitHub, Issues", tee: "Tee yksi issue kustakin muusta featuresta paitsi asiakkaan toivomasta muutoksesta. Pilkot ne tarkemmin sillä viikolla, kun teet niitä.", naet: "Listassa on yksi issue tuotelistalle, kellolle, kasvavalle kiireelle ja top 5 -listalle." },
            { otsikko: "Merkitse tärkeys", missa: "GitHub, Issues → Labels", tee: "Luo labelit P0 pakollinen, P1 tärkeä ja P2 lisä. Anna jokaiselle issuelle yksi label. Kaikki toimeksiannon vaatimukset ovat pakollisia (P0).", naet: "Jokaisella issuella on yksi label." },
            { otsikko: "Pyydä hyväksyntä", missa: "Ohjaajan kanssa", tee: "Näytä Issues-lista ohjaajalle ja pyydä hyväksyntä rajaukselle eli sille, mitä peliin tehdään ja mitä jätetään pois.", naet: "Hyväksyjän rooli ja päivä on kirjattu päiväkirjaan." }
          ],
          valmis: "GitHubissa on 3–5 issueta pelattavalle kierrokselle ja yksi issue kustakin muusta featuresta. Jokaisessa on arvio, Valmis kun -ehto ja label pakollinen (P0), tärkeä (P1) tai lisä (P2), ja ohjaaja on hyväksynyt listan.",
          tallenna: "Linkki GitHubin Issues-listaan sekä hyväksyjän rooli ja päivä viikon 48 päiväkirjaan.",
          sanat: ["feature", "GitHub-issue", "backlog", "P0", "P1", "P2", "GDD"],
          esimerkki: "Issue: Näytä asiakkaan tilaus · 0,5 päivää · Valmis kun 1–3 tuotetta näkyy peliruudulla ennen kuin pelaaja valitsee.",
          eiRiita: "Yksi issue nimeltä Tee peli tai issue ilman Valmis kun -ehtoa. Jos listalla on vain vaatimusten toteutuksia, kaikki voivat olla pakollisia (P0). Lisätehtäviä ei tarvitse keksiä.",
          apu: {
            links: [
              ["Avaa tämän työvaiheen kuvallinen tukiohje", "tuki/viikko-48.html#48-4"]
            ],
            title: "Issuen pohja",
            code: "ISSUEN POHJA\nOtsikko: [verbi + näkyvä toiminto]\n\nMiksi tämä tarvitaan:\n[mikä toimeksiannon vaatimus]\n\nTeen:\n[rajattu muutos]\n\nValmis kun:\n[mitä toinen ihminen näkee pelissä]\n\nArvio:\n[0,5 tai 1 työpäivä]",
            test: "Valitse yksi issue sattumalta. Toinen ihminen osaa sen tekstin perusteella kertoa, mitä peliin muuttuu ja miten tulos testataan."
          }
        }
      },
      paivat: [
        ["Ma 23.11.", "Aloituspalaveri ja ensimmäinen onnistuminen ohjaajan kanssa. Sitten työvaihe 1: Unity-projekti ja selainkokeilu."],
        ["Ti 24.11.", "Työvaihe 2: Unity-projekti repositoryyn, commit ja push."],
        ["Ke 25.11.", "Työvaihe 3: kirjoita kysymykset asiakkaalle."],
        ["To 26.11.", "Työvaihe 3: aloituskeskustelu ja GDD:n päivitys."],
        ["Pe 27.11.", "Työvaihe 4: issuet ja tärkeysluokat. Viikon kirjaus."]
      ]
    },

    49: {
      type: "feature",
      termit: ["mockup", "UI", "Hierarchy", "metodi", "TODO", "hyväksymistesti", "Canvas", "Inspector", "asset"],
      feature: "Peliä voi pelata alusta loppuun: Aloita → asiakas tilaa kahvin → pelaaja toimittaa → tulosruutu näyttää pisteet.",
      excerpt: "Pelaajan tehtävänä on toimittaa oikea tilaus mahdollisimman nopeasti.",
      connection: "Viikon 48 issueiden mukaan rakennat nyt pelin rungon. Piirrät ensin luonnoksen kolmesta ruudusta ja rakennat ruudut sen mukaan. Teet GameManager-skriptin, joka vaihtaa ruutua, ja ensimmäisen tilauksen, jonka jälkeen peliä voi pelata. Viikolla 50 kahvin tilalle tulevat oikeat tuotteet tiedostosta.",
      paivamaarat: [
        ["Aloituspalaveri ohjaajan kanssa", "ma 30.11."],
        ["Viikon kirjaus", "pe 4.12."]
      ],
      deliverable: "Luonnos, kolme ruutua Unityssä, GameManager-skripti ja kierros, jonka voi pelata selaimessa alusta loppuun.",
      why: "Kun peliä voi pelata alusta loppuun jo nyt, lisäät jokaisen seuraavan featuren peliin, joka jo toimii. Selaimessa voi näkyä virheitä, joita Unity-editorissa ei näy.",
      done: "Aloita → Kahvi → Toimita → tulosruudulla lukee 10 pistettä. Polku toimii myös selainversiossa.",
      record: "Kirjoita Vko 49 -merkintään, mitä rakensit, kahden selainkokeilun tulokset ja commit-linkit. Lisää myös luonnoskuvan polku. Rastita lopuksi Näyttömatriisi-näkymässä kohta Kirjaston toiminnot ja työkalut.",
      skills: ["Unity Canvas", "C#-skripti", "pelitilat"],
      resources: [
        ["Kuvallinen tukiohje · viikko 49 · Unity 6", "tuki/viikko-49.html", false],
        ["Kenney.nl – ilmaiset CC0-assetit: hahmot, esineet ja käyttöliittymäkuvat", "https://kenney.nl/assets", false],
        ["OpenGameArt – 2D-hahmot ja taustat (tarkista lisenssi)", "https://opengameart.org/", false],
        ["Piskel – piirrä omat spritet selaimessa", "https://www.piskelapp.com/", false]
      ],
      tehtavat: {
        "49-1": {
          miksi: "Luonnos näyttää ennen koodaamista, mitä pelaaja näkee. Rakennat ruudut tämän kuvan mukaan heti seuraavassa työvaiheessa.",
          osat: [
            { otsikko: "Jaa paperi kolmeen osaan", missa: "Paperi", tee: "Jaa paperi kolmeen osaan ja kirjoita osien otsikoiksi Valikko, Peli ja Tulos.", naet: "Paperilla on kolme ruutua otsikoineen." },
            { otsikko: "Piirrä valikko", missa: "Paperi, Valikko-ruutu", tee: "Piirrä pelin nimi ja Aloita-painike.", naet: "Valikko-ruudussa on nimi ja yksi painike." },
            { otsikko: "Piirrä peliruutu", missa: "Paperi, Peli-ruutu", tee: "Piirrä asiakkaan tilaus, tuotepainikkeet Kahvi, Tee ja Sämpylä, Toimita-painike, aika, pisteet ja kohta, jossa peli kertoo, menikö toimitus oikein.", naet: "Peli-ruudussa on kuusi asiaa." },
            { otsikko: "Piirrä tulosruutu", missa: "Paperi, Tulos-ruutu", tee: "Piirrä loppupisteet, viiden parhaan tuloksen lista ja Pelaa uudelleen -painike.", naet: "Tulos-ruudussa on kolme asiaa." },
            { otsikko: "Piirrä nuolet", missa: "Paperi", tee: "Piirrä nuoli Aloita-painikkeesta peliruutuun, peliruudusta tulosruutuun ja Pelaa uudelleen -painikkeesta peliruutuun. Kirjoita peliruudun nuolen viereen: aika loppuu.", naet: "Kolme nuolta näyttää, miten ruudusta siirrytään toiseen." },
            { otsikko: "Tallenna kuva", missa: "Puhelin ja GitHub Desktop", tee: "Kuvaa paperi ja tallenna kuva polkuun project-docs/evidence/week-49/mockup.png. Tee commit ja push.", naet: "Kuva näkyy GitHubissa." }
          ],
          valmis: "Kuvassa on kolme ruutua, ja nuolet näyttävät, mihin Aloita ja Pelaa uudelleen vievät ja milloin peli siirtyy tulosruutuun.",
          tallenna: "Kuva polkuun project-docs/evidence/week-49/mockup.png, commit ja push.",
          sanat: ["UI", "mockup"],
          apu: {
            title: "Kuvallinen tuki · työvaihe 49-1",
            links: [
              ["Avaa tämän työvaiheen kuvallinen tukiohje", "tuki/viikko-49.html#49-1"]
            ]
          }
        },
        "49-2": {
          miksi: "Valikko-, peli- ja tulosruutu ovat pelin runko. Rakennat ruudut valmiiksi ennen koodia, jotta skripti voi myöhemmin vaihtaa niitä.",
          osat: [
            { otsikko: "Lisää Canvas", missa: "Unity, Hierarchy", tee: "Avaa CafeGame-scene. Valitse + → UI → Canvas.", naet: "Hierarchyssä ovat Canvas ja EventSystem. Canvas on alue, jolle tekstit ja painikkeet tulevat." },
            { otsikko: "Tee kolme paneelia", missa: "Unity, Hierarchy", tee: "Klikkaa Canvasia hiiren oikealla ja valitse UI → Panel. Tee näin kolme paneelia ja nimeä ne MenuPanel, GamePanel ja ResultPanel.", naet: "Canvasin alla on kolme paneelia." },
            { otsikko: "Rakenna valikko", missa: "Unity, MenuPanel", tee: "Lisää MenuPaneliin teksti UI → Text - TextMeshPro ja kirjoita siihen pelin nimi. Lisää painike UI → Button - TextMeshPro, nimeä se StartButton ja kirjoita sen tekstiksi Aloita.", naet: "MenuPanelissa näkyvät pelin nimi ja Aloita-painike. Jos Unity kysyy, paina Import TMP Essentials." },
            { otsikko: "Rakenna peliruutu", missa: "Unity, GamePanel", tee: "Lisää GamePaneliin tekstit OrderText, ScoreText ja TimeText. Lisää painikkeet CoffeeButton tekstillä Kahvi ja SubmitButton tekstillä Toimita.", naet: "GamePanelissa on kolme tekstiä ja kaksi painiketta." },
            { otsikko: "Rakenna tulosruutu", missa: "Unity, ResultPanel", tee: "Lisää ResultPaneliin teksti FinalScoreText ja painike RestartButton tekstillä Pelaa uudelleen. Siirrä kaikkien ruutujen tekstit ja painikkeet luonnoksesi mukaisille paikoille.", naet: "Tekstit ja painikkeet eivät ole päällekkäin." },
            { otsikko: "Piilota peli ja tulos", missa: "Unity, Inspector", tee: "Valitse GamePanel ja poista rasti Inspectorin yläreunasta nimen vierestä. Tee sama ResultPanelille. Paina Play.", naet: "Play-tilassa näkyy vain valikko." }
          ],
          valmis: "Hierarchy näyttää samalta kuin avun rakenne, ja Play-tilassa näkyy vain valikko.",
          tallenna: "Kuvakaappaus Hierarchy-ikkunasta polkuun project-docs/evidence/week-49/hierarchy.png, commit ja push.",
          sanat: ["Canvas", "Hierarchy", "Inspector", "UI"],
          apu: {
            links: [
              ["Avaa tämän työvaiheen kuvallinen tukiohje", "tuki/viikko-49.html#49-2"]
            ],
            title: "Scenen rakenne tämän työvaiheen jälkeen",
            tree: "CafeGame (scene)\n└─ Canvas\n   ├─ MenuPanel\n   │  └─ StartButton\n   ├─ GamePanel        (piilossa alussa)\n   │  ├─ OrderText\n   │  ├─ ScoreText\n   │  ├─ TimeText\n   │  ├─ CoffeeButton\n   │  └─ SubmitButton\n   └─ ResultPanel      (piilossa alussa)\n      ├─ FinalScoreText\n      └─ RestartButton",
            vinkit: ["Uudemmissa Unity 6 -versioissa valikon nimi voi olla UI (Canvas).", "Älä poista EventSystem-objektia. Ilman sitä painikkeet eivät reagoi klikkauksiin.", "Väliaikainen grafiikka riittää: harmaat paneelit ja oletuspainikkeet. Assetit eli valmiit kuvat ja äänet lisätään vasta viimeistelyssä."],
            test: "Paina Play. Vain MenuPanel näkyy.",
            images: [
              ["assets/unity/vko36-hierarchy-paneelit.png", "Unityn Hierarchy-paneeli: CafeGame-scene, jossa GameManager, ProductDatabase sekä Canvasin alla MenuPanel, GamePanel ja ResultPanel.", "Hierarchy viikon lopussa: Canvasin alla kolme paneelia. GameManager lisätään työvaiheessa 3."]
            ]
          }
        },
        "49-3": {
          miksi: "Pelin pitää itse näyttää oikea ruutu oikeaan aikaan. Silloin peliä voi pelata ilman, että kukaan koskee Unity-editoriin.",
          osat: [
            { otsikko: "Luo skripti", missa: "Unity, Project-ikkuna", tee: "Luo Assets-kansioon kansio Scripts. Klikkaa sitä hiiren oikealla ja valitse Create → Scripting → MonoBehaviour Script. Anna nimeksi GameManager.", naet: "Scripts-kansiossa on GameManager." },
            { otsikko: "Liitä työpohja", missa: "VS Code", tee: "Avaa skripti kaksoisklikkaamalla. Korvaa sen sisältö avun työpohjalla ja tallenna.", naet: "Unityn Console-ikkunassa ei ole punaisia virheitä." },
            { otsikko: "Tee GameManager-objekti", missa: "Unity, Hierarchy", tee: "Valitse + → Create Empty ja nimeä objekti GameManager. Raahaa GameManager-skripti sen päälle.", naet: "Inspectorissa näkyvät GameManager-skripti ja sen tyhjät kentät." },
            { otsikko: "Kytke paneelit", missa: "Unity, Inspector", tee: "Raahaa MenuPanel, GamePanel ja ResultPanel Hierarchystä kenttiin Menu Panel, Game Panel ja Result Panel.", naet: "Kentissä lukevat paneelien nimet eikä None." },
            { otsikko: "Kytke painikkeet", missa: "Unity, Inspector, Button-komponentti", tee: "Valitse StartButton ja paina On Click () -listan +. Raahaa GameManager-objekti uuden rivin tyhjään kenttään ja valitse GameManager → StartGame. Kytke RestartButton samalla tavalla metodiin RestartGame.", naet: "Kummankin painikkeen On Click () -listassa on yksi rivi." },
            { otsikko: "Kokeile", missa: "Unity, Play", tee: "Paina Play ja sitten Aloita.", naet: "Peliruutu tulee näkyviin, ja valikko katoaa." }
          ],
          valmis: "Play-tilassa Aloita vaihtaa valikon peliruutuun.",
          tallenna: "Commit ja push. Commit-linkki viikon 49 päiväkirjaan.",
          sanat: ["metodi"],
          apu: {
            links: [
              ["Avaa tämän työvaiheen kuvallinen tukiohje", "tuki/viikko-49.html#49-3"]
            ],
            title: "GameManager-työpohja (käytät samaa tiedostoa myös työvaiheessa 4)",
            code: "using TMPro;\nusing UnityEngine;\n\npublic class GameManager : MonoBehaviour\n{\n    [SerializeField] private GameObject menuPanel;\n    [SerializeField] private GameObject gamePanel;\n    [SerializeField] private GameObject resultPanel;\n    [SerializeField] private TMP_Text orderText;\n    [SerializeField] private TMP_Text scoreText;\n    [SerializeField] private TMP_Text finalScoreText;\n\n    private int score;\n    private bool coffeeSelected;\n\n    private void Start()\n    {\n        ShowOnly(menuPanel);\n    }\n\n    public void StartGame()\n    {\n        score = 0;\n        coffeeSelected = false;\n        // TODO työvaihe 4: kirjoita orderText-kenttään \"Asiakas tilaa: Kahvi\"\n        // TODO työvaihe 4: näytä pisteet scoreText-kentässä\n        ShowOnly(gamePanel);\n    }\n\n    public void SelectCoffee()\n    {\n        coffeeSelected = true;\n    }\n\n    public void SubmitOrder()\n    {\n        // TODO työvaihe 4: jos coffeeSelected on true, lisää pisteisiin 10\n        // TODO työvaihe 4: näytä uudet pisteet scoreText-kentässä\n        EndGame(); // viikolla 51 peli päättyy vasta, kun aika loppuu\n    }\n\n    public void EndGame()\n    {\n        // TODO työvaihe 4: näytä pisteet finalScoreText-kentässä\n        ShowOnly(resultPanel);\n    }\n\n    public void RestartGame()\n    {\n        StartGame();\n    }\n\n    private void ShowOnly(GameObject panel)\n    {\n        menuPanel.SetActive(panel == menuPanel);\n        gamePanel.SetActive(panel == gamePanel);\n        resultPanel.SetActive(panel == resultPanel);\n    }\n}",
            vinkit: ["MonoBehaviour on C#-skripti, jonka voi liittää Unityn objektiin.", "[SerializeField] tuo kentän näkyviin Inspectoriin, jotta voit raahata paneelin siihen.", "Vanhemmissa Unity-versioissa skripti luodaan valinnalla Create → C# Script."],
            test: "Paina Play: näkyy vain valikko. Paina Aloita: näkyy vain peliruutu.",
            images: [
              ["assets/unity/vko36-button-onclick.png", "Unityn Inspector: StartButtonin Button-komponentti, jonka On Click -listassa on GameManager ja StartGame-metodi.", "StartButtonin On Click -lista: GameManager → StartGame."]
            ]
          }
        },
        "49-4": {
          miksi: "Tämä on pelin ydin pienimmillään: asiakas tilaa, pelaaja toimittaa ja saa pisteet. Kun kokeilet peliä selaimessa, näet, toimiiko se myös asiakkaan koneella.",
          osat: [
            { otsikko: "Kytke tekstit", missa: "Unity, Inspector", tee: "Valitse GameManager-objekti. Raahaa OrderText, ScoreText ja FinalScoreText skriptin kenttiin.", naet: "Kentissä lukevat tekstien nimet." },
            { otsikko: "Täydennä aloitus", missa: "VS Code, GameManager.cs", tee: "Täydennä StartGame-metodin TODO-rivit: kirjoita OrderText-tekstiin Asiakas tilaa: Kahvi ja näytä pisteet ScoreText-tekstissä.", naet: "Play-tilassa peliruudulla lukee Asiakas tilaa: Kahvi." },
            { otsikko: "Kytke Kahvi ja Toimita", missa: "Unity, Inspector", tee: "Kytke CoffeeButtonin On Click () -listaan GameManager → SelectCoffee ja SubmitButtonin listaan GameManager → SubmitOrder.", naet: "Kummassakin painikkeessa on yksi On Click () -rivi." },
            { otsikko: "Täydennä toimitus ja loppu", missa: "VS Code, GameManager.cs", tee: "Täydennä SubmitOrder: jos kahvi on valittu, lisää pisteisiin 10. Täydennä EndGame: näytä pisteet FinalScoreText-tekstissä.", naet: "Play-tilassa Aloita → Kahvi → Toimita näyttää tulosruudulla 10 pistettä." },
            { otsikko: "Kirjoita odotettu tulos", missa: "Projektipäiväkirja, viikko 49", tee: "Kirjoita ennen selainkokeilua odotettu tulos: Aloita → Kahvi → Toimita → tulosruudulla 10.", naet: "Odotettu tulos on kirjattu ennen kokeilua." },
            { otsikko: "Kokeile selaimessa", missa: "Unity, File → Build Profiles → Build And Run", tee: "Tee selainversio ja pelaa kierros kahdesti. Käytä välillä Pelaa uudelleen -painiketta. Kirjaa jokaisesta kierroksesta, menikö se odotetusti.", naet: "Molemmilla kerroilla tulosruudulla lukee 10. Jos ei, kirjaa ensin, mitä tapahtui, ja korjaa vasta sitten." }
          ],
          valmis: "Aloita → Kahvi → Toimita → tulosruudulla lukee 10 pistettä, myös selainversiossa.",
          tallenna: "Kahden selainkokeilun tulokset viikon 49 päiväkirjaan. Commit ja push sekä commit-linkki päiväkirjaan.",
          sanat: ["TODO", "hyväksymistesti"],
          esimerkki: "Odotettu tulos: Aloita → Kahvi → Toimita → tulosruudulla 10. Kokeilu 1: tulosruudulla 10, meni odotetusti. Kokeilu 2 Pelaa uudelleen -painikkeen jälkeen: pisteet alkoivat nollasta, ja tulos oli 10.",
          eiRiita: "”Toimii” ilman odotettua tulosta tai testaus pelkästään Unity-editorissa.",
          apu: {
            links: [
              ["Avaa tämän työvaiheen kuvallinen tukiohje", "tuki/viikko-49.html#49-4"]
            ],
            title: "Tekstikentän päivitys C#:ssa",
            code: "orderText.text = \"Asiakas tilaa: Kahvi\";\nscoreText.text = \"Pisteet: \" + score;\n\nif (coffeeSelected)\n{\n    score += 10;\n}",
            test: "Paina Toimita valitsematta kahvia. Pisteet pysyvät nollassa."
          }
        }
      },
      paivat: [
        ["Ma 30.11.", "Aloituspalaveri. Työvaihe 1: luonnos."],
        ["Ti 1.12.", "Työvaihe 2: valikko-, peli- ja tulosruutu."],
        ["Ke 2.12.", "Työvaihe 3: GameManager vaihtaa ruutua."],
        ["To 3.12.", "Työvaihe 4: ensimmäinen tilaus."],
        ["Pe 4.12.", "Työvaihe 4: selainkokeilu. Viikon kirjaus."]
      ]
    },

    50: {
      type: "feature",
      termit: ["JSON", "Console"],
      feature: "Asiakas tilaa 1–3 tuotetta, jotka arvotaan products.json-tiedostosta, ja pelaaja valitsee tuotteet painikkeilla.",
      excerpt: "Tuotteiden tiedot eivät saa olla kovakoodattuna pelilogiikkaan, vaan niiden pitää tulla erillisestä tietolähteestä.",
      connection: "Viikolla 49 asiakas tilasi aina kahvin. Nyt tuotteet tulevat products.json-tiedostosta, joten valikoimaa voi muuttaa koskematta koodiin. Kolme skriptiä jakaa työn: ProductDatabase lukee tiedoston, OrderManager arpoo tilauksen ja tarkistaa toimituksen, ja GameManager näyttää tekstit. Viikolla 51 peliin tulee kello.",
      paivamaarat: [
        ["Aloituspalaveri ohjaajan kanssa", "ma 7.12."],
        ["Viikon kirjaus", "pe 11.12."]
      ],
      deliverable: "products.json, ProductDatabase- ja OrderManager-skriptit sekä kolme tuotepainiketta.",
      why: "Kun tuotteet ovat omassa tiedostossaan, asiakas voi muuttaa valikoimaa ilman ohjelmoijaa. Jos tiedosto on rikki, sinun tarvitsee etsiä virhettä vain yhdestä paikasta: tuotetiedostosta.",
      done: "Tilaus vaihtuu joka pelissä, ja siinä on 1–3 tuotetta. Oikea toimitus antaa tuotteiden pisteet yhteensä, ja väärä toimitus antaa 0 pistettä.",
      record: "Kirjoita Vko 50 -merkintään tiedoston polku, tiedon kulku products.json → ProductDatabase → OrderManager → GameManager → OrderText omin sanoin ja commit-linkit. Rastita lopuksi Näyttömatriisi-näkymässä kohta Rajapinnat ja tieto.",
      skills: ["JSON", "C#-luokat", "virheenkäsittely"],
      tehtavat: {
        "50-1": {
          miksi: "Asiakas haluaa, että tuotteita voi muuttaa koskematta koodiin. Siksi tuotteet ovat omassa tiedostossaan.",
          osat: [
            { otsikko: "Luo tiedosto", missa: "Unity, Project-ikkuna ja VS Code", tee: "Luo Assets-kansioon kansio Data. Luo sinne VS Codella tiedosto products.json.", naet: "Project-ikkunassa näkyvät Data-kansio ja sen sisällä products.json." },
            { otsikko: "Kirjoita kolme tuotetta", missa: "VS Code, products.json", tee: "Kirjoita tiedostoon kolme tuotetta avun mallin mukaan. Jokaisella tuotteella on id (tunniste), name (nimi) ja points (pisteet).", naet: "Tiedostossa ovat kahvi, tee ja sämpylä." },
            { otsikko: "Anna pisteet", missa: "VS Code, products.json", tee: "Anna points-arvoksi se pistemäärä, jonka päätit GDD:ssä oikealle toimitukselle, esimerkiksi 10.", naet: "Jokaisella tuotteella on pistearvo." },
            { otsikko: "Tarkista muoto", missa: "VS Code, products.json", tee: "Tarkista lainausmerkit nimien ympärillä, pilkut tuotteiden välissä ja hakasulkeet listan ympärillä. Tallenna tiedosto.", naet: "VS Code ei näytä punaista alleviivausta." },
            { otsikko: "Katso tiedosto Unityssä", missa: "Unity, Project-ikkuna", tee: "Klikkaa products.json-tiedostoa.", naet: "Inspector näyttää tiedoston sisällön ja kolme tuotetta." }
          ],
          valmis: "Unityn Inspector näyttää products.json-tiedoston, ja siinä on kolme tuotetta.",
          tallenna: "Commit ja push.",
          sanat: ["JSON", "GDD"],
          apu: {
            title: "products.json-malli",
            code: "{\n  \"products\": [\n    { \"id\": \"kahvi\",   \"name\": \"Kahvi\",   \"points\": 10 },\n    { \"id\": \"tee\",     \"name\": \"Tee\",     \"points\": 10 },\n    { \"id\": \"sampyla\", \"name\": \"Sämpylä\", \"points\": 10 }\n  ]\n}",
            vinkit: ["Kirjoita id ilman ääkkösiä ja välilyöntejä. Sen avulla koodi tunnistaa tuotteen.", "name näkyy pelaajalle, joten siinä saa olla ääkkösiä."],
            test: "Poista yksi pilkku. VS Code näyttää punaisen virheen. Palauta pilkku."
          }
        },
        "50-2": {
          miksi: "ProductDatabase on ainoa skripti, joka lukee tuotetiedoston. Kun vain yksi skripti lukee tiedostoa, sinun tarvitsee etsiä tiedoston lukemiseen liittyviä virheitä vain siitä.",
          osat: [
            { otsikko: "Luo skripti", missa: "Unity, Scripts-kansio", tee: "Luo skripti ProductDatabase ja korvaa sen sisältö avun työpohjalla.", naet: "Console-ikkunassa ei ole punaisia virheitä." },
            { otsikko: "Lue luokat", missa: "VS Code, ProductDatabase.cs", tee: "Lue työpohjasta kaksi luokkaa: ProductData on yksi tuote ja ProductList on tuotteiden lista.", naet: "Tiedät, missä luokassa ovat kentät id, name ja points." },
            { otsikko: "Tee objekti", missa: "Unity, Hierarchy", tee: "Luo tyhjä objekti ProductDatabase ja raahaa skripti sen päälle.", naet: "Inspectorissa näkyy kenttä Products Json." },
            { otsikko: "Kytke tiedosto", missa: "Unity, Inspector", tee: "Raahaa products.json Project-ikkunasta kenttään Products Json.", naet: "Kentässä lukee products." },
            { otsikko: "Täydennä tyhjän kentän tarkistus", missa: "VS Code, ProductDatabase.cs", tee: "Täydennä TODO 1: jos Products Json -kenttä on tyhjä, kirjoita virheilmoitus Consoleen ja palauta tyhjä lista.", naet: "Console-ikkunassa ei ole punaisia virheitä." },
            { otsikko: "Täydennä rikkinäisen tiedoston tarkistus", missa: "VS Code, ProductDatabase.cs", tee: "Täydennä TODO 2: ota rikkinäisen JSONin virhe kiinni try–catch-lohkolla ja kirjoita virheilmoitus Consoleen. Aja sitten avun tarkistustesti.", naet: "Avun tarkistustestissä Console näyttää Kahvi." }
          ],
          valmis: "Molemmat TODO-kohdat on täydennetty, ja avun tarkistustestissä Console näyttää Kahvi.",
          tallenna: "Commit ja push.",
          sanat: ["Console"],
          apu: {
            title: "ProductDatabase-työpohja",
            tree: "Assets/\n├─ Data/products.json\n└─ Scripts/\n   ├─ GameManager.cs\n   ├─ ProductDatabase.cs\n   └─ OrderManager.cs      (työvaihe 3)",
            code: "using UnityEngine;\n\n[System.Serializable]\npublic class ProductData\n{\n    public string id;\n    public string name;\n    public int points;\n}\n\n[System.Serializable]\npublic class ProductList\n{\n    public ProductData[] products;\n}\n\npublic class ProductDatabase : MonoBehaviour\n{\n    [SerializeField] private TextAsset productsJson;\n\n    public ProductList LoadProducts()\n    {\n        // TODO 1: jos productsJson on null, kirjoita Debug.LogError(\"…\")\n        //         ja palauta new ProductList { products = new ProductData[0] }\n\n        // TODO 2: rikkinäinen JSON aiheuttaa virheen (ArgumentException).\n        //         Ota se kiinni try–catch-lohkolla ja palauta tyhjä lista.\n        return JsonUtility.FromJson<ProductList>(productsJson.text);\n    }\n}\n\n// try–catch-lohkon malli:\n// try\n// {\n//     koodi, joka voi aiheuttaa virheen\n// }\n// catch (System.ArgumentException)\n// {\n//     mitä tehdään, kun virhe tulee\n// }",
            vinkit: [
              "TextAsset on Unityn viite tekstitiedostoon. Siksi products.json voidaan raahata kenttään.",
              "Console-ikkuna näyttää Debug.Log- ja Debug.LogError-viestit. Avaa se valinnalla Window → General → Console."
            ],
            test: "Lisää testiksi ProductDatabaseen metodi private void Start() { Debug.Log(LoadProducts().products[0].name); } ja paina Play. Consolessa lukee Kahvi. Poista rivi testin jälkeen.",
            images: [
              ["assets/unity/vko37-textasset-inspector.png", "Unityn Inspector: ProductDatabase-skripti, jonka Products Json -kenttään on raahattu products-TextAsset.", "products.json raahattuna ProductDatabase-skriptin Products Json -kenttään."]
            ]
          }
        },
        "50-3": {
          miksi: "Toimeksiannon mukaan asiakas tilaa 1–3 tuotetta. OrderManager hoitaa tilaukset, jotta GameManager pysyy yksinkertaisena.",
          osat: [
            { otsikko: "Luo skripti", missa: "Unity, Scripts-kansio", tee: "Luo skripti OrderManager avun työpohjasta ja liitä se GameManager-objektiin.", naet: "GameManager-objektin Inspectorissa on kaksi skriptiä." },
            { otsikko: "Kytke tuotelista", missa: "Unity, Inspector", tee: "Raahaa ProductDatabase-objekti OrderManager-skriptin kenttään Product Database.", naet: "Kentässä lukee ProductDatabase." },
            { otsikko: "Täydennä tilauksen arvonta", missa: "VS Code, OrderManager.cs", tee: "Täydennä CreateOrder: arvo tilaukseen 1–3 tuotetta listasta ja palauta tilausteksti, esimerkiksi Asiakas tilaa: Kahvi, Sämpylä.", naet: "Console-ikkunassa ei ole punaisia virheitä." },
            { otsikko: "Kytke GameManager", missa: "VS Code ja Unity, Inspector", tee: "Lisää GameManageriin kenttä [SerializeField] private OrderManager orderManager; ja raahaa GameManager-objekti Inspectorissa GameManager-skriptin kenttään Order Manager.", naet: "Kentässä lukee GameManager." },
            { otsikko: "Näytä tilaus", missa: "VS Code, GameManager.cs", tee: "Muuta StartGame-metodia niin, että OrderText-tekstiin tulee CreateOrder-metodin palauttama teksti.", naet: "Play-tilassa peliruudulla näkyy arvottu tilaus." },
            { otsikko: "Kokeile viisi kertaa", missa: "Unity, Play", tee: "Paina Aloita, katso tilaus ja paina Toimita. Paina tulosruudulla Pelaa uudelleen. Toista, kunnes olet nähnyt viisi tilausta. Kirjaa tilaukset päiväkirjaan.", naet: "Tilaus vaihtuu, ja siinä on 1–3 tuotetta." }
          ],
          valmis: "Play-tilassa tilaus vaihtuu joka pelissä, ja siinä on 1–3 tuotetta.",
          tallenna: "Viisi tilausta viikon 50 päiväkirjaan. Commit ja push.",
          apu: {
            title: "OrderManager-työpohja",
            code: "using System.Collections.Generic;\nusing UnityEngine;\n\npublic class OrderManager : MonoBehaviour\n{\n    [SerializeField] private ProductDatabase productDatabase;\n\n    private ProductData[] products;\n    private readonly List<ProductData> currentOrder = new List<ProductData>();\n    private readonly List<string> selectedIds = new List<string>();\n\n    private void Awake()\n    {\n        products = productDatabase.LoadProducts().products;\n    }\n\n    public string CreateOrder()\n    {\n        currentOrder.Clear();\n        selectedIds.Clear();\n        if (products.Length == 0) return \"Tuotteita ei löytynyt\";\n        int count = Random.Range(1, 4); // antaa luvun 1, 2 tai 3\n        // TODO: lisää currentOrder-listaan count kappaletta satunnaisia tuotteita:\n        //       products[Random.Range(0, products.Length)]\n        // TODO: palauta teksti, esim. \"Asiakas tilaa: Kahvi, Sämpylä\"\n        return \"\";\n    }\n\n    public void SelectProduct(string id)\n    {\n        selectedIds.Add(id);\n    }\n\n    // Palauttaa oikean toimituksen pisteet tai 0, jos toimitus oli väärä.\n    public int CheckDelivery()\n    {\n        // TODO työvaihe 4: vertaa valintoja tilaukseen (malli työvaiheen 4 avussa)\n        return 0;\n    }\n}",
            vinkit: [
              "Random.Range(1, 4) antaa kokonaisluvun 1, 2 tai 3: yläraja ei ole mukana.",
              "GameManager ja OrderManager ovat saman objektin komponentteja. Siksi raahaat GameManager-objektin Order Manager -kenttään."
            ],
            test: "Pelaa viisi kierrosta. Tilauksessa on joka kerta 1–3 tuotetta, eikä sama tilaus toistu joka kerta."
          }
        },
        "50-4": {
          miksi: "Pelaaja valitsee tuotteet painikkeilla, ja pelin pitää tietää, menikö toimitus oikein.",
          osat: [
            { otsikko: "Lisää painikkeet", missa: "Unity, GamePanel", tee: "Lisää GamePaneliin painikkeet TeaButton tekstillä Tee ja BreadButton tekstillä Sämpylä.", naet: "Peliruudulla on kolme tuotepainiketta." },
            { otsikko: "Poista vanha kytkentä", missa: "Unity, CoffeeButton, Inspector", tee: "Valitse On Click () -listasta rivi SelectCoffee ja paina −.", naet: "CoffeeButtonin On Click () -lista on tyhjä." },
            { otsikko: "Kytke tuotepainikkeet", missa: "Unity, Inspector", tee: "Kytke kolme tuotepainiketta GameManager-objektin metodiin OrderManager → SelectProduct. Kirjoita parametriksi tuotteen id: kahvi, tee tai sampyla.", naet: "Jokaisen painikkeen On Click () -rivillä näkyy oma id." },
            { otsikko: "Täydennä tarkistus", missa: "VS Code, OrderManager.cs", tee: "Täydennä CheckDelivery avun mallin mukaan: metodi palauttaa oikeasta toimituksesta tuotteiden pisteet yhteensä ja väärästä 0.", naet: "Console-ikkunassa ei ole punaisia virheitä." },
            { otsikko: "Laske pisteet", missa: "VS Code, GameManager.cs", tee: "Muuta SubmitOrder-metodia niin, että pisteisiin lisätään CheckDelivery-metodin palauttama arvo.", naet: "Play-tilassa oikea toimitus antaa tuotteiden pisteet ja väärä 0." },
            { otsikko: "Kirjoita tiedon kulku", missa: "Projektipäiväkirja, viikko 50", tee: "Kirjoita omin sanoin, mitä tiedolle tapahtuu jokaisen nuolen kohdalla: products.json → ProductDatabase → OrderManager → GameManager → OrderText.", naet: "Jokaisen nuolen kohdalla on yksi virke." }
          ],
          valmis: "Oikea toimitus antaa tuotteiden pisteet yhteensä, väärä toimitus antaa 0 pistettä, ja tiedon kulku on kirjattu.",
          tallenna: "Tiedon kulku viikon 50 päiväkirjaan. Commit ja push.",
          eiRiita: "Tuotetiedosto on olemassa, mutta kahvi ja sen pisteet on silti kirjoitettu myös C#-koodiin.",
          apu: {
            title: "Listojen vertailu CheckDelivery-metodissa",
            code: "// Lisää OrderManager.cs-tiedoston alkuun:\nusing System.Linq;\n\npublic int CheckDelivery()\n{\n    List<string> orderIds = currentOrder.Select(p => p.id).ToList();\n    orderIds.Sort();\n    selectedIds.Sort();\n    // TODO: jos orderIds.SequenceEqual(selectedIds) on true,\n    //       palauta currentOrder.Sum(p => p.points)\n    // TODO: muuten palauta 0\n    return 0;\n}",
            vinkit: ["Sort järjestää listan aakkosjärjestykseen. Kun molemmat listat on järjestetty, valintajärjestyksellä ei ole väliä.", "SequenceEqual vertaa, ovatko kaksi listaa samat alkio alkiolta.", "Painikkeen On Click () -lista osaa antaa metodille yhden tekstiparametrin. Siksi yksi SelectProduct-metodi riittää kaikille tuotteille."],
            test: "Tilaus Kahvi, Tee: valitse ensin Tee ja sitten Kahvi. Toimitus on silti oikein."
          }
        }
      },
      paivat: [
        ["Ma 7.12.", "Aloituspalaveri. Työvaihe 1: products.json."],
        ["Ti 8.12.", "Työvaihe 2: ProductDatabase."],
        ["Ke 9.12.", "Työvaihe 3: OrderManager arpoo tilauksen."],
        ["To 10.12.", "Työvaihe 4: tuotepainikkeet ja tarkistus."],
        ["Pe 11.12.", "Työvaihe 4: tiedon kulku. Viikon kirjaus."]
      ]
    },

    51: {
      type: "feature",
      feature: "Kello laskee, pelaaja näkee heti, menikö toimitus oikein, ja kierros päättyy vasta, kun aika loppuu.",
      excerpt: "Pelaajan tehtävänä on toimittaa oikea tilaus mahdollisimman nopeasti.",
      connection: "Viikolla 50 peli päättyi ensimmäiseen toimitukseen. Nyt kello päättää kierroksen, ja palaute kertoo heti, menikö toimitus oikein. Tämä on viimeinen viikko ennen joululomaa, joten sovit maanantaina myös loman työpäivät. Ohjaaja on tavoitettavissa vielä torstaina.",
      paivamaarat: [
        ["Aloituspalaveri ja lomaviikkojen sopiminen", "ma 14.12."],
        ["Ohjaaja tavoitettavissa viimeisen kerran ennen lomaa", "to 17.12."],
        ["Viikon kirjaus, commit ja push ennen lomaa", "pe 18.12."]
      ],
      deliverable: "Lomaviikkojen työsuunnitelma, ajastin ja palaute toimituksesta.",
      why: "Kun aika on rajattu, pelaajalle tulee kiire, ja peli muuttuu haastavaksi. Toimeksianto vaatii myös, että pelissä on päättymisnäkymä. Ohjaaja ja asiakas eivät ole tavoitettavissa 18.12.–11.1., joten sovit työpäivät ja aloituskohdat nyt.",
      done: "Lomaviikkojen työpäivät on kirjattu. Aika laskee, pelaaja voi toimittaa monta tilausta, palaute näkyy jokaisen toimituksen jälkeen ja tulosruutu aukeaa kerran, kun aika on 0.",
      record: "Kirjoita Vko 51 -merkintään lomaviikkojen työpäivät, kierroksen pituus, sääntö siitä, saavatko pisteet mennä alle nollan, perusteluineen ja commit-linkit.",
      skills: ["C#-pelisäännöt", "aika ja Update-metodi", "palaute pelaajalle"],
      tehtavat: {
        "51-1": {
          miksi: "Ohjaaja ja asiakas eivät ole tavoitettavissa 18.12.–11.1. Kun työpäivät ja aloituskohdat on sovittu etukäteen, tiedät lomalla joka päivä, mistä aloitat.",
          osat: [
            { otsikko: "Katso lomaviikot", missa: "Tämä sivusto, viikot 52, 53 ja 1", tee: "Avaa viikot 52, 53 ja 1 ja lue niiden Päivärytmi.", naet: "Tiedät, mitä kullakin lomaviikolla tehdään." },
            { otsikko: "Valitse työpäivät", missa: "Aloituspalaveri ohjaajan kanssa", tee: "Sovi ohjaajan kanssa, minä päivinä ja mihin aikaan teet projektia viikoilla 52, 53 ja 1 ja millä koneella. Viikolla 52 työpäiviä on kolme (ma–ke), ja ne voivat olla lyhyitä.", naet: "Sinulla on lista päivistä, kellonajoista ja koneesta." },
            { otsikko: "Kirjaa suunnitelma", missa: "Projektipäiväkirja, viikko 51", tee: "Kirjoita jokaiselle sovitulle päivälle kellonaika ja työvaihe, josta aloitat.", naet: "Päiväkirjassa ovat lomaviikkojen työpäivät ja aloituskohdat." },
            { otsikko: "Lisää muistutukset", missa: "Puhelin tai oma kalenteri", tee: "Lisää sovitut työpäivät kalenteriin muistutuksineen.", naet: "Kalenterissa on muistutus jokaisena sovittuna päivänä." },
            { otsikko: "Käy kesken jäävän työn sääntö läpi", missa: "Aloituspalaveri ohjaajan kanssa", tee: "Lue ohjaajan kanssa Jos et tiedä, mitä tehdä -ohjeen kohta 5. Siinä kerrotaan, mitä teet lomalla kesken jääneelle työlle. Sovi, muutetaanko sääntöä.", naet: "Sääntö tai sovittu muutos on kirjattu viikon 51 päiväkirjaan." },
            { otsikko: "Kokeile lomakone", missa: "Lomalla käyttämäsi kone", tee: "Jos teet lomalla eri koneella kuin koulussa, asenna sinne Unity, Web Build Support ja GitHub Desktop. Kloonaa repository ja tee Build And Run viimeistään to 17.12.", naet: "Peli aukeaa lomakoneen selaimessa. Jos käytät samaa konetta kuin koulussa, rastita tämä heti." }
          ],
          valmis: "Lomaviikkojen työpäivät, kellonajat ja aloituskohdat ovat päiväkirjassa ja kalenterissa, ja kesken jäävästä työstä on sovittu.",
          tallenna: "Lomaviikkojen suunnitelma viikon 51 päiväkirjaan."
        },
        "51-2": {
          miksi: "Kun aikaa on rajallisesti, pelaajalle tulee kiire, ja peli muuttuu haastavaksi. Ajastin myös päättää kierroksen, joten pelaaja ei voi pelata loputtomasti.",
          osat: [
            { otsikko: "Päätä säännöt", missa: "Projektipäiväkirja, viikko 51", tee: "Kirjoita kierroksen pituus sekunteina. Käytä asiakkaan kanssa sovittua pituutta tai, jos sitä ei ole sovittu, 60 sekuntia. Kirjoita myös, saavatko pisteet mennä alle nollan, ja perustele yhdellä virkkeellä.", naet: "Päiväkirjassa on kaksi sääntöä: kierroksen pituus sekunteina ja päätös siitä, saavatko pisteet mennä alle nollan." },
            { otsikko: "Lisää kentät", missa: "VS Code, GameManager.cs", tee: "Lisää GameManageriin avun työpohjan neljä kenttää: timeText, roundSeconds (kierroksen pituus), timeLeft (jäljellä oleva aika) ja isPlaying (onko peli käynnissä).", naet: "Console-ikkunassa ei ole punaisia virheitä." },
            { otsikko: "Kytke aika", missa: "Unity, Inspector", tee: "Raahaa TimeText GameManager-skriptin kenttään Time Text. Kirjoita Round Seconds -kenttään kierroksen pituus.", naet: "Kentissä ovat TimeText ja oma lukusi." },
            { otsikko: "Käynnistä kello", missa: "VS Code, GameManager.cs", tee: "Täydennä StartGame: timeLeft saa kierroksen pituuden ja isPlaying arvon true. Lisää avun Update-metodi ja täydennä sen TODO: näytä aika TimeText-tekstissä.", naet: "Play-tilassa aika laskee peliruudulla." },
            { otsikko: "Pysäytä kello lopussa", missa: "VS Code, GameManager.cs", tee: "Kirjoita EndGame-metodin ensimmäiseksi riviksi isPlaying = false;. Poista SubmitOrder-metodista EndGame-kutsu.", naet: "Pelaaja voi toimittaa monta tilausta, ja tulosruutu aukeaa kerran, kun aika on 0." }
          ],
          valmis: "Play-tilassa aika laskee, pelaaja voi toimittaa monta tilausta ja tulosruutu aukeaa kerran, kun aika on 0.",
          tallenna: "Säännöt viikon 51 päiväkirjaan. Commit ja push.",
          esimerkki: "Oikea tilaus: tuotteiden pisteet · väärä −5 · aika 60 s · peli päättyy kerran, kun aika on 0 · pisteet eivät mene alle nollan.",
          apu: {
            title: "Ajastin GameManageriin",
            code: "// Lisää nämä GameManager-luokan kenttien joukkoon:\n[SerializeField] private TMP_Text timeText;\n[SerializeField] private float roundSeconds = 60f;\nprivate float timeLeft;\nprivate bool isPlaying;\n\nprivate void Update()\n{\n    if (!isPlaying) return;\n    timeLeft -= Time.deltaTime;\n    // TODO: näytä aika timeText-kentässä: Mathf.CeilToInt(timeLeft)\n    if (timeLeft <= 0f) EndGame();\n}\n\n// Täydennä StartGame:\n// TODO: timeLeft = roundSeconds; isPlaying = true;\n\n// Täydennä EndGame ensimmäiseksi riviksi:\n// TODO: isPlaying = false;",
            vinkit: ["Update on Unityn metodi, jota kutsutaan joka ruudunpäivityksellä, noin 60 kertaa sekunnissa.", "Time.deltaTime on edellisestä ruudunpäivityksestä kulunut aika sekunteina. Kun vähennät sen joka kerta, aika laskee oikealla nopeudella.", "roundSeconds näkyy Inspectorissa. Voit muuttaa kierroksen pituutta testissä koskematta koodiin."],
            test: "Aseta Round Seconds -arvoksi Inspectorissa 3, paina Play ja Aloita. Tulosruutu aukeaa kolmen sekunnin jälkeen. Palauta sitten oma kierroksen pituus.",
            images: [
              ["assets/unity/vko38-game-view.png", "Unityn Game-näkymä: kahvilavuoro käynnissä väliaikaisella grafiikalla. Näkyvissä tilaus, aika, pisteet, Kahvi- ja Toimita-painikkeet sekä palauteteksti.", "Game view: tilaus, aika, pisteet ja palaute riittävät. Grafiikka viimeistellään myöhemmin."]
            ]
          }
        },
        "51-3": {
          miksi: "Pelaaja oppii pelaamaan paremmin vain, jos hän näkee heti, menikö toimitus oikein.",
          osat: [
            { otsikko: "Lisää palauteteksti", missa: "Unity, GamePanel", tee: "Lisää GamePaneliin teksti UI → Text - TextMeshPro ja nimeä se FeedbackText.", naet: "Peliruudulla on uusi tekstikenttä." },
            { otsikko: "Kytke teksti", missa: "VS Code ja Unity, Inspector", tee: "Lisää GameManageriin kenttä [SerializeField] private TMP_Text feedbackText; ja raahaa FeedbackText Inspectorissa kenttään Feedback Text.", naet: "Kentässä lukee FeedbackText." },
            { otsikko: "Näytä oikea toimitus", missa: "VS Code, GameManager.cs, SubmitOrder", tee: "Kun CheckDelivery palauttaa enemmän kuin 0, lisää pisteet ja kirjoita FeedbackText-tekstiin esimerkiksi Oikein! +10.", naet: "Play-tilassa oikea toimitus näyttää Oikein-tekstin pisteineen." },
            { otsikko: "Näytä väärä toimitus", missa: "VS Code, GameManager.cs, SubmitOrder", tee: "Kun toimitus on väärin, vähennä pisteitä GDD:n mukaan, noudata sääntöäsi siitä, saavatko pisteet mennä alle nollan, ja kirjoita FeedbackText-tekstiin esimerkiksi Väärä tilaus −5.", naet: "Väärä toimitus näyttää eri palautteen kuin oikea." },
            { otsikko: "Jatka peliä", missa: "VS Code, GameManager.cs, SubmitOrder", tee: "Päivitä ScoreText jokaisen toimituksen jälkeen ja tee uusi tilaus CreateOrder-metodilla.", naet: "Toimituksen jälkeen pisteet päivittyvät, ja uusi tilaus näkyy heti." },
            { otsikko: "Tallenna ennen lomaa", missa: "GitHub Desktop", tee: "Tee commit ja push. Avaa GitHub ja tarkista, että uusin commit näkyy.", naet: "GitHubissa näkyy viikon viimeinen commit, joten peli on tallessa ennen lomaa." }
          ],
          valmis: "Oikea ja väärä toimitus näyttävät eri palautteen, pisteet muuttuvat sääntöjen mukaan ja peli jatkuu uudella tilauksella, kunnes aika loppuu.",
          tallenna: "Kuvakaappaukset molemmista palautteista kansioon project-docs/evidence/week-51/, commit ja push.",
          sanat: ["UI", "GDD"]
        }
      },
      paivat: [
        ["Ma 14.12.", "Aloituspalaveri. Työvaihe 1: lomaviikkojen työpäivät."],
        ["Ti 15.12.", "Työvaihe 2: ajastin."],
        ["Ke 16.12.", "Työvaihe 3: palaute toimituksesta."],
        ["To 17.12.", "Työvaihe 3 loppuun. Avaa ohjaajan kanssa työvaiheet 52-1, 52-2 ja 53-1 ja kerro omin sanoin, mitä teet kussakin ensimmäiseksi."],
        ["Pe 18.12.", "Commit ja push. Viikon kirjaus. Ohjaaja ei ole enää tavoitettavissa."]
      ]
    },

    52: {
      type: "feature",
      feature: "Pelissä on kolme vaikeustasoa: kun pisteet kasvavat, tilaukset isonevat tai asiakkaat odottavat lyhyemmän ajan.",
      excerpt: "Vaikeustason pitää kasvaa pelin edetessä.",
      connection: "Peli toimii nyt kellon kanssa alusta loppuun. Jouluviikolla on kolme työpäivää, ja teet vain yhden pienen featuren: valitset, miten peli vaikeutuu, ja lisäät kolme vaikeustasoa valmiilla työpohjalla. Ohjaaja ei ole tavoitettavissa, joten jos jäät jumiin, kirjaa kohta ja jatka seuraavasta osatehtävästä.",
      paivamaarat: [
        ["Ohjaaja ja asiakas eivät ole tavoitettavissa", "pe 18.12. – ma 11.1."],
        ["Työpäivät", "ma–ke 21.–23.12. (jouluaatto to 24.12., joulupäivä pe 25.12.)"],
        ["Viikon kirjaus", "ke 23.12."]
      ],
      deliverable: "Perusteltu valinta ja kolme vaikeustasoa, joita voi säätää Inspectorissa.",
      why: "Toimeksianto vaatii, että vaikeus kasvaa pelin edetessä. Kun tasot ovat Inspectorissa, voit säätää pelin vaikeutta koskematta koodiin.",
      done: "Valinta on perusteltu päiväkirjassa, ja kun kokeilet peliä tasojesi raja-arvoilla (esimerkiksi 0, 31 ja 61 pistettä), tilauksen koko tai asiakkaan odotusaika muuttuu tason mukaan.",
      record: "Kirjoita Vko 52 -merkintään valittu tapa ja kaksi perustelua, tasojen arvot ja commit-linkki. Rastita lopuksi Näyttömatriisi-näkymässä kohdat Toimintalogiikka ja Ratkaisuvaihtoehdot.",
      skills: ["vaihtoehtojen vertailu", "vaikeuskäyrä"],
      tehtavat: {
        "52-1": {
          miksi: "Kun vertaat kahta tapaa ennen koodaamista, osaat perustella valintasi, eikä ratkaisu jää sattuman varaan.",
          osat: [
            { otsikko: "Lue vaihtoehdot", missa: "Tämä sivu", tee: "Lue kaksi tapaa vaikeuttaa peliä: A = tilauksissa on enemmän tuotteita, B = asiakas odottaa lyhyemmän ajan.", naet: "Tiedät, mitä kumpikin tapa muuttaa pelissä." },
            { otsikko: "Arvioi kolmella kysymyksellä", missa: "Projektipäiväkirja, viikko 52", tee: "Vastaa kummastakin tavasta kolmeen kysymykseen: Huomaako pelaaja vaikeutumisen? Onko arvoja helppo säätää? Onko sitä helppo testata?", naet: "Päiväkirjassa on kuusi lyhyttä vastausta." },
            { otsikko: "Valitse ja perustele", missa: "Projektipäiväkirja, viikko 52", tee: "Valitse A tai B. Jouluviikolla teet yhden tavan. Kirjoita valinta ja kaksi perustelua.", naet: "Päiväkirjassa ovat valinta ja kaksi perustelua." }
          ],
          valmis: "Päiväkirjassa ovat molemmat tavat, kolmen kysymyksen vastaukset, valinta ja kaksi perustelua.",
          tallenna: "Valinta ja perustelut viikon 52 päiväkirjaan.",
          eiRiita: "Tekoälyn kirjoittama vertailu tai perustelu, joka ei liity omaan peliisi."
        },
        "52-2": {
          miksi: "Kun tasot ovat yhdessä listassa, voit säätää pelin vaikeutta muuttamalla lukuja Inspectorissa koskematta koodiin.",
          osat: [
            { otsikko: "Luo skripti", missa: "Unity, Scripts-kansio", tee: "Luo skripti DifficultyController avun työpohjasta ja liitä se GameManager-objektiin.", naet: "Inspectorissa näkyy Levels-lista." },
            { otsikko: "Kytke GameManageriin", missa: "VS Code ja Unity, Inspector", tee: "Lisää GameManageriin kenttä [SerializeField] private DifficultyController difficultyController; ja raahaa GameManager-objekti Inspectorissa GameManager-skriptin kenttään Difficulty Controller.", naet: "Kentässä lukee GameManager." },
            { otsikko: "Täytä tasot", missa: "Unity, Inspector, Levels", tee: "Aseta listan kooksi 3 ja täytä tasot avun taulukon tai omien arvojesi mukaan.", naet: "Listassa on kolme tasoa arvoineen." },
            { otsikko: "Täydennä GetLevel", missa: "VS Code, DifficultyController.cs", tee: "Täydennä TODO: palauta korkein taso, jonka aloituspisteet (minScore) pelaaja on jo saavuttanut.", naet: "Console-ikkunassa ei ole punaisia virheitä." },
            { otsikko: "Etsi muutettavat kohdat", missa: "VS Code, GameManager.cs", tee: "Etsi kaksi kohtaa, joissa CreateOrder-metodia kutsutaan: StartGame ja SubmitOrder.", naet: "Tiedät kaksi kohtaa, joihin teet muutoksen." },
            { otsikko: "Käytä tasoa pelissä", missa: "VS Code, GameManager.cs ja OrderManager.cs", tee: "Tee muutos molempiin kohtiin. Tapa A: muuta CreateOrder muotoon CreateOrder(int count) ja anna tuotemäärä tasolta. Tapa B: aseta asiakkaan odotusaika tasolta avun mallin mukaan.", naet: "Console-ikkunassa ei ole punaisia virheitä." },
            { otsikko: "Kokeile tasoja", missa: "Unity, Play", tee: "Tapa A: tee avun testi raja-arvoilla 0, 31 ja 61. Tapa B: aseta Inspectorissa tason 0 customerTime arvoon 3, paina Play ja Aloita äläkä toimita. Palauta arvot ja poista testirivi lopuksi.", naet: "Tavassa A tilauksen koko vastaa tasoa. Tavassa B asiakas lähtee 3 sekunnin jälkeen, ja uusi tilaus tulee." },
            { otsikko: "Tallenna", missa: "GitHub Desktop", tee: "Tee commit ja push.", naet: "Commit näkyy GitHubissa." }
          ],
          valmis: "Kun kokeilet peliä tasojesi raja-arvoilla, peli käyttää jokaisella raja-arvolla eri tasoa, ja tasojen arvoja voi muuttaa Inspectorissa.",
          tallenna: "Tasojen arvot ja testin tulos viikon 52 päiväkirjaan. Commit ja push.",
          esimerkki: "0–30 p: 1 tuote / 15 s · 31–60 p: 2 tuotetta / 12 s · 61+ p: 3 tuotetta / 10 s.",
          eiRiita: "Kolme erillistä if-lausetta, joihin luvut on kirjoitettu suoraan koodiin.",
          apu: {
            title: "DifficultyController-työpohja",
            tree: "GameManager\n└─ DifficultyController\n   └─ Levels (näkyy Inspectorissa)\n      ├─ Level 0: minScore 0,  itemCount 1, customerTime 15\n      ├─ Level 1: minScore 31, itemCount 2, customerTime 12\n      └─ Level 2: minScore 61, itemCount 3, customerTime 10",
            code: "using UnityEngine;\n\n[System.Serializable]\npublic class DifficultyLevel\n{\n    public int minScore;\n    public int itemCount;\n    public float customerTime;\n}\n\npublic class DifficultyController : MonoBehaviour\n{\n    [SerializeField] private DifficultyLevel[] levels;\n\n    public DifficultyLevel GetLevel(int score)\n    {\n        // TODO: käy levels-lista läpi ja palauta viimeinen taso,\n        //       jonka minScore <= score\n        return levels[0];\n    }\n}\n\n// Tapa B: asiakkaan odotusaika GameManageriin\n// private float customerTimeLeft;\n// Kun tilaus tehdään:\n//     customerTimeLeft = difficultyController.GetLevel(score).customerTime;\n// Update-metodissa, kun isPlaying on true:\n//     customerTimeLeft -= Time.deltaTime;\n//     TODO: jos customerTimeLeft <= 0, asiakas lähtee:\n//           näytä palaute ja tee uusi tilaus",
            vinkit: [
              "[System.Serializable] saa Unityn näyttämään DifficultyLevel-luokan kentät Inspectorissa.",
              "Muuta CreateOrder muotoon CreateOrder(int count), jotta GameManager voi antaa tuotemäärän tasolta."
            ],
            test: "Tapa A: Lisää StartGame-metodiin ennen CreateOrder-kutsua väliaikainen rivi score = 31; ja paina Play. Toista arvoilla 0 ja 61. Tilauksen koko vastaa joka kerta taulukkoa. Poista rivi testin jälkeen. Tapa B: aseta tason 0 customerTime arvoon 3, paina Play ja Aloita äläkä toimita. Asiakas lähtee 3 sekunnin jälkeen, ja uusi tilaus tulee. Palauta arvo."
          }
        }
      },
      paivat: [
        ["Ma 21.12.", "Työvaihe 1: valitse tapa ja kirjoita perustelut."],
        ["Ti 22.12.", "Työvaihe 2: DifficultyController ja kolme tasoa."],
        ["Ke 23.12.", "Työvaihe 2 loppuun. Commit, push ja viikon kirjaus."]
      ]
    },

    53: {
      type: "feature",
      termit: ["PlayerPrefs"],
      feature: "Pelaaja tallentaa tuloksensa nimimerkillä, ja viisi parasta tulosta näkyy yhä, kun peli avataan uudelleen.",
      excerpt: "Pelaajan parhaat tulokset pitää tallentaa.",
      connection: "Tällä viikolla teet viimeisen pakollisen featuren: peli tallentaa parhaat tulokset. SaveService tallentaa listan selaimen muistiin ja lataa sen sieltä, ja tulosruutu näyttää listan. Ohjaaja ei ole tavoitettavissa, joten tee yksi osatehtävä kerrallaan sovittuina työpäivinä, ja jos jäät jumiin, toimi Jos et tiedä, mitä tehdä -ohjeen mukaan.",
      paivamaarat: [
        ["Ohjaaja ja asiakas eivät ole tavoitettavissa", "pe 18.12. – ma 11.1."],
        ["Työpäivät", "ma–to 28.–31.12. (uudenvuodenpäivä pe 1.1.)"],
        ["Viikon kirjaus", "to 31.12."]
      ],
      deliverable: "SaveService-skripti, tulosruudun nimimerkkikenttä ja top 5 -lista, nimimerkin tarkistus ja perusteltu tallennusratkaisu.",
      why: "Toimeksianto vaatii parhaiden tulosten tallennuksen. Kun tarkistat nimimerkin ennen tallennusta, listaan ei tallennu tyhjiä tai liian pitkiä nimiä. Peli ei myöskään pyydä henkilötietoja.",
      done: "Kuudesta tuloksesta näkyy viisi parasta myös silloin, kun sivu avataan uudelleen. Tyhjä nimimerkki tallentuu nimellä Nimetön, ja olet perustellut PlayerPrefsin valinnan vertaamalla sitä yhteen vaihtoehtoon.",
      record: "Kirjoita Vko 53 -merkintään, miksi tulokset tallennetaan PlayerPrefsiin ja mihin vaihtoehtoon vertasit sitä, missä selain säilyttää tulokset, mitä peli tallentaa ja mitä ei sekä commit-linkit. Rastita lopuksi Näyttömatriisi-näkymässä kohdat Toimintojen toteutus, Tietovaraston valinta, Yhteys tietovarastoon ja Tietoturva.",
      skills: ["PlayerPrefs", "syötteen tarkistus", "tietoturva"],
      tehtavat: {
        "53-1": {
          miksi: "Toimeksiannon mukaan parhaat tulokset pitää tallentaa. SaveService on ainoa skripti, joka tallentaa ja lataa ne.",
          osat: [
            { otsikko: "Luo skripti ja objekti", missa: "Unity", tee: "Luo skripti SaveService avun työpohjasta. Luo tyhjä objekti SaveService ja raahaa skripti sen päälle.", naet: "Hierarchyssä on SaveService-objekti." },
            { otsikko: "Lue luokat", missa: "VS Code, SaveService.cs", tee: "Lue työpohjasta kaksi luokkaa: ScoreEntry on yksi tulos (nimimerkki ja pisteet) ja ScoreList on tulosten lista.", naet: "Tiedät, missä nimimerkki ja pisteet ovat." },
            { otsikko: "Täydennä tallennus", missa: "VS Code, SaveService.cs", tee: "Täydennä SaveScore: lisää uusi tulos listaan, järjestä lista pisteiden mukaan suurimmasta pienimpään ja poista kuudes tulos ja sitä huonommat.", naet: "Console-ikkunassa ei ole punaisia virheitä." },
            { otsikko: "Selitä tallennusrivit", missa: "Projektipäiväkirja, viikko 53", tee: "Kirjoita omin sanoin, mitä JsonUtility.ToJson, PlayerPrefs.SetString ja PlayerPrefs.Save tekevät.", naet: "Päiväkirjassa on kolme omaa virkettä." },
            { otsikko: "Täydennä lataus", missa: "VS Code, SaveService.cs", tee: "Täydennä LoadScores: jos tallennusta ei ole, palauta tyhjä lista. Muuten lue teksti PlayerPrefs.GetString-metodilla ja muuta se takaisin listaksi.", naet: "Console-ikkunassa ei ole punaisia virheitä." }
          ],
          valmis: "SaveScore ja LoadScores on täydennetty, ja päiväkirjassa on omin sanoin kirjoitettu selitys tallennusriveistä.",
          tallenna: "Selitys viikon 53 päiväkirjaan. Commit ja push.",
          sanat: ["PlayerPrefs"],
          apu: {
            title: "SaveService-työpohja",
            code: "using System.Collections.Generic;\nusing UnityEngine;\n\n[System.Serializable]\npublic class ScoreEntry\n{\n    public string nickname;\n    public int score;\n}\n\n[System.Serializable]\npublic class ScoreList\n{\n    public List<ScoreEntry> entries = new List<ScoreEntry>();\n}\n\npublic class SaveService : MonoBehaviour\n{\n    private const string Key = \"HighScores\";\n\n    public ScoreList SaveScore(string nickname, int score)\n    {\n        ScoreList list = LoadScores();\n        // TODO: lisää uusi ScoreEntry listaan\n        // TODO: järjestä vakaasti, jotta tasapisteissä aiempi tulos pysyy edellä (lisää alkuun using System.Linq;):\n        //       list.entries = list.entries.OrderByDescending(e => e.score).ToList();\n        // TODO: poista ylimääräiset, kun listassa on yli 5 riviä\n        PlayerPrefs.SetString(Key, JsonUtility.ToJson(list));\n        PlayerPrefs.Save();\n        return list;\n    }\n\n    public ScoreList LoadScores()\n    {\n        // TODO: jos PlayerPrefs.HasKey(Key) on false, palauta new ScoreList()\n        // TODO: muuta tallennettu teksti takaisin: JsonUtility.FromJson<ScoreList>(…)\n        return new ScoreList();\n    }\n}",
            vinkit: [
              "JsonUtility ei osaa tallentaa pelkkää listaa. Siksi lista on ScoreList-luokan sisällä.",
              "PlayerPrefs.Save() varmistaa, että tieto tallentuu heti myös selainversiossa."
            ],
            test: "Console-ikkunassa ei ole punaisia virheitä. Tallennusta kokeillaan työvaiheessa 2, kun tulosruudulla on Tallenna tulos -painike.",
            images: [
              [
                "assets/tallennus-top5.svg",
                "Havainnekuva top 5 -listan tiedon kulusta. Tallennus: GameManager.SaveCurrentScore hakee nimimerkin ja pisteet, SaveService.SaveScore siistii nimimerkin, lisää, järjestää ja jättää enintään viisi tulosta, JsonUtility.ToJson muuttaa listan tekstiksi ja PlayerPrefs.SetString ja Save tallentavat sen avaimella HighScores selaimen muistiin. Lataus: EndGame kutsuu LoadScores-metodia, joka tarkistaa HasKey-metodilla tallennuksen, hakee tekstin PlayerPrefs.GetString-metodilla ja muuttaa sen JsonUtility.FromJson-metodilla takaisin listaksi. ShowHighScores kirjoittaa rivit HighScoresText-tekstiin.",
                "Havainnekuva, ei kuvakaappaus: SaveScore tallentaa ja LoadScores lataa saman listan avaimella HighScores. Työvaihe 2 kytkee lataamisen tulosruutuun."
              ]
            ]
          }
        },
        "53-2": {
          miksi: "Tallennus on hyödyllinen vasta, kun pelaaja voi tallentaa tuloksen painikkeella ja näkee listan tulosruudulla.",
          osat: [
            { otsikko: "Lisää kenttä ja painike", missa: "Unity, ResultPanel", tee: "Lisää syöttökenttä UI → Input Field - TextMeshPro ja nimeä se NicknameInput. Lisää painike SaveScoreButton tekstillä Tallenna tulos.", naet: "Tulosruudulla ovat kenttä ja painike." },
            { otsikko: "Lisää lista", missa: "Unity, ResultPanel", tee: "Lisää teksti HighScoresText ja tee siitä niin korkea, että siihen mahtuu viisi riviä. Siirrä tekstit, kenttä ja painikkeet erilleen.", naet: "Tulosruudun osat eivät ole päällekkäin." },
            { otsikko: "Lisää koodi", missa: "VS Code, GameManager.cs", tee: "Lisää avun kentät nicknameInput, highScoresText ja saveService sekä metodit ShowHighScores ja SaveCurrentScore.", naet: "Console-ikkunassa ei ole punaisia virheitä." },
            { otsikko: "Kytke kentät", missa: "Unity, Inspector", tee: "Raahaa NicknameInput, HighScoresText ja SaveService-objekti GameManager-skriptin kenttiin.", naet: "Missään kentässä ei lue None." },
            { otsikko: "Kytke tallennus", missa: "VS Code ja Unity, Inspector", tee: "Täydennä SaveCurrentScore avun TODO-rivien mukaan. Kytke SaveScoreButtonin On Click () -listaan GameManager → SaveCurrentScore.", naet: "Tallenna tulos -painike lisää tuloksen listaan." },
            { otsikko: "Näytä lista heti", missa: "VS Code, GameManager.cs, EndGame", tee: "Lisää EndGame-metodiin avun rivi, joka näyttää tallennetun listan, kun tulosruutu avautuu.", naet: "Tulosruutu näyttää aiemmat tulokset heti." },
            { otsikko: "Kokeile kuudella tuloksella", missa: "Unity, Play", tee: "Pelaa ja tallenna kuusi eri tulosta.", naet: "Lista näyttää viisi parasta suurimmasta pienimpään." }
          ],
          valmis: "Tulosruutu näyttää tallennetut tulokset heti, ja kuudesta tuloksesta näkyy viisi parasta oikeassa järjestyksessä.",
          tallenna: "Kuvakaappaus listasta polkuun project-docs/evidence/week-53/tulosruutu.png, commit ja push.",
          sanat: ["UI"],
          apu: {
            title: "Tulosruudun rakenne ja kytkentä",
            code: "// GameManager-luokan kenttien joukkoon:\n[SerializeField] private TMP_InputField nicknameInput;\n[SerializeField] private TMP_Text highScoresText;\n[SerializeField] private SaveService saveService;\n\npublic void SaveCurrentScore()\n{\n    // TODO: ScoreList list = saveService.SaveScore(nicknameInput.text, score);\n    // TODO: ShowHighScores(list);\n}\n\nprivate void ShowHighScores(ScoreList list)\n{\n    string text = \"\";\n    for (int i = 0; i < list.entries.Count; i++)\n    {\n        text += (i + 1) + \". \" + list.entries[i].nickname + \"  \" + list.entries[i].score + \"\\n\";\n    }\n    highScoresText.text = text;\n}\n\n// Täydennä EndGame ennen ShowOnly(resultPanel) -riviä:\n// TODO: ShowHighScores(saveService.LoadScores());",
            vinkit: [
              "Painikkeen On Click () -lista ei osaa antaa metodille nimimerkkiä ja pisteitä. Siksi SaveCurrentScore hakee ne itse eikä ota parametreja.",
              "`\\n` tekstin sisällä tarkoittaa rivinvaihtoa. Jokainen tulos tulee omalle rivilleen."
            ],
            test: "Tallenna kaksi tulosta ja paina Pelaa uudelleen. Kun kierros loppuu, tulosruutu näyttää molemmat heti.",
            tree: "ResultPanel\n├─ FinalScoreText\n├─ NicknameInput      (Input Field - TextMeshPro)\n├─ SaveScoreButton\n├─ HighScoresText\n└─ RestartButton",
            images: [
              ["assets/unity/vko40-resultpanel.png", "Unityn Game-näkymä ResultPanelista: lopputulos, nimimerkkikenttä, Tallenna tulos -painike ja viiden parhaan tuloksen lista.", "ResultPanel: nimimerkki, tallennus ja top 5 -lista."]
            ]
          }
        },
        "53-3": {
          miksi: "Pelaaja voi kirjoittaa kenttään mitä tahansa. Kun tarkistat nimimerkin ennen tallennusta, listaan ei tallennu tyhjiä tai liian pitkiä nimiä. Peli ei myöskään pyydä henkilötietoja.",
          osat: [
            { otsikko: "Päätä enimmäispituus", missa: "Projektipäiväkirja, viikko 53", tee: "Päätä nimimerkin enimmäispituus, esimerkiksi 12 merkkiä, ja kirjaa päätös.", naet: "Päätös on kirjattu." },
            { otsikko: "Lisää tarkistus", missa: "VS Code, SaveService.cs", tee: "Lisää avun CleanNickname-metodi ja kutsu sitä SaveScore-metodin ensimmäisellä rivillä.", naet: "Console-ikkunassa ei ole punaisia virheitä." },
            { otsikko: "Täydennä säännöt", missa: "VS Code, SaveService.cs", tee: "Täydennä TODO-rivit: tyhjä nimimerkki saa nimen Nimetön, ja liian pitkä nimimerkki lyhennetään sallittuun pituuteen.", naet: "Play-tilassa tyhjä nimi tallentuu nimellä Nimetön." },
            { otsikko: "Rajaa kenttä", missa: "Unity, NicknameInput, Inspector", tee: "Aseta Character Limit -arvoksi sama enimmäispituus.", naet: "Kenttään ei voi kirjoittaa liian pitkää nimeä." },
            { otsikko: "Kirjaa tietoturva", missa: "Projektipäiväkirja, viikko 53", tee: "Kirjoita, mitä peli tallentaa (nimimerkki ja pisteet) ja mitä se ei tallenna (oikea nimi, salasanat tai muut henkilötiedot).", naet: "Päiväkirjassa on kaksi listaa." }
          ],
          valmis: "Tyhjä nimi tallentuu nimellä Nimetön, ja liian pitkä nimi lyhenee sallittuun pituuteen.",
          tallenna: "Päätös ja tietoturvakirjaus viikon 53 päiväkirjaan. Commit ja push.",
          eiRiita: "Tallennus toimii, mutta syötettä ei tarkisteta. Älä syötä tekoälylle salasanoja, avaimia tai henkilötietoja.",
          apu: { title: "Nimimerkin tarkistus", code: "private const int MaxLength = 12;\n\nprivate string CleanNickname(string raw)\n{\n    string name = (raw ?? \"\").Trim();\n    // TODO: jos name on tyhjä, palauta \"Nimetön\"\n    // TODO: jos name.Length > MaxLength, palauta name.Substring(0, MaxLength)\n    return name;\n}", test: "Kirjoita kenttään pelkkiä välilyöntejä ja tallenna. Listaan tulee Nimetön." }
        },
        "53-4": {
          miksi: "Tiedät, että tallennus toimii, vasta kun tulokset ovat selainversiossa tallessa myös sen jälkeen, kun suljet sivun ja avaat sen uudelleen.",
          osat: [
            { otsikko: "Kirjoita odotettu tulos", missa: "Projektipäiväkirja, viikko 53", tee: "Kirjoita ennen kokeilua: kun suljen välilehden ja avaan pelin uudelleen, sama top 5 -lista näkyy.", naet: "Odotettu tulos on kirjattu." },
            { otsikko: "Tee selainversio", missa: "Unity, Build And Run", tee: "Tee selainversio ja tallenna siinä kaksi tulosta.", naet: "Lista näkyy selaimessa." },
            { otsikko: "Avaa peli uudelleen", missa: "Selain", tee: "Kopioi pelin osoite, sulje välilehti ja avaa sama osoite uudelleen samassa selaimessa. Pelaa kierros loppuun.", naet: "Tulosruutu näyttää samat tulokset kuin ennen sulkemista." },
            { otsikko: "Vertaa vaihtoehtoon", missa: "Projektipäiväkirja, viikko 53, kenttä Miksi tein näin?", tee: "Vertaa PlayerPrefsiä yhteen vaihtoehtoon, esimerkiksi JSON-tiedostoon tai palvelimeen. Kirjoita, miksi PlayerPrefs sopii pieneen selainpeliin.", naet: "Päiväkirjassa ovat vertailu ja perustelu. Lomalla pidät PlayerPrefsin, vaikka vertailu puoltaisi muuta. Mahdollisesta muutoksesta sovitaan 12.1." },
            { otsikko: "Kirjaa rajoitukset", missa: "Projektipäiväkirja, viikko 53", tee: "Kirjoita, että tulokset säilyvät vain tässä selaimessa ja että pelaaja voi poistaa ne tyhjentämällä selaimen tiedot.", naet: "Päiväkirjassa ovat ratkaisun rajoitukset." }
          ],
          valmis: "Lista säilyi sivun sulkemisen jälkeen, ja päiväkirjassa ovat ratkaisun perustelu, vertailu ja rajoitukset.",
          tallenna: "Kokeilun tulos ja perustelu viikon 53 päiväkirjaan.",
          esimerkki: "ScoreList → JsonUtility.ToJson → PlayerPrefs.SetString(\"HighScores\", json) → sivu suljetaan ja avataan → sama top 5 näkyy.",
          eiRiita: "Testaus pelkästään Unity-editorissa. Editorissa näkyvä arvo ei todista, että tulokset säilyvät selaimessa."
        }
      },
      paivat: [
        ["Ma 28.12.", "Työvaihe 1: SaveService."],
        ["Ti 29.12.", "Työvaihe 2: tulosruudun nimimerkki ja lista."],
        ["Ke 30.12.", "Työvaihe 3: nimimerkin tarkistus."],
        ["To 31.12.", "Työvaihe 4: kokeilu selaimessa ja perustelu. Viikon kirjaus."]
      ]
    },

    1: {
      type: "laatu",
      termit: ["rajatilanne", "T01"],
      feature: "Pelin koko kierros on testattu yhdeksällä testitapauksella, ja jokaisesta on kirjattu odotettu ja todellinen tulos.",
      excerpt: "Pelissä pitää olla aloitusvalikko, itse peli, pistelasku ja pelin päättymisnäkymä.",
      connection: "Kaikki pakolliset featuret ovat nyt pelissä. Ennen kuin asiakas pelaa peliä viikolla 2, testaat sen itse: kirjoitat testitapaukset testaustaulukon pohjaan, ajat ne selaimessa ja vertaat peliä luonnokseen. Testeissä löytyneitä virheitä korjaat viikolla 3, kun ohjaaja on taas tavoitettavissa, ja jos jäät jumiin, toimit Jos et tiedä, mitä tehdä -ohjeen mukaan.",
      paivamaarat: [
        ["Ohjaaja ja asiakas eivät ole tavoitettavissa", "pe 18.12. – ma 11.1."],
        ["Työpäivät", "ma, ti, to ja pe 4.–8.1. (loppiainen ke 6.1.)"],
        ["Viikon kirjaus", "pe 8.1."]
      ],
      deliverable: "Tiedosto project-docs/testaus.md, jossa on yhdeksän testitapausta tuloksineen, ja vertailu luonnokseen.",
      why: "Kun kirjoitat odotetun tuloksen ennen testiä, et voi jälkikäteen muuttaa mieltäsi siitä, mikä oli oikein. Viikolla 3 korjaat virheitä, jotka löydät näissä testeissä.",
      done: "Testaustaulukon kaikilla yhdeksällä rivillä on täytetty sarakkeet Lähtötila, Mitä teen, Odotettu tulos, Mitä tapahtui ja Läpäisi, ja vertailu luonnokseen on päiväkirjassa.",
      record: "Kirjoita Vko 1 -merkintään linkki tiedostoon project-docs/testaus.md, montako testitapausta meni läpi, mitkä eivät menneet ja vertailu luonnokseen. Rastita lopuksi Näyttömatriisi-näkymässä kohdat Toimintojen testaus, Käyttöliittymä sekä Suunnittelu, toteutus ja testaus kirjastolla.",
      skills: ["testitapaus", "rajatilanne", "selaintestaus"],
      tehtavat: {
        "1-1": {
          miksi: "Kun kirjoitat odotetun tuloksen ennen testiä, et voi jälkikäteen muuttaa mieltäsi siitä, mikä oli oikein.",
          osat: [
            { otsikko: "Tarkista lähtötila", missa: "Unity, Play", tee: "Pelaa yksi kierros. Kirjaa päiväkirjaan, toimivatko valikko, tilaus, pisteet, aika, vaikeus ja top 5 -lista.", naet: "Tiedät, mitkä featuret toimivat. Jos jokin puuttuu, kirjoita sille testitapaus silti. Työvaiheessa 2 merkitset sen tulokseksi Ei – ominaisuus kesken." },
            { otsikko: "Luo testaustiedosto", missa: "VS Code", tee: "Luo tiedosto project-docs/testaus.md ja liitä siihen avun taulukkopohja.", naet: "Tiedostossa ovat taulukon otsikkorivi ja rivi T01." },
            { otsikko: "Kirjoita tavallisen pelaamisen testit", missa: "VS Code, testaus.md", tee: "Kirjoita testitapaukset T01–T03: aloitus, oikea toimitus ja väärä toimitus. T tarkoittaa testitapausta ja numero sen järjestystä.", naet: "Taulukossa ovat rivit T01–T03." },
            { otsikko: "Kirjoita rajatilanteiden testit", missa: "VS Code, testaus.md", tee: "Kirjoita testitapaukset T04–T06: aika loppuu, Toimita painetaan kahdesti nopeasti ja nimimerkki on tyhjä.", naet: "Taulukossa ovat rivit T04–T06." },
            { otsikko: "Kirjoita tiedostojen ja tallennuksen testit", missa: "VS Code, testaus.md", tee: "Kirjoita testitapaukset T07–T09: kahvin pistearvo muutetaan products.json-tiedostossa, products.json on rikki ja top 5 -listaan tallennetaan kuudes tulos.", naet: "Taulukossa ovat rivit T07–T09." },
            { otsikko: "Täytä odotetut tulokset", missa: "VS Code, testaus.md", tee: "Täytä jokaiseen riviin Lähtötila, Mitä teen ja Odotettu tulos omilla arvoillasi ennen kuin ajat yhtään testiä.", naet: "Yhdeksällä rivillä on odotettu tulos, ja sarakkeet Mitä tapahtui ja Läpäisi ovat vielä tyhjiä." }
          ],
          valmis: "Tiedostossa on yhdeksän testitapausta T01–T09, ja jokaisella on odotettu tulos.",
          tallenna: "project-docs/testaus.md, commit ja push.",
          sanat: ["T01", "rajatilanne"],
          apu: { title: "Testaustaulukon pohja", code: "| Tunnus | Lähtötila | Mitä teen | Odotettu tulos | Mitä tapahtui | Läpäisi |\n|---|---|---|---|---|---|\n| T01 | Peli auki, valikko näkyy | Painan Aloita | Peliruutu ja tilaus näkyvät | | |\n| T02 | | | | | |", test: "Lue yksi testitapaus toiselle ihmiselle. Hän osaa ajaa testin pelkän rivin perusteella." }
        },
        "1-2": {
          miksi: "Vain itse ajettu testi kertoo, toimiiko peli. Selainversiossa voi näkyä virheitä, joita editorissa ei näy.",
          osat: [
            { otsikko: "Tee selainversio", missa: "Unity, Build And Run ja GitHub Desktop, History", tee: "Tee selainversio. Kirjoita testaustaulukon alkuun version tunniste: päivämäärä ja History-välilehden ylimmän commitin tunniste.", naet: "Taulukon alussa on version tunniste." },
            { otsikko: "Aloita puhtaasta tilanteesta", missa: "Selain", tee: "Kopioi pelin osoite ja avaa se yksityisessä selainikkunassa, jolloin vanhat tulokset eivät ole mukana.", naet: "Top 5 -lista on tyhjä." },
            { otsikko: "Aja testitapaukset T01–T06", missa: "Selain ja testaus.md", tee: "Aja testitapaukset T01–T06 järjestyksessä. Kirjaa jokaisesta, mitä tapahtui ja läpäisikö testi.", naet: "Riveillä T01–T06 on todellinen tulos ja merkintä Kyllä tai Ei." },
            { otsikko: "Aja testitapaukset T07–T09", missa: "Unity, selain ja testaus.md", tee: "Aja testitapaukset T07–T09. Jos testissä pitää muuttaa products.json-tiedostoa, muuta tiedosto ja tee uusi selainversio. Palauta tiedosto testin jälkeen GitHub Desktopissa: Changes → products.json → hiiren oikea → Discard changes.", naet: "Riveillä T07–T09 on todellinen tulos. GitHub Desktopin Changes-listassa ei ole products.json-tiedostoa. testaus.md saa näkyä listassa: älä hylkää sitä." },
            { otsikko: "Tarkista taulukko", missa: "VS Code, testaus.md", tee: "Tarkista, että jokaisella rivillä on tulos. Jos feature puuttui, merkitse tulokseksi Ei – ominaisuus kesken. Älä merkitse testiä läpäistyksi, jos et ajanut sitä itse.", naet: "Yhdeksällä rivillä on todellinen tulos ja läpäisymerkintä." }
          ],
          valmis: "Jokaisella testitapauksella T01–T09 on todellinen tulos ja merkintä siitä, läpäisikö se.",
          tallenna: "project-docs/testaus.md, commit ja push. Läpäisemättömien testitapausten tunnukset viikon 1 päiväkirjaan.",
          eiRiita: "Tekoälyn ehdottamaa testitapausta ei saa merkitä ajetuksi eikä virhettä löydetyksi ilman omaa testiajoa.",
          apu: {
            title: "Version tunniste, yksityinen ikkuna ja palautus",
            vinkit: ["Commitin tunniste on GitHub Desktopin History-välilehdellä. Valitse ylin rivi: tunniste on lyhyt kirjain- ja numerosarja, esimerkiksi a1b2c3d.", "Build And Run avaa pelin osoitteeseen, joka alkaa http://localhost. Kopioi osoite selaimen osoiteriviltä ja liitä se yksityiseen ikkunaan. Chromessa ja Edgessä yksityinen ikkuna aukeaa näppäimillä Ctrl+Shift+N.", "Jos products.json jäi rikki, palauta se GitHub Desktopissa: Changes → products.json → hiiren oikea → Discard changes."],
            test: "GitHub Desktopin Changes-listassa ei ole products.json-tiedostoa, ja peli toimii taas Play-tilassa. testaus.md saa näkyä listassa."
          }
        },
        "1-3": {
          miksi: "Luonnos kertoo, mitä suunnittelit. Kun vertaat, huomaat, mitä muutit matkan varrella ja miksi.",
          osat: [
            { otsikko: "Avaa luonnos", missa: "VS Code tai tiedostoikkuna", tee: "Avaa kuva project-docs/evidence/week-49/mockup.png.", naet: "Luonnos on auki." },
            { otsikko: "Ota kuvakaappaukset", missa: "Selain", tee: "Ota kuvakaappaus pelin valikosta, peliruudusta ja tulosruudusta. Tallenna ne kansioon project-docs/evidence/week-1/.", naet: "Kansiossa on kolme kuvaa." },
            { otsikko: "Kirjaa erot", missa: "Projektipäiväkirja, viikko 1", tee: "Kirjoita jokaisesta ruudusta, mikä on erilaista kuin luonnoksessa.", naet: "Jokaisesta ruudusta on vähintään yksi havainto." },
            { otsikko: "Kirjaa syyt", missa: "Projektipäiväkirja, viikko 1", tee: "Kirjoita jokaisen eron perään, miksi muutit sen, tai merkitse se korjattavaksi.", naet: "Jokaisella erolla on syy tai merkintä korjattava." }
          ],
          valmis: "Jokaisesta kolmesta ruudusta on kirjattu erot ja niiden syyt.",
          tallenna: "Kuvat kansioon project-docs/evidence/week-1/, commit ja push. Vertailu viikon 1 päiväkirjaan."
        }
      },
      paivat: [
        ["Ma 4.1.", "Työvaihe 1: osatehtävät 1–4 (lähtötila ja testitapaukset T01–T06)."],
        ["Ti 5.1.", "Työvaihe 1: osatehtävät 5–6 (testitapaukset T07–T09 ja odotetut tulokset)."],
        ["Ke 6.1.", "Loppiainen, ei työtä."],
        ["To 7.1.", "Työvaihe 2: aja testitapaukset."],
        ["Pe 8.1.", "Työvaihe 3: vertailu luonnokseen. Viikon kirjaus."]
      ]
    },

    2: {
      type: "katselmointi",
      termit: ["vertainen", "katselmointi", "branch", "pull request", "refaktorointi"],
      feature: "Asiakas on pelannut pelin, ja hänen toivomansa muutos on pelattavana main-haarassa. Peli toimii yhä alusta loppuun kuten ennen.",
      excerpt: "Haluan nähdä pelistä toimivan version vähintään kerran ennen lopullista versiota, jotta voin pyytää muutoksia.",
      connection: "Peli on testattu, ja nyt asiakas näkee sen ensimmäisen kerran. Katselmoinnissa asiakas pelaa, ja sovitte yhden rajatun muutoksen. Teet muutoksen omassa Git-haarassa, jolloin toimiva pääversio pysyy ehjänä, ja pyydät koodin katselmointia pull requestilla. Maanantaina ohjaaja ja asiakas eivät ole vielä tavoitettavissa, joten valmistelet silloin katselmoinnin itse.",
      paivamaarat: [
        ["Valmistelu itse (ohjaaja ei vielä tavoitettavissa)", "ma 11.1."],
        ["Aloituspalaveri ohjaajan kanssa", "ti 12.1."],
        ["Katselmointi asiakkaan kanssa", "sovitaan tiistaina, viimeistään ke 13.1."],
        ["Viikon kirjaus", "pe 15.1."]
      ],
      deliverable: "Katselmointimuistio, hyväksytty muutosissue, muutos omassa haarassa ja yhdistetty pull request kommentteineen.",
      why: "Asiakas kertoo ennen julkaisua, täyttääkö peli hänen toiveensa. Pull requestissa toinen ihminen lukee koodin ennen kuin muutos siirtyy pääversioon.",
      done: "Katselmointimuistiossa näkyvät asiakkaan palaute, omat havaintosi ja sovittu muutos. Muutos on yhdistetty main-haaraan pull requestilla, kommentteihin on vastattu ja peli toimii yhä alusta loppuun kuten ennen.",
      record: "Kirjoita Vko 2 -merkintään katselmoinnin päivä, osallistujien roolit, asiakkaan palaute, omat havainnot, arvioiden vertailu ja ketju palaute → issue → haara → pull request → commit → testi linkkeineen. Rastita lopuksi Näyttömatriisi-näkymässä kohdat Asiakaslähtöinen viestintä, Priorisointi, Suunnittelu ja arviointi, Osan liittäminen, Ratkaisujen arviointi, Rakenteinen ohjelmointi ja Ylläpidettävä koodi.",
      skills: ["asiakasviestintä", "Git-haara", "koodikatselmointi"],
      tehtavat: {
        "2-1": {
          miksi: "Asiakas voi antaa hyvää palautetta vain versiosta, joka toimii alusta loppuun. Kun katsot vierestä neuvomatta, näet, missä kohdissa peli on vielä epäselvä.",
          osat: [
            { otsikko: "Valmistele versio", missa: "Unity, Build And Run", tee: "Tee selainversio ja pelaa se kerran itse alusta loppuun. Kirjoita muistiin version tunniste: päivämäärä ja viimeisimmän commitin tunniste.", naet: "Peli toimii selaimessa alusta loppuun." },
            { otsikko: "Valmistele esittely", missa: "Paperi tai muistio", tee: "Kirjoita muistilapulle viiden minuutin esittelyn kolme kohtaa: mitä peli tekee, mikä on valmista ja mikä vielä puuttuu.", naet: "Sinulla on kolmen kohdan muistilappu." },
            { otsikko: "Sovi katselmointi", missa: "Aloituspalaveri ohjaajan kanssa, ti 12.1.", tee: "Sovi, kuka esittää asiakasta ja milloin katselmointi pidetään. Katselmoinnissa asiakas kokeilee peliä ja antaa palautetta.", naet: "Katselmoinnin päivä ja aika on kirjattu päiväkirjaan." },
            { otsikko: "Anna asiakkaan pelata", missa: "Katselmointi", tee: "Esittele peli ja pyydä asiakasta pelaamaan se alusta loppuun. Älä neuvo, ellei hän pyydä apua.", naet: "Asiakas pelasi koko kierroksen." },
            { otsikko: "Kirjaa palaute ja havainnot", missa: "Projektipäiväkirja, viikko 2", tee: "Kirjoita asiakkaan palaute ilman nimiä. Kirjoita erikseen, mitä itse näit: missä asiakas epäröi tai painoi väärää painiketta.", naet: "Palaute ja omat havainnot ovat eri kohdissa." },
            { otsikko: "Selitä yksi ratkaisu", missa: "Katselmointi", tee: "Selitä asiakkaalle arkikielellä, miten tulokset tallentuvat. Kysy lopuksi: mikä yksi asia pitäisi muuttaa ensin?", naet: "Päiväkirjassa ovat asiakkaan vastaus ja merkintä siitä, ymmärsikö hän selityksen." }
          ],
          valmis: "Muistiinpanoissa ovat asiakkaan palaute ja omat havaintosi erikseen, ja henkilöistä on kirjattu vain roolit.",
          tallenna: "Katselmoinnin päivä, roolit, palaute ja havainnot viikon 2 päiväkirjaan.",
          sanat: ["katselmointi"],
          eiRiita: "Itse tai tekoälyllä keksitty asiakaspalaute ei ole katselmointi."
        },
        "2-2": {
          miksi: "Ehdit tehdä yhden selvästi rajatun muutoksen kunnolla. Jos yrität tehdä monta epämääräistä toivetta, ne jäävät kesken.",
          osat: [
            { otsikko: "Valitse muutos", missa: "Katselmointi", tee: "Valitse palautteesta yhdessä asiakkaan kanssa yksi muutos, jonka ehdit tehdä tällä viikolla.", naet: "Muutos on yksi asia, esimerkiksi isompi tilausteksti." },
            { otsikko: "Tee issue", missa: "GitHub, Issues → New issue", tee: "Kirjoita issueen verbillä alkava otsikko, asiakkaan palaute ilman nimiä, arvio ja Valmis kun -ehto.", naet: "Issue näkyy Issues-listassa." },
            { otsikko: "Merkitse tärkeys", missa: "GitHub, muutosissue", tee: "Jos asiakas pitää muutosta välttämättömänä, se on pakollinen (P0). Muuten se on tärkeä (P1). Anna issuelle sen mukainen label.", naet: "Issuella on yksi label." },
            { otsikko: "Pyydä hyväksyntä", missa: "Katselmointi", tee: "Pyydä asiakkaalta hyväksyntä issuelle. Kirjaa issueen hyväksyjän rooli ja päivä.", naet: "Issuessa ovat hyväksyjän rooli ja päivä." },
            { otsikko: "Vertaa arvioita", missa: "GitHub ja projektipäiväkirja, viikko 2", tee: "Valitse kolme issueta, jotka loit viikolla 48. Vertaa niiden arviota siihen, kauanko työ oikeasti kesti, ja kirjaa ero ja sen syy.", naet: "Päiväkirjassa on kolme vertailua." }
          ],
          valmis: "GitHubissa on yksi hyväksytty muutosissue, ja arvioiden vertailu on päiväkirjassa.",
          tallenna: "Linkki muutosissueen ja arvioiden vertailu viikon 2 päiväkirjaan.",
          sanat: ["P0", "P1"],
          esimerkki: "Palaute (asiakkaan edustaja): tilausta ei huomaa. Päätös: suurennetaan tilauskortti · P0 pakollinen · 0,5 päivää · hyväksytty 13.1."
        },
        "2-3": {
          miksi: "Kun teet muutoksen omassa haarassa, toimiva pääversio pysyy ehjänä, vaikka muutos menisi pieleen.",
          osat: [
            { otsikko: "Kirjoita testit issueen", missa: "GitHub, muutosissue", tee: "Kirjoita issueen hyväksymistesti: mitä asiakas tekee ja mitä hän näkee, kun muutos on valmis. Lisää myös vanhan pelipolun testi, jolla tarkistat, että peli toimii yhä kuten ennen: Aloita → toimita tilaus → tulosruutu.", naet: "Issuessa on kaksi testiä." },
            { otsikko: "Varmista pääversio", missa: "Unity, Play", tee: "Pelaa yksi kierros main-haaran versiolla.", naet: "Kierros toimii alusta loppuun." },
            { otsikko: "Luo haara", missa: "GitHub Desktop, Current Branch → New Branch", tee: "Anna haaralle nimi, esimerkiksi feature/suurempi-tilaus, ja paina Create branch.", naet: "GitHub Desktopin yläreunassa lukee uuden haaran nimi." },
            { otsikko: "Tee muutos pienissä osissa", missa: "Unity ja VS Code", tee: "Tee muutos osa kerrallaan. Tee commit aina, kun yksi osa toimii.", naet: "Haarassa on vähintään kaksi committia." },
            { otsikko: "Testaa jokaisen commitin jälkeen", missa: "Unity, Play", tee: "Tarkista jokaisen commitin jälkeen, että tilaus, toimitus ja pisteet toimivat edelleen.", naet: "Vanha pelipolku toimii." },
            { otsikko: "Julkaise haara", missa: "GitHub Desktop", tee: "Paina Publish branch.", naet: "Haara näkyy GitHubissa." }
          ],
          valmis: "Haara näkyy GitHubissa, ja siinä on vähintään kaksi pientä committia.",
          tallenna: "Haaran nimi viikon 2 päiväkirjaan.",
          sanat: ["branch", "hyväksymistesti"],
          esimerkki: "Issue: Suurenna tilauskortti · 0,5 päivää · Hyväksymistesti: uusi pelaaja löytää tilauksen viidessä sekunnissa.",
          eiRiita: "Yksi suuri commit suoraan main-haaraan katkaisee yhteyden palautteen, muutoksen ja testin välillä."
        },
        "2-4": {
          miksi: "Pull requestissa toinen ihminen katsoo muutoksen ennen kuin se siirtyy pääversioon. Näytössä sinun pitää osata selittää koodisi itse, myös ne kohdat, joissa käytit tekoälyä.",
          osat: [
            { otsikko: "Tee pull request", missa: "GitHub, repositoryn sivu", tee: "Paina Compare & pull request. Kirjoita, mitä muutit ja miten testasit. Lisää rivi Closes #numero, jossa numero on muutosissuen numero.", naet: "Pull request on auki." },
            { otsikko: "Pyydä katselmointi", missa: "Ohjaajan tai vertaisen kanssa", tee: "Pyydä ohjaajaa tai vertaista lukemaan muutoksesi ja kommentoimaan sitä pull requestissa.", naet: "Pull requestissa on vähintään yksi kommentti." },
            { otsikko: "Selkeytä yksi kohta", missa: "VS Code ja GitHub Desktop", tee: "Valitse kommentin perusteella tai itse yksi vaikeasti luettava kohta, esimerkiksi epäselvä nimi tai toistuva koodi. Selkeytä se niin, että peli toimii kuten ennen, ja tee commit samaan haaraan.", naet: "Commit, jolla selkeytit koodia, näkyy pull requestissa." },
            { otsikko: "Vastaa kommentteihin", missa: "GitHub, pull request", tee: "Vastaa jokaiseen kommenttiin: kerro, mitä korjasit, tai perustele, miksi pidät ratkaisun.", naet: "Jokaiseen kommenttiin on vastaus." },
            { otsikko: "Selitä tekoälykohta", missa: "Ohjaajan tai vertaisen kanssa", tee: "Selitä suullisesti yksi kohta, jossa käytit tekoälyä apuna, tai avun työpohjasta otettu kohta. Tarkista, että tekoälyn käyttö on kirjattu AI-lokiin, ja kirjaa selittämäsi kohta päiväkirjaan.", naet: "Selitetty kohta on kirjattu päiväkirjaan." },
            { otsikko: "Aja testit", missa: "Unity, Play", tee: "Aja hyväksymistesti ja vanhan pelipolun testi.", naet: "Molemmat testit menevät odotetusti." },
            { otsikko: "Yhdistä muutos", missa: "GitHub ja GitHub Desktop", tee: "Paina Merge pull request ja Confirm merge. Vaihda GitHub Desktopissa haaraksi main ja paina Fetch origin ja Pull origin.", naet: "Muutos on main-haarassa, ja muutosissue on suljettu." }
          ],
          valmis: "Pull request on yhdistetty, siinä on kommentti ja vastaus, koodia selkeyttävä commit on mukana ja molemmat testit menivät odotetusti.",
          tallenna: "Ketju palaute → issue → haara → pull request → commit → testi linkkeineen viikon 2 päiväkirjaan.",
          sanat: ["pull request", "refaktorointi", "vertainen"],
          esimerkki: "Ennen: a() laskee pisteet. Jälkeen: CalculateOrderScore() kertoo nimellään, mitä pelin sääntöä se toteuttaa.",
          eiRiita: "Pelkkä automaattinen muotoilu tai koko tiedoston kirjoittaminen uudelleen tekoälyllä."
        }
      },
      paivat: [
        ["Ma 11.1.", "Työvaihe 1: valmistele versio ja esittely itse. Ohjaaja ei ole vielä tavoitettavissa."],
        ["Ti 12.1.", "Aloituspalaveri. Työvaihe 1: katselmointi asiakkaan kanssa, jos aika sopii."],
        ["Ke 13.1.", "Katselmointi viimeistään nyt. Työvaihe 2: muutosissue."],
        ["To 14.1.", "Työvaihe 3: muutos omassa haarassa."],
        ["Pe 15.1.", "Työvaihe 4: pull request ja yhdistäminen. Viikon kirjaus."]
      ]
    },

    3: {
      type: "julkaisu",
      termit: ["regressiotesti", "RC", "tagi"],
      feature: "Julkaisuehdokas RC1 on testattu, kaksi virhettä on korjattu ja niiden korjausketjut kirjattu, ja peli on julkaistu GitHub Pagesissa versiona v1.0.",
      excerpt: "Lopullinen peli pitää julkaista niin, että voin itse kokeilla sitä.",
      connection: "Asiakkaan toive on nyt pelissä, joten peliin ei enää lisätä uusia ominaisuuksia: merkitset julkaisuehdokkaan, ja uusi pelaaja testaa sen ilman neuvoja. Korjaat kaksi virhettä, jotka löysit viikon 1 testeissä tai jotka testaaja huomasi, ja kirjaat kummastakin korjausketjun. Sen jälkeen julkaiset pelin GitHub Pagesiin, josta asiakas voi avata sen omalla koneellaan.",
      paivamaarat: [
        ["Aloituspalaveri ohjaajan kanssa", "ma 18.1."],
        ["Julkaisu v1.0", "viimeistään to 21.1."],
        ["Viikon kirjaus", "pe 22.1."]
      ],
      deliverable: "RC1-tagi, testaajan havainnot päätöksineen, kaksi korjausketjua, v1.0-julkaisu GitHub Pagesissa ja README:n käyttöohje.",
      why: "Kun toinen ihminen saa julkaistun pelin käyntiin pelkän käyttöohjeen avulla, tiedät, että peli toimii myös muualla kuin omalla koneellasi.",
      done: "Tagi v1.0 osoittaa samaan committiin kuin julkaistu versio. Toinen ihminen avaa linkin toisella selaimella tai laitteella ja pelaa kierroksen README:n ohjeen avulla.",
      record: "Kirjoita Vko 3 -merkintään RC1-tagi, testaajan rooli ja havainnot päätöksineen, kaksi korjausketjua, ketju v1.0-tagi → commit → julkaisulinkki, testattu laite ja selain sekä tunnetut puutteet. Rastita lopuksi Näyttömatriisi-näkymässä kohdat Version katselmointi, Virheenkorjaus, Versionhallinta, Tuotantojulkaisu, Julkaisu asiakkaan ympäristöön, Kirjaston mahdollisuudet ja rajoitteet sekä Ulkoiset komponentit.",
      skills: ["julkaisuehdokas", "virheenkorjaus", "Unity WebGL", "GitHub Pages"],
      tehtavat: {
        "3-1": {
          miksi: "Kun uusia ominaisuuksia ei enää lisätä, voit testata juuri sen version, joka julkaistaan. Uusi pelaaja huomaa heti, mikä pelissä on epäselvää.",
          osat: [
            { otsikko: "Lopeta uusien ominaisuuksien lisääminen", missa: "Projektipäiväkirja, viikko 3", tee: "Kirjaa päivä, josta alkaen et lisää peliin uusia ominaisuuksia vaan korjaat vain virheitä.", naet: "Päivä on kirjattu." },
            { otsikko: "Merkitse julkaisuehdokas", missa: "GitHub, Releases → Draft a new release", tee: "Kirjoita Choose a tag -kenttään RC1 ja valitse Create new tag. Rastita Set as a pre-release ja paina Publish release. RC1 tarkoittaa ensimmäistä julkaisuehdokasta.", naet: "Ensimmäisen julkaisuehdokkaan (RC1) tagi näkyy GitHubissa." },
            { otsikko: "Anna testaajalle tehtävä", missa: "Testaajan kanssa", tee: "Pyydä testaajaksi joku, joka ei ole pelannut peliäsi. Anna hänelle tehtävä: Pelaa peli alusta loppuun ja tallenna tulos. Älä neuvo.", naet: "Testaaja pelaa ilman neuvoja." },
            { otsikko: "Kirjaa havainnot", missa: "Projektipäiväkirja, viikko 3", tee: "Kirjaa testaajan rooli ja jokainen havainto erikseen: mitä tapahtui, missä kohdassa hän epäröi ja mitä hän kysyi.", naet: "Jokainen havainto on omalla rivillään." },
            { otsikko: "Päätä havainnoista", missa: "Projektipäiväkirja, viikko 3", tee: "Päätä jokaisesta havainnosta: korjataan nyt, tunnettu puute (kerrotaan käyttöohjeessa) tai myöhemmin.", naet: "Jokaisella havainnolla on päätös." }
          ],
          valmis: "Ensimmäisen julkaisuehdokkaan (RC1) tagi näkyy GitHubissa, ja testaajan havainnoilla on päätökset.",
          tallenna: "RC1-tagi, testaajan rooli ja havainnot päätöksineen viikon 3 päiväkirjaan.",
          sanat: ["RC", "tagi"],
          eiRiita: "Et voi itse esiintyä toisena testaajana, eikä tekoäly voi olla testaaja."
        },
        "3-2": {
          miksi: "Kun kirjaat korjauksen kaikki vaiheet havainnosta testeihin, näytät, että löysit virheen oikean syyn etkä vain piilottanut sitä, mikä näkyi päällepäin.",
          osat: [
            { otsikko: "Valitse kaksi virhettä", missa: "testaus.md ja projektipäiväkirja, viikko 3", tee: "Valitse kaksi virhettä viikon 1 läpäisemättömistä testitapauksista tai testaajan havainnoista, joihin merkitsit päätöksen korjataan nyt. Jos aitoja virheitä ei ole, pyydä ohjaajalta vikatehtävä eli ohjaajan peliin tekemä virhe, jonka etsit ja korjaat.", naet: "Sinulla on kaksi virhettä." },
            { otsikko: "Kirjaa toistamisohje", missa: "Projektipäiväkirja, viikko 3", tee: "Kirjaa kummastakin virheestä, miten saat sen tapahtumaan uudelleen, mikä oli odotettu tulos ja mitä tapahtui.", naet: "Kaksi toistamisohjetta on kirjattu." },
            { otsikko: "Etsi syy", missa: "VS Code ja Unityn Console", tee: "Etsi syy ennen kuin korjaat. Kirjoita syy yhdellä virkkeellä.", naet: "Kummallakin virheellä on syy." },
            { otsikko: "Korjaa ja tee commit", missa: "VS Code ja GitHub Desktop", tee: "Korjaa yksi virhe kerrallaan. Kirjoita commit-viestiin testitapauksen tunnus, esimerkiksi Korjaa testitapaus T05: tulos lasketaan vain kerran.", naet: "Kummastakin korjauksesta on oma commit." },
            { otsikko: "Aja uusintatesti ja regressiotesti", missa: "Selain ja testaus.md", tee: "Aja sama testitapaus uudelleen. Tämä on uusintatesti. Aja myös regressiotesti eli toinen testitapaus, joka käyttää samaa koodia kuin korjaamasi kohta.", naet: "Molemmat testit menevät läpi." },
            { otsikko: "Kirjaa ketjut", missa: "Projektipäiväkirja, viikko 3", tee: "Kirjaa kumpikin ketju: havainto → toistamisohje → syy → korjauscommit → uusintatesti → regressiotesti.", naet: "Päiväkirjassa on kaksi täydellistä ketjua." }
          ],
          valmis: "Päiväkirjassa on kaksi täydellistä ketjua, ja kummankin uusintatesti ja regressiotesti menivät läpi.",
          tallenna: "Ketjut viikon 3 päiväkirjaan ja testitulokset tiedostoon project-docs/testaus.md. Commit ja push.",
          sanat: ["regressiotesti"],
          esimerkki: "Testitapaus T05 · aika 0 · odotus: tulos näkyy kerran · havainto: näkyi kahdesti · syy: EndGame kutsuttiin kahdesti · korjauscommit [linkki] · uusintatesti läpäisi.",
          apu: {
            title: "Esimerkkikorjaus: kaksoispainallus",
            code: "private float lastSubmitTime = -1f;\n\npublic void SubmitOrder()\n{\n    // Hyväksy uusi toimitus vasta 0,3 sekunnin päästä edellisestä.\n    if (Time.time - lastSubmitTime < 0.3f) return;\n    lastSubmitTime = Time.time;\n    // … muu toimituksen käsittely\n}",
            test: "Paina Toimita nopeasti kahdesti. Palaute ja pisteet muuttuvat vain kerran.",
            vinkit: ["Tämä on yksi tapa korjata testitapaus, jossa Toimita painetaan kahdesti nopeasti. Kirjaa ketjuun silti oma havaintosi ja syy, jonka löysit itse."]
          }
        },
        "3-3": {
          miksi: "GitHub Pages julkaisee pelin verkkoon, jolloin asiakas voi avata sen omalla koneellaan.",
          osat: [
            { otsikko: "Tarkista scene-lista", missa: "Unity, File → Build Profiles", tee: "Valitse Web ja tarkista, että CafeGame on scene-listassa.", naet: "Listassa on CafeGame." },
            { otsikko: "Ota purku käyttöön", missa: "Unity, Player Settings → Web → Publishing Settings", tee: "Ota käyttöön Decompression Fallback. Ilman sitä GitHub Pages ei osaa avata pakattua peliä.", naet: "Decompression Fallback on rastitettu." },
            { otsikko: "Tee build docs-kansioon", missa: "Unity ja VS Code", tee: "Paina Build. Luo valintaikkunassa repositoryn juureen uusi kansio docs ja valitse se. Luo sitten VS Codella docs-kansioon tyhjä tiedosto .nojekyll.", naet: "docs-kansiossa ovat index.html, Build, TemplateData ja .nojekyll." },
            { otsikko: "Vie GitHubiin", missa: "GitHub Desktop", tee: "Tee commit ja push.", naet: "GitHubin docs-kansiossa näkyvät samat tiedostot." },
            { otsikko: "Ota Pages käyttöön", missa: "GitHub, Settings → Pages", tee: "Valitse Deploy from a branch, haaraksi main ja kansioksi /docs. Paina Save.", naet: "Sivu kertoo, että sivustoa julkaistaan." },
            { otsikko: "Kokeile linkkiä", missa: "Selain", tee: "Odota muutama minuutti, avaa Pages-sivun antama linkki ja pelaa yksi kierros.", naet: "Peli aukeaa linkistä." },
            { otsikko: "Merkitse v1.0", missa: "GitHub, Releases → Draft a new release", tee: "Merkitse tagilla v1.0 se commit, jolla veit docs-kansion GitHubiin, ja paina Publish release.", naet: "Tagi v1.0 osoittaa samaan committiin kuin julkaisu." }
          ],
          valmis: "Peli aukeaa julkaisulinkistä, ja tagi v1.0 osoittaa samaan committiin kuin julkaisu.",
          tallenna: "Julkaisulinkki ja v1.0-tagi viikon 3 päiväkirjaan.",
          sanat: ["WebGL"],
          apu: {
            title: "Julkaisun rakenne ja tarkistuslista",
            tree: "repository/\n├─ Assets/\n├─ Packages/\n├─ ProjectSettings/\n└─ docs/ (GitHub Pagesin julkaisukansio)\n   ├─ .nojekyll\n   ├─ index.html (Unityn tekemä)\n   ├─ Build/\n   └─ TemplateData/",
            code: "JULKAISUN TARKISTUSLISTA\n[ ] Web valittuna\n[ ] CafeGame mukana scene-listassa\n[ ] Decompression Fallback käytössä\n[ ] docs/.nojekyll mukana\n[ ] docs/index.html + Build + TemplateData GitHubissa\n[ ] Pages: main /docs\n[ ] linkki testattu toisella selaimella",
            vinkit: [
              "Vanhemmissa Unity-versioissa valinnat ovat Build Settings ja WebGL.",
              "Jos peli ei lataudu, avaa selaimen Console (F12) ja etsi virhe 404. Se tarkoittaa, että tiedostoa ei löydy: tarkista kansiopolut."
            ],
            test: "Avaa julkaisulinkki yksityisessä selainikkunassa. Pelaa yksi kierros, päivitä sivu ja tarkista top 5 -lista.",
            images: [
              ["assets/unity/vko48-decompression-fallback.png", "Unityn Player Settings, Settings for Web: Publishing Settings avattuna ja Decompression Fallback -valinta käytössä.", "Player Settings → Web → Publishing Settings: Decompression Fallback päälle."],
              ["assets/unity/vko48-github-pages.png", "GitHubin Pages-asetussivu: Source-valintana Deploy from a branch ja Branch-valinnassa main-haara.", "GitHub: Settings → Pages → Deploy from a branch → main ja /docs."]
            ],
            links: [
              ["Unity: Web-julkaisun asetukset", "https://docs.unity3d.com/6000.0/Documentation/Manual/webgl-deploying.html"],
              [
                "GitHub: Pages-julkaisulähde",
                "https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site"
              ]
            ]
          }
        },
        "3-4": {
          miksi: "Käyttöohje kertoo asiakkaalle, miten peliä pelataan. Kun joku kokeilee peliä toisella laitteella, näet, toimiiko julkaistu peli muuallakin kuin omalla koneellasi.",
          osat: [
            { otsikko: "Lisää julkaisulinkki", missa: "VS Code, README.md", tee: "Lisää otsikko Näin pelaat ja sen alle julkaisulinkki.", naet: "README:ssä ovat otsikko ja linkki." },
            { otsikko: "Kirjoita ohje", missa: "VS Code, README.md", tee: "Kirjoita ohje neljänä vaiheena: avaa linkki → Aloita → valitse tilauksen tuotteet → Toimita.", naet: "Ohjeessa on neljä numeroitua vaihetta." },
            { otsikko: "Kirjaa puutteet ja lähteet", missa: "VS Code, README.md", tee: "Lisää otsikko Tunnetut puutteet ja sen alle havainnot, jotka merkitsit työvaiheessa 1 tunnetuiksi puutteiksi. Lisää otsikko Lähteet ja lisenssit ja listaa käytetyt grafiikkapaketit ja TextMeshPro lisensseineen.", naet: "README:ssä ovat molemmat otsikot sisältöineen." },
            { otsikko: "Vie GitHubiin", missa: "GitHub Desktop", tee: "Tee commit ja push.", naet: "README näkyy repositoryn etusivulla GitHubissa." },
            { otsikko: "Anna toisen kokeilla", missa: "Asiakkaan tai toisen ihmisen kanssa", tee: "Pyydä asiakasta tai toista ihmistä avaamaan julkaisulinkki omalla laitteellaan tai eri selaimella ja pelaamaan kierros pelkän README:n avulla. Älä neuvo.", naet: "Hän pelaa kierroksen ja tallentaa tuloksen." },
            { otsikko: "Kirjaa ja korjaa ohje", missa: "Projektipäiväkirja ja README.md", tee: "Kirjaa laite, selain, testaajan rooli ja kohdat, joissa hän epäröi. Korjaa README:n ohjetta niiltä kohdin ja tee commit.", naet: "Päiväkirjassa on kokeilun tulos." }
          ],
          valmis: "README:ssä ovat julkaisulinkki, käyttöohje, tunnetut puutteet ja lähteet, ja asiakas tai toinen ihminen on pelannut julkaistun pelin toisella laitteella tai selaimella.",
          tallenna: "README.md, commit ja push. Testattu laite, selain ja testaajan rooli viikon 3 päiväkirjaan.",
          esimerkki: "README: Avaa [linkki] → Aloita → valitse tuotteet → Toimita. Testattu Chrome 128 / v1.0 / tunnettu puute: [asia].",
          eiRiita: "Kuva editorista tai ”toimii omalla koneella” ei osoita, että asiakas pystyy avaamaan pelin."
        }
      },
      paivat: [
        ["Ma 18.1.", "Aloituspalaveri. Työvaihe 1: RC1 ja testaus uudella pelaajalla."],
        ["Ti 19.1.", "Työvaihe 2: ensimmäinen korjausketju."],
        ["Ke 20.1.", "Työvaihe 2: toinen korjausketju."],
        ["To 21.1.", "Työvaihe 3: julkaisu GitHub Pagesiin ja v1.0."],
        ["Pe 22.1.", "Työvaihe 4: README ja kokeilu toisella laitteella. Viikon kirjaus."]
      ]
    },

    4: {
      type: "naytto",
      feature: "Peli, repository ja projektipäiväkirja on luovutettu, ja jokaisella näyttömatriisin vaatimuksella on toimiva linkki.",
      excerpt: "Lopullinen peli pitää julkaista niin, että voin itse kokeilla sitä.",
      connection: "Peli on julkaistu, ja nyt kokoat näyttöaineiston. Arvioija löytää osaamisesi vain, jos jokaisella vaatimuksella on tarkka linkki työnäytteeseen. Itsearvioinnissa kerrot, mitä osaat, ja demossa näytät sen itse. Luovutat aineiston viikon lopussa.",
      paivamaarat: [
        ["Aloituspalaveri ohjaajan kanssa", "ma 25.1."],
        ["Demon harjoittelu", "viimeistään to 28.1."],
        ["Luovutus", "pe 29.1.2027"]
      ],
      deliverable: "Itsearviointi, täytetty project-docs/nayttomatriisi.md, harjoiteltu demo ja luovutettu aineisto.",
      why: "Arvioija voi arvioida vain näkyvän ja löydettävän osaamisen. Tarkat linkit säästävät aikaa ja näyttävät, miten vaatimus muuttui suunnitelmaksi, toteutukseksi ja testiksi.",
      done: "Tiedoston project-docs/nayttomatriisi.md jokaisella rivillä on tarkka linkki, joka aukeaa. Projektipäiväkirja ja AI-loki ovat repositoryssa, ja demo käyttää julkaistua versiota v1.0.",
      record: "Kirjoita Vko 4 -merkintään itsearviointi: kolme vahvuutta työnäytteineen ja yksi seuraava kehitysaskel. Lisää linkit tiedostoon project-docs/nayttomatriisi.md, AI-lokiin ja v1.0-versioon. Rastita lopuksi Näyttömatriisi-näkymässä kohdat Oma toiminta tiimissä ja Ohjelmiston dokumentointi.",
      skills: ["näyttömatriisi", "itsearviointi", "demo"],
      resources: [
        ["Avaa näyttömatriisi", "#view-naytto", false],
        ["Avaa ja lataa AI-loki", "#view-ailoki", false]
      ],
      tehtavat: {
        "4-1": {
          miksi: "Itsearviointi näyttää, että tunnistat oman osaamisesi ja tiedät, mitä opettelet seuraavaksi.",
          osat: [
            { otsikko: "Valitse vahvuudet", missa: "Projektipäiväkirja, viikko 4", tee: "Valitse projektista kolme asiaa, jotka osaat nyt hyvin.", naet: "Päiväkirjassa on kolme vahvuutta." },
            { otsikko: "Liitä työnäytteet", missa: "GitHub ja projektipäiväkirja", tee: "Liitä jokaiseen vahvuuteen työnäyte: linkki commitiin, testitapaukseen tai päiväkirjan viikkoon.", naet: "Jokaisella vahvuudella on linkki." },
            { otsikko: "Kirjoita kehitysaskel", missa: "Projektipäiväkirja, viikko 4", tee: "Kirjoita yksi asia, jota haluat kehittää seuraavaksi, ja miten aiot kehittää sitä.", naet: "Päiväkirjassa on yksi kehitysaskel." },
            { otsikko: "Kirjoita itse", missa: "Projektipäiväkirja, viikko 4", tee: "Lue teksti vielä kerran ja korjaa kohdat, jotka eivät kuulosta omilta sanoiltasi. Älä käytä tekoälyä itsearvioinnin kirjoittamiseen.", naet: "Itsearviointi on omin sanoin kirjoitettu." }
          ],
          valmis: "Viikon 4 päiväkirjassa on kolme vahvuutta työnäytteineen ja yksi kehitysaskel.",
          tallenna: "Itsearviointi viikon 4 päiväkirjaan.",
          eiRiita: "Tekoälyn kirjoittama yleinen itsearviointi, jossa ei ole linkkejä omiin työnäytteisiin."
        },
        "4-2": {
          miksi: "Kun jokaisella vaatimuksella on tarkka linkki, arvioija löytää jokaisen osaamisen yhdellä klikkauksella, eikä hänen tarvitse etsiä sitä repositorysta.",
          osat: [
            { otsikko: "Perusta tiedosto", missa: "VS Code", tee: "Luo tiedosto project-docs/nayttomatriisi.md. Kirjoita jokaiselle näyttömatriisin vaatimukselle oma rivi, jossa ovat vaatimuksen tunnus, työnäytteen linkki ja viikko.", naet: "Tiedostossa on 32 riviä." },
            { otsikko: "Lue ensimmäinen vaatimus", missa: "Näyttömatriisi-näkymä", tee: "Avaa Näyttömatriisi-näkymä ja lue ensimmäinen vaatimus.", naet: "Tiedät, mitä vaatimus edellyttää." },
            { otsikko: "Etsi työnäyte", missa: "GitHub ja projektipäiväkirja", tee: "Etsi työnäyte, joka osoittaa vaatimuksen täyttyvän: issue, C#-tiedosto, commit, testitapaus tai päiväkirjan viikko.", naet: "Sinulla on yksi työnäyte." },
            { otsikko: "Kopioi tarkka linkki", missa: "GitHub ja VS Code, nayttomatriisi.md", tee: "Kopioi työnäytteen tarkka linkki vaatimuksen riville. Linkin pitää avata juuri se kohta, ei repositoryn etusivua. Rastita vaatimus Näyttömatriisi-näkymässä.", naet: "Rivillä on linkki, joka aukeaa oikeaan kohtaan." },
            { otsikko: "Toista kaikille vaatimuksille", missa: "VS Code, nayttomatriisi.md", tee: "Toista osatehtävät 2–4 jokaiselle vaatimukselle. Tee commit ja push.", naet: "Jokaisella 32 rivillä on linkki." }
          ],
          valmis: "Tiedostossa project-docs/nayttomatriisi.md on rivi jokaiselle 32 vaatimukselle, ja jokaisen rivin tarkka linkki aukeaa.",
          tallenna: "project-docs/nayttomatriisi.md, commit ja push.",
          esimerkki: "p3 Toimintojen testaus | project-docs/testaus.md v1.0-tagissa (testitapaukset T01–T09) | vko 1. Sama työnäyte saa olla usealla rivillä.",
          eiRiita: "Pelkkä rastitettu matriisi tai linkki repositoryn etusivulle."
        },
        "4-3": {
          miksi: "Demossa näytät osaamisesi itse. Kun harjoittelet etukäteen, ehdit näyttää demossa tärkeimmät asiat.",
          osat: [
            { otsikko: "Kirjoita demon runko", missa: "Paperi tai muistio", tee: "Kirjoita demon runko kuutena kohtana: pelin kulku, tuotelista JSON-tiedostossa, tallennus, yksi virheenkorjaus, Git-historia ja AI-loki.", naet: "Sinulla on kuuden kohdan runko." },
            { otsikko: "Harjoittele ääneen", missa: "Toisen ihmisen kanssa", tee: "Harjoittele demo kerran ääneen toiselle ihmiselle ja mittaa, kuinka kauan se kestää. Kirjaa kuulijan rooli ja yksi hänen palautteensa.", naet: "Demo kestää 8–10 minuuttia." },
            { otsikko: "Harjoittele metodin selitys", missa: "VS Code", tee: "Harjoittele, miten selität yhden C#-metodin omin sanoin.", naet: "Osaat selittää metodin katsomatta muistiinpanoja." },
            { otsikko: "Käytä julkaistua versiota", missa: "Selain", tee: "Avaa demossa julkaistu versio v1.0 julkaisulinkistä.", naet: "Demo käyttää versiota v1.0." }
          ],
          valmis: "Demo kestää 8–10 minuuttia ja käy läpi kaikki kuusi kohtaa.",
          tallenna: "Kuulijan rooli ja palaute viikon 4 päiväkirjaan.",
          sanat: ["JSON"]
        },
        "4-4": {
          miksi: "Projektipäiväkirjasta arvioija löytää linkit kaikkiin työnäytteisiisi. Kun toinen ihminen tarkistaa aineiston, huomaat, jos jotain puuttuu.",
          osat: [
            { otsikko: "Tarkista viikot", missa: "Projektipäiväkirja-näkymä", tee: "Tarkista, että jokainen viikko on merkitty kirjatuksi. Täydennä puuttuvat kentät viikkonäkymissä.", naet: "Kaikki 10 viikkoa on kirjattu." },
            { otsikko: "Tarkista linkit", missa: "Projektipäiväkirja-näkymä", tee: "Avaa jokaisen viikon Missä työnäyte on? -kentän linkki.", naet: "Jokainen linkki aukeaa." },
            { otsikko: "Vie päiväkirja repositoryyn", missa: "Projektipäiväkirja-näkymä ja GitHub Desktop", tee: "Paina Lataa koko päiväkirja (.md) ja korvaa sillä repositoryn tiedosto project-docs/projektipaivakirja.md. Tarkista, että tiedoston lopussa on otsikko AI-loki. Tee commit ja push.", naet: "GitHubissa ovat peli, README.md, gdd.md, testaus.md, projektipaivakirja.md ja nayttomatriisi.md." },
            { otsikko: "Pyydä tarkistus", missa: "Toisen ihmisen kanssa", tee: "Pyydä toista ihmistä avaamaan julkaisulinkki ja repository. Kirjaa, löysikö hän kaiken.", naet: "Toinen ihminen löysi pelin ja aineiston." },
            { otsikko: "Luovuta", missa: "Ohjaajan kanssa", tee: "Luovuta peli, repository, projektipäiväkirja ja näyttöaineisto ohjaajalle viimeistään pe 29.1.2027.", naet: "Ohjaaja on vastaanottanut aineiston." }
          ],
          valmis: "Kaikki 10 viikkoa on kirjattu, ja aineisto on luovutettu viimeistään pe 29.1.2027 toisen ihmisen tarkistamana.",
          tallenna: "Luovutuksen päivä viikon 4 päiväkirjaan."
        }
      },
      paivat: [
        ["Ma 25.1.", "Aloituspalaveri. Työvaihe 1: itsearviointi."],
        ["Ti 26.1.", "Työvaihe 2: näyttömatriisin linkit."],
        ["Ke 27.1.", "Työvaihe 2 loppuun."],
        ["To 28.1.", "Työvaihe 3: demon harjoittelu."],
        ["Pe 29.1.", "Työvaihe 4: tarkistus ja luovutus."]
      ]
    }
  }
};

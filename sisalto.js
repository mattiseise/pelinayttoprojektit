/*
 * KahvilaKoodi – projektin koko sisältödata.
 *
 * Päivätty tila: viikot ovat ISO-kalenteriviikkoja 34–49 vuonna 2026,
 * syysloma viikolla 42. data-week-label-attribuutit index.html:ssä ovat
 * ISO-viikon päivämääriä (ei "Työviikko N / 18" -muotoa).
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
 * HUOM opettaja-lohkosta: tälle projektille ei löytynyt rakenteista
 * näyttösuunnitelma-/työnäytemäppäysdataa (ei tee_lataukset.js:ää, ei
 * opettaja.nayttosuunnitelma-tyyppistä sisältöä missään lähteessä – downloads/
 * -kansion kolme legacy-docx-tiedostoa ovat opettajan alkuperäistä lähdeaineistoa
 * sellaisenaan, eivät konedataa). Siksi `opettaja`-lohko on jätetty kokonaan pois
 * tästä tiedostosta migraatio-ohjeen mukaisesti, eikä tyokalut/tee_lataukset.js:ää
 * ole ajettu. Vanhat downloads/-tiedostot on jätetty ennalleen ja index.html
 * linkittää niihin edelleen samoilla nimillä.
 */
window.NAYTTOPROJEKTI = {
  /* ---- perustiedot ---- */
  slug: "kahvilakoodi",
  nimi: "KahvilaKoodi",
  vuosi: 2026,
  viikot: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
  lomaViikot: [42],
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
    aloitusHuomio: "Viikon työvaihe on tämän sivuston työohje. Kun teet muutoksen peliin, kirjaa se GitHub-issueksi ja tee se Työtapa-sivun kuudella askeleella. Valmiiseen issueen lisätään kommentti ja linkki commitiin, testien tulokset ja viikon yhteenveto kirjataan projektipäiväkirjaan."
  },

  /* ---- vaiheet (moottori v2.7: numeroidut vaiheet, kuvaus näkyy aloituksessa ja vaihekuvassa) ----
   * Viikot ja syysloma ovat ennallaan. Vanhat vaiheet A–D (Ydin, Featuret, Valmiiksi, Julkaisu)
   * korvattiin viidellä vaiheella, jotka seuraavat työn riippuvuuksia: suunnitelma → pelattava
   * peli → asiakkaan palaute → laatu → julkaisu. Värit = styles.css:n --phase-a … --phase-e. */
  vaiheet: [
    { tunnus: "1", lyhyt: "Valmistelu", otsikko: "Valmistelu ja suunnitelma", kuvaus: "Selvität asiakkaan tarpeen, teet Unity-projektin ja Git-repositoryn ja kokeilet tyhjää peliä selaimessa. Suunnitelma, GitHub-issuet ja hyväksytty rajaus valmistuvat ennen koodia, jotta rakennat oikeaa peliä.", kuvassa: ["Asiakkaan tarve → Unity ja Git → GDD ja issuet", "Tyhjä peli aukeaa selaimessa, rajaus on hyväksytty."], viikot: [34, 35], vari: "#0d9488" },
    { tunnus: "2", lyhyt: "Pelattava peli", otsikko: "Pelattava peli", kuvaus: "Rakennat pelin toiminto kerrallaan: kierros, tuotelista, kello ja pisteet, kasvava vaikeus ja top 5 -lista. Vaiheen lopussa toimeksiannon kaikki vaatimukset toimivat, joten asiakas voi kokeilla koko peliä.", kuvassa: ["Kierros → tuotelista → kello → vaikeus → top 5", "Toimeksiannon kaikki vaatimukset toimivat."], viikot: [36, 37, 38, 39, 40], vari: "#d97706" },
    { tunnus: "3", lyhyt: "Palaute", otsikko: "Asiakkaan palaute ja käytettävyys", kuvaus: "Asiakas pelaa väliversiota, ja toteutat yhdessä sovitun muutoksen omassa Git-haarassa. Sen jälkeen uusi pelaaja kokeilee peliä ilman neuvoja, ja korjaat kaksi suurinta ongelmaa.", kuvassa: ["Asiakas pelaa → muutos haarassa → uusi pelaaja", "Peli vastaa asiakkaan toivetta ja neuvoo itse."], viikot: [41, 42, 43, 44], vari: "#7c3aed" },
    { tunnus: "4", lyhyt: "Laatu", otsikko: "Testaus ja koodin laatu", kuvaus: "Testaat koko pelin 12 testitapauksella, korjaat kolme virhettä ketjuna ja selkeytät yhden koodikohdan katselmoinnin avulla. Laatu varmistetaan ennen julkaisuehdokasta, koska sen jälkeen peliin ei lisätä uutta.", kuvassa: ["12 testitapausta → 3 korjausketjua → selkeä koodi", "Peli kestää rajatilanteet, ja koodi on luettavaa."], viikot: [45, 46], vari: "#db2777" },
    { tunnus: "5", lyhyt: "Julkaisu", otsikko: "Julkaisu ja näyttö", kuvaus: "Jäädytät ominaisuudet, annat julkaisuehdokkaan RC1 asiakkaan testattavaksi ja julkaiset version v1.0 GitHub Pagesiin. Lopuksi kokoat näyttöaineiston ja harjoittelet demon.", kuvassa: ["Julkaisuehdokas RC1 → v1.0 GitHub Pagesissa → näyttö", "Asiakas voi avata pelin linkistä omalla koneellaan."], viikot: [47, 48, 49], vari: "#1e40af" }
  ],
  poikkeamat: {
    vaiheita: "viisi vaihetta: asiakkaan palaute (katselmointi, muutos ja käytettävyystesti) ja laatu (testaus ja refaktorointi) ovat eri tuloksia, ja yhdessä ne olisivat syysloman katkaisema kuuden viikon vaihe ilman välitulosta"
  },
  vaihekuva: {
    kuva: "assets/projektin-vaiheet.svg", leveys: 880, korkeus: 874,
    alt: "KahvilaKoodin viisi vaihetta: 1 valmistelu ja suunnitelma viikoilla 34–35, 2 pelattava peli viikoilla 36–40, 3 asiakkaan palaute ja käytettävyys viikoilla 41–44 (syysloma viikolla 42), 4 testaus ja koodin laatu viikoilla 45–46 sekä 5 julkaisu ja näyttö viikoilla 47–49."
  },
  vaiheetJohdanto: "Ensin selvität, mitä asiakas haluaa, ja teet suunnitelman ja työkalut valmiiksi. Sitten rakennat pelin toiminto kerrallaan niin, että jokainen viikko jättää pelattavan version. Asiakkaan palaute ohjaa viimeistelyä, testaus ja koodin selkeytys tehdään ennen julkaisuehdokasta, ja lopuksi asiakas avaa julkaistun pelin omalla koneellaan.",
  vaiheetHuomio: "Viikot ovat kalenteriviikkoja 34–49 vuonna 2026. Syyslomaviikolla 42 ei tehdä projektityötä. Aineisto luovutetaan viimeistään perjantaina 4.12.2026.",

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
    34: "Aloitus",
    35: "Pelin suunnitelma",
    36: "Pelattava kierros",
    37: "Kahvilan tuotelista",
    38: "Kello ja pisteet",
    39: "Kasvava kiire",
    40: "Top 5 -lista",
    41: "Asiakas pelaa",
    42: "Syysloma",
    43: "Asiakkaan toive",
    44: "Peli ohjaa pelaajaa",
    45: "Peli kestää pelaamista",
    46: "Koodin laatu",
    47: "Ensimmäinen julkaisuehdokas (RC1)",
    48: "Julkaisu v1.0",
    49: "Näyttö ja luovutus"
  },

  /* Sanasto: vain tämän projektin oikeasti käyttämät termit. Renderöidään
     Termit-näkymään ja viikkojen "Uudet termit" -laatikoihin. Jokainen termi
     selitetään myös juoksevassa tekstissä siinä kohdassa, jossa se tulee
     ensimmäisen kerran vastaan; sanasto on kertaus- ja hakuväline. */
  termisto: [
    { termi: "repository", nimi: "Projektin koodivarasto Gitissä", selite: "Repository on projektin tiedostojen ja koko muutoshistorian säilytyspaikka. Tässä projektissa se on GitHubissa, ja sieltä löytyvät peliprojekti, project-docs-kansio ja työnäytteet.", viikko: 34 },
    { termi: "commit", nimi: "Versionhallintaan tallennettu muutos", selite: "Commit on yksi versionhallintaan tallennettu muutoskokonaisuus: mitä muutit ja miksi. Jokaisella commitilla on oma tunniste, johon voit linkittää työnäytteenä.", viikko: 34 },
    { termi: "build", nimi: "Pelin ajettava julkaisuversio", selite: "Build on Unityn tekemä valmis versio pelistä. Sitä pelataan ilman Unity-editoria, ja juuri sitä asiakas kokeilee.", viikko: 34 },
    { termi: "WebGL", nimi: "Unityn selainjulkaisu", selite: "WebGL on Unityn julkaisumuoto, joka toimii selaimessa ilman asennusta. WebGL-build on pelin selainversio – tämän projektin lopputuote.", viikko: 34 },
    { termi: "push", nimi: "Commitien siirto GitHubiin", selite: "Push siirtää koneellasi tehdyt commitit GitHubiin. Vasta pushin jälkeen ohjaaja ja asiakas näkevät muutoksesi.", viikko: 34 },
    { termi: "P0", nimi: "Pakollinen ydin", selite: "P0 on se osa peliä, jonka on pakko valmistua: ilman sitä peliä ei voi luovuttaa asiakkaalle. Tee koko P0 valmiiksi ennen kuin aloitat lisäominaisuuksia.", viikko: 34 },
    { termi: "P1", nimi: "Tärkeä jatkosisältö", selite: "P1 on ominaisuus, joka tehdään vasta, kun koko P0 toimii. Se parantaa peliä, mutta peli on luovutettavissa myös ilman sitä.", viikko: 35 },
    { termi: "P2", nimi: "Valinnainen lisä", selite: "P2 on ominaisuus, joka voidaan jättää kokonaan pois, jos aika loppuu. Merkitse P2:ksi kaikki, mistä voi luopua ilman, että asiakkaan vaatimus jää täyttämättä.", viikko: 35 },
    { termi: "GDD", nimi: "Game Design Document, pelin suunnitteludokumentti", selite: "GDD kokoaa yhteen tiedostoon pelin konseptin, pelin kulun, omat suunnittelupäätökset, rajauksen ja avoimet asiat. Tässä projektissa se täytetään Suunnitelma-näkymässä ja tallennetaan repositoryyn nimellä gdd.md.", viikko: 35 },
    { termi: "GitHub-issue", nimi: "Yksi rajattu muutos peliin GitHubissa", selite: "GitHub-issue kuvaa yhden rajatun muutoksen peliin: otsikko, perustelu, rajattu muutos ja Valmis kun -ehto. Tässä projektissa yhden issuen työmäärä on puolesta päivästä yhteen päivään. Sivun yksi työvaihe voi sisältää useita issueita.", viikko: 35 },
    { termi: "backlog", nimi: "Priorisoitu issue-lista", selite: "Backlog on projektin kaikkien GitHub-issueiden lista. Tässä projektissa se on GitHubin Issues-lista, jossa jokaisella issuella on prioriteetti: pakollinen (P0), tärkeä (P1) tai lisä (P2). Lista päivitetään aina, kun asiakas päättää jotain uutta.", viikko: 35 },
    { termi: "mockup", nimi: "Käyttöliittymän luonnoskuva", selite: "Mockup on paperille tai piirto-ohjelmalla tehty luonnos ruuduista ennen koodaamista. Tässä projektissa se on project-docs/evidence/week-35/mockup.png, ja ruudut rakennetaan sen mukaan.", viikko: 35 },
    { termi: "UI", nimi: "User interface, käyttöliittymä", selite: "Käyttöliittymä on se osa peliä, jonka pelaaja näkee ja jota hän käyttää: painikkeet, tekstit ja paneelit. Unityssä ne rakennetaan Canvas-alueelle.", viikko: 35 },
    { termi: "feature", nimi: "Pelin yksittäinen ominaisuus", selite: "Feature on yksi pelaajalle näkyvä ominaisuus, esimerkiksi pistelasku tai viiden parhaan tuloksen lista. Tässä projektissa featuret tehdään yksi kerrallaan, yleensä yksi viikossa.", viikko: 35 },
    { termi: "scene", nimi: "Unityn näkymä", selite: "Scene on Unityn tiedosto, jossa pelin objektit ovat. Tässä projektissa koko peli on yhdessä scenessä nimeltä CafeGame.", viikko: 34 },
    { termi: "Hierarchy", nimi: "Unityn objektilista", selite: "Hierarchy-ikkuna näyttää scenen kaikki objektit puuna. Siinä luodaan ja nimetään esimerkiksi Canvas, paneelit, painikkeet ja GameManager.", viikko: 36 },
    { termi: "metodi", nimi: "Skriptin toiminto", selite: "Metodi on C#-skriptin nimetty toiminto, esimerkiksi StartGame. Painike kutsuu metodia, kun pelaaja klikkaa sitä.", viikko: 36 },
    { termi: "TODO", nimi: "Täydennettävä kohta koodissa", selite: "TODO-rivi on työpohjaan merkitty kohta, jonka kirjoitat itse. Rivi alkaa merkeillä // TODO, ja sen perässä lukee, mitä kohtaan tulee.", viikko: 36 },
    { termi: "hyväksymistesti", nimi: "Testi, joka osoittaa työn valmiiksi", selite: "Hyväksymistesti kertoo, mitä tehdään ja mitä pitää näkyä, jotta työvaihe tai muutos on valmis. Esimerkiksi Aloita → Kahvi → Toimita → tulosruudulla 10.", viikko: 36 },
    { termi: "Canvas", nimi: "Käyttöliittymän alue Unityssä", selite: "Canvas on alue, jolle Unityssä sijoitetaan tekstit, painikkeet ja paneelit. Pelin kolme ruutua ovat Canvasin sisällä.", viikko: 36 },
    { termi: "Inspector", nimi: "Unityn asetusikkuna", selite: "Inspector näyttää valitun objektin asetukset ja skriptien kentät. Siihen raahataan esimerkiksi paneelit ja products.json-tiedosto.", viikko: 36 },
    { termi: "asset", nimi: "Peliin tuotava valmis tiedosto", selite: "Asset on peliin tuotava valmis kuva-, ääni- tai fonttitiedosto, esimerkiksi sprite eli hahmon tai esineen kuva. Kirjaa jokaisesta assetista lähde ja lisenssi.", viikko: 36 },
    { termi: "JSON", nimi: "Tekstimuoto datalle", selite: "JSON on yksinkertainen tekstimuoto, jossa tieto on nimi–arvo-pareina. Tässä projektissa kahvilan tuotteet ovat products.json-tiedostossa, joten valikoimaa voi muuttaa koskematta koodiin.", viikko: 35 },
    { termi: "Console", nimi: "Unityn viesti-ikkuna", selite: "Console näyttää skriptien Debug.Log- ja Debug.LogError-viestit sekä virheet. Avaa se valinnalla Window → General → Console.", viikko: 37 },
    { termi: "rajatilanne", nimi: "Pelin ääritilanne", selite: "Rajatilanne on kohta, jossa peli menee helpoimmin rikki, esimerkiksi aika 0, nopea kaksoispainallus tai tyhjä nimimerkki. Rajatilanteet testataan erikseen.", viikko: 38 },
    { termi: "vertainen", nimi: "Toinen opiskelija", selite: "Vertainen on toinen opiskelija, joka keskustelee kanssasi, testaa peliäsi tai lukee koodiasi. Hän ei ole projektin asiakas.", viikko: 39 },
    { termi: "PlayerPrefs", nimi: "Unityn pieni tallennuspaikka", selite: "PlayerPrefs tallentaa pieniä tietoja avain–arvo-pareina. Selainversiossa tieto säilyy selaimen muistissa, kunnes pelaaja tyhjentää sen.", viikko: 40 },
    { termi: "katselmointi", nimi: "Työn yhteinen tarkastus", selite: "Katselmoinnissa toinen ihminen kokeilee peliä tai lukee koodia ja antaa palautetta. Viikolla 41 asiakas katselmoi pelin, viikolla 46 ohjaaja tai vertainen katselmoi koodin.", viikko: 41 },
    { termi: "branch", nimi: "Git-haara", selite: "Branch eli haara on rinnakkainen kehityslinja: teet muutoksen omassa haarassa, jolloin toimiva main-haara pysyy ehjänä. Valmis haara yhdistetään eli mergetään takaisin main-haaraan.", viikko: 43 },
    { termi: "pull request", nimi: "PR, pyyntö yhdistää haara pääversioon", selite: "Pull request eli PR on GitHubissa tehtävä pyyntö yhdistää oma haara main-haaraan. Se antaa katselmoinnille oman paikan ennen yhdistämistä. Pienen muutoksen voi myös yhdistää suoraan ilman PR:ää.", viikko: 43 },
    { termi: "T01", nimi: "Testitapauksen tunnus", selite: "Testitapaukset numeroidaan juoksevasti: T01 on ensimmäinen testitapaus, T02 toinen. Odotettu tulos kirjataan ennen ajoa, ja tunnuksella viitataan testiin päiväkirjassa ja näyttömatriisissa.", viikko: 45 },
    { termi: "refaktorointi", nimi: "Koodin rakenteen selkeyttäminen", selite: "Refaktoroinnissa koodia muutetaan selkeämmäksi niin, että peli toimii täsmälleen kuten ennen. Sama testitapaus ajetaan ennen ja jälkeen muutoksen.", viikko: 46 },
    { termi: "regressiotesti", nimi: "Vanhan toiminnan uusintatesti", selite: "Regressiotesti on toinen testitapaus, joka käyttää samaa koodia kuin korjaus. Kun se menee läpi, tiedät, ettei korjaus rikkonut muuta.", viikko: 45 },
    { termi: "RC", nimi: "Release candidate, julkaisuehdokas", selite: "Julkaisuehdokas on lähes valmis versio, joka testataan täsmälleen siinä muodossa, jossa se aiotaan julkaista. RC1 on ensimmäinen julkaisuehdokas, eikä siihen enää lisätä uusia ominaisuuksia.", viikko: 47 },
    { termi: "tagi", nimi: "Versionhallintaan merkitty nimetty versio", selite: "Tagi on yhteen committiin kiinnitetty nimilappu, esimerkiksi RC1 tai v1.0. Tagin avulla löydät myöhemmin täsmälleen sen version, jonka asiakas testasi.", viikko: 47 }
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
        `Tekijä: ${arvo("author")} · Päivitetty: ${pvm} · Pohja: KahvilaKoodi-toimeksianto 17.8.2026`,
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
        "1. Ensimmäinen pelattava kierros (vko 36)",
        "2. Kahvilan oikea tuotelista (vko 37)",
        "3. Kello, pisteet ja palaute (vko 38)",
        "4. Kasvava kiire (vko 39)",
        "5. Top 5 -tuloslista (vko 40)",
        "6. Asiakkaan toivoma parannus (vko 43 — sisältö selviää katselmoinnissa vkolla 41)",
        "7. Peli ohjaa pelaajaa itse (vko 44)",
        "",
        "Huomautus: tämä lista ei ole valmis suunnitelma. Featurejen pilkkominen pieniksi GitHub-issueiksi ja niiden priorisointi on omaa työtä (viikon 35 työvaiheet 2 ja 3). Pakollinen (P0) on ydin, jonka on valmistuttava; tärkeä (P1) tehdään, kun pakolliset toimivat; lisä (P2) voidaan jättää pois.",
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
     perii = vanhan tehtävän tunnus, jonka rasti siirtyy osatehtäviin kerran (syksy 2026). */
  viikkoOhjeet: {
    34: {
      type: "pohjustus",
      termit: ["repository", "commit", "build", "WebGL", "P0"],
      feature: "Tyhjä CafeGame-peli aukeaa selaimessa, ja tiedät asiakkaan vastauksista, millainen peli tehdään ja kenelle.",
      connection: "Projekti alkaa asiakkaan toimeksiannosta, joka ei vielä kerro kaikkea: kysymyksillä selvität avoimet asiat ennen kuin rakennat mitään. Samalla teet Unity-projektin ja Git-repositoryn ja kokeilet, että tyhjä peli aukeaa selaimessa, koska koko peli julkaistaan lopuksi selainversiona. Vastaukset ja toimiva työympäristö ovat pohja viikon 35 suunnitelmalle.",
      deliverable: "Kysymyslista ja asiakkaan vastaukset, Unity-projekti, selaimessa aukeava testiversio ja Git-repository.",
      why: "Jos avoimet asiat jäävät oletuksiksi, voit rakentaa väärän pelin. Varhainen testiversio varmistaa, että Unity-versio ja selainjulkaisu toimivat ennen varsinaista koodausta.",
      done: "Asiakkaan vastaukset ja avoimet asiat ovat päiväkirjassa, tyhjä peli aukeaa selaimessa ja ensimmäinen commit näkyy GitHubissa.",
      record: "Kirjoita Vko 34 -merkintään keskustelun päivä, osallistujien roolit, 6 kysymystä vastauksineen, avoimet asiat, Unity-versio, ensimmäisen commitin tunniste ja testiversion kuvakaappaus. Rastita lopuksi Näyttömatriisi-näkymässä kohdat Kehitysympäristö, Asiakkaan tarpeet ja Kehittämisympäristön käyttöönotto.",
      skills: ["asiakastarve", "Unity 2D", "Git"],
      tehtavat: {
        "34-1": {
          perii: ["34-1"],
          miksi: "Toimeksianto ei kerro kaikkea. Kysymyksillä saat selville, mitä asiakas oikeasti haluaa, ennen kuin alat rakentaa peliä.",
          osat: [
            "Avaa sivun Toimeksianto-näkymä ja lue asiakkaan teksti kerran alusta loppuun.",
            "Kirjoita muistiin jokainen asia, jonka pelissä on pakko olla, esimerkiksi aloitusvalikko, pistelasku ja parhaiden tulosten tallennus.",
            "Merkitse kohdat, joita teksti ei kerro. Esimerkiksi: kuinka pitkä yksi pelikierros on?",
            "Kirjoita kuusi kysymystä asiakkaalle: ota mukaan Toimeksianto-näkymän Sovi asiakkaan kanssa -laatikon neljä kysymystä ja lisää kaksi omaa. Jokaisen vastauksen pitää auttaa sinua päättämään jotain pelistä.",
            "Kirjoita jokaisen kysymyksen perään, minkä päätöksen vastaus ratkaisee.",
            "Tarkista, ettei kaksi kysymystä kysy samaa asiaa. Vaihda päällekkäinen kysymys uuteen."
          ],
          valmis: "Sinulla on kuusi erilaista kysymystä, ja jokaisen perässä lukee, minkä päätöksen vastaus ratkaisee.",
          tallenna: "Kysymyslista viikon 34 päiväkirjaan, kenttään Mitä tein ja miten?",
          esimerkki: "Kysymys: Kuinka pitkä yksi pelikierros on? → Päätös: ajastimen aloitusarvo.",
          eiRiita: "Kuusi lähes samaa kysymystä tai tekoälyn tekemä valmis lista, jota et ole käynyt itse läpi."
        },
        "34-2": {
          perii: ["34-1"],
          miksi: "Vain asiakas voi kertoa, mitä hän toivoo. Kun vastaukset on kirjattu, voit myöhemmin näyttää, mihin päätöksesi perustuvat.",
          osat: [
            "Sovi ohjaajan kanssa, kuka on asiakkaana ja milloin keskustelette.",
            "Kysy kysymykset yksi kerrallaan. Kirjoita vastaus heti ylös asiakkaan omin sanoin.",
            "Jos asiakas ei osaa vastata, kirjoita kohtaan sana avoin. Älä keksi vastausta itse tai tekoälyllä.",
            "Sovi lopuksi, mitkä ominaisuudet ovat pakollisia. Yhdessä ne ovat pakollinen perusversio (P0). Ilman niitä peliä ei voi antaa asiakkaalle.",
            "Kirjaa päiväkirjaan keskustelun päivä ja osallistujien roolit, esimerkiksi asiakas ja ohjaaja. Älä kirjoita muiden ihmisten nimiä."
          ],
          valmis: "Päiväkirjassa on jokaiselle kuudelle kysymykselle joko asiakkaan vastaus tai merkintä avoin sekä lista pakollisista (P0) ominaisuuksista.",
          tallenna: "Vastaukset ja avoimet asiat viikon 34 päiväkirjaan.",
          sanat: ["P0"],
          esimerkki: "Kysymys: Miten viiden parhaan tuloksen listan (top 5) tasatilanteet järjestetään? Vastaus: [asiakkaan vastaus]. Päätös: [oma tiivistys].",
          eiRiita: "Itse keksityt asiakkaan vastaukset eivät osoita, että olet selvittänyt asiakkaan tarpeen."
        },
        "34-3": {
          perii: ["34-2"],
          miksi: "Kun kokeilet selainversiota heti alussa, tiedät, että Unity-versio ja selainjulkaisu toimivat ennen kuin alat koodata.",
          osat: [
            "Avaa Unity Hub ja valitse Installs. Tarkista, että oppilaitoksen sopima Unity-versio on asennettu ja siinä on Web Build Support.",
            "Jos Web Build Support puuttuu, paina version kohdalla hammasratasta, valitse Add modules ja asenna se.",
            "Valitse Projects → New project. Valitse pohjaksi Universal 2D, anna nimeksi CafeGame ja paina Create project.",
            "Tallenna scene eli pelin näkymä: File → Save As → Assets/Scenes/CafeGame.unity.",
            "Avaa File → Build Profiles, valitse Web ja paina Switch Platform.",
            "Paina Add Open Scenes ja poista rasti SampleScene-riviltä. Paina Build And Run ja valitse kansioksi Builds/Test. Unity avaa selainversion.",
            "Kirjoita muistiin Unity-versio. Se näkyy Unity Hubissa projektin kohdalla, esimerkiksi 6000.0.xx."
          ],
          valmis: "Tyhjä CafeGame-peli aukeaa selaimeen, ja tiedät käyttämäsi Unity-version.",
          tallenna: "Unity-versio viikon 34 päiväkirjaan. Kuvakaappaus auenneesta selainversiosta, jonka viet työvaiheessa 5 polkuun project-docs/evidence/week-34/web-test.png.",
          sanat: ["build", "WebGL"],
          apu: {
            title: "Unity Hubin uusi projekti ja selainversio",
            vinkit: [
              "Vanhemmissa Unity-versioissa Build Profiles on nimeltään Build Settings, ja Web on nimeltään WebGL.",
              "Build And Run käynnistää Unityn oman pienen palvelimen. Siksi peli aukeaa selaimeen. Jos avaat Builds/Test/index.html-tiedoston suoraan kansiosta, peli ei käynnisty.",
              "Builds-kansio ei kuulu versionhallintaan. Tee testiversio aina koneen omaan kansioon."
            ],
            test: "Sulje selain. Paina Build And Run uudelleen: sama tyhjä peli aukeaa.",
            images: [
              ["assets/unity/vko34-hub-uusi-projekti.png", "Unity Hubin New project -näkymä: Universal 2D -pohja valittuna, projektin nimi CafeGame ja sijainti D-asemalla.", "Unity Hub: New project → Universal 2D → nimi CafeGame → Create project."],
              ["assets/unity/vko34-build-profiles-web.png", "Unityn Platform Browser -ikkuna, jossa Web-alusta on valittuna ja Add Build Profile -painike näkyvissä.", "Build Profiles → Web. Uusi profiili vaihtaa alustan Webiin."]
            ]
          }
        },
        "34-4": {
          perii: ["34-3"],
          miksi: "Repository eli koodivarasto säilyttää pelin ja sen koko muutoshistorian. Siitä ohjaaja ja asiakas näkevät työsi.",
          osat: [
            "Luo GitHubiin uusi repository. Valitse Public, ellei ohjaaja päätä toisin: ilmaistilillä GitHub Pages toimii vain julkisessa repositoryssa.",
            "Valitse kohtaan Add .gitignore pohja Unity. Se pitää Unityn väliaikaiset kansiot, kuten Library ja Temp, poissa versionhallinnasta.",
            "Kloonaa eli kopioi repository koneellesi GitHub Desktopilla: File → Clone repository.",
            "Sulje Unity. Siirrä CafeGame-projektin kansiot ja tiedostot repositoryn kansioon.",
            "Lisää projekti uudesta paikasta Unity Hubiin: Add → Add project from disk. Avaa projekti ja tarkista, että CafeGame-scene aukeaa."
          ],
          valmis: "Repository on GitHubissa, ja Unity Hub avaa CafeGame-projektin repositoryn kansiosta.",
          tallenna: "Repositoryn linkki viikon 34 päiväkirjaan.",
          sanat: ["repository"],
          apu: {
            title: "Repositoryn rakenne",
            tree: "CafeGame/\n├─ Assets/\n│  └─ Scenes/CafeGame.unity\n├─ Packages/\n├─ ProjectSettings/\n├─ project-docs/\n│  └─ projektipaivakirja.md\n├─ .gitignore\n└─ README.md\n\nLibrary/, Temp/ ja Builds/ jäävät Gitin ulkopuolelle.",
            vinkit: [
              "Jos Unity Hub avaa yhä vanhan kopion, poista vanha rivi Hubin projektilistasta: kolme pistettä → Remove from list."
            ]
          }
        },
        "34-5": {
          perii: ["34-3"],
          miksi: "Commit tallentaa työn versionhallintaan, ja push vie sen GitHubiin. Vasta silloin ohjaaja ja asiakas näkevät työsi.",
          osat: [
            "Luo repositoryn juureen kansio project-docs ja sen sisään tyhjä tiedosto projektipaivakirja.md. Git ei tallenna tyhjää kansiota.",
            "Siirrä työvaiheen 3 kuvakaappaus polkuun project-docs/evidence/week-34/web-test.png.",
            "Kirjoita README.md-tiedostoon pelin nimi ja yksi virke siitä, mitä peli tekee. README on repositoryn esittelytiedosto.",
            "Tarkista GitHub Desktopin Changes-listasta, että Assets, Packages, ProjectSettings, project-docs ja README.md ovat mukana. Library, Temp ja Builds eivät saa olla mukana.",
            "Tee commit eli tallenna muutokset versionhallintaan: kirjoita GitHub Desktopin Summary-kenttään ”Unity-projektin pohja” ja paina Commit to main. Tee sitten push painamalla Push origin, jolloin commit siirtyy GitHubiin."
          ],
          valmis: "Commit näkyy GitHubissa. Repositoryssa ovat Assets-, Packages-, ProjectSettings- ja project-docs-kansiot sekä README.md.",
          tallenna: "Repositoryn linkki ja ensimmäisen commitin tunniste (7 merkin koodi GitHubin commit-listassa, esimerkiksi a1b2c3d) viikon 34 päiväkirjaan.",
          sanat: ["commit", "push"],
          apu: {
            title: "Ensimmäisen commitin tarkistus",
            code: "ENSIMMÄISEN COMMITIN TARKISTUS\n[ ] Assets mukana\n[ ] Packages mukana\n[ ] ProjectSettings mukana\n[ ] project-docs mukana\n[ ] README.md kertoo pelin tavoitteen\n[ ] Library, Temp ja Builds eivät ole mukana\n[ ] commit näkyy GitHubissa",
            test: "Kloonaa repository toiseen kansioon tai pyydä ohjaajaa avaamaan se. Unity luo puuttuvan Library-kansion itse, ja CafeGame-scene aukeaa, kun kaksoisklikkaat sitä Project-ikkunan Scenes-kansiossa."
          }
        }
      },
      paivat: [
        ["Kysymykset", "Työvaihe 1: lue toimeksianto ja kirjoita kuusi kysymystä."],
        ["Keskustelu", "Työvaihe 2: pidä aloituskeskustelu ja kirjaa vastaukset."],
        ["Unity", "Työvaihe 3: luo Unity-projekti ja selaimessa aukeava testiversio."],
        ["Git", "Työvaiheet 4 ja 5: repository, ensimmäinen commit ja push."],
        ["Kirjaus", "Täydennä päiväkirja, lataa se ja vie se project-docs-kansioon."]
      ]
    },

    35: {
      type: "pohjustus",
      termit: ["GDD", "GitHub-issue", "backlog", "P1", "P2", "UI", "JSON"],
      feature: "Peli on suunniteltu ennen koodia: GDD on repositoryssa, GitHub-issuet on priorisoitu ja ohjaaja on hyväksynyt rajauksen.",
      excerpt: "Pelissä pitää olla aloitusvalikko, itse peli, pistelasku ja pelin päättymisnäkymä.",
      connection: "Viikon 34 asiakasvastausten perusteella muutat toimeksiannon suunnitelmaksi: pelin säännöt GDD:hen, pienet GitHub-issuet, ruutujen luonnos ja skriptien kartta. Rajaus estää peliä kasvamasta liian suureksi, ja Valmis kun -ehdoista näet, milloin työn voi testata. Viikosta 36 alkaen rakennat ruudut luonnoksen ja skriptit kartan mukaan.",
      deliverable: "Täytetty gdd.md, issue-lista GitHubissa, prioriteetit, ruutujen luonnos ja skriptien kartta.",
      why: "Rajaus estää projektia kasvamasta liian suureksi. Kun jokaisella issuella on selvä Valmis kun -ehto, tiedät mitä teet seuraavaksi ja milloin työn voi testata.",
      done: "Tiedosto gdd.md on repositoryssa, jokaisella issuella on arvio, tärkeysluokka – pakollinen (P0), tärkeä (P1) tai lisä (P2) – ja Valmis kun -ehto, ja ohjaaja on hyväksynyt rajauksen. Luonnoksessa näkyvät valikko, peli ja tulos.",
      record: "Kirjoita Vko 35 -merkintään, mitkä GDD-päätökset teit ja miksi, rajauksen hyväksyjän rooli ja päivä sekä asiakkaalle avoimiksi jääneet asiat. Lisää linkit gdd.md-tiedostoon, GitHubin Issues-listaan, luonnokseen ja skriptien karttaan. Rastita lopuksi Näyttömatriisi-näkymässä kohdat Tehtävistä sopiminen ja Tehtäviksi jakaminen.",
      skills: ["rajaus", "Unity UI", "työn pilkkominen"],
      resources: [
        ["Täytä GDD tällä sivulla", "#view-suunnitelma", false],
        ["Avaa koko toimeksianto", "#view-toimeksianto", false]
      ],
      tehtavat: {
        "35-1": {
          perii: ["35-1"],
          miksi: "Pelin suunnitteludokumentti kokoaa pelin säännöt yhteen paikkaan. Palaat siihen, kun rakennat pistelaskua ja ulkoasua.",
          osat: [
            "Avaa Suunnitelma (GDD) -näkymä. GDD eli Game Design Document on pelin suunnitteludokumentti. Lue esitäytetty osa: se tulee toimeksiannosta.",
            "Kirjoita pelille työnimi ja oma nimesi.",
            "Kirjoita kahdella tai kolmella virkkeellä, mitä peli tavoittelee, kenelle se on ja mikä on sinun roolisi.",
            "Valitse visuaalinen tyyli. Kirjoita, mistä grafiikka tulee ja millä lisenssillä eli käyttöluvalla sitä saa käyttää, esimerkiksi Kenney.nl, CC0 (saa käyttää vapaasti).",
            "Päätä pisteet: montako pistettä pelaaja saa oikeasta toimituksesta ja montako hän menettää väärästä. Perustele valinta yhdellä tai kahdella virkkeellä.",
            "Jos sovit kierroksen pituuden asiakkaan kanssa viikolla 34, kirjaa se. Muuten jätä kenttä tyhjäksi: se on avoin asia.",
            "Paina Lataa gdd.md. Siirrä tiedosto repositoryn project-docs-kansioon, tee commit ja push."
          ],
          valmis: "Tiedosto project-docs/gdd.md näkyy GitHubissa, eikä yhdessäkään OMA-merkityssä kentässä ole tyhjää kohtaa. ASIAKAS-merkitty kierroksen pituus saa jäädä avoimeksi.",
          tallenna: "project-docs/gdd.md ja commit-linkki viikon 35 päiväkirjaan.",
          sanat: ["GDD"],
          esimerkki: "Valitsin pikseligrafiikan, koska Kenneyn CC0-paketissa on valmiit kahvilaesineet ja tyyli toimii pienellä ruudulla välituntipelaajille.",
          eiRiita: "”Koska se näyttää hyvältä” tai tekoälyn yleinen perustelu, joka ei liity omaan peliin."
        },
        "35-2": {
          perii: ["35-2"],
          miksi: "Kun iso tavoite on pilkottu enintään päivän mittaisiksi GitHub-issueiksi, tiedät joka päivä, mitä teet seuraavaksi ja milloin se on valmis.",
          osat: [
            "Avaa Suunnitelma-näkymän lista Featuret tekojärjestyksessä. Feature on yksi pelaajalle näkyvä ominaisuus, esimerkiksi pistelasku.",
            "Ota listan kaksi ensimmäistä featurea. Kirjoita jokaisesta paperille 3–5 pientä asiaa, joita sen tekemiseen tarvitaan, esimerkiksi pelattava kierros: kolme ruutua, ruudun vaihto, tilaus ja pisteet.",
            "Avaa GitHubissa repository → Issues → New issue. Tee jokaisesta pienestä asiasta oma issue eli tehtävä. Aloita otsikko verbillä, esimerkiksi Näytä asiakkaan tilaus.",
            "Kirjoita jokaiseen issueen arvio: puoli päivää tai yksi päivä. Jos tehtävä on isompi, jaa se kahdeksi issueksi.",
            "Kirjoita jokaiseen issueen Valmis kun -ehto: mitä toinen ihminen näkee pelissä, kun tehtävä on tehty.",
            "Lisää vielä yksi issue kustakin muusta featuresta paitsi asiakkaan toivomasta parannuksesta, joka selviää vasta viikolla 41. Pilkot ne tarkemmin sillä viikolla, kun teet featuren."
          ],
          valmis: "GitHubissa on issuet kahdelle ensimmäiselle featurelle ja yksi issue kustakin muusta. Jokaisessa on arvio ja Valmis kun -ehto.",
          tallenna: "Linkki GitHubin Issues-listaan viikon 35 päiväkirjaan.",
          sanat: ["feature", "GitHub-issue"],
          apu: {
            title: "Issuen pohja",
            code: "ISSUEN POHJA\nOtsikko: [verbi + näkyvä toiminto]\n\nMiksi tämä tarvitaan:\n[mikä toimeksiannon vaatimus]\n\nTeen:\n[rajattu muutos]\n\nValmis kun:\n[mitä toinen ihminen näkee pelissä]\n\nArvio:\n[0,5 tai 1 työpäivä]",
            test: "Valitse yksi issue sattumalta. Toinen ihminen osaa sen tekstin perusteella kertoa, mitä peliin muuttuu ja miten tulos testataan."
          },
          esimerkki: "Issue: Näytä asiakkaan tilaus · 0,5 päivää · Valmis kun 1–3 tuotetta näkyy peliruudulla ennen kuin pelaaja valitsee.",
          eiRiita: "Yksi issue nimeltä ”Tee peli” tai issue, jossa ei ole Valmis kun -ehtoa."
        },
        "35-3": {
          perii: ["35-2"],
          miksi: "Jos aika loppuu, tiedät heti, mistä voit luopua. Pakolliset issuet tehdään aina ensin.",
          osat: [
            "Luo GitHubissa kolme labelia eli tunnistetta: Issues → Labels → New label. Anna nimiksi P0 pakollinen, P1 tärkeä ja P2 lisä.",
            "Anna label P0 pakollinen jokaiselle issuelle, jota ilman peliä ei voi antaa asiakkaalle. Kaikki toimeksiannon vaatimukset ovat pakollisia (P0). Käytä apuna viikon 34 aloituskeskustelun pakollisten (P0) listaa.",
            "Anna label P1 tärkeä issueille, jotka parantavat peliä. Peli on kuitenkin valmis ilman niitä. Tärkeät (P1) tehdään vasta, kun pakolliset (P0) toimivat.",
            "Anna label P2 lisä issueille, jotka voi jättää pois, jos aika loppuu. Lisät (P2) tehdään viimeisenä.",
            "Näytä lista ohjaajalle ja pyydä hyväksyntä rajaukselle eli sille, mitä peliin tehdään ja mitä jätetään pois. Kirjaa päiväkirjaan hyväksyjän rooli ja päivä."
          ],
          valmis: "Jokaisella issuella on yksi label: P0 pakollinen, P1 tärkeä tai P2 lisä. Ohjaaja on hyväksynyt listan.",
          tallenna: "Linkki Issues-listaan sekä hyväksyjän rooli ja päivä viikon 35 päiväkirjaan.",
          sanat: ["P0", "P1", "P2", "backlog"],
          eiRiita: "Kaikki issuet on merkitty pakollisiksi (P0). Silloin et tiedä, mistä voit luopua."
        },
        "35-4": {
          perii: ["35-3"],
          miksi: "Luonnos näyttää ennen koodaamista, mitä pelaaja näkee. Rakennat ruudut viikolla 36 tämän kuvan mukaan.",
          osat: [
            "Ota paperi ja jaa se kolmeen osaan. Kirjoita osien otsikoiksi Valikko, Peli ja Tulos.",
            "Piirrä Valikko-ruutuun pelin nimi ja Aloita-painike.",
            "Piirrä Peli-ruutuun asiakkaan tilaus, tuotepainikkeet (esimerkiksi Kahvi, Tee ja Sämpylä), Toimita-painike, aika ja pisteet.",
            "Piirrä Peli-ruutuun myös kohta, jossa peli kertoo, menikö toimitus oikein.",
            "Piirrä Tulos-ruutuun loppupisteet, viiden parhaan tuloksen lista ja Pelaa uudelleen -painike.",
            "Piirrä nuoli jokaisesta ruutua vaihtavasta painikkeesta siihen ruutuun, johon se vie, ja Peli-ruudusta Tulos-ruutuun, kun aika loppuu. Kuvaa paperi ja tallenna kuva nimellä mockup.png eli käyttöliittymän luonnoskuva."
          ],
          valmis: "Kuvassa on kolme ruutua, ja nuolet näyttävät, mihin Aloita ja Pelaa uudelleen vievät ja milloin peli siirtyy tulosruutuun.",
          tallenna: "Kuva polkuun project-docs/evidence/week-35/mockup.png, commit ja push.",
          sanat: ["UI", "mockup"]
        },
        "35-5": {
          perii: ["35-3"],
          miksi: "Kun jokaisella skriptillä on yksi tehtävä, virhe on helpompi löytää. Tämä kuva on koodin kartta, jota käytät viikosta 36 alkaen.",
          osat: [
            "Piirrä paperille viisi laatikkoa: GameManager, OrderManager, ProductDatabase, DifficultyController ja SaveService. Jokainen laatikko on yksi C#-skripti eli ohjelmatiedosto.",
            "Kirjoita jokaisen laatikon alle omin sanoin, mitä skripti tekee kahvilapelissä. Apuna on lista kortin lopun suljetussa kohdassa Skriptien tehtävät.",
            "Piirrä nuolet: products.json → ProductDatabase, ProductDatabase → OrderManager (tuotelista) ja SaveService → selaimen tallennus. Tuotteet tulevat tiedostosta, ja tulokset säilyvät selaimessa.",
            "Kuvaa paperi ja tallenna kuva nimellä unity-rakenne.png. Näytä kuva ohjaajalle ennen koodaamista ja kirjaa päiväkirjaan hänen kommenttinsa, roolinsa ja päivä."
          ],
          valmis: "Kuvassa on viisi skriptiä, jokaisella oma tehtävä, ja nuolet näyttävät, mistä tuotteet ja tulokset kulkevat.",
          tallenna: "Kuva polkuun project-docs/evidence/week-35/unity-rakenne.png, commit ja push.",
          sanat: ["JSON"],
          apu: {
            title: "Skriptien tehtävät",
            tree: "CafeGame-scene\n├─ GameManager      pelin kulku: ruudut, aika, pisteet ja näkyvät tekstit\n├─ OrderManager     tilaus: arpoo tuotteet ja tarkistaa toimituksen\n├─ ProductDatabase  tuotelista: lukee products.json-tiedoston\n├─ DifficultyController  vaikeus: kertoo tason pisteiden mukaan (vko 39)\n└─ SaveService      parhaat tulokset: tallentaa ja lataa top 5 -listan",
            test: "Näytä kuva toiselle ihmiselle. Hän osaa sanoa, mikä skripti muuttaa pisteitä ja mikä lukee tuotteet."
          },
          eiRiita: "Tekoälyn piirtämä rakennekuva, jota et osaa selittää, tai kuva ilman nuolia."
        }
      }
    },

    36: {
      type: "feature",
      termit: ["asset", "scene", "Canvas", "Inspector"],
      feature: "Peliä voi pelata alusta loppuun: Aloita → asiakas tilaa kahvin → pelaaja toimittaa → tulosruutu näyttää pisteet.",
      excerpt: "Pelaajan tehtävänä on toimittaa oikea tilaus mahdollisimman nopeasti.",
      connection: "Viikon 35 luonnoksesta ja skriptien kartasta tulee nyt ensimmäinen pelattava versio. Rakennat kolme ruutua ja GameManagerin, ja yksi kiinteä kahvitilaus riittää, koska pieni alusta loppuun toimiva peli paljastaa Canvasin ja painikkeiden kytkentävirheet aikaisin. Viikolla 37 kiinteä kahvi vaihtuu tuotelistasta arvottuun tilaukseen.",
      deliverable: "Ensimmäinen pelattava selainversio: valikosta yhden tilauksen kautta tulosruutuun.",
      why: "Pieni alusta loppuun toimiva versio paljastaa scenen, Canvasin ja painikkeiden kytkentävirheet aikaisin. Sen päälle on turvallista lisätä loput ominaisuudet.",
      done: "Aloita → Kahvi → Toimita → tulosruutu näyttää pisteet. Polku toimii selainversiossa ilman, että kosket Unity-editoriin kesken pelin.",
      record: "Kirjoita Vko 36 -merkintään kolme testikierrosta tuloksineen, löydetyt virheet ja niiden korjaukset. Lisää video tai kuvat pelipolusta sekä commit-linkit. Rastita lopuksi Näyttömatriisi-näkymässä kohdan Kirjaston toiminnot ja työkalut.",
      skills: ["Unity Canvas", "pelitilat", "ensimmäinen testi"],
      resources: [
        ["Kenney.nl – ilmaiset CC0-assetit: hahmot, esineet ja käyttöliittymäkuvat", "https://kenney.nl/assets", false],
        ["OpenGameArt – 2D-hahmot ja taustat (tarkista lisenssi)", "https://opengameart.org/", false],
        ["Piskel – piirrä omat spritet selaimessa", "https://www.piskelapp.com/", false]
      ],
      tehtavat: {
        "36-1": {
          perii: ["36-1"],
          miksi: "Valikko, peli ja tulos ovat pelin runko. Aloitat valikosta, koska pelaaja näkee sen ensimmäisenä.",
          osat: [
            "Avaa CafeGame-scene. Valitse Hierarchy-ikkunassa eli scenen objektilistassa + → UI → Canvas. Canvas on alue, jolle pelin tekstit ja painikkeet tulevat.",
            "Klikkaa Canvasia hiiren oikealla ja valitse UI → Panel. Tee näin kolme paneelia ja nimeä ne MenuPanel, GamePanel ja ResultPanel.",
            "Lisää MenuPaneliin painike: UI → Button - TextMeshPro. Paina Import TMP Essentials, jos Unity kysyy. Nimeä painike StartButton.",
            "Valitse StartButtonin alta Text (TMP) ja kirjoita Inspectorin tekstikenttään Aloita.",
            "Lisää MenuPaneliin teksti (UI → Text - TextMeshPro) ja kirjoita siihen pelin nimi.",
            "Siirrä Scene-ikkunassa pelin nimi ja Aloita-painike luonnoksesi (mockup.png) mukaisille paikoille."
          ],
          valmis: "Hierarchyssä on Canvas ja sen alla kolme paneelia. MenuPanelissa näkyvät pelin nimi ja Aloita-painike.",
          tallenna: "Commit ja push. Commit-linkki viikon 36 päiväkirjaan.",
          sanat: ["Hierarchy", "Canvas", "UI", "Inspector"],
          apu: {
            title: "Valikkoruudun rakenne",
            tree: "CafeGame (scene)\n├─ Main Camera\n├─ Global Light 2D\n├─ EventSystem       (Unity luo tämän Canvasin kanssa)\n└─ Canvas\n   ├─ MenuPanel\n   │  ├─ Text (TMP)   pelin nimi\n   │  └─ StartButton\n   ├─ GamePanel\n   └─ ResultPanel",
            vinkit: [
              "Uudemmissa Unity 6 -versioissa valikon nimi voi olla UI (Canvas).",
              "Älä poista EventSystem-objektia. Ilman sitä painikkeet eivät reagoi klikkauksiin."
            ],
            test: "Paina Play. Pelin nimi ja Aloita-painike näkyvät."
          }
        },
        "36-2": {
          perii: ["36-1"],
          miksi: "Peliruudussa pelaaja tekee työn, ja tulosruutu kertoo, miten hän onnistui. Ruudut rakennetaan valmiiksi ennen koodia.",
          osat: [
            "Lisää GamePaneliin kolme tekstiä (UI → Text - TextMeshPro): OrderText, ScoreText ja TimeText.",
            "Lisää GamePaneliin kaksi painiketta: CoffeeButton tekstillä Kahvi ja SubmitButton tekstillä Toimita.",
            "Lisää ResultPaneliin teksti FinalScoreText ja painike RestartButton tekstillä Pelaa uudelleen.",
            "Siirrä Scene-ikkunassa jokaisen paneelin tekstit ja painikkeet erilleen luonnoksesi (mockup.png) mukaan, jotta ne eivät ole päällekkäin.",
            "Piilota GamePanel ja ResultPanel: valitse paneeli ja poista rasti Inspectorin yläreunasta nimen vierestä."
          ],
          valmis: "Hierarchy näyttää samalta kuin avun rakenne (Main Camera, Global Light 2D ja EventSystem saavat olla lisäksi), ja Play-tilassa näkyy vain valikko.",
          tallenna: "Kuvakaappaus Hierarchy-ikkunasta polkuun project-docs/evidence/week-36/hierarchy.png, commit ja push. Polku viikon 36 päiväkirjan kenttään Missä työnäyte on?",
          sanat: ["UI", "Inspector", "asset"],
          apu: {
            title: "Scenen rakenne tämän työvaiheen jälkeen",
            tree: "CafeGame (scene)\n└─ Canvas\n   ├─ MenuPanel\n   │  └─ StartButton\n   ├─ GamePanel        (piilossa alussa)\n   │  ├─ OrderText\n   │  ├─ ScoreText\n   │  ├─ TimeText\n   │  ├─ CoffeeButton\n   │  └─ SubmitButton\n   └─ ResultPanel      (piilossa alussa)\n      ├─ FinalScoreText\n      └─ RestartButton",
            vinkit: [
              "Väliaikainen grafiikka riittää: harmaat paneelit ja oletuspainikkeet. Assetit eli valmiit kuvat ja äänet lisätään vasta viimeistelyssä."
            ],
            test: "Paina Play. Vain MenuPanel näkyy.",
            images: [
              ["assets/unity/vko36-hierarchy-paneelit.png", "Unityn Hierarchy-paneeli: CafeGame-scene, jossa GameManager, ProductDatabase sekä Canvasin alla MenuPanel, GamePanel ja ResultPanel.", "Hierarchy viikon lopussa: Canvasin alla kolme paneelia. GameManager lisätään työvaiheessa 3."]
            ]
          }
        },
        "36-3": {
          perii: ["36-2"],
          miksi: "Pelin pitää itse näyttää oikea ruutu oikeaan aikaan. Silloin peliä voi pelata ilman, että kukaan koskee Unity-editoriin.",
          osat: [
            "Luo Project-ikkunan Assets-kansioon kansio Scripts: hiiren oikea → Create → Folder.",
            "Klikkaa Scripts-kansiota hiiren oikealla ja valitse Create → Scripting → MonoBehaviour Script eli objektiin liitettävä C#-skripti. Anna nimeksi GameManager.",
            "Avaa skripti ja korvaa sen sisältö avun työpohjalla. Tallenna tiedosto.",
            "Luo Hierarchyyn tyhjä objekti: + → Create Empty. Nimeä se GameManager ja raahaa GameManager-skripti sen päälle.",
            "Valitse GameManager-objekti. Raahaa MenuPanel, GamePanel ja ResultPanel Hierarchystä Inspectorin kenttiin Menu Panel, Game Panel ja Result Panel.",
            "Kytke Aloita-painike. Valitse StartButton ja paina On Click () -listan +. Raahaa GameManager-objekti kenttään ja valitse GameManager → StartGame.",
            "Kytke RestartButton samalla tavalla metodiin eli skriptin toimintoon RestartGame.",
            "Paina Play ja sitten Aloita. Peliruutu tulee näkyviin, ja valikko katoaa."
          ],
          valmis: "Play-tilassa Aloita vaihtaa valikon peliruutuun.",
          tallenna: "Commit ja push. Commit-linkki viikon 36 päiväkirjaan.",
          sanat: ["Inspector", "metodi"],
          apu: {
            title: "GameManager-työpohja (käytät samaa tiedostoa myös työvaiheessa 4)",
            code: "using TMPro;\nusing UnityEngine;\n\npublic class GameManager : MonoBehaviour\n{\n    [SerializeField] private GameObject menuPanel;\n    [SerializeField] private GameObject gamePanel;\n    [SerializeField] private GameObject resultPanel;\n    [SerializeField] private TMP_Text orderText;\n    [SerializeField] private TMP_Text scoreText;\n    [SerializeField] private TMP_Text finalScoreText;\n\n    private int score;\n    private bool coffeeSelected;\n\n    private void Start()\n    {\n        ShowOnly(menuPanel);\n    }\n\n    public void StartGame()\n    {\n        score = 0;\n        coffeeSelected = false;\n        // TODO työvaihe 4: kirjoita orderText-kenttään \"Asiakas tilaa: Kahvi\"\n        // TODO työvaihe 4: näytä pisteet scoreText-kentässä\n        ShowOnly(gamePanel);\n    }\n\n    public void SelectCoffee()\n    {\n        coffeeSelected = true;\n    }\n\n    public void SubmitOrder()\n    {\n        // TODO työvaihe 4: jos coffeeSelected on true, lisää pisteisiin 10\n        // TODO työvaihe 4: näytä uudet pisteet scoreText-kentässä\n        EndGame(); // viikolla 38 peli päättyy vasta, kun aika loppuu\n    }\n\n    public void EndGame()\n    {\n        // TODO työvaihe 4: näytä pisteet finalScoreText-kentässä\n        ShowOnly(resultPanel);\n    }\n\n    public void RestartGame()\n    {\n        StartGame();\n    }\n\n    private void ShowOnly(GameObject panel)\n    {\n        menuPanel.SetActive(panel == menuPanel);\n        gamePanel.SetActive(panel == gamePanel);\n        resultPanel.SetActive(panel == resultPanel);\n    }\n}",
            vinkit: [
              "MonoBehaviour on C#-skripti, jonka voi liittää Unityn objektiin.",
              "[SerializeField] tuo kentän näkyviin Inspectoriin, jotta voit raahata paneelin siihen.",
              "Vanhemmissa Unity-versioissa skripti luodaan valinnalla Create → C# Script."
            ],
            test: "Paina Play: näkyy vain valikko. Paina Aloita: näkyy vain peliruutu.",
            images: [
              ["assets/unity/vko36-button-onclick.png", "Unityn Inspector: StartButtonin Button-komponentti, jonka On Click -listassa on GameManager ja StartGame-metodi.", "StartButtonin On Click -lista: GameManager → StartGame."]
            ]
          }
        },
        "36-4": {
          perii: ["36-2"],
          miksi: "Tämä on pelin ydin pienimmillään: asiakas tilaa, pelaaja toimittaa ja saa pisteet.",
          osat: [
            "Valitse GameManager-objekti. Raahaa Inspectorissa OrderText, ScoreText ja FinalScoreText skriptin kenttiin.",
            "Täydennä StartGame-metodin TODO-rivit eli koodiin merkityt täydennettävät kohdat: kirjoita OrderText-tekstiin ”Asiakas tilaa: Kahvi” ja näytä pisteet ScoreText-tekstissä.",
            "Kytke CoffeeButtonin On Click () -listaan GameManager → SelectCoffee. Kytke SubmitButtonin listaan GameManager → SubmitOrder.",
            "Täydennä SubmitOrder: jos kahvi on valittu, lisää pisteisiin 10 ja päivitä ScoreText.",
            "Täydennä EndGame: näytä pisteet FinalScoreText-kentässä.",
            "Paina Play ja pelaa: Aloita → Kahvi → Toimita."
          ],
          valmis: "Aloita → Kahvi → Toimita → tulosruudulla lukee 10 pistettä.",
          tallenna: "Commit ja push. Commit-linkki viikon 36 päiväkirjaan.",
          sanat: ["TODO", "hyväksymistesti"],
          apu: {
            title: "Tekstikentän päivitys C#:ssa",
            code: "orderText.text = \"Asiakas tilaa: Kahvi\";\nscoreText.text = \"Pisteet: \" + score;\n\nif (coffeeSelected)\n{\n    score += 10;\n}",
            test: "Paina Toimita valitsematta kahvia. Pisteet pysyvät nollassa."
          },
          esimerkki: "Hyväksymistesti eli testi, joka osoittaa tehtävän valmiiksi: Aloita → Kahvi → Toimita → tulosruudulla 10.",
          eiRiita: "Kolme irrallista kuvaa ruuduista tai Unity-editorissa käsin vaihdettu ruutu ei ole alusta loppuun pelattava peli."
        },
        "36-5": {
          perii: ["36-3"],
          miksi: "Editorissa toimiva peli voi toimia selaimessa eri tavalla. Kun kirjaat virheet ennen korjaamista, näet myöhemmin, mitä korjasit ja miksi.",
          osat: [
            "Tee selainversio: File → Build Profiles → Web → Build And Run.",
            "Kirjoita päiväkirjaan ennen pelaamista odotettu tulos: Aloita → Kahvi → Toimita → tulosruudulla 10.",
            "Pelaa kierros kolme kertaa. Käytä välillä Pelaa uudelleen -painiketta.",
            "Kirjaa jokaisesta kierroksesta, menikö se odotetusti. Jos ei mennyt, kirjoita tarkasti, mitä tapahtui.",
            "Korjaa löytämäsi virheet vasta kirjaamisen jälkeen. Kirjaa korjaus samaan kohtaan.",
            "Tee commit ja push. Kirjoita commit-viestiin, mitä korjasit.",
            "Kirjoita GitHubissa jokaiseen tämän viikon valmiiseen issueen kommentti. Lisää kommenttiin linkki siihen commitiin, jossa työ tehtiin. Sulje issuet vasta sen jälkeen."
          ],
          valmis: "Päiväkirjassa on kolme testikierrosta tuloksineen, ja viimeinen kierros meni odotetusti.",
          tallenna: "Kolme kuvaa tai lyhyt video pelipolusta kansioon project-docs/evidence/week-36/, commit ja push. Testikirjaukset ja commit-linkki viikon 36 päiväkirjaan.",
          eiRiita: "”Toimii” ilman odotettua tulosta tai testaus pelkästään Unity-editorissa."
        }
      }
    },

    37: {
      type: "feature",
      termit: ["JSON"],
      feature: "Asiakas tilaa 1–3 tuotetta, jotka arvotaan products.json-tiedostosta, ja tuotteita voi muuttaa koskematta C#-koodiin.",
      excerpt: "Tuotteiden tiedot eivät saa olla kovakoodattuna pelilogiikkaan, vaan niiden pitää tulla erillisestä tietolähteestä.",
      connection: "Viikon 36 kierros toimii, mutta kahvi on kirjoitettu suoraan koodiin. Nyt tuotteet luetaan erillisestä products.json-tiedostosta, kuten toimeksianto vaatii, ja OrderManager arpoo tilauksen ja tarkistaa toimituksen. Tilaus ja sen pisteet ovat pohja viikon 38 kellolle, palautteelle ja pelisäännöille.",
      deliverable: "products.json, ProductDatabase.cs, OrderManager.cs, 1–3 tuotteen tilaus ja virhetilanteiden käsittely.",
      why: "Erillinen tietolähde tekee tuotteiden muuttamisesta helppoa. Samalla osoitat, että osaat lukea tietoa tiedostosta C#-olioiksi ja pitää pelisäännöt erillään käyttöliittymästä.",
      done: "Kun muutat kahvin pistearvon products.json-tiedostossa, muutos näkyy pelissä ilman C#-muutosta. Jos tiedosto puuttuu tai on rikki, peli näyttää virheilmoituksen eikä kaadu.",
      record: "Kirjoita Vko 37 -merkintään tiedoston polku, tiedon kulku products.json → ProductDatabase → OrderManager → OrderText, commit-linkki sekä kolmen testin tulokset. Rastita lopuksi Näyttömatriisi-näkymässä kohdan Rajapinnat ja tieto.",
      skills: ["TextAsset + JSON", "C#-logiikka", "virheenkäsittely"],
      tehtavat: {
        "37-1": {
          perii: ["37-1"],
          miksi: "Asiakas haluaa, että tuotteita voi muuttaa koskematta koodiin. Siksi tuotteet ovat omassa tiedostossaan.",
          osat: [
            "Luo Assets-kansioon kansio Data. Luo sinne koodieditorilla, esimerkiksi VS Codella, tiedosto products.json.",
            "Kirjoita tiedostoon kolme tuotetta avun mallin mukaan. Jokaisella tuotteella on id (tunniste), name (nimi) ja points (pisteet).",
            "Anna points-arvoksi se pistemäärä, jonka päätit pelin suunnitteludokumentissa (GDD) oikealle toimitukselle, esimerkiksi 10.",
            "Tarkista tiedoston muoto: lainausmerkit nimien ympärillä, pilkut tuotteiden välissä ja hakasulkeet listan ympärillä. VS Code näyttää muotovirheen punaisella.",
            "Palaa Unityyn ja klikkaa products.json-tiedostoa Project-ikkunassa. Inspector näyttää tiedoston sisällön."
          ],
          valmis: "Unityn Inspector näyttää products.json-tiedoston, ja siinä on kolme tuotetta.",
          tallenna: "Commit ja push. Tiedoston polku viikon 37 päiväkirjaan.",
          sanat: ["JSON"],
          apu: {
            title: "products.json-malli",
            code: "{\n  \"products\": [\n    { \"id\": \"kahvi\",   \"name\": \"Kahvi\",   \"points\": 10 },\n    { \"id\": \"tee\",     \"name\": \"Tee\",     \"points\": 10 },\n    { \"id\": \"sampyla\", \"name\": \"Sämpylä\", \"points\": 10 }\n  ]\n}",
            vinkit: [
              "Kirjoita id ilman ääkkösiä ja välilyöntejä. Sen avulla koodi tunnistaa tuotteen.",
              "name näkyy pelaajalle, joten siinä saa olla ääkkösiä."
            ],
            test: "Poista yksi pilkku. VS Code näyttää punaisen virheen. Palauta pilkku."
          }
        },
        "37-2": {
          perii: ["37-1"],
          miksi: "ProductDatabase on ainoa skripti, joka lukee tuotetiedoston. Jos tiedostossa on vika, se löytyy yhdestä kohdasta.",
          osat: [
            "Luo Scripts-kansioon skripti ProductDatabase ja korvaa sen sisältö avun työpohjalla.",
            "Lue työpohjasta kaksi luokkaa: ProductData on yksi tuote ja ProductList on tuotteiden lista. Rivi [System.Serializable] kertoo Unitylle, että luokan voi lukea JSONista.",
            "Luo Hierarchyyn tyhjä objekti ProductDatabase ja raahaa skripti sen päälle.",
            "Raahaa products.json Inspectorissa ProductDatabase-skriptin Products Json -kenttään.",
            "Täydennä ensimmäinen TODO-kohta: jos Products Json -kenttä on tyhjä, kirjoita virheilmoitus Consoleen eli Unityn viesti-ikkunaan ja palauta tyhjä lista.",
            "Täydennä toinen TODO-kohta: ota rikkinäisen JSONin virhe kiinni try–catch-lohkolla eli koodilla, joka nappaa virheen ennen kuin peli kaatuu. Kirjoita virheilmoitus Consoleen ja palauta tyhjä lista."
          ],
          valmis: "Avun tarkistustestissä Console näyttää Kahvi, ja molemmat TODO-kohdat on täydennetty.",
          tallenna: "Commit ja push. Commit-linkki viikon 37 päiväkirjaan.",
          sanat: ["Console", "TODO"],
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
        "37-3": {
          perii: ["37-2"],
          miksi: "Toimeksiannon mukaan asiakas tilaa 1–3 tuotetta. OrderManager hoitaa tilaukset, jotta GameManager pysyy yksinkertaisena.",
          osat: [
            "Luo skripti OrderManager avun työpohjasta ja liitä se GameManager-objektiin.",
            "Raahaa ProductDatabase-objekti OrderManager-skriptin Product Database -kenttään.",
            "Täydennä CreateOrder: arvo tilaukseen 1–3 tuotetta listasta ja palauta tilausteksti, esimerkiksi ”Asiakas tilaa: Kahvi, Sämpylä”.",
            "Lisää GameManageriin kenttä [SerializeField] private OrderManager orderManager; ja raahaa GameManager-objekti Inspectorissa sen Order Manager -kenttään.",
            "Muuta StartGame-metodia: kirjoita OrderText-tekstiin CreateOrder-metodin palauttama tilausteksti.",
            "Paina Play ja Aloita viisi kertaa. Kirjaa, mitä tilauksia tuli."
          ],
          valmis: "Play-tilassa tilaus vaihtuu joka pelissä, ja siinä on 1–3 tuotetta.",
          tallenna: "Commit ja push. Commit-linkki ja viiden tilauksen lista viikon 37 päiväkirjaan.",
          sanat: ["metodi"],
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
        "37-4": {
          perii: ["37-2"],
          miksi: "Pelaaja valitsee tuotteet painikkeilla, ja pelin pitää tietää, menikö toimitus oikein.",
          osat: [
            "Lisää GamePaneliin painikkeet TeaButton tekstillä Tee ja BreadButton tekstillä Sämpylä.",
            "Poista Kahvi-painikkeen vanha kytkentä: valitse CoffeeButton, valitse On Click () -listan SelectCoffee-rivi ja paina −.",
            "Kytke kolme tuotepainiketta GameManager-objektin OrderManager → SelectProduct -metodiin. Kirjoita parametriksi eli annettavaksi arvoksi tuotteen id: kahvi, tee tai sampyla.",
            "Täydennä CheckDelivery: vertaa valittuja tuotteita tilaukseen. Oikeasta toimituksesta metodi palauttaa tuotteiden points-arvojen summan. Väärästä toimituksesta se palauttaa nollan.",
            "Muuta SubmitOrder-metodia: lisää pisteisiin CheckDelivery-metodin palauttama arvo.",
            "Paina Play ja toimita yksi oikea ja yksi väärä tilaus. Kirjaa, montako pistettä kumpikin antoi."
          ],
          valmis: "Oikea toimitus antaa tuotteiden pisteet yhteensä, ja väärä toimitus antaa 0 pistettä.",
          tallenna: "Commit ja push. Commit-linkki ja kahden toimituksen tulos viikon 37 päiväkirjaan.",
          apu: {
            title: "Listojen vertailu CheckDelivery-metodissa",
            code: "// Lisää OrderManager.cs-tiedoston alkuun:\nusing System.Linq;\n\npublic int CheckDelivery()\n{\n    List<string> orderIds = currentOrder.Select(p => p.id).ToList();\n    orderIds.Sort();\n    selectedIds.Sort();\n    // TODO: jos orderIds.SequenceEqual(selectedIds) on true,\n    //       palauta currentOrder.Sum(p => p.points)\n    // TODO: muuten palauta 0\n    return 0;\n}",
            vinkit: [
              "Sort järjestää listan aakkosjärjestykseen. Kun molemmat listat on järjestetty, valintajärjestyksellä ei ole väliä.",
              "SequenceEqual vertaa, ovatko kaksi listaa samat alkio alkiolta.",
              "Painikkeen On Click () -lista osaa antaa metodille yhden tekstiparametrin. Siksi yksi SelectProduct-metodi riittää kaikille tuotteille."
            ],
            test: "Tilaus Kahvi, Tee: valitse ensin Tee ja sitten Kahvi. Toimitus on silti oikein."
          },
          eiRiita: "Tuotetiedosto on olemassa, mutta kahvi ja sen pisteet on silti kirjoitettu myös C#-koodiin."
        },
        "37-5": {
          perii: ["37-3"],
          miksi: "Testit todistavat, että tuotteita voi muuttaa koskematta koodiin ja että rikkinäinen tiedosto ei kaada peliä.",
          osat: [
            "Kirjoita päiväkirjaan odotettu tulos kolmelle testille ennen kuin testaat.",
            "Testi 1: muuta kahvin points-arvo 10 → 15 ja paina Play. Toimita oikein tilaus, jossa on kahvi. Pisteet ovat tuotteiden summa, jossa kahvi on 15, esimerkiksi Kahvi + Tee = 25.",
            "Testi 2: tyhjennä ProductDatabase-skriptin Products Json -kenttä ja paina Play. Consolessa näkyy virheilmoitus, eikä peli kaadu.",
            "Testi 3: poista products.json-tiedostosta yksi pilkku ja paina Play. Consolessa näkyy virheilmoitus, eikä peli kaadu.",
            "Palauta tiedosto ja kenttä ennalleen. Kirjaa jokaisen testin todellinen tulos päiväkirjaan.",
            "Kirjoita päiväkirjaan omin sanoin, mitä kukin vaihe tekee tiedon kulussa: products.json → ProductDatabase → OrderManager → GameManager → OrderText.",
            "Kirjoita GitHubissa jokaiseen tämän viikon valmiiseen issueen kommentti. Lisää kommenttiin linkki siihen commitiin, jossa työ tehtiin. Sulje issuet vasta sen jälkeen."
          ],
          valmis: "Kaikki kolme testiä menivät odotetusti, ja tulokset ovat päiväkirjassa.",
          tallenna: "Testien tulokset ja tiedon kulku viikon 37 päiväkirjaan.",
          esimerkki: "Testi 1 · odotus: Kahvi + Tee antaa 25 · tulos: antoi 25 · läpäisi.",
          eiRiita: "Tulos testistä, jota et ajanut itse, tai testi, jonka odotettu tulos kirjoitettiin vasta ajon jälkeen."
        }
      }
    },

    38: {
      type: "feature",
      feature: "Kello laskee, pelaaja näkee heti, menikö toimitus oikein, ja kierros päättyy kerran, kun aika loppuu.",
      excerpt: "Pelissä pitää olla aloitusvalikko, itse peli, pistelasku ja pelin päättymisnäkymä.",
      connection: "Viikon 37 tilaus ja toimituksen tarkistus antavat pisteet, mutta peli päättyy vielä ensimmäiseen toimitukseen. Kirjoitat ensin pelisäännöt GDD:n pisteytyksen pohjalta ja lisäät sitten ajastimen, palautteen ja rajatestit, jotta pelaaja voi tehdä päätöksiä ajan ja tuloksen perusteella. Kun kierros kestää ajan loppuun, viikolla 39 kiirettä voi kasvattaa.",
      deliverable: "Kirjatut pelisäännöt sekä toimiva ajastin, pisteet, palaute ja pelin päättyminen.",
      why: "Pelaaja voi tehdä päätöksiä vain, jos peli kertoo tavoitteen, ajan ja toiminnan tuloksen. Rajatestit estävät tuplapisteet ja virheellisen lopetuksen.",
      done: "Peli päättyy kerran, kun aika loppuu. Nopea kaksoispainallus ei anna kahta tulosta, ja uusi peli nollaa ajan sekä pisteet.",
      record: "Kirjoita Vko 38 -merkintään pelisäännöt numeroineen, rajatestien odotetut ja todelliset tulokset sekä commit-linkit.",
      skills: ["C#-pelisäännöt", "TextMeshPro UI", "rajatapaukset"],
      tehtavat: {
        "38-1": {
          perii: ["38-1"],
          miksi: "Kun säännöt on kirjoitettu ennen koodia, tiedät tarkalleen, mitä koodin pitää tehdä ja mitä testaat.",
          osat: [
            "Avaa project-docs/gdd.md. Katso, mitkä pisteet päätit oikealle ja väärälle toimitukselle.",
            "Kirjoita päiväkirjaan sääntö 1: oikea toimitus antaa tuotteiden pisteet yhteensä.",
            "Kirjoita sääntö 2: väärä toimitus vie pois sen määrän pisteitä, jonka päätit pelin suunnitteludokumentissa (GDD).",
            "Kirjoita sääntö 3: kierros kestää __ sekuntia. Käytä asiakkaan kanssa sovittua pituutta. Jos sitä ei ole sovittu, käytä 60 sekuntia ja merkitse asia avoimeksi.",
            "Kirjoita sääntö 4: peli päättyy kerran, kun aika on 0. Kirjoita sääntö 5: voivatko pisteet mennä alle nollan, ja perustele oma päätöksesi yhdellä virkkeellä."
          ],
          valmis: "Päiväkirjassa on viisi numeroitua sääntöä lukuarvoineen.",
          tallenna: "Säännöt viikon 38 päiväkirjaan.",
          esimerkki: "Oikea tilaus: tuotteiden pisteet · väärä −5 · aika 60 s · peli päättyy kerran, kun aika on 0 · pisteet eivät mene alle nollan."
        },
        "38-2": {
          perii: ["38-1"],
          miksi: "Kiire tekee pelistä pelin. Ajastin myös päättää kierroksen, joten pelaaja ei voi pelata loputtomasti.",
          osat: [
            "Lisää GameManageriin avun työpohjan neljä kenttää: timeText, roundSeconds (kierroksen pituus), timeLeft (jäljellä oleva aika) ja isPlaying (onko peli käynnissä).",
            "Raahaa TimeText Inspectorissa GameManager-skriptin Time Text -kenttään ja kirjoita Round Seconds -kenttään säännön 3 kierroksen pituus.",
            "Täydennä StartGame: timeLeft saa kierroksen pituuden ja isPlaying arvon true.",
            "Lisää avun Update-metodi GameManageriin. Se vähentää aikaa Time.deltaTime-arvolla eli edellisestä ruudunpäivityksestä kuluneella ajalla. Täydennä sen TODO: näytä aika TimeText-tekstissä kokonaisina sekunteina.",
            "Kirjoita EndGame-metodin ensimmäiseksi riviksi isPlaying = false, jotta Update ei kutsu EndGamea uudelleen eikä peli pääty kahdesti.",
            "Poista SubmitOrder-metodista viikolla 36 lisätty EndGame-kutsu. Nyt kierros päättyy vasta, kun aika loppuu."
          ],
          valmis: "Play-tilassa aika laskee, pelaaja voi toimittaa monta tilausta ja tulosruutu aukeaa kerran, kun aika on 0.",
          tallenna: "Commit ja push. Commit-linkki viikon 38 päiväkirjaan.",
          sanat: ["Inspector"],
          apu: {
            title: "Ajastin GameManageriin",
            code: "// Lisää nämä GameManager-luokan kenttien joukkoon:\n[SerializeField] private TMP_Text timeText;\n[SerializeField] private float roundSeconds = 60f;\nprivate float timeLeft;\nprivate bool isPlaying;\n\nprivate void Update()\n{\n    if (!isPlaying) return;\n    timeLeft -= Time.deltaTime;\n    // TODO: näytä aika timeText-kentässä: Mathf.CeilToInt(timeLeft)\n    if (timeLeft <= 0f) EndGame();\n}\n\n// Täydennä StartGame:\n// TODO: timeLeft = roundSeconds; isPlaying = true;\n\n// Täydennä EndGame ensimmäiseksi riviksi:\n// TODO: isPlaying = false;",
            vinkit: [
              "Update on Unityn metodi, jota kutsutaan joka ruudunpäivityksellä, noin 60 kertaa sekunnissa.",
              "Time.deltaTime on edellisestä ruudunpäivityksestä kulunut aika sekunteina. Kun vähennät sen joka kerta, aika laskee oikealla nopeudella.",
              "roundSeconds näkyy Inspectorissa. Voit muuttaa kierroksen pituutta testissä koskematta koodiin."
            ],
            test: "Aseta Round Seconds -arvoksi Inspectorissa 3, paina Play ja Aloita. Tulosruutu aukeaa kolmen sekunnin jälkeen. Palauta sitten oma kierroksen pituus.",
            images: [
              ["assets/unity/vko38-game-view.png", "Unityn Game-näkymä: kahvilavuoro käynnissä väliaikaisella grafiikalla. Näkyvissä tilaus, aika, pisteet, Kahvi- ja Toimita-painikkeet sekä palauteteksti.", "Game view: tilaus, aika, pisteet ja palaute riittävät. Grafiikka viimeistellään myöhemmin."]
            ]
          }
        },
        "38-3": {
          perii: ["38-2"],
          miksi: "Pelaaja oppii vain, jos hän näkee heti, menikö toimitus oikein.",
          osat: [
            "Lisää GamePaneliin teksti FeedbackText: UI → Text - TextMeshPro.",
            "Lisää GameManageriin kenttä [SerializeField] private TMP_Text feedbackText; ja raahaa FeedbackText Inspectorissa Feedback Text -kenttään.",
            "Toimitus on oikein, kun CheckDelivery palauttaa enemmän kuin 0. Silloin lisää pisteet ja kirjoita FeedbackText-tekstiin esimerkiksi ”Oikein! +10”.",
            "Kun toimitus on väärin, vähennä pisteitä säännön 2 mukaan, noudata sääntöä 5 (alle nollan vai ei) ja kirjoita esimerkiksi ”Väärä tilaus −5”.",
            "Päivitä ScoreText heti jokaisen toimituksen jälkeen.",
            "Tee toimituksen jälkeen uusi tilaus CreateOrder-metodilla, jotta peli jatkuu, kunnes aika loppuu."
          ],
          valmis: "Oikea ja väärä toimitus näyttävät eri palautteen, ja pisteet muuttuvat sääntöjen mukaan.",
          tallenna: "Kuvakaappaukset molemmista palautteista kansioon project-docs/evidence/week-38/, commit ja push. Polut viikon 38 päiväkirjaan.",
          sanat: ["UI", "Inspector"]
        },
        "38-4": {
          perii: ["38-3"],
          miksi: "Rajatilanne on pelin ääritilanne, kuten aika 0 tai nopea kaksoispainallus. Niissä peli menee helpoimmin rikki. Kun testaat ne nyt, virheet eivät yllätä asiakasta.",
          osat: [
            "Kirjoita päiväkirjaan jokaiselle kolmelle testille odotettu tulos ennen kuin testaat.",
            "Testi 1: aseta Inspectorin Round Seconds -arvoksi 3, paina Play ja Aloita ja odota. Tulosruutu aukeaa vain kerran.",
            "Testi 2: paina Toimita kaksi kertaa nopeasti peräkkäin. Vain ensimmäinen painallus lasketaan.",
            "Testi 3: paina tulosruudulla Pelaa uudelleen. Aika ja pisteet alkavat alusta.",
            "Jos testi ei mennyt odotetusti, korjaa vika, tee commit ja testaa uudelleen. Kirjaa molemmat ajot.",
            "Kirjoita GitHubissa jokaiseen tämän viikon valmiiseen issueen kommentti. Lisää kommenttiin linkki siihen commitiin, jossa työ tehtiin. Sulje issuet vasta sen jälkeen."
          ],
          valmis: "Kolmen rajatestin odotetut ja todelliset tulokset on kirjattu, ja viimeinen ajo meni odotetusti.",
          tallenna: "Testien tulokset ja korjausten commit-linkit viikon 38 päiväkirjaan.",
          sanat: ["rajatilanne"],
          apu: {
            title: "Kaksoispainalluksen esto",
            code: "private float lastSubmitTime = -1f;\n\npublic void SubmitOrder()\n{\n    // Hyväksy uusi toimitus vasta 0,3 sekunnin päästä edellisestä.\n    if (Time.time - lastSubmitTime < 0.3f) return;\n    lastSubmitTime = Time.time;\n    // … muu toimituksen käsittely\n}",
            test: "Paina Toimita nopeasti kahdesti. Palaute ja pisteet muuttuvat vain kerran."
          },
          eiRiita: "Pelivideo yksin ei osoita, että pisteet toimivat rajatilanteissa tai että uusi peli nollaa vanhan tuloksen."
        }
      }
    },

    39: {
      type: "feature",
      feature: "Peli vaikeutuu pisteiden mukaan kolmella tasolla: tilaukset isonevat tai asiakkaat odottavat lyhyemmän ajan.",
      excerpt: "Vaikeustason pitää kasvaa pelin edetessä.",
      connection: "Viikon 38 kello ja pisteet tekevät pelistä kierroksen, mutta kiire pysyy samana alusta loppuun. Toimeksianto vaatii kasvavaa vaikeutta, joten vertaat ensin kahta tapaa ja rakennat valitun tavan tasot yhteen Inspectorissa säädettävään listaan. Kun tasot ovat yhdessä paikassa, niitä voi säätää testien ja palautteen jälkeen koskematta koodiin.",
      deliverable: "Kahden vaikeutustavan vertailu, perusteltu valinta ja kolme vaikeustasoa, joita voi säätää Inspectorissa.",
      why: "Vertailu osoittaa, ettet valinnut ratkaisua sattumalta. Yhdestä paikasta säädettävät arvot helpottavat tasapainotusta ja tekevät muutoksista testattavia.",
      done: "Valinta on perusteltu. Pisteillä 0, 31 ja 61 tilauksen koko tai asiakkaan odotusaika muuttuu tasojen mukaan joka kerta, eikä jokaiselle tasolle tarvita omaa if-lausetta.",
      record: "Kirjoita Vko 39 -merkintään vaihtoehdot A ja B, vertailun kolme kysymystä, keskustelukumppanin rooli, valinta perusteluineen ja raja-arvojen testitulokset commit-linkkeineen. Rastita lopuksi Näyttömatriisi-näkymässä kohdat Toimintalogiikka ja Ratkaisuvaihtoehdot.",
      skills: ["vaihtoehtojen vertailu", "vaikeuskäyrä", "pelitilat"],
      tehtavat: {
        "39-1": {
          perii: ["39-3"],
          miksi: "Kun vertaat kahta tapaa ennen koodaamista, osaat perustella valintasi, eikä ratkaisu jää sattuman varaan.",
          osat: [
            "Lue kaksi tapaa vaikeuttaa peliä: A = tilauksissa on enemmän tuotteita, B = asiakkaalla on vähemmän aikaa.",
            "Pyydä vertainen eli toinen opiskelija tai ohjaaja keskustelemaan kanssasi kymmeneksi minuutiksi.",
            "Arvioikaa kumpikin tapa kolmella kysymyksellä: Huomaako pelaaja vaikeutumisen? Onko arvoja helppo säätää? Onko sitä helppo testata?",
            "Valitse A, B tai molemmat. Kirjoita päiväkirjaan valinta ja kaksi perustelua.",
            "Kirjoita päiväkirjaan keskustelukumppanin rooli, esimerkiksi vertainen tai ohjaaja."
          ],
          valmis: "Päiväkirjassa ovat molemmat tavat, kolmen kysymyksen vastaukset, valinta ja kaksi perustelua.",
          tallenna: "Vertailu ja valinta viikon 39 päiväkirjaan.",
          sanat: ["vertainen"],
          eiRiita: "Tekoälyn valitsema vaikeusmalli ilman omaa vertailua ja keskustelua."
        },
        "39-2": {
          perii: ["39-1"],
          miksi: "Kun tasot ovat yhdessä listassa, voit tasapainottaa peliä muuttamalla lukuja Inspectorissa koskematta koodiin.",
          osat: [
            "Luo skripti DifficultyController avun työpohjasta ja liitä se GameManager-objektiin.",
            "Lisää GameManageriin kenttä [SerializeField] private DifficultyController difficultyController; ja raahaa GameManager-objekti Inspectorissa sen Difficulty Controller -kenttään.",
            "Aseta Inspectorissa Levels-listan kooksi 3. Täytä tasot avun taulukon mukaan tai omien arvojesi mukaan.",
            "Täydennä GetLevel: palauta korkein taso, jonka aloituspisteet pelaaja on jo saavuttanut. Aloituspisteet ovat tason minScore-arvo.",
            "Jos valitsit tavan A: muuta CreateOrder muotoon CreateOrder(int count) ja poista sen Random.Range-arvonta. GameManager antaa sille arvon difficultyController.GetLevel(score).itemCount.",
            "Jos valitsit tavan B: aseta jokaiselle asiakkaalle odotusaika tason customerTime-arvosta. Kun aika loppuu, asiakas lähtee ja tulee uusi tilaus.",
            "Muuta yhden tason arvoa Inspectorissa ja paina Play. Muutos näkyy pelissä ilman koodimuutosta."
          ],
          valmis: "Pisteillä 0, 31 ja 61 peli käyttää eri tasoa, ja tason arvot voi muuttaa Inspectorissa.",
          tallenna: "Commit ja push. Commit-linkki ja tasotaulukko viikon 39 päiväkirjaan.",
          sanat: ["Inspector"],
          apu: {
            title: "DifficultyController-työpohja",
            tree: "GameManager\n└─ DifficultyController\n   └─ Levels (näkyy Inspectorissa)\n      ├─ Level 0: minScore 0,  itemCount 1, customerTime 15\n      ├─ Level 1: minScore 31, itemCount 2, customerTime 12\n      └─ Level 2: minScore 61, itemCount 3, customerTime 10",
            code: "using UnityEngine;\n\n[System.Serializable]\npublic class DifficultyLevel\n{\n    public int minScore;\n    public int itemCount;\n    public float customerTime;\n}\n\npublic class DifficultyController : MonoBehaviour\n{\n    [SerializeField] private DifficultyLevel[] levels;\n\n    public DifficultyLevel GetLevel(int score)\n    {\n        // TODO: käy levels-lista läpi ja palauta viimeinen taso,\n        //       jonka minScore <= score\n        return levels[0];\n    }\n}\n\n// Tapa B: asiakkaan odotusaika GameManageriin\n// private float customerTimeLeft;\n// Kun tilaus tehdään:\n//     customerTimeLeft = difficultyController.GetLevel(score).customerTime;\n// Update-metodissa, kun isPlaying on true:\n//     customerTimeLeft -= Time.deltaTime;\n//     TODO: jos customerTimeLeft <= 0, asiakas lähtee:\n//           näytä palaute ja tee uusi tilaus",
            vinkit: [
              "[System.Serializable] saa Unityn näyttämään DifficultyLevel-luokan kentät Inspectorissa.",
              "Muuta CreateOrder muotoon CreateOrder(int count), jotta GameManager voi antaa tuotemäärän tasolta."
            ],
            test: "Lisää StartGame-metodiin ennen CreateOrder-kutsua väliaikainen rivi score = 31; ja paina Play. Toista arvoilla 0 ja 61. Tilauksen koko vastaa joka kerta taulukkoa. Poista rivi testin jälkeen."
          },
          esimerkki: "0–30 p: 1 tuote / 15 s · 31–60 p: 2 tuotetta / 12 s · 61+ p: 3 tuotetta / 10 s.",
          eiRiita: "Kolme erillistä if-lausetta, joihin luvut on kirjoitettu suoraan koodiin."
        },
        "39-3": {
          perii: ["39-2"],
          miksi: "Valikon, pelin ja tuloksen pitää olla erillisiä tiloja. Muuten aika voi kulua valikossa tai vanha taso jäädä päälle uuteen peliin.",
          osat: [
            "Kirjoita päiväkirjaan odotettu tulos ennen kuin testaat.",
            "Pelaa kolme kierrosta niin, että pääset eri kierroksilla tasoille 0, 1 ja 2 eli Levels-listan kolmelle riville minScore-arvojesi mukaan.",
            "Tarkista joka kierroksella: kun odotat valikossa 10 sekuntia ja painat Aloita, aika alkaa täydestä. Pelissä näkyy vain peliruutu, ja tulosruudulla pisteet eivät enää muutu.",
            "Aloita uusi peli tason 2 jälkeen. Tarkista, että peli alkaa taas tasolta 0.",
            "Kirjaa tulokset päiväkirjaan. Jos jokin ei mennyt odotetusti, korjaa, tee commit ja testaa uudelleen.",
            "Kirjoita GitHubissa jokaiseen tämän viikon valmiiseen issueen kommentti. Lisää kommenttiin linkki siihen commitiin, jossa työ tehtiin. Sulje issuet vasta sen jälkeen."
          ],
          valmis: "Kolmen kierroksen tulokset on kirjattu, ja uusi peli alkaa aina tasolta 0.",
          tallenna: "Testien tulokset ja commit-linkit viikon 39 päiväkirjaan."
        }
      }
    },

    40: {
      type: "feature",
      termit: ["PlayerPrefs"],
      feature: "Pelaaja tallentaa tuloksensa nimimerkillä, ja viisi parasta tulosta näkyy yhä, kun peli avataan uudelleen.",
      excerpt: "Pelaajan parhaat tulokset pitää tallentaa.",
      connection: "Viikon 39 jälkeen kierros päättyy pisteisiin, mutta tulos katoaa, kun peli suljetaan. Nyt tulosruutu saa nimimerkin ja top 5 -listan, jonka SaveService tallentaa PlayerPrefsiin selaimen muistiin, koska toimeksianto vaatii parhaiden tulosten tallentamista. Tämän jälkeen toimeksiannon kaikki vaatimukset toimivat, ja asiakas pelaa koko peliä viikolla 41.",
      deliverable: "Nimimerkki ja Tallenna-painike tulosruudulla, toimiva top 5 -tallennus, nimimerkin tarkistus ja ratkaisun rajoitusten perustelu.",
      why: "Toimeksianto vaatii pysyvän tuloksen. Samalla osoitat, että osaat valita pieneen selainpeliin sopivan tallennustavan ja käsitellä pelaajan syötettä turvallisesti.",
      done: "Kuudesta tuloksesta näkyy vain viisi parasta myös silloin, kun sivu avataan uudelleen. Tasapisteet ja liian pitkä nimimerkki on testattu.",
      record: "Kirjoita Vko 40 -merkintään, miksi tulokset tallennetaan PlayerPrefsiin, missä selain säilyttää ne, mitä ratkaisu ei suojaa ja mitä tietoja peli ei tallenna. Lisää commit-linkit ja kolmen testin tulokset. Rastita lopuksi Näyttömatriisi-näkymässä kohdat Toimintojen toteutus, Tietovaraston valinta, Yhteys tietovarastoon ja Tietoturva.",
      skills: ["PlayerPrefs", "syötteen tarkistus", "tietoturva"],
      tehtavat: {
        "40-1": {
          perii: ["40-1"],
          miksi: "Pelaaja tarvitsee paikan, johon kirjoittaa nimimerkin, ja listan, jossa parhaat tulokset näkyvät.",
          osat: [
            "Lisää ResultPaneliin syöttökenttä: UI → Input Field - TextMeshPro. Nimeä se NicknameInput.",
            "Valitse NicknameInputin alta Text Area → Placeholder ja kirjoita Inspectorin tekstikenttään vihjetekstiksi Nimimerkki.",
            "Lisää ResultPaneliin painike SaveScoreButton tekstillä Tallenna tulos.",
            "Lisää ResultPaneliin teksti HighScoresText, johon tulee viisi parasta tulosta. Siirrä Scene-ikkunassa tulosruudun tekstit, kenttä ja painikkeet erilleen ja tee HighScoresText viiden rivin korkuiseksi."
          ],
          valmis: "Tulosruudulla näkyvät nimimerkkikenttä, Tallenna tulos -painike ja tyhjä tuloslista.",
          tallenna: "Kuvakaappaus tulosruudusta polkuun project-docs/evidence/week-40/tulosruutu.png, commit ja push. Polku viikon 40 päiväkirjaan.",
          sanat: ["UI"],
          apu: {
            title: "Tulosruudun rakenne",
            tree: "ResultPanel\n├─ FinalScoreText\n├─ NicknameInput      (Input Field - TextMeshPro)\n├─ SaveScoreButton\n├─ HighScoresText\n└─ RestartButton",
            images: [
              ["assets/unity/vko40-resultpanel.png", "Unityn Game-näkymä ResultPanelista: lopputulos, nimimerkkikenttä, Tallenna tulos -painike ja viiden parhaan tuloksen lista.", "ResultPanel: nimimerkki, tallennus ja top 5 -lista."]
            ]
          }
        },
        "40-2": {
          perii: ["40-1"],
          miksi: "Toimeksiannon mukaan parhaat tulokset pitää tallentaa. SaveService on ainoa skripti, joka tallentaa ja lataa ne.",
          osat: [
            "Luo skripti SaveService avun työpohjasta ja liitä se uuteen tyhjään objektiin SaveService.",
            "Lue työpohjasta kaksi luokkaa: ScoreEntry on yksi tulos (nimimerkki ja pisteet) ja ScoreList on tulosten lista.",
            "Täydennä SaveScore: lisää uusi tulos listaan ja järjestä lista pisteiden mukaan suurimmasta pienimpään. Poista sitten kuudes tulos ja sitä huonommat.",
            "Etsi SaveScore-metodista valmiit tallennusrivit ja kirjoita päiväkirjaan omin sanoin, mitä JsonUtility.ToJson, PlayerPrefs.SetString ja PlayerPrefs.Save tekevät.",
            "Täydennä LoadScores: lue teksti PlayerPrefs.GetString-metodilla ja muuta se takaisin listaksi. Jos tallennusta ei vielä ole, palauta tyhjä lista."
          ],
          valmis: "SaveScore ja LoadScores on täydennetty, ja päiväkirjassa on omin sanoin selitys tallennusriveistä.",
          tallenna: "Commit ja push. Commit-linkki ja selitys viikon 40 päiväkirjaan.",
          sanat: ["PlayerPrefs", "JSON"],
          apu: {
            title: "SaveService-työpohja",
            code: "using System.Collections.Generic;\nusing UnityEngine;\n\n[System.Serializable]\npublic class ScoreEntry\n{\n    public string nickname;\n    public int score;\n}\n\n[System.Serializable]\npublic class ScoreList\n{\n    public List<ScoreEntry> entries = new List<ScoreEntry>();\n}\n\npublic class SaveService : MonoBehaviour\n{\n    private const string Key = \"HighScores\";\n\n    public ScoreList SaveScore(string nickname, int score)\n    {\n        ScoreList list = LoadScores();\n        // TODO: lisää uusi ScoreEntry listaan\n        // TODO: järjestä vakaasti, jotta tasapisteissä aiempi tulos pysyy edellä (lisää alkuun using System.Linq;):\n        //       list.entries = list.entries.OrderByDescending(e => e.score).ToList();\n        // TODO: poista ylimääräiset, kun listassa on yli 5 riviä\n        PlayerPrefs.SetString(Key, JsonUtility.ToJson(list));\n        PlayerPrefs.Save();\n        return list;\n    }\n\n    public ScoreList LoadScores()\n    {\n        // TODO: jos PlayerPrefs.HasKey(Key) on false, palauta new ScoreList()\n        // TODO: muuta tallennettu teksti takaisin: JsonUtility.FromJson<ScoreList>(…)\n        return new ScoreList();\n    }\n}",
            vinkit: [
              "JsonUtility ei osaa tallentaa pelkkää listaa. Siksi lista on ScoreList-luokan sisällä.",
              "PlayerPrefs.Save() varmistaa, että tieto tallentuu heti myös selainversiossa."
            ],
            test: "Tallenna kuusi eri tulosta Play-tilassa. Lista näyttää viisi parasta suurimmasta pienimpään.",
            images: [
              ["assets/tallennus-top5.svg", "Havainnekuva top 5 -listan tiedon kulusta. Tallennus: GameManager.SaveCurrentScore hakee nimimerkin ja pisteet, SaveService.SaveScore siistii nimimerkin, lisää, järjestää ja jättää enintään viisi tulosta, JsonUtility.ToJson muuttaa listan tekstiksi ja PlayerPrefs.SetString ja Save tallentavat sen avaimella HighScores selaimen muistiin. Lataus: EndGame kutsuu LoadScores-metodia, joka tarkistaa HasKey-metodilla tallennuksen, hakee tekstin PlayerPrefs.GetString-metodilla ja muuttaa sen JsonUtility.FromJson-metodilla takaisin listaksi. ShowHighScores kirjoittaa rivit HighScoresText-tekstiin.", "Havainnekuva, ei kuvakaappaus: SaveScore tallentaa ja LoadScores lataa saman listan avaimella HighScores. Työvaihe 3 kytkee lataamisen tulosruutuun."]
            ]
          }
        },
        "40-3": {
          perii: ["40-1"],
          miksi: "Tallennus on hyödyllinen vasta, kun pelaaja voi tallentaa tuloksen painikkeella ja näkee listan tulosruudulla.",
          osat: [
            "Lisää GameManageriin avun työpohjan kentät nicknameInput, highScoresText ja saveService.",
            "Raahaa Inspectorissa NicknameInput, HighScoresText ja SaveService-objekti GameManager-skriptin kenttiin Nickname Input, High Scores Text ja Save Service.",
            "Lisää GameManageriin avun ShowHighScores-metodi. Se kirjoittaa listan rivit HighScoresText-tekstiin.",
            "Täydennä avun SaveCurrentScore-metodi: se tallentaa nimimerkin ja pisteet SaveServicellä ja näyttää palautetun listan.",
            "Kytke SaveScoreButtonin On Click () -listaan GameManager → SaveCurrentScore.",
            "Täydennä EndGame-metodia: näytä tallennettu lista heti, kun tulosruutu avautuu.",
            "Paina Play ja tallenna kuusi eri tulosta. Tarkista, että lista näyttää viisi parasta suurimmasta pienimpään."
          ],
          valmis: "Tulosruutu näyttää tallennetut tulokset heti, ja kuudesta tuloksesta näkyy viisi parasta oikeassa järjestyksessä.",
          tallenna: "Commit ja push. Kuvakaappaus listasta kansioon project-docs/evidence/week-40/ ja polku viikon 40 päiväkirjaan.",
          sanat: ["Inspector", "metodi"],
          apu: {
            title: "Tulosruudun kytkentä GameManageriin",
            code: "// GameManager-luokan kenttien joukkoon:\n[SerializeField] private TMP_InputField nicknameInput;\n[SerializeField] private TMP_Text highScoresText;\n[SerializeField] private SaveService saveService;\n\npublic void SaveCurrentScore()\n{\n    // TODO: ScoreList list = saveService.SaveScore(nicknameInput.text, score);\n    // TODO: ShowHighScores(list);\n}\n\nprivate void ShowHighScores(ScoreList list)\n{\n    string text = \"\";\n    for (int i = 0; i < list.entries.Count; i++)\n    {\n        text += (i + 1) + \". \" + list.entries[i].nickname + \"  \" + list.entries[i].score + \"\\n\";\n    }\n    highScoresText.text = text;\n}\n\n// Täydennä EndGame ennen ShowOnly(resultPanel) -riviä:\n// TODO: ShowHighScores(saveService.LoadScores());",
            vinkit: [
              "Painikkeen On Click () -lista ei osaa antaa metodille nimimerkkiä ja pisteitä. Siksi SaveCurrentScore hakee ne itse eikä ota parametreja.",
              "`\\n` tekstin sisällä tarkoittaa rivinvaihtoa. Jokainen tulos tulee omalle rivilleen."
            ],
            test: "Tallenna kaksi tulosta ja paina Pelaa uudelleen. Kun kierros loppuu, tulosruutu näyttää molemmat heti."
          }
        },
        "40-4": {
          perii: ["40-3"],
          miksi: "Pelaaja voi kirjoittaa kenttään mitä tahansa. Tarkistus estää tyhjät ja liian pitkät nimet, eikä peli pyydä henkilötietoja.",
          osat: [
            "Päätä nimimerkin enimmäispituus, esimerkiksi 12 merkkiä. Kirjaa päätös päiväkirjaan.",
            "Lisää avun CleanNickname-metodi SaveService-skriptiin ja kutsu sitä SaveScore-metodin ensimmäisellä rivillä. Metodi poistaa jo valmiiksi välilyönnit alusta ja lopusta (Trim).",
            "Jos nimimerkki on tyhjä, käytä nimeä Nimetön.",
            "Jos nimimerkki on liian pitkä, lyhennä se sallittuun pituuteen.",
            "Aseta NicknameInput-kentän Character Limit -arvoksi sama enimmäispituus.",
            "Kirjaa päiväkirjaan, mitä peli tallentaa (nimimerkki ja pisteet) ja mitä se ei tallenna (oikea nimi, salasanat tai muut henkilötiedot)."
          ],
          valmis: "Tyhjä nimi tallentuu nimellä Nimetön, ja liian pitkä nimi lyhenee sallittuun pituuteen.",
          tallenna: "Commit ja push. Päätökset ja commit-linkki viikon 40 päiväkirjaan.",
          apu: {
            title: "Nimimerkin tarkistus",
            code: "private const int MaxLength = 12;\n\nprivate string CleanNickname(string raw)\n{\n    string name = (raw ?? \"\").Trim();\n    // TODO: jos name on tyhjä, palauta \"Nimetön\"\n    // TODO: jos name.Length > MaxLength, palauta name.Substring(0, MaxLength)\n    return name;\n}",
            test: "Kirjoita kenttään pelkkiä välilyöntejä ja tallenna. Listaan tulee Nimetön."
          },
          eiRiita: "Tallennus toimii, mutta syötettä ei tarkisteta. Älä syötä tekoälylle salasanoja, avaimia tai henkilötietoja."
        },
        "40-5": {
          perii: ["40-2"],
          miksi: "Tallennus toimii oikeasti vasta, kun tulokset säilyvät selainversiossa sivun sulkemisen jälkeen.",
          osat: [
            "Kirjoita päiväkirjaan odotettu tulos kolmelle testille ennen kuin testaat.",
            "Testi 1: tallenna kuusi eri tulosta. Vain viisi parasta näkyy.",
            "Testi 2: tallenna kaksi yhtä suurta tulosta. Tarkista, että järjestys noudattaa asiakkaan kanssa sovittua sääntöä. Jos sääntöä ei ole sovittu, aiempi tulos on ylempänä, ja asia on avoin.",
            "Testi 3: kopioi pelin osoite, sulje välilehti ja avaa sama osoite uudelleen samassa selaimessa ilman uutta buildia. Sama lista näkyy.",
            "Kirjoita päiväkirjan Miksi tein näin? -kenttään, miksi PlayerPrefs sopii tähän peliin. Kirjoita myös, että tiedot säilyvät vain tässä selaimessa ja että pelaaja voi itse muuttaa tai poistaa ne.",
            "Kirjoita GitHubissa jokaiseen tämän viikon valmiiseen issueen kommentti. Lisää kommenttiin linkki siihen commitiin, jossa työ tehtiin. Sulje issuet vasta sen jälkeen."
          ],
          valmis: "Kolmen testin tulokset ja ratkaisun perustelu ovat päiväkirjassa.",
          tallenna: "Testitulokset, perustelu ja commit-linkit viikon 40 päiväkirjaan.",
          esimerkki: "ScoreList → JsonUtility.ToJson → PlayerPrefs.SetString(\"HighScores\", json) → sivu suljetaan ja avataan → sama top 5 näkyy.",
          eiRiita: "Testaus pelkästään Unity-editorissa. Editorissa näkyvä arvo ei todista, että tulokset säilyvät selaimessa."
        }
      }
    },

    41: {
      type: "katselmointi",
      termit: ["katselmointi"],
      feature: "Asiakas pelaa pelin alusta loppuun, ja yhdessä sovitaan yksi rajattu muutos GitHub-issueksi.",
      excerpt: "Haluan nähdä pelistä toimivan version vähintään kerran ennen lopullista versiota, jotta voin pyytää muutoksia.",
      connection: "Viikoilla 36–40 rakensit toimeksiannon kaikki vaatimukset, ja nyt asiakas kokeilee niitä ensimmäistä kertaa omin käsin. Tarkkailet neuvomatta, missä tilaus, tuotteiden valinta tai palaute jää epäselväksi, ja erotat asiakkaan sanat omasta tulkinnastasi. Sovittu muutos tehdään syysloman jälkeen viikolla 43.",
      deliverable: "Asiakkaan kokeilema selainversio, katselmointimuistio ja yksi sovittu muutosissue GitHubissa.",
      why: "Palaute tarvitaan ennen viimeistelyä, jotta muutokselle jää aikaa. Kun erotat asiakkaan omat sanat omasta tulkinnastasi, päätös on luotettava.",
      done: "Asiakas on pelannut pelin alusta loppuun. Muistiossa näkyvät asiakkaan sanat, oma tulkinta, päätös, hyväksyjä ja yksi rajattu issue.",
      record: "Kirjoita Vko 41 -merkintään version tunniste, katselmoinnin päivä, osallistujien roolit, asiakkaan sanat, oma tulkinta ja linkki sovittuun muutosissueen. Rastita lopuksi Näyttömatriisi-näkymässä kohdat Asiakaslähtöinen viestintä, Priorisointi ja Suunnittelu ja arviointi.",
      skills: ["asiakasviestintä", "katselmointi", "priorisointi"],
      tehtavat: {
        "41-1": {
          perii: ["41-1"],
          miksi: "Asiakas voi antaa hyvää palautetta vain versiosta, joka toimii alusta loppuun.",
          osat: [
            "Käy läpi tarkistuslista. Tarkista, että valikko, 1–3 tuotteen tilaus, toimitus, pisteet, ajastin, vaikeus, tulosruutu ja tallennus toimivat.",
            "Tee selainversio (Build And Run) ja pelaa se kerran itse alusta loppuun.",
            "Kirjoita muistiin version tunniste: päivämäärä ja viimeisimmän commitin tunniste.",
            "Sovi ohjaajan kanssa katselmoinnin aika. Katselmointi on tapaaminen, jossa asiakas kokeilee keskeneräistä peliä ja antaa palautetta.",
            "Valmistele viiden minuutin esittely: mitä peli tekee, mikä on valmista ja mikä vielä puuttuu."
          ],
          valmis: "Selainversio toimii alusta loppuun, ja katselmoinnin aika on sovittu.",
          tallenna: "Version tunniste ja tarkistuslistan tulos viikon 41 päiväkirjaan.",
          sanat: ["katselmointi"]
        },
        "41-2": {
          perii: ["41-2"],
          miksi: "Kun katsot vierestä neuvomatta, näet, missä kohdissa peli on vielä epäselvä.",
          osat: [
            "Pyydä asiakasta pelaamaan peli alusta loppuun. Älä neuvo, ellei hän pyydä apua.",
            "Kirjoita ylös asiakkaan sanat sellaisinaan, esimerkiksi ”En huomannut tilausta”.",
            "Kirjoita erikseen, mitä itse näit: missä asiakas epäröi tai painoi väärää painiketta.",
            "Selitä yksi tekninen ratkaisu arkikielellä, esimerkiksi miten tulokset tallentuvat. Kirjaa, ymmärsikö asiakas.",
            "Kysy lopuksi: mikä yksi asia pitäisi muuttaa ensin?"
          ],
          valmis: "Muistiinpanoissa ovat asiakkaan sanat ja omat havaintosi erikseen.",
          tallenna: "Muistiinpanot viikon 41 päiväkirjaan.",
          eiRiita: "Itse tai tekoälyllä keksitty asiakaspalaute ei ole katselmointi."
        },
        "41-3": {
          perii: ["41-2", "41-3"],
          miksi: "Yksi selvästi rajattu muutos ehditään tehdä kunnolla. Monta epämääräistä toivetta jää kesken.",
          osat: [
            "Valitse palautteesta yhdessä asiakkaan kanssa yksi muutos, jonka ehdit tehdä viikolla 43.",
            "Tee muutoksesta GitHub-issue: otsikko verbillä, asiakkaan alkuperäinen palaute, arvio ja Valmis kun -ehto.",
            "Jos asiakas pitää muutosta välttämättömänä, se on pakollinen (P0): anna label P0 pakollinen. Muuten se on tärkeä (P1): anna label P1 tärkeä.",
            "Pyydä asiakkaalta hyväksyntä issuelle. Kirjaa hyväksyjän rooli ja päivä.",
            "Vertaa kolmen viikolla 35 tehdyn issuen arviota siihen, kauanko työ oikeasti kesti. Kirjaa ero ja sen syy päiväkirjaan.",
            "Kirjoita katselmointimuistio päiväkirjaan: päivä, osallistujien roolit, asiakkaan sanat, oma tulkinta ja päätös."
          ],
          valmis: "GitHubissa on yksi hyväksytty muutosissue, ja katselmointimuistio on päiväkirjassa.",
          tallenna: "Issuen linkki ja katselmointimuistio viikon 41 päiväkirjaan.",
          sanat: ["GitHub-issue", "P0", "P1"],
          esimerkki: "Palaute: ”Tilausta ei huomaa.” Päätös: suurennetaan tilauskortti · P0 pakollinen · 0,5 päivää · hyväksytty 9.10."
        }
      }
    },

    43: {
      type: "feature",
      termit: ["branch", "pull request"],
      feature: "Asiakkaan pyytämä muutos on pelattavana, ja vanha pelipolku toimii edelleen.",
      excerpt: "Haluan myös nähdä pelistä toimivan version vähintään kerran ennen lopullista versiota, jotta voin pyytää muutoksia.",
      connection: "Viikon 41 katselmoinnissa asiakas valitsi yhden muutoksen, ja nyt toteutat sen omassa Git-haarassa. Haara pitää toimivan main-version turvassa, ja pull request näyttää ketjun palautteesta issueen, koodiin ja testiin. Kun muutos on yhdistetty, viikolla 44 uusi pelaaja kokeilee peliä ilman neuvoja.",
      deliverable: "Asiakaspalautteeseen jäljitettävä, katselmoitu ja testattu muutos omassa Git-haarassa.",
      why: "Oma haara pitää toimivan pääversion turvassa ja näyttää, miten palaute muuttui issueksi, koodiksi, testiksi ja hyväksytyksi muutokseksi.",
      done: "Muutos täyttää Valmis kun -ehdon, vanha pelipolku toimii, katselmointikommenttiin on vastattu ja muutos on yhdistetty main-haaraan.",
      record: "Kirjoita Vko 43 -merkintään ketju: asiakaspalaute → GitHub-issue → haara → pull request → commit → hyväksymistesti. Lisää jokaisesta linkki. Rastita lopuksi Näyttömatriisi-näkymässä kohdan Osan liittäminen.",
      skills: ["GitHub-issue", "Git-haara", "katselmointi"],
      tehtavat: {
        "43-1": {
          perii: ["43-1"],
          miksi: "Kun muutos on pieni ja testi on kirjoitettu etukäteen, tiedät, milloin muutos on valmis.",
          osat: [
            "Avaa viikolla 41 tekemäsi muutosissue GitHubissa ja lue asiakkaan alkuperäinen palaute.",
            "Arvioi, onko muutos enintään yhden päivän työ. Jos se on isompi, jaa se kahdeksi issueksi.",
            "Kirjoita issueen hyväksymistesti: mitä asiakas tekee ja mitä hän näkee, kun muutos on valmis.",
            "Kirjoita issueen myös vanhan pelipolun testi: Aloita → toimita tilaus → tulosruutu toimii kuten ennen."
          ],
          valmis: "Issuessa ovat arvio, hyväksymistesti ja vanhan pelipolun testi.",
          tallenna: "Issuen linkki viikon 43 päiväkirjaan.",
          sanat: ["GitHub-issue"],
          esimerkki: "Issue: Suurenna tilauskortti · 0,5 päivää · Hyväksymistesti: uusi pelaaja löytää tilauksen viidessä sekunnissa."
        },
        "43-2": {
          perii: ["43-2"],
          miksi: "Kun teet muutoksen omassa haarassa, toimiva pääversio pysyy ehjänä, vaikka muutos menisi pieleen.",
          osat: [
            "Varmista ensin, että main-haara eli pääversio toimii: pelaa yksi kierros.",
            "Luo uusi haara eli branch: valitse GitHub Desktopissa Current Branch → New Branch. Anna nimeksi esimerkiksi feature/suurempi-tilaus.",
            "Tee muutos pienissä osissa. Tee commit aina, kun yksi osa toimii.",
            "Testaa jokaisen commitin jälkeen, että tilaus, toimitus ja pisteet toimivat edelleen.",
            "Tee push, jolloin haara näkyy GitHubissa. Uuden haaran ensimmäisessä pushissa GitHub Desktopin painike on nimeltään Publish branch."
          ],
          valmis: "Haara näkyy GitHubissa, ja siinä on vähintään kaksi pientä committia.",
          tallenna: "Haaran nimi ja commit-linkit viikon 43 päiväkirjaan.",
          sanat: ["branch", "commit", "push"],
          eiRiita: "Yksi suuri commit suoraan main-haaraan katkaisee yhteyden palautteen, muutoksen ja testin välillä."
        },
        "43-3": {
          perii: ["43-3"],
          miksi: "Pull requestissa toinen ihminen voi katsoa muutoksen ennen kuin se siirtyy pääversioon.",
          osat: [
            "Avaa repository GitHubissa ja paina Compare & pull request. Jos painiketta ei näy, valitse Pull requests → New pull request ja vertailtavaksi oma haarasi. Pull request on pyyntö yhdistää oma haara main-haaraan.",
            "Kirjoita pull requestiin, mitä muutit ja miten testasit. Lisää rivi Closes #numero, jossa numero on muutosissuen numero. Se sulkee issuen, kun pull request yhdistetään.",
            "Pyydä ohjaajaa tai vertaista kommentoimaan. Vastaa jokaiseen kommenttiin tai korjaa koodi samaan haaraan ja tee push: korjaus näkyy pull requestissa itsestään.",
            "Aja hyväksymistesti ja vanhan pelipolun testi vielä kerran.",
            "Paina Merge pull request ja Confirm merge, jolloin muutos siirtyy main-haaraan. Vaihda sitten GitHub Desktopissa haaraksi main ja paina Fetch origin ja Pull origin, jotta koneesi main on ajan tasalla.",
            "Kirjaa päiväkirjaan ketju: palaute → issue → haara → pull request → commit → testi. Lisää jokaisesta linkki."
          ],
          valmis: "Pull request on yhdistetty, siinä on kommentti ja vastaus, ja molemmat testit menivät odotetusti.",
          tallenna: "Pull requestin linkki ja koko ketju viikon 43 päiväkirjaan.",
          sanat: ["pull request"]
        }
      }
    },

    44: {
      type: "feature",
      feature: "Uusi pelaaja ymmärtää tavoitteen ja pelaa kierroksen ilman, että kukaan neuvoo vieressä.",
      excerpt: "Lopullinen peli pitää julkaista niin, että voin itse kokeilla sitä.",
      connection: "Asiakkaan muutos on nyt pelissä, mutta et itse enää huomaa, mikä pelissä on epäselvää. Vertaat peliä viikon 35 luonnokseen ja katsot, miten uusi pelaaja selviää ilman neuvoja, koska julkaistu peli ei saa vaatia tekijää vieressä. Kaksi korjausta ja uusintatesti vievät pelin viikon 45 järjestelmälliseen testaukseen.",
      deliverable: "Vertailu luonnokseen, lyhyt käytettävyystesti, kaksi perusteltua korjausta ja uusintatesti.",
      why: "Julkaistu peli ei saa vaatia tekijää neuvomaan vieressä. Kun katsot uutta pelaajaa, näet epäselvyydet, joita et enää itse huomaa.",
      done: "Uusi pelaaja ymmärtää tavoitteen ja pelaa yhden tilauksen loppuun ilman neuvoja. Kahdesta korjauksesta on kuvat ennen korjausta ja sen jälkeen.",
      record: "Kirjoita Vko 44 -merkintään annettu pelitehtävä, havainnot, kaksi korjausta ja uusintatestin tulos. Lisää ennen/jälkeen-kuvat ja commit-linkki. Rastita lopuksi Näyttömatriisi-näkymässä kohdan Käyttöliittymä.",
      skills: ["Unity UI", "palaute pelaajalle", "käyttäjätesti"],
      resources: [
        ["Kenney.nl – käyttöliittymäpaketit ja ikonit (CC0)", "https://kenney.nl/assets", false],
        ["Game-icons.net – tuhansia ikoneita (CC BY, mainitse tekijä)", "https://game-icons.net/", false]
      ],
      tehtavat: {
        "44-1": {
          perii: ["44-1"],
          miksi: "Luonnos kertoo, mitä suunnittelit. Kun vertaat, huomaat, mitä muutit matkan varrella ja miksi.",
          osat: [
            "Avaa viikon 35 luonnos project-docs/evidence/week-35/mockup.png.",
            "Ota kuvakaappaus pelisi valikosta, peliruudusta ja tulosruudusta.",
            "Kirjoita jokaisesta ruudusta, mikä on erilaista kuin luonnoksessa.",
            "Kirjoita jokaisen eron perään, miksi muutit sen, tai merkitse se korjattavaksi."
          ],
          valmis: "Jokaisesta kolmesta ruudusta on kirjattu erot ja niiden syyt.",
          tallenna: "Kuvakaappaukset kansioon project-docs/evidence/week-44/, commit ja push. Vertailu viikon 44 päiväkirjaan."
        },
        "44-2": {
          perii: ["44-3"],
          miksi: "Et itse enää huomaa, mikä pelissä on epäselvää. Uusi pelaaja huomaa sen heti.",
          osat: [
            "Pyydä kokeilijaksi vertainen, joka ei ole pelannut peliäsi.",
            "Anna hänelle yksi tehtävä: ”Aloita peli, toimita yksi tilaus ja katso tuloksesi.” Älä neuvo.",
            "Kirjaa havainnot: missä hän epäröi, mitä hän painoi väärin ja mitä hän kysyi.",
            "Mittaa, kauanko aloituksesta kestää ensimmäiseen oikeaan toimitukseen."
          ],
          valmis: "Päiväkirjassa ovat testaajan rooli ja päivä, annettu tehtävä, havainnot ja aika ensimmäiseen toimitukseen.",
          tallenna: "Havainnot viikon 44 päiväkirjaan.",
          sanat: ["vertainen"],
          eiRiita: "Oma mielipide ”käyttöliittymä näyttää hyvältä” ei ole käytettävyystesti eli testi, jossa uusi käyttäjä kokeilee peliä ja sinä havainnoit."
        },
        "44-3": {
          perii: ["44-2"],
          miksi: "Kun korjaat havaitun ongelman ja testaat uudelleen, näet, auttoiko korjaus oikeasti.",
          osat: [
            "Valitse havainnoista kaksi, jotka haittasivat pelaamista eniten.",
            "Ota kuvakaappaus molemmista kohdista ennen muutosta.",
            "Tee korjaukset, esimerkiksi isompi teksti, selkeämpi painike tai lyhyt ohjeteksti.",
            "Ota kuvakaappaus molemmista kohdista muutoksen jälkeen. Tee commit ja push.",
            "Anna sama tehtävä toiselle uudelle pelaajalle ja kirjaa, auttoivatko korjaukset.",
            "Kirjoita GitHubissa jokaiseen tämän viikon valmiiseen issueen kommentti. Lisää kommenttiin linkki siihen commitiin, jossa työ tehtiin. Sulje issuet vasta sen jälkeen."
          ],
          valmis: "Kahdesta korjauksesta on kuvat ennen korjausta ja sen jälkeen, ja uusintatestin tulos on kirjattu.",
          tallenna: "Ennen/jälkeen-kuvat kansioon project-docs/evidence/week-44/. Uusintatestin tulos ja commit-linkki viikon 44 päiväkirjaan.",
          esimerkki: "Havainto: pelaaja ei löytänyt Aloita-painiketta → painike suuremmaksi ja keskelle → uusintatestissä löytyi heti.",
          eiRiita: "Pelkkä värinvaihto, joka ei ratkaise havaittua ongelmaa."
        }
      }
    },

    45: {
      type: "laatu",
      termit: ["T01"],
      feature: "Pelin koko kierros on testattu 12 testitapauksella, ja kolme virhettä on korjattu ketjuna uusintatesteineen.",
      excerpt: "Pelissä pitää olla aloitusvalikko, itse peli, pistelasku ja pelin päättymisnäkymä.",
      connection: "Tähän asti olet testannut kunkin viikon uuden toiminnon erikseen. Nyt kirjoitat 12 testitapausta koko pelille ennen ajoa ja ajat ne selainversiolla, koska järjestelmällinen testaus näyttää, kestääkö peli rajatilanteet ja rikkinäiset tiedostot. Testaustaulukon tapauksia käytät viikon 46 refaktoroinnissa ja julkaisun korjauksissa.",
      deliverable: "Vähintään 12 testitapauksen testaustaulukko ja kolme täydellistä virheenkorjausketjua.",
      why: "Järjestelmällinen testaus näyttää, että peli toimii myös rajoilla ja virhetilanteissa. Korjausketju todistaa, että osaat löytää syyn etkä vain peitä oiretta.",
      done: "Kaikissa 12 testitapauksessa näkyvät lähtötila, toiminta, odotettu tulos, todellinen tulos ja läpäisy. Kolmessa ketjussa näkyvät havainto, syy, korjauscommit ja onnistunut uusintatesti.",
      record: "Kirjoita Vko 45 -merkintään testitapaukset T01–T12 ja linkki testaustaulukkoon. Nimeä kolme ketjua muodossa havainto → syy → commit → uusintatesti. Rastita lopuksi Näyttömatriisi-näkymässä kohdat Toimintojen testaus, Virheenkorjaus ja Suunnittelu, toteutus ja testaus kirjastolla.",
      skills: ["testitapaus", "virheenkorjaus", "uusintatesti"],
      resources: [
        ["Avaa näyttöaineisto", "#view-naytto", false]
      ],
      tehtavat: {
        "45-1": {
          perii: ["45-1"],
          miksi: "Kun kirjoitat odotetun tuloksen ennen testiä, et voi jälkikäteen muuttaa mieltäsi siitä, mikä oli oikein.",
          osat: [
            "Luo tiedosto project-docs/testaus.md avun taulukkopohjasta.",
            "Numeroi testitapaukset T01, T02, T03 ja niin edelleen. T tarkoittaa testitapausta ja numero sen järjestystä. Tunnuksella viittaat testiin myöhemmin.",
            "Kirjoita neljä testitapausta tavalliselle pelaamiselle: aloitus, oikea toimitus, väärä toimitus ja uusi peli.",
            "Kirjoita neljä testitapausta rajatilanteille: aika 0, kaksoispainallus, tyhjä nimimerkki ja liian pitkä nimimerkki.",
            "Kirjoita neljä testitapausta datalle eli tiedostoille ja tallennukselle: puuttuva products.json, rikkinäinen products.json, tyhjä tallennus ja kuudes tulos top 5 -listaan.",
            "Täytä jokaiseen testitapaukseen sarakkeet Lähtötila, Mitä teen ja Odotettu tulos ennen kuin ajat yhtään testiä. Käytä omia arvojasi: kierroksen pituus, väärän toimituksen pisteet ja nimimerkin enimmäispituus."
          ],
          valmis: "Tiedostossa on 12 testitapausta T01–T12, ja jokaisella on odotettu tulos.",
          tallenna: "project-docs/testaus.md, commit ja push.",
          sanat: ["T01"],
          apu: {
            title: "Testaustaulukon pohja",
            code: "| Tunnus | Lähtötila | Mitä teen | Odotettu tulos | Mitä tapahtui | Läpäisi |\n|---|---|---|---|---|---|\n| T01 | Peli auki, valikko näkyy | Painan Aloita | Peliruutu ja tilaus näkyvät | | |\n| T02 | | | | | |",
            test: "Lue yksi testitapaus toiselle ihmiselle. Hän osaa ajaa testin pelkän rivin perusteella."
          }
        },
        "45-2": {
          perii: ["45-1", "45-3"],
          miksi: "Vain itse ajettu testi kertoo, toimiiko peli. Selainversio paljastaa virheet, joita editori ei näytä.",
          osat: [
            "Tee selainversio (Build And Run) ja kirjaa version tunniste testaustaulukon alkuun.",
            "Aloita puhtaasta tilanteesta: avaa peli yksityisessä selainikkunassa, jolloin vanhat tulokset eivät ole mukana.",
            "Aja testitapaukset T01–T12 järjestyksessä. Kirjaa jokaisesta, mitä tapahtui ja läpäisikö testi.",
            "Tyhjennä datatestejä varten Products Json -kenttä tai poista products.json-tiedostosta pilkku. Tee uusi selainversio ja palauta kenttä tai tiedosto testin jälkeen.",
            "Älä merkitse testiä läpäistyksi, jos et ajanut sitä itse."
          ],
          valmis: "Jokaisella testitapauksella T01–T12 on todellinen tulos ja merkintä, läpäisikö se.",
          tallenna: "Päivitetty project-docs/testaus.md, commit ja push.",
          sanat: ["T01"],
          eiRiita: "Tekoälyn ehdottamaa testitapausta ei saa merkitä ajetuksi eikä virhettä löydetyksi ilman omaa testiajoa."
        },
        "45-3": {
          perii: ["45-2"],
          miksi: "Kun kirjaat koko ketjun, näytät, että osaat löytää virheen syyn etkä vain peitä oiretta.",
          osat: [
            "Valitse kolme testitapausta, jotka eivät läpäisseet. Jos aitoja virheitä ei ole kolmea, pyydä ohjaajalta vikatehtävä eli ohjaajan valmistelema virhe, jonka etsit ja korjaat.",
            "Kirjaa jokaisesta, miten virhe toistetaan, mikä oli odotettu tulos ja mitä tapahtui.",
            "Etsi syy ennen kuin korjaat. Kirjoita syy yhdellä virkkeellä.",
            "Korjaa ja tee commit, jonka viestissä on testitapauksen tunnus. Esimerkiksi: ”Korjaa testitapaus T05, tulosruutu aukeaa vain kerran.”",
            "Aja sama testitapaus uudelleen. Aja myös regressiotesti eli toinen testitapaus, joka käyttää samaa koodia: se näyttää, ettei korjaus rikkonut muuta.",
            "Kirjaa jokainen ketju päiväkirjaan: havainto → toistamisohje → syy → korjauscommit → uusintatesti → regressiotesti."
          ],
          valmis: "Päiväkirjassa on kolme täydellistä ketjua, ja jokaisen uusintatesti meni odotetusti.",
          tallenna: "Kolme ketjua commit-linkkeineen viikon 45 päiväkirjaan.",
          sanat: ["T01", "regressiotesti"],
          esimerkki: "Testitapaus T05 · aika 0 · odotus: tulos näkyy kerran · havainto: näkyi kahdesti · syy: EndGame kutsuttiin kahdesti · korjauscommit [linkki] · uusintatesti läpäisi."
        }
      }
    },

    46: {
      type: "laatu",
      termit: ["refaktorointi"],
      feature: "Yksi vaikeasti luettava koodikohta on selkeytetty, peli toimii kuten ennen, ja osaat selittää ratkaisusi.",
      excerpt: "Tuotteiden tiedot eivät saa olla kovakoodattuna pelilogiikkaan, vaan niiden pitää tulla erillisestä tietolähteestä.",
      connection: "Viikon 45 testaustaulukko antaa testitapauksen, jolla näet, toimiiko peli refaktoroinnin jälkeen kuten ennen. Selkeytät yhden koodikohdan, esimerkiksi pitkän metodin tai epäselvän nimen, ja pyydät toisen ihmisen katselmoimaan sen, koska selkeä koodi helpottaa julkaisua edeltäviä korjauksia. Samalla harjoittelet ratkaisun selittämistä, jota tarvitset näytössä viikolla 49.",
      deliverable: "Yksi rajattu refaktorointi, sama testi ennen ja jälkeen, ihmisen tekemä koodikatselmointi ja yhden ratkaisun suullinen selitys.",
      why: "Selkeät nimet ja rajatut tehtävät helpottavat virheiden löytämistä ja myöhempiä muutoksia. Testi varmistaa, ettei rakenteen parantaminen muuta pelin toimintaa.",
      done: "Sama testitapaus läpäisee ennen ja jälkeen refaktoroinnin. Katselmointikommenttiin on vastattu, ja osaat selittää ratkaisusi ilman tekoälyä.",
      record: "Kirjoita Vko 46 -merkintään valittu kohta ja sen ongelma, muutos ennen ja jälkeen, testitapauksen tunnus, katselmoijan rooli, saatu kommentti ja oma vastaus. Lisää commit-linkki. Rastita lopuksi Näyttömatriisi-näkymässä kohdat Rakenteinen ohjelmointi, Ylläpidettävä koodi ja Ratkaisujen arviointi.",
      skills: ["C#-ylläpidettävyys", "refaktorointi", "koodikatselmointi"],
      tehtavat: {
        "46-1": {
          perii: ["46-1"],
          miksi: "Kun tiedät, mikä koodissa on vaikeaa, voit korjata juuri sen etkä muuta koodia turhaan.",
          osat: [
            "Avaa C#-skriptit ja etsi yksi näistä: sama koodi kahdessa paikassa, nimi, joka ei kerro tehtäväänsä (esimerkiksi a tai temp) tai yli 30 rivin metodi.",
            "Etsi myös skripti, joka tekee monta eri asiaa, esimerkiksi laskee pisteet ja päivittää tekstit.",
            "Valitse näistä yksi kohta. Kirjoita päiväkirjaan, mikä kohdassa on vaikeaa ja miksi.",
            "Valitse testaustaulukosta testitapaus, joka kulkee tämän koodin kautta. Kirjaa testitapauksen tunnus, esimerkiksi T03."
          ],
          valmis: "Päiväkirjassa on yksi valittu kohta, sen ongelma ja siihen liittyvä testitapaus.",
          tallenna: "Kuvaus ja testitapauksen tunnus viikon 46 päiväkirjaan.",
          sanat: ["T01"]
        },
        "46-2": {
          perii: ["46-1"],
          miksi: "Refaktorointi eli koodin rakenteen selkeyttäminen on onnistunut vain, jos peli toimii täsmälleen kuten ennen.",
          osat: [
            "Aja valitsemasi testitapaus ennen muutosta ja kirjaa tulos.",
            "Tee yksi rajattu muutos, esimerkiksi anna metodille kuvaava nimi tai siirrä toistuva koodi omaan metodiinsa.",
            "Aja sama testitapaus muutoksen jälkeen. Tuloksen pitää olla sama kuin ennen.",
            "Tee commit, jonka viesti kertoo muutoksen, esimerkiksi ”Selkeytä pisteiden laskua: CalculateOrderScore”."
          ],
          valmis: "Sama testitapaus läpäisee ennen ja jälkeen muutoksen, ja muutos on yhdessä commitissa.",
          tallenna: "Commit-linkki sekä ennen- ja jälkeen-tulokset viikon 46 päiväkirjaan.",
          sanat: ["refaktorointi", "T01"],
          esimerkki: "Ennen: a() laskee pisteet. Jälkeen: CalculateOrderScore() kertoo nimellään, mitä pelin sääntöä se toteuttaa.",
          eiRiita: "Pelkkä automaattinen muotoilu tai koko tiedoston kirjoittaminen uudelleen tekoälyllä."
        },
        "46-3": {
          perii: ["46-2", "46-3"],
          miksi: "Toinen ihminen huomaa koodista asioita, joita et itse enää näe. Näytössä sinun pitää osata selittää koodisi itse, myös ne kohdat, joissa käytit tekoälyä.",
          osat: [
            "Pyydä ohjaajaa tai vertaista lukemaan muuttamasi koodi. Koodikatselmointi tarkoittaa, että toinen ihminen lukee koodin ja kommentoi sitä.",
            "Näytä hänelle koodi ennen ja jälkeen muutoksen, esimerkiksi GitHubin commit-näkymästä. Kirjaa saamasi kommentti sellaisenaan.",
            "Vastaa kommenttiin: korjaa koodia tai perustele, miksi pidät ratkaisun.",
            "Selitä samalla tapaamisella suullisesti yksi kohta, jossa käytit tekoälyä apuna. Jos et käyttänyt tekoälyä, selitä avun työpohjasta otettu kohta.",
            "Tarkista, että tekoälyn käyttö on kirjattu AI-lokiin eli sivuston AI-loki-näkymään, johon kirjaat tekoälyn avun."
          ],
          valmis: "Päiväkirjassa ovat katselmoijan rooli, hänen kommenttinsa, oma vastauksesi ja se, minkä kohdan selitit suullisesti.",
          tallenna: "Kommentti, vastaus ja selitetty kohta viikon 46 päiväkirjaan. Tekoälyn käyttö AI-lokiin.",
          sanat: ["katselmointi"]
        }
      }
    },

    47: {
      type: "julkaisu",
      termit: ["RC", "tagi"],
      feature: "Julkaisuehdokas RC1 on merkitty tagilla, ja asiakas ja toinen testaaja ovat pelanneet sen.",
      excerpt: "Lopullinen peli pitää julkaista niin, että voin itse kokeilla sitä.",
      connection: "Peli on nyt testattu ja selkeytetty, joten jäädytät ominaisuudet: peliin ei enää lisätä uutta, vaan vain virheitä korjataan. Merkitset ensimmäisen julkaisuehdokkaan (RC1) tagilla, ja asiakas ja toinen ihminen testaavat sen, koska kaksi testaajaa löytää eri virheitä. Luokittelemasi havainnot päättävät, mitä viikolla 48 korjataan ennen julkaisua.",
      deliverable: "Tagilla merkitty ensimmäinen julkaisuehdokas (RC1), kahden ihmisen testipalaute ja päätetty korjauslista.",
      why: "Ominaisuusjäädytys estää uusia muutoksia rikkomasta lähes valmista peliä. Palautteen luokittelu kohdistaa ajan vain julkaisuun vaikuttaviin virheisiin.",
      done: "Ensimmäinen julkaisuehdokas (RC1) on merkitty yhteen committiin. Asiakas ja toinen käyttäjä ovat testanneet sen, ja jokaisella havainnolla on vakavuus, toistuvuus ja päätös.",
      record: "Kirjoita Vko 47 -merkintään RC1-tagi ja sen commit, testaajien roolit, heidän havaintonsa sekä päätös jokaisesta: korjataan nyt, tunnettu puute tai myöhemmin. Rastita lopuksi Näyttömatriisi-näkymässä kohdan Version katselmointi.",
      skills: ["julkaisuehdokas", "palautteen luokittelu", "julkaisupäätös"],
      tehtavat: {
        "47-1": {
          perii: ["47-1"],
          miksi: "Kun uusia ominaisuuksia ei enää lisätä, voit testata version, joka oikeasti julkaistaan.",
          osat: [
            "Kirjaa päiväkirjaan päivä, josta alkaen peliin ei lisätä uusia ominaisuuksia vaan korjataan vain virheitä. Tätä kutsutaan ominaisuusjäädytykseksi.",
            "Pelaa main-haaran versio läpi ja varmista, että valikko, peliruutu, tulosruutu ja tallennus toimivat.",
            "Tarkista, että viimeisin commit on pushattu GitHubiin: merkitset sen seuraavassa osassa tagilla RC1. RC1 tarkoittaa ensimmäistä julkaisuehdokasta (release candidate 1): versiota, joka julkaistaan, jos testeissä ei löydy vakavia virheitä.",
            "Avaa GitHubissa Releases → Draft a new release. Kirjoita Choose a tag -kenttään RC1 ja valitse Create new tag. Rastita Set as a pre-release ja paina Publish release.",
            "Tee julkaisuehdokkaasta (RC1) selainversio Build And Run -toiminnolla. Testaajat pelaavat sitä sinun koneellasi."
          ],
          valmis: "Tagi RC1 näkyy GitHubissa, ja se osoittaa main-haaran viimeisimpään committiin.",
          tallenna: "RC1-tagin linkki ja commitin tunniste viikon 47 päiväkirjaan.",
          sanat: ["RC", "tagi"]
        },
        "47-2": {
          perii: ["47-2"],
          miksi: "Kaksi eri ihmistä löytää eri virheitä. Asiakas kertoo lisäksi, täyttääkö peli hänen toiveensa.",
          osat: [
            "Pyydä asiakasta ja yhtä muuta ihmistä testaamaan julkaisuehdokas (RC1).",
            "Anna molemmille sama tehtävä: ”Pelaa peli alusta loppuun ja tallenna tulos.”",
            "Pyydä heitä sulkemaan peli ja avaamaan se uudelleen, jotta näet, toimiiko tallennus.",
            "Kirjaa jokainen havainto erikseen: kuka testasi (rooli), mitä tapahtui ja missä kohdassa."
          ],
          valmis: "Kahden testaajan havainnot on kirjattu erikseen, ja testaajien roolit näkyvät.",
          tallenna: "Havainnot viikon 47 päiväkirjaan.",
          sanat: ["RC"],
          eiRiita: "Et voi itse esiintyä toisena testaajana, eikä tekoäly voi olla testaaja."
        },
        "47-3": {
          perii: ["47-3"],
          miksi: "Aikaa on vähän. Kun luokittelet havainnot, käytät ajan vain virheisiin, jotka estävät julkaisun.",
          osat: [
            "Kirjoita jokainen havainto omalle rivilleen.",
            "Merkitse vakavuus: vakava (peli ei toimi tai kaatuu), haitallinen (peli toimii mutta hankalasti) tai pieni (ulkonäköasia).",
            "Merkitse toistuvuus: toistuu aina, joskus tai kerran.",
            "Päätä jokaisesta: korjataan nyt, tunnettu puute (kerrotaan käyttöohjeessa) tai myöhemmin (parannus, joka ei haittaa pelaajaa).",
            "Tee jokaisesta korjattavasta havainnosta GitHub-issue. Lisää sille uusi testitapaus project-docs/testaus.md-tiedostoon, esimerkiksi testitapaus T13."
          ],
          valmis: "Jokaisella havainnolla on vakavuus, toistuvuus ja päätös, ja korjattavista on issuet.",
          tallenna: "Luokiteltu lista ja issueiden linkit viikon 47 päiväkirjaan.",
          esimerkki: "Pisteet eivät nollaudu · vakava · toistuu aina · korjataan nyt · testitapaus T14."
        }
      }
    },

    48: {
      type: "julkaisu",
      feature: "Peli on julkaistu GitHub Pagesissa versiona v1.0, ja toinen ihminen pelaa sen toisella laitteella käyttöohjeen avulla.",
      excerpt: "Lopullinen peli pitää julkaista niin, että voin itse kokeilla sitä.",
      connection: "Viikon 47 luokitellusta listasta korjaat vain korjataan nyt -havainnot. Sitten peli siirtyy Unity-editorista GitHub Pagesiin, ja testaat julkaistua linkkiä toisella laitteella, koska vain julkinen linkki osoittaa, että tiedostot, asetukset ja tallennus toimivat asiakkaan ympäristössä. Julkaistu versio v1.0 on sama, jonka esittelet näytössä viikolla 49.",
      deliverable: "GitHub Pagesissa toimiva versio v1.0, käyttöohje ja tunnettujen puutteiden lista.",
      why: "Asiakkaan pitää pystyä avaamaan peli itse. Vain julkisen linkin testaus osoittaa, että pelin tiedostot, asetukset ja tallennus toimivat oikeassa ympäristössä.",
      done: "v1.0-tagin commit vastaa julkaistua versiota. Toinen ihminen avaa linkin toisella selaimella tai laitteella ja pelaa kierroksen käyttöohjeen avulla.",
      record: "Kirjoita Vko 48 -merkintään ketju v1.0-tagi → commit → julkaisulinkki. Lisää testattu selain tai laite, testaajan rooli, testitulos ja tunnetut puutteet. Rastita lopuksi Näyttömatriisi-näkymässä kohdat Versionhallinta, Tuotantojulkaisu, Julkaisu asiakkaan ympäristöön, Kirjaston mahdollisuudet ja rajoitteet ja Ulkoiset komponentit.",
      skills: ["Unity WebGL", "GitHub Pages", "käyttöohje"],
      tehtavat: {
        "48-1": {
          perii: ["48-1"],
          miksi: "Ominaisuusjäädytyksen jälkeen korjataan vain se, mikä estää julkaisun. Muu jää tunnetuksi puutteeksi.",
          osat: [
            "Avaa viikon 47 luokiteltu lista. Ota työn alle vain havainnot, joiden päätös on ”korjataan nyt”.",
            "Korjaa yksi virhe kerrallaan ja tee jokaisesta oma commit.",
            "Aja jokaisen korjauksen jälkeen siihen liittyvä testitapaus ja regressiotesti eli toinen testitapaus, joka käyttää samaa koodia.",
            "Sulje korjatut GitHub-issuet ja lisää niihin linkki korjauscommitiin."
          ],
          valmis: "Kaikki korjataan nyt -havainnot on korjattu ja testattu, ja niiden issuet on suljettu.",
          tallenna: "Korjauscommitien linkit viikon 48 päiväkirjaan.",
          sanat: ["T01", "regressiotesti"]
        },
        "48-2": {
          perii: ["48-2"],
          miksi: "GitHub Pages julkaisee pelin verkkoon, jolloin asiakas voi avata sen omalla koneellaan.",
          osat: [
            "Avaa File → Build Profiles, valitse Web ja tarkista, että CafeGame on scene-listassa.",
            "Avaa Player Settings → Web → Publishing Settings ja ota käyttöön Decompression Fallback. Ilman sitä GitHub Pages ei osaa avata pakattua peliä.",
            "Paina Build ja valitse kansioksi repositoryn docs-kansio. Luo VS Codella docs-kansioon tyhjä tiedosto .nojekyll: se kertoo GitHub Pagesille, että kansio julkaistaan sellaisenaan.",
            "Tee commit ja push. Tarkista GitHubista, että docs-kansiossa näkyvät index.html, Build ja TemplateData.",
            "Avaa GitHubissa Settings → Pages. Valitse Deploy from a branch, haaraksi main ja kansioksi /docs. Paina Save.",
            "Odota muutama minuutti, avaa Pages-sivun antama linkki ja pelaa yksi kierros.",
            "Kun peli aukeaa linkistä, merkitse sama commit tagilla v1.0: Releases → Draft a new release → tagi v1.0 → Publish release."
          ],
          valmis: "Peli aukeaa julkaisulinkistä, ja tagi v1.0 osoittaa samaan committiin kuin julkaisu.",
          tallenna: "Julkaisulinkki ja v1.0-tagin linkki viikon 48 päiväkirjaan.",
          sanat: ["tagi", "build", "WebGL"],
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
              ["GitHub: Pages-julkaisulähde", "https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site"]
            ]
          }
        },
        "48-3": {
          perii: ["48-3"],
          miksi: "Käyttöohje kertoo asiakkaalle, miten peliä pelataan. Tunnetut puutteet kertovat rehellisesti, mikä jäi kesken.",
          osat: [
            "Lisää README.md-tiedostoon otsikko ”Näin pelaat”. Lisää sen alle julkaisulinkki.",
            "Kirjoita ohje neljänä vaiheena: avaa linkki → Aloita → valitse tilauksen tuotteet → Toimita.",
            "Lisää otsikko ”Tunnetut puutteet” ja listaa sen alle viikon 47 tunnetut puutteet.",
            "Lisää otsikko ”Lähteet ja lisenssit”. Listaa sen alle käytetyt grafiikkapaketit ja niiden lisenssit.",
            "Pyydä toista ihmistä aloittamaan peli pelkän ohjeen avulla, ilman suullista apua. Kirjaa hänen roolinsa ja kohdat, joissa hän epäröi, ja korjaa ne ohjeeseen."
          ],
          valmis: "README:ssä ovat julkaisulinkki, käyttöohje, tunnetut puutteet ja lähteet.",
          tallenna: "README.md, commit ja push.",
          esimerkki: "README: Avaa [linkki] → Aloita → valitse tuotteet → Toimita. Testattu Chrome 128 / v1.0 / tunnettu puute: [asia]."
        },
        "48-4": {
          perii: ["48-3"],
          miksi: "Peli voi toimia omalla koneella mutta ei muualla. Vain toisella laitteella tehty testi todistaa, että julkaisu toimii.",
          osat: [
            "Pyydä toista ihmistä avaamaan julkaisulinkki eri laitteella tai eri selaimella.",
            "Pyydä häntä pelaamaan kierros README:n käyttöohjeen avulla aloituksesta tulosruutuun ja tallentamaan tulos.",
            "Pyydä häntä päivittämään sivu ja tarkistamaan, että tulos näkyy yhä.",
            "Kirjaa testattu laite ja selain, testaajan rooli ja tulos."
          ],
          valmis: "Toinen ihminen on pelannut julkaistun pelin toisella laitteella tai selaimella, ja tulos on kirjattu.",
          tallenna: "Laite, selain, testaajan rooli ja tulos viikon 48 päiväkirjaan.",
          eiRiita: "Kuva editorista tai ”toimii omalla koneella” ei osoita, että asiakas pystyy avaamaan pelin."
        }
      }
    },

    49: {
      type: "naytto",
      feature: "Peli, repository ja projektipäiväkirja on luovutettu, ja jokaisella näyttömatriisin vaatimuksella on toimiva linkki.",
      excerpt: "Lopullinen peli pitää julkaista niin, että voin itse kokeilla sitä.",
      connection: "Peliä ei enää muuteta: julkaistu v1.0 ja viikkojen 34–48 työnäytteet ovat näyttösi aineisto. Tarkistat päiväkirjan, kirjoitat itsearvioinnin ja liität jokaiseen näyttömatriisin vaatimukseen tarkan linkin, koska arvioija voi arvioida vain löydettävän osaamisen. Demossa näytät saman version ja selität ratkaisusi itse.",
      deliverable: "Valmis projektipäiväkirja, itsearviointi, täytetty näyttömatriisi, harjoiteltu demo ja luovutettu aineisto.",
      why: "Arvioija voi arvioida vain näkyvän ja löydettävän osaamisen. Tarkat linkit säästävät aikaa ja näyttävät, miten vaatimus muuttui suunnitelmaksi, toteutukseksi ja testiksi.",
      done: "Jokaisessa näyttömatriisin kohdassa on tarkka linkki, joka aukeaa. Projektipäiväkirja ja AI-loki ovat repositoryssa, ja demo käyttää samaa v1.0-versiota.",
      record: "Kirjoita Vko 49 -merkintään itsearviointi: kolme vahvuutta työnäytteineen ja yksi seuraava kehitysaskel. Lisää linkit näyttömatriisiin, AI-lokiin ja v1.0-versioon.",
      skills: ["näyttömatriisi", "itsearviointi", "demo"],
      resources: [
        ["Avaa näyttömatriisi", "#view-naytto", false],
        ["Avaa ja lataa AI-loki", "#view-ailoki", false]
      ],
      tehtavat: {
        "49-1": {
          perii: ["49-1"],
          miksi: "Projektipäiväkirja on näyttösi hakemisto. Jos viikko puuttuu, sen työnäytteitä ei löydy.",
          osat: [
            "Avaa Projektipäiväkirja-näkymä ja tarkista, että jokainen viikko on merkitty kirjatuksi.",
            "Täydennä puuttuvat kentät viikkonäkymissä.",
            "Tarkista jokaisen viikon Missä työnäyte on? -kentästä, että linkki aukeaa."
          ],
          valmis: "Kaikki 15 viikkoa on kirjattu, ja jokaisen viikon työnäytelinkki aukeaa.",
          tallenna: "Täydennetyt viikkomerkinnät sivuston projektipäiväkirjassa. Lataat tiedoston repositoryyn työvaiheessa 5."
        },
        "49-2": {
          perii: ["49-1"],
          miksi: "Itsearviointi näyttää, että tunnistat oman osaamisesi ja tiedät, mitä opettelet seuraavaksi.",
          osat: [
            "Valitse projektista kolme asiaa, jotka osaat nyt hyvin.",
            "Liitä jokaiseen vahvuuteen työnäyte: linkki commitiin, testitapaukseen tai päiväkirjan viikkoon.",
            "Kirjoita yksi asia, jota haluat kehittää seuraavaksi. Kirjoita myös, miten aiot kehittää sitä.",
            "Kirjoita itsearviointi itse. Älä käytä tekoälyä tekstin kirjoittamiseen."
          ],
          valmis: "Viikon 49 päiväkirjassa on kolme vahvuutta työnäytteineen ja yksi kehitysaskel.",
          tallenna: "Itsearviointi viikon 49 päiväkirjaan.",
          eiRiita: "Tekoälyn kirjoittama yleinen itsearviointi, jossa ei ole linkkejä omiin työnäytteisiin."
        },
        "49-3": {
          perii: ["49-2"],
          miksi: "Arvioija löytää jokaisen osaamisen yhdellä klikkauksella, eikä hänen tarvitse etsiä sitä repositorysta.",
          osat: [
            "Avaa Näyttömatriisi-näkymä eli luettelo osaamisvaatimuksista, joihin tarvitset työnäytteen, ja lue ensimmäinen vaatimus.",
            "Etsi työnäyte, joka osoittaa, että vaatimus täyttyy: issue, C#-tiedosto, commit, testitapaus tai päiväkirjan viikko.",
            "Kopioi työnäytteen tarkka linkki. Linkin pitää avata juuri se kohta, ei repositoryn etusivua.",
            "Kirjoita viikon 49 päiväkirjaan omalle rivilleen vaatimuksen nimi ja linkki. Rastita sitten vaatimus Näyttömatriisi-näkymässä.",
            "Toista osatehtävät 1–4 jokaiselle vaatimukselle."
          ],
          valmis: "Jokaisella näyttömatriisin vaatimuksella on tarkka linkki, joka aukeaa.",
          tallenna: "Vaatimusten linkit viikon 49 päiväkirjaan, josta ne tulevat mukaan projektipaivakirja.md-tiedostoon.",
          esimerkki: "Toimintojen testaus → project-docs/testaus.md → testitapaukset T01–T12 → versio v1.0 → tarkka linkki.",
          eiRiita: "Pelkkä rastitettu matriisi tai linkki repositoryn etusivulle."
        },
        "49-4": {
          perii: ["49-3"],
          miksi: "Demossa näytät osaamisesi itse. Harjoittelu varmistaa, että ehdit näyttää tärkeimmät asiat.",
          osat: [
            "Kirjoita demon runko kuutena kohtana: pelin kulku, tuotelista JSON-tiedostossa, tallennus, yksi virheenkorjaus, Git-historia ja AI-loki.",
            "Harjoittele demo kerran ääneen toiselle ihmiselle ja ota aika. Kirjaa kuulijan rooli ja yksi hänen palautteensa. Tavoite on 8–10 minuuttia.",
            "Harjoittele, miten selität yhden C#-metodin omin sanoin.",
            "Varmista, että demossa käytät julkaistua versiota v1.0."
          ],
          valmis: "Demo kestää 8–10 minuuttia ja käy läpi kaikki kuusi kohtaa.",
          tallenna: "Demon runko viikon 49 päiväkirjaan.",
          sanat: ["JSON"]
        },
        "49-5": {
          perii: ["49-4"],
          miksi: "Luovutus on näytön viimeinen vaihe. Kun toinen ihminen tarkistaa aineiston, et unohda mitään.",
          osat: [
            "Paina Projektipäiväkirja-näkymän painiketta Lataa koko päiväkirja (.md) ja korvaa repositoryn tiedosto project-docs/projektipaivakirja.md. Tee commit ja push. Tarkista, että repositoryssa ovat peli, README.md, gdd.md, testaus.md ja projektipaivakirja.md.",
            "Avaa ladattu projektipaivakirja.md ja tarkista, että sen lopussa on otsikko AI-loki ja omat merkintäsi.",
            "Pyydä toista ihmistä avaamaan julkaisulinkki ja repository. Kirjaa, löysikö hän kaiken.",
            "Luovuta peli, repository, projektipäiväkirja ja näyttöaineisto ohjaajalle viimeistään pe 4.12.2026."
          ],
          valmis: "Aineisto on luovutettu viimeistään pe 4.12.2026, ja toinen ihminen on tarkistanut sen.",
          tallenna: "Luovutuksen päivä viikon 49 päiväkirjaan."
        }
      },
      paivat: [
        ["Ma 30.11.", "Koodijäädytys: viimeinen hyväksytty versio."],
        ["Ti 1.12.", "Aineisto: päiväkirja, itsearviointi ja linkit."],
        ["Ke 2.12.", "Harjoittelu: 8–10 minuutin demo."],
        ["To 3.12.", "Puskuri: tarkistus toisen ihmisen kanssa."],
        ["Pe 4.12.", "Luovutus: peli, repository, projektipäiväkirja ja näyttö."]
      ]
    }
  }
};

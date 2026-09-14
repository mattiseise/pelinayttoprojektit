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
  aloitusNappi: "Aloita pelin rakentaminen",
  apuOtsikko: "Tarvitsen toteutusapua Unityyn",

  /* Poimittu vanhasta styles.css:stä: --coral/--coral-dark → --accent/--accent-dark,
     --phase-a..d säilyivät sellaisinaan. Ks. myös styles.css:n kommentti. */
  paletti: {
    aksentti: "#2563eb",
    aksenttiTumma: "#1d4ed8",
    taulukkoSavy: "#eaf1fd",
    riviSavy: "#f4f8fe"
  },

  /* ---- vaiheet (vanhan app.js:n phaseStarts + index.html:n phase-heading-otsikot) ---- */
  vaiheet: [
    { tunnus: "A", lyhyt: "Ydin",     otsikko: "Pelin ydin: idea, ensimmäinen pelattava kierros ja oikea tuotelista", viikot: [34, 35, 36, 37],         vari: "#0d9488" },
    { tunnus: "B", lyhyt: "Featuret", otsikko: "Pelin featuret: kiire, kasvava vaikeus, top 5 ja asiakaskatselmointi", viikot: [38, 39, 40, 41, 42],    vari: "#d97706" },
    { tunnus: "C", lyhyt: "Valmiiksi", otsikko: "Peli valmiiksi: palautemuutos, käytettävyys, testaus ja koodin laatu", viikot: [43, 44, 45, 46],       vari: "#7c3aed" },
    { tunnus: "D", lyhyt: "Julkaisu", otsikko: "Julkaisu ja näyttö",                                                    viikot: [47, 48, 49],            vari: "#db2777" }
  ],

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
    { termi: "WebGL", nimi: "Unityn selainjulkaisu", selite: "WebGL on Unityn julkaisumuoto, joka toimii selaimessa ilman asennusta. WebGL-build on siis selaimessa pelattava julkaisuversio pelistä – tämän projektin lopputuote.", viikko: 34 },
    { termi: "P0", nimi: "Pakollinen ydin", selite: "P0 on se osa peliä, jonka on pakko valmistua: ilman sitä peliä ei voi luovuttaa asiakkaalle. Tee koko P0 valmiiksi ennen kuin aloitat lisäominaisuuksia.", viikko: 34 },
    { termi: "P1", nimi: "Tärkeä jatkosisältö", selite: "P1 on ominaisuus, joka tehdään vasta kun koko P0 toimii. Se parantaa peliä, mutta peli on luovutettavissa myös ilman sitä.", viikko: 35 },
    { termi: "P2", nimi: "Valinnainen lisä", selite: "P2 on ominaisuus, joka voidaan jättää kokonaan pois, jos aika loppuu. Merkitse P2:ksi kaikki, mistä voi luopua ilman että asiakkaan vaatimus jää täyttämättä.", viikko: 35 },
    { termi: "GDD", nimi: "Game Design Document, pelin suunnitteludokumentti", selite: "GDD kokoaa yhteen tiedostoon pelin konseptin, pelin kulun, omat suunnittelupäätökset, rajauksen ja avoimet asiat. Tässä projektissa se täytetään Suunnitelma-näkymässä ja tallennetaan repositoryyn nimellä gdd.md.", viikko: 35 },
    { termi: "GitHub-issue", nimi: "Tehtävä, jota seurataan GitHubissa", selite: "GitHub-issue on yksi tehtävä: otsikko, perustelu, rajattu muutos ja valmis kun -ehto. Tässä projektissa yhden issuen työmäärä on 0,5–1 työpäivää.", viikko: 35 },
    { termi: "backlog", nimi: "Priorisoitu tehtävälista", selite: "Backlog on projektin tehtävälista, jossa jokaisella tehtävällä on prioriteetti (P0, P1 tai P2), työmääräarvio ja valmis kun -ehto. Backlog päivitetään aina, kun asiakas päättää jotain uutta.", viikko: 35 },
    { termi: "UI", nimi: "User interface, käyttöliittymä", selite: "Käyttöliittymä on se osa peliä, jonka pelaaja näkee ja jota hän käyttää: painikkeet, tekstit ja paneelit. Unityssä ne rakennetaan Canvas-alueelle.", viikko: 35 },
    { termi: "feature", nimi: "Pelin yksittäinen ominaisuus", selite: "Feature on yksi pelaajalle näkyvä ominaisuus, esimerkiksi pistelasku tai viiden parhaan tuloksen lista. Tässä projektissa featuret tehdään yksi kerrallaan, yleensä yksi viikossa.", viikko: 36 },
    { termi: "asset", nimi: "Peliin tuotava valmis tiedosto", selite: "Asset on peliin tuotava valmis kuva-, ääni- tai fonttitiedosto, esimerkiksi sprite eli hahmon tai esineen kuva. Kirjaa jokaisesta assetista lähde ja lisenssi.", viikko: 36 },
    { termi: "JSON", nimi: "Tekstimuoto datalle", selite: "JSON on yksinkertainen tekstimuoto, jossa tieto on nimi–arvo-pareina. Tässä projektissa kahvilan tuotteet ovat products.json-tiedostossa, joten valikoimaa voi muuttaa koskematta koodiin.", viikko: 37 },
    { termi: "branch", nimi: "Git-haara", selite: "Branch eli haara on rinnakkainen kehityslinja: teet muutoksen omassa haarassa, jolloin toimiva main-haara pysyy ehjänä. Valmis haara yhdistetään eli mergetään takaisin mainiin.", viikko: 43 },
    { termi: "pull request", nimi: "PR, pyyntö yhdistää haara pääversioon", selite: "Pull request eli PR on GitHubissa tehtävä pyyntö yhdistää oma haara main-haaraan. Se antaa katselmoinnille oman paikan ennen yhdistämistä; pienen muutoksen voi myös yhdistää suoraan ilman PR:ää.", viikko: 43 },
    { termi: "T01", nimi: "Testitapauksen tunnus", selite: "Testitapaukset numeroidaan juoksevasti: T01 on ensimmäinen testitapaus, T02 toinen. Odotettu tulos kirjataan ennen ajoa, ja tunnuksella viitataan testiin päiväkirjassa ja näyttömatriisissa.", viikko: 45 },
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
      work: "Kerro konkreettiset Unity-objektit, C#-tiedostot, Git-tehtävät ja testit.",
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
        "## 1. Konsepti",
        "",
        "Koulun kahvilapeli selaimeen: asiakkaita saapuu tiskille, he tilaavat 1–3 tuotetta ja pelaaja toimittaa oikean tilauksen mahdollisimman nopeasti.",
        "",
        "## 2. Tavoite ja tekijän rooli omin sanoin",
        "",
        arvo("goal"),
        "",
        "## 3. Ydinsilmukka",
        "",
        "Tilaus → valinta → toimitus → pisteet → uusi asiakas.",
        "",
        "## 4. Omat suunnittelupäätökset",
        "",
        `- **Visuaalinen tyyli:** ${arvo("style")}`,
        `- **Grafiikan hankinta ja lisenssi:** ${arvo("graphics")}`,
        `- **Pisteytys:** oikea toimitus +${arvo("scoreRight", "_?_")} p · väärä toimitus −${arvo("scoreWrong", "_?_")} p`,
        "",
        "### Perustelut",
        "",
        arvo("reasoning"),
        "",
        "## 5. Asiakkaan kanssa sovittavat asiat",
        "",
        `- ${roundLine}`,
        "- Millä selaimilla ja laitteilla WebGL-versio testataan? — kirjaa vastaus tai jätä avoimeksi",
        "- Kenelle peli tehdään? — kirjaa vastaus tai jätä avoimeksi",
        "- Miten viiden parhaan tuloksen tasatilanteet järjestetään? — kirjaa vastaus tai jätä avoimeksi",
        "- Kuka hyväksyy rajauksen ja väliversion? — kirjaa vastaus tai jätä avoimeksi",
        "",
        "## 6. Featuret tekojärjestyksessä",
        "",
        "1. Ensimmäinen pelattava kierros (vko 36)",
        "2. Kahvilan oikea tuotelista (vko 37)",
        "3. Kello, pisteet ja palaute (vko 38)",
        "4. Kasvava kiire (vko 39)",
        "5. Top 5 -tuloslista (vko 40)",
        "6. Asiakkaan toivoma parannus (vko 43 — sisältö selviää katselmoinnissa vkolla 41)",
        "7. Peli ohjaa pelaajaa itse (vko 44)",
        "",
        "Huomautus: tämä lista ei ole valmis suunnitelma. Featurejen pilkkominen 0,5–1 päivän GitHub-issueiksi ja priorisointi on omaa työtä (tehtävä 35-2). P0 on pakollinen ydin, jonka on valmistuttava; P1 on tärkeä jatkosisältö, joka tehdään kun P0 toimii; P2 on valinnainen lisä, joka voidaan jättää pois.",
        "",
        "## 7. Teknologia",
        "",
        "Unity 2D + C#, tuotteet erillisessä products.json-tiedostossa (TextAsset + JsonUtility), tallennus PlayerPrefsillä, julkaisu Unity WebGL -buildina GitHub Pagesiin.",
        "",
        "## 8. Rajaus – mitä ei tehdä",
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

  /* ---- viikkojen ohjaava sisältö (siirretty sellaisenaan vanhan app.js:n weekGuidance-objektista) ---- */
  viikkoOhjeet: {
    34: {
      type: "pohjustus",
      termit: ["repository", "commit", "build", "WebGL", "P0"],
      feature: "Viikon jälkeen tiedät, millainen peli tehdään ja kenelle. Tyhjä peli käynnistyy selaimessa.",
      connection: "Pelin toimintakierto (gameplay loop) alkaa asiakkaan tarpeesta: ennen koodaamista päätät, mitä kahvilassa tapahtuu tilauksen saapumisesta tulosruutuun.",
      deliverable: "Tarvekartoitus, käynnistyvä Unity 2D -projekti, WebGL-testibuild ja Git-repository.",
      why: "Jos avoimet asiat jäävät oletuksiksi, voit rakentaa väärän pelin. Varhainen testibuild varmistaa, että valittu Unity-versio ja WebGL toimivat ennen varsinaista koodausta.",
      done: "Asiakkaan vastaukset, avoimet asiat ja oletukset on eroteltu. Toinen henkilö löytää repositoryn README:stä projektin tavoitteen, ja WebGL-testibuild käynnistyy.",
      record: "Kirjoita Vko 34 -merkintään keskustelun päivä, osallistujien roolit, 8 kysymystä vastauksineen, avoimet asiat, Unity-versio, ensimmäisen commitin tunniste ja testibuildin paikka.",
      skills: ["asiakastarve", "Unity 2D", "Git"],
      steps: [
        ["Selvitä tarve", "Merkitse toimeksiannon pakolliset asiat, laadi vähintään 8 päätökseen johtavaa kysymystä ja kirjaa asiakaskeskustelun vastaukset, avoimet asiat ja oletukset."],
        ["Tee Unity-testi", "Luo Unity Hubissa 2D-projekti, CafeGame-scene ja WebGL-testibuild. Kirjaa käytetty Unity-versio."],
        ["Perusta Git", "Lisää README eli repositoryn esittelytiedosto, project-docs-kansio ja Unity-.gitignore. Gitissä ovat Assets, Packages ja ProjectSettings; Library jää pois. Tee ensimmäinen commit ja push."]
      ],
      help: {
        title: "Luo Unity-projekti, ensimmäinen scene ja Git-repository",
        tree: "CafeGame/\n├─ Assets/\n│  └─ Scenes/CafeGame.unity\n├─ Packages/\n├─ ProjectSettings/\n├─ project-docs/\n│  └─ projektipaivakirja.md\n├─ .gitignore\n└─ README.md\n\nBuilds/ jätetään Gitin ulkopuolelle testivaiheessa.",
        actions: [
          "Avaa Unity Hub → Projects → New project. Valitse oppilaitoksen Unity-versio ja 2D Core. Anna nimeksi CafeGame ja paina Create project.",
          "Unityssä valitse File → Save As. Luo Assets-kansioon Scenes-kansio ja tallenna scene nimellä CafeGame.unity.",
          "Valitse File → Build Profiles (vanhemmassa Unityssä Build Settings) → Web → Switch Platform → Add Open Scenes → Build. Tallenna testi paikalliseen Builds/Test-kansioon.",
          "Luo GitHubiin tyhjä repository. Lisää Unitylle tarkoitettu .gitignore, jotta Library-, Temp- ja Builds-kansiot eivät mene versionhallintaan.",
          "Varmista ennen ensimmäistä committia, että Assets, Packages, ProjectSettings, project-docs, README.md ja .gitignore näkyvät Gitin muutoksissa. Tee commit ja push."
        ],
        code: "ENSIMMÄISEN COMMITIN TARKISTUS\n[ ] Assets mukana\n[ ] Packages mukana\n[ ] ProjectSettings mukana\n[ ] project-docs mukana\n[ ] README.md kertoo pelin tavoitteen\n[ ] Library, Temp ja Builds eivät ole mukana\n[ ] commit näkyy GitHubissa",
        test: "Sulje Unity. Kloonaa repository toiseen kansioon tai pyydä ohjaajaa avaamaan se. Unity luo puuttuvan Library-kansion itse, CafeGame-scene avautuu ja WebGL-testibuild voidaan tehdä.",
        images: [
          ["assets/unity/vko34-hub-uusi-projekti.png", "Unity Hubin New project -näkymä: Universal 2D -templaatti valittuna, projektin nimi CafeGame ja sijainti D-asemalla.", "Unity Hub: New project → Universal 2D → nimi CafeGame → Create project."],
          ["assets/unity/vko34-build-profiles-web.png", "Unityn Platform Browser -ikkuna, jossa Web-alusta on valittuna ja Add Build Profile -painike näkyvissä.", "Build Profiles → Add Build Profile → Web. Uusi profiili vaihtaa alustan Webiin."]
        ]
      },
      example: "Kysymys: Miten top 5 -listan tasatilanteet järjestetään? Vastaus: [asiakkaan vastaus]. Päätös: [oma tiivistys].",
      notEnough: "Kahdeksan lähes samaa tekoälykysymystä tai itse keksityt asiakkaan vastaukset eivät osoita asiakastarpeen selvittämistä.",
      paivat: [
        ["Päivä 1", "Tarve: Lue toimeksianto. Kirjoita 8 kysymystä ja pidä aloituskeskustelu."],
        ["Päivä 2", "Rajaus: Sovi testiselaimet, pelisäännöt, kohderyhmä, P0-ominaisuudet ja valmis kun -ehdot."],
        ["Päivä 3", "Unity-perusta: Luo Unity Hubissa 2D-projekti, käynnistä testiscene ja tee WebGL-testibuild. Perusta Git-repository."],
        ["Päivä 4", "Suunnittele: Tee backlog eli priorisoitu tehtävälista, käyttöliittymäluonnos ja jaa koodi selkeisiin vastuisiin."],
        ["Päivä 5", "Pelattava kokonaisuus: Tee polku valikosta yhteen tilaukseen, pisteeseen ja pelin loppuun."]
      ]
    },

    35: {
      type: "pohjustus",
      termit: ["GDD", "GitHub-issue", "backlog", "P1", "P2", "UI"],
      feature: "Viikon jälkeen peli on paperilla: kolme ruutua ja featuret tekojärjestyksessä. Asiakas on hyväksynyt rajauksen.",
      excerpt: "Pelissä pitää olla aloitusvalikko, itse peli, pistelasku ja pelin päättymisnäkymä.",
      connection: "Nyt muutat toimeksiannon näkyväksi Unity-suunnitelmaksi: Canvas-näkymät, pelin toimintakierto, C#-vastuut, tehtävät ja valmiin työn ehdot.",
      deliverable: "Hyväksytty pakollinen perusversio, pieni backlog, käyttöliittymäluonnos ja Unityn tekninen rakennekuva.",
      why: "Rajaus estää projektia kasvamasta liian suureksi. Kun jokaisella tehtävällä on selvä valmis kun -ehto, tiedät mitä seuraavaksi tehdään ja milloin työ voidaan testata.",
      done: "Pakollinen perusversio on hyväksytty. Jokaisella P0-tehtävällä on 0,5–1 päivän arvio ja havaittava valmis kun -ehto. Mockupissa näkyvät valikko, peli ja tulos.",
      record: "Kirjoita Vko 35 -merkintään, mitkä GDD-päätökset teit ja miksi, hyväksyjän rooli ja päivä sekä mitkä asiat jäivät asiakkaalle avoimiksi. Lisää linkit gdd.md-tiedostoon, backlogiin, mockupiin ja rakennekuvaan.",
      skills: ["rajaus", "Unity UI", "työn pilkkominen"],
      resources: [
        ["Täytä GDD tällä sivulla", "#view-suunnitelma", false],
        ["Avaa koko toimeksianto", "#view-toimeksianto", false]
      ],
      steps: [
        ["Täytä GDD", "Täytä GDD:n omat päätökset tällä sivulla: kirjoita tavoite ja oma roolisi omin sanoin, nimeä peli, valitse tyyli ja grafiikan lähde lisensseineen ja päätä pisteytys perusteluineen. Lataa gdd.md ja vie se project-docs-kansioon."],
        ["Tee pieni backlog", "Kirjoita jokainen kahvilapelin P0-toiminto omaksi 0,5–1 päivän GitHub-issueksi. Lisää prioriteetti ja havaittava valmis kun -ehto."],
        ["Piirrä Unity-ratkaisu", "Luonnostele kolme Canvas-paneelia ja pelin toimintakierto. Jaa C#-vastuut GameManager-, OrderManager-, ProductDatabase-, UIController- ja SaveService-skripteille."]
      ],
      help: {
        title: "Tee GitHub-issue, mockup ja vastuurakenne",
        tree: "project-docs/evidence/week-35/\n├─ mockup.png\n└─ unity-rakenne.png\n\nCafeGame-scene\n├─ GameManager\n├─ OrderManager\n├─ ProductDatabase\n├─ UIController\n└─ SaveService",
        actions: [
          "Kirjoita ensin projektipäiväkirjaan käyttäjä, tavoite, rajaus ja pakollinen perusversio. Käytä asiakkaan vastauksia; älä keksi avoimia päätöksiä.",
          "Avaa GitHubissa repository → Issues → New issue. Tee yksi issue jokaisesta pakollisesta toiminnosta. Kirjoita otsikko verbillä, esimerkiksi Näytä asiakkaan tilaus.",
          "Lisää issueen työmääräarvio ja valmis kun -ehto, jonka toinen ihminen voi testata. Jaa yli päivän mittainen issue pienemmäksi.",
          "Piirrä valikko, peli ja tulos paperille tai piirto-ohjelmalla. Merkitse näkyviin tilaus, tuotteet, aika, pisteet, palaute ja painikkeet. Tallenna kuva annettuun project-docs-polkuun.",
          "Piirrä toinen kuva C#-vastuista. Kirjoita jokaisen laatikon alle yksi vastuu ja nuoli siihen osaan, jolle tieto annetaan. Pyydä hyväksyntä ennen koodaamista."
        ],
        code: "ISSUE-POHJA\nOtsikko: [verbi + näkyvä toiminto]\n\nMiksi tämä tarvitaan:\n[linkki toimeksiannon vaatimukseen]\n\nToteutan:\n[rajattu muutos]\n\nValmis kun:\n[havaittava testitulos]\n\nArvio:\n[0,5 tai 1 työpäivä]",
        test: "Valitse yksi P0-issue sattumalta. Toinen henkilö pystyy kertomaan sen tekstin perusteella, mitä peliin muuttuu, miten tulos testataan ja milloin tehtävä on valmis."
      },
      example: "Issue: Näytä asiakkaan tilaus / P0 / 4 h / Valmis kun 1–3 tuotetta näkyy peliruudulla ennen pelaajan valintaa.",
      notEnough: "Tehtävä nimeltä “Tee peli” tai perustelematon tekoälyn arkkitehtuurikuva ei ole toteutuskelpoinen suunnitelma."
    },

    36: {
      type: "feature",
      termit: ["feature", "asset"],
      feature: "Peliä voi pelata ensimmäistä kertaa: Aloita → asiakas tilaa kahvin → toimitat → piste → tulosruutu.",
      excerpt: "Pelaajan tehtävänä on toimittaa oikea tilaus mahdollisimman nopeasti.",
      connection: "Rakennat Unityyn pelin toimintakierron ensimmäisen päästä päähän toimivan version. Yksi kiinteä kahvitilaus riittää nyt todistamaan koko polun; lopullinen 1–3 tuotteen tilaus tulee seuraavaksi.",
      deliverable: "Ensimmäinen pelattava WebGL-versio, jossa polku toimii valikosta yhden tilauksen kautta tulosruutuun.",
      why: "Pieni päästä päähän toimiva versio paljastaa scene-, Canvas- ja painikekytkentöjen ongelmat aikaisin. Sen päälle on turvallisempi lisätä loput ominaisuudet.",
      done: "Aloita → Kahvi → Toimita → pisteet → aika loppuu → tulos toimii WebGL-buildissa ilman, että muutat Unity Editorissa objekteja kesken pelin.",
      record: "Kirjoita Vko 36 -merkintään buildin tunniste, viisi testikierrosta ja tulokset. Lisää yhtenäinen video tai muu työnäyte koko pelipolusta sekä commit- ja testitunnisteet.",
      skills: ["Unity Canvas", "pelitilat", "ensimmäinen testi"],
      resources: [
        ["Kenney.nl – ilmaiset CC0-assetit: hahmot, esineet ja käyttöliittymäkuvat", "https://kenney.nl/assets", false],
        ["OpenGameArt – 2D-hahmot ja taustat (tarkista lisenssi)", "https://opengameart.org/", false],
        ["Piskel – piirrä omat spritet selaimessa", "https://www.piskelapp.com/", false]
      ],
      steps: [
        ["Rakenna Canvas-paneelit", "Tee CafeGame-sceneen MenuPanel, GamePanel ja ResultPanel. GameManager näyttää kerrallaan vain oikean paneelin."],
        ["Yhdistä yksi kierros", "Kytke Unity Button -tapahtumat: Aloita → valitse Kahvi → Toimita → +10 → aika 0 → tulos."],
        ["Testaa WebGL-buildissa", "Pelaa polku viisi kertaa ilman Unity Editoria ja kirjaa katkokset ennen niiden korjaamista."]
      ],
      help: {
        title: "Rakenna ensimmäinen Unity-näkymä",
        tree: "CafeGame (scene = pelin työtila)\n├─ GameManager [GameManager.cs]\n└─ Canvas (käyttöliittymän alue)\n   ├─ MenuPanel\n   │  └─ StartButton\n   ├─ GamePanel\n   │  ├─ OrderText\n   │  ├─ CoffeeButton\n   │  ├─ SubmitButton\n   │  ├─ ScoreText\n   │  └─ TimeText\n   └─ ResultPanel\n      ├─ FinalScoreText\n      └─ RestartButton",
        actions: [
          "Luo Hierarchyyn tyhjä GameManager-objekti ja liitä siihen GameManager.cs. MonoBehaviour tarkoittaa C#-skriptiä, jonka voi liittää GameObjectiin.",
          "Luo Canvas ja sen alle kolme Panel-objektia yllä olevan puun mukaan. Hyväksy TextMeshPro Essentials -tuonti, kun Unity kysyy sitä.",
          "Raahaa paneelit Inspectorissa eli komponenttien asetuspaneelissa GameManager-skriptin kenttiin.",
          "Lisää StartButtonin On Click -listaan GameManager ja valitse StartGame. Tee sama Submit- ja Restart-painikkeille.",
          "Pidä alussa vain MenuPanel aktiivisena. Tallenna scene nimellä CafeGame."
        ],
        code: "using UnityEngine;\n\npublic class GameManager : MonoBehaviour\n{\n    [SerializeField] private GameObject menuPanel;\n    [SerializeField] private GameObject gamePanel;\n    [SerializeField] private GameObject resultPanel;\n\n    public void StartGame()\n    {\n        // TODO: nollaa pisteet ja aika\n        // TODO: näytä vain gamePanel\n    }\n\n    public void SubmitOrder()\n    {\n        // TODO viikolla 38: tarkista tilaus ja muuta pisteitä\n    }\n\n    public void EndGame()\n    {\n        // TODO: näytä vain resultPanel\n    }\n\n    public void RestartGame()\n    {\n        // TODO: palauta alkutila ja kutsu StartGame\n    }\n}",
        test: "Play-painalluksen jälkeen näkyy vain valikko. Aloita näyttää vain pelin ja EndGame vain tuloksen. Sama toimii WebGL-buildissa.",
        images: [
          ["assets/unity/vko36-hierarchy-paneelit.png", "Unityn Hierarchy-paneeli: CafeGame-scene, jossa GameManager, ProductDatabase sekä Canvasin alla MenuPanel, GamePanel ja ResultPanel.", "Hierarchy tämän viikon jälkeen: GameManager ja Canvasin kolme paneelia."],
          ["assets/unity/vko36-button-onclick.png", "Unityn Inspector: StartButtonin Button-komponentti, jonka On Click -listassa on GameManager ja StartGame-metodi.", "StartButtonin On Click -lista: GameManager → StartGame."]
        ]
      },
      example: "Hyväksymistesti: Aloita → Kahvi → Toimita → pistemäärä 10 → aika 0 → tulosruudulla 10.",
      notEnough: "Kolme irrallista ruutukaappausta tai editorissa käsin vaihdettu pelitila ei vielä ole päästä päähän pelattava kokonaisuus."
    },

    37: {
      type: "feature",
      termit: ["JSON"],
      feature: "Tilaukset arvotaan tuotelistasta. Valikoimaa voi muuttaa koskematta koodiin.",
      excerpt: "Tuotteiden tiedot eivät saa olla kovakoodattuna pelilogiikkaan, vaan niiden pitää tulla erillisestä tietolähteestä.",
      connection: "Pelin toimintakierron tilaus syntyy nyt Unityyn tuodusta JSON-datasta. Kahvi, tee ja sämpylä eivät enää ole kirjoitettuina suoraan C#-tilauskoodiin.",
      deliverable: "products.json, ProductDatabase.cs, 1–3 tuotteen tilauslogiikka ja virhetilanteiden käsittely.",
      why: "Erillinen tietolähde tekee tuotteiden muuttamisesta helppoa ja osoittaa, että osaat siirtää dataa tiedostosta C#-olioiksi ilman käyttöliittymän ja pelisääntöjen sekoittamista.",
      done: "Kahvin pistearvon muuttaminen JSONissa näkyy pelissä ilman C#-muutosta. Puuttuva tai rikkinäinen JSON näyttää hallitun virheen eikä riko koko peliä.",
      record: "Kirjoita Vko 37 -merkintään JSON-tiedoston polku, tiedon kulku JSON → ProductDatabase → OrderManager → käyttöliittymä, commit-linkki ja puuttuvan sekä rikkinäisen datan testitulokset.",
      skills: ["TextAsset + JSON", "C#-logiikka", "virheenkäsittely"],
      steps: [
        ["Tee tuotedata", "Lisää products.json-tiedostoon vähintään id, nimi ja pistearvo. Liitä tiedosto Inspectorissa (komponenttien asetuspaneeli) ProductDatabase-skriptin TextAsset-kenttään."],
        ["Muunna ja muodosta tilaus", "Käytä JsonUtility.FromJson-metodia ja arvo tuloksesta 1–3 tuotetta. OrderManager hoitaa tilauksen; UIController vain näyttää sen."],
        ["Riko tarkoituksella", "Irrota TextAsset Inspectorissa, riko JSON ja testaa lisäksi väärä, puuttuva sekä ylimääräinen tuote."]
      ],
      help: {
        title: "Lataa tuotelista TextAssetista",
        tree: "Assets/\n├─ Data/products.json\n└─ Scripts/\n   ├─ ProductData.cs\n   ├─ ProductDatabase.cs\n   └─ OrderManager.cs\n\nCafeGame\n└─ ProductDatabase [ProductDatabase.cs + products.json Inspectorissa]",
        actions: [
          "Luo Data-kansioon products.json, jossa products-taulukossa on vähintään kolme tuotetta.",
          "Luo tavalliset ProductData- ja ProductList-luokat. [System.Serializable] tekee niiden kentistä Unityn JSON-muuntimelle luettavia.",
          "Lisää ProductDatabase-skriptiin TextAsset-kenttä. TextAsset on Unityn viite erilliseen tekstitiedostoon.",
          "Raahaa products.json Inspectorissa kenttään ja pura tiedosto ProductList-olioksi.",
          "Anna OrderManagerin arpoa listasta 1–3 tuotetta; älä arvo tai kirjoita tuotenimiä UIControllerissa."
        ],
        code: "using UnityEngine;\n\n[System.Serializable]\npublic class ProductData\n{\n    public string id;\n    public string name;\n    public int points;\n}\n\n[System.Serializable]\npublic class ProductList\n{\n    public ProductData[] products;\n}\n\npublic class ProductDatabase : MonoBehaviour\n{\n    [SerializeField] private TextAsset productsJson;\n\n    public ProductList LoadProducts()\n    {\n        // TODO: tarkista puuttuva TextAsset\n        return JsonUtility.FromJson<ProductList>(productsJson.text);\n    }\n}",
        test: "Muuta kahvin points-arvo JSONissa 10:stä 15:een. Muutoksen pitää näkyä pelissä ilman C#-tiedoston muokkausta.",
        images: [
          ["assets/unity/vko37-textasset-inspector.png", "Unityn Inspector: ProductDatabase-skripti, jonka Products Json -kenttään on raahattu products-TextAsset.", "products.json raahattuna ProductDatabase-skriptin TextAsset-kenttään."]
        ]
      },
      example: "{ \"products\": [{ \"id\": \"kahvi\", \"name\": \"Kahvi\", \"points\": 10 }] } → JsonUtility → ProductDatabase → OrderManager → käyttöliittymä.",
      notEnough: "JSON-tiedosto ei riitä, jos kahvi ja pistearvo ovat edelleen myös pelilogiikkaan kovakoodattuina."
    },

    38: {
      type: "feature",
      feature: "Peliin tulevat kello, pisteet ja välitön palaute toimituksesta.",
      excerpt: "Pelissä pitää olla aloitusvalikko, itse peli, pistelasku ja pelin päättymisnäkymä.",
      connection: "Viimeistelet pelin toimintakierron palautteen: kahvilapelaaja näkee TextMeshPro-kentissä heti, oliko toimitus oikea, paljonko pisteitä tuli ja milloin vuoro päättyy.",
      deliverable: "Kirjatut pelisäännöt sekä toimivat pisteet, ajastin, palaute ja pelin päättyminen.",
      why: "Pelaaja voi tehdä päätöksiä vain, jos peli kertoo tavoitteen, ajan ja toiminnan tuloksen. Rajatestit estävät tuplapisteet ja virheellisen lopetuksen.",
      done: "Peli päättyy kerran ajan loppuessa, nopea kaksoispainallus ei anna kahta tulosta ja uusi peli nollaa ajan sekä pisteet.",
      record: "Kirjoita Vko 38 -merkintään oikean ja väärän toimituksen pisteet, kierrosaika ja päättymisehto. Lisää build- tai commit-tunniste sekä vähintään kolme nimettyä rajatestiä tuloksineen.",
      skills: ["C#-pelisäännöt", "TextMeshPro UI", "rajatapaukset"],
      steps: [
        ["Kirjoita kahvilan säännöt", "Päätä ennen koodausta oikean ja väärän toimituksen pisteet, kierrosaika ja tarkka pelin päättymisehto."],
        ["Näytä palaute heti", "Kun Unity Button lähettää toimituksen, päivitä pisteet ja TextMeshPro-palaute ennen seuraavaa asiakasta."],
        ["Testaa rajat", "Kokeile aikaa 0, kahta nopeaa Toimita-painallusta, väärää tuotetta ja uuden pelin nollausta."]
      ],
      help: {
        title: "Kytke pisteet, aika ja käyttöliittymä",
        tree: "GameManager [score, timeLeft, isPlaying]\n├─ OrderManager [CurrentOrder, SubmitOrder]\n└─ UIController\n   ├─ ScoreText (TextMeshPro)\n   ├─ TimeText (TextMeshPro)\n   └─ FeedbackText (TextMeshPro)",
        actions: [
          "Lisää GameManageriin score-, timeLeft- ja isPlaying-kentät. Serialisoitu [SerializeField]-kenttä näkyy Inspectorissa ja sen aloitusarvo tallentuu sceneen.",
          "Vähennä aikaa vain pelitilassa Time.deltaTime-arvolla.",
          "OrderManager palauttaa toimituksesta onnistumisen. GameManager muuttaa pisteitä vain kerran per Submit-painallus.",
          "UIController saa uudet pisteet, ajan ja palautetekstin; se ei päätä pelisäännöistä.",
          "Poista Submit-painike hetkeksi käytöstä toimituksen käsittelyn ajaksi, jotta kaksoisklikkaus ei anna kahta tulosta."
        ],
        code: "// Lisää tiedoston alkuun: using TMPro;\n// Lisää seuraavat viikon 36 GameManager-luokan sisään.\n// Säilytä menuPanel-, gamePanel- ja resultPanel-kentät.\n[SerializeField] private TMP_Text timeText;\nprivate float timeLeft = 60f;\nprivate bool isPlaying;\n\nprivate void Update()\n{\n    if (!isPlaying) return;\n    timeLeft -= Time.deltaTime;\n    // TODO: päivitä timeText pyöristetyllä ajalla\n    if (timeLeft <= 0f) EndGame();\n}\n\n// Täydennä viikon 36 SubmitOrder-metodia:\n// TODO: estä toinen painallus käsittelyn aikana\n// TODO: kysy OrderManagerilta, oliko toimitus oikein\n// TODO: muuta pisteitä ja näytä palaute\n\n// Täydennä EndGame-metodia:\n// TODO: aseta isPlaying = false ennen ResultPanelin näyttämistä",
        test: "Aseta testissä aika arvoon 0,1 s ja paina Toimita nopeasti kahdesti. ResultPanel avautuu kerran ja pisteet muuttuvat enintään kerran.",
        images: [
          ["assets/unity/vko38-game-view.png", "Unityn Game-näkymä: kahvilavuoro käynnissä väliaikaisella grafiikalla. Näkyvissä tilaus, aika, pisteet, Kahvi- ja Toimita-painikkeet sekä palauteteksti.", "Game view: tilaus, aika, pisteet ja palaute riittävät. Grafiikka viimeistellään myöhemmin."]
        ]
      },
      example: "Oikea tilaus +10; väärä −5; aika 60 s; peli päättyy kerran, kun aika = 0.",
      notEnough: "Pelivideo yksin ei osoita, että pistelogiikka toimii rajoilla tai että uusi peli nollaa vanhan tuloksen."
    },

    39: {
      type: "feature",
      feature: "Peli vaikeutuu pistemäärän mukaan: isommat tilaukset ja lyhyemmät ajat, ei äkkihyppyjä.",
      excerpt: "Vaikeustason pitää kasvaa pelin edetessä.",
      connection: "Unityn pelin toimintakierto pysyy samana, mutta kahvilan kiire kasvaa hallitusti. Pelaajan pitää huomata vaikeutuminen ilman äkillistä sattumanvaraista hyppyä.",
      deliverable: "Kahden vaikeusmallin vertailu, perusteltu päätös ja kolmen tason säädettävä vaikeuskäyrä.",
      why: "Vertailu osoittaa, ettet valinnut ratkaisua sattumalta. Yhdestä paikasta säädettävät arvot helpottavat tasapainotusta ja tekevät muutoksista testattavia.",
      done: "Valittu malli on perusteltu. Sovitut pistemäärät tuottavat joka kerta oikean tilauskoon ja asiakasajan ilman uutta if-ketjua jokaiselle tasolle.",
      record: "Kirjoita Vko 39 -merkintään vaihtoehdot A ja B, vertailuperusteet, keskustelukumppanin rooli, valittu ratkaisu ja raja-arvojen testitulokset commit-linkkeineen.",
      skills: ["vaihtoehtojen vertailu", "vaikeuskäyrä", "pelitilat"],
      steps: [
        ["Vertaa ja valitse", "Vertaa toisen henkilön kanssa vaihtoehtoa A (enemmän tuotteita) ja B (vähemmän aikaa) selkeyden, säädettävyyden ja testattavuuden perusteella. Kirjaa päätös."],
        ["Tee kolme tasoa", "Pidä raja-arvot ja ajat yhdessä serialisoidussa eli Inspectorissa tallentuvassa DifficultySettings-rakenteessa. Älä hajauta niitä eri GameObjecteihin liitettäviin MonoBehaviour-skripteihin."],
        ["Testaa pelitilat", "Pelaa kolme eri pituistä kierrosta. Varmista, että valikko, peli ja tulos ovat erillisiä tiloja ja vaikeus kasvaa samalla tavalla."]
      ],
      help: {
        title: "Tee säädettävä vaikeuskäyrä",
        tree: "GameManager\n└─ DifficultyController\n   └─ levels[] (näkyy Inspectorissa)\n      ├─ Level 0: minScore 0, itemCount 1, customerTime 15\n      ├─ Level 1: minScore 31, itemCount 2, customerTime 12\n      └─ Level 2: minScore 61, itemCount 3, customerTime 10",
        actions: [
          "Luo serialisoitu DifficultyLevel-luokka. Serialisoitu tarkoittaa, että Unity tallentaa arvot ja näyttää ne Inspectorissa.",
          "Lisää DifficultyControlleriin levels-taulukko ja syötä kolme tasoa Inspectorissa.",
          "Valitse pistemäärälle korkein taso, jonka minScore on saavutettu.",
          "Anna valitun tason itemCount OrderManagerille ja customerTime GameManagerille.",
          "Muuta testissä vain Inspector-arvoja; vaikeuskoodin ei pidä vaatia uutta if-ketjua joka tasolle."
        ],
        code: "using UnityEngine;\n\n[System.Serializable]\npublic class DifficultyLevel\n{\n    public int minScore;\n    public int itemCount;\n    public float customerTime;\n}\n\npublic class DifficultyController : MonoBehaviour\n{\n    [SerializeField] private DifficultyLevel[] levels;\n\n    public DifficultyLevel GetLevel(int score)\n    {\n        // TODO: palauta korkein taso, jonka minScore <= score\n        return levels[0];\n    }\n}",
        test: "Anna testissä pisteiksi 0, 31 ja 61. Tilauskoko ja asiakasaika vastaavat joka kerralla suunnitelman taulukkoa."
      },
      example: "0–30 p: 1 tuote / 15 s; 31–60 p: 2 tuotetta / 12 s; 61+ p: 3 tuotetta / 10 s.",
      notEnough: "Tekoälyn valitsema vaikeusmalli ilman kahden vaihtoehdon vertailua ja omaa pelitestiä ei osoita perusteltua päätöstä."
    },

    40: {
      type: "feature",
      feature: "Viisi parasta tulosta ja nimimerkit säilyvät, vaikka pelin sulkee ja avaa uudelleen.",
      excerpt: "Pelaajan parhaat tulokset pitää tallentaa.",
      connection: "Kun kahvilavuoro päättyy, viiden parhaan tuloksen lista tallentuu Unityn PlayerPrefsiin ja näkyy vielä WebGL-pelin uudelleenkäynnistyksen jälkeen.",
      deliverable: "Toimiva top 5 -tallennus, nimimerkin validointi ja ratkaisun rajoitusten perustelu.",
      why: "Toimeksianto vaatii pysyvän tuloksen. Samalla osoitat, että osaat valita pieneen selaimessa toimivaan peliin sopivan tallennustavan ja käsitellä epäluotettavaa syötettä.",
      done: "Kuudesta tuloksesta näkyy vain viisi parasta vielä sivun uudelleenavauksen jälkeen. Tyhjä tallennus, tasapisteet ja liian pitkä nimimerkki on testattu.",
      record: "Kirjoita Vko 40 -merkintään, miksi ScoreList tallennetaan JSON-merkkijonona PlayerPrefsiin, mitä ratkaisu ei suojaa ja mitä dataa ei tallenneta. Lisää commit ja nimetyt WebGL-testit.",
      skills: ["PlayerPrefs", "validointi", "tietoturva"],
      steps: [
        ["Tallenna top 5", "ScoreList sisältää enintään viisi ScoreEntry-riviä. Järjestä lista pisteillä, poista kuudenneksi jäävä ja lataa lista seuraavalla käynnistyksellä."],
        ["Perustele ratkaisu", "Kirjoita tämän viikon projektipäiväkirjan Miksi-kenttään, miksi ScoreList tallennetaan JSON-merkkijonona PlayerPrefsiin, missä selain säilyttää tiedon ja mitä rajoituksia ratkaisulla on."],
        ["Validoi ja testaa", "Rajaa nimimerkki, käsittele puuttuva tallennus ja testaa tyhjä lista, kuudes tulos, tasapisteet sekä WebGL-uudelleenkäynnistys."]
      ],
      help: {
        title: "Tallenna top 5 PlayerPrefsiin",
        tree: "CafeGame\n├─ SaveService [SaveService.cs]\n└─ Canvas\n   └─ ResultPanel\n      ├─ NicknameInput (TMP_InputField)\n      ├─ SaveScoreButton\n      └─ HighScoresText (TextMeshPro)",
        actions: [
          "Luo ScoreEntry (nickname, score) ja ScoreList (entries). PlayerPrefs on Unityn pieni avain–arvo-tallennus selaimessa tai laitteella.",
          "Kun kierros loppuu, validoi nimimerkki, lisää tulos, järjestä pisteet suurimmasta pienimpään ja pidä vain viisi.",
          "Muunna wrapper-lista JsonUtility.ToJson-metodilla ja tallenna merkkijono HighScores-avaimeen.",
          "Lataa merkkijono PlayerPrefs.GetString-metodilla. Jos avainta ei ole, luo tyhjä lista.",
          "Näytä viisi riviä ResultPanelissa ja testaa WebGL-buildissa, ei vain Play Modessa."
        ],
        code: "using System.Collections.Generic;\nusing UnityEngine;\n\n[System.Serializable]\npublic class ScoreEntry\n{\n    public string nickname;\n    public int score;\n}\n\n[System.Serializable]\npublic class ScoreList\n{\n    public List<ScoreEntry> entries = new List<ScoreEntry>();\n}\n\npublic class SaveService : MonoBehaviour\n{\n    private ScoreList scoreList = new ScoreList();\n\n    public void SaveScore(string nickname, int score)\n    {\n        // TODO: validoi nimimerkki\n        // TODO: lisää, järjestä ja pidä viisi parasta\n        PlayerPrefs.SetString(\"HighScores\", JsonUtility.ToJson(scoreList));\n        PlayerPrefs.Save();\n    }\n\n    public ScoreList LoadScores()\n    {\n        // TODO: jos avainta ei ole, palauta tyhjä ScoreList\n        // TODO: muunna tallennettu JSON takaisin ScoreListiksi\n        return new ScoreList();\n    }\n}",
        test: "Tallenna kuusi eri tulosta, sulje välilehti ja avaa peli uudelleen. Vain viisi parasta näkyy samassa järjestyksessä.",
        images: [
          ["assets/unity/vko40-resultpanel.png", "Unityn Game-näkymä ResultPanelista: lopputulos, nimimerkkikenttä, Tallenna tulos -painike ja viiden parhaan tuloksen lista.", "ResultPanel: nimimerkki, tallennus ja top 5 -lista."]
        ]
      },
      example: "ScoreList → JsonUtility.ToJson → PlayerPrefs.SetString(\"HighScores\", json) → käynnistä uudelleen → sama top 5 näkyy.",
      notEnough: "Inspectorissa tai koodissa näkyvä arvo ei osoita pysyvää latausta. Älä tallenna tai syötä tekoälylle salasanoja, avaimia tai henkilötietoja."
    },

    41: {
      type: "katselmointi",
      feature: "Asiakas pelaa peliä ensimmäistä kertaa ja antaa palautteen. Yksi muutos sovitaan.",
      excerpt: "Haluan nähdä pelistä toimivan version vähintään kerran ennen lopullista versiota, jotta voin pyytää muutoksia.",
      connection: "Asiakas pelaa nyt kahvilapelin oikean toimintakierron. Sinä tarkkailet, missä tilaus, tuotteiden valinta tai palaute jää epäselväksi.",
      deliverable: "Asiakkaan kokeilema väliversio, katselmointimuistio ja yksi hyväksytty muutostehtävä.",
      why: "Palaute tarvitaan ennen viimeistelyä, jotta muutokselle jää aikaa. Asiakkaan alkuperäisen havainnon erottaminen omasta tulkinnastasi tekee päätöksestä luotettavan.",
      done: "Asiakas on pelannut buildin alusta loppuun. Muistiossa näkyvät alkuperäinen palaute, oma tulkinta, päätös, hyväksyjä ja yksi rajattu issue.",
      record: "Kirjoita Vko 41 -merkintään buildin tunniste, katselmoinnin päivä, osallistujien roolit, asiakkaan sanat, oma tulkinta ja linkki hyväksyttyyn muutostehtävään.",
      skills: ["asiakasviestintä", "katselmointi", "priorisointi"],
      steps: [
        ["Valmistele WebGL-kokeiluversio", "Buildissa toimivat valikko, 1–3 tuotteen tilaus, toimitus, pisteet, vaikeus, tulos ja PlayerPrefs-tallennus."],
        ["Anna asiakkaan pelata", "Pyydä pelaamaan alusta loppuun. Älä neuvo heti, vaan kirjaa alkuperäinen havainto ja kysy tarkentava kysymys."],
        ["Päätä yksi muutos", "Yhdistä palaute yhteen rajattuun issueen, arvioon ja hyväksymisehtoon. Päivitä backlog vasta päätöksen jälkeen."]
      ],
      example: "Palaute: “Tilausta ei huomaa.” Päätös: suurennetaan tilauskortti / P0 / 2 h / hyväksytty 9.10.",
      notEnough: "Itse tai tekoälyllä keksitty asiakaspalaute ei ole katselmointi. Tallenna asiakkaan alkuperäinen havainto erikseen omasta tulkinnastasi."
    },

    43: {
      type: "feature",
      termit: ["branch", "pull request"],
      feature: "Asiakkaan pyytämä muutos on pelattavana. Vanha toiminnallisuus toimii edelleen.",
      excerpt: "Haluan myös nähdä pelistä toimivan version vähintään kerran ennen lopullista versiota, jotta voin pyytää muutoksia.",
      connection: "Toteutat asiakkaan valitseman muutoksen Unity-projektissa niin, että alkuperäinen pelin toimintakierto säilyy toimivana.",
      deliverable: "Asiakaspalautteeseen jäljitettävä, katselmoitu ja testattu muutos omassa Git-haarassa.",
      why: "Erillinen Git-haara eli branch pitää toimivan main-haaran eli pääversion turvassa ja näyttää, miten palaute muuttui tehtäväksi, koodiksi, testiksi ja hyväksytyksi muutokseksi.",
      done: "Muutos täyttää hyväksymisehdon, vanha pelipolku toimii, katselmointiin on vastattu ja muutos on yhdistetty main-haaraan.",
      record: "Kirjoita Vko 43 -merkintään ketju: asiakaspalaute → GitHub-issue → Git-haara → pull request (PR) tai suora yhdistäminen eli merge → commit → hyväksymistesti. Lisää täsmälliset linkit.",
      skills: ["GitHub-issue", "feature-branch", "katselmointi"],
      steps: [
        ["Kirjoita muutos pelitehtäväksi", "Liitä asiakkaan palaute GitHub-issueen ja kerro, mitä kahvilapelin näkymää tai toimintoa muutetaan."],
        ["Toteuta erillään", "Aloita toimivasta mainista, tee pieniä committeja feature-branchiin ja testaa tilaus–toimitus–pisteet jokaisen ehjän muutoksen jälkeen."],
        ["Katselmoi ja yhdistä", "Pyydä ihmiseltä kommentti, vastaa siihen ja yhdistä eli mergeä muutos mainiin vasta, kun hyväksymisehto sekä vanha pelin toimintakierto läpäisevät testin."]
      ],
      example: "GitHub-issue: Suurenna tilauskortti. Valmis kun uusi käyttäjä löytää tilauksen 5 sekunnissa. Pull request (PR) sisältää muutoksen ja testin.",
      notEnough: "Suuri suora muutos mainiin tai yksi massacommit katkaisee yhteyden palautteen, toteutuksen ja testin välillä."
    },

    44: {
      type: "feature",
      feature: "Uusi pelaaja ymmärtää tavoitteen ja pelaa kierroksen ilman, että kukaan neuvoo vieressä.",
      excerpt: "Lopullinen peli pitää julkaista niin, että voin itse kokeilla sitä.",
      connection: "Unity-kahvilapelin täytyy kertoa tavoitteensa ilman opettajan vieressä antamia ohjeita. Siksi testaat juuri Canvasin tilausta, tuotepainikkeita, Toimita-painiketta ja palautetta.",
      deliverable: "Lyhyt käytettävyystesti, kaksi perusteltua käyttöliittymämuutosta ja uusintatesti.",
      why: "Julkaistu peli ei saa vaatia tekijää neuvomaan vieressä. Havainnointi paljastaa epäselvyydet, joita oma pelaaminen ei enää huomaa.",
      done: "Toinen käyttäjä löytää tavoitteen ja pelaa yhden tilauksen loppuun ilman suullista ohjetta. Kahdelle muutokselle näkyy ennen- ja jälkeen-tilanne.",
      record: "Kirjoita Vko 44 -merkintään annettu pelitehtävä, alkuperäiset havainnot, tehdyt kaksi muutosta ja uusintatestin tulos. Lisää ennen/jälkeen-kuvat ja commit-linkki.",
      skills: ["Unity UI", "Canvas-palaute", "käyttäjätesti"],
      resources: [
        ["Kenney.nl – käyttöliittymäpaketit ja ikonit (CC0)", "https://kenney.nl/assets", false],
        ["Game-icons.net – tuhansia ikoneita (CC BY, mainitse tekijä)", "https://game-icons.net/", false]
      ],
      steps: [
        ["Anna oikea pelitehtävä", "Pyydä vertaista aloittamaan peli, toimittamaan yksi tilaus ja tarkistamaan tulos ilman suullista ohjetta."],
        ["Kirjaa havainto ennen ratkaisua", "Merkitse esimerkiksi epäröinti, väärä painallus tai kohta, jossa tilaus jäi huomaamatta."],
        ["Korjaa ja testaa uudelleen", "Tee kaksi tärkeintä muutosta kahvilapelin käyttöliittymään ja toista sama tehtävä toisella käyttäjällä."]
      ],
      example: "Havainto: käyttäjä ei löytänyt Aloita-painiketta → kontrasti ja paikka muutettiin → uusintatestissä löytyi ilman vihjettä.",
      notEnough: "Oma mielipide “käyttöliittymä näyttää hyvältä” tai vain kosmeettinen värinvaihto ei ole käytettävyystesti."
    },

    45: {
      type: "laatu",
      termit: ["T01"],
      feature: "Peli ei kaadu rajatapauksissa: aika nollaan, tuplaklikit ja rikottu tuotelista on testattu.",
      excerpt: "Pelissä pitää olla aloitusvalikko, itse peli, pistelasku ja pelin päättymisnäkymä.",
      connection: "Testaat Unity WebGL -buildin koko toimintakierron järjestelmällisesti: aloitus, tilaus, valinta, toimitus, pisteet, aika, vaikeus, PlayerPrefs ja uusi peli.",
      deliverable: "Vähintään 12 testitapauksen testausmatriisi ja kolme täydellistä virheenkorjausketjua.",
      why: "Järjestelmällinen testaus näyttää, että peli toimii myös rajoilla ja virhetilanteissa. Korjausketju todistaa, että osaat löytää syyn etkä vain peittää oiretta.",
      done: "Kaikissa 12 testitapauksessa näkyvät build, lähtötila, toiminta, odotus, havainto ja tulos. Kolmessa ketjussa näkyvät havainto, syy, korjauscommit ja onnistunut uusintatesti.",
      record: "Kirjoita Vko 45 -merkintään testitapaukset T01–T12 ja linkki testausmatriisiin. Nimeä kolme ketjua muodossa havainto tai merkitty vikatehtävä → syy → commit → uusintatesti.",
      skills: ["testitapaus", "virheenkorjaus", "regressiotesti = vanhan toiminnan uusintatesti"],
      resources: [
        ["Avaa näyttöaineisto", "#view-naytto", false]
      ],
      steps: [
        ["Kirjoita 12 testitapausta ennen ajoa", "Jaa ne normaaliin kahvilavuoroon, rajoihin kuten aika 0 sekä puuttuvaan tai rikkinäiseen dataan."],
        ["Tutki aito havainto", "Kirjaa build, lähtötila, toistamisohje, odotus, havainto, syy ja korjaus. Älä keksi bugeja jälkikäteen."],
        ["Riko ja aja uudelleen", "Irrota products.json, käytä rikkinäistä JSONia ja tyhjennä PlayerPrefs. Testaa korjauksen jälkeen myös vähintään yksi viereinen toiminto."]
      ],
      example: "Testitapaus T05 / aika 0 / odotus: tulos näkyy kerran / havainto: näkyi kahdesti / ei läpäissyt / korjauscommit [linkki].",
      notEnough: "Tekoälyn ehdottamaa testiä ei saa merkitä ajetuksi eikä bugia löytyneeksi ilman omaa testiajoa."
    },

    46: {
      type: "laatu",
      feature: "Peli toimii kuten ennen. Koodi on selkeämpi, ja osaat selittää ratkaisut.",
      excerpt: "Tuotteiden tiedot eivät saa olla kovakoodattuna pelilogiikkaan, vaan niiden pitää tulla erillisestä tietolähteestä.",
      connection: "Selkeytät nyt Unity-projektin C#-koodia: tilauksen luonti, pisteiden lasku ja Canvasin päivitys eivät saa olla yhtenä pitkänä MonoBehaviour-metodina.",
      deliverable: "Yksi rajattu refaktorointi eli koodin rakenteen selkeytys pelin toimintaa muuttamatta, sitä ympäröivät testit ja ihmisen tekemä koodikatselmointi.",
      why: "Selkeästi nimetyt ja rajatut vastuut helpottavat virheiden löytämistä sekä myöhempiä muutoksia. Testi varmistaa, ettei rakenteen parantaminen muuta pelin toimintaa.",
      done: "Sama nimetty testi läpäisee ennen ja jälkeen refaktoroinnin. Katselmointikommenttiin on vastattu ja pystyt selittämään ratkaisun ilman tekoälyn vastausta.",
      record: "Kirjoita Vko 46 -merkintään havaittu laatuhaitta, ennen/jälkeen-muutos, testitunniste, katselmoijan rooli, saatu kommentti ja oma vastaus. Lisää diffi- tai commit-linkki.",
      skills: ["C#-ylläpidettävyys", "refaktorointi", "koodikatselmointi"],
      steps: [
        ["Valitse yksi oikea laatuhaitta", "Etsi C#-skripteistä toisto, epäselvä nimi, pitkä Update-metodi tai MonoBehaviour, joka hoitaa sekä tilauksen, pisteet että käyttöliittymän."],
        ["Refaktoroi toimintaa muuttamatta", "Tee yksi rajattu muutos ja aja sama pelin toimintakierron testi ennen ja jälkeen."],
        ["Selitä ratkaisu", "Pyydä ihmisen katselmointi ja selitä yksi oma sekä yksi tekoälyavusteinen kohta omin sanoin."]
      ],
      example: "Ennen: a() laskee pisteet. Jälkeen: CalculateOrderScore() kertoo nimestä, mitä kahvilapelin sääntöä metodi toteuttaa.",
      notEnough: "Pelkkä automaattinen muotoilu tai koko tiedoston tekoälyuudelleenkirjoitus ei osoita perusteltua refaktorointia."
    },

    47: {
      type: "julkaisu",
      termit: ["RC", "tagi"],
      feature: "Koko peli on pelattavana täsmälleen siinä muodossa, jossa se julkaistaan. Uusia ominaisuuksia ei enää lisätä.",
      excerpt: "Lopullinen peli pitää julkaista niin, että voin itse kokeilla sitä.",
      connection: "RC1 on lyhenne sanoista release candidate 1 eli ensimmäinen julkaisuehdokas: koko pelin toimintakierto testataan selaimessa täsmälleen sellaisena kuin se aiotaan julkaista.",
      deliverable: "Jäädytetty RC1-build, kahden henkilön testipalaute ja päätetty julkaisun korjauslista.",
      why: "Ominaisuusjäädytys estää uusia muutoksia rikkomasta lähes valmista peliä. Palautteen luokittelu kohdistaa ajan vain julkaisuun vaikuttaviin virheisiin.",
      done: "RC1 on sidottu yhteen committiin. Asiakas ja toinen käyttäjä ovat testanneet sen, ja jokaisella havainnolla on vakavuus, toistettavuus sekä päätös.",
      record: "Kirjoita Vko 47 -merkintään RC1-tagi eli versionhallintaan merkitty nimetty versio ja sen commit, testaajien roolit, heidän havaintonsa sekä päätös: korjataan nyt, tunnettu puute tai myöhemmin.",
      skills: ["release candidate", "palautteen luokittelu", "julkaisupäätös"],
      steps: [
        ["Nimeä RC1", "Tee yhdestä main-haaran commitista Unity WebGL -build, jossa valikko, kahvilavuoro, tulos ja PlayerPrefs-tallennus toimivat."],
        ["Anna kahden ihmisen testata", "Asiakas ja toinen käyttäjä pelaavat alusta loppuun sekä sulkevat ja avaavat pelin tallennuksen tarkistamiseksi."],
        ["Tee julkaisupäätös", "Kirjaa jokaiselle havainnolle vakavuus, toistettavuus ja päätös: korjataan, tunnettu puute tai myöhemmin."]
      ],
      example: "Pisteet eivät nollaudu / vakava / toistuu aina / korjataan ennen julkaisua / testitapaus T14.",
      notEnough: "Opiskelija tai tekoäly ei voi esiintyä kahtena testaajana, eikä ominaisuusjäädytyksen jälkeen lisätä uusia peliominaisuuksia."
    },

    48: {
      type: "julkaisu",
      feature: "Peli on julkaistu. Linkki toimii muillakin koneilla, ja asiakas voi kokeilla peliä itse.",
      excerpt: "Lopullinen peli pitää julkaista niin, että voin itse kokeilla sitä.",
      connection: "Unity-kahvilapelin toimintakierto siirtyy nyt Editorista GitHub Pagesiin. Testaat julkaistua WebGL-versiota, et Play Modea.",
      deliverable: "GitHub Pagesissa toimiva Unity WebGL v1.0, käyttöohje ja tunnettujen puutteiden lista.",
      why: "Asiakkaan pitää pystyä avaamaan peli itse. Vain julkisen linkin testaaminen osoittaa, että buildin tiedostot, palvelimen asetukset ja tallennus toimivat oikeassa ympäristössä.",
      done: "v1.0-tagin commit vastaa julkaistua versiota. Toinen henkilö avaa linkin toisella selaimella tai laitteella ja pelaa yhden kierroksen ohjeen avulla.",
      record: "Kirjoita Vko 48 -merkintään ketju v1.0-tagi → commit → julkaisulinkki. Lisää testattu selain tai laite, testaajan rooli, testitulos ja tunnetut puutteet.",
      skills: ["Unity WebGL", "GitHub Pages", "käyttöohje"],
      steps: [
        ["Rakenna puhtaasta mainista", "Vaihda Unityn Build Profiles -näkymässä WebGL-alustaan (vanhemmassa versiossa Build Settings). Tee v1.0-tagi ja build repositoryn docs-kansioon."],
        ["Testaa oikea julkaisu", "Avaa linkki toisella laitteella tai selaimella ja pelaa aloituksesta tulokseen sekä tarkista tallennus."],
        ["Kirjoita lyhyt ohje", "Kerro: avaa linkki → Aloita → valitse tilauksen tuotteet → Toimita. Lisää tunnetut puutteet."]
      ],
      help: {
        title: "Julkaise Unity WebGL GitHub Pagesiin",
        tree: "repository/\n├─ Assets/\n├─ Packages/\n├─ ProjectSettings/\n└─ docs/ (GitHub Pagesin julkaisulähde)\n   ├─ .nojekyll\n   ├─ index.html (Unityn luoma)\n   ├─ Build/\n   └─ TemplateData/",
        actions: [
          "Avaa Build Profiles (tai Build Settings), valitse WebGL ja lisää CafeGame scene listaan.",
          "Avaa Player Settings → Web → Publishing Settings. GitHub Pagesissa et voi itse asettaa palvelimen pakkausotsakkeita, joten ota Decompression Fallback käyttöön ensimmäisessä julkaisussa.",
          "Tee build repositoryn docs-kansioon ja lisää sinne tyhjä .nojekyll-tiedosto. Varmista, että docs/index.html, Build ja TemplateData ovat mukana Gitissä.",
          "Avaa GitHubissa Settings → Pages → Deploy from a branch → main → /docs ja tallenna.",
          "Odota julkaisua, avaa annettu https-linkki ja tarkista selaimen konsolista, ettei latauksessa tule 404-virhettä (tiedostoa ei löydy) tai purkuvirhettä."
        ],
        code: "Julkaisun tarkistuslista\n[ ] WebGL valittu\n[ ] CafeGame mukana scene-listassa\n[ ] Decompression Fallback käytössä\n[ ] docs/.nojekyll mukana\n[ ] docs/index.html + Build + TemplateData Gitissä\n[ ] Pages: main /docs\n[ ] julkaistu linkki testattu toisella selaimella",
        test: "Avaa julkaistu linkki yksityisessä selainikkunassa. Pelaa yksi kierros, päivitä sivu ja tarkista top 5. Jos build ei lataudu, tarkista ensin tiedostopolut ja selaimen Console.",
        images: [
          ["assets/unity/vko48-decompression-fallback.png", "Unityn Player Settings, Settings for Web: Publishing Settings avattuna ja Decompression Fallback -valinta käytössä.", "Player Settings → Web → Publishing Settings: Decompression Fallback päälle ensimmäisessä julkaisussa."],
          ["assets/unity/vko48-github-pages.png", "GitHubin Pages-asetussivu: Source-valintana Deploy from a branch ja Branch-valinnassa main-haara.", "GitHub: Settings → Pages → Deploy from a branch → valitse main ja pelisivustollesi /docs-kansio."]
        ],
        links: [
          ["Unity: Web-julkaisun asetukset", "https://docs.unity3d.com/6000.0/Documentation/Manual/webgl-deploying.html"],
          ["GitHub: Pages-julkaisulähde", "https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site"]
        ]
      },
      example: "README: Avaa [linkki] → Aloita → valitse tuotteet → Toimita. Testattu Chrome 128 / v1.0 / tunnettu puute: [asia].",
      notEnough: "Editorikuva tai “toimii omalla koneella” ei osoita, että asiakas pystyy avaamaan julkaistun pelin."
    },

    49: {
      type: "naytto",
      feature: "Peli, repository ja projektipäiväkirja todistavat osaamisesi ilman suullista selitystä.",
      excerpt: "Lopullinen peli pitää julkaista niin, että voin itse kokeilla sitä.",
      connection: "Et enää muuta Unity-projektin gameplayta. Yhdistät jokaisen kahvilapelin vaatimuksen täsmälliseen C#-tiedostoon, testiin, buildiin ja Gitin työnäytteeseen.",
      deliverable: "Valmis projektipäiväkirja, näyttömatriisi, itsearviointi, jäädytetty v1.0 ja harjoiteltu demo.",
      why: "Arvioija voi arvioida vain näkyvän ja löydettävän osaamisen. Täsmälliset linkit säästävät aikaa ja osoittavat, miten vaatimus muuttui suunnitelmaksi, toteutukseksi ja testiksi.",
      done: "Jokaisella arviointikohdalla on avautuva täsmälinkki tai tunniste. Projektipäiväkirja ja AI-loki ovat repositoryssä, ja demo käyttää samaa jäädytettyä v1.0-versiota.",
      record: "Kirjoita Vko 49 -merkintään itsearviointi: kolme vahvuutta työnäytteineen ja yksi seuraava kehitysaskel. Lisää linkit näyttömatriisiin, AI-lokiin, v1.0-versioon ja demon runkoon.",
      skills: ["näyttömatriisi", "itsearviointi", "demo"],
      resources: [
        ["Avaa näyttömatriisi", "#view-naytto", false],
        ["Avaa ja lataa AI-loki", "#view-ailoki", false]
      ],
      steps: [
        ["Viimeistele päiväkirja", "Jäädytä v1.0, tarkista jokaisen viikon merkintä, lataa koko projektipäiväkirja project-docs-kansioon ja kirjoita itsearviointi omaan aineistoon nojaten."],
        ["Tee syvälinkit", "Liitä jokainen näyttömatriisin vaatimus suoraan issueen, C#-tiedostoon, commitiin, testiriviin tai palautepäätökseen."],
        ["Harjoittele ja luovuta", "Näytä 8–10 minuutissa pelin toimintakierto, JSON-tuotelista, tallennus, bugikorjaus, Git ja AI-loki. Anna toisen henkilön avata palautus ennen 4.12."]
      ],
      example: "Näyttömatriisin kohta Toimintojen testaus → project-docs/projektipaivakirja.md#vko-45 → testitapaukset T05–T16 → build v1.0 → tarkka linkki.",
      notEnough: "Pelkkä rastitettu matriisi, repositoryn etusivulinkki tai tekoälyn kirjoittama kokemuksellinen itsearviointi ei riitä.",
      paivat: [
        ["Ma 30.11.", "Koodijäädytys: Viimeinen hyväksytty build."],
        ["Ti 1.12.", "Aineisto: Päiväkirja, testit ja linkit."],
        ["Ke 2.12.", "Harjoittelu: 8–10 min demo ja itsearviointi."],
        ["To 3.12.", "Puskuri: Tarkistus toisen henkilön kanssa."],
        ["Pe 4.12.", "Luovutus: Peli, repository, projektipäiväkirja ja näyttö."]
      ]
    }
  }
};

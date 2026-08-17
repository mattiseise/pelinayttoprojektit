(function () {
  "use strict";

  const STORAGE_KEY = "kahvilakoodi-progress-v1";
  const EVIDENCE_KEY = "kahvilakoodi-evidence-v1";
  const LOG_KEY = "kahvilakoodi-ai-log-v1";
  const JOURNAL_KEY = "kahvilakoodi-journal-v1";
  const GDD_KEY = "kahvilakoodi-gdd-v1";
  const taskBoxes = [...document.querySelectorAll("[data-task]")];
  const evidenceBoxes = [...document.querySelectorAll("[data-evidence]")];
  const weekCards = [...document.querySelectorAll(".week-card")];

  // Viikkotyyppien kehystekstit: feature-viikot puhuvat pelifeaturesta,
  // muut viikot viikon havaittavasta lopputuloksesta (pedagoginen runko §4).
  const weekFraming = {
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
  };

  const weekGuidance = {
    34: {
      type: "pohjustus",
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
        ["Perusta Git", "Lisää README, project-docs-kansio ja Unity-.gitignore. Gitissä ovat Assets, Packages ja ProjectSettings; Library jää pois. Tee ensimmäinen commit ja push."]
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
      notEnough: "Kahdeksan lähes samaa tekoälykysymystä tai itse keksityt asiakkaan vastaukset eivät osoita asiakastarpeen selvittämistä."
    },
    35: {
      type: "pohjustus",
      feature: "Viikon jälkeen peli on paperilla: kolme ruutua ja featuret tekojärjestyksessä. Asiakas on hyväksynyt rajauksen.",
      excerpt: "Pelissä pitää olla aloitusvalikko, itse peli, pistelasku ja pelin päättymisnäkymä.",
      connection: "Nyt muutat toimeksiannon näkyväksi Unity-suunnitelmaksi: Canvas-näkymät, pelin toimintakierto, C#-vastuut, tehtävät ja valmiin työn ehdot.",
      deliverable: "Hyväksytty pakollinen perusversio, pieni backlog, käyttöliittymäluonnos ja Unityn tekninen rakennekuva.",
      why: "Rajaus estää projektia kasvamasta liian suureksi. Kun jokaisella tehtävällä on selvä valmis kun -ehto, tiedät mitä seuraavaksi tehdään ja milloin työ voidaan testata.",
      done: "Pakollinen perusversio on hyväksytty. Jokaisella P0-tehtävällä on 0,5–1 päivän arvio ja havaittava valmis kun -ehto. Mockupissa näkyvät valikko, peli ja tulos.",
      record: "Kirjoita Vko 35 -merkintään, mitkä GDD-päätökset teit ja miksi, hyväksyjän rooli ja päivä sekä mitkä asiat jäivät asiakkaalle avoimiksi. Lisää linkit gdd.md-tiedostoon, backlogiin, mockupiin ja rakennekuvaan.",
      skills: ["rajaus", "Unity UI", "työn pilkkominen"],
      resources: [
        ["Täytä GDD tällä sivulla", "#gdd", false],
        ["Avaa koko toimeksianto", "#toimeksianto", false]
      ],
      steps: [
        ["Täytä GDD", "Täytä GDD:n omat päätökset tällä sivulla: kirjoita tavoite ja oma roolisi omin sanoin, nimeä peli, valitse tyyli ja grafiikan lähde lisensseineen ja päätä pisteytys perusteluineen. Lataa gdd.md ja vie se project-docs-kansioon."],
        ["Tee pieni backlog", "Kirjoita jokainen kahvilapelin P0-toiminto omaksi 0,5–1 päivän issueksi. Lisää prioriteetti ja havaittava valmis kun -ehto."],
        ["Piirrä Unity-ratkaisu", "Luonnostele kolme Canvas-paneelia ja pelin toimintakierto. Jaa C#-vastuut GameManager-, OrderManager-, ProductDatabase-, UIController- ja SaveService-skripteille."]
      ],
      help: {
        title: "Tee issue, mockup ja vastuurakenne",
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
      feature: "Peliä voi pelata ensimmäistä kertaa: Aloita → asiakas tilaa kahvin → toimitat → piste → tulosruutu.",
      excerpt: "Pelaajan tehtävänä on toimittaa oikea tilaus mahdollisimman nopeasti.",
      connection: "Rakennat Unityyn pelin toimintakierron ensimmäisen päästä päähän toimivan version. Yksi kiinteä kahvitilaus riittää nyt todistamaan koko polun; lopullinen 1–3 tuotteen tilaus tulee seuraavaksi.",
      deliverable: "Ensimmäinen pelattava WebGL-versio, jossa polku toimii valikosta yhden tilauksen kautta tulosruutuun.",
      why: "Pieni päästä päähän toimiva versio paljastaa scene-, Canvas- ja painikekytkentöjen ongelmat aikaisin. Sen päälle on turvallisempi lisätä loput ominaisuudet.",
      done: "Aloita → Kahvi → Toimita → pisteet → aika loppuu → tulos toimii WebGL-buildissa ilman, että muutat Unity Editorissa objekteja kesken pelin.",
      record: "Kirjoita Vko 36 -merkintään buildin tunniste, viisi testikierrosta ja tulokset. Lisää yhtenäinen video tai muu todiste koko pelipolusta sekä commit- ja testitunnisteet.",
      skills: ["Unity Canvas", "pelitilat", "ensimmäinen testi"],
      resources: [
        ["Kenney.nl – ilmaiset CC0-spritet: hahmot, esineet ja UI", "https://kenney.nl/assets", false],
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
      feature: "Tilaukset arvotaan tuotelistasta. Valikoimaa voi muuttaa koskematta koodiin.",
      excerpt: "Tuotteiden tiedot eivät saa olla kovakoodattuna pelilogiikkaan, vaan niiden pitää tulla erillisestä tietolähteestä.",
      connection: "Pelin toimintakierron tilaus syntyy nyt Unityyn tuodusta JSON-datasta. Kahvi, tee ja sämpylä eivät enää ole kirjoitettuina suoraan C#-tilauskoodiin.",
      deliverable: "products.json, ProductDatabase.cs, 1–3 tuotteen tilauslogiikka ja virhetilanteiden käsittely.",
      why: "Erillinen tietolähde tekee tuotteiden muuttamisesta helppoa ja osoittaa, että osaat siirtää dataa tiedostosta C#-olioiksi ilman käyttöliittymän ja pelisääntöjen sekoittamista.",
      done: "Kahvin pistearvon muuttaminen JSONissa näkyy pelissä ilman C#-muutosta. Puuttuva tai rikkinäinen JSON näyttää hallitun virheen eikä riko koko peliä.",
      record: "Kirjoita Vko 37 -merkintään JSON-tiedoston polku, tiedon kulku JSON → ProductDatabase → OrderManager → UI, commit-linkki ja puuttuvan sekä rikkinäisen datan testitulokset.",
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
      example: "{ \"products\": [{ \"id\": \"kahvi\", \"name\": \"Kahvi\", \"points\": 10 }] } → JsonUtility → ProductDatabase → OrderManager → UI.",
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
        title: "Kytke pisteet, aika ja UI",
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
      feature: "Asiakkaan pyytämä muutos on pelattavana. Vanha toiminnallisuus toimii edelleen.",
      excerpt: "Haluan myös nähdä pelistä toimivan version vähintään kerran ennen lopullista versiota, jotta voin pyytää muutoksia.",
      connection: "Toteutat asiakkaan valitseman muutoksen Unity-projektissa niin, että alkuperäinen pelin toimintakierto säilyy toimivana.",
      deliverable: "Asiakaspalautteeseen jäljitettävä, katselmoitu ja testattu muutos omassa Git-haarassa.",
      why: "Erillinen Git-haara pitää toimivan main-version turvassa ja näyttää, miten palaute muuttui tehtäväksi, koodiksi, testiksi ja hyväksytyksi muutokseksi.",
      done: "Muutos täyttää hyväksymisehdon, vanha pelipolku toimii, katselmointiin on vastattu ja muutos on yhdistetty main-haaraan.",
      record: "Kirjoita Vko 43 -merkintään ketju: asiakaspalaute → issue → Git-haara → pull request tai merge → commit → hyväksymistesti. Lisää täsmälliset linkit.",
      skills: ["issue", "feature-branch", "katselmointi"],
      steps: [
        ["Kirjoita muutos pelitehtäväksi", "Liitä asiakkaan palaute issueen ja kerro, mitä kahvilapelin näkymää tai toimintoa muutetaan."],
        ["Toteuta erillään", "Aloita toimivasta mainista, tee pieniä committeja feature-branchiin ja testaa tilaus–toimitus–pisteet jokaisen ehjän muutoksen jälkeen."],
        ["Katselmoi ja yhdistä", "Pyydä ihmiseltä kommentti, vastaa siihen ja yhdistä vasta, kun hyväksymisehto sekä vanha pelin toimintakierto läpäisevät testin."]
      ],
      example: "Issue: Suurenna tilauskortti. Valmis kun uusi käyttäjä löytää tilauksen 5 sekunnissa. PR sisältää muutoksen ja testin.",
      notEnough: "Suuri suora muutos mainiin tai yksi massacommit katkaisee yhteyden palautteen, toteutuksen ja testin välillä."
    },
    44: {
      type: "feature",
      feature: "Uusi pelaaja ymmärtää tavoitteen ja pelaa kierroksen ilman, että kukaan neuvoo vieressä.",
      excerpt: "Lopullinen peli pitää julkaista niin, että voin itse kokeilla sitä.",
      connection: "Unity-kahvilapelin täytyy kertoa tavoitteensa ilman opettajan vieressä antamia ohjeita. Siksi testaat juuri Canvasin tilausta, tuotepainikkeita, Toimita-painiketta ja palautetta.",
      deliverable: "Lyhyt käytettävyystesti, kaksi perusteltua UI-muutosta ja uusintatesti.",
      why: "Julkaistu peli ei saa vaatia tekijää neuvomaan vieressä. Havainnointi paljastaa epäselvyydet, joita oma pelaaminen ei enää huomaa.",
      done: "Toinen käyttäjä löytää tavoitteen ja pelaa yhden tilauksen loppuun ilman suullista ohjetta. Kahdelle muutokselle näkyy ennen- ja jälkeen-tilanne.",
      record: "Kirjoita Vko 44 -merkintään annettu pelitehtävä, alkuperäiset havainnot, tehdyt kaksi muutosta ja uusintatestin tulos. Lisää ennen/jälkeen-kuvat ja commit-linkki.",
      skills: ["Unity UI", "Canvas-palaute", "käyttäjätesti"],
      resources: [
        ["Kenney.nl – UI-paketit ja ikonit (CC0)", "https://kenney.nl/assets", false],
        ["Game-icons.net – tuhansia ikoneita (CC BY, mainitse tekijä)", "https://game-icons.net/", false]
      ],
      steps: [
        ["Anna oikea pelitehtävä", "Pyydä vertaista aloittamaan peli, toimittamaan yksi tilaus ja tarkistamaan tulos ilman suullista ohjetta."],
        ["Kirjaa havainto ennen ratkaisua", "Merkitse esimerkiksi epäröinti, väärä painallus tai kohta, jossa tilaus jäi huomaamatta."],
        ["Korjaa ja testaa uudelleen", "Tee kaksi tärkeintä muutosta kahvilapelin UI:hin ja toista sama tehtävä toisella käyttäjällä."]
      ],
      example: "Havainto: käyttäjä ei löytänyt Aloita-painiketta → kontrasti ja paikka muutettiin → uusintatestissä löytyi ilman vihjettä.",
      notEnough: "Oma mielipide “UI näyttää hyvältä” tai vain kosmeettinen värinvaihto ei ole käytettävyystesti."
    },
    45: {
      type: "laatu",
      feature: "Peli ei kaadu rajatapauksissa: aika nollaan, tuplaklikit ja rikottu tuotelista on testattu.",
      excerpt: "Pelissä pitää olla aloitusvalikko, itse peli, pistelasku ja pelin päättymisnäkymä.",
      connection: "Testaat Unity WebGL -buildin koko toimintakierron järjestelmällisesti: aloitus, tilaus, valinta, toimitus, pisteet, aika, vaikeus, PlayerPrefs ja uusi peli.",
      deliverable: "Vähintään 12 testitapauksen testausmatriisi ja kolme täydellistä virheenkorjausketjua.",
      why: "Järjestelmällinen testaus näyttää, että peli toimii myös rajoilla ja virhetilanteissa. Korjausketju todistaa, että osaat löytää syyn etkä vain peittää oiretta.",
      done: "Kaikissa 12 testissä näkyvät build, lähtötila, toiminta, odotus, havainto ja tulos. Kolmessa ketjussa näkyvät havainto, syy, korjauscommit ja onnistunut uusintatesti.",
      record: "Kirjoita Vko 45 -merkintään testit T01–T12 ja linkki testausmatriisiin. Nimeä kolme ketjua muodossa havainto tai merkitty vikatehtävä → syy → commit → uusintatesti.",
      skills: ["testitapaus", "debuggaus", "regressiotesti = vanhan toiminnan uusintatesti"],
      resources: [
        ["Avaa näytön todisteet", "#todisteet", false]
      ],
      steps: [
        ["Kirjoita 12 testiä ennen ajoa", "Jaa ne normaaliin kahvilavuoroon, rajoihin kuten aika 0 sekä puuttuvaan tai rikkinäiseen dataan."],
        ["Tutki aito havainto", "Kirjaa build, lähtötila, toistamisohje, odotus, havainto, syy ja korjaus. Älä keksi bugeja jälkikäteen."],
        ["Riko ja aja uudelleen", "Irrota products.json, käytä rikkinäistä JSONia ja tyhjennä PlayerPrefs. Testaa korjauksen jälkeen myös vähintään yksi viereinen toiminto."]
      ],
      example: "T05 / aika 0 / odotus: tulos näkyy kerran / havainto: näkyi kahdesti / ei läpäissyt / korjauscommit [linkki].",
      notEnough: "Tekoälyn ehdottamaa testiä ei saa merkitä ajetuksi eikä bugia löytyneeksi ilman omaa testiajoa."
    },
    46: {
      type: "laatu",
      feature: "Peli toimii kuten ennen. Koodi on selkeämpi, ja osaat selittää ratkaisut.",
      excerpt: "Tuotteiden tiedot eivät saa olla kovakoodattuna pelilogiikkaan, vaan niiden pitää tulla erillisestä tietolähteestä.",
      connection: "Selkeytät nyt Unity-projektin C#-koodia: tilauksen luonti, pisteiden lasku ja Canvasin päivitys eivät saa olla yhtenä pitkänä MonoBehaviour-metodina.",
      deliverable: "Yksi rajattu refaktorointi, sitä ympäröivät testit ja ihmisen tekemä koodikatselmointi.",
      why: "Selkeästi nimetyt ja rajatut vastuut helpottavat virheiden löytämistä sekä myöhempiä muutoksia. Testi varmistaa, ettei rakenteen parantaminen muuta pelin toimintaa.",
      done: "Sama nimetty testi läpäisee ennen ja jälkeen refaktoroinnin. Katselmointikommenttiin on vastattu ja pystyt selittämään ratkaisun ilman tekoälyn vastausta.",
      record: "Kirjoita Vko 46 -merkintään havaittu laatuhaitta, ennen/jälkeen-muutos, testitunniste, katselmoijan rooli, saatu kommentti ja oma vastaus. Lisää diffi- tai commit-linkki.",
      skills: ["C#-ylläpidettävyys", "refaktorointi", "koodikatselmointi"],
      steps: [
        ["Valitse yksi oikea laatuhaitta", "Etsi C#-skripteistä toisto, epäselvä nimi, pitkä Update-metodi tai MonoBehaviour, joka hoitaa sekä tilauksen, pisteet että UI:n."],
        ["Refaktoroi toimintaa muuttamatta", "Tee yksi rajattu muutos ja aja sama pelin toimintakierron testi ennen ja jälkeen."],
        ["Selitä ratkaisu", "Pyydä ihmisen katselmointi ja selitä yksi oma sekä yksi tekoälyavusteinen kohta omin sanoin."]
      ],
      example: "Ennen: a() laskee pisteet. Jälkeen: CalculateOrderScore() kertoo nimestä, mitä kahvilapelin sääntöä metodi toteuttaa.",
      notEnough: "Pelkkä automaattinen muotoilu tai koko tiedoston tekoälyuudelleenkirjoitus ei osoita perusteltua refaktorointia."
    },
    47: {
      type: "julkaisu",
      feature: "Koko peli on pelattavana täsmälleen siinä muodossa, jossa se julkaistaan. Uusia ominaisuuksia ei enää lisätä.",
      excerpt: "Lopullinen peli pitää julkaista niin, että voin itse kokeilla sitä.",
      connection: "Release candidate 1 eli RC1 on Unity WebGL -pelin ensimmäinen julkaisuehdokas: koko pelin toimintakierto testataan selaimessa sellaisena kuin se aiotaan julkaista.",
      deliverable: "Jäädytetty RC1-build, kahden henkilön testipalaute ja päätetty julkaisun korjauslista.",
      why: "Ominaisuusjäädytys estää uusia muutoksia rikkomasta lähes valmista peliä. Palautteen luokittelu kohdistaa ajan vain julkaisuun vaikuttaviin virheisiin.",
      done: "RC1 on sidottu yhteen committiin. Asiakas ja toinen käyttäjä ovat testanneet sen, ja jokaisella havainnolla on vakavuus, toistettavuus sekä päätös.",
      record: "Kirjoita Vko 47 -merkintään RC1-tagi ja commit, testaajien roolit, heidän havaintonsa sekä päätös: korjataan nyt, tunnettu puute tai myöhemmin.",
      skills: ["release candidate", "palautteen luokittelu", "julkaisupäätös"],
      steps: [
        ["Nimeä RC1", "Tee yhdestä main-commitista Unity WebGL -build, jossa valikko, kahvilavuoro, tulos ja PlayerPrefs-tallennus toimivat."],
        ["Anna kahden ihmisen testata", "Asiakas ja toinen käyttäjä pelaavat alusta loppuun sekä sulkevat ja avaavat pelin tallennuksen tarkistamiseksi."],
        ["Tee julkaisupäätös", "Kirjaa jokaiselle havainnolle vakavuus, toistettavuus ja päätös: korjataan, tunnettu puute tai myöhemmin."]
      ],
      example: "Pisteet eivät nollaudu / vakava / toistuu aina / korjataan ennen julkaisua / testi T47-04.",
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
          "Odota julkaisua, avaa annettu https-linkki ja tarkista selaimen konsolista, ettei latauksessa tule 404- tai purkuvirhettä."
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
      connection: "Et enää muuta Unity-projektin gameplayta. Yhdistät jokaisen kahvilapelin vaatimuksen täsmälliseen C#-tiedostoon, testiin, buildiin ja Git-todisteeseen.",
      deliverable: "Valmis projektipäiväkirja, näyttömatriisi, itsearviointi, jäädytetty v1.0 ja harjoiteltu demo.",
      why: "Arvioija voi arvioida vain näkyvän ja löydettävän osaamisen. Täsmälliset linkit säästävät aikaa ja osoittavat, miten vaatimus muuttui suunnitelmaksi, toteutukseksi ja testiksi.",
      done: "Jokaisella arviointikohdalla on avautuva täsmälinkki tai tunniste. Projektipäiväkirja ja AI-loki ovat repositoryssa, ja demo käyttää samaa jäädytettyä v1.0-versiota.",
      record: "Kirjoita Vko 49 -merkintään itsearviointi: kolme vahvuutta todisteineen ja yksi seuraava kehitysaskel. Lisää linkit näyttömatriisiin, AI-lokiin, v1.0-versioon ja demon runkoon.",
      skills: ["näyttömatriisi", "itsearviointi", "demo"],
      resources: [
        ["Avaa näyttömatriisi", "#todisteet", false],
        ["Avaa ja lataa AI-loki", "#tekoaly", false]
      ],
      steps: [
        ["Viimeistele päiväkirja", "Jäädytä v1.0, tarkista jokaisen viikon merkintä, lataa koko projektipäiväkirja project-docs-kansioon ja kirjoita itsearviointi omiin todisteisiin nojaten."],
        ["Tee syvälinkit", "Liitä jokainen näyttömatriisin vaatimus suoraan issueen, C#-tiedostoon, commitiin, testiriviin tai palautepäätökseen."],
        ["Harjoittele ja luovuta", "Näytä 8–10 minuutissa pelin toimintakierto, JSON, tallennus, bugikorjaus, Git ja AI-loki. Anna toisen henkilön avata palautus ennen 4.12."]
      ],
      example: "P3 Toimintojen testaus → project-docs/projektipaivakirja.md#vko-45 → testit T05–T16 → build v1.0 → tarkka linkki.",
      notEnough: "Pelkkä rastitettu matriisi, repositoryn etusivulinkki tai tekoälyn kirjoittama kokemuksellinen itsearviointi ei riitä."
    }
  };

  function enhanceWeekCards() {
    weekCards.forEach((card) => {
      const guide = weekGuidance[card.dataset.week];
      if (!guide) return;
      const content = card.querySelector(".week-content");
      const firstTask = content?.querySelector("label");
      const lesson = content?.querySelector(".lesson-instructions");
      const evidence = content?.querySelector(".evidence");
      if (!content || !firstTask || !lesson || !evidence) return;

      const framing = weekFraming[guide.type] || weekFraming.feature;
      const context = document.createElement("section");
      context.className = "assignment-context";
      const excerptBlock = guide.excerpt ? `
          <div class="assignment-context-heading"><span>Toimeksianto tässä vaiheessa</span><a href="#toimeksianto">Koko toimeksianto ↑</a></div>
          <p class="assignment-excerpt">“${guide.excerpt}”</p>` : "";
      context.innerHTML = `
          <p class="feature-statement"><span>${framing.kicker}</span>${guide.feature}</p>
          ${excerptBlock}
          <p class="game-connection"><strong>${framing.connectionLabel}</strong> ${guide.connection}</p>
          <div class="week-purpose-grid">
            <article><span>${framing.deliverableLabel}</span><p>${guide.deliverable}</p></article>
            <article><span>Miksi tämä tehdään</span><p>${guide.why}</p></article>
          </div>
          <p class="skill-tags-label">${framing.skillsLabel}</p>
          <ul class="skill-tags" aria-label="${framing.skillsLabel}">${guide.skills.map((skill) => `<li>${skill}</li>`).join("")}</ul>`;
      content.insertBefore(context, firstTask);

      lesson.querySelector(".lesson-label").innerHTML = `<span>${guide.steps.length} askelta</span> Tee näin, yksi askel kerrallaan`;
      lesson.querySelector("ol").innerHTML = guide.steps.map(([title, description]) => `<li><strong>${title}</strong>${description}</li>`).join("");
      lesson.querySelector(".checkpoint").innerHTML = `<strong>Valmis kun:</strong> ${guide.done}`;

      if (guide.resources?.length) {
        const resources = document.createElement("nav");
        resources.className = "resource-actions";
        resources.setAttribute("aria-label", "Tämän viikon pohjat ja työkalut");
        resources.innerHTML = `<strong>Tarvitset nämä:</strong>${guide.resources.map(([label, href, download]) => `<a href="${href}"${download ? " download" : ""}>${label}</a>`).join("")}`;
        lesson.insertAdjacentElement("beforebegin", resources);
      }

      if (guide.help) {
        const help = document.createElement("details");
        help.className = "unity-help";
        const helpLinks = guide.help.links?.length ? `<p class="unity-help-links">${guide.help.links.map(([label, url]) => `<a href="${url}" target="_blank" rel="noreferrer">${label} ↗</a>`).join("")}</p>` : "";
        const helpImages = guide.help.images?.length ? `<div class="unity-help-images">${guide.help.images.map(([src, alt, caption]) => `<figure><img src="${src}" alt="${escapeText(alt)}" loading="lazy">${caption ? `<figcaption>${escapeText(caption)}</figcaption>` : ""}</figure>`).join("")}</div>` : "";
        help.innerHTML = `
          <summary>Tarvitsen toteutusapua Unityyn <small>${guide.help.title}</small></summary>
          <div class="unity-help-content">
            <div class="unity-help-tree"><p class="help-label">Luo tämä rakenne</p><pre><code>${escapeText(guide.help.tree)}</code></pre></div>
            <div class="unity-help-actions"><p class="help-label">Kytke näin</p><ol>${guide.help.actions.map((action) => `<li>${escapeText(action)}</li>`).join("")}</ol></div>
            <div class="unity-help-code"><p class="help-label">Käytä tätä työpohjaa tai tarkistuslistaa</p><pre><code>${escapeText(guide.help.code)}</code></pre></div>
            <p class="unity-help-test"><strong>Tarkistustesti:</strong> ${escapeText(guide.help.test)}</p>
            ${helpImages}
            ${helpLinks}
          </div>`;
        lesson.insertAdjacentElement("afterend", help);
      }

      const expectations = document.createElement("div");
      expectations.className = "expectation-grid";
      expectations.innerHTML = `
        <article class="expected-example"><p class="expectation-label">Esimerkki odotetusta tarkkuudesta · älä kopioi sisältöä</p><p>${guide.example}</p></article>
        <article class="not-enough"><p class="expectation-label">Tämä ei vielä riitä</p><p>${guide.notEnough}</p></article>`;
      content.insertBefore(expectations, evidence);

      const journal = document.createElement("section");
      journal.className = "week-journal";
      journal.dataset.weekJournal = card.dataset.week;
      journal.innerHTML = `
        <div class="journal-heading">
          <div><p class="expectation-label">Kirjoita tähän ennen kuin rastitat viikon valmiiksi</p><h4>Projektipäiväkirja · viikko ${card.dataset.week}</h4></div>
          <span data-journal-status>Ei vielä kirjattu</span>
        </div>
        <p class="journal-record"><strong>Tallenna nämä tiedot:</strong> ${guide.record}</p>
        <div class="journal-fields">
          <label>Mitä teit ja miten?
            <textarea rows="4" data-journal-field="work" placeholder="Kerro konkreettiset Unity-objektit, C#-tiedostot, Git-tehtävät ja testit."></textarea>
          </label>
          <label>Miksi teit näin?
            <textarea rows="4" data-journal-field="reason" placeholder="Kerro päätös, vaihtoehdot, perustelu ja mitä opit."></textarea>
          </label>
          <label>Todisteen täsmällinen paikka
            <input type="text" data-journal-field="evidence" placeholder="Esim. commit-linkki, issue #12, testi T05 tai project-docs/evidence/week-${card.dataset.week}/kuva.png">
          </label>
          <label>Seuraava pieni askel
            <input type="text" data-journal-field="next" placeholder="Mikä on ensimmäinen asia, josta jatkat seuraavalla kerralla?">
          </label>
        </div>
        <div class="journal-actions">
          <button class="button button-secondary" type="button" data-export-week="${card.dataset.week}">Lataa vain tämä viikko (.md)</button>
          <button class="button button-ghost" type="button" data-export-journal>Lataa koko projektipäiväkirja</button>
        </div>`;
      expectations.insertAdjacentElement("afterend", journal);

      evidence.querySelector("strong").textContent = "Todiste Git-repositoryyn ennen rastia:";
    });
  }

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

  let journalEntries = readStorage(JOURNAL_KEY, {});

  function journalEntryIsComplete(entry = {}) {
    return [entry.work, entry.reason, entry.evidence].every((value) => String(value || "").trim().length > 0);
  }

  function weekTitle(week) {
    return document.querySelector(`#week-${week} .week-title strong`)?.textContent?.trim() || `Viikko ${week}`;
  }

  function updateJournalStatus() {
    let completeCount = 0;
    document.querySelectorAll("[data-week-journal]").forEach((journal) => {
      const week = journal.dataset.weekJournal;
      const entry = journalEntries[week] || {};
      const complete = journalEntryIsComplete(entry);
      const hasText = Object.values(entry).some((value) => String(value || "").trim());
      if (complete) completeCount += 1;
      const status = journal.querySelector("[data-journal-status]");
      if (status) {
        status.textContent = complete ? "Pääkentät kirjattu" : (hasText ? "Kesken – täydennä 3 pääkenttää" : "Ei vielä kirjattu");
        status.classList.toggle("complete", complete);
      }
    });
    document.querySelectorAll("[data-journal-summary]").forEach((summary) => {
      summary.textContent = `${completeCount} / ${weekCards.length} viikkoa kirjattu`;
    });
  }

  function saveJournalField(field) {
    const journal = field.closest("[data-week-journal]");
    if (!journal) return;
    const week = journal.dataset.weekJournal;
    journalEntries[week] = {
      ...(journalEntries[week] || {}),
      [field.dataset.journalField]: field.value,
      updatedAt: new Date().toISOString()
    };
    writeStorage(JOURNAL_KEY, journalEntries);
    updateJournalStatus();
    updateProgress();
  }

  function weekMarkdown(week) {
    const entry = journalEntries[week] || {};
    const guide = weekGuidance[week];
    return [
      `## Vko ${week} – ${weekTitle(week)}`,
      "",
      `**Viikon kärki:** ${guide?.feature || ""}`,
      "",
      `**Viikon tuotos:** ${guide?.deliverable || ""}`,
      "",
      "### Mitä tein ja miten?",
      String(entry.work || "Ei vielä kirjattu."),
      "",
      "### Miksi tein näin?",
      String(entry.reason || "Ei vielä kirjattu."),
      "",
      "### Todisteen täsmällinen paikka",
      String(entry.evidence || "Ei vielä kirjattu."),
      "",
      "### Seuraava pieni askel",
      String(entry.next || "Ei vielä kirjattu."),
      ""
    ].join("\n");
  }

  function aiLogMarkdown() {
    const entries = readStorage(LOG_KEY, []);
    if (!entries.length) return "## AI-loki\n\nEi merkintöjä.\n";
    return ["## AI-loki", "", ...entries.flatMap((entry, index) => [
      `### ${index + 1}. ${entry.tool}`,
      `- **Tehtävä tai kysymys:** ${entry.question}`,
      `- **Käytin, muutin tai hylkäsin:** ${entry.used}`,
      `- **Tarkistus ja oppi:** ${entry.checked}`,
      `- **Todisteviite:** ${entry.reference || "ei viitettä"}`,
      entry.privacy ? "- **Tietosuojavahvistus:** En syöttänyt henkilötietoja, salaisuuksia tai luottamuksellista aineistoa." : "- **Tietosuojavahvistus:** vahvistamatta (vanha merkintä)",
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

  function exportJournal() {
    const weeks = Object.keys(weekGuidance);
    const documentText = [
      "# KahvilaKoodi – projektipäiväkirja",
      "",
      "Tallenna tämä tiedosto polkuun `project-docs/projektipaivakirja.md` ja tee commit jokaisen viikon lopussa.",
      "",
      ...weeks.map((week) => weekMarkdown(week)),
      aiLogMarkdown()
    ].join("\n");
    downloadMarkdown("projektipaivakirja.md", documentText);
  }

  function initJournal() {
    document.querySelectorAll("[data-journal-field]").forEach((field) => {
      const week = field.closest("[data-week-journal]")?.dataset.weekJournal;
      field.value = journalEntries[week]?.[field.dataset.journalField] || "";
      field.addEventListener("input", () => saveJournalField(field));
    });
    document.querySelectorAll("[data-export-week]").forEach((button) => button.addEventListener("click", () => {
      const week = button.dataset.exportWeek;
      downloadMarkdown(`projektipaivakirja-vko-${week}.md`, `# KahvilaKoodi – viikko ${week}\n\n${weekMarkdown(week)}`);
    }));
    document.querySelectorAll("[data-export-journal]").forEach((button) => button.addEventListener("click", exportJournal));
    updateJournalStatus();
  }

  let gddData = readStorage(GDD_KEY, {});
  const gddRequired = ["name", "author", "goal", "style", "graphics", "scoreRight", "scoreWrong", "reasoning"];

  function gddFilled(fieldName) {
    return String(gddData[fieldName] || "").trim().length > 0;
  }

  function gddValue(fieldName, fallback = "_(ei vielä täytetty)_") {
    return gddFilled(fieldName) ? String(gddData[fieldName]).trim() : fallback;
  }

  function updateGddStatus() {
    const status = document.querySelector("[data-gdd-status]");
    if (!status) return;
    const done = gddRequired.filter(gddFilled).length;
    status.textContent = done === 0 ? "Ei vielä aloitettu" : (done < gddRequired.length ? `Kesken — ${done} / ${gddRequired.length} kenttää täytetty` : "GDD valmis ✓");
    status.classList.toggle("complete", done === gddRequired.length);
  }

  function gddMarkdown() {
    const roundLine = gddFilled("roundSeconds")
      ? `Kierroksen pituus: ${String(gddData.roundSeconds).trim()} sekuntia (sovittu asiakkaan kanssa${gddFilled("roundAgreed") ? ` — ${String(gddData.roundAgreed).trim()}` : ""})`
      : "Kierroksen pituus: EI VIELÄ SOVITTU — avoin asia";
    return [
      `# GDD – ${gddValue("name", "_(pelin nimi puuttuu)_")}`,
      "",
      `Tekijä: ${gddValue("author")} · Päivitetty: ${new Date().toLocaleDateString("fi-FI")} · Pohja: KahvilaKoodi-toimeksianto 17.8.2026`,
      "",
      "## 1. Konsepti",
      "",
      "Koulun kahvilapeli selaimeen: asiakkaita saapuu tiskille, he tilaavat 1–3 tuotetta ja pelaaja toimittaa oikean tilauksen mahdollisimman nopeasti.",
      "",
      "## 2. Tavoite ja tekijän rooli omin sanoin",
      "",
      gddValue("goal"),
      "",
      "## 3. Ydinsilmukka",
      "",
      "Tilaus → valinta → toimitus → pisteet → uusi asiakas.",
      "",
      "## 4. Omat suunnittelupäätökset",
      "",
      `- **Visuaalinen tyyli:** ${gddValue("style")}`,
      `- **Grafiikan hankinta ja lisenssi:** ${gddValue("graphics")}`,
      `- **Pisteytys:** oikea toimitus +${gddValue("scoreRight", "_?_")} p · väärä toimitus −${gddValue("scoreWrong", "_?_")} p`,
      "",
      "### Perustelut",
      "",
      gddValue("reasoning"),
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
      "Huomautus: tämä lista ei ole valmis suunnitelma. Featurejen pilkkominen 0,5–1 päivän issueiksi ja P0/P1/P2-priorisointi on omaa työtä (tehtävä 35-2).",
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

  function initGdd() {
    const form = document.querySelector("[data-gdd-form]");
    if (!form) return;
    form.addEventListener("submit", (event) => event.preventDefault());
    form.querySelectorAll("[data-gdd-field]").forEach((field) => {
      field.value = gddData[field.dataset.gddField] || "";
      field.addEventListener("input", () => {
        gddData[field.dataset.gddField] = field.value;
        writeStorage(GDD_KEY, gddData);
        updateGddStatus();
      });
    });
    document.querySelectorAll("[data-gdd-export]").forEach((button) => button.addEventListener("click", () => downloadMarkdown("gdd.md", gddMarkdown())));
    updateGddStatus();
  }

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
      47: "Julkaisuehdokas RC1",
      48: "Julkaisu v1.0",
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
      card.classList.toggle("journal-missing", complete === boxes.length && !journalEntryIsComplete(journalEntries[card.dataset.week]));
      const weekLink = document.querySelector(`[data-week-link="${card.dataset.week}"]`);
      if (weekLink) weekLink.classList.toggle("done", complete === boxes.length);
    });

    const firstIncomplete = taskBoxes.find((box) => !box.checked);
    document.querySelectorAll("[data-continue]").forEach((button) => {
      button.textContent = firstIncomplete ? (done ? "Jatka seuraavasta tehtävästä" : "Aloita pelin rakentaminen") : "Kaikki tehtävät valmiina";
    });
  }

  function saveTasks() {
    const state = Object.fromEntries(taskBoxes.map((box) => [box.dataset.task, box.checked]));
    writeStorage(STORAGE_KEY, state);
    updateProgress();
  }

  taskBoxes.forEach((box) => box.addEventListener("change", () => {
    saveTasks();
    if (!box.checked) return;
    const card = box.closest(".week-card");
    const status = card?.querySelector("[data-journal-status]");
    if (status && !journalEntryIsComplete(journalEntries[card.dataset.week])) {
      status.textContent = "Muista projektipäiväkirjan 3 pääkenttää";
      status.classList.add("attention");
    }
  }));

  function updateEvidence() {
    const state = Object.fromEntries(evidenceBoxes.map((box) => [box.dataset.evidence, box.checked]));
    writeStorage(EVIDENCE_KEY, state);
    const done = evidenceBoxes.filter((box) => box.checked).length;
    const count = document.querySelector("[data-evidence-count]");
    if (count) count.textContent = `${done} / ${evidenceBoxes.length}`;
  }
  evidenceBoxes.forEach((box) => box.addEventListener("change", updateEvidence));

  function openWeekTarget(hash) {
    if (!hash || !hash.startsWith("#week-")) return;
    const target = document.querySelector(hash);
    if (target instanceof HTMLDetailsElement) target.open = true;
  }
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href*="#week-"]');
    if (link) openWeekTarget(new URL(link.href, window.location.href).hash);
  });
  window.addEventListener("hashchange", () => openWeekTarget(window.location.hash));

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
    if (!window.confirm("Nollataanko tehtävät, projektipäiväkirja, GDD, näytön todisteet ja AI-loki tästä selaimesta? Lataa projektipäiväkirja ja gdd.md ensin, jos haluat säilyttää vastaukset.")) return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(EVIDENCE_KEY);
    localStorage.removeItem(LOG_KEY);
    localStorage.removeItem(JOURNAL_KEY);
    localStorage.removeItem(GDD_KEY);
    journalEntries = {};
    gddData = {};
    taskBoxes.forEach((box) => { box.checked = false; });
    evidenceBoxes.forEach((box) => { box.checked = false; });
    document.querySelectorAll("[data-journal-field]").forEach((field) => { field.value = ""; });
    document.querySelectorAll("[data-gdd-field]").forEach((field) => { field.value = ""; });
    renderLog();
    updateJournalStatus();
    updateGddStatus();
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
        <span>${escapeText(entry.checked)}<small class="log-reference">Todiste: ${escapeText(entry.reference || "ei viitettä")}</small></span>
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
    aiLog.push({
      tool: form.get("tool"),
      question: form.get("question"),
      used: form.get("used"),
      checked: form.get("checked"),
      reference: form.get("reference"),
      privacy: form.get("privacy") === "on"
    });
    writeStorage(LOG_KEY, aiLog);
    event.currentTarget.reset();
    renderLog();
  });

  document.querySelector("[data-export-log]")?.addEventListener("click", () => {
    const entries = readStorage(LOG_KEY, []);
    const rows = entries.length ? entries.map((entry, index) => [
      `## ${index + 1}. ${entry.tool}`,
      `- **Tehtävä tai kysymys:** ${entry.question}`,
      `- **Käytin, muutin tai hylkäsin:** ${entry.used}`,
      `- **Tarkistus ja oppi:** ${entry.checked}`,
      `- **Todisteviite:** ${entry.reference || "ei viitettä"}`,
      entry.privacy ? "- **Tietosuojavahvistus:** En syöttänyt henkilötietoja, salaisuuksia tai luottamuksellista aineistoa." : "- **Tietosuojavahvistus:** vahvistamatta (vanha merkintä)",
      ""
    ].join("\n")).join("\n") : "Ei merkintöjä.\n";
    const documentText = `# KahvilaKoodi – AI-loki\n\n${rows}`;
    downloadMarkdown("AI-loki.md", documentText);
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

  enhanceWeekCards();
  initJournal();
  initGdd();
  buildWeekNavigation();
  openWeekTarget(window.location.hash);
  markCurrentWeek();
  updateProgress();
  updateEvidence();
  renderLog();
  setupReveal();
})();

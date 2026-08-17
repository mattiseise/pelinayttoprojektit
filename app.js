(function () {
  "use strict";

  const STORAGE_KEY = "kahvilakoodi-progress-v1";
  const EVIDENCE_KEY = "kahvilakoodi-evidence-v1";
  const LOG_KEY = "kahvilakoodi-ai-log-v1";
  const taskBoxes = [...document.querySelectorAll("[data-task]")];
  const evidenceBoxes = [...document.querySelectorAll("[data-evidence]")];
  const weekCards = [...document.querySelectorAll(".week-card")];

  const weekGuidance = {
    34: {
      connection: "Gameplay loop alkaa asiakkaan tarpeesta: ennen koodaamista päätät, mitä kahvilassa tapahtuu tilauksen saapumisesta tulosruutuun.",
      skills: ["asiakastarve", "Unity 2D", "Git"],
      steps: [
        ["Selvitä tarve", "Merkitse toimeksiannon pakolliset asiat, laadi vähintään 8 päätökseen johtavaa kysymystä ja kirjaa asiakaskeskustelun vastaukset, avoimet asiat ja oletukset."],
        ["Tee Unity-testi", "Luo Unity Hubissa 2D-projekti, CafeGame-scene ja WebGL-testibuild. Kirjaa käytetty Unity-versio."],
        ["Perusta Git", "Lisää README, docs-kansio ja Unity-.gitignore. Gitissä ovat Assets, Packages ja ProjectSettings; Library jää pois. Tee ensimmäinen commit ja push."]
      ],
      example: "Kysymys: Miten top 5 -listan tasatilanteet järjestetään? Vastaus: [asiakkaan vastaus]. Päätös: [oma tiivistys].",
      notEnough: "Kahdeksan lähes samaa tekoälykysymystä tai itse keksityt asiakkaan vastaukset eivät osoita asiakastarpeen selvittämistä."
    },
    35: {
      excerpt: "Pelissä pitää olla aloitusvalikko, itse peli, pistelasku ja pelin päättymisnäkymä.",
      connection: "Nyt muutat toimeksiannon näkyväksi Unity-suunnitelmaksi: Canvas-näkymät, gameplay loop, C#-vastuut, tehtävät ja valmiin työn ehdot.",
      skills: ["rajaus", "Unity UI", "työn pilkkominen"],
      resources: [
        ["Avaa dokumentointipohja", "downloads/nayton-dokumentointipohjat.docx", true],
        ["Avaa koko toimeksianto", "#toimeksianto", false]
      ],
      steps: [
        ["Täytä suunnitelman osat 1–4", "Kirjaa tavoite, käyttäjä, oma rooli, rajaus, toteutustapa ja ensimmäinen versio teknisestä suunnitelmasta omin sanoin."],
        ["Tee pieni backlog", "Kirjoita jokainen kahvilapelin P0-toiminto omaksi 0,5–1 päivän issueksi. Lisää prioriteetti ja havaittava valmis kun -ehto."],
        ["Piirrä Unity-ratkaisu", "Luonnostele kolme Canvas-paneelia ja gameplay loop. Jaa C#-vastuut GameManager-, OrderManager-, ProductDatabase-, UIController- ja SaveService-skripteille."]
      ],
      example: "Issue: Näytä asiakkaan tilaus / P0 / 4 h / Valmis kun 1–3 tuotetta näkyy peliruudulla ennen pelaajan valintaa.",
      notEnough: "Tehtävä nimeltä “Tee peli” tai perustelematon tekoälyn arkkitehtuurikuva ei ole toteutuskelpoinen suunnitelma."
    },
    36: {
      excerpt: "Pelaajan tehtävänä on toimittaa oikea tilaus mahdollisimman nopeasti.",
      connection: "Rakennat Unityyn gameplay loopin ensimmäisen pystyleikkauksen. Tässä versiossa yksi kiinteä kahvitilaus riittää todistamaan koko polun; lopullinen 1–3 tuotteen tilaus tulee seuraavaksi.",
      skills: ["Unity Canvas", "pelitilat", "ensimmäinen testi"],
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
        test: "Play-painalluksen jälkeen näkyy vain valikko. Aloita näyttää vain pelin ja EndGame vain tuloksen. Sama toimii WebGL-buildissa."
      },
      example: "Hyväksymistesti: Aloita → Kahvi → Toimita → pistemäärä 10 → aika 0 → tulosruudulla 10.",
      notEnough: "Kolme irrallista ruutukaappausta tai editorissa käsin vaihdettu pelitila ei vielä ole pelattava pystyleikkaus."
    },
    37: {
      excerpt: "Tuotteiden tiedot eivät saa olla kovakoodattuna pelilogiikkaan, vaan niiden pitää tulla erillisestä tietolähteestä.",
      connection: "Gameplay loopin tilaus syntyy nyt Unityyn tuodusta JSON-datasta. Kahvi, tee ja sämpylä eivät enää asu C#-tilauskoodissa.",
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
        test: "Muuta kahvin points-arvo JSONissa 10:stä 15:een. Muutoksen pitää näkyä pelissä ilman C#-tiedoston muokkausta."
      },
      example: "{ \"products\": [{ \"id\": \"kahvi\", \"name\": \"Kahvi\", \"points\": 10 }] } → JsonUtility → ProductDatabase → OrderManager → UI.",
      notEnough: "JSON-tiedosto ei riitä, jos kahvi ja pistearvo ovat edelleen myös pelilogiikkaan kovakoodattuina."
    },
    38: {
      excerpt: "Pelissä pitää olla aloitusvalikko, itse peli, pistelasku ja pelin päättymisnäkymä.",
      connection: "Viimeistelet Unity-gameplay loopin palautteen: kahvilapelaaja näkee TextMeshPro-kentissä heti, oliko toimitus oikea, paljonko pisteitä tuli ja milloin vuoro päättyy.",
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
        test: "Aseta testissä aika arvoon 0,1 s ja paina Toimita nopeasti kahdesti. ResultPanel avautuu kerran ja pisteet muuttuvat enintään kerran."
      },
      example: "Oikea tilaus +10; väärä −5; aika 60 s; peli päättyy kerran, kun aika = 0.",
      notEnough: "Pelivideo yksin ei osoita, että pistelogiikka toimii rajoilla tai että uusi peli nollaa vanhan tuloksen."
    },
    39: {
      excerpt: "Vaikeustason pitää kasvaa pelin edetessä.",
      connection: "Unityn gameplay loop pysyy samana, mutta kahvilan kiire kasvaa hallitusti. Pelaajan pitää huomata vaikeutuminen ilman äkillistä sattumanvaraista hyppyä.",
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
      excerpt: "Pelaajan parhaat tulokset pitää tallentaa.",
      connection: "Kun kahvilavuoro päättyy, viiden parhaan tuloksen lista tallentuu Unityn PlayerPrefsiin ja näkyy vielä WebGL-pelin uudelleenkäynnistyksen jälkeen.",
      skills: ["PlayerPrefs", "validointi", "tietoturva"],
      steps: [
        ["Tallenna top 5", "ScoreList sisältää enintään viisi ScoreEntry-riviä. Järjestä lista pisteillä, poista kuudenneksi jäävä ja lataa lista seuraavalla käynnistyksellä."],
        ["Perustele ratkaisu", "Kirjaa tekniseen suunnitelmaan, miksi ScoreList tallennetaan JSON-merkkijonona PlayerPrefsiin, missä selain säilyttää tiedon ja mitä rajoituksia ratkaisulla on."],
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
        test: "Tallenna kuusi eri tulosta, sulje välilehti ja avaa peli uudelleen. Vain viisi parasta näkyy samassa järjestyksessä."
      },
      example: "ScoreList → JsonUtility.ToJson → PlayerPrefs.SetString(\"HighScores\", json) → käynnistä uudelleen → sama top 5 näkyy.",
      notEnough: "Inspectorissa tai koodissa näkyvä arvo ei osoita pysyvää latausta. Älä tallenna tai syötä tekoälylle salasanoja, avaimia tai henkilötietoja."
    },
    41: {
      excerpt: "Haluan nähdä pelistä toimivan version vähintään kerran ennen lopullista versiota, jotta voin pyytää muutoksia.",
      connection: "Asiakas pelaa nyt kahvilapelin oikean gameplay loopin. Sinä tarkkailet, missä tilaus, tuotteiden valinta tai palaute jää epäselväksi.",
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
      excerpt: "Haluan myös nähdä pelistä toimivan version vähintään kerran ennen lopullista versiota, jotta voin pyytää muutoksia.",
      connection: "Toteutat asiakkaan valitseman muutoksen Unity-projektissa niin, että alkuperäinen gameplay loop säilyy toimivana.",
      skills: ["issue", "feature-branch", "katselmointi"],
      steps: [
        ["Kirjoita muutos pelitehtäväksi", "Liitä asiakkaan palaute issueen ja kerro, mitä kahvilapelin näkymää tai toimintoa muutetaan."],
        ["Toteuta erillään", "Aloita toimivasta mainista, tee pieniä committeja feature-branchiin ja testaa tilaus–toimitus–pisteet jokaisen ehjän muutoksen jälkeen."],
        ["Katselmoi ja yhdistä", "Pyydä ihmiseltä kommentti, vastaa siihen ja yhdistä vasta, kun hyväksymisehto sekä vanha gameplay loop läpäisevät testin."]
      ],
      example: "Issue: Suurenna tilauskortti. Valmis kun uusi käyttäjä löytää tilauksen 5 sekunnissa. PR sisältää muutoksen ja testin.",
      notEnough: "Suuri suora muutos mainiin tai yksi massacommit katkaisee yhteyden palautteen, toteutuksen ja testin välillä."
    },
    44: {
      excerpt: "Lopullinen peli pitää julkaista niin, että voin itse kokeilla sitä.",
      connection: "Unity-kahvilapelin täytyy kertoa tavoitteensa ilman opettajan vieressä antamia ohjeita. Siksi testaat juuri Canvasin tilausta, tuotepainikkeita, Toimita-painiketta ja palautetta.",
      skills: ["Unity UI", "Canvas-palaute", "käyttäjätesti"],
      steps: [
        ["Anna oikea pelitehtävä", "Pyydä vertaista aloittamaan peli, toimittamaan yksi tilaus ja tarkistamaan tulos ilman suullista ohjetta."],
        ["Kirjaa havainto ennen ratkaisua", "Merkitse esimerkiksi epäröinti, väärä painallus tai kohta, jossa tilaus jäi huomaamatta."],
        ["Korjaa ja testaa uudelleen", "Tee kaksi tärkeintä muutosta kahvilapelin UI:hin ja toista sama tehtävä toisella käyttäjällä."]
      ],
      example: "Havainto: käyttäjä ei löytänyt Aloita-painiketta → kontrasti ja paikka muutettiin → uusintatestissä löytyi ilman vihjettä.",
      notEnough: "Oma mielipide “UI näyttää hyvältä” tai vain kosmeettinen värinvaihto ei ole käytettävyystesti."
    },
    45: {
      excerpt: "Pelissä pitää olla aloitusvalikko, itse peli, pistelasku ja pelin päättymisnäkymä.",
      connection: "Testaat Unity WebGL -buildin koko gameplay loopin järjestelmällisesti: aloitus, tilaus, valinta, toimitus, pisteet, aika, vaikeus, PlayerPrefs ja uusi peli.",
      skills: ["testitapaus", "debuggaus", "regressiotesti = vanhan toiminnan uusintatesti"],
      resources: [
        ["Lataa testausloki ja työpaketti", "downloads/koulun-kahvilapeli-tyopaketti.docx", true],
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
      excerpt: "Tuotteiden tiedot eivät saa olla kovakoodattuna pelilogiikkaan, vaan niiden pitää tulla erillisestä tietolähteestä.",
      connection: "Selkeytät nyt Unity-projektin C#-koodia: tilauksen luonti, pisteiden lasku ja Canvasin päivitys eivät saa olla yhtenä pitkänä MonoBehaviour-metodina.",
      skills: ["C#-ylläpidettävyys", "refaktorointi", "koodikatselmointi"],
      steps: [
        ["Valitse yksi oikea laatuhaitta", "Etsi C#-skripteistä toisto, epäselvä nimi, pitkä Update-metodi tai MonoBehaviour, joka hoitaa sekä tilauksen, pisteet että UI:n."],
        ["Refaktoroi toimintaa muuttamatta", "Tee yksi rajattu muutos ja aja sama gameplay loop -testi ennen ja jälkeen."],
        ["Selitä ratkaisu", "Pyydä ihmisen katselmointi ja selitä yksi oma sekä yksi tekoälyavusteinen kohta omin sanoin."]
      ],
      example: "Ennen: a() laskee pisteet. Jälkeen: CalculateOrderScore() kertoo nimestä, mitä kahvilapelin sääntöä metodi toteuttaa.",
      notEnough: "Pelkkä automaattinen muotoilu tai koko tiedoston tekoälyuudelleenkirjoitus ei osoita perusteltua refaktorointia."
    },
    47: {
      excerpt: "Lopullinen peli pitää julkaista niin, että voin itse kokeilla sitä.",
      connection: "Release candidate 1 eli RC1 on Unity WebGL -pelin ensimmäinen julkaisuehdokas: koko gameplay loop testataan selaimessa sellaisena kuin se aiotaan julkaista.",
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
      excerpt: "Lopullinen peli pitää julkaista niin, että voin itse kokeilla sitä.",
      connection: "Unity-kahvilapelin gameplay loop siirtyy nyt Editorista GitHub Pagesiin. Testaat julkaistua WebGL-versiota, et Play Modea.",
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
        links: [
          ["Unity: Web-julkaisun asetukset", "https://docs.unity3d.com/6000.0/Documentation/Manual/webgl-deploying.html"],
          ["GitHub: Pages-julkaisulähde", "https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site"]
        ]
      },
      example: "README: Avaa [linkki] → Aloita → valitse tuotteet → Toimita. Testattu Chrome 128 / v1.0 / tunnettu puute: [asia].",
      notEnough: "Editorikuva tai “toimii omalla koneella” ei osoita, että asiakas pystyy avaamaan julkaistun pelin."
    },
    49: {
      excerpt: "Lopullinen peli pitää julkaista niin, että voin itse kokeilla sitä.",
      connection: "Et enää muuta Unity-projektin gameplayta. Yhdistät jokaisen kahvilapelin vaatimuksen täsmälliseen C#-tiedostoon, testiin, buildiin ja Git-todisteeseen.",
      skills: ["näyttömatriisi", "itsearviointi", "demo"],
      resources: [
        ["Lataa täytettävä työpaketti", "downloads/koulun-kahvilapeli-tyopaketti.docx", true],
        ["Avaa dokumentointipohja", "downloads/nayton-dokumentointipohjat.docx", true],
        ["Avaa näyttömatriisi", "#todisteet", false],
        ["Avaa ja lataa AI-loki", "#tekoaly", false]
      ],
      steps: [
        ["Viimeistele dokumentit", "Jäädytä v1.0, täytä dokumentointipohjan osat 7–8, tarkista aiemmat osat ja kirjoita itsearviointi omiin todisteisiin nojaten."],
        ["Tee syvälinkit", "Liitä jokainen näyttömatriisin vaatimus suoraan issueen, C#-tiedostoon, commitiin, testiriviin tai palautepäätökseen."],
        ["Harjoittele ja luovuta", "Näytä 8–10 minuutissa gameplay loop, JSON, tallennus, bugikorjaus, Git ja AI-loki. Anna toisen henkilön avata palautus ennen 4.12."]
      ],
      example: "P3 Toimintojen testaus → docs/testaus.md, rivit T05–T16 → build v1.0 → tarkka linkki.",
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

      if (guide.excerpt) {
        const context = document.createElement("section");
        context.className = "assignment-context";
        context.innerHTML = `
          <div class="assignment-context-heading"><span>Toimeksianto tässä vaiheessa</span><a href="#toimeksianto">Koko toimeksianto ↑</a></div>
          <p class="assignment-excerpt">“${guide.excerpt}”</p>
          <p class="game-connection"><strong>Kahvilapelissä nyt:</strong> ${guide.connection}</p>
          <ul class="skill-tags" aria-label="Tällä viikolla näkyvä osaaminen">${guide.skills.map((skill) => `<li>${skill}</li>`).join("")}</ul>`;
        content.insertBefore(context, firstTask);
      } else {
        const taskAssignment = content.querySelector(".task-assignment");
        taskAssignment?.insertAdjacentHTML("beforeend", `
          <p class="game-connection"><strong>Kahvilapelissä nyt:</strong> ${guide.connection}</p>
          <ul class="skill-tags" aria-label="Tällä viikolla näkyvä osaaminen">${guide.skills.map((skill) => `<li>${skill}</li>`).join("")}</ul>`);
      }

      lesson.querySelector(".lesson-label").innerHTML = "<span>3 askelta</span> Tee tämä kahvilapelissä";
      lesson.querySelector("ol").innerHTML = guide.steps.map(([title, description]) => `<li><strong>${title}</strong>${description}</li>`).join("");

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
        help.innerHTML = `
          <summary>Tarvitsen toteutusapua Unityyn <small>${guide.help.title}</small></summary>
          <div class="unity-help-content">
            <div class="unity-help-tree"><p class="help-label">Luo tämä rakenne</p><pre><code>${escapeText(guide.help.tree)}</code></pre></div>
            <div class="unity-help-actions"><p class="help-label">Kytke näin</p><ol>${guide.help.actions.map((action) => `<li>${escapeText(action)}</li>`).join("")}</ol></div>
            <div class="unity-help-code"><p class="help-label">Täydennä runko – TODO-kohdat ovat sinun työsi</p><pre><code>${escapeText(guide.help.code)}</code></pre></div>
            <p class="unity-help-test"><strong>Tarkistustesti:</strong> ${escapeText(guide.help.test)}</p>
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
      evidence.querySelector("strong").textContent = "Näyttöön talteen ennen rastia:";
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
    const url = URL.createObjectURL(new Blob([documentText], { type: "text/markdown;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "AI-loki.md";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
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
  buildWeekNavigation();
  markCurrentWeek();
  updateProgress();
  updateEvidence();
  renderLog();
  setupReveal();
})();

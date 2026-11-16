# KahvilaKoodi – ohjattu näyttöprojekti

Selainpohjainen pelipolku koulun kahvilapelin toteuttamiseen näyttöprojektina. Viikot etenevät **pelifeature edellä**: jokainen viikko tuottaa peliin näkyvän ominaisuuden tai muun konkreettisen tuloksen. Featuren tekniikka (Unity, C#, JSON, PlayerPrefs, Git, WebGL) arvioidaan näytössä.

Sivusto sisältää viikot 48–53/2026 ja 1–4/2027, 29.1.2027 päättyvän aikataulun, GDD-generaattorin (esitäytetty Game Design Document, jonka omat päätökset opiskelija tekee itse ja lataa gdd.md-tiedostona), vastuullisen tekoälyn käyttöohjeet, AI-lokin, testauksen vähimmäistavoitteet, näyttöaineiston tarkistuslistat kolmesta tutkinnon osasta ja suositukset ilmaisiin grafiikkalähteisiin (spritet ja taustat).

Pedagoginen runko on tarkastettu pedagogia-agenttiputken Linnea-portilla (hyväksytty 17.8.2026).

**Tehtävänanto pilkottu 28.9.2026 (moottori v2.5).** Jokainen viikon tehtävä on tehtäväkortti: yksi tavoite, 3–7 rastitettavaa osatehtävää, miksi, valmis kun, tallenna työnäyte sekä tehtävän oma apu. Tunnukset (P0, T01, RC1…) sanallistetaan jokaisessa tehtävässä, jossa niitä käytetään. Sisältö on `sisalto.js`:n `viikkoOhjeet[w].tehtavat`-kentissä; `node tyokalut/tarkista.js` tarkistaa rakenteen ja sanallistuksen. Opiskelijoiden aiemmat rastit siirtyvät uusiin tehtäviin (`perii`-kenttä).

**Selkeytetty 30.9.2026 (moottori v2.7, `yhtenaisetViikot: true`).** Aloitus on nyt Projektin kokonaiskuva: pelaajan työnkulun havainnekuva (`assets/tyonkulku.svg`, `lopputulos`), viisi numeroitua vaihetta (`vaiheet`, vaihekuva `assets/projektin-vaiheet.svg` generoidaan komennolla `node tyokalut/tee_vaihekuva.js`) ja avattavat osiot pelin osista (`assets/sovelluksen-osat.svg`), dokumenttien tehtävistä, vaatimus–ehdotus–päätös-jaosta ja arvioinnista. Jokaisella työviikolla on oma yhteys kokonaisprojektiin (`connection`) ja tavoite (`feature`). Työn tasot: **työvaihe** = sivun viikko-ohjeen kohta, **GitHub-issue** = yksi rajattu muutos peliin, **työtapa** = Työtapa-sivun kuusi askelta. Viikon 49 top 5 -tallennuksen tietovirta on havainnekuvana `assets/tallennus-top5.svg` (työvaihe 49-2). Tehtävätunnukset, niiden järjestys ja osatehtävien järjestys säilyivät, joten opiskelijoiden rastit pysyvät.

**Uusi aikataulu 19.10.2026.** Projekti alkaa alusta viikolla 43. Sisältö ja 15 työviikkoa ovat ennallaan, ja ne on siirretty viikoille 43–51/2026 ja 2–7/2027. Joululoma on viikoilla 52, 53 ja 1, ja luovutus on pe 19.2.2027. Viikkonumerot, tehtävätunnukset (vanha 34-1 on nyt 43-1), päivämäärät ja tukisivujen nimet (`tuki/viikko-43.html`…`viikko-45.html`) vaihtuivat. Syysloma poistui, ja `perii`-kentät poistettiin, koska vanhoja rasteja ei siirretä uuteen aloitukseen.

**Kevennys ja uusi aikataulu 16.11.2026.** Projekti kevennettiin ja siirrettiin viikoille 48–53/2026 ja 1–4/2027. Luovutus on pe 29.1.2027. Työtä jatketaan siitä, mihin on päästy: repository ja GDD ovat valmiina, joten viikko 48 alkaa Unity-projektista. Rakenne: 10 viikkoa, 4 vaihetta (valmistelu, pelattava peli, testaus ja asiakkaan palaute, julkaisu ja näyttö), 36 työvaihetta ja 202 osatehtävää (ennen 15 työviikkoa, 5 vaihetta, 59 työvaihetta ja 319 osatehtävää). Kaikki asiakkaan vaatimukset ja näyttömatriisin 32 vaatimusta säilyivät. Pois jäivät skriptien kartta, featureviikkojen erilliset testitehtävät, erillinen koodin laatu -viikko, toinen käytettävyyskierros ja asiakkaan toinen testikierros. Testaus on 9 testitapausta ja 2 virheenkorjausketjua, joten `tarkista.js` antaa kaksi tietoista huomautusta (suositus 12 ja 3). Ohjaaja ja asiakas eivät ole tavoitettavissa 18.12.2026–11.1.2027: viikoilla 52, 53 ja 1 ei ole ohjaaja- eikä asiakastehtäviä, ja jouluviikko 52 on kevyt (`lyhyetViikot`). Tukirakenteet: osatehtävät ovat muodossa Missä · Tee · Näet nyt, viikkorutiini näkyy ennen työvaiheita, jokaisella viikolla on päivärytmi ja Jos et tiedä, mitä tehdä -ketju neuvoo jumiutumisessa myös lomalla. Tehtävätunnukset vaihtuivat (48-1 … 4-4). `perii`-kenttää ei käytetty, koska selaimissa on jo tallennettu tila myös vanhoille tunnuksille 48-1 … 4-3, ja silloin `perii` ei vaikuta. Viikkotekstit on tuotettu yhdestä lähteestä samalla kertaa `sisalto.js`:ään ja `index.html`:ään. Tarkastukset: Börjen tehtäväkielen tarkistus (103 korjausta) ja kaksi Ingridin kierrosta. Ingridin ajot tehtiin Mac-kannettavalla ilman learning-material-review 1.2 -sopimusta, joten ne eivät ole kanonisia. Niiden perusteella jumiutumisketjuun lisättiin palautumisreitti rikkinäisestä projektista, lomaviikoille varatehtävä ja järjestyssääntö kesken jääneelle työlle, viikon 51 aloituspalaveriin lomakoneen kokeilu ja viikon 1 alkuun lähtötilan tarkistus. Tukisivun viikko 49 puuttuvat if-lohko ja testitaulukko lisättiin.

## GitHub Pages

Sivusto on täysin staattinen. Julkaise repositoryn juuresta `main`-branchista GitHub Pagesiin.

## Paikallinen esikatselu

Voit avata `index.html`-tiedoston selaimessa tai käynnistää minkä tahansa paikallisen HTTP-palvelimen repositoryn juuressa.

## Tiedot ja yksityisyys

Tehtävien tila ja AI-loki tallentuvat vain käyttäjän selaimen paikalliseen tallennustilaan. Sivusto ei lähetä tietoja palvelimelle.

## Kuvallinen tuki viikoille 48–49

`tuki/index.html` sisältää Unity 6:n ohjatut työvaiheet, aidot tämän koneen Unity 6000.5.8f1 -kuvakaappaukset, suunnittelun havainnekuvat ja ohjaajan tarkistuspisteet. Tukisivut on linkitetty viikkojen alusta ja kunkin työvaiheen avusta. 16.11.2026 tukisivut siirrettiin uusille viikoille: `tuki/viikko-48.html` (työvaiheet 48-1…48-4) ja `tuki/viikko-49.html` (49-1…49-4). Yhdistetyt työvaiheet näkyvät tukisivulla osina 1/2 ja 2/2. Vanhat osoitteet `viikko-43.html`…`viikko-45.html` ohjaavat uusille sivuille. Kaikkien toimeksiannon vaatimusten tehtävät voivat olla P0 ilman keksittyjä lisätehtäviä.

Ensimmäiseksi avataan `tuki/ensimmainen-onnistuminen.html`: ohjaajan tukema, erilliseen AloitusKokeilu-sceneen tehtävä nimi- ja painikekokeilu. Tavoitteena välitön näkyvä onnistuminen ja opiskelijan oma pieni muutos ennen viikko-ohjeiden jatkamista.

Unity-kuvat päivitetty 6.10.2026. Aloituskokeilu ja nykyisen viikon 49 esimerkkikierros (10 / 0 pistettä) testattu Play-tilassa. Selainbuildia ei tässä tarkistuksessa ajettu. Jaettava GameManager-työpohja säilyttää TODO-kohdat.

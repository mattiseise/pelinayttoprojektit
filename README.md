# KahvilaKoodi – ohjattu näyttöprojekti

Selainpohjainen pelipolku koulun kahvilapelin toteuttamiseen näyttöprojektina. Viikot etenevät **pelifeature edellä**: jokainen viikko tuottaa peliin näkyvän ominaisuuden tai muun konkreettisen tuloksen. Featuren tekniikka (Unity, C#, JSON, PlayerPrefs, Git, WebGL) arvioidaan näytössä.

Sivusto sisältää viikot 43–51/2026 ja 2–7/2027, joululoman viikoilla 52, 53 ja 1, 19.2.2027 päättyvän aikataulun, GDD-generaattorin (esitäytetty Game Design Document, jonka omat päätökset opiskelija tekee itse ja lataa gdd.md-tiedostona), vastuullisen tekoälyn käyttöohjeet, AI-lokin, testauksen vähimmäistavoitteet, näyttöaineiston tarkistuslistat kolmesta tutkinnon osasta ja suositukset ilmaisiin grafiikkalähteisiin (spritet ja taustat).

Pedagoginen runko on tarkastettu pedagogia-agenttiputken Linnea-portilla (hyväksytty 17.8.2026).

**Tehtävänanto pilkottu 28.9.2026 (moottori v2.5).** Jokainen viikon tehtävä on tehtäväkortti: yksi tavoite, 3–7 rastitettavaa osatehtävää, miksi, valmis kun, tallenna työnäyte sekä tehtävän oma apu. Tunnukset (P0, T01, RC1…) sanallistetaan jokaisessa tehtävässä, jossa niitä käytetään. Sisältö on `sisalto.js`:n `viikkoOhjeet[w].tehtavat`-kentissä; `node tyokalut/tarkista.js` tarkistaa rakenteen ja sanallistuksen. Opiskelijoiden aiemmat rastit siirtyvät uusiin tehtäviin (`perii`-kenttä).

**Selkeytetty 30.9.2026 (moottori v2.7, `yhtenaisetViikot: true`).** Aloitus on nyt Projektin kokonaiskuva: pelaajan työnkulun havainnekuva (`assets/tyonkulku.svg`, `lopputulos`), viisi numeroitua vaihetta (`vaiheet`, vaihekuva `assets/projektin-vaiheet.svg` generoidaan komennolla `node tyokalut/tee_vaihekuva.js`) ja avattavat osiot pelin osista (`assets/sovelluksen-osat.svg`), dokumenttien tehtävistä, vaatimus–ehdotus–päätös-jaosta ja arvioinnista. Jokaisella työviikolla on oma yhteys kokonaisprojektiin (`connection`) ja tavoite (`feature`). Työn tasot: **työvaihe** = sivun viikko-ohjeen kohta, **GitHub-issue** = yksi rajattu muutos peliin, **työtapa** = Työtapa-sivun kuusi askelta. Viikon 49 top 5 -tallennuksen tietovirta on havainnekuvana `assets/tallennus-top5.svg` (työvaihe 49-2). Tehtävätunnukset, niiden järjestys ja osatehtävien järjestys säilyivät, joten opiskelijoiden rastit pysyvät.

**Uusi aikataulu 19.10.2026.** Projekti alkaa alusta viikolla 43. Sisältö ja 15 työviikkoa ovat ennallaan, ja ne on siirretty viikoille 43–51/2026 ja 2–7/2027. Joululoma on viikoilla 52, 53 ja 1, ja luovutus on pe 19.2.2027. Viikkonumerot, tehtävätunnukset (vanha 34-1 on nyt 43-1), päivämäärät ja tukisivujen nimet (`tuki/viikko-43.html`…`viikko-45.html`) vaihtuivat. Syysloma poistui, ja `perii`-kentät poistettiin, koska vanhoja rasteja ei siirretä uuteen aloitukseen.

## GitHub Pages

Sivusto on täysin staattinen. Julkaise repositoryn juuresta `main`-branchista GitHub Pagesiin.

## Paikallinen esikatselu

Voit avata `index.html`-tiedoston selaimessa tai käynnistää minkä tahansa paikallisen HTTP-palvelimen repositoryn juuressa.

## Tiedot ja yksityisyys

Tehtävien tila ja AI-loki tallentuvat vain käyttäjän selaimen paikalliseen tallennustilaan. Sivusto ei lähetä tietoja palvelimelle.

## Kuvallinen tuki viikoille 43–45

`tuki/index.html` sisältää Unity 6:n ohjatut työvaiheet, aidot tämän koneen Unity 6000.5.8f1 -kuvakaappaukset, suunnittelun havainnekuvat ja ohjaajan tarkistuspisteet. Tukisivut on linkitetty viikkojen alusta ja kunkin työvaiheen avusta. Tehtävätunnukset, osatehtävien järjestys ja selaimeen tallennetut rastit säilyvät. Viikon 44 priorisointiohjeen ristiriita on korjattu: kaikkien toimeksiannon vaatimusten tehtävät voivat olla P0 ilman keksittyjä lisätehtäviä.

Ensimmäiseksi avataan `tuki/ensimmainen-onnistuminen.html`: ohjaajan tukema, erilliseen AloitusKokeilu-sceneen tehtävä nimi- ja painikekokeilu. Tavoitteena välitön näkyvä onnistuminen ja opiskelijan oma pieni muutos ennen viikko-ohjeiden jatkamista.

Unity-kuvat päivitetty 6.10.2026. Aloituskokeilu ja viikon 45 esimerkkikierros (10 / 0 pistettä) testattu Play-tilassa. Selainbuildia ei tässä tarkistuksessa ajettu. Jaettava GameManager-työpohja säilyttää TODO-kohdat.

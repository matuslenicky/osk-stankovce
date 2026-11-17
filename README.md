# OŠK Trenčianske Stankovce – návrh webu

Návrh nového webu futbalového klubu OŠK Trenčianske Stankovce (Obecný športový klub Trenčianske Stankovce). **Nie je to oficiálna stránka klubu.** Ukážka má v hlavičke pás s týmto upozornením a vyhľadávače ju neindexujú (`noindex`).

Ukážka: https://matuslenicky.github.io/osk-stankovce/ · administrácia (ukážka bez ukladania): https://matuslenicky.github.io/osk-stankovce/admin/

## Vzhľad

**„Cez Stankovce cesta“** podľa názvu klubovej hymny. Farby z erbu: štít šikmo rozdelený na žltú a čiernu, preto žlto-čierne dopravné značenie:

- úvod ako **tabuľa začiatku obce** „Trenčianske Stankovce“, vedľa nej **rázcestník**: každý tím má žltú smerovú tabuľu so šípkou s posledným výsledkom alebo najbližším zápasom,
- **pohárová cesta** po asfaltke so stredovou čiarou: zápasy so Slovanom (2008, 2025) a Spartakom Trnava (2022, 2026) – presne dvoma klubmi, ktoré spomína hymna,
- história na **kilometrovníkoch**, nadpisy so značkou **hlavná cesta**, pod hlavičkou šikmé žlto-čierne značenie, v päte tabuľa **koniec obce**,
- zápasová karta ako žltá tabuľa s čiernou linkou, refrén hymny na žltom páse,
- písmo **Overpass** (podľa písma amerických dopravných značiek) a **Overpass Mono** na výsledky, časy a roky,
- menu na počítači v čiernom pruhu, na telefóne žltý panel sprava s odkazmi ako smerová tabuľa.

Klub nemá vlastné fotky na webe ani sociálne siete, preto je vzhľad postavený na grafike. Fotky od klubu sa dajú doplniť neskôr.

## Obsah a zdroje

- Zápasy, výsledky, strelci, karty, počty divákov, zostavy dospelých, tabuľky a súpisky 7 tímov zo Sportnetu (Futbalnet), verejné API súťaží (`scripts/sportnet.mjs` → `data/sportnet.json`). Vek hráčov sa neukladá, zostavy len pri dospelých.
- Údaje o klube v `data/klub.json`, každá časť s uvedeným zdrojom: história od roku 1959, úspechy, umiestnenia, klubová hymna (text Rudko Šulek) a sídlo z archívu doterajšieho webu klubu osktrencianskestankovce.sk (Wayback Machine, doména zanikla), pohárové zápasy 2025/26 a 2026/27 zo zápisov o stretnutí na Sportnete, 2008/09 a 2022/23 z Wikipédie, citát trénera zo sportnet.sme.sk (14. 10. 2025), Peter Kleščík z Wikipédie. Ihrisko (kapacita, sedadlá, rozmery, vlastník, poloha) zo Sportnetu. E-mail klubu zo Sportnetu.
- Erb OŠK a erby súperov zo Sportnetu (`scripts/logos.py`; erb Slovana z pohára 2025 je stiahnutý jednorazovo). Patria príslušným klubom.
- Písmo Overpass a Overpass Mono, licencia SIL Open Font License 1.1 (`scripts/fonts.py`).

## Zostavenie

Statický generátor bez závislostí (Node 20+, Python 3 s Pillow na erby):

```
node scripts/sportnet.mjs        # zápasy, tabuľky a súpisky (FULL=1 stiahne znova aj detaily zápasov)
python -I scripts/logos.py       # erby súperov a náš erb do src/img (FORCE=1 stiahne znova)
node build.js                    # data/ + src/ -> dist/ (TODAY=2026-11-17 prepíše dnešný dátum)
node scripts/serve.mjs dist 5330 # náhľad na http://127.0.0.1:5330/
node scripts/deploy.mjs          # nasadenie dist/ na vetvu gh-pages (GitHub Pages)
```

Výsledky sa po zápasoch aktualizujú samé cez GitHub Actions (`.github/workflows/sportnet.yml`).

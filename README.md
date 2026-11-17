# OŠK Trenčianske Stankovce – návrh webu

Návrh nového webu futbalového klubu OŠK Trenčianske Stankovce (Obecný športový klub Trenčianske Stankovce). **Nie je to oficiálna stránka klubu.** Ukážka má v hlavičke pás s týmto upozornením a vyhľadávače ju neindexujú (`noindex`).

Ukážka: https://matuslenicky.github.io/osk-stankovce/ · administrácia (ukážka bez ukladania): https://matuslenicky.github.io/osk-stankovce/admin/

## Vzhľad

**„Plagát“ (dizajn v2, 17. 11. 2026).** Svetlý papier, čierne kondenzované písmo Anton a pätkové Source Serif 4, žltá z klubových farieb len ako zvýraznenie.

- úvod je plagát najbližšieho zápasu (dátum, súperi a miesto veľkým písmom), pod ním tri veľké čísla áčka (miesto, body, skóre),
- program a výsledky ako zoznam s veľkými dátumami, výhra čierne pole so žltým skóre, tabuľka celej ligy,
- história, pohárové zápasy so Slovanom a Spartakom, hymna a Oddychové centrum sú na stránke Klub,
- menu na telefóne je žltá plocha cez celú obrazovku.

Web sa skladá zo spoločného jadra v2 (`kluby-siet/engine`: `python assemble.py <web>`), vlastný je `src/site.js` (úvod, Klub, nastavenia) a `src/css/skin.css`.

## Obsah a zdroje

- Zápasy, výsledky, strelci, karty, počty divákov, zostavy dospelých, tabuľky a súpisky 7 tímov zo Sportnetu (Futbalnet), verejné API súťaží (`scripts/sportnet.mjs` → `data/sportnet.json`). Vek hráčov sa neukladá, zostavy len pri dospelých.
- Údaje o klube v `data/klub.json`, každá časť s uvedeným zdrojom: história od roku 1959, úspechy, umiestnenia, klubová hymna (text Rudko Šulek) a sídlo z archívu doterajšieho webu klubu osktrencianskestankovce.sk (Wayback Machine, doména zanikla), pohárové zápasy 2025/26 a 2026/27 zo zápisov o stretnutí na Sportnete, 2008/09 a 2022/23 z Wikipédie, citát trénera zo sportnet.sme.sk (14. 10. 2025), Peter Kleščík z Wikipédie. Ihrisko (kapacita, sedadlá, rozmery, vlastník, poloha) zo Sportnetu. E-mail klubu zo Sportnetu.
- Erb OŠK a erby súperov zo Sportnetu (`scripts/logos.py`; erb Slovana z pohára 2025 je stiahnutý jednorazovo). Patria príslušným klubom.
- Písmo Anton a Source Serif 4, licencia SIL Open Font License 1.1 (`scripts/fonts.py`).

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

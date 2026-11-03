# HIMAL RISING — Game Design

**Genre:** 2D precision platformer. **Platform:** browser (desktop + mobile, keyboard / touch / gamepad).
**Pitch:** A young Sherpa guide climbs from Lukla to the summit of Sagarmatha (Everest) to tie her late
grandfather's prayer flag at the top of the world.

## Characters (original)
- **Nima Yangchen Sherpa** — the player. 19, a trail guide from the Khumbu. Red down suit, yellow
  high-altitude boots, white helmet, ice axe, black braid.
- **Ang Dorje (grandfather)** — appears only in the story cards. He carried loads for expeditions all
  his life and never stood on the summit. His prayer flag rides in Nima's pack.

## Core verbs
Run · variable-height jump (coyote time + jump buffer) · climb ladders · climb blue ice walls with the
axe (stamina-limited, wall-jump, auto-mantle) · survive the cold and thin air.

## Stages (v2: 11 stages across 8 ranges, west to east, then the Khumbu finale)
| # | Stage | Range | New threat |
|---|-------|-------|-----------|
| 1 | Kali Gandaki Gorge | Dhaulagiri Himal | updraft winds, rockfall, river |
| 2 | Annapurna Sanctuary | Annapurna Himal | tuins (cable baskets), vertical lift |
| 3 | Larkya La | Manaslu Himal | yak caravans, cold, mani walls |
| 4 | Langtang Glacier | Langtang Himal | rope lifts, icicles, tall ice wall |
| 5 | Barun Chimney | Makalu / Mahalangur | wall-jump chimney, rockfall corridor |
| 6 | Yalung Glacier | Kanchenjunga Himal | everything so far + wind |
| 7 | Lukla Trail | Khumbu | gorges, suspension bridge, crumbling stone |
| 8 | Namche Climb | Khumbu | rockfall, ladders, crumbling staircase |
| 9 | Khumbu Icefall | Khumbu | slippery ice, ladder bridges, icicles, ice walls |
| 10 | Lhotse Face | Khumbu | avalanche chase, wind gusts, cold |
| 11 | Summit | Khumbu | night storm, oxygen, everything at once |

The stage-select screen is a stylised map of Nepal labelling Api, Saipal, Kanjiroba, Dhaulagiri,
Annapurna, Manaslu, Ganesh, Langtang, Jugal, Rolwaling, Mahalangur, Makalu and Kanchenjunga.

Each stage has prayer-flag bundles to collect, chorten checkpoints and a par time.
Stars: finish · all flags · beat par.

## Build phases
1. Design, name, characters, logo (`logo.svg`)
2. Engine: fixed 120 Hz physics, collision, ladders, wall climb, input (keys/touch/gamepad), WebAudio
3. Art: procedural Himalayan parallax per stage, tile art, animated climber, weather, headlamp lighting
4. Content: five stages, hazards, meters, menus, story, saves, star ratings
5. Verification: a breadth-first solver that drives the *real* physics code proves every stage can be
   finished (including avalanche, wind worst-case, cold and oxygen limits); smoke tests + screenshots.

Run the tests: `node tests/verify.js` (needs Playwright + Chromium).

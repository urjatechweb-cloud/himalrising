# Himal Rising

A browser platformer set across the great himals of Nepal. Climb with Nima Yangchen Sherpa through
11 stages, from the Kali Gandaki gorge to Kanchenjunga, then up the Khumbu to the summit of Sagarmatha.

**Play:** open `index.html` in any modern browser (desktop or phone). No build step, no dependencies.

- Controls: arrows/WASD to move, Space/Z/K to jump, ↑ to climb, Esc to pause, M for sound. Touch and gamepad supported.
- Mechanics: ice-wall climbing and wall jumps, ladders, updrafts, cable baskets and rope lifts, yaks,
  rockfall, icicles, crumbling ground, an avalanche chase, wind, cold and oxygen.

## Files
- `index.html` — the whole game (engine, art, audio, levels, menus)
- `logo.svg` — game logo
- `DESIGN.md` — story, characters, stages, build phases
- `tests/verify.js` — proves every stage is beatable by running a search over the game's real physics, then smoke-tests each stage

## Test
```bash
npm i -g playwright   # if not installed
node tests/verify.js --shots
```

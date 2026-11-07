# 🧠 MindPop Arcade

**Tiny games. Big brain energy.** A vibrant, mobile-first, installable puzzle PWA, launching with **Peg Jump** (15-hole triangle peg solitaire).

## What's inside

- 🎯 **Peg Jump:** every legal jump validated by an independent pure JavaScript engine.
- ✨ **Smart hint:** solver searches the remaining state space, preferring a one-peg finish at the top hole. If a one-peg finish is no longer possible, it reports the best achievable outcome.
- ↶ **Undo**, restart and incremental guided solving.
- ☀ **Daily challenge** with reproducible, solvable opening positions.
- 🏆 Locally saved personal best times (unguided games only), past progress and win counts.
- 🎨 Three live-changeable colour palettes, opt-in game sounds, animations and responsive layout.
- 📱 Offline-first installable PWA. Plays without a login and without a backend.
- 🕹 Expandable game collection with placeholders for Memory Flip, Number Trail and Colour Shift.

## Running & testing

Requires Node.js 20+ only for the build/tests; no external dependencies are needed to run the app.

```bash
npm test
npm run build
```

The build creates a deployable `dist/` folder. Serve it with any static HTTPS host. For a local development server:

```bash
python3 -m http.server 8000 --directory dist
```

Visit `http://localhost:8000`. The PWA service worker is enabled when hosted on HTTPS; localhost is treated as a secure context by browsers, but this app intentionally registers the service worker for HTTPS deployments only.

## Deploying with Netlify

The included `netlify.toml` configures:

- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect and basic security headers

**Recommended:** Create a dedicated GitHub repository (`mindpop-arcade`), push these source files, then in Netlify choose **Add new project → Import an existing project → GitHub**. Netlify will build and deploy automatically on each push.

**Manual one-time option:** Upload the **contents of `dist`** (or the prepared `mindpop-deploy.zip`) in Netlify's deployment interface. A manual upload is not automatically connected to GitHub; connect the Git repository later for continuous deployment.

## Architecture

```text
index.html               # accessible pages, game board, installation UI
styles.css               # responsive design system and colour themes
app.js                   # interface state and event handlers
src/logic.js             # pure Peg Jump rules, solver and game catalogue
sw.js                    # offline cache
manifest.webmanifest     # installation details
icons/                  # app icons
netlify.toml             # deploy configuration
tests/logic.test.js      # game-engine tests
tools/build.js           # dependency-free build script
```

The game catalogue is defined in `GAME_CATALOG`. The next game should have its own independent rules module and its own route/view; Peg Jump's solver is entirely DOM-independent and reusable.

## Note on data

GitHub is a **source-code repository**, not a secure runtime database. Version 1 saves scores and unfinished boards in `localStorage` on each device and supports offline play. Accounts, synced progress, multiplayer and global leaderboards should use a real hosted database (e.g. Supabase/Netlify Database) in a later version. The app intentionally requires **no secrets or backend permissions**.

## User experience

1. Tap a peg.
2. Tap an empty hole exactly two positions away, jumping one adjacent peg in a straight line.
3. The jumped peg disappears.
4. Finish with exactly one peg left.

The classic start has only the top hole empty. A completed game uses 13 legal jumps.
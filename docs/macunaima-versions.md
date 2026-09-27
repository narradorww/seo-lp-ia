# Playable creation history

- `/games/macunaima/v1`: original prototype restored from commit `92d92e7`, including its original engine, art and controls. Only the version navigation, asset paths, page title/canonical URL and record storage namespace differ.
- `/games/macunaima/v2`: detailed pixel artwork, Grande Otelo tribute cover and one-thumb phone controls, from commit `bc6f90b`.
- `/games/macunaima`: temporary redirect to the current version, V2.

Each version has its own HTML, CSS, engine and controller under `public/arcade/macunaima/v1` or `v2`. V2 also has its own renderer. Shared artwork uses distinct stable asset names; keep those files when adding later versions. V1 uses a separate high-score key so scores from the different boards are not mixed.

For a new creative iteration, add a new version directory and explicit route, add its learning notes to `src/data/games.ts`, then update the current-version link and redirect. Keep earlier playable snapshots available. The catalog retains one game entry with an ordered history of its versions.

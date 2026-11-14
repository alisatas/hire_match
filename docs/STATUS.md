# CVXray — status and open items

Read when planning work or checking search visibility; update after each check or when an item
is done. (Kept out of PROJECT.md so it is not loaded on every turn.)

## Search visibility status (update after each check)

- Google Search Console: URL-prefix property `https://cvxray.com/`, first data 2026-11-10.
- Bing Webmaster (2026-11-14): Search Performance not ready yet; AI citations 0; sitemap
  resubmitted (135 URLs), five home pages submitted; `/tr` live test passes but stored status
  "not indexed". **Recheck ~2026-11-16.**
- IndexNow: `.github/workflows/indexnow.yml` submits all sitemap URLs after content deploys
  (verified: 135 URLs on 2026-11-13).

## Known gaps and follow-ups

- Chinese copy and all legal translations: no native or legal review yet (English prevails).
- Course titles stay English (proper names of external courses).
- CV quality check runs on English CVs only.
- Play Store: owner needs a developer account and an upload key; then a signed bundle.
- The Excalidraw script named in CLAUDE.md (`/Users/aliisatas/Desktop/hire-match/update-canvas.mjs`)
  does not exist on this machine and nothing listens on port 3002 — skipped until the owner
  restores it.
- `gh` CLI is not installed; GitHub checks go through the web UI.

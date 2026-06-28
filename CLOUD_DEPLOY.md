# JobRadar — Cloud Deployment Guide (Railway)

This moves JobRadar from "running on your Mac" to "running at a real URL,
reachable from your phone." Free tier is sufficient for this workload.

---

## What changes, what doesn't

- `server.js` and `app.html` run exactly as they do locally — no code changes needed.
- The JSearch API key moves from hardcoded into an **environment variable** (already done in server.js — it reads `process.env.JSEARCH_KEY` first, falls back to the built-in default).
- `state.json` (your job feed, statuses, comp targets) lives on Railway's filesystem.
  **Known limitation:** Railway's filesystem resets on every redeploy. State survives
  restarts and crashes, but NOT a `git push` that triggers a new build. If you push
  code changes, you'll lose accumulated job data unless you export CSV/JSON first
  or add a database later (Postgres on Railway is one click — a future step, not now).

---

## Step 1 — Get the code into GitHub

```bash
cd ~/jobradar
git init
git add server.js app.html package.json
git commit -m "JobRadar initial commit"
```

Create a new repo on github.com (private is fine), then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/jobradar.git
git branch -M main
git push -u origin main
```

> Don't commit `node_modules/`, `state.json`, or `assets/` (Electron-specific).
> Add a `.gitignore`:
> ```
> node_modules/
> state.json
> dist/
> ```

---

## Step 2 — Create a Railway project

1. Go to railway.app, sign up with GitHub
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your `jobradar` repo
4. Railway will detect Node.js automatically

---

## Step 3 — Set the start command

Your `package.json` currently has `"main": "main.js"` (Electron entry) and
`"start": "electron ."` — Railway should NOT run Electron.

In Railway's project settings → **Deploy**:
- Set **Custom Start Command** to:
  ```
  node server.js
  ```

This overrides the package.json start script for this deployment only.

---

## Step 4 — Set environment variables

In Railway project settings → **Variables**, add:

| Key | Value |
|-----|-------|
| `JSEARCH_KEY` | `your_rapidapi_key_here` |

(Or your own RapidAPI key if you've rotated it. Railway also sets `PORT`
automatically — `server.js` already reads `process.env.PORT`, so no action needed.)

---

## Step 5 — Deploy and get your URL

Railway builds and deploys automatically after step 2. Once live:
- Go to **Settings** → **Networking** → **Generate Domain**
- You'll get a URL like `jobradar-production-xxxx.up.railway.app`

Open that URL in any browser — desktop or mobile.

---

## Step 6 — Install on iPhone as a PWA

1. Open the Railway URL in Safari on your iPhone
2. Tap the **Share** button → **Add to Home Screen**
3. JobRadar now opens full-screen like a native app, with its own icon

---

## Step 7 — Verify

- Open the app, click **Scan Now** — confirm results populate
- Check the sync indicator in the intel bar — should show "Synced" (green dot)
- Refresh the page — your jobs, statuses, and comp targets should persist
  (this is the `/state` endpoint working against Railway's filesystem)

---

## Ongoing usage

- The app is now reachable from any device, anytime, without your Mac running
- Each scan still consumes JSearch API budget (200/month) — same constraint as local
- To update the code: push to GitHub, Railway auto-redeploys
  (remember: this resets `state.json` — export CSV first if you have data you care about)

---

## Future step (not now): persistent database

When `state.json` resets-on-redeploy becomes a real problem, Railway offers a
one-click Postgres add-on. At that point `readState()`/`writeState()` in
`server.js` get swapped for simple SQL queries against a `state` table —
small change, but worth doing only once redeploys are frequent enough to matter.

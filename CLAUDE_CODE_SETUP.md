# JobRadar — Claude Code Setup Guide

This guide is written for Claude Code to execute. Run it from the `~/jobradar` directory.

---

## Context

JobRadar is a personal job intelligence desktop application built with:
- **Electron** — wraps the web UI into a native Mac desktop app
- **Node.js** — runs an internal proxy server (`server.js`) that forwards search requests to the JSearch API on RapidAPI
- **HTML/CSS/JS** — single-file UI (`app.html`) served by the proxy

The project files that must already exist in `~/jobradar` before running this guide:
- `app.html` — the full UI
- `server.js` — the proxy server

---

## Phase 1 — Scaffold the project

### 1.1 Verify working directory and existing files

```bash
cd ~/jobradar
ls -la
```

Expected: `app.html` and `server.js` are present. If either is missing, stop and request them before continuing.

### 1.2 Create the assets directory

```bash
mkdir -p ~/jobradar/assets
```

---

## Phase 2 — Create required Electron files

### 2.1 Create `main.js`

Create the file `~/jobradar/main.js` with the following content:

```javascript
const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

// Start the internal proxy server
require('./server.js');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    title: 'JobRadar',
    backgroundColor: '#F9F7F4',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    titleBarStyle: 'hiddenInset',
    show: false,
  });

  // Give the proxy 800ms to start before loading the UI
  setTimeout(() => {
    mainWindow.loadURL('http://localhost:3000');
  }, 800);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open external links (Apply ↗) in the system browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
```

### 2.2 Create `preload.js`

Create the file `~/jobradar/preload.js` with the following content:

```javascript
window.addEventListener('DOMContentLoaded', () => {
  console.log('JobRadar desktop ready');
});
```

### 2.3 Create `package.json`

Create the file `~/jobradar/package.json` with the following content:

```json
{
  "name": "jobradar",
  "version": "1.0.0",
  "description": "JobRadar — Personal Job Intelligence Platform",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "build": "electron-builder --mac",
    "build-dmg": "electron-builder --mac dmg"
  },
  "devDependencies": {
    "electron": "^29.0.0",
    "electron-builder": "^24.0.0"
  },
  "build": {
    "appId": "com.jobradar.app",
    "productName": "JobRadar",
    "mac": {
      "category": "public.app-category.productivity",
      "icon": "assets/icon.icns",
      "target": [
        { "target": "dmg", "arch": ["arm64", "x64"] }
      ]
    },
    "files": [
      "main.js",
      "preload.js",
      "server.js",
      "app.html",
      "assets/**"
    ]
  }
}
```

### 2.4 Patch `server.js` — make port configurable

Find this line in `~/jobradar/server.js`:

```javascript
const PORT = 3000;
```

Replace it with:

```javascript
const PORT = process.env.PORT || 3000;
```

This is required for both Electron (internal process management) and any future cloud deployment.

---

## Phase 3 — Create the app icon

### 3.1 Create `assets/icon.svg`

Create the file `~/jobradar/assets/icon.svg` with the following content:

```svg
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="100" fill="#141210"/>
  <circle cx="256" cy="220" r="90" fill="none" stroke="#1C6443" stroke-width="28"/>
  <circle cx="256" cy="220" r="30" fill="#1C6443"/>
  <line x1="322" y1="286" x2="390" y2="370" stroke="#1C6443" stroke-width="28" stroke-linecap="round"/>
  <text x="256" y="430" font-family="sans-serif" font-weight="800" font-size="72" fill="white" text-anchor="middle">RADAR</text>
</svg>
```

### 3.2 Convert SVG to PNG and ICNS (required for .dmg build)

Run the following commands in sequence:

```bash
# Install the icon builder globally
npm install -g electron-icon-builder

# Convert the SVG to PNG first using a headless tool
# If sharp or canvas is available, use it — otherwise note that
# the icon can be swapped manually: replace assets/icon.png
# with any 512x512 PNG before running electron-icon-builder

# If you have ImageMagick:
convert ~/jobradar/assets/icon.svg -resize 512x512 ~/jobradar/assets/icon.png

# Generate icns from png
electron-icon-builder --input=~/jobradar/assets/icon.png --output=~/jobradar/assets/
```

> If ImageMagick is not available, skip icon conversion for now. The app will run without it. You only need `icon.icns` for the final `.dmg` build step.

---

## Phase 4 — Install dependencies and run

### 4.1 Install npm dependencies

```bash
cd ~/jobradar
npm install
```

Expected output: Electron and electron-builder installed into `node_modules/`. Takes 2–3 minutes on first run.

### 4.2 Verify the file structure

```bash
ls -la ~/jobradar
```

Expected files present:
- `main.js`
- `preload.js`
- `server.js`
- `app.html`
- `package.json`
- `node_modules/` (directory)
- `assets/` (directory containing `icon.svg`)

### 4.3 Launch the app

```bash
cd ~/jobradar
npm start
```

Expected: A native Mac window opens with the JobRadar UI. The proxy starts automatically inside the app. No separate terminal window is needed.

---

## Phase 5 — Build a distributable .dmg (optional)

Only run this phase after the app launches and works correctly in Phase 4.

### 5.1 Confirm icon.icns exists

```bash
ls ~/jobradar/assets/
```

`icon.icns` must be present. If it is not, complete the icon conversion in Step 3.2 before continuing.

### 5.2 Run the build

```bash
cd ~/jobradar
npm run build
```

Expected: A `dist/` folder is created containing:
- `JobRadar-1.0.0-arm64.dmg` (Apple Silicon)
- `JobRadar-1.0.0-x64.dmg` (Intel Mac)

### 5.3 Install the app

1. Open Finder → navigate to `~/jobradar/dist/`
2. Double-click the `.dmg` matching your Mac architecture
3. Drag JobRadar to the Applications folder
4. Open from Applications — approve any Gatekeeper prompt

---

## Verification checklist

After completing Phase 4, confirm the following before proceeding to Phase 5:

- [ ] `npm start` opens a window without errors
- [ ] The JobRadar UI loads (no blank screen after 2 seconds)
- [ ] Clicking Scan Now fires a request and returns results
- [ ] Clicking Apply ↗ on a job card opens the link in your browser, not in the app window
- [ ] Closing the window and re-opening with `npm start` restores the previous job feed

---

## Troubleshooting

**Blank screen on launch**
The proxy needs ~800ms to initialize. If the screen is blank after 3 seconds, press Cmd+R to reload. If it persists, check that `server.js` is in the same directory as `main.js`.

**Port 3000 already in use**
Another process is holding the port. Run:
```bash
lsof -i :3000
```
Kill the listed process ID:
```bash
kill -9 <PID>
```
Then restart with `npm start`.

**`npm install` fails**
Ensure Node.js v18 or higher is installed:
```bash
node --version
```
If below v18, download the LTS version from nodejs.org and reinstall.

**Build fails: icon not found**
The `.dmg` build requires `assets/icon.icns`. Complete Step 3.2 first. To build without an icon temporarily, remove the `"icon"` line from `package.json` under the `"mac"` section.

**App opens but Scan Now returns no results**
The proxy is running but JSearch is not responding. Check:
1. Your machine has an active internet connection
2. The JSearch API key in `server.js` is valid and has remaining calls
3. Open `http://localhost:3000/health` in your browser to confirm the proxy is responding

---

## File responsibility summary

| File | Purpose |
|------|---------|
| `main.js` | Electron entry point — creates the window, starts the proxy, manages app lifecycle |
| `preload.js` | Security bridge between the web page and Node.js — required by Electron |
| `server.js` | Internal proxy — handles all JSearch API calls, serves `app.html` |
| `app.html` | Full UI — scoring engine, job cards, pipeline tracking, AI briefs |
| `package.json` | Project config — defines start/build scripts and Electron builder settings |
| `assets/icon.icns` | App icon — required for .dmg distribution build |


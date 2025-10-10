# YT → MPV (Electron)

Minimal Electron app: paste a YouTube link — it opens `mpv.exe` (via `yt-dlp`) and plays the video.

## Requirements
- Windows
- Node.js LTS
- `mpv.exe` (see below)

## `mpv.exe` setup
1. Download `mpv.exe`can be downloaded here https://drive.google.com/drive/folders/1mBnF-koaapXOIHl2rcO7TUM2ARnyol6i?usp=sharing
2. Place `mpv.exe` into the `bin/` folder at the project root.
   - The path must be `bin/mpv.exe`.
   - The file is in `.gitignore`, so it will not be committed.

You may also keep `yt-dlp.exe` in `bin/`, but the app only launches `mpv.exe`. `mpv` integrates with `yt-dlp` itself.

## Development
```bash
npm i
npm run dev      # starts Vite dev server
npm run electron # launches Electron and loads http://localhost:5173
```

Alternative: `npm start` equals `npm run electron`.

## Build
```bash
npm run build:renderer  # build renderer (Vite)
npm run build           # build installer (electron-builder)
```

The installer will appear in `dist/`. During installation `bin/` is copied to `resources/bin`. The app resolves `mpv.exe` as:
- dev: `bin/mpv.exe` at project root
- prod: `<resources>/bin/mpv.exe`

## White screen after installation?
- Production loads `dist/index.html` locally. Vite config uses `base: './'` so asset paths are relative.
- If the screen is white, ensure `mpv.exe` is not blocked by antivirus and that it exists at `bin/mpv.exe` before building.

## Tech
- React + Vite
- Electron + electron-builder

## Structure
- `main.js` — Electron entry point; creates the window and invokes `mpv`
- `preload.js` — IPC bridge
- `src/` — renderer (React)
- `bin/` — external binaries (`mpv.exe`, optionally `yt-dlp.exe`)

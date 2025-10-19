# Simple Web Music Player

This is a minimal web-based music player with a 3-song playlist, play/pause, 5s forward/back controls, and a progress bar.

Files added:
- `index.html` — main UI
- `styles.css` — styles
- `app.js` — player logic
- `assets/` — (not included) place your mp3 files here

How to use
1. Put three MP3 files into an `assets` folder next to `index.html` and name them `song1.mp3`, `song2.mp3`, `song3.mp3` — or edit the `data-src` attributes in `index.html` to point to your files.
2. Open `index.html` in your browser. Some browsers restrict audio/autoplay when opened via file:// — if playback doesn't start, run a simple local server:

On Windows (PowerShell):
```
python -m http.server 8000
```
Then open http://localhost:8000/

What it does
- Click a song in the playlist to load and play it.
- Play/Pause button toggles playback.
- « 5s and 5s » buttons seek backward/forward by 5 seconds.
- Progress bar shows current position and allows seeking.

Notes
- Browser must support HTML5 audio (modern Chrome/Edge/Firefox do).
- If your audio files are large, allow time for metadata to load.

No-JS option

If you want a version that uses no JavaScript (works fully offline and requires only HTML/CSS), open `index-nojs.html` instead. For each `<audio>` tag in that file, edit the `src` attribute to point to your local file. Examples of valid paths:

- Relative (from the same folder as `index-nojs.html`): `assets/song1.mp3`
- Absolute file URI (Windows): `file:///C:/Users/you/Music/song1.mp3`

Note: when using `file:///` links some browsers may block cross-origin access for security reasons when opening via `file://`. If a play button doesn't work, run a local server as shown above and use relative paths instead.

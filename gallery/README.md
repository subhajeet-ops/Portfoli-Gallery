# The Gallery

Interactive museum portfolio — walk through rooms, view paintings.

## Structure

```
gallery/
├── index.html              ← markup only (~8KB)
├── css/
│   └── style.css           ← all styles
├── js/
│   └── main.js             ← all game logic
└── assets/
    └── paintings/          ← Room I images
        ├── padmavati.jpg
        ├── howsthejosh.png
        ├── splash.png
        ├── shershaah.png
        └── girl.png
```

## Adding Room 2

1. Add images to `assets/digital/` (or whatever the room theme is)
2. Add a new `<div class="scene" id="room2">` block in `index.html`
3. Add a `room2.js` in `js/` and include it with `<script src="js/room2.js">`
4. Add `room2.css` in `css/` if the room needs unique styles
5. Unlock the Door II in the hallway: remove `locked` class, set `data-room="room2"`

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "initial gallery"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gallery.git
git push -u origin main
```
Then in GitHub → Settings → Pages → Source: `main` branch, `/ (root)`.

## Deploy to Netlify

Drag and drop the `gallery/` folder onto netlify.com/drop — live in seconds.

## Controls

- **Click floor** (hallway) — walk to position  
- **Click door** — enter room  
- **Arrow keys / A D** — move in room  
- **Click painting** — open detail overlay  
- **Escape / ✕** — close overlay  
- **Walk to far right arch** — exit room  

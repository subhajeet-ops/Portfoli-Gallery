# ✦ The Gallery

An interactive, walk-through museum portfolio built with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies. Walk through rooms, approach paintings, and view them up close.

**Live site →** [your-url.vercel.app](https://your-url.vercel.app)

---

## What it is

A browser-based gallery where a character (and their dog) walks through museum rooms. Each room holds a collection of artworks — click any painting to open a full detail view with title, quote, and description.

Currently live:
- **Room I — Paintings** · graphite & colour pencil works

Coming soon:
- **Room II — Digital Art**
- **Room III — About Me**

---

## Controls

| Action | How |
|---|---|
| Walk in hallway | Click the floor |
| Enter a room | Click a door |
| Move in room | Arrow keys or `A` / `D` |
| View a painting | Click on it |
| Close detail view | `Escape` or ✕ |
| Exit room | Walk to the far right arch |
| Mobile | ◀ ▶ buttons on screen |

---

## Project structure

```
Portfoli-Gallery/
├── index.html              ← all markup
├── README.md
├── css/
│   └── style.css           ← all styles
├── js/
│   └── main.js             ← all game logic
└── assets/
    ├── paintings/          ← Room I images
    │   ├── padmavati.jpg
    │   ├── howsthejosh.png
    │   ├── splash.png
    │   ├── shershaah.png
    │   └── girl.png
    └── digital/            ← Room II images (coming soon)
```

---

## Adding a new room

1. Add images to `assets/your-room-theme/`
2. Add a `<div class="scene" id="roomN">` block in `index.html`
3. Unlock the door in the hallway — remove `locked` class, set `data-room="roomN"`
4. Add room logic to `js/main.js` (copy the Room 2 template)
5. Push to GitHub → Vercel auto-deploys

---

## Deploying

Hosted on **Vercel**, connected to this GitHub repo. Every push to `main` triggers an automatic redeploy.

```bash
# after making changes
git add .
git commit -m "your message"
git push
```

---

## Tech

Pure HTML · CSS · Vanilla JavaScript · Zero dependencies · Zero frameworks

---

*Built by [@subhajeet-ops](https://github.com/subhajeet-ops)*

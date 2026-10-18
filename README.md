# SVU Season 5 — Interactive Detective Game

**Fan-made interactive case files** for every episode of *Law & Order: Special Victims Unit* Season 5.

You play as an SVU detective. Examine evidence, interview persons of interest, follow leads, and make decisions that mirror the investigative process of each episode.

## Important Disclaimers

- This is an **unofficial fan project**. It is not affiliated with, endorsed by, or connected to NBC, Universal, Dick Wolf, or any rights holders.
- **No copyrighted scripts, dialogue, or detailed scene recreations** are used. All case content is derived exclusively from publicly available high-level plot summaries (IMDb, Wikipedia, episode guides).
- Episodes contain mature themes (sexual violence, abuse, etc.). Content is kept non-graphic and focused on procedure and decision-making.
- For best results, watch the episode first (or along with the game) so the interactive choices feel contextual.

## Quick Start (Local)

```bash
# 1. Clone the repo
git clone https://github.com/joeyfrogge-jpg/svu-season5-detective-game.git
cd svu-season5-detective-game

# 2. Install nothing extra is required, but a static server is recommended for ES modules
npm start
# or
npx serve . -p 3000
# or
python -m http.server 8000
```

Open the URL shown (usually http://localhost:3000) in Chrome, Firefox, Edge, or Safari.

You can also open `index.html` directly, but some browsers restrict ES module loading from the `file://` protocol — a local server is the reliable way.

## Deploy to GitHub Pages (Free & Permanent)

1. Go to the repository on GitHub: https://github.com/joeyfrogge-jpg/svu-season5-detective-game
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, choose **Deploy from a branch**
4. Select branch **main** and folder **/ (root)**
5. Click **Save**

After a minute or two the site will be live at:

**https://joeyfrogge-jpg.github.io/svu-season5-detective-game/**

Any future push to `main` will automatically update the live site.

### Alternative: Netlify / Vercel / Cloudflare Pages

- Drag-and-drop the project folder, or
- Connect the GitHub repo and set the publish directory to `/` (root). No build command needed.

## Project Structure

```
├── index.html              # Episode selector & hub
├── package.json            # npm start / serve scripts
├── css/
│   └── styles.css          # Dark noir theme + animations
├── js/
│   ├── engine.js           # Core interactive detective engine
│   ├── main.js             # App bootstrap + episode loader
│   └── episodes/           # One unique module per episode
│       ├── 01-tragedy.js
│       ├── 02-manic.js
│       ├── 03-mother.js
│       └── ...
└── README.md
```

## Episode List (Season 5)

1. Tragedy  
2. Manic  
3. Mother  
4. Loss  
5. Serendipity  
6. Coerced  
7. Choice  
8. Abomination  
9. Control  
10. Shaken  
11. Escape  
12. Brotherhood  
13. Hate  
14. Ritual  
15. Families  
16. Home  
17. Mean  
18. Careless  
19. Sick  
20. Lowdown  
21. Criminal  
22. Painless  
23. Bound  
24. Poison  
25. Head  

Each episode has its own evidence board, persons of interest, branching interview questions, and decision stages based on public plot points.

## Design Goals

- Structured and intentional
- Clear visual hierarchy (evidence board, case file, interrogation)
- Smooth CSS animations
- Replayable decision paths with meaningful feedback
- Easy to expand — new episodes are just additional modules

---

Built for personal use while watching Season 5. Enjoy the cases, detective.

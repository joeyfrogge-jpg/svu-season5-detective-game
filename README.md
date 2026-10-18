# SVU Season 5 — Interactive Detective Game

**Fan-made interactive case files** for every episode of *Law & Order: Special Victims Unit* Season 5.

You play as an SVU detective. Examine evidence, interview persons of interest, follow leads, and make decisions that mirror the investigative process of each episode.

## Important Disclaimers

- This is an **unofficial fan project**. It is not affiliated with, endorsed by, or connected to NBC, Universal, Dick Wolf, or any rights holders.
- **No copyrighted scripts, dialogue, or detailed scene recreations** are used. All case content is derived exclusively from publicly available high-level plot summaries (IMDb, Wikipedia, episode guides).
- Episodes contain mature themes (sexual violence, abuse, etc.). Content is kept non-graphic and focused on procedure and decision-making.
- For best results, watch the episode first (or along with the game) so the interactive choices feel contextual.

## How to Play

1. Open `index.html` in a modern browser (Chrome, Firefox, Edge, Safari).
2. Select an episode from the Season 5 grid.
3. Work the case: review the overview, examine evidence cards, choose interrogation approaches, follow or discard leads.
4. Your choices affect the investigation path and final case assessment.

No build step required for basic use. For local development with ES modules, a simple static server is recommended (`npx serve` or `python -m http.server`).

## Project Structure

```
├── index.html              # Episode selector & hub
├── css/
│   └── styles.css          # Dark noir theme + animations
├── js/
│   ├── engine.js           # Core interactive detective engine
│   ├── main.js             # App bootstrap
│   └── episodes/           # One module per episode (unique content)
│       ├── 01-tragedy.js
│       ├── 02-manic.js
│       └── ... (all 25)
├── assets/                 # Optional future icons / board elements
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

Each episode module contains unique evidence items, suspects, and decision trees tailored to that episode’s public plot points.

## Design Goals

- Structured and intentional, not thrown together
- Clear visual hierarchy (evidence board, case file, interrogation pane)
- Smooth CSS animations for card reveals, board updates, and state changes
- Replayable decision paths with meaningful feedback
- Expandable architecture: deeper stages or new episodes can be added without rewriting the engine

## Running Locally

```bash
# Recommended for proper module loading
npx serve .
# or
python -m http.server 8000
```

Then open the served URL in your browser.

---

Built for personal use while watching Season 5. Enjoy the cases, detective.

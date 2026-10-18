/**
 * Main bootstrap for SVU Season 5 Detective Game
 */

import { DetectiveEngine } from './engine.js';

const EPISODES = [
  { num: 1,  id: '01-tragedy',     title: 'Tragedy' },
  { num: 2,  id: '02-manic',       title: 'Manic' },
  { num: 3,  id: '03-mother',      title: 'Mother' },
  { num: 4,  id: '04-loss',        title: 'Loss' },
  { num: 5,  id: '05-serendipity', title: 'Serendipity' },
  { num: 6,  id: '06-coerced',     title: 'Coerced' },
  { num: 7,  id: '07-choice',      title: 'Choice' },
  { num: 8,  id: '08-abomination', title: 'Abomination' },
  { num: 9,  id: '09-control',     title: 'Control' },
  { num: 10, id: '10-shaken',      title: 'Shaken' },
  { num: 11, id: '11-escape',      title: 'Escape' },
  { num: 12, id: '12-brotherhood', title: 'Brotherhood' },
  { num: 13, id: '13-hate',        title: 'Hate' },
  { num: 14, id: '14-ritual',      title: 'Ritual' },
  { num: 15, id: '15-families',    title: 'Families' },
  { num: 16, id: '16-home',        title: 'Home' },
  { num: 17, id: '17-mean',        title: 'Mean' },
  { num: 18, id: '18-careless',    title: 'Careless' },
  { num: 19, id: '19-sick',        title: 'Sick' },
  { num: 20, id: '20-lowdown',     title: 'Lowdown' },
  { num: 21, id: '21-criminal',    title: 'Criminal' },
  { num: 22, id: '22-painless',    title: 'Painless' },
  { num: 23, id: '23-bound',       title: 'Bound' },
  { num: 24, id: '24-poison',      title: 'Poison' },
  { num: 25, id: '25-head',        title: 'Head' }
];

const grid = document.getElementById('episode-grid');
const selectorView = document.getElementById('selector-view');
const caseView = document.getElementById('case-view');

let currentEngine = null;

// Build episode grid
EPISODES.forEach((ep, idx) => {
  const card = document.createElement('div');
  card.className = 'episode-card';
  card.style.animationDelay = `${0.04 * idx}s`;
  card.innerHTML = `
    <div class="ep-num">Episode ${ep.num}</div>
    <div class="ep-title">${ep.title}</div>
    <div class="ep-status">Open case file</div>
  `;
  card.addEventListener('click', () => loadEpisode(ep));
  grid.appendChild(card);
});

async function loadEpisode(ep) {
  try {
    const module = await import(`./episodes/${ep.id}.js`);
    const data = module.default;

    selectorView.style.display = 'none';
    caseView.classList.add('active');
    caseView.innerHTML = '';

    currentEngine = new DetectiveEngine(caseView, data);
  } catch (err) {
    console.error('Failed to load episode:', err);
    alert(`Episode module "${ep.id}" is not fully implemented yet or failed to load.\n\nCheck the console for details. More episodes are being added.`);
  }
}

window.addEventListener('back-to-list', () => {
  caseView.classList.remove('active');
  caseView.innerHTML = '';
  selectorView.style.display = 'block';
  currentEngine = null;
});

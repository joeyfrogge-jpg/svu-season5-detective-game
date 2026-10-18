/**
 * SVU Season 5 Detective Engine
 * Handles evidence examination, suspect interviews, choice trees, and case progress.
 * Episode data is loaded from modules in js/episodes/.
 */

export class DetectiveEngine {
  constructor(container, episodeData) {
    this.container = container;
    this.data = episodeData;
    this.state = {
      examinedEvidence: new Set(),
      interviewed: new Set(),
      flags: new Set(),          // story flags unlocked by choices
      stage: 'overview',        // overview | investigate | interview | conclude
      score: 0,
      maxScore: 0,
      log: [],
      currentSuspect: null,
      finished: false
    };

    // Calculate max possible score from data
    this.state.maxScore = this.calculateMaxScore();
    this.render();
  }

  calculateMaxScore() {
    let max = 0;
    if (this.data.evidence) max += this.data.evidence.length * 5;
    if (this.data.stages) {
      this.data.stages.forEach(s => {
        if (s.choices) max += 10; // rough weighting
      });
    }
    return Math.max(max, 50);
  }

  log(message, type = 'info') {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    this.state.log.unshift({ time, message, type });
    if (this.state.log.length > 40) this.state.log.pop();
  }

  examineEvidence(id) {
    if (this.state.examinedEvidence.has(id) || this.state.finished) return;
    const item = this.data.evidence.find(e => e.id === id);
    if (!item) return;

    this.state.examinedEvidence.add(id);
    this.state.score += 5;
    this.log(`Examined evidence: ${item.name}`, 'evidence');

    if (item.unlocks) {
      item.unlocks.forEach(f => this.state.flags.add(f));
    }

    // Show detail modal
    this.showModal({
      title: item.name,
      subtitle: item.type || 'Evidence',
      body: item.description,
      actions: [{ label: 'Close', action: () => this.closeModal() }]
    });

    this.render();
  }

  selectSuspect(id) {
    if (this.state.finished) return;
    const suspect = this.data.suspects.find(s => s.id === id);
    if (!suspect) return;

    this.state.currentSuspect = id;
    this.renderInterview(suspect);
  }

  renderInterview(suspect) {
    // Find available questions based on flags and prior interviews
    const questions = (suspect.questions || []).filter(q => {
      if (q.requires && !q.requires.every(f => this.state.flags.has(f))) return false;
      if (q.once && this.state.interviewed.has(`${suspect.id}:${q.id}`)) return false;
      return true;
    });

    const choices = questions.map(q => ({
      label: q.prompt,
      action: () => this.askQuestion(suspect, q)
    }));

    choices.push({
      label: 'End interview',
      action: () => {
        this.state.currentSuspect = null;
        this.closeModal();
        this.render();
      }
    });

    this.showModal({
      title: suspect.name,
      subtitle: suspect.role,
      body: suspect.intro || `You are speaking with ${suspect.name}.`,
      choices
    });
  }

  askQuestion(suspect, question) {
    this.state.interviewed.add(`${suspect.id}:${question.id}`);
    this.state.score += question.points || 5;

    if (question.unlocks) {
      question.unlocks.forEach(f => this.state.flags.add(f));
    }

    this.log(`Asked ${suspect.name}: ${question.prompt}`, 'interview');

    // Response modal then return to interview
    this.showModal({
      title: suspect.name,
      subtitle: 'Response',
      body: question.response,
      actions: [{
        label: 'Continue',
        action: () => this.renderInterview(suspect)
      }]
    });
  }

  runStage(stageId) {
    const stage = (this.data.stages || []).find(s => s.id === stageId);
    if (!stage) return;

    this.state.stage = stageId;
    this.log(stage.narrative || `Entered stage: ${stage.title}`, 'stage');

    if (stage.choices && stage.choices.length) {
      const available = stage.choices.filter(c => {
        if (c.requires && !c.requires.every(f => this.state.flags.has(f))) return false;
        return true;
      });

      this.showModal({
        title: stage.title,
        subtitle: stage.subtitle || 'Decision Point',
        body: stage.narrative,
        choices: available.map(c => ({
          label: c.label,
          action: () => this.makeChoice(c)
        }))
      });
    } else {
      this.render();
    }
  }

  makeChoice(choice) {
    if (choice.unlocks) {
      choice.unlocks.forEach(f => this.state.flags.add(f));
    }
    this.state.score += choice.points || 0;
    this.log(choice.result || choice.label, 'choice');

    this.closeModal();

    if (choice.nextStage) {
      this.runStage(choice.nextStage);
    } else if (choice.conclude) {
      this.concludeCase();
    } else {
      this.render();
    }
  }

  concludeCase() {
    this.state.finished = true;
    const ratio = this.state.score / this.state.maxScore;
    let verdict, className;

    if (ratio >= 0.75) {
      verdict = this.data.goodEnding || 'Solid investigative work. The case is closed with strong procedural decisions.';
      className = 'success';
    } else if (ratio >= 0.45) {
      verdict = this.data.partialEnding || 'You reached a resolution, but some leads were missed or decisions delayed the process.';
      className = 'partial';
    } else {
      verdict = this.data.poorEnding || 'Critical leads were overlooked. Review the evidence and decision points.';
      className = 'fail';
    }

    this.log('Case concluded.', 'system');
    this.render();

    // Append assessment
    const assess = document.createElement('div');
    assess.className = `assessment ${className}`;
    assess.innerHTML = `
      <h3>Case Assessment</h3>
      <p>${verdict}</p>
      <p class="mt-1 text-muted">Score: ${this.state.score} / ~${this.state.maxScore}</p>
    `;
    this.container.querySelector('.action-area')?.appendChild(assess);
  }

  // ===== UI HELPERS =====

  showModal({ title, subtitle, body, choices, actions }) {
    let overlay = document.getElementById('modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'modal-overlay';
      overlay.className = 'modal-overlay';
      document.body.appendChild(overlay);
    }

    let choicesHtml = '';
    if (choices && choices.length) {
      choicesHtml = `<div class="choices">${choices.map((c, i) =>
        `<button class="choice-btn" data-idx="${i}">${c.label}</button>`
      ).join('')}</div>`;
    }

    let actionsHtml = '';
    if (actions && actions.length) {
      actionsHtml = `<div class="modal-actions">${actions.map((a, i) =>
        `<button class="btn ${i === 0 ? 'btn-primary' : 'btn-ghost'}" data-act="${i}">${a.label}</button>`
      ).join('')}</div>`;
    }

    overlay.innerHTML = `
      <div class="modal">
        <h3>${title}</h3>
        ${subtitle ? `<div class="modal-sub">${subtitle}</div>` : ''}
        <div class="modal-body">${body || ''}</div>
        ${choicesHtml}
        ${actionsHtml}
      </div>
    `;

    overlay.classList.add('open');

    // Bind
    if (choices) {
      overlay.querySelectorAll('.choice-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.idx, 10);
          choices[idx].action();
        });
      });
    }
    if (actions) {
      overlay.querySelectorAll('[data-act]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.act, 10);
          actions[idx].action();
        });
      });
    }
  }

  closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.classList.remove('open');
  }

  // ===== MAIN RENDER =====

  render() {
    const d = this.data;
    const s = this.state;
    const progressPct = Math.min(100, Math.round((s.score / s.maxScore) * 100));

    this.container.innerHTML = `
      <div class="case-header">
        <div>
          <div class="ep-label">Season 5 · Episode ${d.number}</div>
          <h2>${d.title}</h2>
        </div>
        <button class="btn btn-ghost" id="btn-back">← All Episodes</button>
      </div>

      <div class="progress-bar"><div class="progress-fill" style="width:${progressPct}%"></div></div>

      <div class="panels">
        <div class="panel">
          <div class="panel-title">Case Overview</div>
          <p class="overview-text">${d.overview}</p>

          <div class="panel-title mt-2">Evidence Board</div>
          <div class="evidence-grid" id="evidence-board">
            ${(d.evidence || []).map(ev => `
              <div class="evidence-card ${s.examinedEvidence.has(ev.id) ? 'examined' : ''}" data-ev="${ev.id}">
                <div class="ev-label">${ev.type || 'Item'}</div>
                <div class="ev-name">${ev.name}</div>
                <div class="ev-status">${s.examinedEvidence.has(ev.id) ? 'Examined' : 'Not examined'}</div>
              </div>
            `).join('')}
          </div>

          <div class="action-area mt-2">
            <div class="panel-title">Investigation Log</div>
            <div id="log-area">
              ${s.log.length === 0
                ? '<p class="text-muted">Begin by examining evidence or speaking with persons of interest.</p>'
                : s.log.slice(0, 8).map(l => `
                    <div class="log-entry">
                      <div class="time">${l.time}</div>
                      <div>${l.message}</div>
                    </div>
                  `).join('')
              }
            </div>

            ${!s.finished && d.stages && d.stages.length ? `
              <div class="mt-2">
                <button class="btn btn-primary" id="btn-next-stage">Advance Investigation</button>
              </div>
            ` : ''}

            ${!s.finished ? `
              <div class="mt-1">
                <button class="btn btn-ghost" id="btn-conclude">Submit Case Assessment</button>
              </div>
            ` : ''}
          </div>
        </div>

        <div class="panel">
          <div class="panel-title">Persons of Interest</div>
          <div class="suspect-list" id="suspect-list">
            ${(d.suspects || []).map(su => {
              let badge = 'Person';
              let cls = '';
              if (s.flags.has(`cleared:${su.id}`)) { badge = 'Cleared'; cls = 'cleared'; }
              if (s.flags.has(`suspect:${su.id}`)) { badge = 'Suspect'; cls = 'suspect'; }
              return `
                <div class="suspect-item ${cls}" data-su="${su.id}">
                  <div>
                    <div class="name">${su.name}</div>
                    <div class="role">${su.role}</div>
                  </div>
                  <span class="badge">${badge}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    // Bind events
    this.container.querySelector('#btn-back')?.addEventListener('click', () => {
      this.closeModal();
      window.dispatchEvent(new CustomEvent('back-to-list'));
    });

    this.container.querySelectorAll('[data-ev]').forEach(el => {
      el.addEventListener('click', () => this.examineEvidence(el.dataset.ev));
    });

    this.container.querySelectorAll('[data-su]').forEach(el => {
      el.addEventListener('click', () => this.selectSuspect(el.dataset.su));
    });

    this.container.querySelector('#btn-next-stage')?.addEventListener('click', () => {
      // Simple progression: run first uncompleted stage or a default
      const stages = d.stages || [];
      const next = stages.find(st => !s.flags.has(`stage-done:${st.id}`)) || stages[0];
      if (next) {
        s.flags.add(`stage-done:${next.id}`);
        this.runStage(next.id);
      }
    });

    this.container.querySelector('#btn-conclude')?.addEventListener('click', () => {
      this.concludeCase();
    });
  }
}

import { animateSprite, escapeText, loadCatalog, setYear, spriteElement } from './shared.js';

const detail = document.querySelector('[data-detail]');
const id = new URLSearchParams(window.location.search).get('id');
const cleanup = [];

function renderPet(pet, actions) {
  document.title = `${pet.name} — Little Workmates`;
  detail.innerHTML = `
    <section class="detail-hero" style="--pet-accent:${pet.accent}">
      <div class="detail-main-stage" data-main-stage></div>
      <div class="detail-intro">
        <p class="eyebrow">Pet profile · ${pet.version === 2 ? 'V2 motion' : 'Classic sprite'}</p>
        <h1>${escapeText(pet.name)}</h1>
        <p>${escapeText(pet.description)}</p>
        <div class="detail-actions">
          <a class="button button-dark" href="${pet.download}" download>Download pet</a>
          <a class="button button-light" href="https://github.com/Rito-w/codex-pet-gallery/tree/main/pets/${encodeURIComponent(pet.id)}">View files</a>
        </div>
        <p class="install-note">Unzip into <code>~/.codex/pets/</code>, then refresh custom pets in Codex.</p>
      </div>
    </section>
    <section class="motion-section" aria-labelledby="motion-title">
      <div class="motion-heading">
        <div><p class="eyebrow">Motion study</p><h2 id="motion-title">Every little reaction</h2></div>
        <p>These are the nine standard states Codex uses while you work.</p>
      </div>
      <div class="motion-grid" data-motion-grid></div>
    </section>`;

  const main = spriteElement(pet, actions[0], { className: 'pet-sprite detail-main-sprite' });
  detail.querySelector('[data-main-stage]').append(main);
  cleanup.push(animateSprite(main, 180));

  const motionGrid = detail.querySelector('[data-motion-grid]');
  actions.forEach((action, index) => {
    const item = document.createElement('article');
    item.className = 'motion-card';
    const stage = document.createElement('div');
    stage.className = 'motion-stage';
    const sprite = spriteElement(pet, action, { className: 'pet-sprite motion-sprite' });
    stage.append(sprite);
    cleanup.push(animateSprite(sprite, 145 + (index % 2) * 20));
    const label = document.createElement('div');
    label.className = 'motion-label';
    label.innerHTML = `<span>${String(index + 1).padStart(2, '0')}</span><h3>${escapeText(action.label)}</h3><small>${action.frames} frames</small>`;
    item.append(stage, label);
    motionGrid.append(item);
  });
}

try {
  const data = await loadCatalog();
  const pet = data.pets.find((entry) => entry.id === id);
  if (!pet) throw new Error('That pet is not on the shelf.');
  renderPet(pet, data.actions);
} catch (error) {
  detail.innerHTML = `<div class="status-card"><h1>Pet not found</h1><p>${escapeText(error.message)}</p><a class="button button-dark" href="index.html">Return to the gallery</a></div>`;
}

setYear();

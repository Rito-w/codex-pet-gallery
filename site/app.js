import { animateSprite, loadCatalog, setYear, spriteElement } from './shared.js';

const grid = document.querySelector('[data-pet-grid]');
const status = document.querySelector('[data-status]');
const count = document.querySelector('[data-count]');
const hero = document.querySelector('[data-hero-pet]');
let catalog = [];
let actions = [];
let activeFilter = 'all';
const cleanup = [];

function matchesFilter(pet) {
  if (activeFilter === 'v2') return pet.version === 2;
  if (activeFilter === 'classic') return pet.version === 1;
  return true;
}

function renderGallery() {
  cleanup.splice(0).forEach((stop) => stop());
  grid.replaceChildren();
  const pets = catalog.filter(matchesFilter);
  count.textContent = `${pets.length} ${pets.length === 1 ? 'pet' : 'pets'} on the shelf`;

  for (const [index, pet] of pets.entries()) {
    const card = document.createElement('article');
    card.className = 'pet-card';
    card.style.setProperty('--pet-accent', pet.accent);

    const link = document.createElement('a');
    link.className = 'pet-card-link';
    link.href = `pet.html?id=${encodeURIComponent(pet.id)}`;
    link.setAttribute('aria-label', `View ${pet.name} and all actions`);

    const stage = document.createElement('div');
    stage.className = 'pet-card-stage';
    const action = actions[index % Math.min(actions.length, 5)];
    const sprite = spriteElement(pet, action, { className: 'pet-sprite pet-card-sprite' });
    stage.append(sprite);
    cleanup.push(animateSprite(sprite, 170 + (index % 3) * 20));

    const meta = document.createElement('div');
    meta.className = 'pet-card-meta';
    meta.innerHTML = `<div><p class="pet-number">${String(index + 1).padStart(2, '0')}</p><h3>${pet.name}</h3></div><span class="card-arrow" aria-hidden="true">↗</span>`;

    const description = document.createElement('p');
    description.className = 'pet-description';
    description.textContent = pet.description;

    const tags = document.createElement('div');
    tags.className = 'tag-row';
    pet.tags.forEach((tag) => {
      const chip = document.createElement('span');
      chip.textContent = tag;
      tags.append(chip);
    });

    link.append(stage, meta, description, tags);
    card.append(link);
    grid.append(card);
  }

  status.hidden = pets.length > 0;
  if (!pets.length) status.textContent = 'No pets match this filter yet.';
}

document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('.filter.is-active')?.classList.remove('is-active');
    button.classList.add('is-active');
    activeFilter = button.dataset.filter;
    renderGallery();
  });
});

try {
  const data = await loadCatalog();
  catalog = data.pets;
  actions = data.actions;
  renderGallery();

  if (catalog[0]) {
    const sprite = spriteElement(catalog[0], actions[0], { className: 'pet-sprite hero-sprite' });
    hero.append(sprite);
    cleanup.push(animateSprite(sprite, 180));
  }
} catch (error) {
  count.textContent = 'Shelf unavailable';
  status.hidden = false;
  status.textContent = error.message;
}

setYear();

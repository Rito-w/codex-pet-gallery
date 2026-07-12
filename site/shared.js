export const CELL = { width: 192, height: 208 };

export async function loadCatalog() {
  const response = await fetch('pets.json');
  if (!response.ok) throw new Error('The pet shelf could not be loaded.');
  return response.json();
}

export function spriteElement(pet, action, options = {}) {
  const sprite = document.createElement('div');
  sprite.className = options.className || 'pet-sprite';
  sprite.setAttribute('role', 'img');
  sprite.setAttribute('aria-label', `${pet.name} — ${action.label} animation`);
  sprite.style.backgroundImage = `url("${pet.sprite}")`;
  sprite.dataset.frames = String(action.frames);
  sprite.dataset.row = String(action.row);
  sprite.dataset.frame = '0';
  return sprite;
}

export function animateSprite(sprite, speed = 150) {
  const frames = Number(sprite.dataset.frames);
  const row = Number(sprite.dataset.row);
  if (frames <= 1 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    sprite.style.backgroundPosition = `0 ${-row * CELL.height}px`;
    return () => {};
  }

  let frame = 0;
  const timer = window.setInterval(() => {
    frame = (frame + 1) % frames;
    sprite.dataset.frame = String(frame);
    sprite.style.backgroundPosition = `${-frame * CELL.width}px ${-row * CELL.height}px`;
  }, speed);

  return () => window.clearInterval(timer);
}

export function setYear() {
  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
}

export function escapeText(value) {
  const node = document.createElement('span');
  node.textContent = value;
  return node.innerHTML;
}

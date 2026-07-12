import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

export const CELL = Object.freeze({ width: 192, height: 208 });

export const ACTIONS = Object.freeze([
  { id: 'idle', label: 'Idle', row: 0, frames: 6 },
  { id: 'running-right', label: 'Move right', row: 1, frames: 8 },
  { id: 'running-left', label: 'Move left', row: 2, frames: 8 },
  { id: 'waving', label: 'Wave', row: 3, frames: 4 },
  { id: 'jumping', label: 'Jump', row: 4, frames: 5 },
  { id: 'failed', label: 'Failed', row: 5, frames: 8 },
  { id: 'waiting', label: 'Waiting', row: 6, frames: 6 },
  { id: 'running', label: 'Working', row: 7, frames: 6 },
  { id: 'review', label: 'Review', row: 8, frames: 6 }
]);

export function frameStyle(row, frame) {
  return {
    backgroundPosition: `${-frame * CELL.width}px ${-row * CELL.height}px`
  };
}

export function normalizePet(manifest) {
  if (!manifest?.id || !/^[a-z0-9][a-z0-9-]*$/.test(manifest.id)) {
    throw new Error('pet id must use lowercase letters, numbers, and hyphens');
  }
  const version = manifest.spriteVersionNumber === 2 ? 2 : 1;

  return {
    id: manifest.id,
    name: manifest.displayName || manifest.id,
    description: manifest.description || 'A small companion for focused work.',
    version,
    sprite: `pets/${manifest.id}/${manifest.spritesheetPath || 'spritesheet.webp'}`,
    download: `downloads/${manifest.id}.zip`,
    accent: manifest.accent || '#ec5b35',
    tags: Array.isArray(manifest.tags)
      ? manifest.tags
      : [version === 2 ? 'Codex v2' : 'Classic sprite']
  };
}

export async function readPetCatalog(petsRoot) {
  const entries = await readdir(petsRoot, { withFileTypes: true });
  const pets = [];

  for (const entry of entries.filter((item) => item.isDirectory())) {
    const manifestPath = path.join(petsRoot, entry.name, 'pet.json');
    const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
    pets.push(normalizePet(manifest));
  }

  return pets.sort((a, b) => a.name.localeCompare(b.name, 'en'));
}

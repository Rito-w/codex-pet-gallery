import test from 'node:test';
import assert from 'node:assert/strict';

import { ACTIONS, frameStyle, normalizePet } from '../scripts/gallery-lib.mjs';

test('normalizes a v2 pet manifest for the storefront', () => {
  const pet = normalizePet({
    id: 'tiny-fox',
    displayName: 'Tiny Fox',
    description: 'A focused forest friend.',
    spriteVersionNumber: 2,
    spritesheetPath: 'spritesheet.webp'
  });

  assert.equal(pet.id, 'tiny-fox');
  assert.equal(pet.name, 'Tiny Fox');
  assert.equal(pet.version, 2);
  assert.equal(pet.sprite, 'pets/tiny-fox/spritesheet.webp');
  assert.equal(pet.download, 'downloads/tiny-fox.zip');
});

test('exposes the nine standard Codex actions in row order', () => {
  assert.deepEqual(ACTIONS.map(({ id, row, frames }) => [id, row, frames]), [
    ['idle', 0, 6],
    ['running-right', 1, 8],
    ['running-left', 2, 8],
    ['waving', 3, 4],
    ['jumping', 4, 5],
    ['failed', 5, 8],
    ['waiting', 6, 6],
    ['running', 7, 6],
    ['review', 8, 6]
  ]);
});

test('computes v2 sprite background position from row and frame', () => {
  assert.deepEqual(frameStyle(4, 3), {
    backgroundPosition: '-576px -832px'
  });
});

test('keeps legacy nine-row pets visible while marking their sprite version', () => {
  const pet = normalizePet({ id: 'classic-pet', displayName: 'Classic Pet' });

  assert.equal(pet.version, 1);
  assert.deepEqual(pet.tags, ['Classic sprite']);
});

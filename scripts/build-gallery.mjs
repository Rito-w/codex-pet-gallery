import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { ACTIONS, readPetCatalog } from './gallery-lib.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = path.join(root, 'site');
const petsRoot = path.join(root, 'pets');
const outputPets = path.join(site, 'pets');
const downloads = path.join(site, 'downloads');

await rm(outputPets, { recursive: true, force: true });
await rm(downloads, { recursive: true, force: true });
await mkdir(outputPets, { recursive: true });
await mkdir(downloads, { recursive: true });

const pets = await readPetCatalog(petsRoot);

for (const pet of pets) {
  const source = path.join(petsRoot, pet.id);
  await cp(source, path.join(outputPets, pet.id), { recursive: true });
  execFileSync('zip', ['-qr', path.join(downloads, `${pet.id}.zip`), pet.id], {
    cwd: petsRoot
  });
}

await writeFile(
  path.join(site, 'pets.json'),
  `${JSON.stringify({ pets, actions: ACTIONS }, null, 2)}\n`
);

console.log(`Built ${pets.length} pets into ${path.relative(root, site)}/`);

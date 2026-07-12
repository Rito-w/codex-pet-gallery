# Codex Pet Gallery

Playable little companions for the Codex app.

## Web Gallery

The repository includes a lightweight storefront for browsing every pet,
previewing all nine standard task animations, and downloading an installable
zip. The site is generated from `pets/`, so a valid package appears
automatically.

```sh
npm test
npm run dev
```

Open `http://localhost:4173`, or run `npm run build` to produce the deployable
`site/` directory. Pushes to `main` deploy through GitHub Pages. For a new fork,
enable **Settings → Pages → GitHub Actions** once.

This repository currently features one installable Codex custom pet: Anya.

Want to create your own? Use the companion skill:
[Rito-w/codex-pet-factory](https://github.com/Rito-w/codex-pet-factory).

## Gallery

### Anya

A pink-haired, expressive v2 companion with all nine standard task animations
and sixteen look directions.

Included package: `anya`.

## Install

Clone this repo:

```sh
git clone https://github.com/Rito-w/codex-pet-gallery.git
cd codex-pet-gallery
```

Install all pets:

```sh
mkdir -p ~/.codex/pets
cp -R pets/* ~/.codex/pets/
```

Or install one pet:

```sh
mkdir -p ~/.codex/pets
cp -R pets/anya ~/.codex/pets/
```

Then open Codex:

```text
Settings -> Appearance -> Pets -> refresh custom pets
```

Select the pet you want, then use `/pet` to wake or tuck away the pet overlay.

## Repository Layout

```text
pets/
  <pet-id>/
    pet.json
    spritesheet.webp
docs/
  contribution templates
```

## Make Your Own Pet

Install the factory skill:

```sh
mkdir -p ~/.codex/skills
git clone https://github.com/Rito-w/codex-pet-factory.git \
  ~/.codex/skills/codex-pet-factory
```

Then ask Codex something like:

```text
Use $hatch-pet to generate a Codex v2 pet:
concept: an original compact desk companion
style: readable at 192x208, clean silhouette
personality: curious and focused
name: Tiny Friend
```

## Contribute

PRs are very welcome.

You can contribute:

- new original pets
- better preview GIFs or contact sheets
- repaired spritesheets
- prompt recipes
- theme packs
- install docs for different platforms

Before opening a PR, check [CONTRIBUTING.md](CONTRIBUTING.md). Keep pets
original, readable at `192x208`, and compatible with the Codex custom pet
contract.

Make something charming, weird, useful, or delightfully distracting. Tiny
desktop friends are better when more people get to invent them.

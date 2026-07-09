# Contributing Pets

Thanks for helping grow the Codex Pet Gallery.

## What To Submit

Each pet should be an original Codex custom pet package:

```text
pets/<pet-id>/
├── pet.json
└── spritesheet.webp
```

The spritesheet must be:

- `1536x1872`
- 8 columns x 9 rows
- `192x208` pixels per frame
- transparent background
- unused cells fully transparent

Rows must follow this order:

```text
0 idle
1 running-right
2 running-left
3 waving
4 jumping
5 failed
6 waiting
7 running
8 review
```

## Recommended Extras

Add one or more preview assets:

```text
showcase/<pet-id>-contact-sheet.png
showcase/gifs/<pet-id>-idle.gif
showcase/gifs/<pet-id>-running.gif
showcase/gifs/<pet-id>-review.gif
```

If useful, add a zip bundle under:

```text
packages/<pet-id>.zip
```

## Validation

You can use the factory skill to package and validate pets:

[Rito-w/codex-pet-factory](https://github.com/Rito-w/codex-pet-factory)

Suggested checks:

```sh
python ~/.codex/skills/codex-pet-factory/scripts/validate_pet_package.py \
  pets/<pet-id>
```

```sh
python ~/.codex/skills/codex-pet-factory/scripts/render_pet_previews.py \
  --spritesheet pets/<pet-id>/spritesheet.webp \
  --output-dir showcase/gifs/<pet-id>
```

## PR Checklist

- The pet is original and does not copy copyrighted characters or logos.
- `pet.json` is valid JSON.
- Folder name matches `pet.json.id`.
- `spritesheetPath` is `spritesheet.webp`.
- The spritesheet is `1536x1872`.
- Used cells are non-empty.
- Unused cells are transparent.
- At least one preview image or GIF is included.
- README gallery section is updated, if the pet should be featured.


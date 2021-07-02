# Dockit - Simple markdown based document site.

Dockit is a simple application template for building (responsive) document websites based on markdown files.

## Features

- Simply put all documentation as `.md` files in the `/docs` directory
- Auto-generated navigation based on `title` and `category` settings in the frontmatter of the markdown files. If required, you can set an `order` attribute on articles which will take preference over the title, within a group.
- Set category icons in the `src/lib/constants.js` file (based on [feathericons](https://feathericons.com))
- Change the name, version & source code link in the `src/lib/constants.js` file.
- Light and dark modes, starting on browser preference
- Search on titles and sub titles of the different documents

## Users

- [Feo CSS](https://github.com/crinklesio/feo-css)
- [SvelteKit](https://kit.svelte.dev)
- [Feather icons](https://feathericons.com)

---
name: Vite CSS @import ordering with Tailwind v4
description: Google Fonts @import in Tailwind v4 index.css must precede @plugin/other at-rules, or the PostCSS build warns/breaks font loading.
---

Tailwind v4 projects scaffolded with `@import 'tailwindcss';` + `@plugin "..."` lines in `index.css` will emit
`[vite:css][postcss] @import must precede all other statements` if a font `@import url(...)` is placed after a
`@plugin` directive (or after any non-import/charset statement).

**Why:** CSS spec requires `@import` to precede all other statements except `@charset`. Tailwind's `@plugin` at-rule
counts as a statement, so a font import placed below it violates the rule and PostCSS surfaces a build warning
(and in some pipelines, the font silently fails to load).

**How to apply:** When adding a Google Fonts (or similar) `@import url(...)` to `src/index.css`, either place it
immediately after the `@import 'tailwindcss'` / `@import 'tw-animate-css'` lines and before any `@plugin` line, or
—more robustly—move it out of the CSS file entirely and add a `<link rel="stylesheet" href="...">` in `index.html`.
The `<link>` approach avoids the ordering constraint entirely and is what was used for the Durga Chalisa app.

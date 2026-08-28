# CapabilityBench project website

Static project page for CapabilityBench. The site is intentionally framework-free
so it can be previewed locally and deployed to GitHub Pages without a build step.

## Preview

From the outer repository root:

```bash
python3 -m http.server 8000 --directory website
```

Then open `http://localhost:8000`.

## Temporary preview deployment

The current unlisted preview is mirrored into the personal-site repository at
`papers/capability_bench/`. It deliberately has `noindex`/`nofollow` metadata,
is disallowed in that site's `robots.txt`, is absent from the sitemap, and has
no link from the main site. Remove all four protections together only when the
paper is public.

## Content sources

- Paper copy: `assets/capabilitybench-paper.pdf`
- Scene images: native 1800 × 1800 captures from the real LivingGrid renderer at
  seed 42 (`simple`, `big`, and `office`). They are shown with `object-fit:
  contain`; do not crop them into decorative thumbnails.
- Explanatory figures: optimized from the paper sources under
  `CapabilityBench/latex/images/`.
- Typography: self-hosted Manrope and Space Mono under the SIL Open Font License
  (license texts are included beside the font files).
- Site copy follows the paper's four-cluster evaluation view and the public
  interfaces documented under `CapabilityBench/docs/`.

The page uses a centered academic demo-paper composition. Its main interaction
is an ordered, guided task trace; it illustrates public benchmark state but is
explicitly not a live policy evaluation. The generated-environment viewer is an
accessible tab set with keyboard navigation and complete uncropped renders.

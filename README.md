# alessiosam.github.io

Personal academic site — plain HTML/CSS, no build step.

## Publish on GitHub Pages
1. Create a public repo named exactly `<your-github-username>.github.io` (e.g. `AlessioSam.github.io`).
2. Upload `index.html`, `style.css`, `assets/` and this README to the repo root.
3. Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
4. After ~1 minute the site is live at `https://<your-github-username>.github.io`.

## To finish (search `TODO` in index.html)
- `assets/me.jpg` — square photo (initials are shown until it exists)
- `assets/cv.pdf` — your CV
- Google Scholar URL and public email
- Month you joined Translated + one line on what you work on
- Check the M.Sc. entry in the Timeline

## Adding a paper
Copy a `<div class="pub">` block under the right year. Add `data-selected` to show it in the "Selected" view.

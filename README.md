# Tannon Hibshman Racing — Website

A static site (plain HTML/CSS/JS, no build step) for Tannon Hibshman Racing.

## How to update the site

Almost everything you'll ever need to change lives in three files inside `data/`:

- **`data/schedule-data.js`** — the schedule. This is the important one. Add a race, add a
  result, or add a track link here and the Home page ("Next Race"), Schedule page, and
  Results page all update automatically. Status ("Upcoming," "Race Weekend," "Awaiting
  Results," "Completed") is calculated from today's date — you never set it by hand.
- **`data/gallery-data.js`** — add new photos here. Drop the image file into `images/`,
  then add one entry with the file path, a category, and a caption.
- **`data/sponsors-data.js`** — add/remove sponsors and their logos here.

Each file has comments at the top walking through exactly what to change. Open them in any
text editor (even Notepad/TextEdit) — no coding experience needed, just copy/paste one
entry and edit the values.

## How to view the site locally

Double-click `index.html` to open it in a browser. Everything — photos, schedule, gallery,
lightbox, mobile menu — works straight off your computer with no server needed.

## How to publish it live

The site is hosted on Railway. Never publish this folder as-is: run `npm run build` first.
It writes a clean copy to `dist/` with every code comment removed and only the public files
included (no README, package.json or scripts), and the live server serves only `dist/`.
Railway runs the build automatically on each deploy.

## Contact form

The Contact page form uses [FormSubmit](https://formsubmit.co), a free service that emails
form submissions straight to an inbox with zero backend setup. It's currently pointed at
`resonacollective@gmail.com`. The first message sent through the form triggers a one-time
activation email — click the confirmation link and every submission after that lands in
the inbox automatically. To change the destination email, edit the `action` URL in
`contact.html`.

## What's still a placeholder

- **About page**: the story, philosophy, and goals sections have starter copy marked with
  `[bracketed notes]` — replace with Tannon's real story in his own words.
- **Sponsors page**: sponsor names were pulled from decals visible in the submitted photos
  (Tire Rack, Hoosier, Hawk Performance, Rotary Performance, Boss Bottle). Confirm these are
  current partners and add real logo image files to `images/sponsors/` when available.
- **Facebook/Instagram links** on the Contact page are placeholders — add the real URLs in
  `contact.html` once those accounts are set up.
- **Race results**: June (Pagoda) and July (Summit Point) events are marked "Awaiting
  Results" since no official finishing position/lap time was provided — add them to
  `schedule-data.js` whenever you have them.

## Future features this is built to support

The structure leaves room to add, without a redesign: a blog/news feed, video/YouTube
embeds, live race-weekend updates, driver statistics and season standings, a newsletter
signup, and a sponsor portal. Each would slot in as a new page or a new data file using the
same pattern already in place.

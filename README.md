# A Little Place for You

A personal, intimate website made for someone special. Built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion.

## Local setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173/a-little-place-for-you/](http://localhost:5173/a-little-place-for-you/) in your browser.

## Personalising the content

All personal content lives in a single file:

```
src/data/content.ts
```

Open that file and replace the placeholder text with your own:

- **Opening message** and button text
- **Time zones** (change cities and IANA timezone identifiers)
- **Things you notice** about the person
- **Timeline moments** with dates, descriptions, images, and locations
- **Open-when letters** with your own messages
- **Playlist** with song titles, artists, notes, and Spotify/YouTube links
- **Places to go** with names, notes, photos, and status
- **Smile reasons** for the random compliment button
- **Hidden surprise** secret message and optional media link
- **Closing message** and your signature

## Adding images

Place image files in `public/images/` and reference them in `content.ts`:

```ts
{
  image: "images/our-first-trip.jpg",
}
```

The layout gracefully handles missing images with placeholder designs.

## Adding background music

1. Place an audio file at `public/music/background.mp3`
2. The floating music toggle will automatically appear
3. Music is off by default and only plays after user interaction
4. The visitor's preference is saved in localStorage

## Deployment to GitHub Pages

1. Create a GitHub repository named `a-little-place-for-you`
2. Push this project to the `main` branch
3. Go to **Settings > Pages** and set the source to **GitHub Actions**
4. The included workflow at `.github/workflows/deploy.yml` will build and deploy automatically on every push to `main`

Your site will be available at:
```
https://<your-username>.github.io/a-little-place-for-you/
```

### Using a different repository name

If you use a different repo name, update the `base` option in `vite.config.ts`:

```ts
base: '/your-repo-name/',
```

And update the favicon path in `index.html` accordingly.

## Privacy considerations

- The site includes `noindex, nofollow` meta tags to discourage search engine indexing
- No analytics, trackers, cookies, or external services are used (other than Google Fonts)
- No backend or authentication is needed
- All content is static and lives in your repository
- Consider making the repository private if the content is personal

## Tech stack

- React 19
- Vite
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React icons

## Building for production

```bash
npm run build
```

The output goes to the `dist/` directory.

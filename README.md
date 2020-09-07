# Website with CMS demo

A demo project for [website-with-cms-template](https://github.com/katrimarika/website-with-cms-template) admin UI.

## Development

Local development instructions are for macOS and expect you to have homebrew and NodeJS.

If you don't have Hugo installed yet, install it with `brew install hugo`.

Install dependencies:

```
npm install
```

To run a local development server:

```
npm start
```

This runs a hugo development server serving files from `build` and sets up live reload for both hugo and svelte. The admin panel built from `src` folder and can be found at [/admin/](http://localhost:10001/admin/).

To release, i.e. update version, tag and push to production branch (no local build required):

```
./scripts/release
```

### Additional commands

You can add new content files with (it will prompt the needed info):

```
npm run add-content
```

To test the production build locally:

```
npm run build
```

## Notes

There are some issues with live reloading the svelte-side. It doesn't always load the content without manually refreshing the page.

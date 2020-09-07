# Website with CMS demo

A demo project for [website-with-cms-template](https://github.com/katrimarika/website-with-cms-template) admin UI.

## Development

Local development instructions are for macOS and expects you to have NodeJS installed.

Install dependencies:

```
npm install
```

To run a local development server:

```
npm start
```

This runs a development server serving files from `build/admin` and sets up live reload for svelte. The admin panel built from `src` folder and can be found at [/admin/](http://localhost:10001/admin/).

To release, i.e. update version, tag and push to production branch (no local build required):

```
./scripts/release
```

To test the production build locally:

```
npm run build
```

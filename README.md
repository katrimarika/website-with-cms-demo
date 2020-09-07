# Website with CMS demo

A demo project for [website-with-cms-template](https://github.com/katrimarika/website-with-cms-template) admin UI.

Deployed at [https://website-with-cms-demo.netlify.app/](https://website-with-cms-demo.netlify.app/).

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

Released automatically from master branch.

To test the production build locally:

```
npm run build
```

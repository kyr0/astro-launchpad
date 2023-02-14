# Welcome to [Astro Launchpad](https://astro-launchpad.vercel.app/)

Demo site: https://astro-launchpad.vercel.app/

This is an Astro 2.0 template project that can be used to launch decent projects with Astro, boosters included (hence the name). 

You'll find this project configured with SSG and SSR routes together in one Astro project using Astro 2.0's hybrid output. It is configured to deploy to Vercel for hosting, SSR and API microservices (serverless and edge, as you wish), for which even API clients are automatically generated in `pages/api-client`. 

Turborepo is used to manage the monorepo. This project follows the `turbo` best practices for `eslint`, `prettier`, `tsconfig`, code sharing and build caching (local and remote).

## Project layout

This project deploys on [Vercel](https://vercel.com/). You can clone this repo and deploy it on Vercel.
Make sure to set the root directory to: `apps/server` as this is the primary Astro project we deploy!

<img src="vercel-root-dir.png" />

You can find the Vercel configuration in `apps/server/vercel.json`. It makes sure that `turbo` is used.
I've also decided to activate [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching).

### App

You can have many apps in parallel that could re-use code from the packages. They are always located in the `apps` folder. By default, one `server` app is created and serves are the primarily deploy target for Vercel.

- `apps/server`: An Astro 2.0 hybrid rendering-enabled project. Implements the application logic, all the pages, application data, API microservice endpoints etc. pp.

The project is also pre-configured with `@vercel/analytics`, `preact`, `astrojs-service-worker`, `@astrojs/image`, `astro-robots-txt`, `astro-sitemap`, `astro-webmanifest`, `eslint`, `browserslist`, `dotenv`, `prettier`, `tsconfig` custom base config. 

### Image optimization

This project comes with the `sharp` package for local image optimization pre-configured.
Make sure to run in case that you're running into issues like: 'Something went wrong installing the "sharp" module':

`brew uninstall vips` (in case it is already installed via brew)

`npm install --ignore-scripts=false --foreground-scripts --verbose sharp`

### Shared packages

Shared packages are located in `packages/*`, such as:

- `packages/components`: Astro components to be used by all Apps and packages
- `packages/i18n`: Internationalization layer (isomorphic, based on `i18next`)
- `packages/auth`: Authentication layer (isomorphic based on `auth-astro`)
- `packages/icons`: A collection of SVG icons
- `packages/reactive`: A nano library of helper functions to work with Preact
- `packages/theme`: Tailwind theming helper library to merge CSS classes into one
- `packages/tsconfig`: A unified tsconfig that is used in all packages and apps
- `packages/format`: Prettier configuration for all packages and apps
- `packages/eslint-config-custom`: Eslint configuration for all packages and apps

## Performance stats

- No cache (Vercel, remote in CI/CD): Builds in 40s
- With cache (Vercel, remote in CI/CD): FULL TURBO: 6s, one package or app affected: 34s (of which 24s is `yarn install`...)
- Locally, full build: 3.79s (on a Apple M1 Max machine/2021)

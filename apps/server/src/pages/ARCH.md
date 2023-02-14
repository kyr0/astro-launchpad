# `pages` folder

## `.astro` pages are just page routes

In a typical Astro project, all `.astro` files in this folder would just
implement the HTML, CSS, JS of a page. However, we're using an advanced 
internationalization strategy for multi-language sites.

In front of each page, the page locale is prefixed. To create and statically
generate such pages, the build process will automatically copy all `.astro`
files in here for each locale added. 

e.g.: default routing of Astro:
`./src/pages/404.astro` -> /404 or /404.html (english)

After i18next build step:
`./src/pages/404.astro` -> /404 or /404.html (english)
`./src/pages/de/404.astro` -> /de/404 or /de/404.html (german)

Because the process has to copy the code, and also adds a call to `changeLanguage()`
for each translated page, it is not advised to implement the template for a page
in this folder directly. We're implementing the templates in a folder outside of
the pages folder as `page components`. This way, we're preventing massive code 
duplication, keeping the code clean, and understandable.

The instructions to `prerender` however, need to be added to the pages in this folder.

## API endpoints come with a client generate

Feel free to create `.ts` files that conform to the Astro API endpoint semantics.

If you also create and use an `ApiRequest` and `ApiResponse` interface, `@packages/api-client-generator` will generate a TypeScript client for the endpoint.

You'll find the TypeScript client in `./src/pages/api-client/*`

## Don't touch the CMS core

The folders `cms/*` and the API endpoints in `api/cms/*` should not be changed.
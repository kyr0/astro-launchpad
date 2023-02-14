import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import serviceWorker from 'astrojs-service-worker'
import robotsTxt from 'astro-robots-txt'
import webmanifest from 'astro-webmanifest'
import sitemap from 'astro-sitemap'
import image from '@astrojs/image'
import astroI18next from 'astro-i18next'
import purgecss from 'astro-purgecss'
import { apiClientGenerator } from '@jsheaven/astro-client-generator'

// alternatively, use '@astrojs/vercel/edge'
import vercel from '@astrojs/vercel/serverless'

const siteUrl =
  process.env.VERCEL_ENV === 'production'
    ? 'https://astro-launchpad.vercel.app/' // 'your.prod.domain.here'
    : 'http://localhost:3000/'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: siteUrl,
  adapter: vercel(),
  integrations: [
    // add preact support with vast React compatibility
    // we use preact here to shrink down to 3k JS served per page that uses client components
    // but you can use any supported frontend framework of course
    // see: https://docs.astro.build/en/core-concepts/framework-components/
    preact({ compat: true }),

    // <a rel="prefetch" ... /> supercharging
    //prefetch(),

    // support i18next translations
    // see: https://github.com/yassinedoghri/astro-i18next
    astroI18next(),

    // generate a customizable sitemap.xml
    // see: https://github.com/alextim/astro-lib/tree/main/packages/astro-sitemap
    sitemap(),

    // generate a custom robots.txt
    // see: https://github.com/alextim/astro-lib/tree/main/packages/astro-robots-txt
    robotsTxt({
      policy: [
        {
          userAgent: '*',
        },
      ],
    }),

    // generate a custom service-worker.js using WorkBox
    // see: https://github.com/tatethurston/astrojs-service-worker
    //serviceWorker(),

    // generates a manifest.json for PWA support,
    // see: https://github.com/alextim/astro-lib/tree/main/packages/astro-webmanifest
    webmanifest({
      name: 'astro-launchpad',
      icon: './public/favicon.svg',
      start_url: siteUrl,
      display: 'standalone',
    }),

    // support for <Image> and <Picture> using sharp for optimization
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),

    // generates ./src/pages/api-client/* microservice clients
    apiClientGenerator({
      site: siteUrl.replace(/\/$/, ''),
    }),

    // make sure that unused CSS classes are removed
    // see: https://github.com/FullHuman/purgecss
    /*purgecss({
      safelist: [/^bg-/, /^text-/],
    }),*/
  ],
})

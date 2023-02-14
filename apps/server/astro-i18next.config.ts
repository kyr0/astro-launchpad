import type { AstroI18nextConfig } from 'astro-i18next'

const config: AstroI18nextConfig = {
  defaultLocale: 'en',
  locales: ['en', 'de'],
  load: ['server', 'client'], // load i18next server and client side
  /* only activate if necessary
  i18nextServer: {
    debug: true,
  },
  i18nextClient: {
    debug: true,
  },
  */
  i18nextServerPlugins: {
    '{initReactI18next}': 'react-i18next',
  },
  i18nextClientPlugins: {
    '{initReactI18next}': 'react-i18next',
  },
}

export default config

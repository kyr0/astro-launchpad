/// <reference types="vitest" />
import { getViteConfig } from 'astro/config'

// see: https://vitest.dev/guide/features.html
export default getViteConfig({
  test: {
    dir: './test',
    coverage: {
      provider: 'c8',
      reportsDirectory: './coverage',
      reporter: ['text', 'json', 'html'],
    },
    /* for example, use global to avoid globals imports (describe, test, expect): */
    // globals: true,
  },
})

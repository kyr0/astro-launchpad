import { test, expect } from '@playwright/test'

test('title is correct', async ({ page }) => {
  await page.goto('http://localhost:3000/alsdjlajsd1134')

  await expect(page).toHaveTitle('404 - Not found')
})

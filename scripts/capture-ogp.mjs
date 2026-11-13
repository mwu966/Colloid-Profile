// Run against a local development server with Playwright available externally.
// PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs node scripts/capture-ogp.mjs
import assert from "node:assert/strict"
import { mkdir } from "node:fs/promises"

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright")
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {}),
})
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
  await page.goto(process.env.OGP_PAGE_URL || "http://localhost:8000/", { waitUntil: "networkidle" })
  await page.evaluate(async () => {
    await document.fonts.load('400 292px Righteous', 'Colloid')
    await document.fonts.load('400 18px "Noto Sans JP"', 'Colloidの創作と技術をまとめた個人サイト')
    await document.fonts.ready
    if (!document.fonts.check('400 292px Righteous') || !document.fonts.check('400 18px "Noto Sans JP"')) throw new Error("TOP fonts were not loaded")
    window.scrollTo(0, 0)
  })
  // Capture-only overrides: never loaded by Gatsby or the normal website.
  await page.addStyleTag({ content: `
    .opening-scroll { --stage-height: 630px; }
    .colloid-logo { top: 20%; }
    .top-scroll { visibility: hidden; }
  ` })
  assert.equal(await page.locator(".portal-introduction").textContent(), "Colloidの創作と技術をまとめた個人サイト")
  for (const selector of [".logo-glyph", ".portal-strapline", ".portal-introduction"]) {
    for (const node of await page.locator(selector).all()) {
      const box = await node.boundingBox()
      assert(box && box.x >= 0 && box.y >= 0 && box.x + box.width <= 1201 && box.y + box.height <= 630, `${selector} is clipped`)
    }
  }
  await mkdir(new URL("../static/", import.meta.url), { recursive: true })
  await page.screenshot({ path: new URL("../static/ogp.png", import.meta.url).pathname, animations: "disabled" })
} finally {
  await browser.close()
}

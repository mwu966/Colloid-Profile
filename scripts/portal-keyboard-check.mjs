import assert from 'node:assert/strict'
const { chromium, firefox } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
for (const [name, engine] of [['chromium', chromium], ['firefox', firefox]]) {
  const browser = await engine.launch({ headless: true, ...(name === 'chromium' && process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE, args: ['--no-sandbox'] } : {}) })
  try {
    for (const reducedMotion of ['no-preference', 'reduce']) {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion })
      await page.goto(process.env.PORTAL_URL || 'http://localhost:8000/', { waitUntil: 'networkidle' })
      await page.locator('.top-scroll').focus()
      await page.keyboard.press('Enter')
      await page.waitForFunction(() => document.activeElement?.id === 'intro-heading')
      assert.equal(await page.evaluate(() => location.hash), '#intro')
      await page.locator('.intro-section .next-section').focus()
      await page.keyboard.press('Enter')
      await page.waitForFunction(() => document.activeElement?.id === 'links-heading')
      assert.equal(await page.evaluate(() => location.hash), '#links')
      await page.goBack()
      await page.waitForTimeout(300)
      assert.equal(await page.evaluate(() => location.hash), '#intro')
      await page.evaluate(() => document.getElementById('blog').scrollIntoView({ behavior: 'instant' }))
      await page.waitForTimeout(150)
      // Simulate long RSS titles without depending on the current feed length.
      await page.evaluate(() => {
        const layer = document.querySelector('[data-scene=blog]')
        const content = document.createElement('div')
        content.style.height = '1500px'
        layer.append(content)
        document.getElementById('blog-heading').focus({ preventScroll: true })
        layer.scrollTop = 0
      })
      const y = await page.evaluate(() => scrollY)
      await page.keyboard.press('ArrowDown')
      await page.waitForTimeout(300)
      assert(await page.locator('[data-scene=blog]').evaluate(el => el.scrollTop > 0))
      assert.equal(await page.evaluate(() => scrollY), y)
      const prevented = await page.locator('.blog-posts a').first().evaluate(el => {
        el.focus({ preventScroll: true })
        const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true })
        el.dispatchEvent(event)
        return event.defaultPrevented
      })
      assert.equal(prevented, false)
      await page.evaluate(() => document.getElementById('intro').scrollIntoView({ behavior: 'instant' }))
      await page.waitForTimeout(150)
      await page.locator('#intro-heading').focus()
      await page.keyboard.press('ArrowDown')
      await page.waitForFunction(() => document.activeElement?.id === 'links-heading')
      console.log(`PASS ${name} ${reducedMotion}: link focus/hash/history, native foreground scroll, interactive keys, explicit section step`)
      await page.close()
    }
  } finally { await browser.close() }
}

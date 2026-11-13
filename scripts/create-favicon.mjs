// Use the website's loaded Righteous font; no extra font or image library is installed.
import { mkdir, writeFile } from "node:fs/promises"
import sharp from "sharp"

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright")
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {}),
})
try {
  const page = await browser.newPage()
  await page.goto(process.env.FAVICON_PAGE_URL || "http://localhost:8000/", { waitUntil: "networkidle" })
  const dataUrl = await page.evaluate(async () => {
    await document.fonts.load("400 384px Righteous", "C")
    await document.fonts.ready
    if (![...document.fonts].some(font => font.family.replace(/["']/g, "") === "Righteous" && font.status === "loaded")) throw new Error("Righteous was not loaded")
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = 512
    const context = canvas.getContext("2d")
    context.fillStyle = "#102A43"
    context.fillRect(0, 0, 512, 512)
    context.font = "400 384px Righteous"
    const bounds = context.measureText("C")
    const x = (512 - bounds.actualBoundingBoxRight + bounds.actualBoundingBoxLeft) / 2
    const y = (512 + bounds.actualBoundingBoxAscent - bounds.actualBoundingBoxDescent) / 2
    context.fillStyle = "#F3F0E8"
    context.fillText("C", x, y)
    return canvas.toDataURL("image/png")
  })
  const source = Buffer.from(dataUrl.split(",")[1], "base64")
  const sizes = [16, 32, 48]
  const images = await Promise.all(sizes.map(size => sharp(source).resize(size, size).png().toBuffer()))
  const header = Buffer.alloc(6 + sizes.length * 16)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(sizes.length, 4)
  let offset = header.length
  sizes.forEach((size, index) => {
    const entry = 6 + index * 16
    header[entry] = header[entry + 1] = size
    header.writeUInt16LE(1, entry + 4)
    header.writeUInt16LE(32, entry + 6)
    header.writeUInt32LE(images[index].length, entry + 8)
    header.writeUInt32LE(offset, entry + 12)
    offset += images[index].length
  })
  const output = new URL("../static/", import.meta.url)
  await mkdir(output, { recursive: true })
  await writeFile(new URL("favicon.ico", output), Buffer.concat([header, ...images]))
  await writeFile(new URL("favicon.png", output), images[1])
} finally {
  await browser.close()
}

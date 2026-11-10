const assert = require("node:assert/strict")
const { test } = require("node:test")

// These APIs are used by Gatsby's pinned dependencies. Keep coverage when
// changing security overrides across their upstream version constraints.
test("development 404 query parameters round-trip through query-string", async () => {
  const { default: queryString } = await import("query-string")
  const search = queryString.stringify({ filter: "自己紹介 /about/", page: "2" })
  assert.deepEqual({ ...queryString.parse(search) }, {
    filter: "自己紹介 /about/",
    page: "2",
  })
})

test("Gatsby's GraphQL code generation works with the overridden utilities", async () => {
  const { codegen } = require("@graphql-codegen/core")
  const { parse } = require("graphql")
  const output = await codegen({
    filename: "types.ts",
    schema: parse("type Query { title: String! }"),
    documents: [],
    plugins: [{ typescript: {} }],
    pluginMap: { typescript: require("@graphql-codegen/typescript") },
    config: {},
  })
  assert.match(output, /export type Query/)
  assert.match(output, /title:/)
})

test("Gatsby's Sharp wrapper loads and processes an image", async () => {
  const sharp = await require("gatsby-sharp")()
  const png = await sharp({
    create: { width: 2, height: 2, channels: 4, background: "#123456" },
  }).resize(1, 1).png().toBuffer()
  const metadata = await sharp(png).metadata()
  assert.equal(metadata.format, "png")
  assert.equal(metadata.width, 1)
  assert.equal(metadata.height, 1)
})

test("Webpack serialization preserves values and escapes script boundaries", () => {
  const serialize = require("serialize-javascript")
  const value = { title: "</script><script>alert(1)</script>", pattern: /a+/gi }
  const serialized = serialize(value)
  assert.ok(!serialized.includes("</script>"))
  const restored = require("node:vm").runInNewContext(`(${serialized})`)
  assert.equal(restored.title, value.title)
  assert.equal(restored.pattern.source, value.pattern.source)
  assert.equal(restored.pattern.flags, value.pattern.flags)
})

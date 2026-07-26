const Parser = require("rss-parser")

const HATENA_RSS_URL = "https://colloidgel.hatenablog.com/rss"
const HATENA_RSS_MAX_ATTEMPTS = 3
const HATENA_RSS_RETRY_DELAY_MS = 2000
const HATENA_RSS_TIMEOUT_MS = 15000

const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds))

const fetchHatenaItems = async (reporter) => {
  let lastError

  for (let attempt = 1; attempt <= HATENA_RSS_MAX_ATTEMPTS; attempt += 1) {
    try {
      const parser = new Parser({ timeout: HATENA_RSS_TIMEOUT_MS })
      const feed = await parser.parseURL(HATENA_RSS_URL)
      const items = Array.isArray(feed?.items) ? feed.items : []

      if (items.length === 0) {
        throw new Error("RSS feed contained no posts")
      }

      reporter.info(`[hatena] Loaded ${items.length} posts from RSS`)
      return items
    } catch (error) {
      lastError = error
      reporter.warn(
        `[hatena] RSS fetch attempt ${attempt}/${HATENA_RSS_MAX_ATTEMPTS} failed: ${error.message}`
      )

      if (attempt < HATENA_RSS_MAX_ATTEMPTS) {
        await wait(HATENA_RSS_RETRY_DELAY_MS * attempt)
      }
    }
  }

  const error = new Error(
    `[hatena] RSS fetch failed after ${HATENA_RSS_MAX_ATTEMPTS} attempts; aborting build`
  )
  error.cause = lastError
  throw error
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type HatenaPost implements Node @dontInfer {
      title: String!
      link: String!
      pubDate: String!
      isoDate: Date @dateformat
    }
  `)
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  const { createNode } = actions
  const items = await fetchHatenaItems(reporter)

  items.forEach((item, index) => {
    const isoDate =
      item.isoDate ||
      (item.pubDate ? new Date(item.pubDate).toISOString() : "")
    const nodeData = {
      title: item.title || "",
      link: item.link || "",
      pubDate: item.pubDate || "",
      isoDate,
    }
    const nodeId = createNodeId(
      `hatena-post-${item.link || item.title || index}`
    )

    createNode({
      ...nodeData,
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: "HatenaPost",
        contentDigest: createContentDigest(nodeData),
      },
    })
  })
}

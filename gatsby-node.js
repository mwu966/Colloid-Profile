const Parser = require("rss-parser")

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  const { createNode } = actions
  const parser = new Parser()
  let feed

  try {
    feed = await parser.parseURL("https://colloidgel.hatenablog.com/rss")
  } catch (error) {
    reporter.warn(`[hatena] RSS fetch failed: ${error.message}`)
    return
  }

  if (!feed || !Array.isArray(feed.items)) {
    return
  }

  feed.items.forEach((item, index) => {
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

const Parser = require("rss-parser")

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
}) => {
  const { createNode } = actions
  const parser = new Parser()
  let items = []

  try {
    const feed = await parser.parseURL("https://colloidgel.hatenablog.com/rss")
    items = Array.isArray(feed?.items) ? feed.items : []
  } catch (error) {
    items = []
  }

  if (!Array.isArray(items) || items.length === 0) {
    return
  }

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

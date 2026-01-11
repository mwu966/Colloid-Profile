/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Colloid-Profile`,
    siteUrl: `https://mwu966.github.io/Colloid-Profile/`,
  },
  pathPrefix: "/Colloid-Profile",
  plugins: [
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        mode: "async",
        enableListener: true,
        preconnect: ["https://fonts.googleapis.com", "https://fonts.gstatic.com"],
        web: [
          {
            name: "Kaisei Decol",
            file: `https://fonts.googleapis.com/css2?family=Kaisei+Decol:wght@500;600&display=swap`,
          },
          {
            name: "Noto Sans JP",
            file: `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500&display=swap`,
          },
      ],
    },
  },
    'gatsby-plugin-theme-ui'
  ],
}

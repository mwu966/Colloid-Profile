/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Colloid-Profile`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  pathPrefix: "/Colloid-Profile",
  plugins: [    {
    resolve: `gatsby-omni-font-loader`,
    options: {
      mode: "async",
      enableListener: true,
      preconnect: ["https://fonts.gstatic.com"],
      web: [
        {
         name: "Kaisei Opti",
          file: `https://fonts.googleapis.com/css2?family=Kaisei+Opti:wght@400;500;700&display=swap`,
        },
      ],
    },
  },
    'gatsby-plugin-theme-ui'
  ],
}

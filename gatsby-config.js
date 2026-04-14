/**
 * @type {import('gatsby').GatsbyConfig}
 */
const gaMeasurementId = process.env.GA_MEASUREMENT_ID || `G-DQXHTCPQG2`

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
            file: `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap`,
          },
          {
            name: "Zen Kaku Gothic New",
            file: `https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@500;700;900&display=swap`,
          },
          {
            name: "Montserrat",
            file: `https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;900&display=swap`,
          },
      ],
    },
  },
    `gatsby-plugin-theme-ui`,
    ...(gaMeasurementId
      ? [
          {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
              trackingIds: [gaMeasurementId],
              pluginConfig: {
                head: true,
                respectDNT: true,
                exclude: ["/preview/**", "/do-not-track/me/too/"],
              },
            },
          },
        ]
      : []),
  ],
}

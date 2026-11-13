const React = require("react")
const { withPrefix } = require("gatsby")

exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: "ja" })
  setHeadComponents([
    React.createElement("link", { key: "favicon", rel: "icon", type: "image/x-icon", sizes: "16x16 32x32 48x48", href: withPrefix("/favicon.ico") }),
    React.createElement("meta", { key: "theme-color", name: "theme-color", content: "#102A43" }),
  ])
}

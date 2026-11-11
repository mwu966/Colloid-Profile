const React = require("react")

exports.onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: "ja" })
  setHeadComponents([
    React.createElement("meta", { key: "theme-color", name: "theme-color", content: "#102A43" }),
  ])
}

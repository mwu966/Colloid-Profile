const React = require("react")

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    React.createElement("script", {
      key: "fontawesome-kit",
      src: "https://kit.fontawesome.com/9668707a92.js",
      crossOrigin: "anonymous",
    }),
  ])
}

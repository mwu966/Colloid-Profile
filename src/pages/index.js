import * as React from "react"
import Header from "../components/header"
import { jsx } from "theme-ui"


export default function  IndexPage() {

  const contentStyle = {
    margin: "auto",
    maxWidth: "500px",
};
  return (
    <div>
      <Header />
      <div>
        <h1>Hello world</h1>
      </div>
    </div>

  )
}



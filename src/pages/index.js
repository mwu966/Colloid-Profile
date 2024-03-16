import * as React from "react"
import Header from "../components/header"
import { jsx } from "theme-ui"


export default function  IndexPage() {

  const contentStyle = {
    margin: "auto",
    maxWidth: "500px",
    fontFamily: 'Kaisei Opti, sans-serif', // フォントを設定します
  };

  return (
    
      <div>
        <Header />
        <div style={contentStyle}>
          <h1>Hello world　あいうえお</h1>
          <span>こんにちは、世界</span>
        </div>
      </div>
    
  )
}
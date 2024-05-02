import * as React from "react"
import Header from "../components/header"
import Profile from "../components/profile"
import { jsx } from "theme-ui"

export const Head = () => (
  <>
    <title>Colloid's Profile Portal Site - CollidのPortalサイト</title>
    <meta name="description" content="Hello World" />
  </>
)


export default function IndexPage() {

  const contentStyle = {
    margin: "auto",
    fontFamily: 'Kaisei Opti, sans-serif', // フォントを設定します
    
  };

  const linkStyle = {
    color: 'white'
  }


  return (
    <div>
      {/* <Header /> */}
      <div style={contentStyle}>
        <h1>Colloid's Profile Portal Site </h1>
        <span>2024/05/02 取り急ぎ仮でリンクを置いた。見た目その他は工事中。</span>
        {/* <Profile /> */}
        <h3>Blog</h3>
        <div>
          <a href="https://colloidgel.hatenablog.com/" style={linkStyle}>ミルク蒼屋のチラシ</a>
        </div>
        <h3>SNS</h3>
        <div>
          <a href="https://twitter.com/ColloidGel" style={linkStyle}>X(Twitter)</a>
        </div>
        <div>
          <a href="https://bsky.app/profile/colloidgel.bsky.social" style={linkStyle}>BlueSky</a>
        </div>
        <h3>お絵かき系</h3>
        <div>
          <a href="https://www.pixiv.net/users/1965562" style={linkStyle}>pixiv</a>
        </div>
        <div>
          <a href="https://xfolio.jp/portfolio/ColloidGel" style={linkStyle}>Xfolio</a>
        </div>
        <h3>同人誌の通販</h3>
        <div>
          <a href="https://blueparticles.booth.pm/" style={linkStyle}>BOOTH</a>
        </div>
        <div>
          <a href="https://www.melonbooks.co.jp/circle/index.php?circle_id=100689" style={linkStyle}>メロンブックス</a>
        </div>
        <h3>技術系</h3>
        <div>
          <a href="https://qiita.com/ColloidGel" style={linkStyle}>Qiita</a>
        </div>
        <div>
          <a href="https://zenn.dev/colloidgel" style={linkStyle}>Zenn</a>
        </div>
      </div>
    </div>

  )
}
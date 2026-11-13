import * as React from "react"
import { graphql } from "gatsby"
import ScrollOpening from "../components/home/IntroSection"
import IntroDetail from "../components/home/IntroDetail"
import "../styles/portal.css"

export const Head = ({ data }) => {
  const siteUrl = `${data.site.siteMetadata.siteUrl.replace(/\/+$/, "")}/`
  return <>
    <html lang="ja" />
    <title>Colloid Archive Portal</title>
    <meta name="description" content="Colloidの創作と技術のアーカイブポータルサイトです。" />
    <meta name="theme-color" content="#102A43" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Colloid Archive Portal" />
    <meta property="og:description" content="Colloidの創作と技術をまとめた個人サイト" />
    <meta property="og:url" content={siteUrl} />
    <meta property="og:image" content={new URL("ogp.png", siteUrl).href} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
  </>
}

export default function IndexPage({ data }) {
  const [introIndex, setIntroIndex] = React.useState(0)
  const [detail, setDetail] = React.useState(null)
  return <>
    <a className="skip-link" href="#intro">Introへ移動</a>
    <main className="portal">
      <ScrollOpening index={introIndex} setIndex={setIntroIndex} onDetails={setDetail} posts={data?.allHatenaPost?.nodes ?? []} />
    </main>
    {detail ? <IntroDetail initialKey={detail} onClose={() => setDetail(null)} /> : null}
  </>
}

export const query = graphql`
  {
    site {
      siteMetadata {
        siteUrl
      }
    }
    allHatenaPost(sort: { isoDate: DESC }) {
      nodes {
        id
        title
        link
        pubDate
        isoDate
      }
    }
  }
`

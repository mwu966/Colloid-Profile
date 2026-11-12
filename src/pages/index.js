import * as React from "react"
import { graphql } from "gatsby"
import ScrollOpening from "../components/home/IntroSection"
import IntroDetail from "../components/home/IntroDetail"
import "../styles/portal.css"

export const Head = () => <><html lang="ja" /><title>Colloid Archive Portal</title><meta name="description" content="Colloidの創作と技術のアーカイブポータルサイトです。" /><meta name="theme-color" content="#102A43" /></>

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

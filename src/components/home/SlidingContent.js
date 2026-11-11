import * as React from "react"

export default function SlidingContent({ index, direction = 1, children }) {
  const prior = React.useRef({ index, children })
  const current = React.useRef(children)
  current.current = children
  const [leaving, setLeaving] = React.useState(null)
  React.useEffect(() => {
    if (prior.current.index === index) return
    setLeaving(prior.current)
    prior.current = { index, children: current.current }
    const timer = setTimeout(() => setLeaving(null), 380)
    return () => clearTimeout(timer)
  }, [index])
  return <div className="sliding-content" style={{ "--slide-direction": direction }}>
    {leaving ? <div key={`out-${leaving.index}`} className="slide-leaving" aria-hidden="true" ref={node => { if (node) node.inert = true }}>{leaving.children}</div> : null}
    <div className="slide-current" key={index}>{children}</div>
  </div>
}

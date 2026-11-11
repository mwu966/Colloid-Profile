// One event per Markdown line: YYYY[/MM/DD] Event [Title](https://...) suffix.
function parseCreativeHistory(markdown) {
  const groups = new Map()
  markdown.split(/\r?\n/).forEach((line, index) => {
    line = line.trim()
    if (!line || line.startsWith('#') || line.startsWith('<!--')) return
    const dated = /^(\d{4})(?:\/\d{2}\/\d{2})?(?:\s*-\s*\d{4}\/\d{2}\/\d{2})?\s+(.+)$/.exec(line)
    if (!dated) throw new Error(`history.md:${index + 1}: 年または日付とイベント名を記載してください`)
    const [, year, body] = dated
    const first = body.indexOf('[')
    const matches = [...body.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)]
    let links
    try {
      links = matches.map(match => {
        if (!/^https?:$/.test(new URL(match[2]).protocol)) throw new Error('protocol')
        return { label: match[1], url: match[2] }
      })
      if ((body.match(/\[/g) || []).length !== matches.length) throw new Error('syntax')
    } catch {
      throw new Error(`history.md:${index + 1}: リンク形式が不正です`)
    }
    const label = (first >= 0 ? body.slice(0, first) : body).trim()
    if (!label) throw new Error(`history.md:${index + 1}: イベント名がありません`)
    const last = matches.at(-1)
    const suffix = last ? body.slice(last.index + last[0].length).trim() : ''
    const item = { label, links, ...(suffix && suffix !== 'を頒布' ? { tail: suffix } : {}) }
    if (!groups.has(year)) groups.set(year, [])
    groups.get(year).push(item)
  })
  if (!groups.size) throw new Error('history.md: 履歴がありません')
  return [...groups].sort(([a], [b]) => Number(b) - Number(a)).map(([year, items]) => ({ year, items }))
}
module.exports = { parseCreativeHistory }

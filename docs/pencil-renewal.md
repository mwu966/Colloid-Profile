# Pencil renewal implementation

Source of truth: `design/site-design-version2.pen` (Pencil MCP, inspected 2026-11-11).

| Adopted frames | Implementation |
| --- | --- |
| A-00–04 / AM-00–03 | `ScrollOpening`: independent glyphs, navy background, left ivory entrance |
| S-00–02 / SM-01–03 | `IntroSection`: three slides, retained selection, outline details action |
| S-10–13 / SM-10–13 | `LinksSection`: four categories, existing Font Awesome icons |
| S-20 / SM-20 | `BlogSection`: existing Gatsby RSS query, newest four posts |
| S-21 / SM-21 | `WaveBoxSection`: 300×68 ivory CTA, message / external icons |
| S-30 / SM-30 | Profile detail, original biography / timeline / hobbies |
| S-40–43 / SM-40 | Continuous Creative archive, every year / publication / URL |
| S-50–52 / SM-50 | Continuous Engineering detail, career / certifications / skills / talks |

C-03 remains the visual baseline. D-20 is an old transition study: use only its panel expansion concept, not its outdated typography, header divider or inset layout. S detail frames represent successive scroll viewports, not pagination. No other comparison frame is adopted. Keep existing content in `src/data/homeContent.js` unchanged.

User adjustment during preview: after the TOP entrance, keep a single two-tone surface and header fixed. Change only foreground section contents with a restrained scroll-linked fade. The ivory surface does not scroll between Intro, Links, Blog and WaveBox.

Implementation uses shared CSS tokens, native modal dialogs, CSS transforms/opacity, a passive scroll listener throttled with requestAnimationFrame, and reduced-motion alternatives. No animation dependency is required. Desktop retains a five-by-five skills map; mobile uses two five-segment gauges with numerical values per skill, following the later preview adjustment. Full detail content remains in normal vertical reading flow.

Do not deploy, commit, push, or create a PR without a separate instruction.

Mobile refinement: retain all 15 skill values, replace the three-column table with vertically stacked technologies and paired experience/specialty gauges. Keep the mobile return control as a normal link beneath the category tabs, with no fixed footer control.

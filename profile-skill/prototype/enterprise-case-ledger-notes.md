# Business Examples Prototype Notes

Prototype date: 2026-07-29

Question:

> Does the selected business-example direction work for a 2-page designed public resume?

Prototype files:

- `profile-skill/prototype/enterprise-case-ledger-prototype.html`
- `profile-skill/prototype/enterprise-case-ledger-prototype.css`
- `profile-skill/prototype/enterprise-case-ledger-A.png`
- `profile-skill/prototype/enterprise-case-ledger-A-tall.png`
- `profile-skill/prototype/enterprise-case-ledger-B.png`
- `profile-skill/prototype/enterprise-case-ledger-C.png`

Open locally:

```text
D:\DATA\profile-resume\profile-skill\prototype\enterprise-case-ledger-prototype.html?variant=A
D:\DATA\profile-resume\profile-skill\prototype\enterprise-case-ledger-prototype.html?variant=B
D:\DATA\profile-resume\profile-skill\prototype\enterprise-case-ledger-prototype.html?variant=C
```

Variant switcher:

- Bottom floating bar.
- Left / right arrows cycle variants.
- Keyboard left / right arrows also cycle variants.

## Confirmed Decisions Feeding This Prototype

- Public baseline positioning: BI-first.
- Main title: `BI 分析師 / 資料分析師 / AI 應用資料分析`.
- Primary language: Traditional Chinese.
- Public contact: city, email, GitHub.
- Omit phone and district-level address.
- Designed version target: 2 pages.
- Enterprise case order: 王品 -> 向上 -> FILA.
- Portfolio section: GROUP-PROJECT / Repuguard as lead work.
- Supporting portfolio works: Price Inquiry, Taiwan Windy, ML workflow.
- Omit from 2-page designed version by default: SVM, MovieTop100, ML Algorithms Introduce.

## Variant A - Business Examples

Structure:

- Page 1: header, metrics, positioning, skills, compact career, education/cert/language.
- Page 2: enterprise examples with 王品 -> 向上 -> FILA, then a separate portfolio section.
- Revised after review: first draft was too sparse and the portfolio block was weak. Variant A now uses a denser page-one structure and a stronger portfolio board.
- Revised after user critique: removed confusing internal labels such as `證據地圖`, `企業案例帳本`, and competing `企業案例 / 企業實績` wording; current reader-facing label is `企業實例`.
- Page separation was made explicit in screen preview: each A4 page now has its own paper shadow, border, and footer marker (`PAGE 01`, `PAGE 02`).
- Portfolio now has its own `作品集` section heading, separating GROUP-PROJECT from the enterprise examples.
- Revised after layout critique: page 1 no longer previews page 2 or includes a portfolio entrance. The freed space now strengthens the first-page profile with `能力輪廓` and `交付方式`.
- Portfolio heading alignment was corrected by grouping `Portfolio / 作品集` on the left and placing the section description on the right.
- Revised portfolio layout after user feedback: GROUP-PROJECT now uses structured fields (`定位`, `角色`, `Demo`) plus numbered deliverables (`資料與後端`, `AI 應用`, `產品呈現`, `部署維運`). Supporting works now show compact category labels before the description.
- Revised visual weight after critique: `能力輪廓` no longer uses card-like blocks or a heavy section divider; it is now a quieter three-column profile list. Portfolio green-tinted panels were reduced to white/neutral panels with thin borders and a single accent line.
- Revised first-page delivery row after critique: `交付方式` no longer appears as a colored banner. It is now a low-emphasis inline process note under `能力輪廓`, separated only by a thin rule and slash dividers.
- Revised ability profile after readability critique: replaced the three-column paragraph layout and separate delivery row with a larger `能力矩陣`. Each row now has a clear capability name, compact skill tags, and one evidence sentence, so it is less likely to be skipped at resume font sizes.
- Revised first-page density after user feedback: expanded `能力輪廓` with a short framing sentence and a fourth row for `AI 應用與系統整合`, then tuned spacing so page 1 feels fuller without colliding with the footer.
- Revised first-page footer spacing after critique: removed the last capability-row bottom border and tightened matrix row height slightly, avoiding the double-line effect above `PAGE 01`.
- Portfolio block now follows the same visual language as enterprise cases and uses `問題 / 作法 / 成果` to make GROUP-PROJECT clearer.

Strength:

- Most aligned with the chosen enterprise-example direction.
- Clear evidence hierarchy.
- Enterprise cases feel like business proof, not just job history.

Risk:

- Production still needs typography refinement and better page break control.
- Portfolio hierarchy is now clearer: GROUP-PROJECT is the lead block; Price Inquiry, Taiwan Windy, and ML workflow are supporting blocks.
- Current prototype may still be too dense at screenshot scale. Production should raise type size and trim copy rather than shrinking text further.

## Variant B - Timeline Evidence

Structure:

- Page 1: similar BI-first profile with a stronger BI banner.
- Page 2: cases shown as timeline evidence.

Strength:

- Stronger narrative of progression.
- The `BI-first` banner is useful and could be borrowed.

Risk:

- Timeline is less close to the user's requested "enterprise cases as main axis" framing.

## Variant C - Dossier Split

Structure:

- Page 1: claim-driven profile.
- Page 2: left-side dossier framing, right-side case cards, portfolio attached to the side rail.

Strength:

- Distinctive and editorial.
- The "case dossier" language is memorable.

Risk:

- Less ATS-like and may feel more portfolio/editorial than resume.
- GROUP-PROJECT may visually compete with enterprise cases.

## Current Recommendation

Proceed with revised Variant A as the production base, borrowing:

- Variant B's stronger `BI-first` banner.
- Variant C's concise "主張" wording if the production page one needs a stronger human claim.

Production rewrite should not copy the prototype directly. Rebuild the selected layout cleanly under `profile-skill/output/` or `final-resume/` after user confirms the prototype direction.

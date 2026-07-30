# Public Resume Review

Reviewed file:

- `profile-skill/content/public-resume.md`

Evidence files:

- `profile-skill/content/evidence-inventory.md`
- `profile-skill/content/open-questions.md`
- `D:\DATA\activita_resume\skills\resume-builder\references\review-checklist.md`

Review date: 2026-07-29

## Summary

Status: designed public version exported; ATS version already exists and should be refreshed later from the final public content if needed.

The public resume is privacy-safe by current user choice: it removes phone number and district-level address, while keeping email as the public contact path. It uses `台中市`, email, and GitHub. The training-program section now centers on GROUP-PROJECT as a private main project and keeps `https://repuguard.ai-future2026.com/` as the required final-result demo URL.

## Evidence Gate

- [x] Employment dates are listed consistently by month.
- [x] Total experience is framed as `8 年以上數據分析、市場研究、CRM / CDP、SQL、Power BI`, not as 8+ years of AI engineering.
- [x] Quantified claims are traceable:
  - `80% 以上` report compilation reduction: supported by prior resume source.
  - `30 件以上` research projects: supported by prior resume source.
- [x] GROUP-PROJECT claims are backed by local `D:\DATA\group-project` README and deployment guide.
- [x] GROUP-PROJECT private repo is not treated as a public review path; the final demo URL is the public showcase.

Needs final confirmation:

- FILA date range `2024/04 - 2026/04`.
- Whether to keep `Main repo: jimm1218/group-project（private）` in public resume, or show only the demo URL.
- Whether the course name should remain `中興大學 AI 人工智慧與數據分析應用班` or use a longer official name.

## Content Gate

- [x] Target title is explicit: `資料分析師 / BI 分析師 / AI 應用資料分析`.
- [x] Summary is evidence-based and avoids generic personality claims.
- [x] Skills in the summary appear in work experience or project sections.
- [x] Recent relevant work receives the most space.
- [x] GROUP-PROJECT is the main training-program project and is not repeated as separate Repuguard / group-project-V2 / Group_projectA entries.
- [x] Older academic/research work is compressed into transferable value.

Potential refinement:

- The public version is broad. Once a target role appears, create a tailored version that moves the strongest matching evidence into the top half of page one.

## ATS Gate

- [x] Headings are plain Markdown headings.
- [x] Contact details are plain text.
- [x] Dates use a consistent `YYYY/MM - YYYY/MM` format.
- [x] Important information is not conveyed by icons or images.
- [ ] Exported PDF reading order not checked yet.
- [ ] Final filename not created yet.

Recommended public ATS filename:

```text
Jimmy-Chin_Public-Resume_Data-BI-AI-Analyst_ZH.pdf
```

## Privacy Gate

- [x] Phone number removed.
- [x] Email included by user choice as the public contact path.
- [x] District-level address removed.
- [x] No API keys, service keys, SSH keys, or deployment secrets included.
- [x] Application version is still separate from public version.

Open decision:

- Publicly showing that a repo is private is acceptable, but not always necessary. For a cleaner public resume, consider changing the project metadata to:

```text
Main project: GROUP-PROJECT（private repo）
Demo: https://repuguard.ai-future2026.com/
Public references: ...
```

## Rendering Gate

ATS HTML/PDF output created under `profile-skill/output/`.

Generated files:

- `profile-skill/output/ats-public-resume.html`
- `profile-skill/output/ats-public-resume.css`
- `profile-skill/output/ats-public-resume-preview.png`
- `profile-skill/output/Jimmy-Chin_Public-Resume_Data-BI-AI-Analyst_ZH_ATS.pdf`

Checks completed:

- [x] HTML preview generated with Chrome headless.
- [x] Visual preview shows readable single-column layout with no obvious text overlap.
- [x] Public output still excludes phone, district-level address, API keys, deployment secrets, and SSH key names; email is intentionally included.
- [x] Approximate PDF page count reduced from 4 to 3 pages after compaction.

Still not fully checked:

- PDF text selectability / reading order could not be verified because `pdftotext` or similar tooling is not installed.
- Links open correctly.
- Full-page PDF visual inspection beyond generated preview.

Before final release, manually open the PDF and check:

- Text is selectable.
- Links open correctly.
- No clipped text, orphan headings, or unintended blank pages.
- Page count is acceptable for the intended use.

## Designed Version Gate

Designed public output created under `profile-skill/output/` after prototype approval.

Generated files:

- `profile-skill/output/designed-public-resume.html`
- `profile-skill/output/designed-public-resume.css`
- `profile-skill/output/designed-public-resume-preview.png`
- `profile-skill/output/Jimmy-Chin_Public-Resume_Data-BI-AI-Analyst_ZH_Designed.pdf`

Design decisions carried forward from prototype:

- Two-page Traditional Chinese designed version.
- Page 1: positioning, metrics, career spine, core skills, education/certificate, and ability matrix.
- Page 2: `企業實例` followed by a separate `作品集` section.
- Enterprise example order: 王品 -> 向上 -> FILA.
- Portfolio lead: GROUP-PROJECT / Repuguard with final demo URL.
- Supporting portfolio works: Price Inquiry, Taiwan Windy, ML workflow.
- Public version includes email by user choice and excludes phone / district-level address.

Checks completed:

- [x] Prototype switcher and alternate variants removed from production HTML.
- [x] Chrome headless generated designed PDF.
- [x] Chrome headless generated visual preview.
- [x] Visual preview shows two clear A4 pages with no obvious clipping or overlap.
- [x] PDF file has EOF marker.
- [x] PDF page object count indicates 2 pages (`/Type /Page` minus `/Type /Pages`).
- [x] Links are written as plain `mailto:` and `https://` anchors in HTML.

Still not fully checked:

- PDF text selectability / reading order could not be verified because `pdftotext`, `pdfinfo`, `mutool`, `qpdf`, `pypdf`, `PyPDF2`, and `fitz` are not available in this environment.
- Links should still be manually clicked in a PDF viewer before final external sending.

## Recommended Next Step

Open the designed PDF manually for a final human check:

- Confirm text is selectable.
- Confirm links open correctly.
- Confirm no clipped text appears in the PDF viewer.
- Confirm the two-page designed version is acceptable.

After that, refresh the ATS version from the same accepted wording if the designed version content is now final.

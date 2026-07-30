# Tailoring Plan

Use this file to turn `master-resume.md` into a targeted resume version.

## Default Versions To Produce

### 0. Public Baseline Version

Goal: a general-purpose public resume before a specific job description exists.

Source:

- `profile-skill/content/public-resume.md`
- `profile-skill/content/public-resume-review.md`

Emphasis:

- BI-first positioning: `BI 分析師 / 資料分析師 / AI 應用資料分析`.
- Traditional Chinese as the primary public baseline language; English version is a later separate deliverable.
- Broad coverage across Data Analyst, BI Analyst, and AI Application Data Analyst without implying 8+ years of AI engineering.
- Public-safe contact line with city, email, and GitHub; still omit phone and district-level address.
- GROUP-PROJECT as the main training-program case.
- GROUP-PROJECT as a private main repo, with `https://repuguard.ai-future2026.com/` retained as the required final-result demo URL.

Next outputs:

- ATS public PDF: acceptable target is 2-3 pages.
- Designed public PDF: target is 2 pages.
- Designed public page structure:
  - Page 1: BI-first profile, core skills, and career narrative.
  - Page 2: enterprise cases ordered Wang Steak -> 向上國際科技 -> FILA; separate portfolio section led by GROUP-PROJECT, with smaller projects as supporting work.
- Designed public portfolio selection:
  - Lead: GROUP-PROJECT / Repuguard.
  - Supporting: Price Inquiry, Taiwan Windy, ML workflow.
  - Omit from 2-page designed version by default: SVM, MovieTop100, ML Algorithms Introduce.
- Designed public early research treatment:
  - Keep, but compress into a small line/block.
  - Suggested text: `早期研究：循證民調 30+ 市調專案；逢甲 / 中央大學空間資訊與災害風險研究`.
  - Do not expand thesis or academic publication unless targeting research roles.

Do not include:

- Phone number.
- District-level address.
- API keys, deployment secrets, or private infrastructure details.

### 1. ATS Data Analyst Version

Goal: conservative, machine-readable resume for job platforms and HR systems.

Emphasis:

- SQL, data cleaning, CRM/member data, campaign analysis, operational reporting.
- FILA, Wang Steak, ETMall, and 循證民調.
- Repuguard and other projects compressed into selected project evidence.

Keep:

- Standard headings.
- Single-column structure.
- Plain text contact details.
- Conventional date format.

Trim:

- Visual language.
- Long project descriptions.
- Driver licenses unless required.
- Excessive AI deployment detail unless the role mentions AI products.

### 2. BI Analyst Version

Goal: highlight dashboarding, KPI design, data model thinking, and stakeholder-facing analytics.

Emphasis:

- Power BI, DAX, Power Query, SQL Server, BigQuery, CDP, RFM, retention, churn warning.
- FILA member health dashboard and 80%+ manual compilation reduction.
- Wang Steak CDP and member tag pipeline.
- ETMall reporting automation.

Suggested top summary:

> 資料分析與 BI 分析師，具 8 年以上 CRM/CDP、SQL、Power BI 與營運分析經驗，擅長將會員經營、行銷活動與營運問題轉化為可追蹤 KPI、資料模型與管理儀表板。

### 3. AI Application Data Analyst Version

Goal: position the candidate as an analytics professional who can also build deployable AI/BI tools.

Emphasis:

- Repuguard as the lead selected project.
- Use GROUP-PROJECT / private repo `jimm1218/group-project` as the introduction axis for the training-program section.
- Do not list `group-project-V2` or `Group_projectA` in the public resume unless a future portfolio page needs implementation history.
- Python, FastAPI, Supabase, Machine Learning, Gemini API, Hugging Face API, Docker, GCP VM, GitHub Actions.
- Business analytics background as the domain advantage.

Suggested top summary:

> 具商業數據分析、BI 與 CRM/CDP 經驗的 AI 應用資料分析師，能將營運問題拆解為資料流程、模型判斷、儀表板與可部署應用，近期完成 FastAPI、Supabase、ML、LLM API、Docker 與 GCP VM 整合專案。

## Tailoring Steps

1. Paste or save the target job description into `profile-skill/research/job-language.md`.
2. Extract repeated keywords, required tools, domain language, and seniority expectations.
3. Compare those requirements against `evidence-inventory.md`.
4. Select one positioning sentence.
5. Rewrite only supported claims from `master-resume.md`.
6. Move the strongest target-role evidence into the top half of page one.
7. Compress older roles and non-target projects.
8. Save the result as `profile-skill/content/tailored-resume.md`.
9. Run the checklist in `D:\DATA\activita_resume\skills\resume-builder\references\review-checklist.md`.

## Evidence Selection Matrix

| Target | Must Lead With | Secondary Evidence | Compress |
| --- | --- | --- | --- |
| Data Analyst | SQL, CRM, campaign analysis, operational reporting | Market research, BI dashboards, Python projects | Detailed deployment stack |
| BI Analyst | Power BI, DAX, Power Query, KPI design, dashboards | CDP, BigQuery, SQL Server, stakeholder training | Academic research details |
| AI Application Data Analyst | Repuguard, Python, FastAPI, Supabase, ML, LLM APIs, GCP | FILA BI, CRM/CDP, analytics translation | Older nontechnical roles |
| Data Scientist | ML workflow, Scikit-learn, feature engineering, model evaluation | Repuguard risk model, SVM project, analytics background | Power BI-only details |
| Database / SQL Role | T-SQL, Presto SQL, Stored Procedures, SQL Server, BigQuery | ETL, reporting automation, CDP table mapping | Visual design and portfolio content |

## Validation Before Export

- Every metric appears in `evidence-inventory.md`.
- Any unconfirmed item appears in `open-questions.md` and is omitted from final output until confirmed.
- Public version removes phone and district-level address; email is included by user choice.
- Application version uses the contact details the user approves.
- PDF text is selectable and copies in the intended reading order.
- Filename includes candidate, target role, language, and version.

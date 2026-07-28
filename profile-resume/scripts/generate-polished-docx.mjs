import fs from "node:fs";
import path from "node:path";
import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  LevelFormat,
  Packer,
  Paragraph,
  PageBreak,
  ShadingType,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  TextRun,
  WidthType,
} from "docx";

const root = path.resolve(import.meta.dirname, "..");
const outputPath = path.join(root, "jimmy-chin-resume-designed.docx");

const font = "Microsoft JhengHei";
const color = {
  navy: "14324A",
  teal: "0F766E",
  slate: "334155",
  muted: "64748B",
  pale: "EAF6F4",
  border: "CBD5E1",
  white: "FFFFFF",
};

const run = (value, options = {}) =>
  new TextRun({
    text: value,
    font,
    size: options.size ?? 20,
    bold: options.bold ?? false,
    italics: options.italics ?? false,
    color: options.color ?? color.slate,
    break: options.break,
  });

const paragraph = (children, options = {}) =>
  new Paragraph({
    children: Array.isArray(children) ? children : [run(children, options.text ?? {})],
    alignment: options.alignment ?? AlignmentType.LEFT,
    heading: options.heading,
    numbering: options.numbering,
    spacing: {
      before: options.before ?? 0,
      after: options.after ?? 80,
      line: options.line ?? 250,
    },
    indent: options.indent,
    border: options.border,
  });

const sectionTitle = (label) =>
  paragraph([run(label, { bold: true, size: 23, color: color.teal })], {
    before: 170,
    after: 70,
    heading: HeadingLevel.HEADING_2,
    border: {
      bottom: {
        color: color.teal,
        space: 1,
        style: BorderStyle.SINGLE,
        size: 8,
      },
    },
  });

const metaLine = (items) =>
  paragraph(items.map((item, index) => run(`${index ? "  |  " : ""}${item}`, { size: 18, color: color.muted })), {
    after: 110,
  });

const role = (company, title, period) =>
  paragraph(
    [
      run(company, { bold: true, size: 21, color: color.navy }),
      run(`  ${title}`, { bold: true, size: 20, color: color.teal }),
      run(`  ${period}`, { size: 18, color: color.muted }),
    ],
    { before: 80, after: 30 }
  );

const projectTitle = (name, meta) =>
  paragraph(
    [
      run(name, { bold: true, size: 21, color: color.navy }),
      run(`  ${meta}`, { size: 18, color: color.muted }),
    ],
    { before: 75, after: 25 }
  );

const bullet = (value) =>
  paragraph([run(value, { size: 19 })], {
    numbering: { reference: "resume-bullets", level: 0 },
    after: 35,
  });

const detail = (label, value) =>
  paragraph([run(`${label}：`, { bold: true, size: 19, color: color.navy }), run(value, { size: 19 })], {
    after: 35,
  });

const compact = (value) => paragraph(value, { text: { size: 18, color: color.muted }, after: 30, line: 230 });

const cell = (children, options = {}) =>
  new TableCell({
    width: { size: options.width, type: WidthType.PERCENTAGE },
    shading: options.shading
      ? { type: ShadingType.CLEAR, color: color.white, fill: options.shading }
      : undefined,
    margins: { top: 85, bottom: 85, left: 110, right: 110 },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 2, color: color.border },
      bottom: { style: BorderStyle.SINGLE, size: 2, color: color.border },
      left: { style: BorderStyle.SINGLE, size: 2, color: color.border },
      right: { style: BorderStyle.SINGLE, size: 2, color: color.border },
    },
    children: Array.isArray(children) ? children : [children],
  });

const skillRow = (label, detail) =>
  new TableRow({
    children: [
      cell(paragraph(label, { text: { bold: true, size: 18, color: color.navy }, after: 0 }), {
        width: 24,
        shading: color.pale,
      }),
      cell(paragraph(detail, { text: { size: 18, color: color.slate }, after: 0 }), { width: 76 }),
    ],
  });

const skillsTable = new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  layout: TableLayoutType.FIXED,
  rows: [
    skillRow("商業分析", "CRM、會員分群、RFM、回購率、留存率、流失預警、營運績效、行銷活動分析、通路分析"),
    skillRow("資料庫 / ETL", "SQL Server、BigQuery、Presto SQL、T-SQL、CTE、Window Functions、Power Query M、Access、資料清理與資料整併"),
    skillRow("BI / 視覺化", "Power BI、DAX、Google Data Studio、Chart.js、Plotly、Streamlit、KPI 儀表板、管理報表自動化"),
    skillRow("AI / ML", "Python、Scikit-learn、特徵工程、模型評估、Gemini API、Hugging Face API、RAG 回覆輔助、風險分類模型"),
    skillRow("Web / 部署", "FastAPI、Flask、JavaScript、HTML/CSS、Supabase、SQLite、Docker、GCP VM、Nginx、Vercel、Render、GitHub Actions"),
    skillRow("專案協作", "跨部門需求轉譯、專案時程控管、SOP 建立、簡報製作、教育訓練、研究設計、策略建議"),
  ],
});

const children = [
  paragraph([run("靳鈞評 Jimmy Chin", { bold: true, size: 34, color: color.navy })], { after: 20 }),
  paragraph([run("數據分析師 / BI 分析 / AI 應用專案整合", { bold: true, size: 22, color: color.teal })], {
    after: 55,
  }),
  metaLine(["台中市西屯區", "jimm1218@gmail.com", "0919-201-375", "GitHub: github.com/jimm1218"]),
  paragraph(
    "具備 8 年以上數據分析、市場研究、CRM / CDP、SQL 資料處理與 Power BI 儀表板建置經驗。曾任職於 FILA、王品集團、東森購物、向上國際科技等企業，長期支援會員經營、行銷活動、營運績效、風險稽核與管理決策報告。近期透過職訓局 AI 課程與自主專案，將既有商業分析能力延伸至 Python、FastAPI、Supabase、Machine Learning、LLM API、資料視覺化、Docker、GCP VM 與 GitHub Actions 自動部署，能把資料從報表推進到可互動、可部署、可持續維運的 AI / BI 應用。",
    { text: { size: 20, color: color.slate }, after: 90, line: 285 }
  ),

  sectionTitle("履歷亮點"),
  detail("商業資料場景", "橫跨餐飲、零售、電商、運動品牌、遊戲與市場研究，熟悉會員、商品、通路、活動與風險資料的分析脈絡。"),
  detail("資料到決策", "能從需求訪談、資料清理、SQL 查詢、模型設計、BI 視覺化一路銜接到管理層可讀的 KPI 追蹤與策略建議。"),
  detail("AI 應用落地", "職訓 AI 作品不只停留在模型練習，也包含 API 串接、資料庫、前端儀表板、部署、自動化與實際 Demo 網站。"),
  detail("溝通與導入", "具備 CDP 導入、Power BI 教學、跨部門協調與 SOP 建立經驗，能協助非技術團隊把問題轉成資料規格與決策指標。"),

  sectionTitle("核心技能"),
  skillsTable,

  sectionTitle("工作經歷"),
  role("FILA 斐樂股份有限公司", "資料分析師", "2024/04 - 2026/04"),
  bullet("整合 SQL Server 會員交易與行為資料，透過 Power BI 建置互動式管理儀表板，支援會員經營、商品偏好、活動成效與營運決策。"),
  bullet("主導 CDP 資料上傳至 BigQuery 的流程監控，運用 Power Query M 進行異質資料清理、轉置與合併，提升資料一致性。"),
  bullet("針對 RFM、回購率、會員健康度、留存率與流失預警等業務指標設計 DAX 計算邏輯，建立管理層 KPI 監控基礎。"),
  bullet("建置會員健康度與 CRM 儀表板，將原本需人工整理的週期性報表流程自動化，整體整理時間降低 80% 以上。"),
  bullet("擔任業務端與 IT 端橋樑，將提升客單價、會員回流、廣告投放等行銷目標轉化為可量化指標與分析報告。"),

  role("向上國際科技股份有限公司", "專案管理師", "2023/07 - 2024/04"),
  bullet("針對線上遊戲交易紀錄撰寫 Stored Procedures 與排程腳本，每日掃描異常轉帳、非法套利與疑似風險行為。"),
  bullet("設計自動化資料抓取與郵件發送 pipeline，將資料庫查詢結果定期送達決策者，提升風險稽核效率。"),
  bullet("跨部門協調遊戲開發、營運與風險管理單位，制定風險稽核 SOP，負責專案時程、進度追蹤與溝通整合。"),

  role("王品餐飲股份有限公司", "數位組主任", "2020/10 - 2023/07"),
  bullet("參與 CDP 平台導入與建置，負責需求梳理、資料表對接、SQL 邏輯封裝與上線支援。"),
  bullet("使用 Presto SQL 與 T-SQL 進行大規模會員資料撈取，運用 CTE 與 Window Functions 處理複雜篩選條件。"),
  bullet("建置會員標籤模組與 pipeline SQL 邏輯，將複雜分群條件封裝為可重複使用的標準查詢。"),
  bullet("分析行銷活動對會員生命週期的貢獻度，並透過 Power BI 教育訓練推動資料驅動決策文化。"),

  role("東森得易購股份有限公司", "經營分析專員", "2018/10 - 2020/10"),
  bullet("以 Excel VBA 自動化頻道與商品績效報表，提升例行分析效率並降低人工彙整錯誤。"),
  bullet("負責電視、外廣、網路與自營商品等通路績效監控，分析行銷效益、商品銷售表現與營運異常。"),
  bullet("與各部門溝通資料需求，提供會員輪廓、營運績效與活動成效分析，協助業務單位調整推廣策略。"),

  role("循證民調有限公司", "資深研究員", "2016/11 - 2018/10"),
  bullet("執行 30 件以上民調與市場研究專案，負責問卷設計、資料處理、統計分析與研究報告撰寫。"),
  bullet("建立調查執行 SOP，提升資料處理、報告製作與專案交付流程穩定度，並支援客戶提案與研究簡報。"),

  role("中央大學太空遙測中心 / 逢甲大學", "專任助理 / 研究助理", "2013/09 - 2016/09"),
  bullet("參與坡地崩塌、水災風險評估與都市環境災害風險研究計畫，負責資料庫建置、圖資繪製與現地調查。"),
  bullet("碩士論文以易損性曲線結合 CA-Markov 模型預測坡地崩塌警戒區，建立空間資訊與風險評估的研究基礎。"),

  new Paragraph({ children: [new PageBreak()] }),
  sectionTitle("AI 課程與 GitHub 作品"),
  projectTitle("Repuguard AI 輿情與回覆管理平台", "Private Repo: group-project | https://repuguard.ai-future2026.com/"),
  bullet("以 FastAPI、前端儀表板、Supabase、ML 風險模型與 Gemini / Hugging Face API 建立評論蒐集、風險分類、AI 回覆建議與後台管理流程。"),
  bullet("功能涵蓋營運總覽、危機處理、趨勢分析、AI 一鍵回覆、回覆寫回資料庫與管理後台，接近實務品牌輿情處理情境。"),
  bullet("整合 Docker、GCP VM、Nginx HTTPS 與 GitHub Actions，完成可公開展示的部署流程；重複性質 repo 如 group-project-v2 未列入。"),
  bullet("技術：Python、FastAPI、Supabase、SQL、Machine Learning、Gemini API、Hugging Face、JavaScript、Docker、GCP VM、GitHub Actions。"),

  projectTitle("商品價格查詢系統", "Public Repo: Price_inquiry | https://price-inquiry.onrender.com/"),
  bullet("建立跨平台商品比價系統，整合 PChome、Yahoo 購物、Amazon JP、Shopee、駿河屋等來源。"),
  bullet("使用 Python 爬蟲、Thread Pool 與 Playwright 自動化抓取價格、銷量、圖片與商品資訊，降低手動比價成本。"),
  bullet("前端提供即時搜尋、平台篩選、排序、分頁、日幣匯率換算與統計卡片，將爬蟲資料整理為可操作的 Dashboard。"),

  projectTitle("台灣天氣與風場地圖", "Public Repo: weather_pratice | https://weather-pratice-qhsx.vercel.app/"),
  bullet("整合中央氣象署觀測資料，建立即時氣象地圖與歷史時間軸播放功能。"),
  bullet("前端以 Leaflet.js 與 Canvas 實作 IDW 空間插值、溫度/降雨熱力圖、風場粒子動畫與平滑時間補間。"),
  bullet("後端以 Flask 與 SQLite 快取 API 回應並保存多時段觀測資料，兼顧互動效能與資料可追溯性。"),

  projectTitle("California Housing ML Workflow", "Public Repo: workflow_california"),
  bullet("建立可重用 CRISP-DM 機器學習流程，自動完成 EDA、特徵工程、模型訓練、特徵組合測試、評估與模型輸出。"),
  bullet("比較 Linear Regression、Lasso、Ridge、Random Forest、Gradient Boosting 等模型，產出標準化圖表、CSV 指標報告與 joblib 模型檔。"),
  bullet("呈現從資料理解、模型選擇到產物輸出的完整 ML 專案節奏，適合銜接後續部署與預測服務。"),

  projectTitle("SVM 3D Kernel Trick Demo", "Public Repo: svm-3dDEMO"),
  bullet("以 Streamlit、Plotly、Scikit-learn 與 Manim 製作 SVM Kernel Trick 互動式教學展示。"),
  bullet("支援資料集、Z 軸公式、kernel、C、Gamma、degree、noise 等參數互動調整，並顯示 2D 決策邊界、3D 特徵空間、support vectors 與分類超平面。"),
  bullet("將抽象模型概念轉化為可操作的視覺體驗，可作為教學、面試作品與 ML 概念展示。"),

  sectionTitle("工作方式"),
  detail("問題拆解", "先釐清業務目標、決策場景與使用者，再回推資料需求、指標定義與查詢邏輯。"),
  detail("資料治理", "重視欄位定義、資料來源、清理規則、排程流程與報表維護成本，避免只做一次性分析。"),
  detail("產品化思維", "近期作品強調從模型到介面的完整流程，能把分析結果包裝成可互動、可部署、可展示的資料產品。"),

  sectionTitle("學歷與證照"),
  compact("逢甲大學 都市計畫學系空間資訊組 碩士 | 2013/09 - 2015/08"),
  compact("中國文化大學 土地資源學系 學士 | 2009/09 - 2013/06"),
  compact("Microsoft Certified: Introduction to Python for Data Science"),

  sectionTitle("語言"),
  compact("中文：精通 | 台語：中等 | 英文：中等 | 日文：基礎"),
];

const doc = new Document({
  creator: "Codex",
  title: "靳鈞評 Jimmy Chin - 數據分析與 AI 應用履歷",
  description: "Polished DOCX resume generated from PDF and GitHub project profile.",
  styles: {
    default: {
      document: {
        run: { font, size: 20, color: color.slate },
        paragraph: { spacing: { line: 250, after: 80 } },
      },
    },
  },
  numbering: {
    config: [
      {
        reference: "resume-bullets",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: { indent: { left: 280, hanging: 140 } },
              run: { font, color: color.teal },
            },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          margin: { top: 560, right: 620, bottom: 560, left: 620 },
        },
      },
      children,
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
fs.writeFileSync(outputPath, buffer);
console.log(`Wrote ${outputPath}`);

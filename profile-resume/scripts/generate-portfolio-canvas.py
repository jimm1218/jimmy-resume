from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from datetime import datetime
import math
import re

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "canvas-portfolio"
OUT.mkdir(exist_ok=True)

W, H = 2480, 3508
M = 170

FONT_CJK = "C:/Windows/Fonts/msjh.ttc"
FONT_CJK_BOLD = "C:/Windows/Fonts/msjhbd.ttc"
FONT_LATIN = "D:/DATA/awesome-codex-skills/canvas-design/canvas-fonts/InstrumentSans-Regular.ttf"
FONT_LATIN_BOLD = "D:/DATA/awesome-codex-skills/canvas-design/canvas-fonts/InstrumentSans-Bold.ttf"
FONT_MONO = "D:/DATA/awesome-codex-skills/canvas-design/canvas-fonts/IBMPlexMono-Regular.ttf"

COLORS = {
    "paper": (248, 247, 242),
    "ink": (20, 32, 43),
    "muted": (55, 69, 82),
    "caption": (82, 96, 109),
    "line": (184, 195, 196),
    "grid": (236, 234, 227),
    "teal": (0, 115, 103),
    "blue": (35, 91, 151),
    "amber": (194, 116, 35),
    "pale_teal": (217, 238, 233),
    "pale_blue": (220, 231, 244),
    "pale_amber": (246, 229, 203),
    "white": (255, 255, 255),
}


def font(size, bold=False, latin=False, mono=False):
    path = FONT_MONO if mono else (FONT_LATIN_BOLD if latin and bold else FONT_LATIN if latin else FONT_CJK_BOLD if bold else FONT_CJK)
    return ImageFont.truetype(path, size)


def canvas():
    img = Image.new("RGB", (W, H), COLORS["paper"])
    d = ImageDraw.Draw(img)
    for x in range(M, W - M + 1, 96):
        d.line((x, 0, x, H), fill=COLORS["grid"], width=1)
    for y in range(M, H - M + 1, 96):
        d.line((0, y, W, y), fill=COLORS["grid"], width=1)
    d.rectangle((84, 84, W - 84, H - 84), outline=COLORS["line"], width=2)
    return img, d


def text_size(d, s, f):
    box = d.textbbox((0, 0), s, font=f)
    return box[2] - box[0], box[3] - box[1]


def draw_text(d, xy, s, f, fill=COLORS["ink"], anchor=None):
    d.text(xy, s, font=f, fill=fill, anchor=anchor)


def wrap_by_width(d, text, f, max_width):
    lines, line = [], ""
    tokens = re.findall(r"\n|[A-Za-z0-9_./:+-]+|[\u4e00-\u9fff]|[^\S\r\n]+|[^\u4e00-\u9fffA-Za-z0-9_./:+\-\s]", text)
    for token in tokens:
        if token == "\n":
            lines.append(line.rstrip())
            line = ""
            continue
        test = line + token
        if text_size(d, test, f)[0] <= max_width:
            line = test
        else:
            if line:
                lines.append(line)
            line = token.lstrip()
    if line:
        lines.append(line.rstrip())
    return lines


def paragraph(d, xy, text, f, max_width, fill=COLORS["ink"], line_gap=14):
    x, y = xy
    for line in wrap_by_width(d, text, f, max_width):
        draw_text(d, (x, y), line, f, fill)
        y += f.size + line_gap
    return y


def label(d, x, y, txt, fill=COLORS["muted"]):
    draw_text(d, (x, y), txt.upper(), font(27, latin=True, mono=True), COLORS["caption"])


def rule(d, x, y, w, c=COLORS["teal"], width=5):
    d.line((x, y, x + w, y), fill=c, width=width)


def chip(d, x, y, txt, fill):
    f = font(30, bold=True)
    tw, th = text_size(d, txt, f)
    d.rounded_rectangle((x, y, x + tw + 34, y + 54), radius=9, fill=fill)
    draw_text(d, (x + 17, y + 9), txt, f, COLORS["ink"])
    return x + tw + 48


def card(d, box, title, body, accent=COLORS["teal"], tag=None):
    x1, y1, x2, y2 = box
    d.rounded_rectangle(box, radius=18, fill=COLORS["white"], outline=COLORS["line"], width=2)
    d.rectangle((x1, y1, x1 + 16, y2), fill=accent)
    if tag:
        draw_text(d, (x1 + 42, y1 + 34), tag, font(24, latin=True, mono=True), COLORS["caption"])
    draw_text(d, (x1 + 42, y1 + 72), title, font(46, bold=True), COLORS["ink"])
    paragraph(d, (x1 + 42, y1 + 145), body, font(32), x2 - x1 - 88, COLORS["muted"], 13)


def evidence_card(d, box, title, rows, accent=COLORS["teal"], tag=None):
    x1, y1, x2, y2 = box
    d.rounded_rectangle(box, radius=18, fill=COLORS["white"], outline=COLORS["line"], width=2)
    d.rectangle((x1, y1, x1 + 16, y2), fill=accent)
    if tag:
        draw_text(d, (x1 + 42, y1 + 30), tag, font(23, latin=True, mono=True), COLORS["caption"])
    draw_text(d, (x1 + 42, y1 + 66), title, font(42, bold=True), COLORS["ink"])
    y = y1 + 128
    for label_text, body_text in rows:
        draw_text(d, (x1 + 42, y), label_text, font(29, bold=True), accent)
        y = paragraph(d, (x1 + 158, y - 3), body_text, font(29), x2 - x1 - 205, COLORS["muted"], 9) + 11


def bullet_list(d, x, y, items, max_width, accent=COLORS["teal"], size=28, gap=9):
    f = font(size)
    for item in items:
        d.ellipse((x, y + 15, x + 12, y + 27), fill=accent)
        y = paragraph(d, (x + 32, y), item, f, max_width - 32, COLORS["muted"], gap) + 9
    return y


def project_brief_card(d, box, title, meta, bullets, accent=COLORS["teal"], compact=False):
    x1, y1, x2, y2 = box
    d.rounded_rectangle(box, radius=18, fill=COLORS["white"], outline=COLORS["line"], width=2)
    d.rectangle((x1, y1, x1 + 16, y2), fill=accent)
    draw_text(d, (x1 + 42, y1 + 30), meta, font(22, latin=True, mono=True), COLORS["caption"])
    draw_text(d, (x1 + 42, y1 + 64), title, font(38 if compact else 42, bold=True), COLORS["ink"])
    bullet_list(d, x1 + 42, y1 + 124, bullets, x2 - x1 - 100, accent, 26 if compact else 28, 7)


def footer(d, page, title="JIMMY CHIN PORTFOLIO"):
    rule(d, M, H - 152, W - M * 2, COLORS["line"], 2)
    draw_text(d, (M, H - 120), title, font(24, latin=True, mono=True), COLORS["muted"])
    draw_text(d, (W - M, H - 120), f"{page:02d}", font(28, latin=True, mono=True), COLORS["ink"], "ra")


def page_one():
    img, d = canvas()
    label(d, M, 180, "Profile / Data Analyst / AI Application")
    draw_text(d, (M, 300), "靳鈞評", font(112, bold=True), COLORS["ink"])
    draw_text(d, (M, 435), "Jimmy Chin", font(88, bold=True, latin=True), COLORS["teal"])
    rule(d, M, 560, 840, COLORS["teal"], 9)
    paragraph(
        d,
        (M, 650),
        "8 年以上數據分析、市場研究、CRM / CDP、SQL 資料處理與 Power BI 儀表板經驗。近期透過職訓局 AI 課程，將商業分析能力延伸到 Python、FastAPI、Supabase、Machine Learning、LLM API、Docker 與雲端部署。",
        font(43),
        940,
        COLORS["ink"],
        18,
    )
    x = M
    for txt, fill in [
        ("SQL / BI", COLORS["pale_teal"]),
        ("CRM / CDP", COLORS["pale_blue"]),
        ("AI Apps", COLORS["pale_amber"]),
        ("Data Products", COLORS["pale_teal"]),
    ]:
        x = chip(d, x, 1055, txt, fill)

    cx, cy = 1760, 825
    for i in range(80):
        a = i * math.pi * 0.23
        r = 38 + i * 8.2
        x = cx + math.cos(a) * r
        y = cy + math.sin(a) * r * 0.62
        c = COLORS["teal"] if i % 3 else COLORS["blue"]
        d.ellipse((x - 7, y - 7, x + 7, y + 7), fill=c)
        if i > 0:
            px = cx + math.cos((i - 1) * math.pi * 0.23) * (38 + (i - 1) * 8.2)
            py = cy + math.sin((i - 1) * math.pi * 0.23) * (38 + (i - 1) * 8.2) * 0.62
            d.line((px, py, x, y), fill=(160, 186, 187), width=2)
    d.ellipse((1505, 520, 2055, 1130), outline=COLORS["amber"], width=5)
    d.rectangle((1510, 1240, 2165, 1465), fill=COLORS["white"], outline=COLORS["line"], width=2)
    paragraph(d, (1550, 1280), "資料不是只被整理成報表，而是被推進為可互動、可部署、可持續維運的決策工具。", font(31), 570, COLORS["ink"], 12)

    card(d, (M, 1680, 1090, 2145), "專業定位", "資料分析師 / BI 分析師 / AI 應用資料分析。偏好能結合 SQL、BI、資料產品、AI 應用與商業決策的職務。", COLORS["teal"], "POSITION")
    card(d, (1190, 1680, W - M, 2145), "聯絡資訊", "台中市西屯區\njimm1218@gmail.com\n0919-201-375\ngithub.com/jimm1218", COLORS["blue"], "CONTACT")
    evidence_card(
        d,
        (M, 2305, W - M, 2885),
        "履歷亮點",
        [
            ("產業", "橫跨餐飲、零售、電商、運動品牌、遊戲與市場研究，能快速理解會員、商品、通路、活動與風險資料。"),
            ("成果", "FILA 會員健康度與 CRM 儀表板將週期性報表流程自動化，人工彙整時間降低 80% 以上。"),
            ("導入", "參與 FILA / 王品 CDP 與會員資料流程，熟悉需求訪談、資料表對接、SQL 邏輯封裝與 Power BI 教學。"),
            ("AI", "職訓 AI 作品包含 Repuguard AI、Price Inquiry、Taiwan Windy、ML Workflow、SVM 3D Demo，涵蓋模型、API、資料庫、前端與部署。"),
            ("定位", "能把資料從查詢與報表推進到可互動、可展示、可維運的資料產品，兼具商業分析與工程落地能力。"),
        ],
        COLORS["amber"],
        "SIGNAL",
    )
    footer(d, 1)
    return img


def page_two():
    img, d = canvas()
    label(d, M, 180, "Career Archive")
    draw_text(d, (M, 270), "資歷索引", font(84, bold=True), COLORS["ink"])
    rule(d, M, 390, 560, COLORS["blue"], 8)
    jobs = [
        ("2024-2026", "FILA 斐樂", "資料分析師", "會員交易與行為資料、CDP to BigQuery、Power BI 會員健康度儀表板、RFM / 回購率 / 留存率，人工彙整時間降低 80% 以上。"),
        ("2023-2024", "向上國際科技", "專案管理師", "Stored Procedures、排程腳本、異常交易掃描、自動化資料抓取與郵件發送 pipeline，支援風險稽核 SOP。"),
        ("2020-2023", "王品餐飲", "數位組主任", "CDP 導入、Presto SQL / T-SQL、CTE、Window Functions、會員標籤模組、Power BI 教育訓練。"),
        ("2018-2020", "東森得易購", "經營分析專員", "Excel VBA 自動化週報/月報，分析電視、外廣、網路與自營商品等通路績效與行銷效益。"),
        ("2016-2018", "循證民調", "資深研究員", "30 件以上市場調查與民意分析專案，涵蓋問卷、抽樣、統計分析、報告與提案。"),
        ("2013-2016", "學研單位", "研究助理", "GIS、災害風險、資料庫建置、圖資繪製；碩士論文以 CA-Markov 預測坡地崩塌警戒區。"),
    ]
    y = 540
    for idx, (period, org, title, desc) in enumerate(jobs):
        x = M + (idx % 2) * 1090
        if idx == 3:
            y = 1780
        top = y + (idx % 3) * 365
        accent = [COLORS["teal"], COLORS["blue"], COLORS["amber"]][idx % 3]
        d.ellipse((x, top + 18, x + 36, top + 54), fill=accent)
        d.line((x + 18, top + 62, x + 18, top + 330), fill=COLORS["line"], width=3)
        draw_text(d, (x + 70, top), period, font(31, latin=True, mono=True), accent)
        draw_text(d, (x + 70, top + 50), org, font(42, bold=True), COLORS["ink"])
        draw_text(d, (x + 70, top + 105), title, font(31, bold=True), COLORS["teal"])
        paragraph(d, (x + 70, top + 158), desc, font(28), 880, COLORS["muted"], 10)
    footer(d, 2)
    return img


def page_three():
    img, d = canvas()
    label(d, M, 180, "AI Course / GitHub Works")
    draw_text(d, (M, 270), "作品集地圖", font(84, bold=True), COLORS["ink"])
    rule(d, M, 390, 620, COLORS["amber"], 8)
    projects = [
        ("Repuguard AI", "PROJECT 01 / Private: group-project", [
            "問題：品牌評論量大，需快速辨識負評、危機留言與可回覆項目。",
            "做法：建立 FastAPI + Supabase 後端，串接 ML 風險分類與 Gemini / Hugging Face 回覆生成。",
            "功能：營運總覽、危機處理、趨勢分析、AI 一鍵回覆、審核後寫回資料庫。",
            "部署：Docker、GCP VM、Nginx HTTPS、GitHub Actions；Demo: repuguard.ai-future2026.com。",
        ], COLORS["teal"]),
        ("Price Inquiry", "PROJECT 02 / Public + Render Demo", [
            "問題：跨平台商品價格分散，人工比價耗時且難保留比較脈絡。",
            "做法：用 Python、Thread Pool、Playwright / BeautifulSoup 擷取價格、銷量、圖片與商品資訊。",
            "功能：即時搜尋、平台篩選、排序、分頁、日幣匯率換算、統計卡片與結果列表。",
            "價值：把外部資料收集流程整理成可操作的商務查價 Dashboard。",
        ], COLORS["blue"]),
        ("Taiwan Windy", "PROJECT 03 / Public + Vercel Demo", [
            "問題：氣象站資料需要更直覺的空間化呈現，單點數值不易理解區域趨勢。",
            "做法：Flask + SQLite 快取觀測資料，前端以 Leaflet、Canvas、IDW 建立互動式地圖。",
            "功能：溫度/降雨熱力圖、風場粒子動畫、歷史時間軸播放、平滑時間補間。",
            "能力：展示 API 資料處理、空間插值、互動視覺化與前後端整合。",
        ], COLORS["amber"]),
        ("ML Workflow", "PROJECT 04 / Public: workflow_california", [
            "問題：機器學習練習常缺乏一致流程，難以比較模型與重現結果。",
            "做法：依 CRISP-DM 建立 EDA、特徵工程、訓練、評估、輸出的標準流程。",
            "模型：Linear Regression、Lasso、Ridge、Random Forest、Gradient Boosting。",
            "產物：標準化圖表、CSV 指標報告、joblib 模型檔，方便後續部署或預測服務銜接。",
        ], COLORS["teal"]),
        ("SVM 3D Demo", "PROJECT 05 / Public + Streamlit Demo", [
            "問題：SVM Kernel Trick 抽象，學習者難以理解高維轉換與決策邊界。",
            "做法：以 Streamlit、Plotly、Scikit-learn、Manim 建立互動教學介面。",
            "功能：調整 kernel、C、Gamma、degree、noise，觀察 2D 邊界、3D 特徵空間與 support vectors。",
            "價值：把模型概念轉成可操作展示，可用於教學、面試與 ML 概念說明。",
        ], COLORS["blue"]),
    ]
    boxes = [
        (M, 560, 1130, 1130),
        (1260, 560, W - M, 1130),
        (M, 1280, W - M, 1830),
        (M, 1980, 1130, 2550),
        (1260, 1980, W - M, 2550),
    ]
    for i, (project, box) in enumerate(zip(projects, boxes), 1):
        name, meta, bullets, accent = project
        project_brief_card(d, box, name, meta, bullets, accent, compact=(i != 3))
        x1, y1, x2, y2 = box
        for n in range(11):
            px = x2 - 245 + (n % 4) * 48
            py = y2 - 150 + (n // 4) * 42
            d.rectangle((px, py, px + 24, py + 24), fill=accent if n % 2 else COLORS["line"])
    paragraph(
        d,
        (M, 2775),
        "註：依你的要求，重複性質作品不重複列出，例如 group-project-v2 不納入主作品清單；私人 repo 以 Private 標記呈現，可在面試或作品集導覽時補充展示。",
        font(29),
        W - M * 2,
        COLORS["muted"],
        12,
    )
    footer(d, 3)
    return img


def page_four():
    img, d = canvas()
    label(d, M, 180, "Selected Case Studies")
    draw_text(d, (M, 270), "代表案例拆解", font(84, bold=True), COLORS["ink"])
    rule(d, M, 390, 700, COLORS["teal"], 8)
    evidence_card(
        d,
        (M, 540, W - M, 1045),
        "FILA 會員健康度與 CRM BI",
        [
            ("情境", "會員經營需同時追蹤分群、回購、留存、活動成效與商品偏好，原流程仰賴人工整理。"),
            ("做法", "整合 SQL Server、CDP、BigQuery，透過 Power Query M 清理資料，以 DAX 定義 RFM、回購率、會員健康度等 KPI。"),
            ("成果", "建立互動式 Power BI 儀表板，讓週期性管理報表可自動更新，人工彙整時間降低 80% 以上。"),
        ],
        COLORS["teal"],
        "BUSINESS BI",
    )
    evidence_card(
        d,
        (M, 1175, W - M, 1680),
        "Repuguard AI 輿情與回覆平台",
        [
            ("情境", "品牌評論處理需要快速分流高風險留言，並產生可審核、可回寫的回覆建議。"),
            ("做法", "建立 FastAPI 後端與 Dashboard，串接 Supabase、ML 風險模型、Gemini / Hugging Face API，並設計 AI 回覆流程。"),
            ("成果", "完成可公開展示的全端 AI 應用，含 PWA、Docker、GCP VM、Nginx HTTPS 與 GitHub Actions 部署。"),
        ],
        COLORS["blue"],
        "AI PRODUCT",
    )
    evidence_card(
        d,
        (M, 1810, W - M, 2315),
        "王品 CDP 導入與會員標籤模組",
        [
            ("情境", "多品牌會員資料分散，行銷單位需要可重複使用的分群條件與會員生命週期分析。"),
            ("做法", "使用 Presto SQL、T-SQL、CTE、Window Functions 建立會員標籤與 pipeline 查詢邏輯，協助 CDP 上線。"),
            ("成果", "把複雜分群規則封裝為標準查詢，並透過 Power BI 教學推動行銷與營運單位使用資料決策。"),
        ],
        COLORS["amber"],
        "CDP / CRM",
    )
    evidence_card(
        d,
        (M, 2445, W - M, 2950),
        "Weather / Price / ML 教學作品線",
        [
            ("定位", "用不同題型展示資料產品能力：外部資料擷取、空間視覺化、機器學習流程與模型概念教學。"),
            ("能力", "涵蓋爬蟲、API、快取資料庫、互動地圖、Dashboard、模型訓練、模型比較與可部署 Demo。"),
            ("價值", "能證明不只會分析資料，也能把資料流程包成他人可以操作、檢視與理解的應用。"),
        ],
        COLORS["teal"],
        "PORTFOLIO LINE",
    )
    footer(d, 4)
    return img


def page_five():
    img, d = canvas()
    label(d, M, 180, "Capability Matrix / Direction")
    draw_text(d, (M, 270), "能力矩陣", font(84, bold=True), COLORS["ink"])
    rule(d, M, 390, 560, COLORS["teal"], 8)
    matrix = [
        ("資料分析", 92, COLORS["teal"], "CRM、RFM、回購率、留存、通路績效、行銷活動分析"),
        ("BI 建置", 88, COLORS["blue"], "Power BI、DAX、Power Query、管理儀表板、報表自動化"),
        ("SQL / ETL", 86, COLORS["amber"], "SQL Server、BigQuery、Presto SQL、T-SQL、CTE、Window Functions"),
        ("AI 應用", 78, COLORS["teal"], "Python、Scikit-learn、LLM API、風險分類、AI 回覆輔助"),
        ("Web 部署", 74, COLORS["blue"], "FastAPI、Flask、Supabase、Docker、GCP VM、Vercel、Render"),
        ("研究溝通", 90, COLORS["amber"], "問卷、抽樣、報告、簡報、SOP、跨部門需求轉譯"),
    ]
    y = 560
    for name, score, accent, desc in matrix:
        draw_text(d, (M, y), name, font(38, bold=True), COLORS["ink"])
        draw_text(d, (M, y + 58), desc, font(27), COLORS["muted"])
        d.rounded_rectangle((870, y + 10, W - M, y + 58), radius=8, fill=(224, 226, 222))
        d.rounded_rectangle((870, y + 10, 870 + int((W - M - 870) * score / 100), y + 58), radius=8, fill=accent)
        draw_text(d, (W - M, y + 84), f"{score}/100", font(25, latin=True, mono=True), accent, "ra")
        y += 250

    card(d, (M, 2180, 1110, 2735), "求職方向", "資料分析師、BI 分析師、數據分析師、資料庫管理人員、資料科學家、AI 應用資料分析。希望在能結合 SQL、BI、資料產品、AI 應用與商業決策的團隊中發揮。", COLORS["teal"], "NEXT ROLE")
    card(d, (1235, 2180, W - M, 2735), "學歷與證照", "逢甲大學 都市計畫學系空間資訊組 碩士\n中國文化大學 土地資源學系 學士\nMicrosoft Certified: Introduction to Python for Data Science\n中文精通 / 英文中等 / 日文基礎 / 台語中等", COLORS["blue"], "CREDENTIALS")
    footer(d, 5)
    return img


def page_six():
    img, d = canvas()
    label(d, M, 180, "Evidence Checklist")
    draw_text(d, (M, 270), "技能證據清單", font(84, bold=True), COLORS["ink"])
    rule(d, M, 390, 680, COLORS["blue"], 8)
    evidence_card(
        d,
        (M, 540, 1160, 1285),
        "SQL / 資料處理",
        [
            ("查詢", "SQL Server、Presto SQL、T-SQL、BigQuery；熟悉 CTE、Window Functions、Stored Procedures。"),
            ("清理", "Power Query M、Excel、Access；處理異質資料合併、欄位轉置、例行報表資料準備。"),
            ("場景", "會員交易、CDP 行為、遊戲交易、商品價格、氣象觀測、市場研究資料。"),
            ("成果", "把人工彙整轉成可重複查詢、可排程、可視覺化的資料流程。"),
        ],
        COLORS["teal"],
        "DATA CORE",
    )
    evidence_card(
        d,
        (1320, 540, W - M, 1285),
        "BI / 商業洞察",
        [
            ("指標", "RFM、回購率、留存率、流失預警、會員健康度、活動成效、通路績效。"),
            ("工具", "Power BI、DAX、Power Query、Google Data Studio、Chart.js、Plotly、Streamlit。"),
            ("輸出", "管理儀表板、CRM 報表、營運 KPI、行銷成效分析與教育訓練。"),
            ("價值", "把資料轉成業務、行銷、營運能理解且能追蹤的決策語言。"),
        ],
        COLORS["blue"],
        "BI STORY",
    )
    evidence_card(
        d,
        (M, 1465, 1160, 2210),
        "AI / 機器學習",
        [
            ("模型", "Scikit-learn、分類模型、回歸模型、特徵工程、模型比較與評估。"),
            ("LLM", "Gemini API、Hugging Face API，用於品牌回覆建議與文字生成輔助。"),
            ("作品", "Repuguard AI、California Housing Workflow、SVM Kernel Trick Demo。"),
            ("重點", "不只訓練模型，也能把模型放進 API、儀表板與部署流程。"),
        ],
        COLORS["amber"],
        "AI PRACTICE",
    )
    evidence_card(
        d,
        (1320, 1465, W - M, 2210),
        "Web / 部署",
        [
            ("後端", "FastAPI、Flask、Supabase、SQLite，支援資料 API、快取與寫回流程。"),
            ("前端", "JavaScript、HTML/CSS、Dashboard、互動地圖、Canvas、PWA。"),
            ("部署", "Docker、GCP VM、Nginx HTTPS、GitHub Actions、Vercel、Render。"),
            ("價值", "能把分析成果從 notebook / 報表推進到可公開展示的產品雛形。"),
        ],
        COLORS["teal"],
        "DEPLOYMENT",
    )
    card(
        d,
        (M, 2390, W - M, 2940),
        "面試可延伸敘事",
        "我可以從三條線介紹自己：第一，企業資料分析與 BI 導入，代表案例是 FILA 會員健康度與王品 CDP；第二，AI 課程與自主作品，代表案例是 Repuguard AI；第三，資料產品化能力，代表案例是 Price Inquiry、Taiwan Windy、ML Workflow 與 SVM 3D Demo。",
        COLORS["amber"],
        "INTERVIEW NARRATIVE",
    )
    footer(d, 6)
    return img


pages = [page_one(), page_two(), page_three(), page_four(), page_five(), page_six()]
png_paths = []
for i, page in enumerate(pages, 1):
    path = OUT / f"jimmy-portfolio-canvas-{i:02d}.png"
    page.save(path, quality=95)
    png_paths.append(path)

pdf_path = OUT / "jimmy-chin-portfolio-canvas.pdf"
try:
    pages[0].save(pdf_path, save_all=True, append_images=pages[1:], resolution=300.0)
except PermissionError:
    pdf_path = OUT / "jimmy-chin-portfolio-canvas-readable.pdf"
    try:
        pages[0].save(pdf_path, save_all=True, append_images=pages[1:], resolution=300.0)
    except PermissionError:
        stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
        pdf_path = OUT / f"jimmy-chin-portfolio-canvas-readable-{stamp}.pdf"
        pages[0].save(pdf_path, save_all=True, append_images=pages[1:], resolution=300.0)
print(f"Wrote {pdf_path}")
for path in png_paths:
    print(f"Wrote {path}")

# 靳鈞評 (Jimmy Chin) - 個人履歷與數據專案作品集

[![Website](https://img.shields.io/badge/website-live-brightgreen.svg)](https://jimm1218.github.io/jimmy-resume/)
[![Stack](https://img.shields.io/badge/tech-Vanilla--JS%20%7C%20HTML5%20%7C%20CSS3-blue.svg)](https://github.com/jimm1218/jimmy-resume)
[![ChartJS](https://img.shields.io/badge/library-Chart.js%20v4-orange.svg)](https://www.chartjs.org/)

這是一個專為數據分析師 **靳鈞評 Jimmy** 所量身打造的高質感、響應式個人網頁作品集。
全站採用前沿的**深色科技數據微光風格 (Deep Tech Mode)**，透過流體粒子背景、3D 懸停特效以及響應式數據圖表，將數據思維與工程美學完美融合。

🌐 **線上預覽：[https://jimm1218.github.io/jimmy-resume/](https://jimm1218.github.io/jimmy-resume/)**

---

## ✨ 核心設計理念與視覺亮點

### 1. 🌌 數據微光與毛玻璃視覺 (Glassmorphism & Glow)
*   **深邃太空基調**：以極緻暗色 `#0a0b10` 作為背景，搭配極光紫與霓虹青的雙色背光暈染（Radial Gradients），營造數據星空感。
*   **毛玻璃卡片**：全站卡片使用 `backdrop-filter: blur(12px)` 搭配 `rgba(255, 255, 255, 0.03)` 半透明背景，細緻的 `0.5px` 霓虹漸層邊框讓結構輕盈優雅。

### 2. 🌀 動態 Canvas 數據節點背景 (Physics Particles)
*   利用 HTML5 Canvas 渲染動態關係型數據節點。
*   支援**滑鼠重力交互**，粒子會在滑鼠周圍產生向心吸引力，並與滑鼠建立動態發光連線（象徵關係型資料庫的節點關聯與鏈結）。
*   設置最高速限控制，防止粒子因引力過大而發散，確保動態流暢且不干擾主體閱讀。

### 3. 📊 互動式專案彈窗圖表 (Chart.js Lifecycle)
在專案詳情彈窗內，利用 Chart.js 繪製與專案主題契合的互動圖表：
*   **會員分析專案**：會員活躍分群環形圖 (Doughnut Chart)
*   **資料 Pipeline 專案**：每日資料吞吐量直條圖 (Bar Chart)
*   **遊戲數據專案**：日活躍用戶 (DAU) 趨勢漸層面積圖 (Line Chart)
*   **行銷漏斗專案**：行銷旅程轉化率漏斗圖 (Horizontal Bar Chart)
*   **生命週期管理**：實作彈窗動態銷毀與延遲重繪（`setTimeout` 延遲 150ms 避開 CSS transition 造成的畫布解析度壓縮），確保每次開啟皆能流暢渲染。

### 4. 🏢 官方品牌標誌相容 (SVG filters)
*   **FILA 經歷**：採用 Simple Icons 的 SVG 向量標誌，並以 CSS `filter: invert(1)` 將黑色標誌轉化為亮白，完美融合深色模式。
*   **王品集團 (Wowprime)**：提取官方網站最新向量圖標 `wowprime.svg`，保持標誌高解析度。
*   **向上集團 (XSGroup)**：整合集團官方高解析標誌，展示出具專業質感的品牌時間軸。

### 5. 🐙 GitHub 開源專案同步
*   整合 GitHub Repository 精選看板，同步展示 Python 機器學習、資料工程工作流等專案，並搭配對應的程式語言色彩標記與直連按鈕。

---

## 🛠️ 開發技術棧

*   **Markup & Layout**: HTML5 (Semantic Elements), CSS Grid & Flexbox, Custom Variables
*   **Interactive Scripts**: Vanilla JavaScript (ES6+), Canvas API, IntersectionObserver API
*   **Data Visualization**: Chart.js v4.x (via CDN)
*   **Typography & Icons**: Google Fonts (Space Grotesk & Inter), FontAwesome v6.4.0

---

## 📂 專案結構說明

```text
jimmy-resume-main/
 ├── index.html         # 個人首頁 (Hero 區與導覽)
 ├── experience.html    # 專業經歷 (時間軸與品牌標誌)
 ├── portfolio.html     # 作品集 (專案彈窗、Chart.js 圖表與 GitHub 卡片)
 ├── contact.html       # 聯絡我 (聯絡表單與發光按鈕)
 ├── README.md          # 專案說明文件 (本檔案)
 ├── prompt.md          # AI 協作提示詞紀錄 (Prompt History)
 ├── css/
 │    └── style.css     # 全站科技風格樣式表 (Glow, Particles, Glassmorphism)
 ├── js/
 │    └── script.js     # 互動邏輯 (粒子物理、3D Tilt、Chart.js 彈窗載入)
 └── images/
      ├── fila.svg      # FILA 官方向量標誌
      ├── upway.png     # 向上集團官方標誌
      └── wowprime.svg  # 王品集團官方向量標誌
```

---

## 🚀 部署與本地運行

### 1. 本地預覽
由於瀏覽器安全機制（CORS），涉及 Canvas 動態腳本與本地檔案讀取時，建議透過網頁伺服器開啟：
```bash
# 使用 Python 內建 HTTP 伺服器
python -m http.server 8000 --directory d:/data/jimmy-resume-main
```
開啟瀏覽器造訪：`http://localhost:8000`

### 2. GitHub Pages 部署指引
專案已完全託管至 GitHub 儲存庫 `https://github.com/jimm1218/jimmy-resume`。若要啟用線上履歷，請遵循以下步驟：
1. 造訪您的 GitHub Repository 頁面。
2. 點擊右上角 **Settings** ⚙️。
3. 在左側選單中找到並點擊 **Pages**。
4. 在 **Build and deployment** 下方的 **Source** 選擇 **Deploy from a branch**。
5. 在 **Branch** 選擇 **`main`** 分支，並將目錄設為 **`/ (root)`**。
6. 點擊 **Save**。
7. 等待 1~2 分鐘後，畫面上方將顯示您的專屬履歷網址：`https://jimm1218.github.io/jimmy-resume/`

# 靳鈞評 (Jimmy Chin) - 個人履歷與數據專案作品集

**履歷連結：https://jimm1218.github.io/jimmy-resume/**

這是一個專為展示**數據分析、BI 開發與資料工程**經歷所設計的個人網頁作品集。
全站採用高質感的**深色科技與數據微光風格 (Deep Tech Mode)**，具備流暢的動態特效、互動式數據圖表，以及與 GitHub 連動的開源專案看板。

---

## 🚀 網站功能與特色

*   **全網頁毛玻璃質感 (Glassmorphism)**：內容卡片與導覽列全面套用毛玻璃效果（`backdrop-filter: blur(12px)`），增設細微的半透明霓虹邊框，展現現代設計高級感。
*   **動態 Canvas 數據粒子背景**：利用 HTML5 Canvas 繪製動態流體粒子，支援滑鼠移動物理引力交互與發光連線（象徵關係型數據節點）。
*   **官方品牌 Logo 整合**：藉由向量解析直接整合 FILA（Simple Icons 向量反轉）、王品集團（Wowprime 官方 SVG 標識）及向上集團（XSGroup 官方 Icon）的品牌標識，相容深色背景。
*   **3D 空間卡片懸停 (3D Tilt Effect)**：作品集專案卡片支援滑鼠移動的 3D 傾斜轉動與霓虹漸層發光。
*   **滾動顯現動畫 (Scroll Reveal)**：採用 `IntersectionObserver` 監聽滾動，時間軸與專案卡片隨頁面推進優雅滑入。
*   **互動數據圖表 (Chart.js)**：在專案彈窗 (Modal) 內整合 Chart.js 互動圖表（環形圖、直條圖、漸層面積曲線、水平漏斗圖），並實現彈窗開啟時的動態渲染與自適應 (RWD)。
*   **GitHub 開源專案看板**：同步展示 Python 機器學習、特徵工程工作流、AI 圖像生成及前端 GIS 地圖等精選開源項目。

---

## 📁 專案檔案結構

```text
d:\data\jimmy-resume-main\
 ├── index.html        # 個人首頁 (基本介紹與粒子 Hero 區)
 ├── experience.html   # 專業經歷 (時間軸排版與官方 Logo)
 ├── portfolio.html    # 專案作品集 (3D 卡片、Chart.js 圖表與 GitHub 看板)
 ├── contact.html      # 聯絡我 (聯絡資訊與發光表單)
 ├── README.md         # 專案說明文件
 ├── prompt.md         # AI 協作提示詞紀錄 (Prompt History)
 ├── css/
 │    └── style.css    # 全站樣式表 (Deep Tech Theme & Animations)
 ├── js/
 │    └── script.js    # 互動腳本 (Canvas 粒子、3D Tilt、Scroll Reveal、Chart.js 控制)
 └── images/
      ├── fila.svg     # FILA 官方向量圖標
      ├── upway.png    # 向上集團官方 Favicon 圖標
      └── wowprime.svg # 王品集團官方向量圖標
```

---

## 🛠️ 使用技術

*   **HTML5 & CSS3**：語意化結構、CSS Variables、Flexbox/Grid 佈局、`backdrop-filter` 玻璃擬態、3D 變換。
*   **JavaScript (Vanilla JS)**：粒子系統物理模擬、滾動觸發監聽、3D 空間座標換算。
*   **Chart.js (v4.x)**：互動式數據可視化圖表渲染。
*   **FontAwesome (v6.4.0)**：前沿科技與社群向量圖標庫。

---

## 💻 本地端運行

這是一個靜態前端網頁專案，建議使用網頁伺服器開啟以利 Canvas 背景與腳本的正常載入：

1.  **啟動本地伺服器** (以 Python 為例)：
    ```bash
    python -m http.server 8000 --directory d:/data/jimmy-resume-main
    ```
2.  在瀏覽器中造訪 `http://localhost:8000` 即可預覽完整網站。

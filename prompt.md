# AI 協作提示詞紀錄 (Prompt History)

此文件記錄了建置本個人履歷作品集時，與 AI (Gemini) 協作所使用的主要提示詞，方便未來回顧或進行二次開發。

---

## 階段一：建立多頁面架構與基礎功能
**User Prompt:**
> 「可以幫我生成一個個人履歷作品集的網頁嗎，我想要有其他分業的架構，如個人頁面、過往經歷、作品集等」

**AI 執行動作:**
- 確認了 `index.html`, `experience.html`, `portfolio.html` 架構。
- 補齊了 `css/style.css` 與 `js/script.js`，並實作了彈窗 (Modal) 功能。

---

## 階段二：擴充「聯絡我」頁面
**User Prompt:**
> 「可以幫我生成一個個人履歷作品集的網頁嗎，我想要有其他分業的架構，如個人頁面、過往經歷、作品集等 (延伸要求加入聯絡我)」

**AI 執行動作:**
- 新增了 `contact.html` 頁面與表單設計。
- 更新了所有 HTML 頁面的 Navbar，加入「聯絡我」的導覽連結。
- 於 CSS 中新增了聯絡表單的排版樣式。

---

## 階段三：視覺風格優化 (白底明亮風)
**User Prompt:**
> 「但介面怎麼都白的，你能產出一個專業、簡約清楚的風個的介面嗎」

**AI 執行動作:**
- 指導使用者確認資料夾結構 (確保 CSS 能正確載入)。
- 將整體的 CSS 主題改寫為專業的「高質感明亮簡約風 (Light Theme)」，使用白底、淺灰與藍色系搭配。

---

## 階段四：視覺特效與深色科技風優化 (Deep Tech Mode)
**User Prompt:**
> 「可以針對jimmy-resume-main內的資料夾檔案幫我憂話我的履歷風格嗎，我希望把版面改成有動畫特效，且風格更具專業質感科技的風格」

**AI 執行動作:**
- **重構 CSS & JS**：將主視覺重構為深藍黑底加上霓虹青與極光紫光暈。
- **實作毛玻璃 (Glassmorphism)**：為卡片和導覽列加入半透明模糊及微光邊框效果。
- **互動 Canvas 背景**：採用 HTML5 Canvas 實作動態粒子物理引力連線背景。
- **懸停 3D Tilt 效果**：為專案卡片加入滑鼠座標 3D 空間傾斜與邊框發光動畫。
- **滾動淡入 (Scroll Reveal)**：使用 `IntersectionObserver` 實作元件向下滾動淡入滑入的動態特效。

---

## 階段五：導入品牌官方網頁 Logo
**User Prompt:**
> 「可以針對我的經歷待過的品牌給他們附上品牌的LOGO嗎」 -> 「我希望LOGO是能用他們品牌網路上代表的LOGO」

**AI 執行動作:**
- **FILA**：透過 GitHub Simple Icons 獲取官方向量 SVG，並在 CSS 對其套用 filter 反轉發光，完美適配暗色模式。
- **王品集團**：經由網頁結構分析，直接從王品官方伺服器（`wowprime.com`）下載其官方向量 SVG 檔案。
- **向上集團**：從該集團官方網站（`xsgroup.com`）中下載其代表性的 Favicon/Logo 做為公司小標誌。
- 將以上 Logo 整合至經歷時間軸與作品集卡片。

---

## 階段六：專案彈窗數據圖表可視化
**User Prompt:**
> 「可以給我的作品加入一些圖表嗎」

**AI 執行動作:**
- **引入 Chart.js**：在 `portfolio.html` 載入 Chart.js 庫。
- **插入圖表 Canvas**：在 4 大專案的詳細資訊彈窗中各增設一個 Canvas 畫布。
- **解決 Modal 隱藏渲染 bug**：在 JS 中監聽 Modal 的開啟事件 (openModal)，當打開彈窗時才動態初始化與渲染圖表，包括：
  - 會員分群環形圖 (Doughnut Chart)
  - 資料 Pipeline 處理量長條圖 (Bar Chart)
  - 遊戲 DAU 趨勢面積曲線圖 (Line Chart)
  - 行銷旅程漏斗轉換圖 (Horizontal Bar Chart)

---

## 階段七：GitHub 開源專案看板整合
**User Prompt:**
> 「可以幫我把我GITHUB的作品也加入道作品集當中嗎」

**AI 執行動作:**
- **讀取 GitHub 儲存庫**：分析使用者的 GitHub repository 清單（包含 11 個專案）。
- **建立卡片格線**：篩選出最優質的 7 個專案（包含機器學習、資料工程、GIS地圖），在 `portfolio.html` 底部新增 `GitHub 開源專案` 區塊，設計帶有程式語言小圓點（Python/HTML）與直連 GitHub 網址的科技卡片。

---

## 階段八：Git 獨立儲存庫建置與託管
**User Prompt:**
> 「jimmy-resume-main可以幫我把這個資料推到 GITHUB 內嗎，這個GITHUB https://github.com/jimm1218/jimmy-resume」

**AI 執行動作:**
- **初始化獨立 Git**：在 `jimmy-resume-main` 底下初始化 Git 庫，命名 main 分支。
- **解決本地 config 缺失**：設置 local 的 `user.email` 與 `user.name` 以利 commit。
- **同步與推送**：綁定 origin url 並利用 `force push` 整合歷史衝突，順利將優化後的全站資料推播上雲端。

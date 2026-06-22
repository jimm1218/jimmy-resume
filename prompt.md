# AI 協作提示詞紀錄 (Prompt History)

此文件詳細記錄了在建置與重構本履歷網站時，與 AI 協作的完整歷程、提示詞 (Prompts) 以及核心技術的解決方案，便於日後維護與持續擴充。

---

## 📅 協作發展歷程

| 階段 | 協作主題 | 核心需求 | AI 執行與技術方案 |
| :--- | :--- | :--- | :--- |
| **01** | 多頁面骨架搭建 | 規劃首頁、經歷、作品集基礎頁面 | 建立 `index.html`, `experience.html`, `portfolio.html` 以及彈窗基本控制。 |
| **02** | 擴充聯絡人模組 | 增加聯絡人頁面並統一導覽列 | 實作 `contact.html`，同步更新所有頁面的導覽選單與頁尾。 |
| **03** | 視覺優化 (明亮) | 改進起初偏單調的白底介面 | 調整 CSS 主題為「專業簡約明亮風格 (Light Theme)」，使用白底與靛藍搭配。 |
| **04** | 科技深色風格重構 | 升級為動畫特效與專業質感科技風 | 重寫 CSS 採用 `#0a0b10` 深色調、毛玻璃 (Glassmorphism)、動態粒子 Canvas、3D 卡片傾斜與滾動顯現動畫。 |
| **05** | 品牌 Logo 導入 | 經歷欄位加上代表性官方標誌 | 整合 FILA SVG (反轉色濾鏡)、王品集團官方向量 SVG 及向上集團官方圖標。 |
| **06** | 作品集圖表可視化 | 在作品詳細彈窗中展示數據圖表 | 引入 Chart.js，並解決彈窗「display: none」狀態下 Canvas 初始化出錯與解析度不符的問題。 |
| **07** | GitHub 開源同步 | 將 GitHub Repository 帶入作品集 | 分析並抓取使用者 GitHub 的開源專案，轉換為響應式代碼卡片，標記程式語言標籤。 |
| **08** | Git 遠端倉庫推送 | 建立新 Git 倉庫並推送到 GitHub | 初始化 Git、配置 local 使用者資訊、關聯遠端 URL 並強制推送覆蓋至 GitHub。 |
| **09** | 說明文件優化 | 整理 README 與 Prompt 協作紀錄 | 重寫 README 與 Prompt 紀錄，並新增技術核心程式碼片段方便二次開發。 |

---

## 🛠️ 核心技術實現程式碼片段

### 1. Chart.js 彈窗生命週期銷毀與延遲重建
**問題點**：當 Canvas 處於 `display: none` 容器中時，Chart.js 會因無法計算容器寬高而導致渲染寬度為 0 或縮放比例失真。
**解決方案**：在彈窗打開後（`active` 類已套用），延遲 150 毫秒（避開 CSS 過渡動畫），並銷毀舊的圖表實例（防止點擊多次產生 Canvas 記憶體洩漏與重複渲染錯誤）。

```javascript
window.myCharts = {};

function initModalChart(modalId) {
    const config = chartConfigs[modalId];
    if (!config) return;
    const canvas = document.getElementById(config.canvasId);
    if (!canvas) return;

    // 銷毀已存在的執行個體，防範重複繪製
    if (window.myCharts[config.canvasId]) {
        window.myCharts[config.canvasId].destroy();
    }

    // 延遲 150 毫秒以避開 CSS display transition 的寬高計算問題
    setTimeout(() => {
        window.myCharts[config.canvasId] = new Chart(canvas, {
            type: config.type,
            data: config.data,
            options: config.options
        });
    }, 150);
}
```

### 2. Canvas 粒子重力引力與速限物理模擬
**設計點**：利用滑鼠位置作為引力中心，粒子在靠近時會受到溫和的加速度吸向滑鼠，但必須限制最大速度，以免粒子產生軌道逃逸或速度無限大。

```javascript
class Particle {
    update() {
        this.x += this.vx;
        this.y += this.vy;

        // 碰撞邊界反彈
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        // 滑鼠物理重力吸引
        if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
                const force = (mouse.radius - dist) / mouse.radius * 0.05;
                this.vx += (dx / dist) * force;
                this.vy += (dy / dist) * force;
            }
        }

        // 速度上限控制
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > 1.2) {
            this.vx = (this.vx / speed) * 1.2;
            this.vy = (this.vy / speed) * 1.2;
        }
    }
}
```

### 3. CSS 濾鏡調整品牌 SVG 顏色適配
**設計點**：FILA 的 Simple Icons 向量 SVG 預設是黑色，直接放在深色背景上會隱形。透過 CSS `filter` 濾鏡屬性，無須編輯原始 SVG 即可直接將其轉換為明亮的白字並增添科技發光感。

```css
.experience-logo img.fila-logo {
    filter: invert(1) brightness(1.2) drop-shadow(0 0 4px rgba(255, 255, 255, 0.2));
}
```

---

## 💡 AI 提示詞最佳實踐與建議
1. **漸進式優化 (Step-by-Step Evolution)**：避免一次給予 AI 過於複雜的視覺與互動指令。建議先完成功能主體與 HTML 結構，隨後進行 CSS Style 優化，最後才導入動態 Canvas 與 Chart.js 邏輯。
2. **善用 `backdrop-filter` 與 CSS 變數**：在深色主題中，採用 CSS Variables 定義顏色能讓全站一鍵切換配色（例如從霓虹青切換為電子綠）；結合 `backdrop-filter: blur()` 能大幅提升網頁的「空氣感」與「玻璃透光感」。
3. **保持圖表 RWD**：Chart.js 在響應式排版中必須設定 `maintainAspectRatio: false`，且外層包裹一個 `position: relative` 且設有具體高度的 `div` 容器，以防圖表溢出。

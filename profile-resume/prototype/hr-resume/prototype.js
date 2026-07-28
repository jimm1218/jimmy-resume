const contact = `台中市　·　0919-201-375　·　jimm1218@gmail.com　·　github.com/jimm1218`;
const skills = ["SQL / ETL","Power BI / DAX","CRM / CDP","RFM / 留存分析","Python","FastAPI","資料產品","跨部門需求轉譯"];
const jobs = [
  ["FILA 斐樂","數據分析師","2024–2026",["整合 SQL Server、CDP 與 BigQuery 資料，建置會員經營與管理儀表板。","設計 RFM、回購率、會員健康度與流失預警等 KPI 與 DAX 邏輯。","會員健康度週期報表自動化，人工彙整時間降低 80% 以上。"]],
  ["向上國際科技","專案管理師","2023–2024",["撰寫 Stored Procedures 與排程腳本，每日掃描異常交易與套利行為。","建立查詢、資料擷取與郵件發送流程，支援風險稽核決策。"]],
  ["王品餐飲","數位組主任","2020–2023",["參與 CDP 導入，負責需求梳理、資料表對接、SQL 邏輯封裝與上線支援。","以 Presto SQL、T-SQL 建立可重複使用的會員標籤與分群查詢。"]],
  ["東森得易購","經營分析專員","2018–2020",["以 VBA 開發 Excel 自動化工具，整合資料庫並產出週報、月報。","監控多通路績效，提供會員輪廓、活動成效與營運策略建議。"]],
  ["循證民調","資深研究員","2016–2018",["獨立執行 30 件以上市場調查專案，涵蓋研究設計、分析、報告與提案。"]]
];
const projects = [
  ["Repuguard AI 輿情與回覆平台","把品牌評論分流、風險判斷與 AI 回覆整合為可部署的營運工具。","FastAPI · Supabase · ML · LLM API · Docker · GCP"],
  ["Price Inquiry 商品比價儀表板","將多來源價格擷取流程整理成可搜尋、篩選、排序與比較的商務介面。","Python · Playwright · BeautifulSoup · Dashboard"],
  ["Taiwan Windy 氣象動態地圖","以即時觀測資料、空間插值、風場動畫與時間軸呈現氣象變化。","Flask · SQLite · Leaflet · Canvas · IDW"]
];
const chips = () => `<div class="chips">${skills.map(x=>`<span class="chip">${x}</span>`).join("")}</div>`;
const job = ([company,title,date,items]) => `<article class="job"><div class="job-head"><h3>${company}｜${title}</h3><span class="job-meta">${date}</span></div><ul>${items.map((x,i)=>`<li class="${x.includes("80%")?"impact":""}">${x}</li>`).join("")}</ul></article>`;
const project = ([name,copy,stack]) => `<article class="project"><span class="eyebrow">Selected project</span><h3>${name}</h3><p>${copy}</p><div class="project-links">${stack}</div></article>`;
const footer = n => `<div class="footer"><span>JIMMY CHIN · HR RESUME PROTOTYPE</span><span>0${n}</span></div>`;
const page = (content,n) => `<section class="page">${content}${footer(n)}</section>`;
const header = `<header class="hero"><div><span class="eyebrow">Data analyst · BI · Data products</span><h1>靳鈞評 <small>Jimmy Chin</small></h1><div class="role">資料分析師／BI 分析師</div></div><div class="hero-right contact">${contact}</div></header>`;

function VariantA(){
  return `<div class="resume variant-a">${page(`${header}<p class="summary">具 8 年以上商業數據分析、CRM／CDP、SQL 與 Power BI 經驗。擅長將模糊的營運需求轉成可追蹤指標、自動化報表與可持續維運的資料產品；近期延伸至 Python、AI API 與 Web 部署。</p><div class="columns"><section><h2>工作經歷</h2>${jobs.slice(0,4).map(job).join("")}</section><aside><h2>核心能力</h2>${chips()}<div class="proof"><span class="metric">80%+<small>FILA 會員健康度報表人工彙整時間降幅</small></span></div><div class="proof"><span class="metric">30+<small>獨立執行市場研究與分析專案</small></span></div><h2>學歷</h2><p>逢甲大學<br>都市計畫與空間資訊碩士</p><p>中國文化大學<br>土地資源學士</p><h2>工具</h2><p>SQL Server · BigQuery · Presto SQL · Power BI · DAX · Power Query · Python · Supabase</p></aside></div>`,1)+page(`<h2>精選專案</h2>${projects.map(project).join("")}<h2>早期經歷</h2>${jobs.slice(4).map(job).join("")}<h2>補充能力</h2><div class="columns"><section><h3>AI 與部署</h3><p class="summary">Python、Scikit-learn、FastAPI、Flask、LLM API、Docker、GCP VM、Vercel、Render、GitHub Actions。</p><h3>商業溝通</h3><p class="summary">跨部門需求訪談、KPI 定義、SOP、教育訓練、管理簡報與分析建議。</p></section><aside><h3>作品連結</h3><p class="contact">github.com/jimm1218<br>Repuguard Demo<br>Price Inquiry Demo<br>Taiwan Windy Demo</p><h3>語言</h3><p class="contact">中文：精通<br>英文：中等<br>日文：基礎</p></aside></div>`,2)}</div>`;
}
function VariantB(){
  return `<div class="resume variant-b">${page(`<div class="mast"><div><span class="eyebrow">Business data → decision systems</span><h1>靳鈞評</h1><div class="role">把資料分析轉成可使用、可追蹤、可維運的決策工具</div></div><div class="contact">${contact}</div></div><div class="metrics"><div class="metric-card"><span class="metric">8+ 年<small>商業數據與市場研究</small></span></div><div class="metric-card"><span class="metric">80%+<small>報表人工時間降幅</small></span></div><div class="metric-card"><span class="metric">30+<small>完整研究專案</small></span></div></div><h2 style="margin-top:12mm">職涯成果</h2>${jobs.map(j=>`<article class="story"><time>${j[2]}</time><div>${job(j)}</div></article>`).join("")}`,1)+page(`<span class="eyebrow">Selected work</span><h1>從分析到產品</h1><p class="summary">精選案例聚焦三種能力：把營運問題定義成指標、把資料流程自動化，以及把模型與分析部署成可操作的介面。</p><div class="case-grid">${projects.map(project).join("")}</div><h2 style="margin-top:10mm">能力組合</h2>${chips()}<div class="columns" style="margin-top:10mm"><section><h3>商業分析</h3><p class="summary">CRM、CDP、會員分群、RFM、回購與留存、流失預警、活動與通路績效。</p><h3>資料與 BI</h3><p class="summary">SQL、ETL、Power BI、DAX、Power Query、BigQuery 與管理儀表板。</p></section><section><h3>AI／產品化</h3><p class="summary">Python、機器學習、LLM API、FastAPI、Docker、雲端部署與 CI/CD。</p><h3>教育</h3><p class="summary">逢甲大學都市計畫與空間資訊碩士；中國文化大學土地資源學士。</p></section></div>`,2)}</div>`;
}
function VariantC(){
  return `<div class="resume variant-c">${page(`<div class="top-band"><div><span class="eyebrow">Profile</span><h1>靳鈞評 Jimmy Chin</h1><div class="role">資料分析師／BI 分析師</div></div><div class="contact">${contact}</div></div><div class="columns"><section><h2>經驗主線</h2><div class="timeline">${jobs.map(job).join("")}</div></section><aside><h2>我能解決的問題</h2><p class="summary"><b>指標定義</b><br>把會員與營運目標拆成可追蹤 KPI。</p><p class="summary"><b>流程自動化</b><br>降低重複整理、查詢與派送成本。</p><p class="summary"><b>資料產品化</b><br>把分析與模型做成可操作的儀表板和應用。</p><h2>技術</h2>${chips()}<h2>學歷</h2><p class="contact">逢甲大學 碩士<br>中國文化大學 學士</p></aside></div>`,1)+page(`<div class="case-hero"><div><span class="case-index">01</span><span class="eyebrow">Flagship case</span><h1>會員健康度與 CRM BI</h1></div><p class="summary">會員經營需要同時追蹤分群、回購、留存、活動成效與商品偏好。整合 SQL Server、CDP、BigQuery 與 Power BI，建立可自動更新的管理儀表板，將人工彙整時間降低 80% 以上。</p></div><div class="flow"><div><b>問題</b>週期性報表依賴人工整理，指標口徑分散。</div><div><b>行動</b>清理異質資料，建立 DAX KPI 與互動分析流程。</div><div><b>結果</b>管理報表自動更新，支援會員經營與決策。</div></div><h2 style="margin-top:12mm">延伸案例</h2><div class="evidence">${projects.map(project).join("")}</div><h2 style="margin-top:10mm">角色定位</h2><p class="summary">適合需要 SQL、BI、CRM／CDP 與商業溝通能力的資料分析或 BI 分析職務；AI 與 Web 部署能力作為把分析成果產品化的延伸，而非取代核心定位。</p>`,2)}</div>`;
}
const variants={A:["ATS 單欄雙頁",VariantA],B:["成果編輯式",VariantB],C:["履歷＋案例混合",VariantC]};
const keys=Object.keys(variants);
function current(){const value=new URLSearchParams(location.search).get("variant")?.toUpperCase();return keys.includes(value)?value:"A"}
function render(){const key=current();document.querySelector("#app").innerHTML=variants[key][1]();document.querySelector("#variant-label").textContent=`${key} — ${variants[key][0]}`;document.title=`${key} — ${variants[key][0]} | Jimmy Chin`;}
function move(delta){const key=current();const next=keys[(keys.indexOf(key)+delta+keys.length)%keys.length];const url=new URL(location.href);url.searchParams.set("variant",next);history.replaceState({}, "", url);render();}
document.querySelector("#previous").addEventListener("click",()=>move(-1));
document.querySelector("#next").addEventListener("click",()=>move(1));
addEventListener("keydown",event=>{if(["INPUT","TEXTAREA"].includes(document.activeElement?.tagName)||document.activeElement?.isContentEditable)return;if(event.key==="ArrowLeft")move(-1);if(event.key==="ArrowRight")move(1)});
addEventListener("popstate",render);
render();

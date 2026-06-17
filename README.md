# scRNA-seq Advanced Math 教學網站

🌐 **網站**：<https://charlene717.github.io/scrna-advanced-math/>

> 從原始計數矩陣到流形學習——用嚴謹的數學推導 + 互動式視覺化，告訴你 QC、Normalization、PCA、UMAP、Leiden、DESeq2、Harmony 這些工具**實際在算什麼**。

中英雙語、純靜態網站（無 build step）、每頁都有可操作的 3D / 2D 互動範例。

---

## 目標讀者

- 已經會跑 scanpy / Seurat pipeline，想理解每一步背後的數學
- 看得懂 PCA / UMAP / Leiden 的名字，但不確定它們的限制跟假設
- 想看清楚「為什麼 scRNA-seq 不能用 t-test」「HVG 跟 PCA 差在哪」「PC1 不是 Gene1」這些常見誤解的根源

---

## 內容地圖：6 模塊、18 個獨立頁面

### M1 基礎篇 · Foundations
| # | 主題 | 數學重點 |
|---|---|---|
| 1.1 | 稀疏矩陣與儲存 | COO / CSR / CSC、SpMV 複雜度、AnnData 的 5 大成員、HDF5 vs Zarr |
| 1.2 | 計數分布 | Poisson、Negative Binomial（Poisson-Gamma mixture）、ZINB、Pearson residuals 推導 |

### M2 前處理篇 · Preprocessing
| # | 主題 | 數學重點 |
|---|---|---|
| 2.1 | QC 統計 | MAD（median absolute deviation）、k = 1.4826 的來源、Scrublet 雙胞胎偵測 |
| 2.2 | Normalization | CP10K、log1p 的變異穩定化推導、scTransform / Pearson residuals 為何能取代 size factor |
| 2.3 | HVG 選擇 | mean-variance plot、LOESS 平滑、Seurat vst vs Scanpy seurat\_v3 vs Pearson HVG |
| 2.4 | Scaling | z-score 為何必要、為何 PCA 對量級敏感、clip @ 10 防 outlier、regress-out 數學 |

### M3 降維篇 · Dimensionality Reduction
| # | 主題 | 數學重點 |
|---|---|---|
| 3.1 | **PCA** ⭐ | 共變異數矩陣、Lagrange 推導、特徵分解、SVD、Eckart–Young 定理、Lanczos 演算法 |
| 3.2 | t-SNE | 鄰居機率 $P_{ij}$、perplexity、Student-t 重尾、KL divergence 梯度 |
| 3.3 | UMAP | fuzzy simplicial set、cross-entropy + negative sampling、與 t-SNE 的數學對應 |
| 3.4 | Diffusion Maps | 轉移矩陣 T、diffusion distance、譜論視角、DPT pseudotime 數學基礎 |

> **§3.1 PCA** 是教程的核心：含 3D 三基因互動範例（自由探索 + 7 步驟演算法導覽）、共變異數矩陣逐元素建構動畫、變異數公式四選一遊戲、猜 PC1 遊戲。

### M4 圖與聚類 · Graph & Clustering
| # | 主題 | 數學重點 |
|---|---|---|
| 4.1 | KNN graph | brute-force vs ANN、HNSW 多層導航、PyNNDescent、Jaccard 邊權重、scanpy connectivities 矩陣 |
| 4.2 | Louvain & Leiden | modularity Q 推導、Louvain 兩階段、斷裂群 bug、Leiden 三階段修正、resolution γ、CPM |

### M5 統計推論 · Statistical Inference
| # | 主題 | 數學重點 |
|---|---|---|
| 5.1 | DE tests | t-test 為何不適用 scRNA、Wilcoxon rank-sum、MAST 雙部分模型、pseudobulk + DESeq2 為何金標準 |
| 5.2 | 多重檢定 / FDR | FWER vs FDR、Bonferroni union bound、BH 演算法 + 證明大綱、Storey q-value、BY、IHW |
| 5.3 | 細胞分類器 | 邏輯回歸 + softmax、CellTypist 訓練流程、scNym 半監督學習、SingleR、scANVI、confidence reject |

### M6 進階主題 · Advanced
| # | 主題 | 數學重點 |
|---|---|---|
| 6.1 | Integration | Harmony 迭代軟分群校正、BBKNN、scVI 變分自編碼器（ELBO + NB likelihood）、kBET / LISI 評估 |
| 6.2 | Pseudotime | DPT diffusion math、Slingshot 主曲線、Monocle 3 partition graph、RNA velocity、scVelo、CellRank |
| 6.3 | CellChat | ligand-receptor database、mass action law 通訊強度、permutation test、NicheNet prior model、LIANA |

---

## 每頁的固定結構

1. **頂部 nav**：M1–M6 下拉式選單 + 中英切換 + 回首頁
2. **🧬 scRNA-seq 視角 panel**（每頁開頭）：
   - 📍 在流程中的位置（pipeline 流程圖）
   - 🎯 為什麼 scRNA-seq 必須做這步
   - 💥 不做 / 做錯會發生什麼（含 PBMC 3k 實證表格）
   - 🔗 對下游每個步驟的具體影響
   - ⭐ 一句話總結
3. **§0 故事章節**：從一個情境開始（例如「研究員給你一份資料」），慢慢「發現」概念
4. **§1–§N 數學推導 + 互動**：每節都有可操作的視覺化
5. **§ 末 限制 + 下一步**：跨頁連結到相關主題

## 互動範例特色

- **拖曳 3D 散佈圖**：M3.1 PCA、M3.4 diffusion maps、M4.2 Leiden 演算法步驟導覽
- **滑桿即時重算**：perplexity、k、resolution γ、bandwidth h、α、π₀ 都可拖
- **點擊樣本看細節**：每個資料點可選取，顯示 raw count / PC scores / loading
- **演算法步驟導覽**：M3.1 §10 是 7 步走完整 PCA（含中心化動畫、PC1/PC2 旋轉、平面投影、丟 PC3 的數學保證）
- **猜測遊戲**：M3.1 「猜 PC1」、「變異數公式四選一」

---

## 檔案結構

```
scrna-advanced-math/
├── README.md               # 你正在讀的這份
├── index.html              # 首頁 + 整條 pipeline 工作流程 SVG
├── styles.css              # 共用樣式（中英切換 + tspan 切換 + topnav）
├── i18n.js                 # 語言切換 JS（按鈕 + localStorage 記憶）
│
├── M1-foundations/
│   ├── 1.1-sparse-matrix.html
│   └── 1.2-count-distributions.html
│
├── M2-preprocessing/
│   ├── 2.1-qc-statistics.html
│   ├── 2.2-normalization.html
│   ├── 2.3-hvg-selection.html
│   └── 2.4-scaling.html
│
├── M3-dimreduction/
│   ├── 3.1-pca.html        ⭐ 互動 3D + 7 步驟導覽 + 「猜 PC1」遊戲
│   ├── 3.2-tsne.html
│   ├── 3.3-umap.html
│   └── 3.4-diffusion-map.html
│
├── M4-graph-clustering/
│   ├── 4.1-knn-graph.html
│   └── 4.2-louvain-leiden.html
│
├── M5-statistics/
│   ├── 5.1-de-tests.html
│   ├── 5.2-multiple-testing.html
│   └── 5.3-classifier.html
│
└── M6-advanced/
    ├── 6.1-integration.html
    ├── 6.2-pseudotime.html
    └── 6.3-cellchat.html
```

---

## 怎麼用

1. 直接打開 `index.html`（任何現代瀏覽器都行，不需要 server）
2. 點工作流程圖任一方塊跳到對應主題
3. 右上角「中文 / EN」切換語言（會 localStorage 記住）
4. 每頁的 §0 是「故事入口」，§1 之後是數學
5. 互動範例都在頁面中段，滑桿與按鈕可隨意嘗試

## 技術棧

- 純 HTML / CSS / vanilla JS（**無 build step、無 npm、無框架**）
- 數學公式：[KaTeX](https://katex.org/)（CDN 載入）
- 互動視覺化：手寫 SVG + JS（沒用 D3.js、Three.js、React）
- 雙語切換：`<span data-lang="zh|en">` + CSS `display: none` toggle，SVG 用 `<tspan data-lang>`
- 程式碼示範：自寫 syntax-highlight CSS class

## 推薦的搭配閱讀

- **Heumos et al. 2023**, _Best practices for single-cell analysis across modalities_, Nat Rev Genet — 教程裡很多「為什麼」直接引用這篇
- **OSCA**（Aaron Lun et al.）— https://bioconductor.org/books/OSCA/
- **scanpy tutorial**（PBMC 3k）— 本教程多處實證表格的對照基準
- **Distill.pub** — 視覺化風格的精神來源

## 引用的關鍵 papers（部分）

| 主題 | Paper |
|---|---|
| mRNA per cell | Marinov 2014 |
| 10x Genomics | Zheng 2017 |
| scanpy | Wolf 2018 |
| Pearson residuals / GLM-PCA | Townes 2019 |
| scTransform | Hafemeister & Satija 2019 |
| Leiden | Traag 2019 |
| UMAP | McInnes 2018 |
| Diffusion Maps | Coifman & Lafon 2006、Haghverdi 2016 |
| DPT pseudotime | Haghverdi 2016 |
| Monocle 3 | Trapnell 2014、Cao 2019 |
| MAST | Finak 2015 |
| pseudobulk DE | Squair 2021、Crowell 2020 |
| BH FDR | Benjamini & Hochberg 1995 |
| Storey q-value | Storey 2003 |
| Harmony | Korsunsky 2019 |
| scVI | Lopez 2018 |
| CellTypist | Domínguez Conde 2022 |
| CellChat | Jin 2021 |
| Integration benchmark | Luecken 2022、Tran 2020 |
| Best practices | Heumos 2023 |

完整引用散布在各頁的「scRNA-seq 視角」面板與 §「限制與下一步」段落。

---

## 設計理念

借鏡 Distill.pub 的風格：**把硬數學藏在互動裡**，讓讀者「動手玩 → 形成直覺 → 看公式 → 看實證」。

- 每個專有名詞，**都在你理解它做什麼之後**才登場
- 公式有了之後，**馬上接 PBMC 3k 實證表格**回到 scRNA 現場
- 每頁開頭的「scRNA-seq 視角」面板用<b>故事跟比喻</b>定錨（KNN 是朋友圈、Leiden 是婚宴企劃、CellChat 是細胞界的 Slack 群組⋯⋯）

---

© Charlene

# 个人作品集 · lkd0.github.io

李凯迪的前端作品集主页 —— **手写 HTML/CSS/JS，零框架、零构建、零依赖**，本身就是"基本功"的展示品。

**在线**：https://lkd0.github.io

## 设计语言：「杂志 × 终端」

一套设计令牌（`:root` CSS 变量：纸质底色 / 墨色 / 朱红 + Fraunces/Noto Serif SC/IBM Plex Mono 三字体系统）贯穿四件作品，视觉上像同一个人做的——作品集的一致性本身就是加分项。

## 技术要点

| 主题 | 实现 |
|---|---|
| 语义化 | header/nav/main/section/article + aria-label + `:focus-within` 自定义焦点样式 |
| 排版 | `clamp()` 流式字号、CSS 网格 `auto-fit/minmax` 不用媒体查询的响应式卡片 |
| 交互 | IntersectionObserver 滚动揭示 + `--stagger` 级联延迟；`document.title` 驱动的导航栏打字机 |
| 状态 | `data-level` 属性驱动技能熟练度条；`prefers-reduced-motion` 动效降级 |
| 部署 | 仓库即站点（GitHub Pages 用户站），push 即上线 |

## 包含的作品

- [天气观察台](https://lkd0.github.io/weather-app/) — 原生 JS + Open-Meteo 双接口
- [任务看板](https://lkd0.github.io/taskboard/) — React 19 + 原生拖拽
- [ChainLens 链上数据浏览器](https://lkd0.github.io/chain-explorer/) — JSON-RPC + 索引器双数据源

## 本地运行

直接用浏览器打开 `index.html` 即可，无需任何构建步骤。

# Patrick 个人主页 UI 设计文档

## 📋 文档说明

本文档详细阐述了 Patrick 个人学术主页的 UI/UX 设计思路、技术实现与设计规范，旨在为后续的迭代与修改提供清晰的参考依据。

---

## 🎯 设计理念

### 核心定位
- **目标受众**：学术界同行、潜在合作者、研究机构、学生
- **核心目标**：清晰展示研究方向、学术背景与联系方式
- **情感基调**：现代、专业、充满活力、富有科技感

### 设计原则
1. **简洁优先（KISS）**：避免过度设计，保持内容清晰易读
2. **视觉冲击**：使用现代化的视觉语言（渐变、玻璃态、动画）打造令人印象深刻的第一印象
3. **响应式设计**：全设备适配（桌面、平板、手机）
4. **可访问性**：支持深色模式自动切换，保证不同环境下的阅读体验

---

## 🛠️ 技术栈

### 核心技术
- **HTML5**：语义化标签，良好的 SEO 结构
- **Tailwind CSS**：通过 CDN 引入，快速构建响应式界面
- **Vanilla JavaScript**：轻量级交互实现（打字机效果、滚动动画）
- **CSS**：自定义玻璃态样式、滚动条美化、深色模式适配

### 外部资源
- **字体**：Google Fonts
  - `Fredoka`：用于标题（圆润、友好）
  - `Nunito`：用于正文（现代、易读）
- **图标**：FontAwesome 6.4.0（社交图标、研究方向图标）

### 配置要点
```javascript
// Tailwind 配置
tailwind.config = {
    darkMode: 'media',  // 自动跟随系统深色模式
    theme: {
        extend: {
            fontFamily: {
                heading: ['Fredoka', 'sans-serif'],
                body: ['Nunito', 'sans-serif'],
            },
            colors: {
                anime: { /* 自定义配色 (可选扩展) */ }
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out 3s infinite',
                'bounce-slow': 'bounce 3s infinite',
            }
        }
    }
}
```

---

## 🎨 配色方案

### 明亮模式（Light Mode）
| 用途 | 颜色值 | Tailwind 类名 | 说明 |
|------|--------|---------------|------|
| 背景渐变 | Indigo-50 → Purple-50 → Pink-50 | `from-indigo-50 via-purple-50 to-pink-50` | 柔和的紫粉渐变 |
| 主标题 | Slate-800 | `text-slate-800` | 深灰，保证可读性 |
| 正文 | Slate-600 | `text-slate-600` | 中灰，层次分明 |
| 强调色 | Blue-400 → Pink-500 | `from-blue-400 to-pink-500` | 蓝粉渐变，用于标题渐变文字、按钮 |
| 玻璃卡片背景 | rgba(255,255,255,0.65) | `.glass-card` | 白色半透明 + 背景模糊 |
| 悬浮球背景 | Blue-200, Purple-200, Pink-200 | 装饰性背景元素 | 半透明模糊球体 |

### 深色模式（Dark Mode）
| 用途 | 颜色值 | Tailwind 类名 | 说明 |
|------|--------|---------------|------|
| 背景渐变 | Slate-900 → Purple-900 → Slate-900 | `dark:from-slate-900 dark:via-purple-900 dark:to-slate-900` | 深色渐变 |
| 主标题 | White | `dark:text-white` | 纯白，高对比度 |
| 正文 | Slate-200/300 | `dark:text-slate-200` | 浅灰，柔和 |
| 玻璃卡片背景 | rgba(30,41,59,0.65) | `.glass-card` (CSS媒体查询) | Slate-800 半透明 |
| 悬浮球背景 | Blue-900, Purple-900, Pink-900 | 深色装饰背景球 | 深色调 |

### 配色使用指南
- **保持层次**：标题（深/白）→ 副标题（中灰）→ 正文（浅灰）
- **强调色使用**：仅在需要吸引注意力的地方使用渐变色（CTA 按钮、关键词、标题装饰）
- **避免纯黑纯白**：使用 Slate 系列色，视觉更柔和

---

## 🧩 组件系统

### 1. 玻璃态卡片（Glass Card）
**应用场景**：导航栏、研究方向卡片

**CSS 实现**：
```css
.glass-card {
    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
    .glass-card {
        background: rgba(30, 41, 59, 0.65);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
    }
}
```

**设计要点**：
- 半透明背景 + 背景模糊效果营造「玻璃」质感
- 浅色边框增强立体感
- 柔和阴影避免过于生硬

### 2. 导航栏（Navigation）
**特点**：
- 固定顶部（`fixed top-0`）
- 玻璃态圆角卡片容器
- 响应式设计（移动端隐藏导航菜单）
- Logo 使用渐变文字

**HTML 结构**：
```html
<nav class="fixed w-full z-50 top-0 left-0 px-6 py-4">
    <div class="glass-card rounded-full px-6 py-3">
        <!-- Logo + 导航链接 -->
    </div>
</nav>
```

### 3. Hero 区域（首屏）
**布局**：居中对齐、垂直居中（`min-h-screen flex items-center justify-center`）

**关键元素**：
- **徽章标签**：带动画的小标签（`animate-bounce-slow`）
- **主标题**：超大字号（`text-6xl md:text-8xl`）+ 打字机效果渐变文字
- **副标题**：中号字体 + 关键词加粗（大学名、研究方向）
- **CTA 按钮**：双按钮设计
  - 主按钮：渐变背景 + 白色文字
  - 次按钮：玻璃态 + 悬浮效果
- **装饰元素**：emoji 图标（⚡🔋📊）浮动动画

### 4. 研究方向卡片（Research Cards）
**布局**：3 列网格（`grid grid-cols-1 md:grid-cols-3`）

**卡片结构**：
- 顶部彩色边框（`border-t-4 border-blue-400`）区分类别
- 圆角图标背景
- 标题 + 描述文字
- 悬浮上浮效果（`hover:-translate-y-2`）

**颜色编码**：
- 蓝色：Parameter Identification
- 紫色：Full Electrochemical Modeling
- 粉色：Battery Life Prediction

### 5. About 代码展示块
**特点**：
- 模拟代码编辑器窗口（红黄绿三色圆点）
- 深色背景（`bg-slate-800`）+ 语法高亮风格文字
- 旋转效果 + 悬浮复位（`rotate-2 hover:rotate-0`）
- Python 类定义风格展示个人信息

### 6. 页脚（Footer）
**元素**：
- 社交图标（邮箱、GitHub）+ 圆形背景 + 悬浮放大效果
- 顶部彩色渐变线条装饰
- 版权信息 + 设计署名

---

## ✨ 交互与动画

### 1. 打字机效果（Hero 标题）
**实现**：`js/main.js`

**逻辑**：
- 循环显示三段文字：`["Patrick", "a Ph.D. Student", "a Battery Geek"]`
- 逐字打出 → 停顿 2 秒 → 逐字删除 → 切换下一段
- 视觉提示：粉色光标（`border-right: 4px solid #F472B6`）

### 2. 滚动显示动画
**实现**：Intersection Observer API

**效果**：
- 初始状态：元素透明度 0 + 向下偏移 20px
- 滚动进入视口：淡入 + 上移归位
- 作用对象：`.glass-card`, `section h2`, `.window-frame`

### 3. 背景浮动球
**实现**：Tailwind 自定义动画

**Keyframes**：
```css
@keyframes float {
    0%, 100% { transform: translateY(0) }
    50% { transform: translateY(-20px) }
}
```

**应用**：
- 三个模糊圆球在不同位置浮动
- 其中两个使用延迟动画（`animate-float-delayed`）增加错落感

### 4. 卡片悬浮效果
**实现**：Tailwind 工具类

```html
hover:-translate-y-2 transition-transform duration-300
```

**应用场景**：研究卡片、按钮、社交图标

---

## 📐 响应式设计

### 断点策略
- **移动端（默认）**：单列布局、较小字号
- **平板以上（md）**：多列网格、大字号、显示导航菜单

### 关键适配点

| 元素 | 移动端 | 桌面端 |
|------|--------|--------|
| 主标题 | `text-6xl` | `text-8xl` |
| 导航菜单 | 隐藏 | `md:flex` |
| 研究卡片 | 单列 | `md:grid-cols-3` |
| About 布局 | 垂直堆叠 | `md:flex-row` |
| 浮动 emoji | 隐藏 | `md:block` |

---

## 🌙 深色模式实现

### 启用方式
```javascript
tailwind.config = {
    darkMode: 'media',  // 自动跟随系统设置
}
```

### 适配策略
1. **全局背景**：明亮渐变 → 深色渐变
2. **文字颜色**：深灰 → 浅灰/白
3. **玻璃卡片**：白色半透明 → Slate-800 半透明（通过 CSS 媒体查询）
4. **图标背景**：浅色 → 深色半透明（`dark:bg-blue-900/30`）
5. **按钮/链接**：悬浮色调整（如 `dark:hover:bg-red-900`）

### CSS 媒体查询补充
对于无法通过 Tailwind `dark:` 类实现的样式（如 `.glass-card`），使用：

```css
@media (prefers-color-scheme: dark) {
    /* 自定义深色样式 */
}
```

---

## 🎯 SEO 与可访问性

### SEO 优化
- **语义化 HTML**：`<nav>`, `<section>`, `<footer>`, `<h1>`, `<h2>`, `<h3>`
- **Meta 标签**：`charset`, `viewport`, `title`
- **图片 Alt 属性**：虽未使用图片，但 favicon 已设置
- **外部链接 `target="_blank"`**：已添加

### 可访问性
- **颜色对比度**：明暗模式下均保证足够对比度
- **焦点可见**：可添加 `focus:ring` 等 Tailwind 类增强（可选）
- **平滑滚动**：`scroll-behavior: smooth`
- **自定义滚动条**：美化但保留功能

---

## 📁 文件结构

```
jerry328-sudo.github.io/
├── index.html              # 主页 HTML
├── css/
│   └── style.css           # 自定义样式（玻璃态、滚动条、深色模式）
├── js/
│   └── main.js             # 交互脚本（打字机、滚动动画）
├── cropped-logo1.webp      # Favicon
├── README.md               # 项目说明
└── UI设计文档.md           # 本文档
```

---

## 🔧 后续修改指南

### 修改颜色方案
1. **主色调**：搜索 `from-blue-400 to-pink-500`，替换为目标渐变色
2. **背景色**：修改 `<body>` 的 `from-indigo-50 via-purple-50 to-pink-50`
3. **卡片边框色**：修改 `border-t-4 border-blue-400` 等

### 添加新内容板块
1. 复制现有 `<section>` 结构
2. 保持 `py-20 px-6` 的内外边距一致性
3. 使用 `.glass-card` 类实现卡片效果
4. 添加滚动动画支持：在 `main.js` 的 `querySelectorAll` 中加入新元素选择器

### 修改字体
1. 替换 Google Fonts 链接
2. 更新 `tailwind.config.theme.extend.fontFamily`
3. 更新 `font-heading` 和 `font-body` 类的应用

### 调整动画
- **速度**：修改 `duration-300` 中的数值
- **距离**：修改 `translateY(-20px)` 中的数值
- **延迟**：调整 `animate-float-delayed` 的延迟时间（当前 3s）

### 移除或添加社交图标
在 `<footer>` 的 `<div class="flex justify-center gap-6 mb-8">` 中：
- 复制现有 `<a>` 标签
- 修改 `href` 和 FontAwesome 图标类名（`fa-brands fa-xxx`）
- 调整悬浮颜色类（`hover:bg-xxx hover:text-xxx`）

---

## 🐛 已知问题与改进空间

### 当前局限
1. **移动端导航**：无汉堡菜单，导航项在小屏幕上隐藏
   - **改进建议**：添加移动端菜单切换按钮
2. **可访问性**：未添加键盘导航焦点样式
   - **改进建议**：为链接和按钮添加 `focus:ring` 类
3. **性能优化**：CDN 引入 Tailwind，生产环境较大
   - **改进建议**：使用 Tailwind CLI 生成精简 CSS

### 未来扩展方向
- **博客/出版物板块**：展示论文列表
- **项目展示**：GitHub 项目卡片
- **数据可视化**：研究成果图表展示
- **多语言支持**：中英双语切换

---

## 📞 联系与反馈

如有设计或技术问题，请联系：
- **邮箱**：patrick2220w@gmail.com
- **GitHub**：https://github.com/jerry328-sudo

---

**文档版本**：v1.0  
**创建时间**：2026-01-08  
**最后更新**：2026-01-08

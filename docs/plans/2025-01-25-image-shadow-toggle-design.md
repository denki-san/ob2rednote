# 图片阴影开关功能设计

## 功能概述

添加一个"图片阴影"设置项，让用户可以控制 Markdown 内容中图片的阴影效果。默认关闭阴影。

## UI 设计

### 位置
在设置区域（字体选择下方）添加一个下拉框，作为最后一个设置项。

### HTML 结构
```html
<label>
    图片阴影
    <select id="imageShadow">
        <option value="none" selected>无阴影</option>
        <option value="shadow">有阴影</option>
    </select>
</label>
```

### 默认值
`none`（无阴影）

## 实现逻辑

### 配置存储
在 `converter.js` 的 `currentSettings` 中添加新配置项：

```javascript
let currentSettings = {
    headingLevel: 'none',
    fontSize: 18,
    fontFamily: 'noto-serif',
    imageShadow: 'none'  // 新增：默认无阴影
}
```

### 样式应用
通过 CSS 类来控制阴影效果：
- 当 `imageShadow === 'shadow'` 时，给容器添加 `with-shadow` 类
- 当 `imageShadow === 'none'` 时，移除 `with-shadow` 类

## CSS 样式实现

### 样式策略
采用"默认无阴影，有阴影时添加类"的方式。

### 视觉效果说明
- **有阴影时**：保持现有逻辑不变（图片有边距和阴影）
- **无阴影时**：图片撑满原本"图片+阴影"的区域，去掉周围的边距，让图片更大更贴近边缘

### 修改 `styles.css`

```css
/* 默认无阴影：图片撑满区域，无边距 */
.red-content-section img {
    max-width: 100%;
    max-height: 400px;
    height: auto;
    border-radius: 12px;
    margin: 0 auto;  /* 去掉边距，只保留水平居中 */
    display: block;
    object-fit: contain;
}

/* 有阴影时的样式：添加边距和阴影 */
.red-content-section.with-shadow img {
    margin: 2px auto 0 auto;  /* 恢复边距给阴影留空间 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
```

## 主题兼容性处理

部分主题（优雅、樱花等）有自己的图片阴影样式。全局开关需要覆盖这些主题设置：
- 当用户选择"无阴影"时，移除所有主题中的图片阴影
- 当用户选择"有阴影"时，使用主题自带的阴影样式（如果有），否则使用默认阴影

## 额外样式调整

### 段落间距优化
- 所有主题的段落 `margin-bottom` 统一改为 `0.5em`
- 只包含图片的段落 `margin-bottom` 设为 `0`

### 容器 padding 调整
- 所有主题的 `.red-image-preview` padding 改为 `20px 12px`（上下 20px，左右 12px）

## 修改文件清单

| 文件 | 修改内容 |
|------|----------|
| `index.html` | 添加图片阴影下拉框 |
| `src/converter.js` | 添加 `imageShadow` 配置项 |
| `src/main.js` | 监听下拉框变化，应用样式类 |
| `src/styles.css` | 添加 `.with-shadow img` 样式，优化段落间距 |
| `src/templates.js` | 调整主题中的图片阴影逻辑，统一段落间距和容器 padding |

## 设计总结

- **功能**：图片阴影开关
- **默认值**：无阴影
- **UI**：下拉框，选项为"无阴影"/"有阴影"
- **位置**：设置区域，字体选择下方
- **实现**：通过 CSS 类控制，全局开关覆盖主题设置

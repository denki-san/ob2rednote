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

### 修改 `styles.css`

```css
/* 默认无阴影 */
.red-content-section img {
    max-width: 100%;
    max-height: 400px;
    height: auto;
    border-radius: 12px;
    margin: 2px auto 0 auto;
    display: block;
    /* 移除原有的 box-shadow */
    object-fit: contain;
}

/* 有阴影时的样式 */
.red-content-section.with-shadow img {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
```

## 主题兼容性处理

部分主题（优雅、樱花等）有自己的图片阴影样式。全局开关需要覆盖这些主题设置：
- 当用户选择"无阴影"时，移除所有主题中的图片阴影
- 当用户选择"有阴影"时，使用主题自带的阴影样式（如果有），否则使用默认阴影

## 修改文件清单

| 文件 | 修改内容 |
|------|----------|
| `index.html` | 添加图片阴影下拉框 |
| `src/converter.js` | 添加 `imageShadow` 配置项 |
| `src/main.js` | 监听下拉框变化，应用样式类 |
| `src/styles.css` | 添加 `.with-shadow img` 样式 |
| `src/templates.js` | 调整主题中的图片阴影逻辑 |

## 设计总结

- **功能**：图片阴影开关
- **默认值**：无阴影
- **UI**：下拉框，选项为"无阴影"/"有阴影"
- **位置**：设置区域，字体选择下方
- **实现**：通过 CSS 类控制，全局开关覆盖主题设置

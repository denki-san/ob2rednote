# ob2rednote

Markdown 转小红书图片生成器 - 本地网页版

## 功能特性

- 选择本地 Obsidian 笔记文件夹
- 实时预览 Markdown 转小红书风格效果
- 多种预设主题（默认、优雅、赛博等）
- 字号、字体、标题分割级调整
- 导出为图片

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

## 技术栈

- 原生 JavaScript（ES Modules）
- Vite
- html-to-image（图片生成）
- marked（Markdown 解析）

## 项目结构

- `src/`：核心业务代码（转换、模板、文件读取、下载）
- `tests/`：本地测试脚本
- `docs/`：技术文档与方案设计
- `openspec/`：规格与变更记录

## 许可证

MIT License

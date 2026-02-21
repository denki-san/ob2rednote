# Project Context

## Purpose
ob2rednote 是一个 Markdown 转小红书图片生成器。它旨在将本地 Obsidian 笔记转换为小红书风格的图片，以便于分享和发布。这是一个纯本地运行的网页工具，无需后端服务。

## Tech Stack
- **前端工具链**: Vite 6
- **核心库**:
  - `marked`: Markdown 解析。
  - `html-to-image`: 将 HTML 节点转换为图片。
  - `jszip`: 如果需要批量导出，用于生成压缩包。
- **开发语言**: 原生 JavaScript (ES Modules)。
- **样式**: Vanilla CSS。

## Project Conventions

### Code Style
- **注释**: 优先使用简体中文注释。
- **命名**: 文件名和标识符使用英文命名。
- **模块化**: 使用 ES Modules 组织代码。
- **UI**: 网页版设计，注重预览效果的实时性。

### Architecture Patterns
- **纯客户端**: 所有数据处理（解析、渲染、图片生成）都在浏览器端运行。
- **文件处理**: 利用浏览器 File System Access API 直接读取本地 Obsidian 文件夹。
- **模块职责**:
  - `converter.js`: 核心转换逻辑。
  - `fileManager.js`: 处理文件夹和文件的读取。
  - `main.js`: 入口文件和 UI 交互。
  - `templates.js`: 预设的主题模板。

### Testing Strategy
- 目前项目中包含 `tests/test_mixed_paragraph.js`，主要通过手动预览和基础逻辑脚本进行验证。

### Git Workflow
- 遵循基础的 Git 版本管理实践。

## Domain Context
- **小红书风格**: 指具有特定的排版样式（如卡片式、圆角、阴影）、表情符号支持、以及适合手机屏幕阅读的纵横比。
- **Obsidian 集成**: 能够识别 Obsidian 的语法特点（如图片引用、双链语法的处理需求等）。

## Important Constraints
- **无后端**: 不能增加必须依赖后端的特性，以保持私密性和易用性。
- **性能**: 由于在前端生成图片，需注意长文或复杂样式的渲染性能。

## External Dependencies
- 仅依赖 npm 包管理的客户端库。无需外部数据库或 API 服务。

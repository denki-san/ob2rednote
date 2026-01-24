# ob2rednote 项目规范

## 目的

将 Obsidian Markdown 笔记转换为小红书风格图片的本地网页工具

## 技术栈

- 前端框架：Vue 3
- 构建工具：Vite 6
- 核心库：html-to-image, marked, jszip
- 开发语言：原生 JavaScript（ES modules）

## 代码规范

- 使用简体中文注释
- 文件命名使用英文
- 遵循 ESLint 默认规范

## 项目约定

- 本地运行，无后端依赖
- 所有数据处理在浏览器端完成
- 用户文件夹选择使用 File System Access API

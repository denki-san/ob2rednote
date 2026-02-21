# File Cleanup Report (2026-02-21)

## 1) Removed Files

- `.DS_Store`
- `src/.DS_Store`
- `test_regex.js`
- `test_regex_v2.js`
- `.playwright-mcp/test_image_shadow_ui.png`

### Evidence

- `*.DS_Store` 属于 macOS Finder 缓存，不参与构建和运行。
- `test_regex.js`、`test_regex_v2.js` 为临时正则实验脚本，未被任何源码、构建脚本或文档引用。
- `.playwright-mcp/test_image_shadow_ui.png` 为一次性截图产物，未被代码引用。

## 2) Organized Files

- `test-mixed-paragraph.js` -> `tests/test_mixed_paragraph.js`
- `project.md` -> `docs/archive/project_legacy.md`

### Evidence

- 测试脚本集中到 `tests/`，避免根目录堆积临时/测试文件。
- `project.md` 与 `openspec/project.md` 语义重复，且前者包含过时信息（例如 Vue 3），归档到 `docs/archive/` 以保留历史上下文并减少歧义。

## 3) Updated References

- `openspec/project.md` 中测试脚本路径更新为 `tests/test_mixed_paragraph.js`
- `README.md` 技术栈修正为“原生 JavaScript（ES Modules）”
- `README.md` 增加项目结构说明
- `.gitignore` 增加 `.playwright-mcp/`

## 4) Notes

- `node_modules/` 是可重建目录（`npm install` 可恢复），当前未删除以避免影响立即开发。
- `pressure/` 当前为空目录，若确认不再使用可在下一次清理中删除。

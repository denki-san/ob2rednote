/**
 * Note to RED - 主入口
 * 将 Obsidian 笔记转换为小红书图片
 */
import { selectFolder, readMarkdownFile, convertObsidianImages } from './fileManager.js'
import { convertMarkdown, updateSettings, getSettings, hasValidContent, handleOverflowPagination } from './converter.js'
import { downloadSingleImage, downloadAllImages } from './download.js'
import { loadTemplate, getTemplateList, applyTemplate } from './templates/index.js'

// 状态
let currentSectionIndex = 0
let totalSections = 0
let currentFilePath = null

// DOM 元素
const selectFolderBtn = document.getElementById('selectFolderBtn')
const folderPath = document.getElementById('folderPath')
const fileList = document.getElementById('fileList')
const previewContainer = document.getElementById('previewContainer')
const previewWrapper = document.getElementById('previewWrapper')
const navContainer = document.getElementById('navContainer')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')
const pageIndicator = document.getElementById('pageIndicator')
const downloadCurrentBtn = document.getElementById('downloadCurrentBtn')
const downloadAllBtn = document.getElementById('downloadAllBtn')
const refreshBtn = document.getElementById('refreshBtn')
const templateSelect = document.getElementById('templateSelect')
const headingLevelSelect = document.getElementById('headingLevelSelect')
const fontSizeDecrease = document.getElementById('fontSizeDecrease')
const fontSizeIncrease = document.getElementById('fontSizeIncrease')
const fontSizeValue = document.getElementById('fontSizeValue')
const fontFamilySelect = document.getElementById('fontFamilySelect')

// 字体映射
const fontFamilyMap = {
    system: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    pingfang: '"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
    heiti: '"Heiti SC", "Heiti TC", "Microsoft YaHei", sans-serif',
    songti: '"Songti SC", STSong, SimSun, serif',
    kaiti: '"Kaiti SC", STKaiti, KaiTi, serif',
    yuanti: '"Yuanti SC", "Yuan Gothic TC", sans-serif',
    xingkai: '"Xingkai SC", "STXingkai", cursive',
    fangsong: 'STFangsong, FangSong, serif',
    'noto-serif': '"Noto Serif SC", "Noto Serif CJK SC", "Source Han Serif SC", serif',
    'noto-sans': '"Noto Sans SC", "Noto Sans CJK SC", "Source Han Sans SC", sans-serif'
}

/**
 * 初始化
 */
function init() {
    // 绑定事件
    selectFolderBtn.addEventListener('click', handleSelectFolder)
    prevBtn.addEventListener('click', () => navigateSection(-1))
    nextBtn.addEventListener('click', () => navigateSection(1))
    downloadCurrentBtn.addEventListener('click', handleDownloadCurrent)
    downloadAllBtn.addEventListener('click', handleDownloadAll)

    templateSelect.addEventListener('change', handleTemplateChange)
    headingLevelSelect.addEventListener('change', handleHeadingLevelChange)
    fontSizeDecrease.addEventListener('click', () => changeFontSize(-1))
    fontSizeIncrease.addEventListener('click', () => changeFontSize(1))
    fontFamilySelect.addEventListener('change', handleFontFamilyChange)
    refreshBtn.addEventListener('click', handleRefresh)

    // 初始化模板选项
    initTemplateOptions()

    // 初始化提示文案
    updateTipsText()
}

/**
 * 初始化模板选项
 */
async function initTemplateOptions() {
    const templates = getTemplateList()
    templateSelect.innerHTML = templates.map(t =>
        `<option value="${t.id}">${t.name}</option>`
    ).join('')
}

/**
 * 处理文件夹选择
 */
async function handleSelectFolder() {
    try {
        selectFolderBtn.disabled = true
        selectFolderBtn.textContent = '选择中...'

        const result = await selectFolder()

        if (result) {
            folderPath.textContent = result.folderName
            renderFileList(result.mdFiles)
        }
    } catch (err) {
        console.error('选择文件夹失败:', err)
        alert('选择文件夹失败: ' + err.message)
    } finally {
        selectFolderBtn.disabled = false
        selectFolderBtn.innerHTML = '<span class="icon">📁</span>选择文件夹'
    }
}

/**
 * 渲染文件列表
 */
function renderFileList(files) {
    if (files.length === 0) {
        fileList.innerHTML = '<div class="empty-state">没有找到 Markdown 文件</div>'
        return
    }

    fileList.innerHTML = files.map(file => {
        const displayName = file.replace(/\.md$/, '')
        return `
      <div class="file-item" data-path="${file}">
        <span class="file-icon">📄</span>
        <span class="file-name" title="${file}">${displayName}</span>
      </div>
    `
    }).join('')

    // 绑定点击事件
    fileList.querySelectorAll('.file-item').forEach(item => {
        item.addEventListener('click', () => {
            // 移除其他选中状态
            fileList.querySelectorAll('.file-item').forEach(i => i.classList.remove('active'))
            item.classList.add('active')

            handleFileSelect(item.dataset.path)
        })
    })
}

/**
 * 处理文件选择
 * @param {string} filePath 文件路径
 * @param {boolean} keepPage 是否保持当前页码
 */
async function handleFileSelect(filePath, keepPage = false) {
    try {
        currentFilePath = filePath

        // 读取文件内容
        let content = await readMarkdownFile(filePath)

        // 转换 Obsidian 图片语法
        content = convertObsidianImages(content)

        // 检查内容是否有效
        if (!hasValidContent(content)) {
            previewContainer.innerHTML = convertMarkdown(content).html
            updateButtonsState(false)
            navContainer.style.display = 'none'
            return
        }

        // 转换为小红书格式
        const result = convertMarkdown(content)
        previewContainer.innerHTML = result.html

        // 应用当前模板
        const templateId = templateSelect.value
        await applyCurrentTemplate(templateId)

        // 重新应用字体和字号设置以防止被重置（必须在分页计算前应用，以确保测量准确）
        reapplyFontSettings()

        // 检测并处理内容溢出，自动分页
        if (result.needsOverflowCheck) {
            // 等待 DOM 渲染完成（字体应用后需要一点时间生效？）
            // reapplyFontSettings 是同步的修改 style，所以应该是立即生效的。
            // 等待图片加载完成，确保高度计算准确
            await waitForImages(previewContainer)

            const newTotalSections = handleOverflowPagination(previewContainer)
            if (newTotalSections > 0) {
                totalSections = newTotalSections
                // 分页后重新应用模板样式（因为 handleOverflowPagination 重新创建了 section）
                await applyCurrentTemplate(templateId)
                reapplyFontSettings()
            } else {
                totalSections = result.sections
            }
        } else {
            totalSections = result.sections
        }

        if (!keepPage) {
            currentSectionIndex = 0
        } else {
            // 确保索引在有效范围内
            if (currentSectionIndex >= totalSections) {
                currentSectionIndex = totalSections - 1
            }
        }

        // 更新导航状态
        updateNavigationState()
        updateButtonsState(true)

    } catch (err) {
        console.error('读取文件失败:', err)
        previewContainer.innerHTML = `<div class="error-state">读取文件失败: ${err.message}</div>`
    }
}

// ... 

/**
 * 刷新当前文件预览
 */
async function handleRefresh() {
    if (currentFilePath) {
        await handleFileSelect(currentFilePath, true) // 保持页码
    }
}

/**
 * 应用当前模板
 */
async function applyCurrentTemplate(templateId) {
    const template = await loadTemplate(templateId)
    if (template) {
        const imagePreview = previewContainer.querySelector('.red-image-preview')
        if (imagePreview) {
            applyTemplate(imagePreview, template, getSettings())
        }
    }
}

/**
 * 更新导航状态
 */
function updateNavigationState() {
    if (totalSections <= 1) {
        navContainer.style.display = 'none'
        return
    }

    navContainer.style.display = 'flex'

    const sections = previewContainer.querySelectorAll('.red-content-section')
    sections.forEach((section, i) => {
        section.classList.toggle('red-section-active', i === currentSectionIndex)
    })

    prevBtn.disabled = currentSectionIndex === 0
    nextBtn.disabled = currentSectionIndex === totalSections - 1
    pageIndicator.textContent = `${currentSectionIndex + 1}/${totalSections}`
}

/**
 * 导航到其他页
 */
function navigateSection(delta) {
    const newIndex = currentSectionIndex + delta
    if (newIndex >= 0 && newIndex < totalSections) {
        currentSectionIndex = newIndex
        updateNavigationState()
    }
}

/**
 * 更新按钮状态
 */
function updateButtonsState(enabled) {
    downloadCurrentBtn.disabled = !enabled
    downloadAllBtn.disabled = !enabled
    refreshBtn.disabled = !enabled
}



/**
 * 下载当前页
 */
async function handleDownloadCurrent() {
    try {
        downloadCurrentBtn.disabled = true
        downloadCurrentBtn.textContent = '导出中...'

        await downloadSingleImage(previewContainer)

        downloadCurrentBtn.textContent = '导出成功'
    } catch (err) {
        console.error('导出失败:', err)
        downloadCurrentBtn.textContent = '导出失败'
    } finally {
        setTimeout(() => {
            downloadCurrentBtn.disabled = false
            downloadCurrentBtn.textContent = '下载当前页'
        }, 2000)
    }
}

/**
 * 下载全部页
 */
async function handleDownloadAll() {
    try {
        downloadAllBtn.disabled = true
        downloadAllBtn.textContent = '导出中...'

        await downloadAllImages(previewContainer)

        downloadAllBtn.textContent = '导出成功'
    } catch (err) {
        console.error('导出失败:', err)
        downloadAllBtn.textContent = '导出失败'
    } finally {
        setTimeout(() => {
            downloadAllBtn.disabled = false
            downloadAllBtn.textContent = '导出全部页'
        }, 2000)
    }
}

/**
 * 模板变更
 */
async function handleTemplateChange() {
    const templateId = templateSelect.value
    await applyCurrentTemplate(templateId)

    // 重新应用字体和字号设置
    reapplyFontSettings()
}

/**
 * 重新应用字体和字号设置
 */
function reapplyFontSettings() {
    const imagePreview = previewContainer.querySelector('.red-image-preview')
    if (!imagePreview) return

    // 应用字号
    const fontSize = parseInt(fontSizeValue.textContent) || 16
    imagePreview.style.setProperty('--content-font-size', `${fontSize}px`)
    imagePreview.querySelectorAll('p, li, td, th').forEach(el => {
        el.style.fontSize = `${fontSize}px`
    })

    // 应用字体
    const fontKey = fontFamilySelect.value
    const fontFamily = fontFamilyMap[fontKey] || fontFamilyMap.system
    imagePreview.style.fontFamily = fontFamily
    imagePreview.querySelectorAll('h1, h2, h3, p, li, td, th, blockquote').forEach(el => {
        el.style.fontFamily = fontFamily
    })
}

/**
 * 标题级别变更
 */
function handleHeadingLevelChange() {
    updateSettings({ headingLevel: headingLevelSelect.value })

    // 更新提示文案
    updateTipsText()

    // 如果已有文件打开，重新渲染
    if (currentFilePath) {
        handleFileSelect(currentFilePath)
    }
}

/**
 * 更新提示文案
 */
function updateTipsText() {
    const tipsText = document.getElementById('tipsText')
    const mode = headingLevelSelect.value

    const tips = {
        'none': '💡 不分割模式：内容从上到下连续排版',
        'h1': '💡 使用一级标题分割内容，每个标题生成一张图片',
        'h2': '💡 使用二级标题分割内容，每个标题生成一张图片',
        'h1,h2': '💡 使用一级+二级标题分割内容，每个标题生成一张图片'
    }

    if (tipsText) {
        tipsText.textContent = tips[mode] || tips['none']
    }
}

/**
 * 修改字号
 */
async function changeFontSize(delta) {
    const current = parseInt(fontSizeValue.textContent)
    const newSize = Math.min(30, Math.max(12, current + delta))
    fontSizeValue.textContent = newSize

    updateSettings({ fontSize: newSize })

    // 触发刷新以重新分页（分页计算需要基于新的字号）
    await handleRefresh()
}

/**
 * 修改字体
 */
function handleFontFamilyChange() {
    const fontKey = fontFamilySelect.value
    const fontFamily = fontFamilyMap[fontKey] || fontFamilyMap.system

    updateSettings({ fontFamily: fontKey })

    // 应用字体到预览区域
    const imagePreview = previewContainer.querySelector('.red-image-preview')
    if (imagePreview) {
        imagePreview.style.fontFamily = fontFamily

        // 直接应用到所有文字元素
        imagePreview.querySelectorAll('h1, h2, h3, p, li, td, th, blockquote').forEach(el => {
            el.style.fontFamily = fontFamily
        })
    }
}

/**
 * 等待容器内的所有图片加载完成
 * @param {HTMLElement} container 
 */
function waitForImages(container) {
    const images = Array.from(container.querySelectorAll('img'))
    const promises = images.map(img => {
        if (img.complete && img.naturalHeight > 0) {
            return Promise.resolve()
        }
        return new Promise(resolve => {
            img.onload = () => resolve()
            img.onerror = () => resolve() // 出错也继续，避免卡死
            // 设置超时，防止永久等待
            setTimeout(resolve, 3000)
        })
    })
    return Promise.all(promises)
}

// 启动应用
init()

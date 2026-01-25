/**
 * Markdown 转换器模块
 * 将 Markdown 内容转换为小红书风格的 HTML 结构
 */
import { marked } from 'marked'

// 当前设置
let currentSettings = {
    headingLevel: 'none',
    fontSize: 18,
    fontFamily: 'noto-serif',
    imageShadow: 'none'
}

/**
 * 更新设置
 */
export function updateSettings(settings) {
    currentSettings = { ...currentSettings, ...settings }
}

/**
 * 获取当前设置
 */
export function getSettings() {
    return currentSettings
}

// 预览区域的最大内容高度（基于容器高度 720px 减去实际的 padding）
function getMaxContentHeight(containerElement) {
    const imagePreview = containerElement?.querySelector('.red-image-preview')
    if (!imagePreview) return 648 // 结构主义主题的默认值作为后备

    const style = getComputedStyle(imagePreview)
    const paddingTop = parseFloat(style.paddingTop) || 0
    const paddingBottom = parseFloat(style.paddingBottom) || 0
    const containerHeight = 720 // red-preview-container 的固定高度

    return Math.floor(containerHeight - paddingTop - paddingBottom)
}

/**
 * 不分割模式转换：所有内容放入单个 section，后续由溢出分页逻辑处理
 * @param {HTMLElement} tempContainer 已解析的 HTML 容器
 * @returns {{html: string, sections: number, needsOverflowCheck: boolean}}
 */
function convertWithoutSplit(tempContainer) {
    // 创建预览结构
    const previewContainer = document.createElement('div')
    previewContainer.className = 'red-preview-container'

    const imagePreview = document.createElement('div')
    imagePreview.className = 'red-image-preview'

    const contentArea = document.createElement('div')
    contentArea.className = 'red-preview-content'

    const contentContainer = document.createElement('div')
    contentContainer.className = 'red-content-container'

    // 创建单个 section 包含所有内容
    const section = document.createElement('section')
    section.className = 'red-content-section red-section-active'
    section.dataset.index = '0'
    // 标记为不分割模式，标题作为普通内容处理
    section.dataset.splitMode = 'none'

    // 克隆所有内容
    Array.from(tempContainer.childNodes).forEach(node => {
        section.appendChild(node.cloneNode(true))
    })

    // 处理样式
    processElements(section)

    contentContainer.appendChild(section)
    contentArea.appendChild(contentContainer)
    imagePreview.appendChild(contentArea)
    previewContainer.appendChild(imagePreview)

    return {
        html: previewContainer.outerHTML,
        sections: 1,
        needsOverflowCheck: true // 需要溢出检测，超出一页时自动分页
    }
}

/**
 * 将 Markdown 转换为小红书风格的 HTML
 * @param {string} markdown
 * @returns {{html: string, sections: number, needsOverflowCheck: boolean}}
 */
export function convertMarkdown(markdown) {
    // 配置 marked 选项
    marked.use({
        breaks: true, // 回车换行
        gfm: true
    })

    // 预处理 Markdown：保留空行
    // 将连续的空行替换为 <br> 标签，以便在 HTML 中显示为空白占位
    const processedMarkdown = markdown.replace(/\n{2,}/g, (match) => {
        const count = match.length
        // 保留两个换行符作为段落分隔，其余的转换为 <br>
        if (count > 2) {
            return '\n\n' + '<br>'.repeat(count - 2) + '\n\n'
        }
        return match
    })

    // 先解析为 HTML
    const rawHtml = marked.parse(processedMarkdown)

    // 创建临时容器来解析 HTML
    const tempContainer = document.createElement('div')
    tempContainer.innerHTML = rawHtml

    // 不分割模式：所有内容放入单个 section
    if (currentSettings.headingLevel === 'none') {
        return convertWithoutSplit(tempContainer)
    }

    // 检查是否有标题（支持多级标题如 h1,h2）
    const headingSelector = currentSettings.headingLevel
    const headers = Array.from(tempContainer.querySelectorAll(headingSelector))
        .sort((a, b) => {
            // 按 DOM 顺序排序
            const position = a.compareDocumentPosition(b)
            return position & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
        })

    if (headers.length === 0) {
        return {
            html: createEmptyMessage(),
            sections: 0
        }
    }

    // 创建预览结构
    const previewContainer = document.createElement('div')
    previewContainer.className = 'red-preview-container'

    // 创建图片预览区域
    const imagePreview = document.createElement('div')
    imagePreview.className = 'red-image-preview'

    // 创建内容区域
    const contentArea = document.createElement('div')
    contentArea.className = 'red-preview-content'

    // 创建内容容器
    const contentContainer = document.createElement('div')
    contentContainer.className = 'red-content-container'

    // 处理文档开头（第一个标题之前）的内容
    let sectionCount = 0
    const firstHeader = headers[0]
    if (firstHeader) {
        const preambleContent = []
        let current = tempContainer.firstElementChild

        // 收集第一个标题之前的所有内容
        while (current && current !== firstHeader) {
            preambleContent.push(current.cloneNode(true))
            current = current.nextSibling
        }

        // 如果有开头内容，创建一个 section
        if (preambleContent.length > 0) {
            const preambleSection = document.createElement('section')
            preambleSection.className = 'red-content-section'
            preambleSection.dataset.index = '0'

            // 添加内容
            preambleContent.forEach(el => preambleSection.appendChild(el))

            // 处理样式
            processElements(preambleSection)

            contentContainer.appendChild(preambleSection)
            sectionCount++
        }
    }

    // 处理每个标题及其内容
    headers.forEach((header, index) => {
        const nextHeader = headers[index + 1] // 获取下一个标题作为边界
        const sections = createContentSections(header, index, nextHeader)
        sections.forEach(section => {
            contentContainer.appendChild(section)
            sectionCount++
        })
    })

    // 组装结构（无 header 和 footer）
    contentArea.appendChild(contentContainer)
    imagePreview.appendChild(contentArea)
    previewContainer.appendChild(imagePreview)

    return {
        html: previewContainer.outerHTML,
        sections: sectionCount,
        // 返回需要后续处理的标记
        needsOverflowCheck: true
    }
}

/**
 * 检测并处理溢出分页（需要在 DOM 渲染后调用）
 */
export function handleOverflowPagination(containerElement) {
    const sections = containerElement.querySelectorAll('.red-content-section')
    const newSections = []
    const MAX_CONTENT_HEIGHT = getMaxContentHeight(containerElement) // 动态计算最大内容高度

    sections.forEach((section, sectionIndex) => {
        // 检查是否为不分割模式
        const isNoSplitMode = section.dataset.splitMode === 'none'

        // 临时显示 section 以测量高度
        const wasActive = section.classList.contains('red-section-active')
        section.classList.add('red-section-active')
        section.style.visibility = 'hidden'
        section.style.position = 'absolute'

        // 获取标题元素（仅在非不分割模式下）
        const heading = isNoSplitMode ? null : section.querySelector('h1, h2, h3')
        const headingClone = heading ? heading.cloneNode(true) : null

        // 获取所有内容节点的副本
        // 不分割模式：标题作为普通内容保留；标题分割模式：排除标题
        const contentElements = Array.from(section.childNodes).filter(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                // 不分割模式下保留所有元素，标题分割模式下排除标题
                if (isNoSplitMode) {
                    return true
                }
                return !['H1', 'H2', 'H3'].includes(node.tagName)
            }
            return true
        })

        // 获取当前字体设置
        const imagePreview = containerElement.querySelector('.red-image-preview')
        const computedStyle = imagePreview ? getComputedStyle(imagePreview) : null
        const currentFontSize = computedStyle ? computedStyle.getPropertyValue('--content-font-size') || '16px' : '16px'
        const currentFontFamily = computedStyle ? computedStyle.fontFamily : 'inherit'

        // 创建测量容器
        const measureContainer = document.createElement('div')
        // 添加 class 以匹配样式的选择器（确保 p, li 等元素的 margin/line-height 正确）
        measureContainer.className = 'red-content-section red-section-active'
        measureContainer.style.cssText = `
      position: absolute;
      visibility: hidden;
      width: ${section.offsetWidth}px;
      padding: 0 10px;
      pointer-events: none;
      --content-font-size: ${currentFontSize};
      font-family: ${currentFontFamily};
    `
        document.body.appendChild(measureContainer)

        // 添加标题
        if (headingClone) {
            const titleClone = headingClone.cloneNode(true)
            // 复制标题的字体设置
            titleClone.style.fontFamily = currentFontFamily
            measureContainer.appendChild(titleClone)
        }

        let currentHeight = measureContainer.offsetHeight
        let currentPageElements = []
        let pageIndex = 0
        const pages = []

        // 逐个元素检测溢出
        contentElements.forEach((element, elemIndex) => {
            const elemClone = element.cloneNode(true)

            // 复制字体设置到克隆元素
            if (['P', 'LI', 'TD', 'TH'].includes(element.tagName)) {
                elemClone.style.fontSize = currentFontSize
                elemClone.style.fontFamily = currentFontFamily
            }

            // 关键修复：显式复制图片的尺寸，防止克隆节点未加载完成导致高度为0
            if (element.tagName === 'IMG') {
                const computedHeight = getComputedStyle(element).height
                const computedWidth = getComputedStyle(element).width
                elemClone.style.width = computedWidth
                elemClone.style.height = computedHeight
                elemClone.style.maxHeight = '400px' // 确保 max-height 约束
                elemClone.style.display = 'block'
            }
            // 也要处理嵌套在 div/p 中的图片
            const nestedImages = element.querySelectorAll ? element.querySelectorAll('img') : []
            if (nestedImages.length > 0) {
                const cloneImages = elemClone.querySelectorAll('img')
                nestedImages.forEach((img, i) => {
                    if (cloneImages[i]) {
                        cloneImages[i].style.width = getComputedStyle(img).width
                        cloneImages[i].style.height = getComputedStyle(img).height
                        cloneImages[i].style.maxHeight = '400px'
                        cloneImages[i].style.display = 'block'
                    }
                })
            }

            // 处理包含图片的段落
            if (element.tagName === 'P') {
                const imgs = elemClone.querySelectorAll('img')
                if (imgs.length > 0) {
                    // 移除图片之间的 <br> 标签
                    elemClone.querySelectorAll('br').forEach(br => br.remove())

                    // 检查段落是否只包含图片
                    const nonEmptyNodes = Array.from(elemClone.childNodes).filter(n => {
                        if (n.nodeType === Node.TEXT_NODE) {
                            return n.textContent.trim() !== ''
                        }
                        return n.tagName === 'IMG'
                    })

                    if (nonEmptyNodes.length > 0 && nonEmptyNodes.every(n => n.tagName === 'IMG')) {
                        elemClone.style.marginBottom = '0'
                    }
                }
            }

            measureContainer.appendChild(elemClone)

            // 强制重绘并测量
            const newHeight = measureContainer.offsetHeight

            if (newHeight > MAX_CONTENT_HEIGHT) {
                // 输出分页日志
                console.log(`[Pagination] 触发分页! Section ${sectionIndex}, Element ${elemIndex}:`, {
                    tagName: element.tagName,
                    textPreview: element.textContent?.substring(0, 30),
                    fontSize: currentFontSize,
                    elementHeight: elemClone.offsetHeight,
                    totalHeight: newHeight,
                    maxHeight: MAX_CONTENT_HEIGHT,
                    currentPageElementCount: currentPageElements.length
                })

                if (currentPageElements.length > 0) {
                    // 当前页面已满，保存并开始新页
                    pages.push([...currentPageElements])
                    currentPageElements = []

                    // 重置测量容器
                    measureContainer.innerHTML = ''
                    if (headingClone) {
                        const titleClone = headingClone.cloneNode(true)
                        titleClone.style.fontFamily = currentFontFamily
                        measureContainer.appendChild(titleClone)
                    }

                    // 重新克隆元素并添加到新页
                    const newElemClone = element.cloneNode(true)
                    // 复制字体设置
                    if (['P', 'LI', 'TD', 'TH'].includes(element.tagName)) {
                        newElemClone.style.fontSize = currentFontSize
                        newElemClone.style.fontFamily = currentFontFamily
                    }
                    // 重新应用图片尺寸
                    if (element.tagName === 'IMG') {
                        newElemClone.style.width = getComputedStyle(element).width
                        newElemClone.style.height = getComputedStyle(element).height
                        newElemClone.style.maxHeight = '400px'
                        newElemClone.style.display = 'block'
                    }
                    const nestedImgs = element.querySelectorAll ? element.querySelectorAll('img') : []
                    if (nestedImgs.length > 0) {
                        const cloneImgs = newElemClone.querySelectorAll('img')
                        nestedImgs.forEach((img, i) => {
                            if (cloneImgs[i]) {
                                cloneImgs[i].style.width = getComputedStyle(img).width
                                cloneImgs[i].style.height = getComputedStyle(img).height
                                cloneImgs[i].style.maxHeight = '400px'
                                cloneImgs[i].style.display = 'block'
                            }
                        })
                    }
                    // 处理包含图片的段落
                    if (element.tagName === 'P') {
                        const imgs = newElemClone.querySelectorAll('img')
                        if (imgs.length > 0) {
                            // 移除图片之间的 <br> 标签
                            newElemClone.querySelectorAll('br').forEach(br => br.remove())

                            // 检查段落是否只包含图片
                            const nonEmptyNodes = Array.from(newElemClone.childNodes).filter(n => {
                                if (n.nodeType === Node.TEXT_NODE) {
                                    return n.textContent.trim() !== ''
                                }
                                return n.tagName === 'IMG'
                            })

                            if (nonEmptyNodes.length > 0 && nonEmptyNodes.every(n => n.tagName === 'IMG')) {
                                newElemClone.style.marginBottom = '0'
                            }
                        }
                    }

                    measureContainer.appendChild(newElemClone)
                    currentPageElements.push(newElemClone)

                    // 检查单个元素是否仍然超出（元素本身太大）
                    const singleElemHeight = measureContainer.offsetHeight
                    if (singleElemHeight > MAX_CONTENT_HEIGHT) {
                        console.warn(`[Pagination] Element too tall (${singleElemHeight}px > ${MAX_CONTENT_HEIGHT}px), will overflow:`, element)
                        // 对于图片，尝试进一步限制高度（仅当是元素节点时）
                        const imgs = newElemClone.nodeType === Node.ELEMENT_NODE && newElemClone.querySelectorAll ? newElemClone.querySelectorAll('img') : []
                        if (imgs.length > 0 || (newElemClone.nodeType === Node.ELEMENT_NODE && newElemClone.tagName === 'IMG')) {
                            const availableHeight = MAX_CONTENT_HEIGHT - (headingClone ? headingClone.offsetHeight : 0) - 20
                            const targetImg = (newElemClone.nodeType === Node.ELEMENT_NODE && newElemClone.tagName === 'IMG') ? newElemClone : imgs[0]
                            if (targetImg) {
                                targetImg.style.maxHeight = `${availableHeight}px`
                                console.log(`[Pagination] Reduced image max-height to ${availableHeight}px`)
                            }
                        }
                    }
                    pageIndex++
                } else {
                    // 当前页是空的，但元素本身就超出了高度
                    console.warn(`[Pagination] First element too tall (${newHeight}px > ${MAX_CONTENT_HEIGHT}px):`, element)
                    // 对于图片，尝试限制高度（仅当是元素节点时）
                    const imgs = (elemClone.nodeType === Node.ELEMENT_NODE && elemClone.querySelectorAll) ? elemClone.querySelectorAll('img') : []
                    if (imgs.length > 0 || (elemClone.nodeType === Node.ELEMENT_NODE && elemClone.tagName === 'IMG')) {
                        const availableHeight = MAX_CONTENT_HEIGHT - (headingClone ? measureContainer.querySelector('h1, h2, h3')?.offsetHeight || 0 : 0) - 20
                        const targetImg = (elemClone.nodeType === Node.ELEMENT_NODE && elemClone.tagName === 'IMG') ? elemClone : imgs[0]
                        if (targetImg) {
                            targetImg.style.maxHeight = `${availableHeight}px`
                            console.log(`[Pagination] Reduced image max-height to ${availableHeight}px`)
                        }
                    }
                    currentPageElements.push(elemClone)
                }
            } else {
                currentPageElements.push(elemClone)
            }
        })

        // 添加最后一页
        if (currentPageElements.length > 0) {
            pages.push(currentPageElements)
        }

        // 清理测量容器
        document.body.removeChild(measureContainer)

        // 恢复原始状态
        section.style.visibility = ''
        section.style.position = ''
        if (!wasActive) {
            section.classList.remove('red-section-active')
        }

        // 过滤掉只有空白内容的页面
        const validPages = pages.filter((pageContent, index) => {
            // 递归检查是否包含实质内容
            const hasSubstantial = pageContent.some(node => hasSubstantialContent(node))

            // Debug Log
            if (!hasSubstantial) {
                console.log(`[Pagination] Dropping empty page ${index} in section ${sectionIndex}. Content nodes:`, pageContent)
            }
            return hasSubstantial
        })

        // 如果所有页面都被过滤掉了，这个 section 本身就是空的，不创建任何页
        if (validPages.length === 0) {
            newSections.push({ original: section, pages: null, isEmpty: true })
            return
        }

        // 如果只有一页，不需要修改
        if (validPages.length <= 1) {
            newSections.push({ original: section, pages: null })
            return
        }

        // 需要分页
        newSections.push({
            original: section,
            pages: validPages,
            heading: headingClone,
            baseIndex: section.dataset.index
        })
    })

    // 应用分页结果
    let totalSections = 0
    newSections.forEach(({ original, pages, heading, baseIndex, isEmpty }) => {
        if (isEmpty) {
            // 空 section，直接移除
            const parent = original.parentElement
            if (parent) {
                parent.removeChild(original)
            }
            return
        }

        if (!pages) {
            // 不需要分页，更新 index
            original.dataset.index = String(totalSections)
            if (totalSections === 0) {
                original.classList.add('red-section-active')
            } else {
                original.classList.remove('red-section-active')
            }
            totalSections++
            return
        }

        // 需要分页，创建新的 sections
        const parent = original.parentElement
        const isNoSplitMode = original.dataset.splitMode === 'none'

        pages.forEach((pageElements, pageIdx) => {
            const newSection = document.createElement('section')
            newSection.className = 'red-content-section'
            newSection.dataset.index = String(totalSections)
            // 继承 splitMode 属性
            if (isNoSplitMode) {
                newSection.dataset.splitMode = 'none'
            }

            if (totalSections === 0) {
                newSection.classList.add('red-section-active')
            }

            // 添加标题（仅在非不分割模式下）
            if (heading) {
                newSection.appendChild(heading.cloneNode(true))
            }

            // 添加内容元素
            pageElements.forEach(el => newSection.appendChild(el))

            // 处理样式
            processElements(newSection)

            parent.insertBefore(newSection, original)
            totalSections++
        })

        // 移除原始 section
        parent.removeChild(original)
    })

    return totalSections
}

/**
 * 为单个标题创建内容区块
 */
function createContentSections(header, index, nextHeader) {
    const sections = []

    // 收集标题后的内容直到下一个同级标题
    const content = []
    let current = header.nextSibling // 使用 nextSibling

    while (current && current !== nextHeader) {
        content.push(current.cloneNode(true))
        current = current.nextSibling
    }

    // 检查是否有分割线
    const pages = [[]]
    let currentPage = 0

    content.forEach(el => {
        if (el.tagName === 'HR') {
            currentPage++
            pages[currentPage] = []
        } else {
            if (!pages[currentPage]) {
                pages[currentPage] = []
            }
            pages[currentPage].push(el)
        }
    })

    // 为每个页面创建 section
    pages.forEach((pageContent, pageIndex) => {
        if (pageContent.length === 0 && pages.length > 1) return

        const section = document.createElement('section')
        section.className = 'red-content-section'
        section.dataset.index = pages.length > 1 ? `${index}-${pageIndex}` : `${index}`

        // 添加标题
        const titleClone = header.cloneNode(true)
        section.appendChild(titleClone)

        // 添加内容
        pageContent.forEach(el => section.appendChild(el))

        // 处理样式
        processElements(section)

        sections.push(section)
    })

    return sections
}

/**
 * 处理元素样式
 */
function processElements(container) {
    // 处理强调文本
    container.querySelectorAll('strong, em').forEach(el => {
        el.classList.add('red-emphasis')
    })

    // 处理链接
    container.querySelectorAll('a').forEach(el => {
        el.classList.add('red-link')
    })

    // 处理代码块
    container.querySelectorAll('pre code').forEach(el => {
        const pre = el.parentElement
        if (pre) {
            pre.classList.add('red-pre')

            // 添加 macOS 风格的窗口按钮
            const dots = document.createElement('div')
            dots.className = 'red-code-dots'

                ;['red', 'yellow', 'green'].forEach(color => {
                    const dot = document.createElement('span')
                    dot.className = `red-code-dot red-code-dot-${color}`
                    dots.appendChild(dot)
                })

            pre.insertBefore(dots, pre.firstChild)
        }
    })

    // 处理行内代码
    container.querySelectorAll('code').forEach(el => {
        if (!el.parentElement?.classList.contains('red-pre')) {
            el.classList.add('red-inline-code')
        }
    })

    // 处理引用块
    container.querySelectorAll('blockquote').forEach(el => {
        el.classList.add('red-blockquote')
    })

    // 处理图片
    container.querySelectorAll('img').forEach(el => {
        el.classList.add('red-image')
        // 确保 max-height 限制
        el.style.maxHeight = '400px'
    })

    // 处理包含图片的段落
    container.querySelectorAll('p').forEach(p => {
        const imgs = p.querySelectorAll('img')
        if (imgs.length === 0) return

        // 移除图片之间的 <br> 标签
        p.querySelectorAll('br').forEach(br => br.remove())

        // 检查段落是否只包含图片（移除空白文本后）
        const nonEmptyNodes = Array.from(p.childNodes).filter(n => {
            if (n.nodeType === Node.TEXT_NODE) {
                return n.textContent.trim() !== ''
            }
            return true // 保留所有元素节点
        })

        const onlyImages = nonEmptyNodes.length > 0 && nonEmptyNodes.every(n => n.tagName === 'IMG')

        if (onlyImages) {
            // 纯图片段落：移除 margin，拆分多图
            p.style.marginBottom = '0'

            if (imgs.length > 1) {
                const parent = p.parentElement
                const imgArray = Array.from(imgs)
                let insertAfter = p

                imgArray.forEach((img, index) => {
                    if (index === 0) {
                        p.innerHTML = ''
                        p.appendChild(img)
                    } else {
                        const newP = document.createElement('p')
                        newP.style.marginBottom = '0'
                        newP.appendChild(img)
                        if (insertAfter.nextSibling) {
                            parent.insertBefore(newP, insertAfter.nextSibling)
                        } else {
                            parent.appendChild(newP)
                        }
                        insertAfter = newP
                    }
                })
            }
        } else {
            // 混合段落（文字 + 图片）：按原始顺序拆分为多个 <p>
            const parent = p.parentElement
            const childNodes = Array.from(p.childNodes)
            const newElements = []
            let currentTextContent = ''

            // 辅助函数：将累积的文本内容生成 <p>
            const flushText = () => {
                const trimmed = currentTextContent.trim()
                if (trimmed) {
                    const textP = document.createElement('p')
                    textP.textContent = trimmed
                    newElements.push(textP)
                }
                currentTextContent = ''
            }

            // 遍历所有子节点，按顺序处理
            childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    // 文本节点：累积到当前文本块
                    currentTextContent += node.textContent
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.tagName === 'IMG') {
                        // 图片节点：先输出之前累积的文本，再输出图片
                        flushText()
                        const imgP = document.createElement('p')
                        imgP.style.marginBottom = '0'
                        imgP.appendChild(node.cloneNode(true))
                        newElements.push(imgP)
                    } else if (node.tagName === 'BR') {
                        // <br> 作为文本块分隔符
                        flushText()
                    } else {
                        // 其他元素（如 <strong>, <em> 等）：获取其文本内容
                        currentTextContent += node.textContent
                    }
                }
            })

            // 处理剩余的文本内容
            flushText()

            // 用新元素替换原始段落
            if (newElements.length > 0) {
                let insertAfter = p
                newElements.forEach((el, index) => {
                    if (index === 0) {
                        // 第一个元素替换原段落
                        parent.replaceChild(el, p)
                        insertAfter = el
                    } else {
                        // 后续元素插入到前一个元素之后
                        if (insertAfter.nextSibling) {
                            parent.insertBefore(el, insertAfter.nextSibling)
                        } else {
                            parent.appendChild(el)
                        }
                        insertAfter = el
                    }
                })
            }
        }
    })

    // 处理列表
    container.querySelectorAll('ul, ol').forEach(el => {
        el.classList.add('red-list')
    })

    // 处理表格
    container.querySelectorAll('table').forEach(el => {
        el.classList.add('red-table')
    })
}

/**
 * 创建空状态消息
 */
function createEmptyMessage() {
    const headingText = currentSettings.headingLevel === 'h1' ? '一级标题(#)' : '二级标题(##)'
    return `
    <div class="red-empty-message">
      ⚠️ 温馨提示<br><br>
      请使用${headingText}来分割内容<br>
      每个标题将生成一张独立的图片
    </div>
  `
}

/**
 * 检查内容是否有效
 */
export function hasValidContent(markdown) {
    // 不分割模式：只要有内容就有效
    if (currentSettings.headingLevel === 'none') {
        const trimmed = markdown.trim()
        return trimmed.length > 0
    }

    // 标题分割模式：需要有对应的标题
    const rawHtml = marked.parse(markdown)
    const tempContainer = document.createElement('div')
    tempContainer.innerHTML = rawHtml

    const headers = tempContainer.querySelectorAll(currentSettings.headingLevel)
    return headers.length > 0
}

/**
 * 递归检查节点是否包含实质内容
 * @param {Node} node 
 * @returns {boolean}
 */
function hasSubstantialContent(node) {
    if (!node) return false

    // 文本节点：去除空白字符后是否有长度
    if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.trim().length > 0
    }

    // 元素节点
    if (node.nodeType === Node.ELEMENT_NODE) {
        const tagName = node.tagName.toUpperCase()

        // 视为空白的标签
        if (tagName === 'BR') return false

        // 具有固有内容的标签（无论内部是否有文本）
        const intrinsicContentTags = ['IMG', 'TABLE', 'HR', 'IFRAME', 'VIDEO', 'AUDIO', 'CANVAS', 'SVG', 'INPUT', 'BUTTON', 'SELECT', 'TEXTAREA']
        if (intrinsicContentTags.includes(tagName)) {
            return true
        }

        // 其他容器标签 (P, DIV, UL, LI, BLOCKQUOTE, PRE, SPAN, B, STRONG, etc.)
        // 递归检查其子节点
        const children = Array.from(node.childNodes)
        return children.some(child => hasSubstantialContent(child))
    }

    return false
}

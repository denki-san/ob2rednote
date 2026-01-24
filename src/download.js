/**
 * 下载管理器模块
 * 使用 html-to-image 导出图片
 */
import * as htmlToImage from 'html-to-image'
import JSZip from 'jszip'

/**
 * 获取导出配置
 */
function getExportConfig() {
    return {
        quality: 1,
        pixelRatio: 4,
        skipFonts: false,
        filter: (node) => true,
        imagePlaceholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
    }
}

/**
 * 下载当前显示的单张图片
 */
export async function downloadSingleImage(previewElement) {
    const imageElement = previewElement.querySelector('.red-image-preview')
    if (!imageElement) {
        throw new Error('找不到预览区域')
    }

    // 等待渲染完成
    await new Promise(resolve => setTimeout(resolve, 300))

    try {
        const blob = await htmlToImage.toBlob(imageElement, getExportConfig())

        if (!blob) throw new Error('Blob 对象为空')

        downloadBlob(blob, `小红书笔记_${Date.now()}.png`)
    } catch (err) {
        console.warn('导出失败，尝试备用方法', err)

        // 备用方法：使用 toCanvas
        const canvas = await htmlToImage.toCanvas(imageElement, getExportConfig())
        canvas.toBlob((blob) => {
            if (!blob) throw new Error('Canvas 转换失败')
            downloadBlob(blob, `小红书笔记_${Date.now()}.png`)
        }, 'image/png', 1)
    }
}

/**
 * 下载所有页面为 ZIP
 */
export async function downloadAllImages(previewElement) {
    const zip = new JSZip()
    const previewContainer = previewElement.querySelector('.red-preview-container')

    if (!previewContainer) {
        throw new Error('找不到预览容器')
    }

    const sections = previewContainer.querySelectorAll('.red-content-section')
    const totalSections = sections.length

    // 保存原始可见状态
    const originalVisibility = Array.from(sections).map(section => ({
        visible: section.classList.contains('red-section-visible'),
        hidden: section.classList.contains('red-section-hidden'),
        active: section.classList.contains('red-section-active')
    }))

    for (let i = 0; i < totalSections; i++) {
        // 隐藏所有，只显示当前页
        sections.forEach(section => {
            section.classList.add('red-section-hidden')
            section.classList.remove('red-section-visible', 'red-section-active')
        })

        sections[i].classList.remove('red-section-hidden')
        sections[i].classList.add('red-section-visible', 'red-section-active')

        // 等待渲染
        await new Promise(resolve => setTimeout(resolve, 300))

        const imageElement = previewElement.querySelector('.red-image-preview')

        try {
            const blob = await htmlToImage.toBlob(imageElement, getExportConfig())
            if (blob instanceof Blob) {
                zip.file(`小红书笔记_第${i + 1}页.png`, blob)
            }
        } catch (err) {
            console.warn(`第${i + 1}页导出失败，尝试备用方法`, err)
            try {
                const canvas = await htmlToImage.toCanvas(imageElement, getExportConfig())
                const blob = await new Promise((resolve, reject) => {
                    canvas.toBlob((b) => {
                        if (b) resolve(b)
                        else reject(new Error('Canvas 转换失败'))
                    }, 'image/png', 1)
                })
                zip.file(`小红书笔记_第${i + 1}页.png`, blob)
            } catch (canvasErr) {
                console.error(`第${i + 1}页导出失败`, canvasErr)
            }
        }
    }

    // 恢复原始状态
    sections.forEach((section, index) => {
        section.classList.toggle('red-section-visible', originalVisibility[index].visible)
        section.classList.toggle('red-section-hidden', originalVisibility[index].hidden)
        section.classList.toggle('red-section-active', originalVisibility[index].active)
    })

    // 如果没有任何状态，恢复第一个为活动状态
    if (!originalVisibility.some(v => v.active)) {
        sections[0]?.classList.add('red-section-active')
        sections[0]?.classList.remove('red-section-hidden')
    }

    // 生成 ZIP 并下载
    const content = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 9 }
    })

    downloadBlob(content, `小红书笔记_${Date.now()}.zip`)
}

/**
 * 下载 Blob 文件
 */
function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}

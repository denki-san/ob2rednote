/**
 * 文件管理器模块
 * 使用 File System Access API 读取本地 Obsidian 文件夹
 */

// 存储文件句柄和资源映射
let directoryHandle = null
let fileHandles = new Map()     // 文件名 -> FileHandle
let imageBlobs = new Map()      // 图片名 -> Blob URL

/**
 * 打开文件夹选择对话框
 * @returns {Promise<{mdFiles: string[], folderName: string}>}
 */
export async function selectFolder() {
    try {
        directoryHandle = await window.showDirectoryPicker({
            mode: 'read'
        })

        // 清空之前的缓存
        fileHandles.clear()
        revokeImageBlobs()

        // 递归扫描文件夹
        await scanDirectory(directoryHandle, '')

        // 获取所有 .md 文件
        const mdFiles = Array.from(fileHandles.keys())
            .filter(name => name.endsWith('.md'))
            .sort()

        return {
            mdFiles,
            folderName: directoryHandle.name
        }
    } catch (err) {
        if (err.name === 'AbortError') {
            // 用户取消选择
            return null
        }
        throw err
    }
}

/**
 * 处理传统的文件夹选择列表 (webkitdirectory)
 * @param {FileList|File[]} files 
 * @returns {Promise<{mdFiles: string[], folderName: string}>}
 */
export async function handleLegacyFolderSelection(files) {
    // 清空之前的缓存
    fileHandles.clear()
    revokeImageBlobs()

    let folderName = '已选择文件夹'

    for (const file of files) {
        // webkitRelativePath 包含了文件夹路径
        const path = file.webkitRelativePath
        if (!path) continue

        // 提取根文件夹名
        if (folderName === '已选择文件夹') {
            folderName = path.split('/')[0]
        }

        // 去掉根路径
        const relativePath = path.substring(path.indexOf('/') + 1)
        if (!relativePath) continue

        // 跳过隐藏目录中的文件
        if (relativePath.split('/').some(part => part.startsWith('.'))) continue

        // 存储文件引用
        fileHandles.set(relativePath, file)

        // 如果是图片，预加载为 Blob URL
        if (isImageFile(file.name)) {
            try {
                const blobUrl = URL.createObjectURL(file)
                imageBlobs.set(file.name, blobUrl)
                imageBlobs.set(relativePath, blobUrl)
                console.log(`✅ 加载图片 (Legacy): ${file.name} (路径: ${relativePath})`)
            } catch (e) {
                console.warn(`无法加载图片: ${relativePath}`, e)
            }
        }
    }

    // 获取所有 .md 文件
    const mdFiles = Array.from(fileHandles.keys())
        .filter(name => name.endsWith('.md'))
        .sort()

    return {
        mdFiles,
        folderName
    }
}

/**
 * 递归扫描目录
 */
async function scanDirectory(dirHandle, basePath) {
    for await (const entry of dirHandle.values()) {
        const entryPath = basePath ? `${basePath}/${entry.name}` : entry.name

        if (entry.kind === 'file') {
            fileHandles.set(entryPath, entry)

            // 如果是图片，预加载为 Blob URL
            if (isImageFile(entry.name)) {
                try {
                    const file = await entry.getFile()
                    const blobUrl = URL.createObjectURL(file)
                    // 存储多种可能的引用方式
                    imageBlobs.set(entry.name, blobUrl)
                    imageBlobs.set(entryPath, blobUrl)
                    console.log(`✅ 加载图片: ${entry.name} (路径: ${entryPath})`)
                } catch (e) {
                    console.warn(`无法加载图片: ${entryPath}`, e)
                }
            }
        } else if (entry.kind === 'directory') {
            // 跳过隐藏目录
            if (!entry.name.startsWith('.')) {
                await scanDirectory(entry, entryPath)
            }
        }
    }
}

/**
 * 判断是否为图片文件
 */
function isImageFile(filename) {
    const ext = filename.toLowerCase().split('.').pop()
    return ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'bmp'].includes(ext)
}

/**
 * 读取 Markdown 文件内容
 * @param {string} filePath 
 * @returns {Promise<string>}
 */
export async function readMarkdownFile(filePath) {
    const file = fileHandles.get(filePath)
    if (!file) {
        throw new Error(`文件不存在: ${filePath}`)
    }

    // 处理 FileSystemFileHandle 和 File 对象
    if (file.getFile) {
        const f = await file.getFile()
        return await f.text()
    }
    return await file.text()
}

/**
 * 将 Obsidian 风格的图片引用转换为标准 Markdown
 * ![[image.png]] -> ![](blob:url)
 * ![[image.png|alt text]] -> ![alt text](blob:url)
 */
export function convertObsidianImages(content) {
    // 匹配 ![[filename]] 或 ![[filename|alt]]
    const obsidianImageRegex = /!\[\[([^\]|]+)(?:\|([^\]]*))?\]\]/g

    return content.replace(obsidianImageRegex, (match, filename, alt) => {
        // 尝试找到图片的 Blob URL
        let blobUrl = findImageBlobUrl(filename)

        if (blobUrl) {
            const altText = alt || filename
            return `![${altText}](${blobUrl})`
        }

        // 找不到图片，返回占位符
        console.warn(`找不到图片: ${filename}`)
        return `![${alt || filename}]()`
    })
}

/**
 * 灵活查找图片 Blob URL
 */
function findImageBlobUrl(filename) {
    console.log(`🔍 查找图片: "${filename}"`)

    // 1. 直接匹配
    if (imageBlobs.has(filename)) {
        console.log(`✅ 直接匹配成功`)
        return imageBlobs.get(filename)
    }

    // 2. 提取纯文件名（去掉路径）
    const baseName = filename.split('/').pop()
    console.log(`📝 提取文件名: "${baseName}"`)

    // 3. 遍历所有已加载的图片，进行模糊匹配
    console.log(`📋 已加载的图片列表:`, Array.from(imageBlobs.keys()))

    for (const [key, url] of imageBlobs.entries()) {
        const keyBaseName = key.split('/').pop()

        // 完全匹配文件名
        if (keyBaseName === baseName) {
            console.log(`✅ 文件名完全匹配: "${keyBaseName}"`)
            return url
        }

        // 忽略大小写匹配
        if (keyBaseName.toLowerCase() === baseName.toLowerCase()) {
            console.log(`✅ 忽略大小写匹配: "${keyBaseName}"`)
            return url
        }
    }

    // 4. 部分匹配（处理空格或特殊字符差异）
    const normalizedName = baseName.replace(/\s+/g, '').toLowerCase()
    for (const [key, url] of imageBlobs.entries()) {
        const keyBaseName = key.split('/').pop()
        const normalizedKey = keyBaseName.replace(/\s+/g, '').toLowerCase()

        if (normalizedKey === normalizedName) {
            console.log(`✅ 归一化匹配: "${keyBaseName}"`)
            return url
        }
    }

    console.log(`❌ 未找到匹配的图片`)
    return null
}

/**
 * 释放所有 Blob URL
 */
export function revokeImageBlobs() {
    for (const url of imageBlobs.values()) {
        URL.revokeObjectURL(url)
    }
    imageBlobs.clear()
}

/**
 * 获取图片 Blob URL
 */
export function getImageBlobUrl(filename) {
    return imageBlobs.get(filename)
}

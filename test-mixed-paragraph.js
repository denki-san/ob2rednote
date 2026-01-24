/**
 * 混合段落渲染测试
 * 运行: node --experimental-vm-modules test-mixed-paragraph.js
 */
import { JSDOM } from 'jsdom'

// 模拟 DOM 环境
const dom = new JSDOM('<!DOCTYPE html><html><body><div id="container"></div></body></html>')
global.document = dom.window.document
global.Node = dom.window.Node

// 导入转换器逻辑（简化版，提取关键测试逻辑）
function testMixedParagraph() {
  const container = document.getElementById('container')

  // 模拟问题 markdown 结构
  const html = `
    <p>
      进入账号管理-付款和订阅<br>
      <img src="img1.png"><br>
      添加一张 VISA、MasterCard 等外币卡，地址选择和归属地一致。如图，以米国为例<br>
      <img src="img2.png">
    </p>
  `
  container.innerHTML = html

  console.log('=== 测试前 HTML ===')
  console.log(container.innerHTML)

  // 修复后的处理逻辑
  container.querySelectorAll('p').forEach(p => {
    const imgs = p.querySelectorAll('img')
    if (imgs.length === 0) return

    const parent = p.parentElement
    const childNodes = Array.from(p.childNodes)
    const newElements = []
    let currentTextContent = ''

    const flushText = () => {
      const trimmed = currentTextContent.trim()
      if (trimmed) {
        const textP = document.createElement('p')
        textP.textContent = trimmed
        newElements.push(textP)
      }
      currentTextContent = ''
    }

    childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        currentTextContent += node.textContent
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === 'IMG') {
          flushText()
          const imgP = document.createElement('p')
          imgP.style.marginBottom = '0'
          imgP.appendChild(node.cloneNode(true))
          newElements.push(imgP)
        } else if (node.tagName === 'BR') {
          flushText()
        } else {
          currentTextContent += node.textContent
        }
      }
    })

    flushText()

    if (newElements.length > 0) {
      let insertAfter = p
      newElements.forEach((el, index) => {
        if (index === 0) {
          parent.replaceChild(el, p)
          insertAfter = el
        } else {
          if (insertAfter.nextSibling) {
            parent.insertBefore(el, insertAfter.nextSibling)
          } else {
            parent.appendChild(el)
          }
          insertAfter = el
        }
      })
    }
  })

  console.log('\n=== 测试后 HTML ===')
  console.log(container.innerHTML)

  // 验证
  const paragraphs = container.querySelectorAll('p')
  console.log(`\n=== 验证结果 ===`)
  console.log(`段落数量: ${paragraphs.length}`)

  let textCount = 0
  let imgCount = 0

  paragraphs.forEach((p, i) => {
    if (p.querySelector('img')) {
      console.log(`段落 ${i + 1}: [图片]`)
      imgCount++
    } else {
      const text = p.textContent.substring(0, 30)
      console.log(`段落 ${i + 1}: "${text}..."`)
      textCount++
    }
  })

  // 检查关键文字是否存在
  const fullText = container.textContent
  const hasKeyText = fullText.includes('添加一张 VISA、MasterCard 等外币卡')

  console.log(`\n文字段落数: ${textCount}`)
  console.log(`图片段落数: ${imgCount}`)
  console.log(`关键文字存在: ${hasKeyText ? '✅' : '❌'}`)

  if (textCount >= 2 && imgCount >= 2 && hasKeyText) {
    console.log('\n✅ 测试通过!')
  } else {
    console.log('\n❌ 测试失败!')
  }
}

testMixedParagraph()

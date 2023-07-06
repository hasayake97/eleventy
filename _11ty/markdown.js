/**
 * @name: markdown 解析实例
 * @date: 2023-07-05 14:25:21
 * @authors: rocky
 * @email: rocky@mogul-tech.com
 * @path: helper\markdown.js
 */
const uslug = require('uslug')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')

const linkOpen = md => {
  const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const token = tokens[idx]
    const hrefIndex = token.attrIndex('href')
    if (hrefIndex >= 0) {
      // 添加 target="_blank" 属性
      const hrefAttr = token.attrs[hrefIndex]
      if (hrefAttr[1].endsWith('___newtab___')) {
        hrefAttr[1] = hrefAttr[1].replace(/___newtab___/gi, '')
        token.attrs.push(['target', '_blank'])
      }
    }

    // 调用原始的渲染链接方法
    return defaultRender(tokens, idx, options, env, self)
  }
}

const main = () => {
  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  })

  // 锚点定义
  md.use(markdownItAnchor, {
    slugify: uslug,
  })

  // 自定义链接打开方式
  md.use(md => {
    linkOpen(md)
  })

  return md
}

module.exports = main()

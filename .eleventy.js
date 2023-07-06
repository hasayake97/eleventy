/**
 * @name: eleventy.js
 * @date: 2023-07-03 11:43:01
 * @authors: rocky
 * @email: rocky@mogul-tech.com
 * @path: .eleventy.js
 */

const _11ty = require('./_11ty')

// 添加插件
const addPlugin = config => {
  const plugins = [
    require('eleventy-plugin-nesting-toc'),
    require('@11ty/eleventy-plugin-syntaxhighlight')
  ]

  plugins.forEach(plugin => config.addPlugin(plugin))
}

// 添加直通目录
const addPath = config => {
  const path = ['src/js', 'src/styles', 'src/assets']

  path.forEach(path => config.addPassthroughCopy(path))
}

module.exports = eleventyConfig => {
  addPath(eleventyConfig)

  addPlugin(eleventyConfig)

  eleventyConfig.setLibrary('md', _11ty.markdown)

  eleventyConfig.addCollection('menu', _11ty.menu)

  eleventyConfig.on('afterBuild', _11ty.searchIndex)

  return {
    pathPrefix: '/',

    dir: {
      input: 'src'
    }
  }
}

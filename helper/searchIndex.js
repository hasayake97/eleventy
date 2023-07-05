/**
 * @name: 全站搜索
 * @date: 2023-07-05 15:46:04
 * @authors: rocky
 * @email: rocky@mogul-tech.com
 * @path: helper\searchIndex.js
 */

const fs = require('fs')

module.exports = eleventyConfig => {
  eleventyConfig.on('afterBuild', function(list) {
    const fileContent = list.results.map(item => ({
      id: item.url,
      content: item.content,
      title: item.content.match(/<title>(.*)<\/title>/)[1]
    }))

    fs.writeFileSync('./_site/searchIndex.json', JSON.stringify(fileContent))
  })
}

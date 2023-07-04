/**
 * @name: getMarkdownList
 * @date: 2023-07-04 13:46:21
 * @authors: rocky
 * @email: rocky@mogul-tech.com
 * @path: helper\getMarkdownList.js
 */

const getDIR = path => path.match(/\/([^/]+)\/[^/]+$/)[1]

module.exports = api => {
  const markdownFiles = api.getFilteredByGlob('src/post/**/*.md')

  const before = markdownFiles.reduce((before, file) => {
    const { filePathStem } = file
    const dir = getDIR(filePathStem)

    if (dir in before) { before[dir].push(file) }

    if (!(dir in before)) { before[dir] = [file] }

    return before
  }, [])

  const after = Object.keys(before).reduce((output, key) => {
    const index = before[key].findIndex(file => file.filePathStem.includes('index'))
    const indexFile = before[key][index]
    ;[before[key][0], before[key][index]] = [before[key][index], before[key][0]]
    output[key] = {
      title: indexFile.data.pTitle || '未设置',
      url: indexFile.data.page.url,
      children: before[key].map(file => ({
        title: file.data.title,
        url: file.data.page.url
      }))
    }

    return output
  }, {})



  const result = {
    getChildren: key => after[key]?.children || [],
    nav: Object.keys(after).map(key => ({ title: after[key].title, url: after[key].url })),
  }

  return result
}

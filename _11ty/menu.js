/**
 * @name: getMarkdownList
 * @date: 2023-07-04 13:46:21
 * @authors: rocky
 * @email: rocky@mogul-tech.com
 * @path: helper\getMarkdownList.js
 */


const removePrefix = path => path.replace(/\/(post|index)\/?/g, '')

const pathParser = path => path.split('/')

// 获取扁平化数组
const getFlatArray = files => {
  return files.map(file => {
    const keys = pathParser(removePrefix(file.filePathStem))

    return {
      id: keys.pop(),
      getFile: () => file,
      title: file.data.title,
      url: file.data.page.url,
      parent: keys.pop() || null,
    }
  })
}

// 将扁平化数组构建为一棵 tree
const buildTree = (flatArray, parent = null) => {
  const tree = []

  for (const item of flatArray) {
    if (item.parent === parent) {
      const children = buildTree(flatArray, item.id)
      if (children.length) {
        item.children = children
      }

      tree.push(item)
    }
  }

  return tree
}

module.exports = api => {
  const markdownFiles = api.getFilteredByGlob('src/post/**/*.md')

  const tree = buildTree(getFlatArray(markdownFiles))

  return {
    getTree: key => ([tree.find(item => item.id === key)]),
    nav: Object.keys(tree).map(key => {
      const current = tree[key]
      return ({
        url: current.url,
        title: current.getFile().data.moduleName
      })
    }),
  }
}

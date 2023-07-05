/**
 * @name: global.js
 * @date: 2023-07-05 17:44:14
 * @authors: rocky
 * @email: rocky@mogul-tech.com
 * @path: src\js\global.js
 */

;(function() {
  const htmlTokenizer = function (obj, metadata) {
    if (!obj || typeof obj !== 'string') return []

    // 去除 HTML 标签
    const cleanText = obj.replace(/(\/|>|<|<.*>|<\/.*>)/g, '')

    // 使用默认分词器对文本进行分词
    return lunr.tokenizer(cleanText, metadata)
  }

  const getSearchIndexJson = () => {
    return fetch('/searchIndex.json')
      .then(response => response.json())
      .then(data => {
        return lunr(function() {
          this.tokenizer = htmlTokenizer
          this.ref('id')
          this.field('title', { boost: 10 })
          this.field('content')

          data.forEach(item => {
            console.log(item, 'item')

            this.add(item)
          })
        })
      })
  }

  const searchInputBind = searchIndex => {
    const input = document.querySelector('#search')

    input.addEventListener('change', e => {
      console.log(searchIndex.search(e.target.value))
    }, false)
  }

  window.onload = () => {
    getSearchIndexJson().then(searchIndex => {
      console.log(searchIndex, 'ser')
      searchInputBind(searchIndex)
    })
  }

})(window)


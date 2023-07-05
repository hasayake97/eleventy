/**
 * @name: global.js
 * @date: 2023-07-05 17:44:14
 * @authors: rocky
 * @email: rocky@mogul-tech.com
 * @path: src\js\global.js
 */

;(function() {
  const getSearchIndexJson = () => {
    return fetch('/searchIndex.json')
      .then(response => response.json())
      .then(data => {
        return lunr(function() {
          this.field('content')
          this.ref('id')

          data.forEach(item => {
            this.add({
              id: item.id,
              content: item.content
            })
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


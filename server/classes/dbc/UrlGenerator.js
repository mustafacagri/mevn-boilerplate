const slug = require('slug')

async function UrlGenerator(url, document) {
  url = slug(url) // let's slug it before we start
  const currentDoc = require(`../../models/${document}`)
  let tempUrl = url
  cur = 0
  check = false

  while (!check && cur < 10) {
    const data = await currentDoc.findOne({ url: tempUrl })

    if (!data) {
      check = true
    } else {
      cur++
      tempUrl = `${url}-${cur}`
    }
  }

  if (cur === 10) {
    const d = new Date()
    tempUrl += '-' + d.getTime() // if we try it more than 10, we will give up to find an url and we will only add the timestamp suffix
  }

  url = tempUrl

  return url
}

module.exports = UrlGenerator

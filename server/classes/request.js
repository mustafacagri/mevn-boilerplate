function request(list, req) {
  arr = {}
  list.forEach((item, index) => {
    arr[item] = req[item]
  })
  return arr
}

module.exports = request

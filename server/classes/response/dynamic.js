// this function only works for objects not arrays
// for arrays, you need to use "map"

const success = require('./success')
const fail = require('./fail')
const ErrorResponse = require('../../utils/errorResponse')

function dynamic(list, data) {
  const arr = {}
  if (list && data) {
    list.forEach(item => {
      arr[item] = data[item]
    })
    // here we are only returning the necessary fields which is coming from with "list param"

    return new success(arr)
  } else {
    return new fail('No data found')
  }
}

module.exports = dynamic

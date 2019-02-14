// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

// const db = cloud.database()

function unique(attr, arr) {
  var pre = ""
  var res = []

  arr.forEach((x) => {
    var cur = x[attr]

    if (cur === pre) {
      tmp['data'].push(x)
    } else {
      tmp = {}
      tmp['date'] = cur
      tmp['data'] = [x]
      res.push(tmp)
    }

    pre = cur
  })

  return res
}

// 云函数入口函数
exports.main = async (event, context) => {
  
  // var contest = db.collection(event.arr).get()

  var res = unique(event.arr)

  return {
    event,
    data: res
  }
}
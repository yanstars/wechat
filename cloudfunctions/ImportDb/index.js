// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise');

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log("云端收到的凭证：", event.token)
  var token = event.token
  var filename = event.filename
  var type = event.type
  var options = {
    method: 'POST',
    uri: 'https://api.weixin.qq.com/tcb/databasemigrateimport?access_token=' + token,
    // uri: `https://api.weixin.qq.com/tcb/databasemigrateimport?access_token=token`,
    body: {
      "env": "yanstars-qsjfo",
      "collection_name": "users",
      "file_path": filename,
      "file_type": type,
      "stop_on_error": false,
      "conflict_mode": 1
    },
    json: true
  };
  return rp(options)
    .then(function (res) {
      return res
    })
    .catch(function (err) {
      return err
    });
}
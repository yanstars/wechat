// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise');

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()

  return rp('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxe35d7ae46e439f8b&secret=22ca16eae091cf87bc227a8f841892c2')
    .then(function(res) {
      console.log(res)
      return res
    })
    .catch(function(err) {
      console.log(err)
      return err
    });
}
const app = getApp()
import Notify from 'vant-weapp//notify/notify'
Page({
  data: {
    token: '',
    userInfo: {},
    value: '', //输入框的data
    obj: {},
    inputValue: '',
    filename: '',
    type: 1,
    tele: '010-87363887',
    addr: '北京市朝阳区潘家园国际眼镜大厦11层1108号'
  },
  //获取input值
  inputChange(event) {
    this.value = event.detail
    this.setData({
      value: event.detail
    });
  },
  clearInputEvent: function(res) {
    this.setData({
      'inputValue': '',
      'value': ''
    })
  },
  onQuery(target) {
    target = parseInt(target)
    const db = wx.cloud.database()
    db.collection('users').where({
      tele: target
    }).get({
      success: res => {
        wx.hideLoading()
        if (res.data.length) {
          this.setData({
            obj: res.data[0],
          })
          app.obj = this.data.obj
          wx.navigateTo({
            url: '../result/result'
          })
        } else {
          Notify({
            text: '暂无此用户信息',
            duration: 1000,
            selector: '#custom-selector',
            backgroundColor: '#ff976a'
          });
        }
      },
      fail: err => {
        Notify({
          text: '查询错误，联系客服',
          duration: 1000,
          selector: '#custom-selector',
          backgroundColor: '#f44'
        });
      }
    })
  },
  //获取 用户信息授权 并 查询操作
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    let target = this.data.value.value ? this.data.value.value : ''
    if (target === "root" || target === "ROOT") {
      wx.navigateTo({
        url: '../root/root'
      })
    } else {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(target)) {
        Notify({
          text: '请输入正确的手机号',
          duration: 1000,
          selector: '#custom-selector',
          backgroundColor: '#ff976a'
        });
      } else {
        wx.showLoading({
          title: '查询中',
        })
        this.onQuery(target);
      }
    }
  },
  makeCall() {
    wx.makePhoneCall({
      phoneNumber: '01087363887'
    })
  },
})
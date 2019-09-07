import Notify from 'vant-weapp//notify/notify';
const app = getApp()
Page({
  data: {
    lastX: 0,
    lastY: 0,
    isChecked: false,
    userInfo: {},
    loaded: false,
    value: '', //输入框的data
    obj: {},
    inputValue: '',
    token: '',
    filename: 'default',
    type: 1
  },
  clearInputEvent: function(res) {
    this.setData({
      'inputValue': '',
      'value': ''
    })
  },
  //面板的伸缩
  scaleH() {
    this.animation.scaleY(1).step()
    this.setData({
      animation: this.animation.export()
    })
  },
  scale: function() {
    this.animation.scaleY(0).step()
    this.setData({
      animation: this.animation.export(),
      value: ''
    })
    this.clearInputEvent()
  },
  //动态获取腾讯云接口凭证
  getToken() {
    wx.cloud.callFunction({
      name: 'getToken',
      success: res => {
        this.setData({
          token: JSON.parse(res.result).access_token
        })
        console.log("最新的this.data.token", this.data.token)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [sum] 调用失败：', err)
      }
    })
  },
  //选择 json/csv文件上传到云储存
  uploadfile() {
    var that = this
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        console.log('选择文件回调res :', res);
        var name = res.tempFiles[0].name
        if (name.slice(-1) === 'v') {
          that.setData({
            filename: name,
            type: 2
          })
        } else {
          that.setData({
            filename: name,
            type: 1
          })
        }
        var filePath = res.tempFiles[0].path
        const cloudPath = name
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('上传成功回调res :', res);
          },
          fail: e => {
            console.log('e :', e);
          }
        })
      }
    });
  },
  //导入云储存文件到db
  importDb() {
    wx.cloud.callFunction({
      name: 'importDb',
      data: {
        token: this.data.token,
        filename: this.data.filename,
        type: this.data.type
      },
      success: res => {
        console.log(res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [sum] 调用失败：', err)
      }
    })
  },


  //手势检测
  handletouchtart: function(event) {
    this.data.lastX = event.touches[0].pageX
    this.data.lastY = event.touches[0].pageY
  },
  handletouchmove: function(event) {
    let currentX = event.touches[0].pageX
    let currentY = event.touches[0].pageY
    let tx = currentX - this.data.lastX
    let ty = currentY - this.data.lastY
    //左右方向滑动
    if (Math.abs(tx) > Math.abs(ty)) {
      if (tx < 0) {
        console.log('左 :');
      } else if (tx > 0)
        console.log('右 :');
    }
    //上下方向滑动
    else {
      if (ty < -30) {
        this.closePanel()
      }
    }
    //将当前坐标进行保存以进行下一次计算
    this.data.lastX = currentX
    this.data.lastY = currentY

  },
  closePanel() {
    this.scale()
    let that = this
    setTimeout(function() {
      that.setData({
        loaded: false
      })
    }, 1000)

  },
  queryClick() {
    this.onQuery();
  },
  onQuery() {
    const db = wx.cloud.database()
    let target = ''
    target = this.data.value.value ? this.data.value.value : target
    if (target.length == 11) {
      db.collection('users').where({
        tele: target
      }).get({
        success: res => {
          if (res.data.length) {
            this.setData({
              obj: res.data[0],
              loaded: true,
            })
            this.scaleH()
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
            backgroundColor: '#ff976a'
          });
        }
      })
    } else {
      Notify({
        text: '请输入正确的手机号',
        duration: 1000,
        selector: '#custom-selector',
        backgroundColor: '#ff976a'
      });
    }
  },
  //获取input值
  inputChange(event) {
    this.value = event.detail
    this.setData({
      value: event.detail
    });
  },
  //跳转页面
  toRoot() {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../test/test'
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  onReady() {
    //动画申明
    this.animation = wx.createAnimation()
  },
  onLoad: function() {
    // this.getToken()

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  }

})
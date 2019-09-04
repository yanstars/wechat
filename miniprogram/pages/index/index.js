//index.js
import Notify from 'vant-weapp//notify/notify';
const app = getApp()

Page({
    data: {
        lastX: 0,
        lastY: 0,
        isChecked: false,
        avatarUrl: './user-unlogin.png',
        userInfo: {},
        logged: false,
        takeSession: false,
        requestResult: '',
        loaded: false,
        value: '',
        left: {
            ds: '',
            cs: '',
            zx: '',
            tj: '',
            add: '',
            type: '',
            th: '',
            hyperopia: '',
            doubleHy: '',
            myopia: '',
            doubleMy: '',

        },
        right: {
            ds: '',
            cs: '',
            zx: '',
            tj: '',
            add: '',
            type: '',
            th: '',
            hyperopia: '',
            doubleHy: '',
            myopia: '',
            doubleMy: '',

        },
        suggest: ''

    },
    scale: function () {
        this.animation.scaleY(0).step()
        this.setData({
            animation: this.animation.export()
        })
    },
    handletouchmove: function (event) {
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
            if (ty < 0) {
                this.scale()

                let that = this
                setTimeout(function () {
                    that.setData({
                        loaded: false
                    })
                }, 1000)
            } 
        }

        //将当前坐标进行保存以进行下一次计算
        this.data.lastX = currentX
        this.data.lastY = currentY

    },

    handletouchtart: function (event) {
        console.log(event)
        this.data.lastX = event.touches[0].pageX
        this.data.lastY = event.touches[0].pageY
    },
    handletap: function (event) {
        console.log(event)
    },


    onQuery() {
        const db = wx.cloud.database()
        let target = this.data.value
        console.log('查询的value :', this.data.value);

        if (target.length == 11) {
            db.collection('users').where({
                tele: this.value
            }).get({
                success: res => {
                    this.setData({
                        suggest: res.data[0].suggest,


                        'left.ds': res.data[0].dsleft,
                        'left.cs': res.data[0].dsright,
                        'left.zx': res.data[0].dsleft,
                        'left.tj': res.data[0].dsleft,
                        'left.add': res.data[0].dsleft,
                        'left.type': res.data[0].dsleft,
                        'left.th': res.data[0].dsleft,
                        'left.hyperopia': res.data[0].dsleft,
                        'left.doubleHy': res.data[0].doubleHy,
                        'left.myopia': res.data[0].dsleft,
                        'left.doubleMy': res.data[0].dsleft,



                        'right.zx': res.data[0].dsleft,
                        'right.cs': res.data[0].dsright,
                        'right.ds': res.data[0].dsleft,
                        'right.tj': res.data[0].dsleft,
                        'right.add': res.data[0].dsleft,
                        'right.type': res.data[0].dsleft,
                        'right.th': res.data[0].dsleft,
                        'right.hyperopia': res.data[0].dsleft,
                        'right.doubleHy': res.data[0].doubleHy,
                        'right.myopia': res.data[0].dsleft,
                        'right.doubleMy': res.data[0].dsleft,



                        loaded: true,
                    })
                    this.loaded = true;
                },
                fail: err => {
                    wx.showToast({
                        icon: 'none',
                        title: '查询记录失败'
                    })
                    console.error('[数据库] [查询记录] 失败：', err)
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

    inputChange(event) {
        this.value = event.detail
        this.setData({
            value: event.detail
        });
    },
    query() {

        this.onQuery();

    },
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









    onReady: function () {
        this.animation = wx.createAnimation()
    },


    onLoad: function () {



        if (!wx.cloud) {
            wx.redirectTo({
                url: '../chooseLib/chooseLib',
            })
            return
        }

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

    onGetUserInfo: function (e) {
        if (!this.logged && e.detail.userInfo) {
            this.setData({
                logged: true,
                avatarUrl: e.detail.userInfo.avatarUrl,
                userInfo: e.detail.userInfo
            })
        }
    },

    onGetOpenid: function () {
        // 调用云函数
        wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
                console.log('[云函数] [login] user openid: ', res.result.openid)
                app.globalData.openid = res.result.openid
                wx.navigateTo({
                    url: '../userConsole/userConsole',
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

    // 上传图片
    doUpload: function () {
        // 选择图片
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {

                wx.showLoading({
                    title: '上传中',
                })

                const filePath = res.tempFilePaths[0]

                // 上传图片
                const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
                wx.cloud.uploadFile({
                    cloudPath,
                    filePath,
                    success: res => {
                        console.log('[上传文件] 成功：', res)

                        app.globalData.fileID = res.fileID
                        app.globalData.cloudPath = cloudPath
                        app.globalData.imagePath = filePath

                        wx.navigateTo({
                            url: '../storageConsole/storageConsole'
                        })
                    },
                    fail: e => {
                        console.error('[上传文件] 失败：', e)
                        wx.showToast({
                            icon: 'none',
                            title: '上传失败',
                        })
                    },
                    complete: () => {
                        wx.hideLoading()
                    }
                })

            },
            fail: e => {
                console.error(e)
            }
        })
    },

})
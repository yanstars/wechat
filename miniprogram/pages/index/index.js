const app = getApp()
import Notify from 'vant-weapp//notify/notify';
Page({
    data: {
        token: '',
        lastX: 0,
        lastY: 0,
        isChecked: false,
        userInfo: {},
        loaded: false,
        value: '', //输入框的data
        obj: {},
        inputValue: '',
        filename: 'default',
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
    clearInputEvent: function (res) {
        this.setData({
            'inputValue': '',
            'value': ''
        })
    },

    onQuery(target) {
        const db = wx.cloud.database()
        db.collection('users').where({
            tele: target
        }).get({
            success: res => {
                if (res.data.length) {
                    this.setData({
                        obj: res.data[0],
                        loaded: true,
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

    getUserInfo: function (e) {
        app.globalData.userInfo = e.detail.userInfo
        let target = ''
        target = this.data.value.value ? this.data.value.value : target
        if (target.length == 11) {
            this.onQuery(target);
        } else {
            Notify({
                text: '请输入正确的手机号',
                duration: 1000,
                selector: '#custom-selector',
                backgroundColor: '#ff976a'
            });
        }
    },
    //跳转页面
    toRoot() {
        wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res => {
                app.globalData.openid = res.result.openid
                wx.navigateTo({
                    url: '../root/root'
                })
            },
            fail: err => {
                console.error('跳转err', err)

            }
        })
    },
    makeCall() {

        wx.makePhoneCall({
            phoneNumber: '01087363887' //仅为示例，并非真实的电话号码
        })
    },
    onReady() {
        //动画申明
        this.animation = wx.createAnimation()
    },
    onLoad: function () {
        // this.getToken()

    },


})
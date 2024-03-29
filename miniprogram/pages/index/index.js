const app = getApp();
import Notify from "vant-weapp//notify/notify";
Page({
    data: {
        token: "",
        userInfo: {},
        value: "",
        obj: {},
        inputValue: "",
        filename: "",
        type: 1,
        tele: "010-87363887",
        addr: "北京市朝阳区潘家园国际眼镜大厦11层1108号"
    },
    inputChange(event) {
        this.value = event.detail, this.setData({
            value: event.detail
        })
    },
    clearInputEvent: function (res) {
        this.setData({
            inputValue: "",
            value: ""
        })
    },
    onQuery(target) {
        target = parseInt(target);
        const db = wx.cloud.database();
        db.collection("users").where({
            tele: target
        }).get({
            success: res => {
                wx.hideLoading(), res.data.length ? (this.setData({
                    obj: res.data[0]
                }), app.obj = this.data.obj, wx.navigateTo({
                    url: "../result/result"
                })) : Notify({
                    text: "暂无此用户信息",
                    duration: 1e3,
                    selector: "#custom-selector",
                    backgroundColor: "#ff976a"
                })
            },
            fail: err => {
                Notify({
                    text: "查询错误，联系客服",
                    duration: 1e3,
                    selector: "#custom-selector",
                    backgroundColor: "#f44"
                })
            }
        })
    },
    getUserInfo: function (e) {
        app.globalData.userInfo = e.detail.userInfo;
        let target = this.data.value.value ? this.data.value.value : "";
        var myreg;
        "root" === target || "ROOT" === target ? wx.navigateTo({
            url: "../root/root"
        }) : /^[1][3,4,5,7,8][0-9]{9}$/.test(target) ? (wx.showLoading({
            title: "查询中"
        }), this.onQuery(target)) : Notify({
            text: "请输入正确的手机号",
            duration: 1e3,
            selector: "#custom-selector",
            backgroundColor: "#ff976a"
        })
    },
    makeCall() {
        wx.makePhoneCall({
            phoneNumber: "01087363887"
        })
    }
});
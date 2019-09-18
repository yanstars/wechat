const app = getApp();
Page({
    data: {
        lastX: "",
        lastY: "",
        name: "",
        time: "",
        userInfo: {},
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        obj: {}
    },
    onLoad() {},
    onReady: function () {
        this.setData({
            obj: app.obj,
            userInfo: app.globalData.userInfo
        })
    },
    onShow: function () {},
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {}
});
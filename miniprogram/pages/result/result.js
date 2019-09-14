// pages/result/result.jsconst app = getApp()
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {

        name: '姓名',
        sex: '性别',
        time: '2019-09-10',
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        obj: {}

    },


    //   //面板的伸缩
    //   scaleH() {
    //     this.animation.scaleY(1).step()
    //     this.setData({
    //         animation: this.animation.export()
    //     })
    // },
    // scale: function () {
    //     this.animation.scaleY(0).step()
    //     this.setData({
    //         animation: this.animation.export(),
    //         value: ''
    //     })
    //     this.clearInputEvent()
    // },
    // //手势检测
    // handletouchtart: function (event) {
    //     this.data.lastX = event.touches[0].pageX
    //     this.data.lastY = event.touches[0].pageY
    // },
    // handletouchmove: function (event) {
    //     let currentX = event.touches[0].pageX
    //     let currentY = event.touches[0].pageY
    //     let tx = currentX - this.data.lastX
    //     let ty = currentY - this.data.lastY
    //     //左右方向滑动
    //     if (Math.abs(tx) > Math.abs(ty)) {
    //         if (tx < 0) {
    //             console.log('左 :');
    //         } else if (tx > 0)
    //             console.log('右 :');
    //     }
    //     //上下方向滑动
    //     else {
    //         if (ty < -30) {
    //             this.closePanel()
    //         }
    //     }
    //     //将当前坐标进行保存以进行下一次计算
    //     this.data.lastX = currentX
    //     this.data.lastY = currentY

    // },
    // closePanel() {
    //     this.scale()
    //     let that = this
    //     setTimeout(function () {
    //         that.setData({
    //             loaded: false
    //         })
    //     }, 1000)

    // },
    onLoad() {

    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // console.log('app :', app);
        this.setData({
            obj: app.obj,
            userInfo: app.globalData.userInfo,
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
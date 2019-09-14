import Notify from 'vant-weapp//notify/notify';

Page({


    data: {
        token: '',
        userInfo: {},
        obj: {},
        inputValue: '',
        filename: 'default',
        type: 1,
        tele: '010-87363887',
        addr: '北京市朝阳区潘家园国际眼镜大厦11层1108号',
    },


    choseClick() {
        this.uploadfile()
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
                        Notify({
                            text: '上传文件成功',
                            duration: 1000,
                            selector: '#custom-selectorroot',
                            backgroundColor: '#07C160'
                        });
                    },
                    fail: e => {
                        console.log('e :', e);
                        Notify({
                            text: '上传文件失败,请重试',
                            duration: 1000,
                            selector: '#custom-selectorroot',
                            backgroundColor: '#EE0A24'
                        });
                    }
                })
            }
        });
    },

    //动态获取腾讯云接口凭证
    getToken() {
        wx.cloud.callFunction({
            name: 'getToken',
            success: res => {
                this.setData({
                    token: JSON.parse(res.result).access_token
                })
            },
            fail: err => {
                console.error('[云函数] [sum] 调用失败：', err)
            }
        })
    },

    //导入云储存文件到db
    importDb() {
        wx.cloud.callFunction({
            name: 'ImportDb',
            data: {
                token: this.data.token,
                filename: this.data.filename,
                type: this.data.type
            },
            success: res => {

                if (res.result.errcode == 0) {
                    Notify({
                        text: '导入数据成功',
                        duration: 1000,
                        selector: '#custom-selectorroot',
                        backgroundColor: '#07C160'
                    });
                } else {
                    Notify({
                        text: '导入失败,请重试',
                        duration: 1000,
                        selector: '#custom-selectorroot',
                        backgroundColor: '#EE0A24'
                    });
                }
            },
            fail: err => {
                console.log('导入数据库云函数调用 :', err);
                Notify({
                    text: '云函数调用失败',
                    duration: 1000,
                    selector: '#custom-selectorroot',
                    backgroundColor: '#EE0A24'
                });
            }
        })
    },


    onLoad: function () {
        this.getToken()

    },

})
import Notify from "vant-weapp//notify/notify";
Page({
    data: {
        token: "",
        wechatClick: false,
        nowINput: "999",
        ostype: '编辑模式',
        userInfo: {},
        osTypeCheck: false, //开启导入模式
        obj: {},
        inputValue: "",
        filename: "default",
        type: 1,
        tele: "010-87363887",
        addr: "北京市朝阳区潘家园国际眼镜大厦11层1108号",
        hasFile: !1,
        info: {
            user: [{
                    label: "姓名",
                    value: '张三'
                },
                {
                    label: "年龄",
                    value: '20'
                },
                {
                    label: "检查项目",
                    value: '标准验光'
                }, {
                    label: "检查时间",
                    value: '2019-09-20'
                }
            ],
            dataU: [{
                    label: '球镜(DS)',
                    right: '0.2',
                    left: '0.2'
                },
                {
                    label: '柱镜(DC)',
                    right: '0.2',
                    left: '0.2'
                },
                {
                    label: '轴向(°)',
                    right: '0.2',
                    left: '0.2'
                },
                {
                    label: '瞳距(mm)',
                    right: '0.2',
                    left: '0.2'
                },
                {
                    label: '远视力',
                    right: '0.2',
                    left: '0.2'
                },
                {
                    label: '双眼远视力',
                    right: '0.2',
                },
                {
                    label: 'Add(D)',
                    right: '0.2',
                    left: '0.2'
                },
                {
                    label: '近视力',
                    right: '0.2',
                    left: '0.2'
                },
                {
                    label: '双眼近视力',
                    right: '0.2',
                }

            ],
            dataD: [{
                    label: '球镜(DS)',
                    right: '0.2',
                    left: '0.2'
                },
                {
                    label: '柱镜(DC)',
                    right: '0.2',
                    left: '0.2'
                },
                {
                    label: '轴向(°)',
                    right: '0.2',
                    left: '0.2'
                },
                {
                    label: '远视力',
                    right: '0.2',
                    left: '0.2'
                },
                {
                    label: '双眼远视力',
                    right: '0.2',
                }
            ]

        },
    },
    osTypeChange(event) {
        if (event.detail) {
            this.setData({
                ostype: '导入模式',
                osTypeCheck: !this.data.osTypeCheck
            });
        } else {
            this.setData({
                ostype: '编辑模式',
                osTypeCheck: !this.data.osTypeCheck
            });
        }


    },
    choseClick() {
        this.uploadfile()
    },
    uploadfile() {
        var that = this;
        wx.chooseMessageFile({
            count: 1,
            type: "file",
            success(res) {
                var name = res.tempFiles[0].name;
                "v" === name.slice(-1) ? that.setData({
                    filename: name,
                    type: 2
                }) : that.setData({
                    filename: name,
                    type: 1
                });
                var filePath = res.tempFiles[0].path;
                const cloudPath = "data/" + name;
                wx.cloud.uploadFile({
                    cloudPath: cloudPath,
                    filePath: filePath,
                    success: res => {
                        Notify({
                            text: "上传文件成功",
                            duration: 1e3,
                            selector: "#custom-selectorroot",
                            backgroundColor: "#07C160"
                        }), that.setData({
                            hasFile: !0
                        })
                    },
                    fail: e => {
                        Notify({
                            text: "上传文件失败,请重试",
                            duration: 1e3,
                            selector: "#custom-selectorroot",
                            backgroundColor: "#EE0A24"
                        })
                    }
                })
            }
        })
    },
    getToken() {
        wx.cloud.callFunction({
            name: "getToken",
            success: res => {
                this.setData({
                    token: JSON.parse(res.result).access_token
                })
            },
            fail: err => {
                console.error("[云函数] [sum] 调用失败：", err)
            }
        })
    },
    importDb() {
        wx.cloud.callFunction({
            name: "ImportDb",
            data: {
                token: this.data.token,
                filename: this.data.filename,
                type: this.data.type
            },
            success: res => {
                0 == res.result.errcode ? Notify({
                    text: "导入数据成功",
                    duration: 1e3,
                    selector: "#custom-selectorroot",
                    backgroundColor: "#07C160"
                }) : Notify({
                    text: "导入失败,请重试",
                    duration: 1e3,
                    selector: "#custom-selectorroot",
                    backgroundColor: "#EE0A24"
                })
            },
            fail: err => {
                Notify({
                    text: "云函数调用失败",
                    duration: 1e3,
                    selector: "#custom-selectorroot",
                    backgroundColor: "#EE0A24"
                })
            }
        })
    },
    //失去焦点触发
    eventhandle1(e, ) {
        this.setData({
            nowINput: "999"
        })
    },
    //获取焦点
    eventhandle2(e) {
        this.setData({
            nowINput: e.mark.myMark+""
        })
        console.log('e :', e.mark.myMark);
    },
    onLoad: function () {
        this.getToken()
    }
});
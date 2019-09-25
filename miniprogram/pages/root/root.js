import Notify from "vant-weapp//notify/notify";
import Dialog from 'vant-weapp//dialog/dialog';


Page({
    data: {
        inputValue: "",
        value: "",
        token: "",
        wechatClick: false,
        nowINput: "999",
        ostype: '编辑',
        osTypeCheck: false, //开启导入模式
        obj: {},
        filename: "default",
        type: 1,
        tele: "010-87363887",
        addr: "北京市朝阳区潘家园国际眼镜大厦11层1108号",
        hasFile: !1,
        nowTarget: 'default',
        nowTargetId: '',
        info: {
            user: [{
                    label: "姓名",
                    name: 'name',
                    value: '张三'
                },
                {
                    label: "年龄",
                    name: 'age',
                    value: '20'
                },
                {
                    label: "检查项目",
                    name: 'type',
                    value: '标准验光'
                },
                {
                    label: "检查时间",
                    name: 'time',
                    value: '2019-09-20'
                },
                {
                    label: "手机号码",
                    name: 'tele',
                    value: 18382370489
                }
            ],
            dataU: [{
                    label: '球镜(DS)',
                    name: 'ds',
                    right: '0.2',
                    left: '0.2'
                },
                {
                    label: '柱镜(DC)',
                    name: 'dc',
                    right: '0.2',
                    left: '0.2'
                },
                {
                    label: '轴向(°)',
                    name: 'zx',

                    right: '0.2',
                    left: '0.2'
                },
                {
                    label: '瞳距(mm)',
                    name: 'tj',
                    right: '0.2',
                    left: '0.2'
                },
                {
                    label: '远视力',
                    name: 'ysl',
                    right: '0.2',
                    left: '0.2'
                },
                {
                    label: '双眼远视力',
                    name: 'syysl',
                    right: '0.2',
                },
                {
                    label: 'Add(D)',
                    name: 'add',
                    right: '0.2',
                    left: '0.2'
                },
                {
                    label: '近视力',
                    name: 'jsl',
                    right: '0.2',
                    left: '0.2'
                },
                {
                    label: '双眼近视力',
                    name: 'syjsl',
                    right: '0.2',
                }

            ],
            dataD: [{
                    label: '球镜(DS)',
                    right: '0.2',
                    left: '0.2',
                    name: 'ds',

                },
                {
                    label: '柱镜(DC)',
                    name: 'dc',
                    right: '0.2',
                    left: '0.2'
                },
                {
                    label: '轴向(°)',
                    right: '0.2',
                    left: '0.2',
                    name: 'zx'
                },
                {
                    label: '远视力',
                    right: '0.2',
                    left: '0.2',
                    name: 'ysl'
                },
                {
                    label: '双眼远视力',
                    right: '0.2',
                    name: 'syysl'
                }
            ]

        },
    },
    onLoad: function () {
        this.getToken()
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
    osTypeChange(event) {
        if (event.detail) {
            this.setData({
                ostype: '导入',
                osTypeCheck: !this.data.osTypeCheck
            });
        } else {
            this.setData({
                ostype: '编辑',
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
                    // fail: e => {
                    //     Notify({
                    //         text: "上传文件失败,请重试",
                    //         duration: 1e3,
                    //         selector: "#custom-selectorroot",
                    //         backgroundColor: "#EE0A24"
                    //     })
                    // }
                })
            }
        })
    },

    doQuery() {
        let target = this.data.value.value ? this.data.value.value : "";
        var myreg;
        /^[1][3,4,5,7,8][0-9]{9}$/.test(target) ? (wx.showLoading({
            title: "查询中"
        }), this.onQuery(target)) : Notify({
            text: "请输入正确的手机号",
            duration: 1e3,
            selector: "#custom-selectorroot",
            backgroundColor: "#ff976a"
        })
    },
    onQuery(target) {
        target = parseInt(target);
        const db = wx.cloud.database();
        db.collection("users").where({
            tele: target
        }).get({
            success: res => {
                wx.hideLoading(), res.data.length ? (
                    this.data.nowTarget = target,
                    this.data.nowTargetId = res.data[0]._id,
                    this.setData({
                        "info.user[0].value": res.data[0].name,
                        "info.user[1].value": res.data[0].age,
                        "info.user[2].value": res.data[0].type,
                        "info.user[3].value": res.data[0].time,
                        "info.user[4].value": res.data[0].tele,
                        "info.dataU[0].right": res.data[0].dsygRi,
                        "info.dataU[0].left": res.data[0].dsygLe,
                        "info.dataU[1].right": res.data[0].dcygRi,
                        "info.dataU[1].left": res.data[0].dcygLe,
                        "info.dataU[2].right": res.data[0].zxygRi,
                        "info.dataU[2].left": res.data[0].zxygLe,
                        "info.dataU[3].right": res.data[0].tjygRi,
                        "info.dataU[3].left": res.data[0].tjygLe,
                        "info.dataU[4].right": res.data[0].yslygRi,
                        "info.dataU[4].left": res.data[0].yslygLe,
                        // "info.dataU[5].right": res.data[0].syyslygRi,
                        "info.dataU[5].left": res.data[0].syyslygLe,
                        "info.dataU[6].right": res.data[0].addygRi,
                        "info.dataU[6].left": res.data[0].addygLe,
                        "info.dataU[7].right": res.data[0].jslygRi,
                        "info.dataU[7].left": res.data[0].jslygLe,
                        // "info.dataU[8].right": res.data[0].syjslygRi,
                        "info.dataU[8].left": res.data[0].syjslygLe,
                        "info.dataD[0].right": res.data[0].dsygRi,
                        "info.dataD[0].left": res.data[0].dsygLe,
                        "info.dataD[1].right": res.data[0].dcygRi,
                        "info.dataD[1].left": res.data[0].dcygLe,
                        "info.dataD[2].right": res.data[0].zxygRi,
                        "info.dataD[2].left": res.data[0].zxygLe,
                        "info.dataD[3].right": res.data[0].yslygRi,
                        "info.dataD[3].left": res.data[0].yslygLe,
                        "info.dataD[4].right": res.data[0].syyslygRi,
                        // "info.dataD[4].left": res.data[0].syyslygLe,
                    }), console.log('this.data.info :', this.data.info)) : Notify({
                    text: "暂无此用户信息",
                    duration: 1e3,
                    selector: "#custom-selectorroot",
                    backgroundColor: "#ff976a"
                })
            },
            fail: err => {
                Notify({
                    text: "查询错误，联系客服",
                    duration: 1e3,
                    selector: "#custom-selectorroot",
                    backgroundColor: "#f44"
                })
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
    //失去焦点保存数据
    loseFocu(e) {
        let type = e.mark.myMark
        let value = e.detail.value
        var target
        var targetU
        var targetR
        var index
        if (typeof type == "number") {
            target = "info.user.[" + type + "].value"
            if (type === 4) {
                value = parseInt(value)
                this.setData({
                    [target]: parseInt(value)
                })
            } else {
                this.setData({
                    [target]: value
                })
            }
        }
        if (typeof type == "string") {
            targetU = type.charAt(type.length - 2)
            targetR = type.charAt(type.length - 1)
            index = parseInt(type.slice(0, type.length - 2))
            target = (targetU === 'u' ?
                (targetR === 'r' ? "info.dataU.[" + index + "].right" : "info.dataU.[" + index + "].left") :
                (targetR === 'r' ? "info.dataD.[" + index + "].right" : "info.dataD.[" + index + "].left"))
        }
        this.setData({
            nowINput: "999",
            [target]: value
        })
    },
    //获取焦点
    getFoucs(e) {
        this.setData({
            nowINput: e.mark.myMark + ""
        })
    },

    updateInfo(target) {
        target = parseInt(target)
        const db = wx.cloud.database()
        db.collection('users').where({
            tele: target
        }).get().then(res => {
                if (res.data.length) {
                    db.collection('users').doc(res.data[0]._id).update({
                        data: this.changeDataType(this.data.info),
                        fail: Notify({
                            text: "添加数据失败,请重试",
                            duration: 1e3,
                            selector: "#custom-selectorroot",
                            backgroundColor: "#EE0A24"
                        }),
                        success: Notify({
                            text: "更新数据成功",
                            duration: 1e3,
                            selector: "#custom-selectorroot",
                            backgroundColor: "#07C160"
                        }),
                    })
                } else {
                    db.collection('users').add({
                        data: this.changeDataType(this.data.info),
                        fail: Notify({
                            text: "添加数据失败,请重试",
                            duration: 1e3,
                            selector: "#custom-selectorroot",
                            backgroundColor: "#EE0A24"
                        }),
                        success: Notify({
                            text: "添加数据成功",
                            duration: 1e3,
                            selector: "#custom-selectorroot",
                            backgroundColor: "#07C160"
                        })
                    })
                }
            },
            err => {
                Notify({
                    text: "请重试...",
                    duration: 1e3,
                    selector: "#custom-selectorroot",
                    backgroundColor: "#ff976a"
                })
            })
    },
    saveInfo(e) {
        e.mark.mymark === "save" ?
            this.updateInfo(this.data.info.user[4].value) :
            this.dataDelete(this.data.nowTarget, this.data.nowTargetId);
    },
    //  数据删除
    dataDelete(target, id) {
        const db = wx.cloud.database()
        id ? (Dialog.confirm({
            title: '',
            message: '确定删除' + target + '的数据？'
        }).then(() => {
            // on confirm
            db.collection('users').doc(id).remove({
                fail: Notify({
                    text: "操作失败,请重试",
                    duration: 1e3,
                    selector: "#custom-selectorroot",
                    backgroundColor: "#EE0A24"
                }),
                success: Notify({
                    text: "操作成功",
                    duration: 1e3,
                    selector: "#custom-selectorroot",
                    backgroundColor: "#07C160"
                })
            })
        }).catch(() => {
            // on cancel
        })) : Notify({
            text: "操作异常",
            duration: 1e3,
            selector: "#custom-selectorroot",
            backgroundColor: "#ff976a"
        })

    },
    //转换数据结构
    changeDataType(target) {
        let result1 = {}
        let result2 = {}
        let result3 = {}
        for (let item of target.user) {
            result1[item.name] = item.value
        }
        for (let item of target.dataU) {
            if (item.left) {
                result2[item.name + 'ygLe'] = item.left
            }
            result2[item.name + 'ygRi'] = item.right
        }
        for (let item of target.dataD) {
            if (item.left) {
                result3[item.name + 'jmLe'] = item.left
            }
            result3[item.name + 'jmRi'] = item.right
        }
        let rsult4 = {}
        Object.assign(rsult4, result3, result2, result1)
        return rsult4
    },

});
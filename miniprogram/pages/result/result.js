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
        obj: {},
        info: {
            user: [{
                    label: "姓名",
                    name: 'name',
                    value: '嘿嘿'
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
                    value: 0
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
    onLoad() {},
    onReady: function () {
        this.setData({
            userInfo: app.globalData.userInfo,
            "info.user[0].value": app.obj.name,
            "info.user[1].value": app.obj.age,
            "info.user[2].value": app.obj.type,
            "info.user[3].value": app.obj.time,
            "info.user[4].value": app.obj.tele,
            "info.dataU[0].right": app.obj.dsygRi,
            "info.dataU[0].left": app.obj.dsygLe,
            "info.dataU[1].right": app.obj.dcygRi,
            "info.dataU[1].left": app.obj.dcygLe,
            "info.dataU[2].right": app.obj.zxygRi,
            "info.dataU[2].left": app.obj.zxygLe,
            "info.dataU[3].right": app.obj.tjygRi,
            "info.dataU[3].left": app.obj.tjygLe,
            "info.dataU[4].right": app.obj.yslygRi,
            "info.dataU[4].left": app.obj.yslygLe,
            "info.dataU[5].right": app.obj.syyslygRi,
            "info.dataU[5].left": app.obj.syyslygLe,
            "info.dataU[6].right": app.obj.addygRi,
            "info.dataU[6].left": app.obj.addygLe,
            "info.dataU[7].right": app.obj.jslygRi,
            "info.dataU[7].left": app.obj.jslygLe,
            "info.dataU[8].right": app.obj.syjslygRi,
            "info.dataU[8].left": app.obj.syjslygLe,
            "info.dataD[0].right": app.obj.dsygRi,
            "info.dataD[0].left": app.obj.dsygLe,
            "info.dataD[1].right": app.obj.dcygRi,
            "info.dataD[1].left": app.obj.dcygLe,
            "info.dataD[2].right": app.obj.zxygRi,
            "info.dataD[2].left": app.obj.zxygLe,
            "info.dataD[3].right": app.obj.yslygRi,
            "info.dataD[3].left": app.obj.yslygLe,
            "info.dataD[4].right": app.obj.syyslygRi,
            "info.dataD[4].left": app.obj.syyslygLe,
        })
    },
    onShow: function () {},
    onHide: function () {},
    onUnload: function () {},
    onPullDownRefresh: function () {},
    onReachBottom: function () {},
    onShareAppMessage: function () {}
});
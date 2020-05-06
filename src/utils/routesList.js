import vuex from 'vuex'

const RouteData = [
    {
        path: "/userManagement",
        name: "userManagement",
        meta: {title: "用户管理", icon: "el-icon-s-custom", show: true},
        routeName: "basic",
        checked: true,
        children: [
            {
                path: "/index/userManagement/volunteer",
                component: () =>
                    import ("@opera/userManagement/volunteer"),
                routeName: "user",
                checked: false,
                meta: {title: "志愿者管理", icon: "el-icon-eleme", show: true},
            }, {
                path: "/index/userManagement/team",
                component: () =>
                    import ("@opera/userManagement/team"),
                routeName: "team",
                checked: false,
                meta: {title: "团队管理", icon: "el-icon-delete-solid", show: true},
            }, {
                path: "/index/userManagement/institu",
                component: () =>
                    import ("@opera/userManagement/institu"),
                routeName: "institu",
                checked: false,
                meta: {title: "机构管理", icon: "el-icon-delete", show: true},
            },
        ]
    },
    {
        name: "content",
        meta: {title: "内容管理", icon: "el-icon-s-goods", show: true},
        path: "/content",
        routeName: "content",
        checked: false,
        children: [
            {
                path: "/index/content/article",
                component: () =>
                    import ("@opera/content/article"),
                routeName: "article",
                checked: false,
                meta: {title: "文章管理", icon: "icon-basic", show: true},
            }, {
                path: "/index/content/referral",
                component: () =>
                    import ("@opera/content/referral"),
                routeName: "referral",
                checked: false,
                meta: {title: "推荐管理", icon: "icon-basic", show: true},
            },
            {
                path: "/index/recommend/:columnId/:oriTitle",
                name: "recommend",
                meta: {title: "新建推荐", icon: "icon-basic", show: true},
                component: () => import ("@com/recommend/index")
            },
        ]
    },
    {
        name: "operations",
        meta: {title: "运营管理", icon: "el-icon-question", show: true},
        path: "/operations",
        redirect: "/operations",
        routeName: "operations",
        checked: false,
        children: [
            {
                path: "/index/operations/asset",
                component: () =>
                    import ("@opera/operations/asset"),
                routeName: "asset",
                checked: false,
                meta: {title: "资产管理", icon: "icon-basic", show: true},
            }, {
                path: "/index/operations/event",
                component: () =>
                    import ("@opera/operations/event"),
                routeName: "event",
                checked: false,
                meta: {title: "活动管理", icon: "icon-basic", show: true},
            }, {
                path: "/index/operations/project",
                component: () =>
                    import ("@opera/operations/project"),
                routeName: "project",
                checked: false,
                meta: {title: "项目管理", icon: "icon-basic", show: true},
            }, {
                path: "/index/operations/physical",
                component: () =>
                    import ("@opera/operations/physical"),
                routeName: "physical",
                checked: false,
                meta: {title: "实物管理", icon: "icon-basic", show: true},
            }, {
                path: "/index/operations/cash",
                component: () =>
                    import ("@opera/operations/cash"),
                routeName: "cash",
                checked: false,
                meta: {title: "现金管理", icon: "icon-basic", show: true},
            },
        ]
    },
    {
        name: "order",
        meta: {title: "订单管理", icon: "el-icon-s-help", show: true},
        path: "/order",
        redirect: "/order",
        routeName: "order",
        checked: false,
        children: [
            {
                path: "/index/order/volunteer",
                component: () =>
                    import ("@opera/order/volunteer"),
                routeName: "volunteer",
                routeName: "ordervolunteer",
                checked: false,
                meta: {title: "志愿服务", icon: "icon-basic", show: true},
            }, {
                path: "/index/order/projectFunding",
                component: () =>
                    import ("@opera/order/projectFunding"),
                routeName: "projectFunding",
                checked: false,
                meta: {title: "项目资助订单", icon: "icon-basic", show: true},
            }, {
                path: "/index/order/exchange",
                component: () =>
                    import ("@opera/order/exchange"),
                routeName: "exchange",
                checked: false,
                meta: {title: "实物兑换订单", icon: "icon-basic", show: true},
            }, {
                path: "/index/order/cash",
                component: () =>
                    import ("@opera/order/cash"),
                routeName: "cash",
                checked: false,
                meta: {title: "现金兑换订单", icon: "icon-basic", show: true},
            },
        ]
    },
    {
        name: "system",
        meta: {title: "系统管理", icon: "el-icon-s-fold", show: true},
        path: "/system",
        redirect: "/system",
        routeName: "system",
        checked: false,
        children: [
            {
                path: "/index/system/service",
                component: () =>
                    import ("@opera/system/service"),
                routeName: "service",
                checked: false,
                meta: {title: "服务管理", icon: "icon-basic", show: true},
            }, {
                path: "/index/system/account",
                component: () =>
                    import ("@opera/system/account"),
                routeName: "account",
                checked: false,
                meta: {title: "账户管理", icon: "icon-basic", show: true},
            }, {
                path: "/index/system/section",
                component: () =>
                    import ("@opera/system/section"),
                routeName: "section",
                checked: false,
                meta: {title: "栏目管理", icon: "icon-basic", show: true},
            },
        ]
    },

]
const RouteData2 = [
    {
        path: "/mecha",
        name: "mecha",
        meta: {title: "机构管理", icon: "el-icon-user", show: true},
        routeName: "basic",
        checked: true,
        children: [
            {
                path: "/index/mecha/volunteer",
                component: () =>
                    import ("@mecha/mechanism/volunteer"),
                routeName: "mechanism",
                checked: false,
                meta: {title: "成员管理", icon: "el-icon-eleme", show: true},
            },
            {
                path: "/index/userManagement/volunteer1",
                component: () =>
                    import ("@mecha/mechanism/volunteer/teamDetail"),
                routeName: "user",
                checked: false,
                name: "volunteerDetail",
                meta: {title: "成员管理详情", icon: "el-icon-eleme", show: true},
            },
            {
                path: "/index/mecha/join",
                component: () =>
                    import ("@mecha/mechanism/join"),
                routeName: "join",
                checked: false,
                meta: {title: "加入申请", icon: "el-icon-delete-solid", show: true},
            },
            {
                path: "/index/userManagement/teamDetail",
                component: () =>
                    import ("@mecha/mechanism/join/teamDetail"),
                routeName: "user",
                checked: false,
                name: "teamDetail",
                meta: {title: "加入申请详情", icon: "el-icon-eleme", show: true},
            },
            {
                path: "/index/mecha/assets",
                component: () =>
                    import ("@mecha/mechanism/assets"),
                routeName: "assets",
                checked: false,
                meta: {title: "资产管理", icon: "el-icon-delete", show: true},
            },
            {
                path: "/index/userManagement/instituDetail",
                component: () =>
                    import ("@mecha/mechanism/assets/instituDetail"),
                routeName: "user",
                checked: false,
                name: "instituDetail",
                meta: {title: "账单管理", icon: "el-icon-eleme", show: true},
            },
        ]
    },
    {
        name: "content",
        meta: {title: "内容管理", icon: "el-icon-s-goods", show: true},
        path: "/content",
        routeName: "content",
        checked: false,
        children: [
            {
                path: "/index/content/article",
                component: () =>
                    import ("@mecha/content/article"),
                routeName: "article",
                checked: false,
                meta: {title: "文章管理", icon: "icon-basic", show: true},
            }, {
                path: "/index/content/referral",
                component: () =>
                    import ("@mecha/content/referral"),
                routeName: "referral",
                checked: false,
                meta: {title: "推荐管理", icon: "icon-basic", show: true},
            },
            {
                path: "/index/recommend/:oriTitle",
                name: "recommend",
                meta: {title: "新建推荐", icon: "icon-basic", show: true},
                component: () => import ("@com/recommend/index")
            },
            {
                path: "/index/content/articleDetail",
                component: () =>
                    import ("@mecha/content/article/teamDetail"),
                routeName: "user",
                checked: false,
                name: "articleDetail",
                meta: {title: "文章管理详情", icon: "el-icon-eleme", show: true},
            }, {
                path: "/index/content/articleAdd",
                component: () =>
                    import ("@mecha/content/article/teamDetail"),
                routeName: "user",
                checked: false,
                name: "articleAdd",
                meta: {title: "新增文章", icon: "el-icon-eleme", show: true},
            }, {
                path: "/index/content/referralDetail",
                component: () =>
                    import ("@mecha/content/referral/teamDetail"),
                routeName: "user",
                checked: false,
                name: "referralDetail",
                meta: {title: "推荐管理详情", icon: "el-icon-eleme", show: true},
            },
        ]
    },
    {
        name: "operations",
        meta: {title: "运营管理", icon: "el-icon-question", show: true},
        path: "/operations",
        redirect: "/operations",
        routeName: "operations",
        checked: false,
        children: [
            {
                path: "/index/operations/asset",
                component: () =>
                    import ("@mecha/operations/asset"),
                routeName: "asset",
                checked: false,
                meta: {title: "活动管理", icon: "icon-basic", show: true},
            },
            {
                path: "/index/operations/assetDetail",
                component: () =>
                    import ("@mecha/operations/asset/teamDetail"),
                routeName: "event",
                checked: false,
                name: "assetDetail",
                meta: {title: "活动管理详情", icon: "icon-basic", show: true},
            }, {
                path: "/index/operations/assetadd",
                component: () =>
                    import ("@mecha/operations/asset/add"),
                routeName: "event",
                checked: false,
                name: "assetAdd",
                meta: {title: "新增活动", icon: "icon-basic", show: true},
            }, {
                path: "/index/operations/event",
                component: () =>
                    import ("@mecha/operations/event"),
                routeName: "event",
                checked: false,
                meta: {title: "项目管理", icon: "icon-basic", show: true},
            },
            {
                path: "/index/operations/eventadd",
                component: () =>
                    import ("@mecha/operations/event/add"),
                routeName: "event",
                checked: false,
                name: "eventAdd",
                meta: {title: "新增项目", icon: "icon-basic", show: true},
            },
            {
                path: "/index/operations/eventupdate",
                component: () =>
                    import ("@mecha/operations/event/update"),
                routeName: "event",
                checked: false,
                name: "eventupdate",
                meta: {title: "编辑项目", icon: "icon-basic", show: true},
            },
            {
                path: "/index/operations/eventDetail",
                component: () =>
                    import ("@mecha/operations/event/teamDetail"),
                routeName: "event",
                checked: false,
                name: "eventDetail",
                meta: {title: "项目管理详情", icon: "icon-basic", show: true},
            }, {
                path: "/index/operations/project",
                component: () =>
                    import ("@mecha/operations/project"),
                routeName: "project",
                checked: false,
                meta: {title: "物资管理", icon: "icon-basic", show: true},
            }, {
                path: "/index/operations/projectDetail",
                component: () =>
                    import ("@mecha/operations/project/teamDetail"),
                routeName: "physical",
                checked: false,
                name: "projectDetail",
                meta: {title: "物资管理详情", icon: "icon-basic", show: true},
            }, {
                path: "/index/operations/projectAdd",
                component: () =>
                    import ("@mecha/operations/project/add"),
                routeName: "physical",
                checked: false,
                name: "projectAdd",
                meta: {title: "新增物资", icon: "icon-basic", show: true},
            }, {
                path: "/index/operations/physical",
                component: () =>
                    import ("@mecha/operations/physical"),
                routeName: "physical",
                checked: false,
                meta: {title: "现金管理", icon: "icon-basic", show: true},
            },
            {
                path: "/index/operations/physicalDetail",
                component: () =>
                    import ("@mecha/operations/physical/teamDetail"),
                routeName: "cash",
                checked: false,
                name: "physicalDetail",
                meta: {title: "现金管理详情", icon: "icon-basic", show: true},
            }, {
                path: "/index/operations/physicaladd",
                component: () =>
                    import ("@mecha/operations/physical/add"),
                routeName: "cash",
                checked: false,
                name: "physicalAdd",
                meta: {title: "新增兑换", icon: "icon-basic", show: true},
            },
        ]
    },
    {
        name: "order",
        meta: {title: "订单管理", icon: "el-icon-s-help", show: true},
        path: "/order",
        redirect: "/order",
        routeName: "order",
        checked: false,
        children: [
            {
                path: "/index/order/volunteer",
                component: () =>
                    import ("@mecha/order/volunteer"),
                routeName: "volunteer",
                checked: false,
                meta: {title: "志愿服务", icon: "icon-basic", show: true},
            },
            {
                path: "/index/order/volunteerDetail",
                component: () =>
                    import ("@mecha/order/volunteer/teamDetail"),
                routeName: "volunteer",
                checked: false,
                name: "orderDetail",
                meta: {title: "志愿服务详情", icon: "icon-basic", show: true},
            }, {
                path: "/index/order/projectFunding",
                component: () =>
                    import ("@mecha/order/projectFunding"),
                routeName: "projectFunding",
                checked: false,
                meta: {title: "项目资助订单", icon: "icon-basic", show: true},
            }, {
                path: "/index/order/exchange",
                component: () =>
                    import ("@mecha/order/exchange"),
                routeName: "exchange",
                checked: false,
                meta: {title: "实物兑换订单", icon: "icon-basic", show: true},
            }, {
                path: "/index/order/cash",
                component: () =>
                    import ("@mecha/order/cash"),
                routeName: "cash",
                checked: false,
                meta: {title: "现金兑换订单", icon: "icon-basic", show: true},
            },
        ]
    },
    {
        name: "system",
        meta: {title: "系统管理", icon: "el-icon-s-fold", show: true},
        path: "/system",
        redirect: "/system",
        routeName: "system",
        checked: false,
        children: [
            {
                path: "/index/system/service",
                component: () =>
                    import ("@mecha/system/service"),
                routeName: "service",
                checked: false,
                meta: {title: "配置管理", icon: "icon-basic", show: true},
            }, {
                path: "/index/system/account",
                component: () =>
                    import ("@mecha/system/account"),
                routeName: "account",
                checked: false,
                meta: {title: "账户管理", icon: "icon-basic", show: true},
            }, {
                path: "/index/system/section",
                component: () =>
                    import ("@mecha/system/section"),
                routeName: "section",
                checked: false,
                meta: {title: "机构信息", icon: "icon-basic", show: true},
            },
        ]
    },

]
let routeArray = []
RouteData2.forEach(item => {
    routeArray.push(...item.children)
})
export {routeArray, RouteData, RouteData2}

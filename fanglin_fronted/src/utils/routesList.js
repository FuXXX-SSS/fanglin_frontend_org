import vuex from 'vuex'
const RouteData =[
    {
        path: "/userManagement",
        name: "userManagement",
        meta: {title: "用户管理", icon: "el-icon-s-custom", show: true},
        routeName: "basic",
        checked: true,
        children:[
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
        children:[
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
        ]
    },
    {
        name: "operations",
        meta: {title: "运营管理", icon: "el-icon-question", show: true},
        path: "/operations",
        redirect: "/operations",
        routeName: "operations",
        checked: false,
        children:[
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
        children:[
            {
                path: "/index/order/volunteer",
                component: () =>
                    import ("@opera/order/volunteer"),
                routeName: "volunteer",
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
        children:[
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
const RouteData2 =[
    {
        path: "/mecha",
        name: "mecha",
        meta: {title: "机构管理", icon: "el-icon-user", show: true},
        routeName: "basic",
        checked: true,
        children:[
            {
                path: "/index/mecha/volunteer",
                component: () =>
                    import ("@mecha/mechanism/volunteer"),
                routeName: "mechanism",
                checked: false,
                meta: {title: "成员管理", icon: "el-icon-eleme", show: true},
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
                path: "/index/mecha/assets",
                component: () =>
                    import ("@mecha/mechanism/assets"),
                routeName: "assets",
                checked: false,
                meta: {title: "资产管理", icon: "el-icon-delete", show: true},
            },
        ]
    },
    {
        name: "content",
        meta: {title: "内容管理", icon: "el-icon-s-goods", show: true},
        path: "/content",
        routeName: "content",
        checked: false,
        children:[
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
        ]
    },
    {
        name: "operations",
        meta: {title: "运营管理", icon: "el-icon-question", show: true},
        path: "/operations",
        redirect: "/operations",
        routeName: "operations",
        checked: false,
        children:[
            {
                path: "/index/operations/asset",
                component: () =>
                    import ("@mecha/operations/asset"),
                routeName: "asset",
                checked: false,
                meta: {title: "活动管理", icon: "icon-basic", show: true},
            }, {
                path: "/index/operations/event",
                component: () =>
                    import ("@mecha/operations/event"),
                routeName: "event",
                checked: false,
                meta: {title: "项目管理", icon: "icon-basic", show: true},
            }, {
                path: "/index/operations/project",
                component: () =>
                    import ("@mecha/operations/project"),
                routeName: "project",
                checked: false,
                meta: {title: "实物管理", icon: "icon-basic", show: true},
            }, {
                path: "/index/operations/physical",
                component: () =>
                    import ("@mecha/operations/physical"),
                routeName: "physical",
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
        children:[
            {
                path: "/index/order/volunteer",
                component: () =>
                    import ("@mecha/order/volunteer"),
                routeName: "volunteer",
                checked: false,
                meta: {title: "志愿服务", icon: "icon-basic", show: true},
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
        children:[
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
let routeArray=[]
RouteData2.forEach(item=>{
    routeArray.push(...item.children)
})
export  {routeArray,RouteData,RouteData2}
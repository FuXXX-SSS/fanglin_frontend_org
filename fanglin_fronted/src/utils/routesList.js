const RouteData =[
    {
        path: "/userManagement",
        name: "userManagement",
        meta: {title: "用户管理", icon: "el-icon-platform-eleme", show: true},
        routeName: "basic",
        checked: true,
        children:[
            {
                path: "/index/userManagement/volunteer",
                component: () =>
                    import ("@view/userManagement/volunteer"),
                routeName: "user",
                checked: false,
                meta: {title: "志愿者管理", icon: "el-icon-eleme", show: true},
            }, {
                path: "/index/userManagement/team",
                component: () =>
                    import ("@view/userManagement/team"),
                routeName: "team",
                checked: false,
                meta: {title: "团队管理", icon: "el-icon-delete-solid", show: true},
            }, {
                path: "/index/userManagement/institu",
                component: () =>
                    import ("@view/userManagement/institu"),
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
                    import ("@view/content/article"),
                routeName: "article",
                checked: false,
                meta: {title: "文章管理", icon: "icon-basic", show: true},
            }, {
                path: "/index/content/referral",
                component: () =>
                    import ("@view/content/referral"),
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
                    import ("@view/operations/asset"),
                routeName: "asset",
                checked: false,
                meta: {title: "资产管理", icon: "icon-basic", show: true},
            }, {
                path: "/index/operations/event",
                component: () =>
                    import ("@view/operations/event"),
                routeName: "event",
                checked: false,
                meta: {title: "活动管理", icon: "icon-basic", show: true},
            }, {
                path: "/index/operations/project",
                component: () =>
                    import ("@view/operations/project"),
                routeName: "project",
                checked: false,
                meta: {title: "项目管理", icon: "icon-basic", show: true},
            }, {
                path: "/index/operations/physical",
                component: () =>
                    import ("@view/operations/physical"),
                routeName: "physical",
                checked: false,
                meta: {title: "实物管理", icon: "icon-basic", show: true},
            }, {
                path: "/index/operations/cash",
                component: () =>
                    import ("@view/operations/cash"),
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
                    import ("@view/order/volunteer"),
                routeName: "volunteer",
                checked: false,
                meta: {title: "志愿服务", icon: "icon-basic", show: true},
            }, {
                path: "/index/order/projectFunding",
                component: () =>
                    import ("@view/order/projectFunding"),
                routeName: "projectFunding",
                checked: false,
                meta: {title: "项目资助订单", icon: "icon-basic", show: true},
            }, {
                path: "/index/order/exchange",
                component: () =>
                    import ("@view/order/exchange"),
                routeName: "exchange",
                checked: false,
                meta: {title: "实物兑换订单", icon: "icon-basic", show: true},
            }, {
                path: "/index/order/cash",
                component: () =>
                    import ("@view/order/cash"),
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
                    import ("@view/system/service"),
                routeName: "service",
                checked: false,
                meta: {title: "服务管理", icon: "icon-basic", show: true},
            }, {
                path: "/index/system/account",
                component: () =>
                    import ("@view/system/account"),
                routeName: "account",
                checked: false,
                meta: {title: "账户管理", icon: "icon-basic", show: true},
            }, {
                path: "/index/system/section",
                component: () =>
                    import ("@view/system/section"),
                routeName: "section",
                checked: false,
                meta: {title: "栏目管理", icon: "icon-basic", show: true},
            },
        ]
    },

]
let routeArray=[]
RouteData.forEach(item=>{
    routeArray.push(...item.children)
})
export  {routeArray,RouteData}
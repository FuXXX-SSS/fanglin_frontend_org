import _axios from "../index";


// --服务订单列表
export const serviceList = data =>
    _axios({
        url: "/bms/bill/service/list",
        method: "get",
        params: data
    });

// --服务订单详情
export const serviceDetail = data =>
    _axios({
        url: `/bms/bill/service/detail/${data}`,
        method: "get",
        data: data
    });


// --获取项目订单列表
export const projectList = data =>
    _axios({
        url: "/bms/bill/project/list",
        method: "get",
        params: data
    });

// --获取项目总资助金额 0｜现金兑换总额 1
export const totalAmountList = data =>
    _axios({
        url: `/bms/bill/totalAmount/${data}`,
        method: "get",
        data: data
    });



// --获取实物兑换订单列表
export const goodsList = data =>
    _axios({
        url: "/bms/bill/goods/list",
        method: "get",
        params: data
    });


// --获取现金兑换订单列表
export const cashList = data =>
    _axios({
        url: "/bms/bill/cash/list",
        method: "get",
        params: data
    });


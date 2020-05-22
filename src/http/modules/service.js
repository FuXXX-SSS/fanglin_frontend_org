import _axios from "../index";


// 获取服务类型列表
export const serviceList = data =>
    _axios({
        url: `/bms/service/cat/list`,
        method: "get",
        params: data
    });


// 获取机构开通的服务类型
export const instList = data =>
    _axios({
        url: `/bms/service/cat/inst/list`,
        method: "get",
        params: data
    });


// 新增服务类型
export const serviceAdd = data =>
    _axios({
        url: "/bms/service/cat/add",
        method: "post",
        data: data
    });


// 评价服务
export const servicerate = data =>
    _axios({
        url: "/bms/bill/service/rate",
        method: "post",
        data: data
    });
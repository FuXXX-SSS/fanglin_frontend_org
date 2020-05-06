import _axios from "../index";


// 获取汇率列表
export const rateList = data =>
    _axios({
        url: `/bms/assets/rate/list`,
        method: "get",
        params: data
    });

// 新增汇率
export const rateAdd = data =>
    _axios({
        url: `/bms/assets/rate/add`,
        method: "post",
        data: data
    });

// 获取资产单位列表
export const unitList = data =>
    _axios({
        url: `/bms/assets/unit/list`,
        method: "get",
        params: data
    });

// 获取资产总额信息
export const totalInfo = data =>
    _axios({
        url: `/bms/assets/total/info`,
        method: "get",
        params: data
    });
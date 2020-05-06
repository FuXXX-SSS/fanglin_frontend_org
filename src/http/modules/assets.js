import _axios from "../index";

// 获取团队资产信息
export const group = data =>
    _axios({
        url: `/bms/assets/group/info/${data}`,
        method: "get",
        data: data
    });

// 获取机构资产信息
export const inst = data =>
    _axios({
        url: `/bms/assets/inst/info`,
        method: "get",
        data: data
    });


// 获取机构账单列表
export const instList = data =>
    _axios({
        url: `/bms/bill/inst/list`,
        method: "get",
        data: data
    });


// 获取资产总额信息
export const totalInfo = data =>
    _axios({
        url: `/bms/assets/total/info`,
        method: "get",
        data: data
    });
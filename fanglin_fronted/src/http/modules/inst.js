import _axios from "../index";

// 获取机构开通的栏目列表
export const column = (data = {}) =>
    _axios({
        url: `/bms/inst/column/${data}`,
        method: "get",
        data: data
    });

// 查询机构详情
export const detail = (data = {}) =>
    _axios({
        url: `/bms/inst/detail/${data}`,
        method: "get",
        data: data
    });

// 查询机构列表
export const list = (data = {}) =>
    _axios({
        url: `/bms/inst/list/${data}`,
        method: "get",
        data: data
    });

// 获取机构服务系数
export const serviceCo = (data = {}) =>
    _axios({
        url: `/bms/inst/serviceCo/${data}`,
        method: "get",
        data: data
    });

// 获取机构证明文件
export const verifyImages = (data = {}) =>
    _axios({
        url: `/bms/inst/verifyImages/${data}`,
        method: "get",
        data: data
    });
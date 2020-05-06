import _axios from "../index";

// 查询机构列表
export const columnList = data =>
    _axios({
        url: `/bms/bill/inst/list`,
        method: "get",
        params: data
    });

// 查询机构详情
export const instDetail = data =>
    _axios({
        url: `/bms/inst/detail/${data}`,
        method: "get",
        data: data
    });

// 获取机构开通的栏目列表
export const Stidlist = data =>
    _axios({
        url: `/bms/inst/column/${data}`,
        method: "get",
        data: data
    });

// 获取机构服务系数
export const serviceCo = data =>
    _axios({
        url: `/bms/inst/serviceCo/${data}`,
        method: "get",
        data: data
    });

// 获取机构证明文件
export const verifyImages = data =>
    _axios({
        url: `/bms/inst/verifyImages/${data}`,
        method: "get",
        data: data
    });


// 开通｜关闭机构
export const instDeal = data =>
    _axios({
        url: `/bms/inst/deal/${data}`,
        method: "post",
        data: data
    });


// 修改机构信息
export const instupdate = data =>
    _axios({
        url: `/bms/inst/update`,
        method: "post",
        data: data
    });

// 获取机构列表(下拉框，多选框使用)
export const basicList = data =>
    _axios({
        url: `/bms/inst/basic/list`,
        method: "get",
        data: data
    });


// 下载机构二维码
export const download = data =>
    _axios({
        url: `/bms/inst/qrCode/download/${data}`,
        method: "get",
        data: data,
        responseType: 'blob'
    });

// 获取当前登录机构的基础信息
export const instInfo = data =>
    _axios({
        url: `/bms/inst/info`,
        method: "get",
        data: data
    });

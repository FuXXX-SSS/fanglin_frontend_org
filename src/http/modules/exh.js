import _axios from "../index";


// --查询兑换品列表
export const exhList = data =>
    _axios({
        url: "/bms/exh/list",
        method: "get",
        params: data
    });


// --查看兑换品详情
export const exhDetail = data =>
    _axios({
        url: `/bms/exh/detail/${data}`,
        method: "get",
        params: data
    });



// --新增兑换品信息
export const exhadd = data =>
    _axios({
        url: `/bms/exh/add`,
        method: "post",
        data: data
    });
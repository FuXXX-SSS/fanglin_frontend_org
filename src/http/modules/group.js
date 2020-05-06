import _axios from "../index";

// 查询团队详情
export const groupDetail= data =>
    _axios({
        url: `/bms/group/detail/${data}`,
        method: "get",
        data: data
    });


// 查询团队列表
export const groupList= data =>
    _axios({
        url: `/bms/group/list`,
        method: "get",
        params: data
    });
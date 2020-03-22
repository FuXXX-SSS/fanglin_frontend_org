import _axios from "../index";

// 查询团队详情
export const detail = (data = {}) =>
    _axios({
        url: `/bms/group/detail/${data}`,
        method: "get",
        data: data
    });
// 查询团队列表
export const list = (data = {}) =>
    _axios({
        url: `/bms/group/list`,
        method: "get",
        data: data
    });
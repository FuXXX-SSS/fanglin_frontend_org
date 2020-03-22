import _axios from "../index";

// 获取栏目列表
export const userList= data =>
    _axios({
        url: `/bms/column/list`,
        method: "get",
        data: data
    });
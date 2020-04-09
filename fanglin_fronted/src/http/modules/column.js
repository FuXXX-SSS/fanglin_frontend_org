import _axios from "../index";


// 获取所有栏目列表
export const manageList= data =>
    _axios({
        url: `/bms/column/manage/list`,
        method: "get",
        data: data
    });

// 获取栏目类型接口
export const typeList= data =>
    _axios({
        url: `/bms/column/type/list`,
        method: "get",
        data: data
    });


// 获添加栏目
export const columnAdd= data =>
    _axios({
        url: `/bms/column/add`,
        method: "post",
        data: data
    });
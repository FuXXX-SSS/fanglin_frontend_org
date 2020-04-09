import _axios from "../index";


// 获取项目列表
export const projectList = data =>
    _axios({
        url: `/bms/project/list`,
        method: "get",
        params: data
    });


// 获取项目详情
export const projectDetail = data =>
    _axios({
        url: `/bms/project/detail/${data}`,
        method: "get",
        data: data
    });

// 开启｜关闭项目
export const projectDeal = data =>
    _axios({
        url: `/bms/project/deal/${data}`,
        method: "post",
        data: data
    });
import _axios from "../index";



// 获取文章列表
export const articleList= data =>
    _axios({
        url: `/bms/article/list`,
        method: "get",
        params: data
    });

// 获取文章详情
export const articleDetail= data =>
    _axios({
        url: `/bms/article/detail/${data}`,
        method: "get",
        data: data 
    });

// 发布文章
export const publish = data =>
    _axios({
        url: `/bms/article/publish`,
        method: "post",
        data: data
    });

// 删除文章
export const Delete = data =>
    _axios({
        url: `/bms/article/delete/${data}`,
        method: "post",
        data: data
    });

// 开启｜关闭文章
export const deal = data =>
    _axios({
        url: `/bms/article/deal/${data}`,
        method: "post",
        data: data
    });
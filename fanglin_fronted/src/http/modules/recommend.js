import _axios from "../index";



// 获取推荐列表
export const recommendList= data =>
    _axios({
        url: `/bms/recommend/list`,
        method: "get",
        params: data
    });


// 推荐
export const recommendUp= data =>
    _axios({
        url: `/bms/recommend/up`,
        method: "post",
        data: data
    });
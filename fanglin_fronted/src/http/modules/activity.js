import _axios from "../index";

// 获取活动列表
export const activityList = data =>
    _axios({
        url: `/bms/activity/list`,
        method: "get",
        params: data
    });

// 获取活动详情
export const activityDetail= data =>
    _axios({
        url: `/bms/activity/detail/${data}`,
        method: "get",
        data: data
    });


// 获取活动报名人选列表
export const applyList= data =>
    _axios({
        url: `/bms/activity/apply/list/${data}`,
        method: "get",
        data: data
    });

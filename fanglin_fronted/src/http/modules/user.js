import _axios from "../index";

// 查询成员列表
export const userList= data =>
    _axios({
        url: `/bms/user/list`,
        method: "get",
        params: data
    });

// 查询成员详情
export const userDetail= data =>
    _axios({
        url: `/bms/user/detail/${data}`,
        method: "get",
        data: data
    });

// 获取成员加入的团队和机构信息
export const userJoinInfo = data =>
    _axios({
        url: `/bms/user/joinInfo/${data}`,
        method: "get",
        data: data
    });

// 查询成员资质信息
export const userQuaInfo = data =>
    _axios({
        url: `/bms/user/quaInfo/${data}`,
        method: "get",
        data: data
    });



// 资质认证接口
export const userQuaCertPost = data =>
    _axios({
        url: `/bms/user/quaCert`,
        method: "post",
        data: data
    });

// 审核加入机构的成员
export const userCheckGet = data =>
    _axios({
        url: `/bms/user/check`,
        method: "post",
        data: data
    });

// 审核加入机构的成员
export const userCheckPost = data =>
    _axios({
        url: `/bms/user/check`,
        method: "post",
        data: data
    });

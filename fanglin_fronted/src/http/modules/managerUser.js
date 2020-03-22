import _axios from "../index";

// --登录
export const login = data =>
    _axios({
        url: "/bms/managerUser/login",
        method: "post",
        data: data
    });

// --后台账户注册
export const register = data =>
    _axios({
        url: "/bms/managerUser/register",
        method: "post",
        data: data
    });

// 用户展示的菜单树
export const menuInfo = data =>
    _axios({
        url: `/bms/menu/info/${data}`,
        method: "get",
        data: data
    });

// 获取系统权限项
export const privilege = data =>
    _axios({
        url: "/bms/privilege/info/1",
        method: "get",
        data: data
    });
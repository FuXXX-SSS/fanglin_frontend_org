import _axios from "../index";

// --登录
export const login = data =>
    _axios({
        url: "/bms/managerUser/login",
        method: "post",
        data: data
    });

// 退出登录
export const logout = data =>
    _axios({
        url: "/bms/managerUser/logout",
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
        url: `/bms/menu/info`,
        method: "get",
        data: data
    });

// 获取系统权限项
export const privilege = data =>
    _axios({
        url: "/bms/privilege/info",
        method: "get",
        data: data
    });

// 获取当前系统账户列表
export const managerUserList = data =>
    _axios({
        url: "/bms/managerUser/list",
        method: "get",
        params: data
    });


// 新增后台用户
export const managerUserAdd = data =>
    _axios({
        url: "/bms/managerUser/add",
        method: "post",
        data: data
    });


// 获取当前登陆用户详情
export const managerUserDetail = data =>
    _axios({
        url: "/bms/managerUser/detail",
        method: "get",
        data: data
    });


// 获取短信验证码,60秒内仅可获取一次,验证码15分钟内有效
export const verification = data =>
    _axios({
        url: "/bms/common/verification/code",
        method: "post",
        data: data
    });

// 忘记密码(无需登陆修改密码)
export const forgotpassword = data =>
    _axios({
        url: "/bms/managerUser/forgot/password",
        method: "post",
        data: data
    });

// 重置钱包密码
export const resetWalletPwd = data =>
    _axios({
        url: "/bms/managerUser/resetWalletPwd",
        method: "post",
        data: data
    });

// 修改密码(需登陆才能修改)
export const resetpassword = data =>
    _axios({
        url: "/bms/managerUser/reset/password",
        method: "post",
        data: data
    });
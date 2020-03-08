import _axios from "./index";

export const login = data =>
    _axios({
        url: "/sys/account/accLogin",
        method: "post",
        data: { data }
    });
import _axios from "../index";


// 查询钱包地址
export const walletURL = data =>
    _axios({
        url: `/bms/common/walletURL/${data}`,
        method: "get",
        data: data
    });


// 转账接口
export const commonTrade = data =>
    _axios({
        url: `/bms/common/trade`,
        method: "post",
        data: data
    });

// 上传图片接口
export const upload = data =>
    _axios({
        url: `/bms/common/image/upload`,
        method: "post",
        data: data
    });
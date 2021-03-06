import axios from "axios";
import {Message, Loading} from "element-ui";
import Router, {resetRouter} from "@/router";
import baseURL from "./baseUrl";

let loading;
let duration = 2 * 1000;

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: "数据加载中...",
        background: "rgba(0,0,0,.4)"
    });
}

function stopLoading() {
    loading.close();
}

// create an axios instance
const service = axios.create({
    baseURL,
    timeout: 10000,
    headers: {}
});

// request interceptor
service.interceptors.request.use(
    config => {
        startLoading();
        if ((sessionStorage.getItem("userInfo"))) {
            config.headers["Authorization"] = JSON.parse(sessionStorage.getItem("userInfo")).token;
        }
        return config;
    },
    error => {
        // do something with request error
        console.log(error); // for debug
        return Promise.reject(error);
    }
);

// response interceptor
service.interceptors.response.use(
    response => {
        stopLoading();
        const res = response.data;
        if (res instanceof Blob) {
            return res;
        }
        if (res.code !== 1000) {
            Message({
                message: res.msg || "Error",
                type: "error",
                duration
            });
            return false;
        } else if (res.data === null) {
            res.data = {}
            res.data.list = null
            res.data.total = null
            res.data.pageNum = null
            res.data.pageSize = null
            res.data.msg=res.data.msg
            return res
        } else {
            return res
        }
    },
    error => {
        stopLoading();
        let res = error.response;
        let message = "";
        console.log(error.response); // for debug
        if (res && res.status === 500) {
            message = "服务器异常";
        } else {
            Message({
                message: res.data.msg,
                type: "error",
                duration
            });
        }
        return Promise.reject(error);
    }
);

export default service;

import router from "./router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from '@/store'

NProgress.configure({showSpinner: false}); // NProgress Configuration
let off = true;
router.beforeEach(async (to, from, next) => {
    const hasToken = sessionStorage.getItem("token");
    NProgress.start();
    if (hasToken) {
        if (to.path === "/login") {
            next();
            NProgress.done();
        } else {
            if (to.path === '/index') {
                next(`/index/mecha/volunteer`);
            }
            next();
            store.dispatch('mecha_asset/setAsset', 1)
            store.dispatch('mecha_asset/setEvent', 1)
            store.dispatch('mecha_asset/setProject', 1)
            store.dispatch('mecha_asset/setPhyscial', 1)
            // if (off) {
            //   let routedata = localStorage.getItem("routedata");
            //   let routerList;
            //   if (routedata) {
            //     routerList = JSON.parse(routedata);
            //   }
            //
            //   off = false;
            //   next({ ...to, replace: true });
            // } else {
            //   next();
            // }
        }
    } else {
        if (to.path.indexOf("/login") !== -1) {
            next();
        } else {
            // next(`/login?redirect=${to.path}`);
            next(`/login`);
            NProgress.done();
        }
    }
});
router.afterEach(() => {
    NProgress.done();
});

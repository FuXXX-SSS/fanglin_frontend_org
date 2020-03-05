import router from "./router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false }); // NProgress Configuration
let off = true;
router.beforeEach(async (to, from, next) => {
  // const hasToken = localStorage.getItem("token");
  const hasToken =123;
  NProgress.start();
  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      if (off) {
        let routedata = localStorage.getItem("routedata");
        let routerList;
        if (routedata) {
          routerList = JSON.parse(routedata);
        }

        off = false;
        next({ ...to, replace: true });
      } else {
        next();
      }
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

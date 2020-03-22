import Vue from "vue";
import Router from "vue-router";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import Layout from "@view/layout";
import {routeArray} from "@/utils/routesList";
Vue.use(Router);
Nprogress.inc(0.2);
Nprogress.configure({easing: "ease", speed: 500, showSpinner: true});

const routes = [
    {
        path: "/login",
        name: "login",
        component: () =>
            import ("@view/login")
    },
    {
        path: "/",
        redirect: "/index",
    },
    {
        path: "/index",
        name: "index",
        component: Layout,
        children:routeArray
    },
]
const router = new Router({
    // mode: "history",
    base: process.env.BASE_URL,
    routes,
    scrollBehavior: () => ({y: 0})
});
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)
}
export default router;


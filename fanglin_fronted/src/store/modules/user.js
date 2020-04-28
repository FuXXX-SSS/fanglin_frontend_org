import {login,menuInfo} from '@http/managerUser'
import md5 from 'js-md5'
const state = {
    userAccessInfo: null,
    accessRoutes: [], //当前用户所有菜单和路由
};
const mutations = {

    SET_USERINFO(state, userAccessInfo) {
        state.userAccessInfo = userAccessInfo;
    },
    SET_ROUTER(state, accessRoutes) {
        state.accessRoutes = accessRoutes;
    },

};

const actions = {
    getLogin({ commit }, user) {
        const { username, password } = user;
        return new Promise((resolve, reject) => {
            // 'e456776aa7ce341c7e60a624a0a7b8e8'
            login({ account: username, password:  md5(`${password}fanglin`), type: 0})
                .then(res => {
                    if (res.code===1000){
                        const { data } = res;
                        sessionStorage.setItem("userInfo", JSON.stringify(data));
                        sessionStorage.setItem("token",'123');
                        resolve();
                    }

                })
                .catch(err => reject(err));
        });
    },
    getRoute({ commit }, routes) {
        commit("SET_ROUTER", routes);
    },
    getRoleBtn({ commit }, data) {
        commit("SET_ROLEBTN", data);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
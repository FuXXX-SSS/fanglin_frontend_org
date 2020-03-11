const state = {
    visitedViews:[]
};

const mutations = {
    ADD_VISITED_VIEW :(state,view)=>{
        if (state.visitedViews.some(v => v.path === view.path)) return;
        state.visitedViews.push(Object.assign({}, view));
    },
    DEL_VISITED_VIEW: (state, view) => {
        for (const [i, v] of state.visitedViews.entries()) {
            if (v.path === view.path) {
                state.visitedViews.splice(i, 1);
                break;
            }
        }
    },
    REMOVE_VIEW:(state)=>{
        state.visitedViews=[]
    }
}
const actions = {
    addVisitedView({ commit }, view) {
        commit("ADD_VISITED_VIEW", view);
    },

    delVisitedView({ commit, state }, view) {
        commit("DEL_VISITED_VIEW", view);
        return new Promise(resolve => {
            resolve({
                visitedViews: [...state.visitedViews]
            });
        });
    },
    removeViews({commit}){
        commit("REMOVE_VIEW");
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
const state = {
    AssetisShow: 1,
    EventisShow: 1,
    ProjectisShow: 1,
    PhysicalisShow: 1,
}

const mutations = {
    ASSET(state, isShow) {
        state.AssetisShow = isShow;
    },
    EVENT(state, isShow) {
        state.EventisShow = isShow;
    },
    PROJECT(state, isShow) {
        state.ProjectisShow = isShow;
    },
    PHYSCIAL(state, isShow) {
        state.PhysicalisShow = isShow;
    },

}

const actions = {
    setAsset({commit}, isShow) {
        commit('ASSET', isShow)
    },
    setEvent({commit}, isShow) {
        commit('EVENT', isShow)
    },
    setProject({commit}, isShow) {
        commit('PROJECT', isShow)
    },
    setPhyscial({commit}, isShow) {
        commit('PHYSCIAL', isShow)
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
const state ={
    AssetisShow:1,
    eventisShow:1,
}

const mutations ={
    ASSET(state, isShow) {
        state.AssetisShow = isShow;
    },
    EVENT(state, isShow) {
        state.eventisShow = isShow;
    },
}

const  actions = {
    setAsset({commit},isShow){
        commit('ASSET',isShow)
    },
    setEvent({commit},isShow){
        commit('EVENT',isShow)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
const state ={
    recomObj:{},
}

const mutations ={
    RECOMOBJ(state, data) {
        state.recomObj = data;
    },
}

const  actions = {
    setReco({commit},data){
        commit('RECOMOBJ',data)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
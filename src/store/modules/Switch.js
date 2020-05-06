const state = {
    switch: sessionStorage.getItem('loginSwitch')
}
const mutations = {
    SWITCH_CHANGE:(state,value)=>{
        state.switch=value
    }
}
const actions ={
    switchChange({commit},value){
        commit('SWITCH_CHANGE',value)
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
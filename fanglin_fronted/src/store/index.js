import Vue from 'vue'
import Vuex from 'vuex'
import tagView from './tagview'
import Switch from './Switch'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {tagView,Switch}
})

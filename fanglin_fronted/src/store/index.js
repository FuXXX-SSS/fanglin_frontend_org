import Vue from 'vue'
import Vuex from 'vuex'
import tagView from './tagview'
import Switch from './Switch'
const modulesFiles = require.context('./', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})
Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {tagView,Switch}
})

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "normalize.css/normalize.css";
import ElementUi from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
import "./permission";
import './style/index.less'
import * as tool from "./utils/tool.js";
import * as filters from "./utils/tool.js";

Vue.prototype.$tools = tool
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.use(ElementUi);
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

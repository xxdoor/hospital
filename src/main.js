import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui'
import BaiduMap from 'vue-baidu-map'
import 'muse-ui/dist/muse-ui.css'
import './theme/my-theme'
// TODO 1. 数据库加文案，后台根据id搜索文案；2.接入地图api；3.调起电话

Vue.use(MuseUI);
Vue.use(BaiduMap, {
    ak: 'hHlftViSAp02u0ZsNuRQyI0wyBuvzulP'
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

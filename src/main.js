import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入boostrap ui框架
// 安装：$cnpm i bootstrap@3.3.7 -S
// 安装包如果是在node_modules文件夹下，可以不需要添加../node_modules。如果不添加node环境默认去依赖包里面找
// import "../node_modules/bootstrap/dist/css/bootstrap.css";
// import "/bootstrap/dist/css/bootstrap.css";
import "../node_modules/animate.css/animate.css";
// better-scroll滚动插件
import "../node_modules/_@better-scroll_core@2.0.0-beta.10@@better-scroll/core/dist/core.js"
// 全局引入默认样式
import "./assets/css/base.css";
// import "./assets/js/rem"
import "swiper/css/swiper.min.css"
// 全局引入
import "./assets/font/iconfont.css"
import "./assets/font/iconfont";

import axios from "axios";
axios.defaults.baseURL="http://127.0.0.1:3000/";
Vue.prototype.$axios = axios;

// vue-jsonp 安装：cnpm i vue-jsonp -S
import VueJsonp from "vue-jsonp";//引入
// 超出5000毫秒时间的时候,请求过期
Vue.use(VueJsonp,5000);

Vue.config.productionTip = false;

new Vue({
  data: {
    
  },
  methods: {
  },
  router,
  store,
  render: h => h(App)
}).$mount("#app");

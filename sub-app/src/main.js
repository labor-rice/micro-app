import "./public-path";
import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routes from "./router/index";
Vue.config.productionTip = false;

const router = new VueRouter({
  mode: "history",
  // 设置基础路由，子应用可以通过window.__MICRO_APP_BASE_ROUTE__获取基座下发的baseroute，
  // 如果没有设置baseroute属性，则此值默认为空字符串
  base: window.__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL,
  routes,
});

// 与基座进行数据交互
function handleMicroData() {
  // 是否是微前端环境
  if (window.__MICRO_APP_ENVIRONMENT__) {
    // 主动获取基座下发的数据
    console.log("child-vue2 getData:", window.microApp.getData());

    // 监听基座下发的数据变化
    window.microApp.addDataListener(data => {
      console.log("child-vue2 addDataListener:", data);

      // 当基座下发path时进行跳转
      if (data.path && data.path !== router.currentRoute.path) {
        router.push(data.path);
      }
    });

    // 向基座发送数据
    setTimeout(() => {
      window.microApp.dispatch({myname: "child-vue2"});
    }, 3000);
  }
}

const app = new Vue({
  router,
  render: h => h(App),
}).$mount("#app");

console.log("微应用渲染了");

handleMicroData();

// 监听卸载操作
window.addEventListener("unmount", function () {
  app.$destroy();
  console.log("微应用卸载了");
});

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: ()=>import('../views/HomeView.vue'),
  }
];

export default routes;

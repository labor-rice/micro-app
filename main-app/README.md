# main-app

> micro-app 微前端
>
> 主应用端
>
> 配置操作：
>
>  1. 安装依赖
>
>     `npm i @micro-zoe/micro-app --save`
>
>  2. 在入口文件main.js中引入 
>
>     ```js
>     // entry
>     import microApp from '@micro-zoe/micro-app'
>     
>     microApp.start()
>     ```
>
>  3. 分配一个路由给子应用
>
>     ```js
>       {
>         // 👇 非严格匹配，/sub-app/* 都指向 my-page 页面
>         path: '/sub-app/*',
>         name: 'sub-app',
>         component: () => import('../page/my-page.vue')
>       },
>     ```
>
>  4. 分配一个页面给子应用(在页面中嵌入子应用)
>
>     ```vue
>     <template>
>       <div>
>         <h1>子应用</h1>
>         <!-- 
>           name(必传)：应用名称
>           url(必传)：应用地址，会被自动补全为http://localhost:3000/index.html
>           baseroute(可选)：基座应用分配给子应用的基础路由，就是上面的 `/sub-app`
>          -->
>         <micro-app name="sub-app" url="http://localhost:3000/" baseroute="/sub-app"></micro-app>
>       </div>
>     </template>
>     ```
>
>     

### 子应用配置

> 1. 设置跨域支持
>
>    ```js
>    // vue.config.js
>    devServer: {
>      headers: {
>        'Access-Control-Allow-Origin': '*',
>      }
>    }
>    ```
>
> 2. 设置基础路由(如果基座是history路由，子应用是hash路由，这一步可以省略)
>
>    ```js
>    // main.js
>    // vue2配置
>    import VueRouter from 'vue-router'
>    import routes from './router'
>    
>    const router = new VueRouter({
>      mode: 'history',
>      // 👇 __MICRO_APP_BASE_ROUTE__ 为micro-app传入的基础路由
>      base: window.__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL,
>      routes,
>    })
>    // vue3配置
>    import { createRouter, createWebHistory } from 'vue-router'
>    import routes from './router'
>    
>    const router = createRouter({
>      // 👇 __MICRO_APP_BASE_ROUTE__ 为micro-app传入的基础路由
>      history: createWebHistory(window.__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL),
>      routes,
>    })
>    ```
>
> 3. 设置 publicPath
>
>    ```js
>    // 这一步借助了webpack的功能，避免子应用的静态资源使用相对地址时加载失败的情况，详情参考webpack文档 publicPath
>    // 如果子应用不是webpack构建的，这一步可以省略。
>    // 1: 在子应用src目录下创建名称为public-path.js的文件，并添加如下内容
>    // __MICRO_APP_ENVIRONMENT__和__MICRO_APP_PUBLIC_PATH__是由micro-app注入的全局变量
>    if (window.__MICRO_APP_ENVIRONMENT__) {
>      // eslint-disable-next-line
>      __webpack_public_path__ = window.__MICRO_APP_PUBLIC_PATH__
>    }
>    // 2: 在子应用入口文件的最顶部引入public-path.js
>    import './public-path'
>    
>    ```
>
> 4. 监听卸载
>
>    ```js
>    // 子应用被卸载时会接受到一个名为unmount的事件，在此可以进行卸载相关操作。
>    // main.js
>    // vue2
>    const app = new Vue(...)
>    // 监听卸载操作
>    window.addEventListener('unmount', function () {
>      app.$destroy()
>    })
>    
>    // vue3
>    const app = createApp(App)
>    app.mount('#app')
>    
>    // 监听卸载操作
>    window.addEventListener('unmount', function () {
>      app.unmount()
>    })
>    
>    ```
>
>    



## Project setup

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

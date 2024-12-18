// Without antd
// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router'

// createApp(App).use(router).mount('#app')

// With antd
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";
import 'ant-design-vue/dist/reset.css';


createApp(App).use(Antd).use(router).mount("#app");

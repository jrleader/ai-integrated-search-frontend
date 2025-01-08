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
import { createPinia } from "pinia";

// import "ant-design-vue/dist/antd.css";
import 'ant-design-vue/dist/reset.css';

// 存储全局状态
const pinia = createPinia()

const app = createApp(App)

app.use(pinia).use(router).use(Antd).mount("#app")

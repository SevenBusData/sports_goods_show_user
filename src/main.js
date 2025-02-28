import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// 设置全局默认请求地址
axios.defaults.baseURL = 'http://localhost:8080';

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.mount('#app');

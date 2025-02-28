import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import axios from 'axios';

// 设置全局默认请求地址
axios.defaults.baseURL = 'http://localhost:8080';

const app = createApp(App);
app.use(ElementPlus);
app.config.globalProperties.$axios = axios;
app.mount('#app');

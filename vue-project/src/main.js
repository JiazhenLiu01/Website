import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import Checkbox from 'primevue/checkbox';
import RadioButton from 'primevue/radiobutton';
import '@/assets/styles.scss';
import router from './router'; // 确保导入router

import Menubar from 'primevue/menubar';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css'; // 修改此行

// 创建一个Vue实例
const app = createApp(App);

// 其他需要的PrimeVue组件
app.component('Menubar', Menubar);
app.component('Dropdown', Dropdown);
app.component('Calendar', Calendar);
app.component('Checkbox', Checkbox);
app.component('RadioButton', RadioButton);

// Vue应用配置
app.use(PrimeVue, {ripple: true});
app.component('Button', Button);
app.component('InputText', InputText);
// 其他需要的PrimeVue组件
app.use(router);

app.use(Antd);
// 将Vue实例挂载到DOM上
app.mount('#app');

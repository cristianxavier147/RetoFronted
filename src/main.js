import "primeflex/primeflex.css";
import 'primeicons/primeicons.css'
import "primevue/resources/themes/lara-light-teal/theme.css";
import "./style.css";

import { createApp } from "vue";
import App from "./App.vue";

import PrimeVue from "primevue/config";
import AnimateOnScroll from 'primevue/animateonscroll';
import Badge from 'primevue/badge';
import BadgeDirective from "primevue/badgedirective";
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Rating from 'primevue/rating';
import Sidebar from 'primevue/sidebar';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Tag from 'primevue/tag';
import Tooltip from 'primevue/tooltip';


const app = createApp(App);

app.use(PrimeVue, { ripple: true  });
app.use(ToastService);

app.directive('tooltip', Tooltip);

app.component('Badge', Badge);
app.component('Button', Button);
app.component('Column', Column);
app.component('DataTable', DataTable);
app.component('InputNumber', InputNumber);
app.component('InputText', InputText);
app.component('Rating', Rating);
app.component('Sidebar', Sidebar);
app.component('Tag', Tag);
app.component('Toast', Toast);

app.mount("#app");

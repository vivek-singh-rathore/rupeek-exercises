import Vue from 'vue';
import App from './App.vue';
import router from './router/router.js';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/webfonts/fa-regular-400.woff';

Vue.config.productionTip = false;
Vue.use(VueToast);

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
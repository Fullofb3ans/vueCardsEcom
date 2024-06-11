import { createWebHistory, createRouter } from 'vue-router';

import Vsearch from './components/pages/Vsearch.vue';
import Vhome from './components/pages/Vhome.vue';
import VcardInner from './components/pages/VcardInner.vue';
import Vcart from './components/pages/Vcart.vue';
import Сheckout from './components/pages/СheckOut.vue';
import LoginForm from './components/pages/LoginForm.vue';
import AdminPanel from './components/pages/AdminPanel.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', component: Vhome, name: 'home'
        },
        {
            path: '/search', component: Vsearch, name: 'search'
        },
        {
            path: '/product/:id', component: VcardInner, name: 'aboutProduct', props: true
        }
        ,
        {
            path: '/cart', component: Vcart, name: 'cart', props: true
        }
        ,
        {
            path: '/checkout', component: Сheckout, name: 'checkout', props: true
        }
        ,
        {
            path: '/login', component: LoginForm, name: 'login', props: true
        }
        ,
        {
            path: '/adminPanel', component: AdminPanel, name: 'adminPanel', props: true
        }
    ]
});
export default router;
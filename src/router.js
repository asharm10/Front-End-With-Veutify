import SignIn from './components/SignIn.vue'
import RegisterName from './components/Register.vue'
import AdminPage from './components/Admin.vue'
import ClientPage from './components/Client.vue'
import ServerLogin from './components/ServerLogin.vue'
import ServerPage from './components/ServerPage.vue'

import Vue from 'vue';
import Router from 'vue-router';
import store from './store.js'


Vue.use(Router)


const routes = [
    {
        path: "/",
        redirect: SignIn
    },
    {
        name: "SignIn",
        component: SignIn,
        path: "/admin/signin",
    },
    {
        name: "RegisterName",
        component: RegisterName,
        path: "/admin/register",
    },
    {
        name: "AdminPage",
        component: AdminPage,
        path: "/admin",
    },

    {
        name: "ClientPage",
        component: ClientPage,
        path: "/:id/client",
    },
    {
        name:"ServerLogin",
        component: ServerLogin,
        path:"/server/signin/:id"
    },
    {
        name:"ServerPage",
        component:ServerPage,
        path:"/:id/server"
    }

];

const router = new Router({
    mode: 'history',
    routes,
})

router.beforeEach((to, from, next) => {
    console.log(store.state.isUserLoggedIn);
    if (to.fullPath === '/admin' && store.state.isUserLoggedIn === false) {
        next('/signin');
    }

    else if ((to.fullPath === '/register' || to.fullPath === '/signin') && store.state.isUserLoggedIn === true) {
        next('/admin');
    }

    else if (to.name === 'ServerPage' && store.state.isServerLoggedIn === false) {
        next({name:"ServerLogin"});
    }

    else if (to.name === 'ServerLogin' && store.state.isServerLoggedIn === true) {
        next({name:"ServerPage"});
    }

    else {
        next();
    }

});


export default router;
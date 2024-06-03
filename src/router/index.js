import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import AboutView from '../views/AboutView.vue'
import Home from '../views/Home.vue'
import Wishlist from '../views/Wishlist.vue'
// import Calender from '../views/Calender.vue'
// import ExpenseTracker from '../views/ExpenseTracker.vue'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/about',
            name: 'about',
            component: AboutView 
        },
        {
            path:'/home',
            name: 'home',
            component: Home 
        },
        {
            path: '/wishlist',
            name: 'wishlist',
            component: Wishlist,
        },
        {
            path: '/login',
            name: 'login',
            component: Login 
        },
        {
            path: '/',
            name: 'login',
            component: Login 
        },
        
    ]
})

export default router
    // history: createWebHistory(import.meta.env.BASE_URL),

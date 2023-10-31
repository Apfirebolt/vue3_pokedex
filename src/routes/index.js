import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import NotFound from '../pages/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/pokemon',
        name: 'PokemonList',
        // lazy load the component
        component: () => import('../pages/Pokemon.vue')
    },
    {
        path: '/move',
        name: 'MoveList',
        component: () => import('../pages/Move.vue')
    },
    {
        path: '/item',
        name: 'ItemList',
        component: () => import('../pages/Item.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

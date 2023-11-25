import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
} from "vue-router";

import Home from "../pages/Home.vue";
import NotFound from "../pages/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home  
  },
  {
    path: "/pokemon",
    name: "PokemonList",
    // lazy load the component
    component: () => import("../pages/Pokemon.vue"),
  },
  {
    path: "/pokemon/:name",
    name: "PokemonDetail",
    component: () => import("../pages/PokemonDetail.vue"),
  },
  {
    path: "/move",
    name: "MoveList",
    component: () => import("../pages/Move.vue"),
  },
  {
    path: "/move/:name",
    name: "MoveDetail",
    component: () => import("../pages/MoveDetail.vue"),
  },
  {
    path: "/item",
    name: "ItemList",
    component: () => import("../pages/Item.vue"),
  },
  {
    path: "/item/:name",
    name: "ItemDetail",
    component: () => import("../pages/ItemDetail.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

export const createRouter = () =>
  _createRouter({
    history: import.meta.env.SSR
      ? createMemoryHistory("/")
      : createWebHistory("/"),
    routes,
  });

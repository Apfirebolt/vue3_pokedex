import { createSSRApp } from "vue";
import App from "./App.vue";
import { createRouter } from "./routes";
import { createPinia } from 'pinia'
import mitt from 'mitt';

import './style.css'

const emitter = mitt();

export function createApp() {
 const app = createSSRApp(App);
 const pinia = createPinia();
 app.use(pinia);
 const router = createRouter();
 app.use(router);
 app.config.globalProperties.emitter = emitter;
 return { app, router };
}


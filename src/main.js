import { createApp } from 'vue'
import { createPinia } from 'pinia'
import mitt from 'mitt';
import App from './App.vue'
import router from './routes'

import './style.css'

const emitter = mitt();

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.config.globalProperties.emitter = emitter;

app.mount('#app');





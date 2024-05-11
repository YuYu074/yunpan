import '@/styles/reset.css'
import '@/styles/global.scss'
import 'uno.css'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { setupRouter } from './router'
import { setupStore } from './store'
import { setupNaiveDiscreteApi } from './utils'
import { setupDirectives } from './directives'

async function bootstrap() {
  const app = createApp(App)
  setupStore(app)
  setupNaiveDiscreteApi()
  setupDirectives(app)
  await setupRouter(app)
  app.use(ElementPlus)
  app.mount('#app')
}

bootstrap()

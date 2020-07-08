import { defineComponent } from '@vue/runtime-core'
import { createApp } from './src/runtime-canvas/index'
import App from './src/App'
import { getCanvasRootContainer } from './src/Game'

const app = createApp(App)
app.mount(getCanvasRootContainer())
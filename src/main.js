import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import './assets/tailwind.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark',
        themes:{
            light: {
                colors: {
                    accent: '#00E676',
                    error: '#B71C1C'
                },

            },
            dark: {
                colors: {
                    accent: '#00E676',
                    error: '#B71C1C'
                }
            }
        }
    },
    icons: {
        defaultSet: 'mdi'
    },
})

const app = createApp(App)
app.use(router)
app.use(vuetify);
app.mount('#app')

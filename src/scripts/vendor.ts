import '@/scss/vendor.scss'
import './components/btn-ripple'
import './components/dailog'

import ThemeSwitch from '@/components/theme-switch/index.vue'
import { createApp } from 'vue'
const discuss = createApp(ThemeSwitch)
discuss.mount('.theme-switch')

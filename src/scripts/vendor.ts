import '@/scss/vendor.scss'
import './components/btn-ripple'
import './components/dailog'

import $ from 'jquery'

import ThemeSwitch from '@/components/theme-switch/index.vue'
import { createApp } from 'vue'

$.when( $.ready ).then(() => {
  const themeSwitch = createApp(ThemeSwitch)
  themeSwitch.mount('.theme-switch')
  $('.btn-top-menu').on('click', function () {
    const nav = $(this).next('.nav-ul')
    if (nav.is(':hidden')) {
      nav.css('display', 'flex')
    } else {
      nav.hide()
    }
  })
  $('.btn-sub-nav-menu').on('click', function () {
    const nav = $(this).next('.sub-nav')
    if (nav.is(':hidden')) {
      nav.show()
    } else {
      nav.hide()
    }
  })
  $(window).on('resize', (event) => {
    const _nav = $('.btn-top-menu').next('.nav-ul')
    if (document.body.clientWidth > 720) {
      _nav.css('display', 'flex')
    } else {
      _nav.css('display', 'none')
    }
  })
})

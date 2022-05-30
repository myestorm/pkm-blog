<template>
  <div class="theme-switch">
    <button class="btn light-dark-switch" @click="changeTheme">
      <i class="icon icon-sun">
        <IconMoon v-if="isDark" />
        <IconSun v-else />
      </i>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import IconSun from '@icons/sun.svg?component'
import IconMoon from '@icons/moon.svg?component'

export default defineComponent({
  components: {
    IconSun,
    IconMoon
  },
  setup () {
    const localStorageName = 'tototnoo-theme-mode'
    const attrName = 'totonoo-theme'
    const mode = localStorage.getItem(localStorageName) || ''

    if (mode === 'dark') {
      document.body.setAttribute(attrName, mode)
    } else {
      document.body.removeAttribute(attrName)
    }

    const isDark = ref(mode === 'dark')
    const changeTheme = () => {
      const _mode = localStorage.getItem(localStorageName) || ''
      if (_mode === 'dark') {
        localStorage.removeItem(localStorageName)
        document.body.removeAttribute(attrName)
        isDark.value = false
      } else {
        localStorage.setItem(localStorageName, 'dark')
        document.body.setAttribute(attrName, 'dark')
        isDark.value = true
      }
    }
    return {
      isDark,
      changeTheme
    }
  }
})
</script>

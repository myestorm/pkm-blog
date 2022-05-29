<template>
  <div class="discuss">
    <h2 class="discuss-title">评论</h2>
    <discuss-form />
    <div class="discuss-reply-form" :style="styles" v-if="visiable">
      <h3>回复 #{{level}} <button @click="hideReplyForm"><IconRemove /></button></h3>
      <discuss-form />
    </div>
    <div class="discuss-list">
      <list-component :list="list" @showReplyForm="showReplyForm" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import $ from 'jquery'
import IconRemove from '../../../fragments/icons/remove.svg?component'
import DiscussForm from './form.vue'
import ListComponent, { IDiscussType } from './list.vue'

export default defineComponent({
  components: {
    ListComponent,
    DiscussForm,
    IconRemove
  },
  setup () {
    const list = ref<IDiscussType[]>([])
    const level = ref<number>(0)
    const visiable = ref(false)
    const styles = ref({
      left: '0',
      top: '0'
    })
    const discussBox = document.getElementById('totonoo-discuss') as HTMLElement
    
    const showReplyForm = (event: Event, item: IDiscussType) => {
      const discussBoxRect = discussBox.getBoundingClientRect()
      const target = event.target as HTMLElement
      const rect = target.getBoundingClientRect()
      styles.value.top = Math.abs(rect.top - discussBoxRect.top) + 'px'
      styles.value.left = Math.abs(rect.left - discussBoxRect.left + rect.width + 12) + 'px'
      level.value = item.level
      visiable.value = true
    }
    const hideReplyForm = () => {
      visiable.value = false
    }

    const coverToTree = (data: IDiscussType[], pid: string = '') => {
      const res: IDiscussType[] = []
      data.map((item, index) => {
        if (item.reply === pid) {
          const _item = {
            ...item,
            level: index + 1
          }
          _item.children = coverToTree(data, _item.id)
          res.push(_item)
        }
      })
      return res
    }

    const getList = () => {
      $.ajax('/mock/discuss_list.json').done(res => {
        const code = +res.code
        if (code === 0) {
          list.value = coverToTree(res.data)
        }
      })
    }
    getList()

    return {
      list,
      level,
      visiable,
      styles,
      showReplyForm,
      hideReplyForm
    }
  },
})
</script>
<style lang="scss" scoped>
.discuss {
  position: relative;
  margin-top: 1rem;
  &-title {
    font-size: 1.2rem;
    padding: 0.5rem 0;
  }
  &-reply-form {
    position: absolute;
    background-color: #ffffff;
    left: 0;
    top: 0;
    z-index: 3;
    box-shadow: 2px 2px 18px rgb(0 0 0 / 10%);
    padding: 1rem;
    h3 {
      font-size: px2rem(14px);
      position: relative;
      padding-bottom: 1rem;
    }
    button {
      margin: 0;
      padding: 0;
      background: transparent;
      border: 0;
      font-size: px2rem(12px);
      cursor: pointer;
      font-weight: normal;
      position: absolute;
      right: 0;
      top: 0;
      &:hover {
        color: var(--color-primary);
      }
      svg {
        width: 1rem;
        height: 1rem;
      }
    }
  }
}
</style>

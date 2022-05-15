<template>
  <div class="discuss">
    <h2 class="discuss-title">评论</h2>
    <discuss-form />
    <div class="discuss-reply-form" :style="styles" v-if="visiable">
      <h3>回复 #2 <button @click="hideReplyForm"><IconRemove /></button></h3>
      <discuss-form />
    </div>
    <div class="discuss-list">
      <ul>
        <li>
          <div class="item-box">
            <div class="avatar">
              <img src="/images/user.png">
            </div>
            <div class="content">
              电脑硬盘还存在全通关档，看了CG。发现。并没有什么好玩… 主要真的就是斗地主带点福利那种。首先你要赢~
            </div>
            <div class="order">#1</div>
            <div class="userinfo">
              <span>小盆友</span>
              <span>7天前</span>
              <button class="btn-reply" @click="showReplyForm($event)">回复</button>
            </div>
          </div>

          <ul>
            <li>
              <div class="item-box">
                <div class="avatar">
                  <img src="/images/user.png">
                </div>
                <div class="content">
                  电脑硬盘还存在全通关档，看了CG。发现。并没有什么好玩… 主要真的就是斗地主带点福利那种。首先你要赢~
                </div>
                <div class="order">#1</div>
                <div class="userinfo">
                  <span>小盆友</span>
                  <span>7天前</span>
                  <button class="btn-reply" @click="showReplyForm($event)">回复</button>
                </div>
              </div>
            </li>
            <li>
              <div class="item-box">
                <div class="avatar">
                  <img src="/images/user.png">
                </div>
                <div class="content">
                  电脑硬盘还存在全通关档，看了CG。发现。并没有什么好玩… 主要真的就是斗地主带点福利那种。首先你要赢~
                </div>
                <div class="order">#1</div>
                <div class="userinfo">
                  <span>小盆友</span>
                  <span>7天前</span>
                  <button class="btn-reply" @click="showReplyForm($event)">回复</button>
                </div>
              </div>
            </li>
          </ul>

        </li>
        <li>
          <div class="item-box">
            <div class="avatar">
              <img src="/images/user.png">
            </div>
            <div class="content">
              电脑硬盘还存在全通关档，看了CG。发现。并没有什么好玩… 主要真的就是斗地主带点福利那种。首先你要赢~秦魏魏曹金姚姚尤朱朱伍朱褚施韩金薛蒋孔施姚尹云郑尹陈郑尹陈王尹云吴尹陈窦尹水赵尹云周尹水冯尹水水尹云吴尹水赵尹陈钱尹云吴尹福吴尹水李伍吕褚张沈吕孔华沈伍朱尤华吕金伍杨华韩韩伍沈孔戚张吕孔褚沈薛秦魏施吕
            </div>
            <div class="order">#1</div>
            <div class="userinfo">
              <span>小盆友</span>
              <span>7天前</span>
              <button class="btn-reply" @click="showReplyForm($event)">回复</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import IconRemove from '../../../fragments/icons/remove.svg?component'
import DiscussForm from './form.vue'

interface IDiscussType {
  title: string,
  user: {
    username: string,
    avatar: string
  },
  content: string,
  created: Date,
  reply?: IDiscussType[]
}

export default defineComponent({
  components: {
    DiscussForm,
    IconRemove
  },
  setup () {
    const list: IDiscussType[] = []
    const visiable = ref(false)
    const styles = ref({
      left: '0',
      top: '0'
    })
    const discussBox = document.getElementById('totonoo-discuss') as HTMLElement
    
    const showReplyForm = (event: MouseEvent) => {
      const discussBoxRect = discussBox.getBoundingClientRect()
      const target = event.target as HTMLElement
      const rect = target.getBoundingClientRect()
      styles.value.top = Math.abs(rect.top - discussBoxRect.top) + 'px'
      styles.value.left = (rect.left + 10) + 'px'
      visiable.value = true
    }
    const hideReplyForm = () => {
      visiable.value = false
    }
    return {
      list,
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
  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    ul {
      padding-left: 3rem;
    }
  }
  .avatar {
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 100%;
    background-color: var(--color-white);
    box-shadow: 2px 2px 18px rgba(0,0,0,0.1);
    border: 1px var(--color-white) solid;
  }
  .item-box {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    border-bottom: 1px solid var(--color-border);
    padding: 0.5rem;
    margin: 0.5rem;
    position: relative;
    .content {
      flex: 1;
      padding-bottom: 2rem;
    }
    .userinfo {
      width: 50%;
      position: absolute;
      left: 5rem;
      bottom: 0.5rem;
      display: flex;
      gap: 0.5rem;
      color: #999999;
      font-size: px2rem(12px);
      button {
        margin: 0;
        padding: 0;
        background: transparent;
        border: 0;
        color: var(--color-primary);
        font-size: px2rem(12px);
        cursor: pointer;
      }
    }
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
      svg {
        width: 1rem;
        height: 1rem;
      }
    }
  }
}
</style>

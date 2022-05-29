<template>
  <ul v-if="list && list.length > 0">
    <li v-for="item in list" :key="item.id">
      <div class="item-box">
        <div class="avatar">
          <img :src="item.user.avatar">
        </div>
        <div class="content">
          <strong v-if="item.title" class="title">{{item.title}}</strong>
          {{item.content}}
        </div>
        <div class="order">#{{item.level}}</div>
        <div class="userinfo">
          <span>{{item.user.username}}</span>
          <span>{{timeAgo(item.created)}}</span>
          <button class="btn-reply" @click="showReplyForm($event, item)">回复</button>
        </div>
      </div>
      <list-component :list="item.children" @showReplyForm="showReplyForm" />
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { timeAgo } from '../../scripts/utils/dayjs'

export interface IDiscussType {
  id: string,
  title: string,
  user: {
    username: string,
    avatar: string
  },
  content: string,
  created: Date,
  reply: string,
  level: number,
  children?: IDiscussType[]
}

interface Props {
  list: IDiscussType[]
}

export default defineComponent({
  name: 'list-component',
  props: {
    list: {
      type: Array as PropType<Props['list']>,
      default: []
    }
  },
  emits: ['showReplyForm'],
  setup (props, ctx) {
    return {
      timeAgo,
      showReplyForm (event: Event, item: IDiscussType) {
        ctx.emit('showReplyForm', event, item)
      }
    }
  }
})
</script>
<style lang="scss" scoped>
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
.title {
  display: block;
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
</style>

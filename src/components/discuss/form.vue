<template>
  <div class="discuss-form" :class="[isFocus ? 'discuss-form-focus' : '']">
    <div class="discuss-user-info">
      <ul>
        <li>
          <label>
            <span>昵称（必填）</span>
            <input class="input" />
          </label>
        </li>
        <li>
          <label>
            <span>邮箱（必填）</span>
            <input class="input" />
          </label>
        </li>
      </ul>
    </div>
    <div class="discuss-form-say">
      <div class="col">
        <div class="avatar">
          <img src="/images/user.png">
        </div>
        <textarea @blur="blurHandler" @focus="focusHandler" placeholder="评论人工审核，请勿发表违规内容、无意义内容。评论时填写正确的邮箱，有人回复你会收到邮件提醒。"></textarea>
      </div>
      <div class="discuss-btn">
        <button>提交评论</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const isFocus = ref(false)
    const focusHandler = () => {
      isFocus.value = true
    }
    const blurHandler = () => {
      isFocus.value = false
    }
    return {
      isFocus,
      focusHandler,
      blurHandler
    }
  }
})
</script>
<style lang="scss" scoped>
.discuss {
  &-form {
    display: block;
  }
  &-user-info {
    ul, li {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    ul {
      display: flex;
      gap: 1rem;
    }
    .input {
      @include transition();
      border: 1px solid var(--color-input-border);
      border-radius: px2rem(2px);
      outline: 0;
      padding: 0 0.5rem;
      margin: 0;
      line-height: px2rem(32px);
      font-size: px2rem(14px);
      &:focus {
        border-color: var(--color-primary);
        box-shadow: 0 0 0 1px var(--color-primary) inset;
      }
      &::placeholder {
        color: var(--color-text-disabled);
      }
    }
  }
  &-form-say {
    @include transition();
    width: 100%;
    border: 2px solid var(--color-border);
    margin-top: 1rem;
    border-radius: px2rem(8px);
    overflow: hidden;
    .col {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      .avatar {
        width: 2.4rem;
        height: 2.4rem;
        border-radius: 100%;
        background-color: var(--color-white);
        box-shadow: 2px 2px 18px rgba(0,0,0,0.1);
        border: 1px var(--color-white) solid;
      }
      textarea {
        flex: 1;
        border: 0;
        height: 5rem;
        outline: none;
        resize: none;
        &::placeholder {
          color: #999999;
        }
      }
    }
    .discuss-btn {
      border-top: 0 solid var(--color-border);
      text-align: right;
      background-color: rgba(var(--rgb-black), 0.02);
      height: px2rem(34px);
      position: relative;
      button {
        background-color: var(--color-primary);
        color: var(--color-white);
        border: 1px solid var(--color-primary);
        cursor: pointer;
        line-height: px2rem(34px);
        padding: 0 1.5rem;
        position: absolute;
        right: -2px;
        top: 0
      }
    }
  }
  &-form-focus {
    .discuss-form-say {
      border-color: var(--color-primary);
    }
  }
}
</style>

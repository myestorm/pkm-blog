<template>
  <div class="discuss-form" :class="[isFocus ? 'discuss-form-focus' : '']">
    <div class="discuss-user-info">
      <ul>
        <li>
          <label>
            <span>昵称（必填）</span>
            <input class="input" ref="nicknameInput" v-model="nickname" />
          </label>
        </li>
        <li>
          <label>
            <span>邮箱（必填）</span>
            <input class="input" ref="emailInput" v-model="email" />
          </label>
        </li>
      </ul>
    </div>
    <div class="discuss-form-say">
      <div class="col">
        <div class="avatar">
          <img src="/images/user.png">
        </div>
        <textarea @blur="blurHandler" ref="contentInput" @focus="focusHandler" placeholder="评论人工审核，请勿发表违规内容、无意义内容。评论时填写正确的邮箱，有人回复你会收到邮件提醒。" v-model="content"></textarea>
      </div>
      <div class="discuss-btn">
        <div class="tips">{{errmsg}}</div>
        <button :disabled="!posting" @click="submit">提交评论</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import $ from 'jquery'

export default defineComponent({
  setup () {
    const isFocus = ref(false)
    const focusHandler = () => {
      isFocus.value = true
    }
    const blurHandler = () => {
      isFocus.value = false
    }
    const nicknameInput = ref()
    const emailInput = ref()
    const contentInput = ref()
    const nickname = ref('')
    const email = ref('')
    const content = ref('')
    const errmsg = ref('')
    const posting = ref(true)
    const submit = () => {
      if (!nickname.value) {
        errmsg.value = '请填写您的昵称'
        nicknameInput.value.focus()
        return false
      }
      if (!email.value) {
        errmsg.value = '请填写您的邮箱'
        emailInput.value.focus()
        return false
      }
      if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email.value)) {
        errmsg.value = '请填写正确的邮箱'
        emailInput.value.focus()
        return false
      }
      if (!content.value) {
        errmsg.value = '总得说点什么'
        contentInput.value.focus()
        return false
      }
      errmsg.value = ''
      posting.value = false
      $.post('/mock/discuss.json', {
        nickname: nickname.value,
        email: email.value,
        content: nickname.value
      }).done(res => {
        const code = +res.code
        if (code !== 0) {
          errmsg.value = res.msg
        } else {
          content.value = ''
        }
      }).fail(_ => {
        errmsg.value = '提交失败'
      }).always(() => {
        posting.value = true
      })
    }
    return {
      isFocus,
      focusHandler,
      blurHandler,
      nickname,
      email,
      content,
      errmsg,
      posting,
      submit,
      nicknameInput,
      emailInput,
      contentInput
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
      flex-wrap: wrap;
      gap: 1rem;
    }
    li label {
      display: flex;
      align-items: center;
      > span {
        white-space: nowrap;
      }
      .input {
        flex: 1;
      }
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
      &.error {
        border-color: var(--color-error);
        box-shadow: 0 0 0 1px var(--color-error) inset;
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
      background-color: rgba(var(--rgb-black), 0.02);
      height: px2rem(34px);
      position: relative;
      .tips {
        color: var(--color-error);
        padding: 0 0 0 1rem;
        line-height: px2rem(34px);
      }
      button {
        background-color: var(--color-primary);
        color: var(--color-white);
        border: 1px solid var(--color-primary);
        cursor: pointer;
        line-height: px2rem(34px);
        padding: 0 1.5rem;
        position: absolute;
        right: -2px;
        top: 0;
        &[disabled] {
          opacity: 0.4;
          cursor: not-allowed;
        }
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

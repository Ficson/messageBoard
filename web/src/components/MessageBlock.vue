<template>
  <div class="message-block">
    <div class="header" :style="'background-color:' + backgroundColor + ';'">
      <span class="header-left">
        <span class="line" :style="'background:' + fontColor + ';'"></span>
        <span class="title" :style="'color:' + fontColor + ';'">{{ title }}</span>
      </span>
      <span class="header-right">
        <slot name="edit"></slot>
      </span>
    </div>
    <div class="bottom">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageBlock',
  props: {
    fontColor: {
      type: String,
      default: '#1B81C8',
    },
    backgroundColor: {
      type: String,
      default: '#E6F6FF',
    },
    title: {
      type: String,
      default: '基本信息',
    },
  },
}
</script>

<style scoped lang="scss">
.message-block {
  .header {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 14px 0 30px;
    .header-left {
      .line {
        width: 2px;
        height: 14px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
      }
      .title {
        vertical-align: middle;
      }
    }
    .header-right {
      float: right;
    }
  }
  .bottom {
    padding: 10px 27px;
    background: white;
    .content {
    }
  }
}
</style>

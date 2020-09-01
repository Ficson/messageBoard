<template>
  <div class="container">
    <svg-icon icon-class="404" class="icon404"/>
    <div style="font-size: 40px;">页面未找到</div>
  </div>
</template>

<script>
export default {
  name: '404',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
  .icon404 {
    font-size: 500px;
    color: pink;
  }
}
</style>

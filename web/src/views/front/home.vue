<template>
  <section class="home">
    <p>首页</p>
    <img src="@/assets/images/city.png" />
  </section>
</template>

<script>
export default {
  name: 'Home',

  data() {
    return {}
  },

  methods: {},
}
</script>

<style lang="scss">
.home {
  text-align: center;
  height: 600px;
  background: #d0cfed;
  padding-top: 15px;
  p {
    font-size: 46px;
    font-weight: bold;
  }
  img {
    width: 700px;
  }
}
</style>

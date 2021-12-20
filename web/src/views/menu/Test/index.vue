<template>
  <div>
    我是数据统计 <br />
    {{ new Date('2019-12-10 10:25:10').getTime() | formatDatetime }} <br />
    {{ new Date('2019-12-23 10:25:10').getTime() | timeAgo }} <br />
    {{ 45450 | moneyF2Y }} <br />
    {{ 154989848 | toThousandFilter }} <br />
    {{ 'sdhfgdhf' | uppercaseFirst }} <br />
    <svg-icon icon-class="404" class="icon404" />
    <br />
    <svg-icon icon-class="admin_circle" />

    <br />
  </div>
</template>

<script>
export default {
  name: 'Test',
  methods: {}
}
</script>

<style lang="scss" scoped>
.icon404 {
  font-size: 50px;
  color: pink;
}
</style>

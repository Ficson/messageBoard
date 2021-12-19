export default {
  methods: {
    openLoading({lock = true, text = '', spinner = 'el-icon-loading', background = 'rgba(255, 255, 255, 0.6)', customClass = 'mixin-loading'} = {}) {
      // element的loading方法
      this.loadingFormMixin = this.$loading({
        lock,
        text,
        spinner,
        background,
        customClass,
      })
    },

    closeLoading() {
      this.loadingFormMixin.close()
    },
  },
}

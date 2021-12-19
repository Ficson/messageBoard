<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="visible"
      @close="$emit('update:show', false)"
      :width="dialogWidth"
      :show="show"
      class="confirm-dialog"
      :showClose="showClose"
      :close-on-click-modal="false"
    >
      <slot name="content"></slot>
      <span slot="footer" class="dialog-footer" v-if="isShow">
        <el-button @click="visible = false" v-if="hasCancelBtn">取 消</el-button>
        <el-button type="primary" @click="confirm">{{ confirmText }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  data() {
    return {
      visible: this.show,
      showClose: false,
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: 'hhh',
    },
    hasCancelBtn: {
      type: Boolean,
      default: true,
    },
    dialogWidth: {
      type: String,
      default: '365px',
    },
    confirmText: {
      type: String,
      default: '确认',
    },
  },
  watch: {
    show() {
      this.visible = this.show
    },
  },
  methods: {
    confirm() {
      this.$emit('handleConfirm')
    },
  },
}
</script>

<style lang="scss">
.confirm-dialog {
  .el-dialog__header {
    height: 40px;
    background: #0089cd;
    text-align: center;
    padding-top: 10px;
  }
  .el-dialog__title {
    color: white;
  }
  .el-dialog__footer {
    text-align: center !important;
  }
  .el-dialog__body {
    padding: 30px 20px 5px;
  }
}
</style>

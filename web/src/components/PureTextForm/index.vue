<template>
  <el-form
    ref="form"
    class="page-form"
    :class="className"
    :model="data"
    :rules="rules"
    :label-width="labelWidth"
    :inline="true"
  >
  <template  v-for="(item, index) in getConfigList()">
    <el-form-item
      v-if="!item.invisible"
      :key="index"
      :prop="item.value"
      :label="`${item.label ? item.label+':': ''}`"
      :class="item.className"
      :style="`width: ${item.formItemWidth || formItemWidth};`"
    >
      <!-- solt -->
      <template v-if="item.type === 'slot'">
        <slot :name="'form-' + item.value" />
      </template>
      <!-- 普通输入框 -->
      <span
        v-if="item.type === 'input' || item.type === 'password'"
        :style="`width: ${contentWidth};`"
      >
      {{data[item.value]}}
      </span>
      <!-- textarea -->
      <span
        v-if="item.type === 'textarea'"
        :style="`width: ${contentWidth};`"
      >
      {{data[item.value]}}
      </span>
      <!-- 选择框 -->
      <span
        v-if="item.type === 'select' && data[item.value]"
        :style="`width: ${contentWidth};`"
      >{{listTypeInfo[item.list].find(li => li.value === data[item.value]).label}}
      </span>
      <!-- 日期选择框 -->
      <span
        v-if="item.type === 'date'"
        :style="`width: ${contentWidth};`"
      > {{data[item.value]}}
      </span>
       <!-- 日期范围选择 -->
      <span
        v-if="item.type === 'datetimerange' && data[item.value]"
        :style="`width: ${contentWidth};`"
      >
        {{data[item.value][0] ? data[item.value][0] : ''}} - {{ data[item.value][1] ? data[item.value][1] : ''}}
      </span>
      <!-- 信息展示框 -->
      <el-tag v-if="item.type === 'tag'">
        {{ $utils.getDataName({dataList: listTypeInfo[item.list], value: 'value', label: 'key', data: data[item.value]})}}
      </el-tag>
       <!-- 单选框 -->
      <span
        v-if="item.type === 'radio' && data[item.value]"
        :style="`width: ${contentWidth};`"
      >
      {{listTypeInfo[item.list].find(li => li.value === data[item.value]).label}}
      </span>
       <!-- 文本显示 -->
      <span v-if="item.type === 'text'" :style="`width: ${contentWidth};`">
        {{ $utils.getDataName({dataList: listTypeInfo[item.list], value: 'value', label: 'key', data: data[item.value]}) }}
      </span>
       <!-- 上传图片 -->
      <span v-if="item.type === 'upload'"
        class="avatar-uploader"
      >
        <img :src="data[item.value]" class="avatar" v-if="data[item.value]" />
        <div v-else class="empty">
          <svg-icon icon-class="pic" class="pic"/>
        </div>
        <div class="title">{{item.name}}</div>
      </span>
    </el-form-item>
  </template>
  </el-form>
</template>

<script>
export default {
  name: 'PureTexForm',
  props: {
    // 自定义类名
    className: {
      type: String
    },
    // 表单数据
    data: {
      type: Object
    },
    // 相关字段
    fieldList: {
      type: Array
    },
    // 验证规则
    rules: {
      type: Object
    },
    // label宽度
    labelWidth: {
      type: String,
      default: '120px'
    },
    // form-item宽度
    formItemWidth: {
      type: String,
      default: '33.3%'
    },
    // 表单内容宽度
    contentWidth: {
      type: String,
      default: '200px'
    },
    refObj: {
      type: Object
    }
  },
  data () {
    return {
      listTypeInfo: this.$selectList // 所有下拉框的选项
    }
  },
  watch: {
    data: {
      handler: function (val) {
        // 将form实例返回到父级
        this.$emit('update:refObj', this.$refs.form)
        // this.initPics()
      },
      deep: true // 深度监听
    },
  },
  mounted () {
    // 将form实例返回到父级
    this.$emit('update:refObj', this.$refs.form)
    this.initRules()
    // this.$nextTick(()=>{
    // })
  },
  methods: {
    initRules() {
      let rules = this.$initRules(this.fieldList)
      this.$emit('update:rules', rules)
      // this.$refs.form.resetFields()
      this.$nextTick(() => {
        this.$refs.form.clearValidate() // 不知道为什么刚进来自动触发，这里清除一下
      })
    },
    // 获取字段列表
    getConfigList () {
      return this.fieldList.filter(item => !item.hasOwnProperty('show') || (item.hasOwnProperty('show') && item.show))
    },
    // 绑定的相关事件
    handleEvent(event, data) {
      this.$emit('handleEvent', event, data)
    },
  }
}
</script>

<style lang="scss" scoped>
// 自定义form相关
.page-form{
  padding-top:10px;
}

// 上传
</style>
<style lang="scss">
.page-form{
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .empty {
    width: 178px;
    height: 178px;
    display: block;
    border: 1px solid #D0D0D0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pic{
    font-size: 35px;
  }
  .avatar-uploader .title{
    text-align: center;
  }
}
  </style>

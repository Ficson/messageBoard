<template>
  <el-form ref="form" class="page-form" :class="className" :model="data" :rules="rules" :label-width="labelWidth" :inline="true">
    <!-- style="min-width: 1209px;" -->
    <template v-for="(item, index) in getConfigList()">
      <el-form-item
        v-if="!item.formInvisible && !item.nonEditable"
        :key="index"
        :prop="item.value"
        :label="`${item.label ? item.label + ':' : ''}`"
        :class="item.className"
        :style="`width: ${item.formItemWidth || formItemWidth};`"
      >
        <!-- solt -->
        <template v-if="item.type === 'slot'">
          <slot :name="'form-' + item.value" />
        </template>
        <!-- 普通输入框 -->
        <el-input
          v-if="item.type === 'input' || item.type === 'password'"
          v-model="data[item.value]"
          :type="item.type"
          :disabled="item.disabled"
          :placeholder="getPlaceholder(item)"
          @focus="handleEvent(item.event, data[item.value])"
          :style="`width: ${item.contentWidth || contentWidth};`"
        />
        <!-- textarea -->
        <el-input
          v-if="item.type === 'textarea'"
          v-model.trim="data[item.value]"
          :type="item.type"
          :disabled="item.disabled"
          :placeholder="getPlaceholder(item)"
          :autosize="item.autosize || {minRows: 2, maxRows: 10}"
          @focus="handleEvent(item.event)"
          :style="`width: ${contentWidth};`"
        />
        <!-- 计数器 -->
        <el-input-number
          v-if="item.type === 'inputNumber'"
          v-model="data[item.value]"
          size="small"
          :min="item.min"
          :max="item.max"
          @change="handleEvent(item.event)"
          :style="`width: ${contentWidth};`"
        />
        <!-- 选择框 -->
        <el-select
          v-if="item.type === 'select'"
          v-model="data[item.value]"
          :disabled="item.disabled"
          :clearable="item.clearable"
          :filterable="item.filterable"
          :placeholder="getPlaceholder(item)"
          @change="handleEvent(item.event, data[item.value])"
          :style="`width: ${contentWidth};`"
        >
          <el-option
            v-for="(childItem, childIndex) in listTypeInfo[item.list]"
            :key="childIndex.value"
            :label="childItem.label"
            :value="childItem.value"
          />
        </el-select>
        <!-- 日期选择框 -->
        <el-date-picker
          v-if="item.type === 'date'"
          v-model="data[item.value]"
          :type="item.dateType"
          :picker-options="item.TimePickerOptions"
          :clearable="item.clearable"
          :disabled="item.disabled"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :placeholder="getPlaceholder(item)"
          @focus="handleEvent(item.event)"
          :style="`width: ${contentWidth};`"
        />
        <!-- 日期范围选择 -->
        <el-date-picker
          v-if="item.type === 'datetimerange'"
          v-model="data[item.value]"
          :picker-options="item.TimePickerOptions"
          :clearable="item.clearable"
          :disabled="item.disabled"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          @change="handleEvent(item.event, data[item.value])"
          :style="`width: 230px;`"
        />
        <!-- 信息展示框 -->
        <el-tag v-if="item.type === 'tag'">
          {{ $utils.getDataName({dataList: listTypeInfo[item.list], value: 'value', label: 'key', data: data[item.value]}) }}
        </el-tag>
        <!-- 单选框 -->
        <el-radio-group
          v-if="item.type === 'radio'"
          v-model="data[item.value]"
          :disabled="item.disabled"
          :filterable="item.filterable"
          @change="handleEvent(item.event, data[item.value])"
          :style="`width: ${contentWidth};`"
        >
          <el-radio v-for="childItem in listTypeInfo[item.list]" :key="childItem.value" :label="childItem.value">{{ childItem.label }} </el-radio>
        </el-radio-group>
        <!-- 文本显示 -->
        <span v-if="item.type === 'text'" :style="`width: ${contentWidth};`">
          {{ $utils.getDataName({dataList: listTypeInfo[item.list], value: 'value', label: 'key', data: data[item.value]}) }}
        </span>
        <!-- 上传图片 -->
        <div class="upload-block" v-if="item.type === 'upload'">
          <el-upload class="avatar-uploader" action="" :show-file-list="false" :http-request="getCoverImage.bind(this, item.value)">
            <img v-if="data[item.value]" :src="data[item.value]" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="title">{{ item.name }}</div>
        </div>
      </el-form-item>
    </template>
    <div v-if="btnSetting.isShow" class="bottom-btns">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">{{ btnSetting.confirmText }}</el-button>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'FormTemplate',
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
    // 相关的列表
    // listTypeInfo: {
    //   type: Object
    // },
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
    // 绑定表单实例
    refObj: {
      type: Object
    },
    // 是否存在按钮(默认不显示)
    btnSetting: {
      type: Object,
      default: () => {
        return {
          isShow: false,
          confirmText: '保存',
          validateInside: true
        }
      }
    }
  },
  data() {
    return {
      pics: {},
      autoUpload: false,
      listTypeInfo: this.$selectList // 所有下拉框的选项
    }
  },
  watch: {
    data: {
      handler: function (val) {
        // 将form实例返回到父级
        this.$emit('update:refObj', this.$refs.form)
      },
      deep: true // 深度监听
    }
  },
  mounted() {
    // 将form实例返回到父级
    this.$emit('update:refObj', this.$refs.form)
    // 初始化校验
    this.initRules()
  },
  comoputed: {},
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
    getConfigList() {
      return this.fieldList.filter(item => !item.hasOwnProperty('show') || (item.hasOwnProperty('show') && item.show))
    },

    // 得到placeholder的显示
    getPlaceholder(row) {
      let placeholder
      if (row.type === 'input' || row.type === 'textarea') {
        placeholder = '请输入' + row.label
      } else if (row.type === 'select' || row.type === 'time' || row.type === 'date') {
        placeholder = '请选择' + row.label
      } else {
        placeholder = row.label
      }
      return placeholder
    },

    // 绑定的相关事件
    handleEvent(event, data) {
      this.$emit('handleEvent', event, data)
    },
    // 上传
    getCoverImage(picName, file) {
      console.log(picName)
      const form = new FormData()
      form.append('file', file.file)
      let _this = this
      this.$allRequest.uploadImg(form).then(res => {
        this.$message({type: 'success', message: '上传成功'})
        _this.$set(_this.data, picName, res)
      })
    },

    // 上传图片校验
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg'
      const testPass = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!testPass) {
        this.$message.error('上传头像图片只能是 jpg、jpeg、png 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return testPass && isLt2M
    },

    // 表单的内部保存按钮
    confirm() {
      if (this.btnSetting.validateInside) {
        // 校验
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$emit('handleConfirm', this.dataFilter())
          }
        })
      } else {
        this.$emit('handleConfirm')
      }
    },

    cancel() {
      this.$emit('handleCancel')
    },

    // 过滤后端不需要的信息, 删除空属性
    dataFilter() {
      let data = this.data
      this.fieldList.forEach(item => {
        if (item.submitFilter) {
          delete data[item.value]
        }
      })
      data = this.$utils.deleteEmptyProperty(data)
      return data
    }
  }
}
</script>

<style lang="scss" scoped>
// 自定义form相关
.page-form {
  padding-top: 10px;
  position: relative;
  .bottom-btns {
    position: relative;
    left: 40%;
    margin-bottom: 10px;
    .cancel {
      margin-right: 59px;
    }
    .save {
    }
  }

  .delete-btn {
    position: absolute;
    right: 25px;
    top: 11px;
  }
}

// 上传
</style>
<style lang="scss">
.upload-block {
  //  display: flex;
  //  justify-content: center;
  //  width: 270px;
  //  height: 214px;
  .title {
    text-align: center;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
</style>

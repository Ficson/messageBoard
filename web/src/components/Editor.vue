<template lang="html">
  <div class="editor">
    <!-- <div ref="toolbar" class="toolbar"></div> -->
    <div ref="editor" class="text"></div>
  </div>
</template>

<script>
import EditorCode from 'wangeditor';
import xss from 'xss';
export default {
  name: 'editoritem',
  data () {
    return {
      editor: '',
      editorInfo: null
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    isClear: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isClear (val) {
      // 触发清除文本域内容
      if (val) {
        this.editor.txt.clear();
        this.editorInfo = null;
      }
    },
    // value为编辑框输入的内容，当父组件调用，如果给value赋值，子组件对应显示
    value: function (value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(xss(this.value))
      }
    }
  },
  mounted () {
    this.createEditor();
    // 获取初始内容
    this.editor.txt.html(xss(this.value));
  },
  methods: {
    // 生成富文本编辑器
    createEditor () {
      this.editor = new EditorCode(this.$refs.editor);
      // 配置编辑区域的 z-index
      this.editor.customConfig.zIndex = 100;
      // 上传图片
      this.editor.customConfig.uploadImgServer = '/admin/file/uploadImg';
      this.editor.customConfig.uploadFileName = 'file';
      this.editor.customConfig.uploadImgHeaders = {
        'Accept': 'application/json, text/plain, */*'
      };
      this.editor.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) {
          console.log('before');
        },
        success: function (xhr, editor, result) {
          console.log('success')
        },
        fail: function (xhr, editor, result) {
          console.log('fail')
        },
        error: function (xhr, editor) {
          console.log('error')
        },
        timeout: function (xhr, editor) {
          console.log('timeout')
        },
        customInsert: function (insertImg, result, editor) {
          if (result.retCode === 0) {
            insertImg(result.model.url);
          }
          console.log('customInsert', insertImg, result, editor)
        }
      };
      // 获取html变化后的内容
      this.editor.customConfig.onchange = (html) => {
        this.editorInfo = xss(html);
        this.$emit('change', xss(this.editorInfo));
        console.log('变化内容' + html)
      };

      // 创建
      this.editor.create();
    }
  }
}
</script>

<style lang="css">

</style>

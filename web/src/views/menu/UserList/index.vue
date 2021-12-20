<template>
  <div class="user-list">
    <!--  <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="用户名">
      <el-input v-model="userForm.username" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item label="注册时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="userForm.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker type="fixed-time" placeholder="选择时间" v-model="userForm.date2" style="width: 100%;"></el-time-picker>
    </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="default" @click="reset">重置</el-button>
    </el-form-item>
  </el-form> -->
    <!--  表格 -->
    <el-button type="primary" @click="addUser">添加用户</el-button>
    <TableTemplate ref="tableTemplate" :tableApi="tableApi" :columns="columns" :queryOpts="queryOpts" :operates="operates"> </TableTemplate>
    <!-- 详情弹窗 -->
    <confirm-dialog
      :show.sync="modal1.show"
      :title="modal1.title"
      :hasCancelBtn="modal1.hasCancelBtn"
      @handleConfirm="handleModal1Confirm"
      :dialogWidth="modal1.width"
    >
      <PureTextForm
        slot="content"
        :ref-obj.sync="modal1.ref"
        :data="modal1.data"
        :field-list="modal1.fieldList"
        :label-width="modal1.labelWidth"
        :form-item-width="modal1.formItemWidth"
        :content-width="modal1.contentWidth"
        @handleEvent="handleEvent"
      >
      </PureTextForm>
    </confirm-dialog>
    <!-- 详情弹窗 -->
    <confirm-dialog
      :show.sync="modal2.show"
      :title="modal2.title"
      :hasCancelBtn="modal2.hasCancelBtn"
      @handleConfirm="handleModal2Confirm"
      :dialogWidth="modal2.width"
    >
      <FormTemplate
        slot="content"
        :ref-obj.sync="modal2.ref"
        :data="modal2.data"
        :field-list="modal2.fieldList"
        :rules.sync="modal2.rules"
        :label-width="modal2.labelWidth"
        :form-item-width="modal2.formItemWidth"
        :content-width="modal2.contentWidth"
        @handleEvent="handleEvent"
      >
      </FormTemplate>
    </confirm-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data() {
    return {
      userForm: {
        username: '',
        date1: '',
        date2: ''
      },
      tableApi: this.API_USER_LIST,
      queryOpts: [
        {
          label: '用户名',
          name: 'username',
          type: 'input'
        },
        {
          label: '注册时间',
          name: 'register',
          type: 'date'
        }
      ],
      columns: [
        {
          prop: 'id',
          label: 'id',
          align: 'center'
        },
        {
          prop: 'username',
          label: '用户名',
          align: 'center'
        },
        {
          prop: 'avatar',
          label: '头像',
          align: 'center',
          formatter: (row, column) => {
            return `<img src=${row.avatar} style='width: 50px; height: 50px; border-radius:50%;'/>`
          }
        },
        {
          prop: 'role_id',
          label: '角色',
          align: 'center',
          formatter: (row, column) => {
            return column.role_id === 1 ? '管理员' : '普通用户'
          }
        },
        {
          prop: 'create_time',
          label: '注册时间',
          align: 'center'
        }
      ],
      // 操作按钮组
      operates: {
        // width: 200,
        // fixed: 'right',
        list: [
          {
            label: '详情',
            type: 'primary',
            show: true,
            // icon: 'el-icon-edit',
            plain: true,
            disabled: false,
            method: (index, row) => {
              this.showDetail(row)
            }
          },
          {
            label: '删除',
            type: 'danger',
            show: true,
            // icon: 'el-icon-edit',
            plain: true,
            disabled: false,
            method: (index, row) => {
              this.delUser(row.id)
            }
          }
        ]
      },
      // ---------------查看详情弹窗--------------
      modal1: {
        show: false,
        title: '查看详情',
        hasCancelBtn: true,
        width: '800px',
        ref: null,
        data: {
          id: '',
          username: '',
          tel: '',
          birthday: '',
          avatar: '',
          sex: '',
          email: '',
          role_id: '',
          create_time: ''
        },
        fieldList: [
          {label: 'id', value: 'id', type: 'input', required: true},
          {label: '用户名', value: 'username', type: 'input', required: true},
          {label: '头像', value: 'avatar', type: 'upload', required: true},
          {label: '性别', value: 'sex', type: 'input', required: true},
          {label: '电话', value: 'tel', type: 'input', required: true},
          {label: '生日', value: 'birthday', type: 'input', required: true},
          {label: '邮箱', value: 'email', type: 'input', required: true},
          {label: '角色', value: 'role_id', type: 'input', required: true},
          {label: '注册时间', value: 'create_time', type: 'input', required: true}
        ],
        rules: {}, // 自动根据fieldList生成
        labelWidth: '100px',
        formItemWidth: '48%',
        contentWidth: '200px'
      },
      // ---------------添加用户弹窗--------------
      modal2: {
        show: false,
        title: '添加',
        hasCancelBtn: true,
        width: '400px',
        ref: null,
        data: {
          username: '',
          password: '',
          confirmPassword: ''
        },
        fieldList: [
          {label: '用户名', value: 'username', type: 'input', required: true},
          {label: '密码', value: 'password', type: 'input', required: true},
          {label: '确认密码', value: 'confirmPassword', type: 'input', required: true}
        ],
        rules: {}, // 自动根据fieldList生成
        labelWidth: '100px',
        formItemWidth: '100%',
        contentWidth: '200px'
      }
    }
  },

  methods: {
    // 详情
    showDetail(row) {
      this.modal1.data = row
      this.modal1.show = true
    },
    // 删除
    delUser(id) {
      this.$confirm('确定要删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.handleDel(id)
        })
        .catch(() => {})
    },
    // 确认删除
    handleDel(id) {
      this.$allRequest
        .userDelete({id})
        .then(model => {
          this.$utils.myMessage('删除成功', 'success')
          this.$refs.tableTemplate.loadData()
        })
        .catch(() => {})
    },
    // 添加用户
    addUser() {
      this.modal2.data = {
        username: '',
        password: '',
        confirmPassword: ''
      }
      this.modal2.show = true
    },
    // 详情确认
    handleModal1Confirm() {
      this.modal1.show = false
    },
    // 确认添加
    handleModal2Confirm() {
      this.modal2.ref.validate(valid => {
        if (valid) {
          if (this.modal2.data.password !== this.modal2.data.newPassword) {
            this.$message.error('密码不一致！')
            return
          }
          this.$allRequest
            .axyAdd({
              username: this.modal2.data.username,
              password: this.modal2.data.password
            })
            .then(model => {
              this.modal2.show = false
              this.$utils.myMessage('新增成功', 'success')
              this.$refs.tableTemplate.loadData()
            })
            .catch(() => {})
        }
      })
    },
    handleEvent() {}
  }
}
</script>

<style lang="scss" scoped></style>

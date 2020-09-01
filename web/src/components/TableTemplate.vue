<template>
  <div class="table-template">
    <!-- ---------------------- 搜索条 -------------------------- -->
    <div class="search-bar" v-if="queryOpts.length > 0">
      <el-form :inline="true" size="medium">
        <el-form-item v-for="(item, index) in queryOpts" :label="item.label" :key="index">

          <el-date-picker v-if="item.type === 'date'"
            :editable="false"
            :clearable="item.clearable"
            :picker-options="item.pickerOptions || {}"
            v-model="queryData.date"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 300px;"/>

          <el-select v-else-if="item.type === 'select'"
            clearable
            v-model="queryData[item.name]"
            :placeholder="item.placeholder || '全部'"
            style="width: 110px;">
            <el-option v-for="opt in item.options"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value">
            </el-option>
          </el-select>

          <el-input v-else :type="item.type || 'text'"
            clearable
            v-model="queryData[item.name]"
            :placeholder="item.placeholder || '请输入'"
            style="width: 200px;"/>


          <el-button v-if="index === queryOpts.length - 1"
            style="margin-left: 20px;"
            class="search-btn"
            type="primary"
            icon="el-icon-search"
            @click="loadData(pagination.pageSize, pagination.pageIndex)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- ---------------------- 表格 -------------------------- -->
    <div class="table-top">
      <slot name="top-btns"></slot>
      <span style="float: right;">
        共搜到
        <span style="color:#1B81C8">{{pagination.total}}</span>条数据
      </span>
    </div>
    <el-table
      id="tableTemplate"
      :data="list"
      :max-height="height"
      :stripe="options.stripe"
      ref="mutipleTable"
      @selection-change="handleSelectionChange"
      header-cell-class-name="highlightHeader"
      v-loading="options.loading"
    >
      <!--region 选择框-->
      <el-table-column v-if="options.mutiSelect" type="selection" style="width: 55px;"></el-table-column>
      <!--endregion-->
      <!--region 数据列-->
      <template v-for="(column, index) in columns">
        <el-table-column
          :prop="column.prop"
          :label="column.label"
          :align="column.align"
          :width="column.width"
          :key="column.prop"
        >
          <template slot-scope="scope">
            <template v-if="!column.render">
              <template v-if="column.formatter">
                <span v-html="column.formatter(scope.row, column)"></span>
              </template>
              <template v-else>
                <span>{{scope.row[column.prop]}}</span>
              </template>
            </template>
            <template v-else>
              <expand-dom :column="column" :row="scope.row" :render="column.render" :index="index"></expand-dom>
            </template>
          </template>
        </el-table-column>
      </template>
      <!--endregion-->
      <!--region 按钮操作组-->
      <el-table-column
        ref="fixedColumn"
        label="操作"
        align="center"
        :width="operates.width"
        :fixed="operates.fixed"
        v-if="operates && operates.list.length > 0"
      >
        <template slot-scope="scope">
          <div class="operate-group">
            <template v-for="(btn, key) in operates.list">
              <div
                class="item"
                v-if="btn.show || (btn.showMethod&&btn.showMethod(scope.$index,scope.row))"
                :key="key"
              >
                <el-button
                  :type="btn.type"
                  size="mini"
                  :icon="btn.icon"
                  :disabled="btn.disabled"
                  :plain="btn.plain"
                  @click.native.prevent="btn.method(key,scope.row)"
                >{{ btn.label }}</el-button>
              </div>
            </template>
          </div>
        </template>
      </el-table-column>
      <!--endregion-->
    </el-table>
    <div style="height:12px"></div>
    <!-- ---------------------- 表格 -------------------------- -->
    <!--region 分页-->
    <div class="table-bottom">
      <span class="bottoms-btns">
        <slot name="bottom-btns"></slot>
      </span>
      <el-pagination
        v-if="pagination"
        @size-change="handleSizeChange"
        @current-change="handleIndexChange"
        :page-size="pagination.pageSize"
        :page-sizes="pagination.pageArray"
        :current-page="pagination.pageIndex"
        layout="sizes, prev, pager, next,jumper"
        :total="pagination.total"
      ></el-pagination>
    </div>
    <!--endregion-->
  </div>
</template>
<!--endregion-->
<script>
export default {
  name: 'TemplateTable',
  props: {
    // 搜索条选项
    queryOpts: {
      type: Array,
      required: false,
      default: () => ([])
    },
    // 列表API
    tableApi: {
      type: Object,
      required: true
    },
    // 数据列表: prop:表头绑定的地段，label：表头名称，align：每列数据展示形式（left, center, right），width:列宽
    // list: {
    //   type: Array,
    //   default: () => []
    // },
    // 需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
    columns: {
      type: Array,
      default: () => []
    },
    // width:按钮列宽，fixed：是否固定（left,right）,按钮集合 === label: 文本，type :类型（primary / success / warning / danger / info / text），show：是否显示，icon：按钮图标，plain：是否朴素按钮，disabled：是否禁用，method：回调方法
    operates: {
      type: Object,
      default: () => {}
    },
    // table 表格的控制参数
    options: {
      type: Object,
      default: function() {
        return {
          stripe: false, // 是否为斑马纹 table
          loading: false, // 是否添加表格loading加载动画
          highlightCurrentRow: false, // 是否支持当前行高亮显示
          mutiSelect: false // 是否支持列表项选中功能
        }
      }
    },
    // 多行选中
    selectedRows:{
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      height:700,
      queryData: {
        // date: []
      }, // 搜索条件
      pagination:{
        pageIndex: 1,
        pageSize: 10,
        pageArray: [5, 10, 50, 100],
        total: 0
      },
      list: [],
      returnModel:{}, //返回的数据，如果调用的组件要用这个数据，返回这个
    }
  },
  created() {},
  computed: {
    // 查询参数

  },
  mounted() {
    this.loadData()
  },
  methods: {
    // tableQueryData(pageSize, pageIndex) {
    //   const copy = Object.assign({}, {pageSize}, {pageIndex}, this.queryData);
    //   delete copy.total;
    //   delete copy.date; // 需要的时候单独处理
    //   // const ret = {};
    //   // for(const key in copy) {
    //   //   if(copy[key] !== '' && copy[key] !== null && copy[key] !== undefined) ret[key] = copy[key];
    //   // }
    //   // return ret;
    //   return copy
    // },
    // goSearch(queryData) {
    //   this.queryData = this.$utils.deepCopy(queryData);
    //   Promise.resolve().then(() => this.loadData());// 放入异步任务队列
    // },
    // 加载数据
    loadData(pageSize, pageIndex) {
      this.options.loading = true
      this.$request({
        api: this.tableApi,
        params: Object.assign({},
        {
          pageSize: pageSize || this.pagination.pageSize,
          pageIndex: pageIndex || this.pagination.pageIndex
        }, this.queryData)
      }).then(model => {
          this.options.loading = false
          this.list = model.results;
          this.pagination.total = model.total;
        }).finally(() => this.options.loading = false);
    },
    // 切换每页显示的数量
    handleSizeChange(size) {
      this.pagination.pageSize = size
      this.loadData(size, this.pagination.pageIndex)
    },
    // 切换页码
    handleIndexChange(current) {
      this.pagination.pageIndex = current
      this.loadData(this.pagination.pageSize, current)
    },
    // 多行选中
    handleSelectionChange(val) {
      this.$emit('update:selectedRows', selectedRows)
    }
  }
}
</script>

<style lang="scss">

.search-bar {
  margin-bottom: 15px;
  padding: 5px 10px !important;

  .query-item {
    display: inline-block;
    > label {
      font-weight: initial;
    }
  }

  .el-form-item {
    margin: 5px 0;
    margin-right: 5px;
    .search-btn{
    // background-color: #e56a53;
    // border-color:#e56a53;
    // color: white;
    // width:95px;
    // height:38px;
    }
  }
}

.table-template {
  height: 100%;
  .highlightHeader {
    background: #ECF6FF;
  }
  .table-top {
    // margin-bottom: 10px;
    height: 27px;
  }

  .table-bottom {
    .bottoms-btns {
      margin-top: 20px;
      display: inline-block;
    }
  }

  .el-pagination {
    float: right;
    margin: 20px;
  }

  .el-table__header-wrapper,
  .el-table__fixed-header-wrapper {
    thead {
      tr {
        th {
          color: #333333;
        }
      }
    }
  }

  .el-table-column--selection .cell {
    padding: 0;
    text-align: center;
  }

  .el-table__fixed-right {
    bottom: 0 !important;
    right: 6px !important;
    z-index: 1004;
  }

  .operate-group {
    display: flex;
    // flex-wrap: wrap;
    justify-content: center;
    .item {
      margin-top: 4px;
      margin-bottom: 4px;
      display: block;
      // flex: 0 0 50%;
      // width: fit-content;
    }
  }
}
</style>

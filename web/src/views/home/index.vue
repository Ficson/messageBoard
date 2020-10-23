<template>
  <div class="home">
    <section class="banner">
      <div>隐秘的留言板</div>
    </section>
    <section class="inner">
      <header>
        <div class="left">
          <!-- <i class="el-icon-document"></i> -->
          <el-input placeholder="输入关键字搜索" style="width:200px;" v-model="keyword"></el-input>
          <el-button type="primary" icon="el-icon-search" class="search" @click="search">搜索</el-button>
        </div>
        <div class="right">
          <el-button type="primary" plain @click="showEditor">我要留言</el-button>
          <el-button plain @click="$router.push('/')">进入后台</el-button>
        </div>
      </header>
      <div class="editor" v-if="editor.visible">
        <Editor v-model="editor.content" :isClear="editor.isClear" @change="change" style="width: 750px;"></Editor>
        <div class="editor-btns">
          <el-button type="primary" @click="save">发表</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
      </div>
      <main>
        <ul>
          <li v-for="(msg, index) in messages" class="msg-wrapper">
            <div class="item">
              <img :src="msg.avatar" alt="">
              <div class="right">
                <p>{{msg.username}}</p>
                <div class="content" v-html="msg.content"></div>
                <div class="info">
                  <time>{{msg.create_time}}</time>
                  <span class="praise">赞({{msg.likes}})</span>
                  <span class="reply">回复</span>
                </div>
              </div>
            </div>
            <ul class="comment-wrapper">
              <li class="item comment" v-for="(item, index) in msg.children">
                <img :src="item.avatar" alt="">
                <div class="right">
                  <p>{{item.username}}</p>
                  <div class="content" v-html="item.content"></div>
                  <div class="info">
                    <time>{{item.create_time}}</time>
                    <span class="praise">赞({{item.likes}})</span>
                    <span class="reply">回复</span>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        <div class="bottom">
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
      </main>
    </section>
    <div class="backtop">
      <i class="el-icon-arrow-up"></i>
      回到顶部
    </div>
  </div>
</template>
<script>
import Editor from '@/components/Editor'
export default {
  name: 'Home',
  components: {
    Editor
  },
  data() {
    return {
      messages: [],
      keyword: '',
      pagination:{
        pageIndex: 1,
        pageSize: 10,
        pageArray: [5, 10, 50, 100],
        total: 0
      },
      editor: {
        visible: false,
        content: '',
        isClear: true,
      }
    };
  },
  methods: {
    // 加载数据
    async loadData(keyword, pageIndex, pageSize) {
      let res = await this.$allRequest.getMessageList({
        content: keyword || '',
        pagenum: this.pagination.pageIndex || this.pageIndex,
        pagesize: this.pagination.pageSize || this.pageSize
      })
      this.messages = res.list
      this.pagination.total = res.total
    },
    // 搜索
    search() {
      this.loadData(this.keyword)
    },
    // 切换每页显示的数量
    handleSizeChange(size) {
      this.pagination.pageSize = size
      this.loadData(this.keyword, this.pagination.pageIndex, size)
    },
    // 切换页码
    handleIndexChange(current) {
      this.pagination.pageIndex = current
      this.loadData(this.keyword, current, this.pagination.pageSize)
    },
    // 显示编辑器
    showEditor() {
      this.editor.visible = true
      this.editor.content =''
    },
    // 改变富文本
    change (val) {
      console.log(val);
    },
    // 取消编辑
    cancel() {
      this.editor.visible = false
    },
    //保存
    async save() {
      if (!this.editor.content.trim()) {
        this.$message({ type: 'info', message: '内容不能为空' })
      }
      let res = await this.$allRequest.messageAdd({
        category_id: 1,
        content: this.editor.content,
        type: 0
      })
      this.messages = res.list
      this.pagination.total = res.total
      this.editor.visible = false
      this.loadData()
    },
  },
  created() {
    this.loadData()
  }
}
</script>

<style lang='scss'>
body{
  background: rgb(241, 244, 249);
}
.banner{
  background: url("./../../assets/images/banner.jpg");
  height: 500px;
  width: 100%;
  position: relative;
  div{
    height: 500px;
    width: 100%;
    position: absolute;
    color: #fff;
    text-align: center;
    font-size: 93px;
    padding-top: 161px;
    background: linear-gradient(230deg,rgba(53,57,74,0),#828282);
  }
}
.inner{
  margin: 0 auto;
  width: 1200px;
  background: white;
  padding: 0 10px;
  header{
    height: 60px;
    border-color: #e7e7e7;
    display: flex;
    justify-content: space-between;
    padding: 10px 0px;
    .left{
      // i{
      //   font-size: 30px;
      //   margin-right: 10px;
      //   vertical-align: middle;
      // }
      .search{
        // font-size: 10px;
        margin-left: 10px;
      }
    }
    .right{

    }
  }
  .editor{
    width: 750px;
    .editor-btns{
      margin: 15px 0;
      display: flex;
      justify-content: center;
      &:first-child{
        margin-right: 20px;
      }
    }
  }
  main{
    background: #fff;
    border-top: 1px solid #e5e3e3;
    >ul{
      margin-left: 10px;
      .msg-wrapper{
        margin: 13px 0 30px 40px;
      }
      .item{
        display: flex;
        color: rgb(142, 148, 172);
        margin-bottom: 20px;
        img{
          width: 56px;
          height: 56px;
          border-radius: 50%;
          margin-right: 11px;
        }
        .right{
          p{
            margin-bottom: 5px;
          }
          .content{
            margin-bottom: 5px;
            color: #000;
          }
          .info{
            time{
              margin-right: 10px;
            }
            .praise{
              background: url("./../../assets/images/praise.png") left -7px no-repeat;
              padding: 1.5px 0px 0 22px;
              margin-right: 10px;
              cursor: pointer;
              &:hover{

              }
            }
            .reply{
              background: url("./../../assets/images/reply.png") left 2px no-repeat;
              padding: 1.5px 0px 0 22px;
              cursor: pointer;
            }
          }
        }
      }
      .comment-wrapper{
        margin-left: 40px;
      }
    }
  }
  .bottom{
    margin-top: 44px;
    text-align: right;
    padding: 10px 20px;
  }
}
.backtop{
  position: fixed;
  right: 10%;
  bottom: 5%;
  width: 72px;
  height: 76px;
  padding: 14px 0 12px 0;
  text-align: center;
  background: #F7F8FA;
  cursor: pointer;
  font-size: 14px;
  &:hover{
    background: #ECF6FF ;
  }
  i{
    display: block;
    margin-bottom: 10px;
    font-size: 25px;
  }
}



</style>

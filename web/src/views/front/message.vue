<template>
    <section>
      <header v-show="!editor.visible">
        <div class="left">
          <!-- <i class="el-icon-document"></i> -->
          <el-input placeholder="输入关键字搜索" style="width:200px;" v-model="keyword" clearable></el-input>
          <el-button type="primary" icon="el-icon-search" class="search" @click="search">搜索</el-button>
        </div>
        <div class="right">
          <el-button type="primary" plain @click="showEditor">我要留言</el-button>
        </div>
      </header>
      <div class="editor" v-if="editor.visible">
        <el-select style="width: 200" v-model="selectedCategory">
              <el-option
              v-for="item in categoryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
            </el-select>
        <Editor v-model="editor.content" :isClear="editor.isClear" @change="change" style="width: 750px;"></Editor>
        <div class="editor-btns">
          <el-button type="primary" @click="save">发表</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
      </div>
      <main v-loading="loading">
        <ul>
          <li v-for="(msg, index) in messages" class="msg-wrapper">
            <!-- 留言 -->
            <div class="item">
              <img :src="msg.avatar" alt="">
              <div class="right">
                <p>{{msg.username}}</p>
                <div class="content" v-html="msg.content"></div>
                <div class="info">
                  <time>{{ msg.create_time | timeAgo }}</time>
                  <span class="praise"
                    :style="{backgroundImage: 'url(' + (msg.liked ? likeIcon2 : likeIcon1)}"
                    @click="setLike(msg.id, msg.liked, index)"
                    >赞({{msg.likes}})</span>
                  <span class="reply" @click="handleReply(index ,null)">回复</span>
                  <!-- 回复框 -->
                   <div v-if="curItemIndex === index && curChildItemIndex === ''">
                    <el-input v-model="replyText" class="reply-input" :placeholder="'@ ' + msg.username"></el-input>
                    <el-button type="primary" size="mini" @click="confirmReply(msg.id, msg.username)">确定</el-button>
                    <el-button size="mini" @click="cancelReply">取消</el-button>
                  </div>
                </div>
              </div>
            <!-- 评论 -->
            </div>
            <ul class="comment-wrapper">
              <li class="item comment" v-for="(childItem, childIndex) in msg.children">
                <img :src="childItem.avatar" alt="">
                <div class="right">
                  <p>{{childItem.username}} @ {{childItem.replyPeople}}</p>
                  <div class="content" v-html="childItem.content"></div>
                  <div class="info">
                    <time>{{ childItem.create_time | timeAgo }}</time>
                    <span class="praise"
                    :style="{backgroundImage: 'url(' + (childItem.liked ? likeIcon2 : likeIcon1)}"
                      @click="setLike(childItem.id, childItem.liked, index, childIndex)">赞({{childItem.likes}})</span>
                    <span class="reply" @click="handleReply(index, childIndex)">回复</span>
                  </div>
                  <!-- 回复框 -->
                  <div v-if="curItemIndex === index && curChildItemIndex === childIndex">
                    <el-input v-model="replyText" class="reply-input" :placeholder="'@ ' + childItem.username"></el-input>
                    <el-button type="primary" size="mini" @click="confirmReply(childItem.id, childItem.username)">确定</el-button>
                    <el-button size="mini" @click="cancelReply">取消</el-button>
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

</template>
<script>
import Editor from '@/components/Editor'
const likeIcon1 = require('./../../assets/images/praise.png')
const likeIcon2 = require('./../../assets/images/praise2.png')
import store from '@/store'
export default {
  name: 'Message',
  components: {
    Editor
  },
  computed: {
    info () {
      return store.state.user.info
    }
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
      },
      likeIcon1,
      likeIcon2,
      curItemIndex: '',
      curChildItemIndex: '',
      replyObject: '',
      replyText: '',
      loading: false,
      categoryOptions: [], // 类型列表
      selectedCategory: '',
      replyPlaceholder: ''
    };
  },
  methods: {
    // 加载数据
    async loadData(keyword, pageIndex, pageSize) {
      this.loading = true
      try {
        let res = await this.$allRequest.getMessageList({
          content: keyword || '',
          pagenum: pageIndex || this.pagination.pageIndex,
          pagesize: pageSize ||  this.pagination.pageSize
        })
        this.messages = res.list
        this.pagination.total = res.total
      } catch{

      } finally{
        this.loading = false
      }
    },
    // 搜索
    search() {
      this.loadData(this.keyword, 1)
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
      if (!this.info.id) { // 没有登录
        this.$message({ type: 'info', message: '请登录后再进行操作' })
        this.$router.push('/login')
        return
      }
      this.loadCategory()
      this.editor.visible = true
      this.editor.content =''
    },

    // 加载类型列表
    async loadCategory() {
      const res =  await this.$allRequest.getCategoryList()
      this.categoryOptions = res.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
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
      try {
        let res = this.$allRequest.messageAdd({
          type: 0,
          content: this.editor.content,
          category_id: this.selectedCategory
        }).then(()=> {
          this.messages = res.list
          this.pagination.total = res.total
          this.editor.visible = false
          this.$utils.myMessage('添加成功', 'success')
          this.selectedCategory = ''
          this.loadData()
        })
      } catch {
      }
    },
    // 点赞或取消点赞
    async setLike(id, liked, index, childIndex) {
      if (!this.info.id) { // 没有登录
        this.$message({ type: 'info', message: '请登录后再进行操作' })
        this.$router.push('/login')
        return
      }
      let status =  liked ? -1 : 1
      await this.$allRequest.setLike({
        msg_id: id,
        status
      })
      let offset = liked ?  -1 : 1
      if (typeof childIndex === 'undefined') { // 留言
        this.messages[index].liked = !liked
        this.messages[index].likes += offset
      } else { // 评论
        this.messages[index].children[childIndex].liked = !liked
        this.messages[index].children[childIndex].likes += offset
      }
    },
    // 回复评论
    handleReply (itemIndex, childItemIndex) {
      if (!this.info.id) { // 没有登录
        this.$message({ type: 'info', message: '请登录后再进行操作' })
        this.$router.push('/login')
        return
      }
      this.curItemIndex = itemIndex
      if (childItemIndex !== null) {
        this.curChildItemIndex = childItemIndex
      } else {
        this.curChildItemIndex = ''
      }
      this.replyText = ''
    },
    // 确认回复
    async confirmReply (id, replyPeople) {
      if (!this.replyText.trim()) {
          this.$message({ type: 'info', message: '内容不能为空' })
        }
        let res = await this.$allRequest.messageAdd({
          pid: id,
          content: this.replyText,
          type: 1,
          replyPeople

        })
        this.replyText = ''
        this.curItemIndex = ''
        this.curChildItemIndex = ''
        this.loadData()
    },
     // 取消回复
    cancelReply () {
      this.replyText = ''
      this.curItemIndex = ''
      this.curChildItemIndex = ''
    }
  },
  mounted() {
    // store.dispatch('getInfo').then(res => {}) // 获取用户权限
    this.loadData()
  }
}
</script>

<style lang='scss'>
.banner{
    height: 100px;
    width: 100%;
    color: #fff;
    text-align: center;
    font-size: 67px;
}

  header{
    height: 60px;
    border-color: #e7e7e7;
    display: flex;
    justify-content: space-between;
    padding: 10px 0px;
    .left{
      .search{
        margin-left: 10px;
      }
    }
    .right{

    }
  }
  .editor{
    width: 750px;
    margin-top: 36px;
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
              // background: url("./../../assets/images/praise.png") left -7px no-repeat;
              background-repeat: no-repeat;
              background-position: left -7px;
              padding: 1.5px 0px 0 22px;
              margin-right: 10px;
              cursor: pointer;
              // &:hover{
              //   background: url("./../../assets/images/praise_hover.png") left -7px no-repeat !important;
              // }
            }
            .reply{
              background: url("./../../assets/images/reply.png") left 2px no-repeat;
              padding: 1.5px 0px 0 22px;
              cursor: pointer;
            }
            .reply-input {
              margin: 5px 0;
            }
          }
        }
      }
      .comment-wrapper{
        margin-left: 40px;
        .reply-input {
              margin: 5px 0;
          }
      }
    }
  }
  .bottom{
    margin-top: 44px;
    text-align: right;
    padding: 10px 20px;
  }


</style>

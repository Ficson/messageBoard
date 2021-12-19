<template>
  <div class="my-message">
    <div class="top">
      <el-input placeholder="输入关键字搜索" style="width: 200px" v-model="keyword"></el-input>
      <el-button type="primary" icon="el-icon-search" class="search" @click="search">搜索</el-button>
    </div>
    <main class="messages" v-loading="loading">
      <ul>
        <li v-for="(msg, index) in messages" class="msg-wrapper">
          <div class="item">
            <img :src="msg.avatar" alt="" />
            <div class="right">
              <p>{{ msg.username }}</p>
              <div class="content" v-html="msg.content"></div>
              <div class="info">
                <time>{{ msg.create_time | timeAgo }}</time>
                <span class="praise">赞({{ msg.likes }})</span>
                <span class="reply">回复</span>
              </div>
            </div>
          </div>
          <ul class="comment-wrapper">
            <li class="item comment" v-for="(childItem, childIndex) in msg.children">
              <img :src="childItem.avatar" alt="" />
              <div class="right">
                <p>{{ childItem.username }}</p>
                <div class="content" v-html="childItem.content"></div>
                <div class="info">
                  <time>{{ childItem.create_time | timeAgo }}</time>
                  <span class="praise">赞({{ childItem.likes }})</span>
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
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: 'MyMessages',

  data() {
    return {
      messages: [],
      keyword: '',
      pagination: {
        pageIndex: 1,
        pageSize: 10,
        pageArray: [5, 10, 50, 100],
        total: 0,
      },
      loading: false,
    }
  },
  methods: {
    async loadData(keyword, pageIndex, pageSize) {
      try {
        this.loading = true
        let res = await this.$allRequest.getMessageList({
          content: keyword || '',
          pagenum: this.pagination.pageIndex || this.pageIndex,
          pagesize: this.pagination.pageSize || this.pageSize,
          id: store.state.user.info.id,
        })
        this.messages = res.list
        this.pagination.total = res.total
      } catch {
      } finally {
        this.loading = false
      }
    },
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
  },
  mounted() {
    this.loadData()
  },
}
</script>

<style lang="scss">
.top {
  .search {
    margin-left: 10px;
  }
}
main.messages {
  margin-top: 28px;
  width: 1200px;
  background: #fff;
  border-radius: 9px;
  padding: 10px 0;
  box-shadow: 0px 0px 12px 0px #e5e3e3;
  > ul {
    margin-left: 10px;
    .msg-wrapper {
      margin: 13px 0 30px 40px;
    }
    .item {
      display: flex;
      color: rgb(142, 148, 172);
      margin-bottom: 20px;
      img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        margin-right: 11px;
      }
      .right {
        p {
          margin-bottom: 5px;
        }
        .content {
          margin-bottom: 5px;
          color: #000;
        }
        .info {
          time {
            margin-right: 10px;
          }
          .praise {
            background: url('./../../../assets/images/praise.png') left -7px no-repeat;
            padding: 1.5px 0px 0 22px;
            margin-right: 10px;
            cursor: pointer;
            &:hover {
              background: url('./../../../assets/images/praise_hover.png') left -7px no-repeat;
            }
          }
          .reply {
            background: url('./../../../assets/images/reply.png') left 2px no-repeat;
            padding: 1.5px 0px 0 22px;
            cursor: pointer;
          }
        }
      }
    }
    .comment-wrapper {
      margin-left: 40px;
    }
  }
  .bottom {
    margin-top: 44px;
    text-align: right;
    padding: 10px 20px;
  }
}
</style>

<template>
  <div class="home">
    <div class="banner">
      <div>隐秘的留言板</div>
    </div>
    <header>
      <nav>
        <div class="left">
          <!-- <i class="el-icon-document"></i> -->
          <el-input placeholder="输入关键字搜索" style="width:200px;" v-model="keyword"></el-input>
          <el-button type="primary" icon="el-icon-search" class="search" @click="search">搜索</el-button>
        </div>
        <div class="right">
          <el-button type="primary" plain>我要留言</el-button>
          <el-button plain>进入后台</el-button>
        </div>
      </nav>
    </header>
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
    </main>
    <div class="backtop">
      <i class="el-icon-arrow-up"></i>
      回到顶部
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',

  data() {
    return {
      messages: [],
      keyword: ''
    };
  },
  methods: {
    async init(keyword) {
      let res = await this.$allRequest.getMessageList({
        content: keyword || ''
      })
      this.messages = res.list
    },
    search() {
      this.init(this.keyword)
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang='scss'>
body{
  background: rgb(241, 244, 249);
}
.home {
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
  header{
    height: 60px;
    // background-color: #f8f8f8;
    border-color: #e7e7e7;
    nav{
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
      width: 1200px;
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
  }
  main{
    margin: 0 auto;
    width: 1200px;
    background: #fff;
    border-radius: 9px;
    padding: 10px 0;
    box-shadow: 0px 0px 12px 0px #e5e3e3;
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
}
</style>

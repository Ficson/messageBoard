<template>
  <div class="home">
    <header>
      <nav>
        <div class="left">
          <i class="el-icon-document"></i>
          <el-input placeholder="Search" style="width:200px;"></el-input>
        </div>
        <div class="right">
          <el-button type="primary" plain>我要留言</el-button>
          <el-button plain>进入后台</el-button>
        </div>
      </nav>
    </header>
    <main>
      <ul>
        <li v-for="(item, index) in messages">
          <div class="msg-top">
            <img :src="item.avatar" alt="">
            <span>{{item.name}}</span>
            <time>{{item.createTime}}</time>
          </div>
          <div class="msg-bottom">
            <p>{{item.title}}</p>
            <div class="praise">
              <img src='@/assets/images/praise.png' alt="">
              <span>{{item.likes}}</span>
            </div>
          </div>
        </li>
      </ul>
      <div class="backtop">
        <i class="el-icon-arrow-up"></i>
        回到顶部
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'home',

  data() {
    return {
      messages: [
        // {
        //   name: 'Nick',
        //   avatar: 'https://avatar-static.segmentfault.com/424/432/4244320254-5f4d198745ac3_huge256',
        //   createTime: '2020-09-01 16:51:08',
        //   title: '你是不是脑袋被门挤了',
        //   likes: 4,
        // },
        // {
        //   name: 'Nick',
        //   avatar: 'https://avatar-static.segmentfault.com/424/432/4244320254-5f4d198745ac3_huge256',
        //   createTime: '2020-09-01 16:51:08',
        //   title: '你是不是脑袋被门挤了',
        //   likes: 4,
        // },
        // {
        //   name: 'Nick',
        //   avatar: 'https://avatar-static.segmentfault.com/424/432/4244320254-5f4d198745ac3_huge256',
        //   createTime: '2020-09-01 16:51:08',
        //   title: '你是不是脑袋被门挤了',
        //   likes: 4,
        // },
        // {
        //   name: 'Nick',
        //   avatar: 'https://avatar-static.segmentfault.com/424/432/4244320254-5f4d198745ac3_huge256',
        //   createTime: '2020-09-01 16:51:08',
        //   title: '你是不是脑袋被门挤了',
        //   likes: 4,
        // }
      ]
    };
  },
  methods: {
    async init() {
      let res = await this.$allRequest.getMessageList()
      this.messages = res.result
    }
  },
  created() {
    this.init()
  }
}
</script>

<style lang='scss'>
.home {
  header{
    height: 60px;
    background-color: #f8f8f8;
    border-color: #e7e7e7;
    nav{
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
      width: 1200px;
      padding: 10px;
      .left{
        i{
          font-size: 30px;
          margin-right: 10px;
          vertical-align: middle;
        }
      }
      .right{

      }
    }
  }
  main{
    margin: 0 auto;
    width: 900px;
    ul{
      padding: 0;
      li{
        .msg-top{
          color: #8E94AC;
          img{
            width: 40px;
            height: 40px;
            border-radius: 30em;
            margin-right: 10px;
            vertical-align: middle;
          }
          span{
            margin-right: 10px;
          }
        }
        .msg-bottom{
          cursor: pointer;
          background: #F7F8FA;
          display: flex;
          justify-content: space-between;
          margin: 10px 0;
          padding: 0 22px;
          align-items: center;
          p{
           font-size: 19px;
          font-weight: bold;
          }
          .praise{
            img{
              margin-left: 10px;
              margin-bottom: 10px;
              vertical-align: middle;
            }
            span{
              vertical-align: middle;
            }
          }
        }
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

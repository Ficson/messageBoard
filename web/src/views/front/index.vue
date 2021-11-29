<template>
<div class="front">
  <div class="inner">
    <el-menu
        :default-active="this.$route.path"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        router
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        >
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
              <template slot="title">
                <span> {{ item.navItem }}</span>
              </template>
        </el-menu-item>
        <div class="operation">
          <el-button v-if="!info.id" >登录</el-button>
          <el-dropdown v-else>
            <span>{{info.username}}</span>
            <img :src="info.avatar">
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出登录</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
    </el-menu>
    <el-main class="detailed-content">
      <router-view />
    </el-main>
  </div>
  <div class="backtop">
    <i class="el-icon-arrow-up"></i>
    回到顶部
  </div>
</div>
</template>
<script>

import store from '@/store'
export default {
  name: 'Front',
  components: {

  },
  computed: {
    info () {
      return store.state.user.info
    }
  },
  data() {
    return {
      navList:[
             {name:'/front/home', navItem:'首页'},
             {name:'/front/message', navItem:'留言板'},
             {name:'/front/article',navItem:'文章'},
             {name:'/front/activity',navItem:'活动'},
        ]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
    }
  }
}
</script>

<style lang='scss'>
body{
  background: rgb(241, 244, 249);
}
.front {
  background: url(../../assets/images/earth.png);
  background-size: cover;
  min-height: 100%;
  .inner {
    margin: 0 auto;
    width: 1200px;
    height: 100vh;
    background: white;
    .operation{
      position: absolute;
      right: 16px;
      top: 10px;
      img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
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

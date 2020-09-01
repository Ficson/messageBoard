<template>
  <el-container class="layout-container">
    <el-aside class="app-aside" :width="variables.sideBarWidth">
      <!-- 侧边栏标题 -->
      <div class="aside-title">
        <transition name="aside-title-fade">
          <span>留言板后台管理</span>
        </transition>
      </div>
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <side-bar></side-bar>
      </el-scrollbar>
    </el-aside>

    <el-container class="layout-right">
      <el-header>
        <div>
          <i class="el-icon-chat-line-square"></i>
          亲爱的{{info.name}}，欢迎您登录后台系统，
        </div>
        <div @click="logout" style="cursor: pointer;">
          <span>退出</span>
          <i class="el-icon-switch-button" ></i>
        </div>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import variables from '@/styles/variables.scss'
import SideBar from './sidebar'
import store from '@/store'
export default {
  name: 'Layout',
  components: {
    SideBar
  },
  computed: {
    variables () {
      return variables
    },
    info () {
      return store.state.user.info
    }
  },
  methods: {
    logout () {
      store.dispatch("logout").then(() => {
        location.reload() //刷新页面（刷新路由，防止重新登录后路由没有更新而找不到路径）
        this.$router.push("/login")
      }).catch(()=>{
        this.$router.push("/login")
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/variables.scss";
.layout-container {
  height: 100%;

  .layout-right {
    min-width: calc(1024px - 180px);

    .el-header {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-box-shadow: 6px -3px 15px -3px #000;
      box-shadow: 6px -3px 15px -3px #000;
      background-color: #fff;
      border-bottom: 1px solid #e4e8eb;
      z-index: 1;
      padding: 0 52px;
      line-height: 60px;
      display: flex;
      justify-content: space-between;
    }
  }

  .app-aside {
    color: #333;
    background: $menuBg;
    overflow-x: hidden;
    transition: all 0.3s ease-in-out;
    padding: 0;
    margin-bottom: 0;

    .aside-title {
      height: 60px;
      line-height: 60px;
      background: #343539;
      // display: flex;
      // justify-content: center;
      // align-items: center;

      span {
        font-size: 21px;
        color: #fff;
        margin-left: 17px;
      }
    }
  }
}
</style>

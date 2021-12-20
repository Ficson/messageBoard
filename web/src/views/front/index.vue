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
        <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">
          <template slot="title">
            <span> {{ item.navItem }}</span>
          </template>
        </el-menu-item>
        <div class="operation">
          <el-button v-if="!info.id" @click="$router.push('/login')">登录</el-button>
          <div v-if="info.id" class="user-visible">
            <el-dropdown>
              <p class="info">
                <img :src="info.avatar" />
                <span>{{ info.username }}</span>
              </p>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button plain @click="$router.push('/myMessageManage/index')">进入后台</el-button>
          </div>
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
  components: {},
  computed: {
    info() {
      return store.state.user.info
    }
  },
  data() {
    return {
      navList: [
        {name: '/front/home', navItem: '首页'},
        {name: '/front/message', navItem: '留言板'},
        {name: '/front/article', navItem: '文章'},
        {name: '/front/activity', navItem: '活动'}
      ]
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    logout() {
      store
        .dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
        .catch(() => {
          this.$router.push('/login')
        })
    }
  }
}
</script>

<style lang="scss">
body {
  background: rgb(241, 244, 249);
}
.front {
  background: url(../../assets/images/earth.png);
  background-size: cover;
  min-height: 100%;
  .inner {
    margin: 0 auto;
    width: 1200px;
    // height: 100vh;
    background: white;
    .operation {
      position: absolute;
      right: 16px;
      top: 10px;
      .user-visible {
        display: flex;
        justify-content: space-between;
        width: 195px;
        p.info {
          display: flex;
          align-items: center;
          cursor: pointer;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 10px;
          }
          span {
            color: white;
          }
        }
      }
    }
    .detailed-content {
      // min-height: 90vh;
    }
  }

  .backtop {
    position: fixed;
    right: 10%;
    bottom: 5%;
    width: 72px;
    height: 76px;
    padding: 14px 0 12px 0;
    text-align: center;
    background: #f7f8fa;
    cursor: pointer;
    font-size: 14px;
    &:hover {
      background: #ecf6ff;
    }
    i {
      display: block;
      margin-bottom: 10px;
      font-size: 25px;
    }
  }
}
</style>

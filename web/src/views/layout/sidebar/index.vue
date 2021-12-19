<template>
  <!-- el-menu的属性说明：
       1 router: 为true时在激活导航时以 index 作为 path 进行路由跳转
       2 default-active：当前激活菜单的 index
  -->
  <el-menu
    class="sidebar-menu"
    :router="true"
    :default-active="activeMenu"
    :collapse="isCollapse"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :active-text-color="variables.menuActiveText"
  >
    <sidebar-item v-for="route in routers" :key="route.path" :item="route" :base-path="route.path"></sidebar-item>
  </el-menu>
</template>

<script>
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import {mapState} from 'vuex'
export default {
  name: 'SideBar',
  data() {
    return {
      isCollapse: false,
    }
  },
  computed: {
    ...mapState({
      routers: state => state.user.routers,
    }),
    activeMenu() {
      const route = this.$route
      const {meta, path} = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    },
  },
  components: {
    SidebarItem,
  },
  mounted() {},
}
</script>

<style lang="scss" scoped>
.sidebar-menu {
  border-right: none;
  overflow-x: hidden !important;
}
</style>

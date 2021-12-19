<template>
  <div v-if="!item.hidden && activeChildren.length > 0" class="menu-wrapper">
    <template v-if="hasOneShowingChild(activeChildren, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <el-menu-item :index="basePath + '/' + onlyOneChild.path">
        <span>{{ onlyOneChild.meta.title }}</span>
      </el-menu-item>
    </template>

    <el-submenu v-else :index="basePath + '/' + item.path">
      <template slot="title">
        <span>{{ item.meta.title }}</span>
      </template>
      <template v-for="child in activeChildren">
        <sidebar-item v-if="child.children && child.children.length > 0" :key="child.name" :item="child" :base-path="basePath + '/' + child.path" />
        <el-menu-item v-else :key="child.name" :index="basePath + '/' + child.path">
          <span>{{ child.meta.title }}</span>
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      onlyOneChild: null,
    }
  },
  computed: {
    // 返回所有父路由的有效子路由
    activeChildren() {
      if (!this.item.children) return []
      return this.item.children.filter(child => !child.hidden)
    },
  },
  mounted() {},
  methods: {
    // 判断其下的children
    hasOneShowingChild(children, parent) {
      if (children.length === 1) {
        this.onlyOneChild = children[0]
        return true
      }
      if (children.length === 0) {
        this.onlyOneChild = {...parent, path: '', noShowingChildren: true}
        return true
      }
      return false
    },
  },
}
</script>

<style lang="scss" scoped></style>

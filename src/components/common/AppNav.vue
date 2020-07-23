<!-- 左侧菜单导航栏组件 -->

<template>
  <div class="app-nav-wrap">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      router
    >
      <el-menu-item v-for="menu in menus" :index="menu.route" :key="menu.route">
        <i :class="menu.icon" style="padding-bottom:3px"></i>
        <span slot="title">{{menu.name}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  /* margin-top: 48px; */
  width: 200px;
  /* min-height: 400px; */
  background: #eff2f7;
}
.el-menu-item:hover {
  background-color: #409eff60;
}
</style>

<script>
import bus from "@/bus";
export default {
  data() {
    return {
      menus: [
        { route: "/", icon: "el-icon-s-home", name: "首页" },
        { route: "/dashboard", icon: "el-icon-odometer", name: "仪表盘" },
        { route: "/logdir", icon: "el-icon-folder", name: "日志目录" },
        { route: "/logprocess", icon: "el-icon-document", name: "日志处理" }
      ],
      isCollapse: false
    };
  },
  created() {
    bus.$on("collapse", value => {
      console.log(value)
      this.isCollapse = value;
    });
  },
  mounted() {
    // 刷新时以当前路由做为tab加入tabs
    if (
      this.$route.path !== "/" &&
      this.$route.path.indexOf("userInfo") == -1
    ) {
      this.$store.commit("add_tabs", { route: "/", name: "首页" });
      this.$store.commit("add_tabs", {
        route: this.$route.path,
        name: this.$route.name
      });
      this.$store.commit("set_active_index", this.$route.path);
    } else {
      this.$store.commit("add_tabs", { route: "/", name: "首页" });
      this.$store.commit("set_active_index", "/");
      this.$router.push("/");
    }
  },
  computed: {
    options() {
      return this.$store.state.options;
    }
  }
};
</script>

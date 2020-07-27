<template>
  <div id="app">
    <div class="app-header">
      <div class="btn" v-on:click="isCollapseHandle">
        <a :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></a>
      </div>
      <div class="title">LogUI</div>
    </div>
    <div class="app-content">
      <div class="app-nav">
        <app-nav></app-nav>
      </div>
      <div class="app-wrap">
        <!-- 此处放置el-tabs代码 -->
        <div class="template-tabs">
          <el-tabs
            v-model="activeIndex"
            type="border-card"
            closable
            @tab-click="tabClick"
            v-if="options.length"
            @tab-remove="tabRemove"
          >
            <el-tab-pane
              :key="item.name"
              v-for="(item, index) in options"
              :label="item.name"
              :name="item.route"
            >
              <div class="content-wrap">
                <keep-alive>
                  <router-view></router-view>
                </keep-alive>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  display: flex;
  flex-flow: column;
  overflow: hidden;
  .app-header {
    color: #fff;
    flex: 0 0 48px;
    background: #324057;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    float: left;
    .btn {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 48px;
      width: 48px;
      font-size: 26px;
      color: whitesmoke;
    }
    .title {
      font-size: 20px;
      font-weight: 700;
      // left: 60px;
    }
  }
  .app-content {
    flex: 1;
    width: 100%;
    height: auto;
    display: flex;
    overflow: hidden;
    flex-flow: row;
    .app-nav {
      // flex: 0 0 300px;
      background: #eff2f7;
      // border: 2px solid blue;
      // margin: 10px 10px;
    }
  }
  .app-wrap {
    // flex: 1;
    overflow: hidden;
    width: 100%;
    height: auto;
    // margin: 10px 10px;
    // border: 2px solid red;
    display: flex;
  }
  .template-tabs {
    width: 100%;
    height: auto;
    display: flex;
    overflow: hidden;
    // flex: 1;
  }
  .content-wrap {
    // border: 1px solid #d1dbe5;
    height: auto;
    // border-top: none;
    padding: 0px 0px;
  }
  .el-tabs {
    width: 100%;
    height: auto;
    overflow: hidden;
    display: flex;
    flex-flow: column;
    .el-tabs__content {
      // height: 400px;
      height: 100%;
      padding: 8px 8px;
      overflow: hidden;
    }
  }

  .el-tab-pane {
    height: 100%;
    display: flex;
    overflow: hidden;
  }
}
</style>

<script>
import bus from "@/bus";
import AppNav from "./components/common/AppNav";
export default {
  name: "app",
  components: {
    AppNav
  },
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    isCollapseHandle() {
      this.isCollapse = !this.isCollapse;
      console.log("header");
      bus.$emit("collapse", this.isCollapse);
    },
    // tab切换时，动态的切换路由
    tabClick(tab) {
      console.log("tabClick- 点击标签页");
      let path = this.activeIndex;
      // 用户详情页的时候，对应了二级路由，需要拼接添加第二级路由
      if (this.activeIndex === "/userInfo") {
        path = this.activeIndex + "/" + this.$store.state.userInfo.name;
      }
      this.$router.push({ path: path });
    },
    tabRemove(targetName) {
      // 首页不可删除
      if (targetName == "/") {
        return;
      }
      this.$store.commit("delete_tabs", targetName);
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.options && this.options.length >= 1) {
          this.$store.commit(
            "set_active_index",
            this.options[this.options.length - 1].route
          );
          this.$router.push({ path: this.activeIndex });
        } else {
          this.$router.push({ path: "/" });
        }
      }
    }
  },
  computed: {
    options() {
      return this.$store.state.options;
    },
    activeIndex: {
      get() {
        return this.$store.state.activeIndex;
      },
      set(val) {
        this.$store.commit("set_active_index", val);
      }
    }
  },
  watch: {
    $route(to) {
      let flag = false;
      for (let option of this.options) {
        if (option.name === to.name) {
          flag = true;
          this.$store.commit("set_active_index", "/" + to.path.split("/")[1]);
          break;
        }
      }
      if (!flag) {
        this.$store.commit("add_tabs", {
          route: "/" + to.path.split("/")[1],
          name: to.name
        });
        this.$store.commit("set_active_index", "/" + to.path.split("/")[1]);
      }
    }
  }
};
</script>

<template>
  <div class="dir-tree">
    <div class="tree-panel" v-bind:style="{
        width:treeWidth+'px'
      }">
      <div class="tree-header">
        <div class="refresh-btn" @click="generateLogTree">
          <i class="el-icon-refresh-right" style="font-size:20px;;font-weight:700"></i>
        </div>

        <el-input size="mini" placeholder="搜索文件" clearable v-model="filterText"></el-input>
      </div>
      <div
        id="treeBox"
        v-bind:style="{'padding-right':'10px',
        overflow: 'auto',
        height:'100%',
        
        'max-width':'800px'
        }"
      >
        <div class="tree-container">
          <!-- <el-scrollbar> -->
          <el-tree
            class="filter-tree"
            :data="fileTree"
            :props="defaultProps"
            :default-expand-all="false"
            :filter-node-method="filterNode"
            ref="tree"
            empty-text="暂无日志"
          >
            <span class="custom-tree-node" slot-scope="{node, data}">
              <span>
                <i :class="data.dirFlag?'el-icon-folder':'el-icon-document'"></i>
              </span>
              <span
                :class="data.dirFlag?'dirStyle':''"
                @click="!data.dirFlag && getFileContent(data.relativeFilePath)"
              >{{data.fileName}}</span>

              <!-- <el-tooltip
                class="item"
                open-delay=1000
                effect="light"
                :content="node.label"
                placement="top-start"
              >
              </el-tooltip>-->
            </span>
          </el-tree>
          <!-- </el-scrollbar> -->
        </div>
      </div>
    </div>
    <div id="lineBox">
      <div class="shortline"></div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
// import http from "@/http/http"
// import getTree from '../data/tree'
import { getTree } from "@/api/api";

export default {
  components: {},
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    getFileContent: function(param) {
      console.log(param);
      this.$parent.getFileContent(param)
    },
    generateLogTree: function() {
      getTree()
        .then(res => {
          let treeStringJson = JSON.stringify(res.data);
          this.fileTree = [res.data];
        })
        .catch(err => console.log(err));
    },
    dragControllerDiv: function() {
      // 保留this引用
      let data = this;
      let resize = document.getElementById("lineBox");
      resize.onmousedown = function(e) {
        // 颜色改变提醒
        // resize.style.background = "white";
        let startX = e.clientX;
        resize.left = resize.offsetLeft;
        document.onmousemove = function(e) {
          // 计算并应用位移量
          let endX = e.clientX;
          let moveLen = endX - startX;
          startX = endX;
          data.treeWidth += moveLen;
          if (data.treeWidth > data.treeMaxWidth) {
            data.treeWidth = data.treeMaxWidth;
          }
          if (data.treeWidth < 0) {
            data.treeWidth = 0;
          }
          // console.log("treeWidth:" + data.treeWidth);
        };
        document.onmouseup = function() {
          // 颜色恢复
          resize.style.background = "";
          document.onmousemove = null;
          document.onmouseup = null;
        };
        return false;
      };
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },

  data() {
    return {
      filterText: "",
      fileTree: [],
      defaultProps: {
        children: "children",
        label: "label",
        icon: "icon"
      },
      treeWidth: 200,
      treeMaxWidth: 500
    };
  },
  mounted() {
    this.dragControllerDiv();
    this.generateLogTree();
  }
};
</script>


<style lang="scss">
.dir-tree {
  display: flex;
  // flex-flow: row;
  // overflow: hidden;
  // overflow-y: hidden;
  .tree-panel {
    display: flex;
    flex-flow: column;
  }
}
.tree-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  .refresh-btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 4px;
    margin-right: 4px;
    border-radius: 2px;
    background-color: #eff2f7ad;
    color: #409eff;
  }
  .refresh-btn:hover {
    background-color: #409eff;
    color: white;
  }
}

.tree-container {
  height: 100%;
}
.dirStyle {
  font-weight: 700;
}
.iconStyle {
  color: #fcb814;
}
#lineBox {
  width: 20px;
  /* border: 1px solid yellowgreen; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
#lineBox:hover {
  cursor: w-resize;
}
.line {
  width: 1px;
  height: 100%;
  /* background-color: red; */
  background-color: #d1dbe6;
}
.shortline {
  width: 2px;
  height: 48px;
  /* background-color: black; */
  background-color: #d1dbe6;
  margin-right: 2px;
}
</style>

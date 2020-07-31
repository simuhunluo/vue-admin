<template>
  <div class="main">
    <LogTree></LogTree>
    <!-- <div><LogTree></LogTree></div> -->
    <div class="log-main">
      哈哈哈哈哈哈哈
      <br />hello
      <br />ll -al
      <br />哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
      哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
      哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
    </div>
  </div>
</template>

<script>
import LogTree from "./widgets/tree";

// import SockJS from 'sockjs-client'
// import Stomp from 'webstomp-client'

export default {
  components: {
    LogTree: LogTree
  },
  mounted() {
    let url = "ws://localhost:8081/websocket";
    // 创建websocket连接
    this.websock = new WebSocket(url);
    this.websock.onopen = this.websockOpen; // 打开
    this.websock.onclose = this.websockClose; // 关闭
    this.websock.onerror = this.onError; 
    this.websock.onmessage = this.onMessage; 
  },

  methods: {
    sendMessage(msg) {
      this.websock.send(msg);
    },
    onOpen() {
      console.log("connect!");
    },
    onClose() {
      console.log("disconnect1");
    },
    onError() {
      console.log("catch error!");
    },
    onMessage(e) {
      // console.log("监听服务器发送的消息", e.data);
    },
    getFileContent: function(path) {
      // websocket  https://www.cnblogs.com/godoforange/p/11533091.html
      console.log("p:" + path);
      this.sendMessage(path);
    }
  }
};
</script>
<style>
.main {
  display: flex;
  /* flex-direction: row; */
  /* justify-content: left; */
  /* align-items: center; */
  height: 100%;
  /* margin-bottom: 10px; */
}
.LogTree {
}
.log-main {
  border-radius: 4px;
  width: 100%;
  background-color: black;
  color: white;
  padding: 4px 4px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  overflow: auto;
  display: flex;
}
</style>
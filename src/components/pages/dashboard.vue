<template>
  <div>
    <section v-if="expand.bar">
      <figure>
        <chart
          :options="bar"
          :init-options="initOptions"
          ref="bar"
          theme="ovilia-green"
          autoresize
        />
      </figure>
    </section>
  </div>
</template>

<style>
/**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
.echarts {
  width: 100%;
  height: 100%;
}
</style>

<script>
import qs from "qs";
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import getBar from "./data/bar";

export default {
  components: {
    chart: ECharts
  },
  data() {
    const options = qs.parse(location.search, { ignoreQueryPrefix: true });

    return {
      options,
      bar: getBar(),
      expand: {
        bar: true
      },
      initOptions: {
        renderer: options.renderer || "canvas"
      }
    };
  },
  methods: {
    handleZrClick() {
      console.log("click from zrender");
    }
  }
};

function randomize() {
  return [0, 0, 0].map(v => {
    return Math.round(300 + Math.random() * 700) / 10;
  });
}
</script>
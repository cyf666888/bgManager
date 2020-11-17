<template>
  <div>
    <h1>this is home</h1>
    <div id="con"></div>
  </div>
</template>

<script>
// 引入数据图表
import Echart from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    //  挂载时，就初始化数据图表
    let myChart = Echart.init(document.getElementById("con"));
    let option = {
      angleAxis: {},
      radiusAxis: {
        type: "category",
        data: ["周一", "周二", "周三", "周四"],
        z: 10,
      },
      polar: {},
      series: [
        {
          type: "bar",
          data: [1, 2, 3, 4],
          coordinateSystem: "polar",
          name: "A",
          stack: "a",
        },
        {
          type: "bar",
          data: [2, 4, 6, 8],
          coordinateSystem: "polar",
          name: "B",
          stack: "a",
        },
        {
          type: "bar",
          data: [1, 2, 3, 4],
          coordinateSystem: "polar",
          name: "C",
          stack: "a",
        },
      ],
      legend: {
        show: true,
        data: ["A", "B", "C"],
      },
    };
    // 设置配置好的选项
    myChart.setOption(option);
  },
};
</script>

<style lang="" scoped>
#con{
  width: 800px;
  height: 600px;
  margin: 15px auto;
}
</style>

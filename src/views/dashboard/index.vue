<style scoped>
  .charts {
    padding-top: 150px;
    text-align: center;
  }
</style>
<template>
  <div>
    <div class="charts">
      <div id="myChart" :style="{width: '800px', height: '500px'}" style="display: inline-block"></div>
      <div id="youChart" :style="{width: '800px', height: '500px'}" style="display: inline-block"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'index',
    mounted() {
      this.drawLine();
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('myChart'))
        var youChart = this.$echarts.init(document.getElementById('youChart'))
        // 绘制图表
        myChart.setOption({
          title: {text: '日期'},
          tooltip: {},
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }]
        });
        youChart.setOption({
          title: {text: '收益率'},
          tooltip: {},
          xAxis: {
            type: 'category',
            data: ['1月', '3月', '5月', '7月', '9月', '11月', '12月']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [300, 400, 650, 850, 870, 900, 800],
            type: 'line',
            smooth: true
          }]
        });
      }
    }
  }
</script>

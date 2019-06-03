<template>
  <div id="infor">
    <div class="inforHeader">
      <div style="font-size:17px;"
           class="ib">平台总体概览
        <Icon type="md-timer"
              style="color:blue" />
        <span style="font-size:12px">数据更新时间：{{infortime}}</span>
      </div>
      <div class="fr ib">
        <Icon type="md-settings" />常用功能：
        <Tag>平台服务注册</Tag>
        <Tag>应用系统注册</Tag>
        <Tag>自定义访问规则</Tag>
        <Tag>用户管理</Tag>
      </div>
    </div>
    <div class="inforContent">
      <div class="inforContentLeft">
        <div class="inforContentLeft1 shadow">
          <div class="border-right ib">
            <InforIcon :data="datahead[0]"></InforIcon>
          </div>
          <div class="border-right ib">
            <InforIcon :data="datahead[1]"></InforIcon>
          </div>
          <div class="border-right ib">
            <InforIcon :data="datahead[2]"></InforIcon>
          </div>
          <div class=" ib">
            <InforIcon :data="datahead[3]"></InforIcon>
          </div>
        </div>
        <div class="inforContentLeft2 tl">
          <div class="echarts ">
            <Echarts></Echarts>
          </div>
          <div class="echarts">
            <Echarts></Echarts>
          </div>
          <div class="echarts">
            <Echarts></Echarts>
          </div>

        </div>
        <div class="inforContentLeft3">
          <div class="echartsb shadow">
            <Echarts></Echarts>
          </div>
        </div>
      </div>
      <div class="inforContentRight">
        <div class="inforContentRight1">
          <div class="mb15 shadow">
            <InforIcon :data="datahead[4]"></InforIcon>
          </div>
          <div class=" shadow">
            <InforIcon :data="datahead[5]"></InforIcon>
          </div>
        </div>
        <div class="inforContentRight2">
          <CircleL :percent="percent"
                   :title="titleCircleL"></CircleL>
        </div>
        <div class="inforContentRight3">
          <CpuPossession :cpuServer="cpuServer"></CpuPossession>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import InforIcon from "../components/inforIcon";
import Echarts from "../components/chart";
import CircleL from "../components/circle";
import CpuPossession from "../components/cpuPossession";
export default {
  name: "infor",
  components: {
    InforIcon,
    Echarts,
    CircleL,
    CpuPossession
  },
  data () {
    return {
      infortime: "2019-03-11 9:00",
      datahead: [
        {
          title: "平台总浏览量",
          color: "color:orange",
          type: "md-eye"
        },
        {
          title: "平台总访问量",
          color: "color:#00FF00",
          type: "md-contacts"
        },
        {
          title: "平台资源总数",
          color: "color:#9999FF",
          type: "ios-book"
        },
        {
          title: "平台对接系统总数",
          color: "color:#336633",
          type: "ios-link"
        },
        {
          title: "代办任务",
          color: "color:#66FFFF",
          type: "md-list-box"
        },
        {
          title: "监控警报",
          color: "color:#FF0000",
          type: "md-notifications-outline"
        }
      ],
      percent: 99.99,
      titleCircleL: "服务概况",
      cpuServer: [
        {
          cpuprogress1: 45,
          cpuprogress2: 60,
          cpuserver: "10.200.1.6"
        },
        {
          cpuprogress1: 90,
          cpuprogress2: 99,
          cpuserver: "10.200.1.250"
        }
      ]
    };
  },
  mounted () {
    var divs = document.getElementsByClassName("chart");
    this.myChart1 = this.$echarts.init(divs[0], "dark");
    this.myChart2 = this.$echarts.init(divs[1], "dark");
    this.myChart3 = this.$echarts.init(divs[2], "dark");
    this.myChart4 = this.$echarts.init(divs[3], "light");
    this.drawChart();
  },
  methods: {
    drawChart () {
      let option1 = {
        title: {
          text: "热门资源"
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar"
          }
        ]
      };
      let option2 = {
        title: {
          text: "活跃部门"
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar"
          }
        ]
      };
      let option3 = {
        title: {
          text: "活跃系统"
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar"
          }
        ]
      };
      let option4 = {
        title: {
          text: "服务器访问总量、流量"
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "line"
          }
        ]
      };

      this.myChart1.setOption(option1);
      this.myChart2.setOption(option2);
      this.myChart3.setOption(option3);
      this.myChart4.setOption(option4);
      // window.onresize = function() {
      //   this.myChart1.resize();
      //   this.myChart2.resize();
      //   this.myChart3.resize();
      //   this.myChart4.resize();
      // };
    }
  }
};
</script>
<style lang="less" scoped>
#infor {
  .w100();
  height: 100%;
}
.inforContent {
  .w100();
  height: 600px;
  margin-top: 10px;
  border-radius: 4px;
  -webkit-box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
  overflow-x: hidden;
  overflow-y: scroll;
  line-height: 30px;
  text-align: center;
}
.inforContent::-webkit-scrollbar {
  display: none;
}
.inforContentLeft {
  width: 73%;
  height: 100%;
  .ib();
  padding: 1% 1%;
  .tc();

  .inforContentLeft1 {
    .w100();
    margin-bottom: 15px;
    padding: 30px 15px;
  }

  .inforContentLeft2 {
    .w100();
    margin: 7px 1%;
  }

  .inforContentLeft3 {
    .w100();
    /* height: 250px; */
    background-color: #fff;
    margin: 7px 1%;
  }
}

.inforContentRight {
  width: 23%;
  height: 100%;
  .ib();
  padding: 1% 1%;
  .fr();
  .tc();
  border-radius: 4px;
  -webkit-box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
  .inforContentRight1 {
    .w100();
    margin: 7px 1%;
  }

  .inforContentRight2 {
    .w100();
    /* height: 150px; */
    background-color: #fff;
    margin: 7px 1%;
  }

  .inforContentRight3 {
    .w100();
    /* height: 180px; */
    background-color: #fff;
    margin: 7px 1%;
  }

  .inforContentRight4 {
    width: 100%;
    background-color: #fff;
    margin: 7px 1%;
  }
}
.iconStyle {
  .ib();
  padding: 7px 7px;
  margin: 7px 7px;
  font-size: 15px;
  .tc();
  background-color: #fff;
}
.echarts {
  width: 33%;
  .ib();
}
.circlel {
  width: 28%;
  .fr();
  .ib();
  .tc();
}
</style>

<template>
  <div>
    <Steps :current="current">
      <Step title="已完成"
            content="选择服务类型"></Step>
      <Step title="进行中"
            content="选择服务"></Step>
      <Step title="待进行"
            content="填写元数据"></Step>
    </Steps>
    <Table v-if="selectVal === 'GIMS 地图服务'"
           border
           ref="selection"
           :columns="columns"
           :data="data"></Table>
    <div v-if="selectVal === '其他服务'">服务地址：
      <Input prefix="ios-link-outline"
             placeholder="请填写您的链接"
             style="width: 300px"
             v-model="url"
             @on-change="change" />
    </div>
    <!-- {{this.$route.params.select}} -->
  </div>
</template>


<script>
import Bus from "../assets/eventBus.js";
export default {
  name: "numtwo",

  data () {
    return {
      current: this.$route.params.current,
      selectVal: this.$route.params.select,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        }
      ],
      data: [],
      url: this.$route.params.url,
    };
  },
  mounted () {
    // var self = this
    // Bus.$on("selectVal", function(data) {
    //   console.log(data)
    //   self.selectVal = data
    // });
    // console.log(this.selectVal)
  },
  props: {},
  methods: {
    //  当url的值变化时提交到父级
    change () {
      this.GLOBAL.URL = this.url
      console.log(this.GLOBAL.URL)
    }
  }
};
</script>
<style lang="less" scoped>
</style>


<template>
  <div>
    <Steps :current="current">
      <Step title="进行中"
            content="选择服务类型"></Step>
      <Step title="待进行"
            content="选择服务"></Step>
      <Step title="待进行"
            content="填写元数据"></Step>
    </Steps>
    <Alert show-icon
           class="tl">温馨提示
      <template slot="desc">发布地图服务的地图服务器有GIMS，若发布其它类型的服务请选择【其它】选项，请选择发布的服务类型：</template>
    </Alert>
    <RadioGroup v-model="select"
                @on-change="selectVal">
      <Radio label="GIMS 地图服务"></Radio>
      <Radio label="其他服务"></Radio>
    </RadioGroup>
  </div>
</template>


<script>
import { eventBus } from "../assets/eventBus.js";
import Numtwo from "../components/Numtwo"
export default {
  name: "numone",
  data () {
    return {
      current: 0,
      select: this.$route.params.select || "GIMS 地图服务"
    };
  },
  methods: {
    selectVal (val) {
      eventBus.bus.$emit('selectVal', val)
    }
  }
};
</script>
<style lang="less" scoped>
</style>


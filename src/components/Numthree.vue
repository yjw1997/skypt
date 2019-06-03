<template>
  <div>
    <Steps :current="current">
      <Step title="已完成"
            content="选择服务类型"></Step>
      <Step title="已完成"
            content="选择服务"></Step>
      <Step title="进行中"
            content="填写元数据"></Step>
    </Steps>
    <Tabs value="rewrite1">
      <TabPane label="基本信息"
               name="rewrite1">
        <rewrite1 :approvalData="data"
                  :disabled="false"></rewrite1>
      </TabPane>
      <TabPane label="发布单位信息"
               name="rewrite2">
        <rewrite2 :approvalData="data"
                  :disabled="false"></rewrite2>
      </TabPane>
      <TabPane label="服务使用限制"
               name="rewrit3">
        <rewrite3 :approvalData="data"
                  :disabled="false"></rewrite3>
      </TabPane>
      <TabPane label="数据描述信息"
               name="rewrite4">
        <rewrite4 :approvalData="data"
                  :disabled="false"></rewrite4>
      </TabPane>
      <TabPane label="操作描述信息"
               name="rewrite5">
        <rewrite5 :approvalData="data"
                  :disabled="false"></rewrite5>
      </TabPane>
      <TabPane label="服务调用示例"
               name="rewrite6">
        <rewrite6 :approvalData="data"
                  :disabled="false"></rewrite6>
      </TabPane>
    </Tabs>
  </div>
</template>


<script>
import rewrite1 from '../components/rewriteinfo'
import rewrite2 from '../components/rewrite2'
import rewrite3 from '../components/rewrite3'
import rewrite4 from '../components/rewrite4'
import rewrite5 from '../components/rewrite5'
import rewrite6 from '../components/rewrite6'
export default {
  name: "numthree",
  components: {
    rewrite1,
    rewrite2,
    rewrite3,
    rewrite4,
    rewrite5,
    rewrite6,
  },
  data () {
    return {
      current: 2,
      data: this.$route.params.data
    }
  },
  props: {},
  watch: {
    data (val) {
      console.log(val)
      // this.GLOBAL.appData = val
    }
  },
};
</script>
<style lang="less" scoped>
</style>


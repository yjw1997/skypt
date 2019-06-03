<template>
  <div id="text1">
    <ul style="text-align:right;font-weight: 700;line-height: 35px;">
      <li>服务地址：</li>
      <li>服务类型：</li>
      <li>服务类型版本：</li>
      <li>服务名：</li>
      <li>服务别名：</li>
      <li>服务id：</li>
      <li>摘要：</li>
      <li>关键词：</li>
      <li>发布单位：</li>
      <li>发布日期：</li>
    </ul>
    <ul style="line-height: 35px;">
      <li><Input :value="approvalData.serAddress"
               v-if="approvalData"
               disabled /></li>
      <li><Input :value="approvalData.serType"
               v-if="approvalData"
               disabled /></li>
      <li><Input :value="approvalData.version"
               v-if="approvalData"
               disabled /></li>
      <li><Input :value="approvalData.serName"
               v-if="approvalData"
               disabled /></li>
      <li><Input :value="approvalData.serByName"
               v-if="approvalData"
               disabled /></li>
      <li><Input :value="approvalData.serId"
               v-if="approvalData"
               disabled /></li>
      <li><Input :value="approvalData.summary"
               v-if="approvalData"
               disabled /></li>
      <li><Input :value="approvalData.keyword"
               v-if="approvalData"
               disabled /></li>
      <li><Input :value="approvalData.publishUnit"
               v-if="approvalData"
               disabled /></li>
      <li><Input :value="approvalData.publishDate"
               v-if="approvalData"
               disabled /></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'text1',
  data () {
    return {

    }
  },
  props: {
    approvalData: {
      type: Object,
      default: () => { }
    }
  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>
ul {
  /* width: 49%; */
  line-height: 30px;
  display: inline-block;
  list-style: none;
  text-align: left;
  font-size: 15px;
  padding: 0px 20px;
}
</style>

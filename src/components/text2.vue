<template>
  <div id="text2">
    <div style="padding-right:30px;display: inline-block;">
      <ul style="text-align:right;font-weight: 700">
        <li>单位名称：</li>
        <li>国 家：</li>
        <li>城 市：</li>
        <li>邮编：</li>
        <li>传真：</li>
        <li>联系人</li>
      </ul>
      <ul>
        <li><Input disabled
                 :value="approvalData.unitName"
                 v-if="approvalData" /></li>
        <li><Input disabled
                 :value="approvalData.country"
                 v-if="approvalData" /></li>
        <li><Input disabled
                 :value="approvalData.city"
                 v-if="approvalData" /></li>
        <li><Input disabled
                 :value="approvalData.postCode"
                 v-if="approvalData" /></li>
        <li><Input disabled
                 :value="approvalData.fax"
                 v-if="approvalData" /></li>
        <li><Input disabled
                 :value="approvalData.contact"
                 v-if="approvalData" /></li>
      </ul>
    </div>
    <ul style="font-weight: 700">
      <li>单位网址：</li>
      <li>省（直辖市）：</li>
      <li>详细设计：</li>
      <li>电话：</li>
      <li>电子邮箱：</li>
      <li>联系人职位：</li>
    </ul>
    <ul>
      <li><Input :value="approvalData.url"
               disabled
               v-if="approvalData" /></li>
      <li><Input :value="approvalData.province"
               disabled
               v-if="approvalData" /></li>
      <li><Input :value="approvalData.detailDesign"
               disabled
               v-if="approvalData" /></li>
      <li><Input :value="approvalData.telephone"
               disabled
               v-if="approvalData" /></li>
      <li><Input :value="approvalData.mailBox"
               disabled
               v-if="approvalData" /></li>
      <li><Input :value="approvalData.contactPosition"
               disabled
               v-if="approvalData" /></li>
    </ul>
  </div>
</template>
  <script>
export default {
  name: 'text2',
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
ul li {
  line-height: 50px;
}
</style>

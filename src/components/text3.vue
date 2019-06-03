<template>
  <div id="text3">
    <ul class="ul-title"
        style="line-height:97px">
      <li>访问限制：</li>
      <li>使用限制：</li>
    </ul>
    <ul class="ul-content">
      <li style="height:120px">
        <Input type="textarea"
               placeholder=" ..."
               disabled
               :autosize="{ minRows: 5, maxRows: 6 }" />
      </li>
      <li style="height:120px">
        <Input type="textarea"
               placeholder=" ..."
               disabled
               :autosize="{ minRows: 5, maxRows: 6 }" />
      </li>
    </ul>
  </div>
</template>
  <script>
export default {
  name: 'text3',
  data () {
    return {

    }
  },
  props: {
    approvalData: {
      type: Object
    }
  },
  mounted () {
  }
}
  </script>
  <style lang="less" scoped>
#text3 {
  overflow: hidden;
}
ul {
  .fl();
  width: 20%;
  line-height: 30px;
  display: inline-block;
  list-style: none;
  text-align: left;
  font-size: 15px;
  padding: 0px 20px;
}
.lh {
  line-height: 85px;
  text-align: left;
}
</style>

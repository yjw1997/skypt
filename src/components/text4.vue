<template>
    <div class="tc">
    <ul class="ul-title">
      <li>空间参考系：</li>
      <li>空间表示类型：</li>
      <li>空间分辨率：</li>
      <li>专题类型：</li>
      <li>其它说明：</li>
    </ul>
    <ul class="ul-content">
      <li>
        <Input placeholder="发布单位" disabled/>
      </li>
      <li>
        <Input placeholder="发布单位" disabled/>
      </li>
      <li>
        <Input placeholder="发布单位" disabled/>
      </li>
      <li>
        <Input placeholder="发布单位" disabled/>
      </li>
      <li>
        <Input placeholder="发布单位" disabled/>
      </li>
    </ul>
  </div>
  </template>
  <script>
  export default {
  name: 'text4',
  data() {
    return {

    }
  },
  props: {
    approvalData: {
      type: Object    
    }
  },
  mounted() {
  }
}
  </script>
  <style lang="less" scoped>
    #text4{
      overflow: hidden;
    }
    ul{
      .fl();
      width: 20%;
      text-align: right;
      line-height: 60px;
      display: inline-block;
      list-style: none;
      text-align:left;
      font-size:15px;
        padding: 0px 20px;
    }
  </style>

<template>
  <div class="tc">
    <CardTable :data="data"></CardTable>
    <CardTable :data="data2"></CardTable>
  </div>
</template>
<script>
import CardTable from "../components/CardTable";
export default {
  name: "rewrite5",
  components: {
    CardTable
  },
  data() {
    return {
      data: {
        show: true,
        title: "服务操作方式",
        ttitle: [
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "操作名",
            key: "name"
          },
          {
            title: "操作描述",
            key: "show"
          },
          {
            title: "分布式平台",
            key: "platform"
          },
          {
            title: "访问地址",
            key: "address"
          }
        ]
      },
      data2: {
        show: true,
        title: "方法参数说明",
        ttitle: [
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "参数名",
            key: "name"
          },
          {
            title: "参数方向",
            key: "show"
          },
          {
            title: "参数描述",
            key: "description"
          },
          {
            title: "是否必须",
            key: "need"
          },
          {
            title: "是否可重复",
            key: "repeat"
          },
          {
            title: "取值范围",
            key: "area"
          }
        ]
      }
    };
  }
};
</script>
<style lang="less" scoped>
</style>
 
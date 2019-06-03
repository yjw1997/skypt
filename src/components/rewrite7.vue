<template>
  <div class="tc">
    <CardTable :data="data"></CardTable>
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
        ttitle: [
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "坐标系",
            key: "address"
          },
          {
            title: "最小x坐标",
            key: "minx"
          },
           {
            title: "最小y坐标",
            key: "miny"
          },
          {
            title: "最大x坐标",
            key: "maxx"
          },
           {
            title: "最大y坐标",
            key: "maxy"
          },
          {
            title: "临时表名",
            key: "name"
          }
        ]
      }
    };
  }
};
</script>
<style lang="less" scoped>
</style>
 
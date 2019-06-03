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
            title: "操作地址",
            key: "address"
          },
          {
            title: "操作说明",
            key: "Description"
          }
        ]
      }
    };
  }
};
</script>
<style lang="less" scoped>
</style>
 
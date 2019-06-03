<template>
  <Card>
    <p slot="title" v-if="data.show">{{data.title}}</p>
    <a href="#" slot="extra">
      <Button type="info">修改</Button>
      <Button type="error">删除</Button>
    </a>
    <Table border ref="selection" :columns="data.ttitle" :data="data.data"></Table>
  </Card>
</template>
<script>
export default {
  name: 'CardTable',
  props: {
    data: {
      title: {
        type: String,
        default: ''
      },
      ttitle: {
        type: Array,
        default: []
      },
      data: {
        type: Array,
        default: []
      },
      show: {
        type: Boolean,
        default: false
      }
    }
  }
};
</script>
<style lang="less" scoped>
</style>

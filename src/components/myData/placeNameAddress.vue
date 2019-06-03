<template>
  <div id="placeNameAddress">
    <div class="input">
      数据源：
      <Select style="width:200px">
        <Option v-for="item in SelectData"
                :value="item"
                :key="item">{{ item }}</Option>
      </Select>
      <div class="ib">
        上传日期：
        <Input placeholder=" ..."
               style="width: 200px"
               type="date" />
        -
        <Input placeholder=" ..."
               style="width:  200px"
               type="date" />
        <Button type="primary">搜索</Button>
      </div>
      <div style="float:right"
           class="ib">
        <Button type="primary">上传文件</Button>
        <Button type="warning">删除</Button>
      </div>
    </div>
    <Table border
           :columns="columns1"
           :data="data1"></Table>
  </div>
</template>
<script>
import Data from '../../static/data.json'
export default {
  data () {
    return {
      columns1: Data.columns1,
      data1: Data.data1,
      name: 'placeNameAddress',
      SelectData: []
    }
  }

}
</script>
<style lang="less" scoped>
.ib {
  display: inline-block;
}
</style>

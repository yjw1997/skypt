<template>
  <div class="tc">
    <Card>
      <p slot="title">
        <Icon type="ios-film-outline"></Icon>切片信息
      </p>
      <div class="input" style="overflow: hidden">
        <ul class="ul-title">
          <li>瓦片格式：</li>
          <li>切图信息标识符：</li>
          <li>切图坐标系：</li>
        </ul>
        <ul class="ul-content">
          <li>
            <Select v-model="value">
              <Option value="0" :key="0">不限</Option>
              <Option value="1" :key="1">png</Option>
              <Option value="2" :key="2">gif</Option>
              <Option value="3" :key="3">jpeg</Option>
            </Select>
          </li>
          <li>
            <Input/>
          </li>
          <li>
            <Input/>
          </li>
        </ul>
      </div>
    </Card>
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
      value:0,
      data: {
        show: true,
        title: "瓦片信息",
        ttitle: [
          {
            title: "级别",
            key: "address"
          },
          {
            title: "比例尺",
            key: "minx"
          },
          {
            title: "分辨率",
            key: "miny"
          },
          {
            title: "左上角坐标",
            key: "maxx"
          },
          {
            title: "瓦片宽",
            key: "maxy"
          },
          {
            title: "瓦片高",
            key: "name"
          },
          {
            title: "瓦片总列数",
            key: "name"
          },
          {
            title: "瓦片总行数",
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
 
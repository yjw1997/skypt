<template>
  <Form :model="formInline2"
        :label-width="150"
        label-position="right">
    <FormItem label="坐标单位：">
      <Input v-model="formInline2.coordinateUnit"
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="西南图廊角点横向坐标：">
      <Input v-model="formInline2.axis1"
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="西南图廊角点横向坐标：">
      <Input v-model="formInline2.axis2"
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="西南图廊角点横向坐标：">
      <Input v-model="formInline2.axis3 "
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="西南图廊角点横向坐标：">
      <Input v-model="formInline2.axis4"
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="空间分辨率：">
      <Input v-model="formInline2.resolution"
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="资源空间坐标系：">
      <Select v-model="formInline2.spaceAxis">
        <Option v-for="item in statueData"
                :value="item"
                :key="item">{{ item }}</Option>
      </Select>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'owndata3',
  data () {
    return {
      statueData: [
        '2000国家大地坐标系',
        '1980年西安坐标系',
        '1954年北京坐标系',
        '地方坐标系',
        'WGS84',
        '其他大地坐标系',
      ],
    }
  },
  props: {
    formInline2: {
      type: Object,
      default: () => {
        return {
          coordinateUnit: '',
          axis1: '',
          axis2: '',
          axis3: '',
          axis4: '',
          resolution: '',
          spaceAxis: '',
        }
      },
    },
  },
  methods: {

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

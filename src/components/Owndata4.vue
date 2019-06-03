<template>
  <Form :model="formInline2"
        :label-width="150"
        label-position="right">
    <FormItem label="资源所有权单位：">
      <Input v-model="formInline2.coordinateUnit"
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="元数据联系人：">
      <Input v-model="formInline2.axis1"
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="元数据联系单位：">
      <Input v-model="formInline2.axis2"
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="元数据联系方地址：">
      <Input v-model="formInline2.axis3 "
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="元数据联系方电邮：">
      <Input v-model="formInline2.axis4"
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="元数据创建日期：">
      <!-- <DatePicker type="date"
                  placeholder="请选择时间"
                  v-model="formInline2.dataTime"
                  format="yyyy-MM-dd HH:mm:ss"
                  @on-change="changeTime"
                  style="width: 467px;"></DatePicker> -->
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'owndata4',
  data () {
    return {

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
    changeTime (val) {
      this.formInline2.time = val
    }
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

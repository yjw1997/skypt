<template>
  <Form :model="formInline2"
        :label-width="150"
        label-position="right">
    <FormItem label="资源代码：">
      <Input v-model="formInline2.dataCode"
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="资源编号：">
      <Input v-model="formInline2.dataNum"
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="资源名称：">
      <Input v-model="formInline2.dataName"
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="主题词：">
      <Input v-model="formInline2.subject "
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="主题词代码：">
      <Input v-model="formInline2.subjectCode"
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="资源来源单位：">
      <Input v-model="formInline2.sourceUnit"
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="资源来源单位代码：">
      <Input v-model="formInline2.sourceUnitCode"
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="资源生产日期：">
      <!-- <input type="datetime-local "
             v-model="formInline2.dataTime"
             @on-change="changeTime"
             format="yyyy-MM-dd HH:mm:ss"
             style="width: 467px;"> -->
      <DatePicker type="datetime"
                  placeholder="请选择时间"
                  v-model="formInline2.dataTime"
                  @on-change="changeTime"
                  format="yyyy-MM-dd HH:mm:ss"
                  style="width: 467px;"></DatePicker>
    </FormItem>
    <FormItem label="资源格式：">
      <Input v-model="formInline2.dataFormat"
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="资源版本：">
      <Input v-model="formInline2.version"
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="资源摘要：">
      <Input v-model="formInline2.dataAbctract"
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="关键字：">
      <Input v-model="formInline2.keyword"
             placeholder=" ..."></Input>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'owndata1',
  data () {
    return {

    }
  },
  props: {
    formInline2: {
      type: Object,
      default: () => {
        return {
          dataCode: '',
          dataNum: '',
          dataName: '',
          subject: '',
          subjectCode: '',
          sourceUnit: '',
          sourceUnitCode: '',
          dataTime: '',
          dataFormat: '',
          version: '',
          dataAbctract: '',
          keyword: '',
        }
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    changeTime (val) {
      console.log(val)
      this.formInline2.dataTime = val
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

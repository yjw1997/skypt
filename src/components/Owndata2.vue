<template>
  <Form :model="formInline2"
        :label-width="150"
        label-position="right">
    <FormItem label="时间范围：">
      <Input v-model="formInline2.ranges"
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="资源维护信息：">
      <Input v-model="formInline2.maintainInfo"
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="资源字符集：">
      <Select v-model="formInline2.dataCharacter">
        <Option v-for="item in statueData"
                :value="item"
                :key="item">{{ item }}</Option>
      </Select>
    </FormItem>
    <FormItem label="资源语种：">
      <Input v-model="formInline2.languages"
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="基础资料：">
      <Input v-model="formInline2.basicData"
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="参考资料：">
      <Input v-model="formInline2.referenceInfo"
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="共享范围：">
      <Input v-model="formInline2.qy"
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="数据用途限制：">
      <Select v-model="formInline2.usageLimit">
        <Option v-for="item in statueData2"
                :value="item"
                :key="item">{{ item }}</Option>
      </Select>
    </FormItem>
    <FormItem label="资源安全分级：">
      <Select v-model="formInline2.safeLevel">
        <Option v-for="item in statueData3"
                :value="item"
                :key="item">{{ item }}</Option>
      </Select>
    </FormItem>
    <FormItem label="数据要素类型：">
      <Select v-model="formInline2.clasId">
        <Option v-for="item in statueData4"
                :value="item"
                :key="item">{{ item }}</Option>
      </Select>
    </FormItem>
    <FormItem label="数据文件大小：">
      <Input v-model="formInline2.size"
             placeholder=" ..."></Input>
    </FormItem>
    <FormItem label="属性结构：">
      <Input v-model="formInline2.struct"
             placeholder=" ..."></Input>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'owndata2',
  data () {
    return {
      statueData: [
        'GB2312字符',
        'GB18030字符集',
        'Big5字符集',
        '通用字符集2',
        '其他',
      ],
      statueData2: [
        '无限制',
        '版权',
        '专利',
        '专利审查中',
        '商标',
        '许可证',
        '知识产权',
      ],
      statueData3: [
        '未分级',
        '内部',
        '秘密',
        '机密',
        '绝密',
      ],
      statueData4: [
        '点',
        '线',
        '面',
      ]
    }
  },
  props: {
    formInline2: {
      type: Object,
      default: () => {
        return {
          ranges: '',
          struct: '',
          size: '',
          clasId: '',
          safeLevel: '',
          usageLimit: '',
          qy: '',
          referenceInfo: '',
          basicData: '',
          languages: '',
          dataCharacter: '',
          maintainInfo: '',
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
